exports.createDatabase = function(){
	//if(Ti.App.Properties.getInt('setDatabase')==0){
		Ti.App.Properties.setInt('setDatabase', 1);
		//初回起動時のデータベース作成処理
		alert('Databases were created');
		// データベースファイルを開きます（ない場合、作成されます）
		var db1 = Titanium.Database.open('db1');
		
		// DB内にテーブルが無い場合、定義に基づいてテーブルを作成します。
		db1.execute('CREATE TABLE IF NOT EXISTS WINDOW_DB(ID INTEGER, WINDOW TEXT, BACKGROUNDCOLOR TEXT, TAB_NUM INTEGER)');
		db1.execute('CREATE TABLE IF NOT EXISTS ICON_DB(ID INTEGER, ICON TEXT, NAME TEXT, NAME_JP TEXT)');
		db1.execute('CREATE TABLE IF NOT EXISTS WORDS(ID INTEGER, FATHER TEXT, MATHER TEXT, STUDENT TEXT, BUSINESSMAN TEXT, PERSON_1 TEXT , PERSON_2 TEXT, PERSON_3 TEXT)');
		
		db1.execute('DELETE FROM WINDOW_DB');
		db1.execute('INSERT INTO WINDOW_DB VALUES(1, "win1", "blue", 0)');
		db1.execute('INSERT INTO WINDOW_DB VALUES(2, "win2", "yellow", 1)');
		db1.execute('INSERT INTO WINDOW_DB VALUES(3, "win3", "red", 2)');
		db1.execute('INSERT INTO WINDOW_DB VALUES(4, "win4", "orange", 3)');
		db1.execute('INSERT INTO WINDOW_DB VALUES(5, "win5", "green", 4)');
		
		db1.execute('DELETE FROM ICON_DB');
		db1.execute('INSERT INTO ICON_DB VALUES(1, "light_add@2x.png", "add", "加える")');
		db1.execute('INSERT INTO ICON_DB VALUES(2, "light_home@2x.png", "home", "ホーム")');
		db1.execute('INSERT INTO ICON_DB VALUES(3, "light_arrow-closed@2x.png", "arrow", "すすむ")');
		db1.execute('INSERT INTO ICON_DB VALUES(4, "light_info@2x.png", "info", "情報")');
		db1.execute('INSERT INTO ICON_DB VALUES(5, "light_book@2x.png", "book", "本")');
		db1.execute('INSERT INTO ICON_DB VALUES(6, "light_music@2x.png", "music", "音楽")');
		db1.execute('INSERT INTO ICON_DB VALUES(7, "light_cart@2x.png", "cart", "カート")');
		db1.execute('INSERT INTO ICON_DB VALUES(8, "light_pictures@2x.png", "picture", "写真")');
		db1.execute('INSERT INTO ICON_DB VALUES(9, "light_flag@2x.png", "flag", "旗")');
		db1.execute('INSERT INTO ICON_DB VALUES(10, "light_search@2x.png", "search", "検索")');
		db1.execute('INSERT INTO ICON_DB VALUES(11, "light_gear@2x.png", "setting", "設定")');
		db1.execute('INSERT INTO ICON_DB VALUES(12, "light_star@2x.png", "star", "スター")');
		
		db1.execute('DELETE FROM WORDS');
		db1.execute('INSERT INTO WORDS VALUES(1, "お父さん、ありがとう", "お母さん、ありがとう", "勉強、頑張っているね", "働いてくれて、ありがとう", "", "", "")');
		db1.execute('INSERT INTO WORDS VALUES(2, "いつも遅くまで、ご苦労さま", "いつも遅くまで、ご苦労さま", "いつも遅くまで、頑張っていますね", "いつも遅くまで、ご苦労さま", "", "", "")');
		db1.execute('INSERT INTO WORDS VALUES(3, "また遊ぼうね", "また遊ぼうね", "テストが終わったら、遊びに行こう", "一段落ついたら、遊びにいきましょう", "", "", "")');
		db1.execute('INSERT INTO WORDS VALUES(4, "あなたがいてくれて、よかった", "あなたがいてくれて、よかった", "あなたがいてくれて、よかった", "あなたがいてくれて、よかった", "", "", "")');
		db1.execute('INSERT INTO WORDS VALUES(5, "ご苦労様です", "ご苦労様です", "ご苦労さん", "ご苦労様です", "", "", "")');
		db1.execute('INSERT INTO WORDS VALUES(6, "無理しないでね", "無理しないでね", "無理しないでね", "無理しないでね", "", "", "")');
		db1.execute('INSERT INTO WORDS VALUES(7, "あなたが家の大黒柱よ", "あなたは家の太陽です", "君の将来が楽しみだ", "出世間違いなし！", "", "", "")');
		db1.execute('INSERT INTO WORDS VALUES(8, "おかえりなさい。ゆっくり休んでね", "おかえりなさい。ゆっくり休んでね", "おかえりなさい。ゆっくり休んでね", "おかえりなさい。ゆっくり休んでね", "", "", "")');
		
		db1.close();
	//}
};

exports.makeRows1 = function(){
	//rowダータの配列
	var rows1 = [];
	// データベースファイルを開きます（ない場合、作成されます）
	var db = Titanium.Database.open('db1');
	var rows = db.execute('SELECT * FROM WINDOW_DB');
	
	while(rows.isValidRow()){
		var row = require('/ui/ui').createTableViewRow(rows.field(1), rows.field(2), 'auto', true);
		row.num = rows.field(3);//異動先のタブ番号を表す（自作のプロパティ
		row.selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE; //クリック時に色反転
		rows1.push(row);
		rows.next();
	}
	db.close();
	
	return rows1;
};

exports.makeRows2 = function(){
	//rowダータの配列
	var rows2 = [];
	// データベースファイルを開きます（ない場合、作成されます）
	var db = Titanium.Database.open('db1');
	var rows = db.execute('SELECT * FROM ICON_DB');
	if(Ti.Platform.locale=='ja'){
		var j=3;
	}else{
		var j=2;
	}
	
	while(rows.isValidRow()){
		var row = require('/ui/ui').createTableViewRow();
		var imageview = require('/ui/ui').createImageView(rows.field(1), 'auto', 'auto', 5, 10 );
		imageview.bottom = 5;
		var label = require('ui/ui').createLabel('#999', 'transparent', rows.field(j), 20, 'center', 100);
		label.right = 10;
		row.add(imageview);
		row.add(label);
		rows2.push(row);
		rows.next();
	}
	db.close();
	
	return rows2;
};