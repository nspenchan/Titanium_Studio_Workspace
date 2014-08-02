exports.createDatabase = function(){
	if (!Ti.App.Properties.hasProperty('setDatabase')) {
		//初回起動時のみ、実行される
		Ti.App.Properties.setInt('setDatabase', 1);
		//初回起動時のデータベース作成処理
		alert('Databases were created');
		// データベースファイルを開きます（ない場合、作成されます）
		var db1 = Titanium.Database.open('db1');
		
		// DB内にテーブルが無い場合、定義に基づいてテーブルを作成します。
		db1.execute('CREATE TABLE IF NOT EXISTS WINDOW_DB(ID INTEGER, WINDOW TEXT, BACKGROUNDCOLOR TEXT, TAB_NUM INTEGER)');
		db1.execute('CREATE TABLE IF NOT EXISTS ICON_DB(ID INTEGER, ICON TEXT, NAME TEXT, NAME_JP TEXT)');
		
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
		
		db1.close();
	}
};