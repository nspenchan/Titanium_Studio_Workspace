function ApplicationWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'blue'
	});
	//3.1.2
	self.showNavBar();
	//if(Ti.Platform.osname!='andriod'){self.hideTabBar();}
	
	var b2 = Titanium.UI.createImageView({image:'/assets/images/X.png'});
	self.RightNavButton = b2;
	
	b2.addEventListener('click', function(e){
		var db1 = Titanium.Database.open(Ti.App.Properties.getString('project'));
		section = tableview.data[0];
		/*
        Ti.API.info("rowCount:" + section.rowCount);
        Ti.API.info("row1:" + section.rows[0].title);
        Ti.API.info("row2:" + section.rows[1].title);
        */
		for (var i=0;i<section.rowCount;i++){
			if(section.rows[i].del == true){
				Ti.API.info(section.rows[i].num);
				db1.execute('DELETE FROM WORDS WHERE ID = ' + section.rows[i].num);
			}
		}
		db1.close();
		self.remove(tableview);
		
		//連打したときのrow.backgroundColor がおかしくなる対策
		setTimeout(function(){
			table();
		}, 100);
		/*
    		var Window21 = require('ui/win21');
		var win21 = new Window21(L('Photo2'), tabGroup, self);
    		parentWindow.containingTab.open(win21);
    		*/
    		
	});
	
	table();
	
	//tableView
	var tableview;
	function table(){
		var db1 = Titanium.Database.open(Ti.App.Properties.getString('project'));
		
		var rows = [];
		
		var rows_db = db1.execute('SELECT * FROM WORDS');
		
		var count1 = 0;
		while(rows_db.isValidRow()){
			count1++;
			var row = Ti.UI.createTableViewRow({
			    //画像表示用の自作のプロパティ
			    width:Ti.UI.FILL,
			    height:Ti.UI.SIZE,
			    backgroundColor:'white',
			    num:rows_db.field(0),
			    del:false,
			});
			
			var label = Titanium.UI.createLabel({
				color:'#000',
				backgroundColor:'transparent',
				text:rows_db.fieldByName('WORD'),
				font:{fontSize:20,fontFamily:'Helvetica Neue'},
				//textAlign:'left',
				width:Ti.UI.FILL,
				height:Ti.UI.SIZE,
				top:16,
				bottom:16,
				right:10,
				left:10,
				//opacity:0.7,
			});
			row.add(label);
			rows.push(row);
			
			rows_db.next();
		}
		rows_db.close();
		db1.close();
		
		if(count1 != 0){
			// 先ほどのデータに基づいてTable Viewを起こします。
			tableview = Titanium.UI.createTableView({
			    data: rows
			});
			// イベントリスナにクリック時のイベントを登録します。
			tableview.addEventListener('click', function(e){
				if(e.row.del == false){
					setTimeout(function(){
						e.row.backgroundColor = 'pink';
					},100);
					e.row.del = true;
					Ti.API.info('delete no:' + e.row.num);
				}else{
					setTimeout(function(){
						e.row.backgroundColor = 'white';
					},100);
					e.row.del = false;
					Ti.API.info('delete cancel no:' + e.row.num);
				}
			});
		}else{
			rows = [{title:L('No_word'), del:false}];
			tableview = Titanium.UI.createTableView({
			    data: rows
			});	
		}
		// Windowに追加する
		self.add(tableview);
	}
	
	return self;
};

module.exports = ApplicationWindow;