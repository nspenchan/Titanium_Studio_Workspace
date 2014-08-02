exports.createDatabase = function(){
	var db, dbName1, dbName2;
	if(Ti.App.Properties.getInt('setDatabase') == 0){
		Ti.App.Properties.setInt('setDatabase', 1);
		//初回起動時のデータベース作成処理
		alert(L('New_databases_are_created'));
		// データベースファイルを開きます（ない場合、作成されます）
		dbName1 = '/assets/db/mojiban.sqlite';
		dbName2 = 'mojiban';
		Ti.API.info(dbName1 + '/' + dbName2);
		db = Titanium.Database.install(dbName1,dbName2);
		db.close();
		
		dbName1 = '/assets/db/mojiban1.sqlite';
		dbName2 = 'mojiban1';
		Ti.API.info(dbName1 + '/' + dbName2);
		db = Titanium.Database.install(dbName1,dbName2);
		db.close();
	
	}else if(Ti.App.Properties.getInt('setDatabase') == 3){//update
		Ti.App.Properties.setInt('setDatabase', 4);
		//データベースの削除（この操作でファイルは残るが、中身（テーブル）が空になる）
		var db = Ti.Database.open(dbName);
		db.close();
		db.remove();
		//データベースアップデート
		alert(L('Databases_are_updated'));
		// データベースファイルを開きます（ない場合、作成されます）
		dbName1 = '/lib/' + dbName + '.sqlite';
		dbName2 = dbName;
		db = Titanium.Database.install(dbName1,dbName2);
		db.close();
	}
};
