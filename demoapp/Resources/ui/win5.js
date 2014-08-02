exports.createWin5 = function(){
	var win5 = Titanium.UI.createWindow({  
	    title:String.format(L('Tab_'), '5'),
	    backgroundColor:'orange'
	});
	
	//tableView
	var rows = [
	    {title:'Row 1', hasChild:true},
	    {title:'Row 2', hasDetail:true},
	    {title:'Row 3', hasCheck:true},
	    {title:'Row 4'}
	];
	//rowデータの配列
	var rows1 = [];
	// データベースファイルを開きます（ない場合、作成されます）
	var db = Titanium.Database.open('db1');
	//ResultSetオブジェクト
	var rows_db = db.execute('SELECT * FROM WINDOW_DB');
	//ResultSetオブジェクトを走査していきます
	while(rows_db.isValidRow()){
		var row = Ti.UI.createTableViewRow({
		    title: rows_db.field(1),
		    backgroundColor: rows_db.field(2),
		    height: 'auto',
		    hasChild: true,
		    //移動先のタブ番号を表す（自作のプロパティ）
		    num: rows_db.field(3),
		});
		rows1.push(row);
		rows_db.next();
	}
	// 走査が終わったらResultSetを閉じる
	rows_db.close();
	//データベースを閉じる
	db.close();
	var rows0 = rows.concat(rows1);
	//rowsに戻す
	rows = rows0;
	//rowデータの配列
	var rows2 = [];
	// データベースファイルを開きます（ない場合、作成されます）
	var db = Titanium.Database.open('db1');
	//ResultSetオブジェクト
	var rows_db = db.execute('SELECT * FROM ICON_DB');
	//端末の言語設定が「日本語」かどうか
	if(Ti.Platform.locale=='ja'){
		var j=3;
	}else{
		var j=2;
	}
	//ResultSetオブジェクト
	while(rows_db.isValidRow()){
		var row = Ti.UI.createTableViewRow({
		    //画像表示用の自作のプロパティ
		    val: 'assets/images/' + rows_db.field(1),
		});
		var imageview = Titanium.UI.createImageView({
		    image: 'assets/images/' + rows_db.field(1),
		    width: 'auto',
		    height :'auto',
		    top: 5,
		    bottom: 5,
		    left: 10,
		});
		var label = Titanium.UI.createLabel({
			color: '#999',
		    backgroundColor: 'transparent',
			text: rows_db.field(j),
			font:{fontSize: 20,fontFamily:'Helvetica Neue'},
			textAlign: 'center',
			width: 100,
			right: 10,
		});
		row.add(imageview);
		row.add(label);
		
		rows2.push(row);
		rows_db.next();
	}
	// 走査が終わったらResultSetを閉じる
	rows_db.close();
	//データベースを閉じる
	db.close();
	
	var rows0 = rows.concat(rows2);
	//rowsに戻す
	rows = rows0;
	// 先ほどのデータに基づいてTable Viewを起こします。
	var tableview = Titanium.UI.createTableView({
	    data: rows
	});
	// イベントリスナにクリック時のイベントを登録します。
	tableview.addEventListener('click', function(e){
		//画像表示用の自作のプロパティ
		var val = e.row.val;
		//移動先のタブ番号を表す（自作のプロパティ）
		var num = e.row.num; //alert(num);
		
		if(val){
	    		var window_img = Titanium.UI.createWindow({
			    backgroundColor: 'black'
			});
			var imageview = Titanium.UI.createImageView({
			    image: val,
			    width: 100,
			    height : 100,
			});
			window_img.add(imageview);
			
			var b1 = Titanium.UI.createButton({
				title:L('Back'),
				top:10,
				left:10,
			});
			window_img.add(b1);
			b1.addEventListener('click', function(e){
				window_img.close();
			});
			
			window_img.open();
	    } else if(num || num==0){//0は偽と判定されるので
	    		tabGroup.activeTab = tabGroup.tabs[num];
	    }else{
			//eventオブジェクト
		    var index     = e.index;
		    var section  = e.section;
		    var row       = e.row;
		    var rowdata = e.rowData;
		    alert(JSON.stringify(e));
		    Ti.API.info('[event object] ' + JSON.stringify(e));
	    }
	});
	// Windowに追加する
	win5.add(tableview);
	
	var b1 = Titanium.UI.createButton({title:L('Back')});
	var b2 = Titanium.UI.createButton({title:L('Next')});
	win5.LeftNavButton = b1;
	win5.RightNavButton = b2;
		
	b1.addEventListener('click', function(){
		tabGroup.activeTab = tabGroup.tabs[3];
	});
	b2.addEventListener('click', function(e){
	   tabGroup.activeTab = tabGroup.tabs[0];
	});	

	
	return win5;
};