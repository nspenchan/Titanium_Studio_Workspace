//add to win5.js
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

//add to win5.js	
		//画像表示用の自作のプロパティ
		var val = e.row.val;
		
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
	    } else 

//add to app.js
tab1 "assets/images/light_home@2x.png",
tab2 "assets/images/light_search@2x.png",
tab3 "assets/images/light_flag@2x.png",
tab4 "assets/images/light_arrow-closed@2x.png",
tab5 "assets/images/light_gear@2x.png",