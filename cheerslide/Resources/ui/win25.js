function ApplicationWindow(title, wRatio) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'yellow'
	});
	//3.1.2
	self.showNavBar();
	//if(Ti.Platform.osname!='andriod'){self.hideTabBar();}
	
	if(wRatio<1.6){
		var top = -30;
	}else{
		var top = 0;
	}
	
	var view = Titanium.UI.createImageView({
	    width: 320,
	    height: 568,
	    top:top,
	});
	
	var imageView = Titanium.UI.createImageView({
	    image: '/assets/images/splash.png',
	    width: 320,
	    height :568,
	    opacity:0.9,
	});
	view.add(imageView);
	
	var label1 = Ti.UI.createLabel({
		backgroundColor: '#fff',
		text: L('Set_slidetime'),
		font:{fontSize:20,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'center',
		top:10,
		opacity:0.5
	});
	
	var label2 = Ti.UI.createLabel({
		backgroundColor: '#fff',
		text: L('Set_slidetime'),
		font:{fontSize:20,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'center',
		bottom:10,
		opacity:0.5
	});
	
	self.add(view);
	self.add(label1);
	self.add(label2);
	
	var b1 = Titanium.UI.createButton({title:L('Back')});
	self.LeftNavButton = b1;
	
	b1.addEventListener('click', function(e){
		var db2 = Titanium.Database.open('project');
		var rows_db = db2.execute('UPDATE DATA SET TIME = "' + time + '", COUNTER = "' + counter + '" WHERE NAME = "' + Ti.App.Properties.getString('project') + '"');
		
		db2.close();
		self.close();
	});
	
	var db2 = Titanium.Database.open('project');	
	var rows_db = db2.execute('SELECT * FROM DATA WHERE NAME = "' + Ti.App.Properties.getString('project') + '"');
	
	var counter = rows_db.fieldByName('COUNTER');
	var time = rows_db.fieldByName('TIME');
	
	db2.close();
	
	var picker = Ti.UI.createPicker();
	
	arrayTime = [3, 5, 7, 9];
	arrayCounter = ['', 10, 20, 30];
	arrayCounter2 = ['Max', '_times', '_times', '_times'];
	
	var column1 = Ti.UI.createPickerColumn();
	
	for(i=0; i<arrayTime.length; i++){
		column1.addRow(Ti.UI.createPickerRow({
			title:arrayTime[i]+L('_s'),
			custom_item:arrayTime[i]
		}));
	}
	
	var indexOf1 = arrayTime.indexOf(time);
	 
	var column2 = Ti.UI.createPickerColumn();
	
	for(i=0; i<arrayCounter.length; i++){
		column2.addRow(Ti.UI.createPickerRow({
			title:arrayCounter[i]+L(arrayCounter2[i]),
			custom_item:arrayCounter[i]
		}));
	}
	
	var indexOf2 = arrayCounter.indexOf(counter);
	
	// 選択表示を有効にします（標準は無効）
	picker.selectionIndicator = true;
	// それぞれの列定義を配列として渡します。
	picker.add([column1,column2]);
	
	setTimeout(function() {
	    picker.setSelectedRow(0, indexOf1);
	    picker.setSelectedRow(1, indexOf2);
	}, 100);
	
	// 選択状況が変わったときのイベントです
	picker.addEventListener('change',function(e){
	    // e.rowとe.columnに選択された行列が返ります。
	    // e.rowIndex, e.columnIndexには選択された行列のindexが返ります。
	    // 上記の例ではcolumn1の各rowにcustom_itemプロパティを付随させているので、
	    // e.row.custom_itemでそれらのデータも取得できます。
	    Ti.API.info("You selected row: "+e.row+", column: "+e.column+", custom_item: "+e.row.custom_item);
	    Ti.API.info("row index: "+e.rowIndex+", column index: "+e.columnIndex);
	    if(e.columnIndex == 0){
	    		time = e.row.custom_item;
	    		indexOf1 = e.rowIndex;
	    		label2.text = time + L('_s') + ': ' + counter + L(arrayCounter2[indexOf2]);
	    }else{
	    		counter = e.row.custom_item;
	    		indexOf2 = e.rowIndex;
	    		label2.text = time + L('_s') + ': ' + counter + L(arrayCounter2[indexOf2]);
	    }
	});
	
	self.add(picker);
	return self;
};

module.exports = ApplicationWindow;