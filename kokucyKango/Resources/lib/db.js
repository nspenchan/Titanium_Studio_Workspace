exports.createDatabase = function(dbName){
	if(Ti.App.Properties.getInt('setDatabase') == 0){
		Ti.App.Properties.setInt('setDatabase', 1);
		//初回起動時のデータベース作成処理
		alert(L('New_databases_are_created'));
		// データベースファイルを開きます（ない場合、作成されます）
		dbName1 = '/ui/common/' + dbName + '/' + dbName + '.sqlite';
		dbName2 = dbName;
		var db = Titanium.Database.install(dbName1,dbName2);
		db.close();
		
		// データベースファイルを開きます（ない場合、作成されます）
		var db1 = Titanium.Database.open('record_' + dbName);
		//英語ー日本語の履歴データ、メモ、スターのカラムを作る。それ以外はpickerLnaguages.js で作成する
		var create = 'ID INTEGER PRIMARY KEY, DATE TEXT, CORRECT INTEGER, STARS TEXT, MEMO TEXT';
		create = 'CREATE TABLE IF NOT EXISTS record (' + create + ')';
		db1.execute(create);
		Ti.API.info('setDatabase: ' + Ti.App.Properties.getInt('setDatabase'));
		db1.execute('DELETE FROM record');
		for(j=0; j<6; j++){
			var min = 1 + 500*j;
			var max = 500 + 500*j;
			var insert = 'INSERT INTO record (ID) values ';
			for(i=min; i<=max; i++){
				insert = insert + '(' + i + '),';
			}
			//Ti.API.info(insert.slice(0,-1));
			db1.execute(insert.slice(0,-1));
		}
		//db1.execute('INSERT INTO record (ID) values (2),(3)');
		db1.close();
		
	}else if(Ti.App.Properties.getInt('setDatabase') == 3){//update
		Ti.App.Properties.setInt('setDatabase', 4);
		//データベースの削除（この操作でファイルは残るが、中身（テーブル）が空になる）
		var db = Ti.Database.open(dbName);
	    db.close();
	    db.remove();
		//データベースアップデート
		alert(L('Databases_are_updated'));
		// データベースファイルを開きます（ない場合、作成されます）
		dbName1 = '/ui/common/' + dbName + '/' + dbName + '.sqlite';
		dbName2 = dbName;
		db = Titanium.Database.install(dbName1,dbName2);
		db.close();
	}
	/*
	var db = Ti.Database.open(dbName);
    db.close();
    db.remove();
	//データベースアップデート
	alert(L('Databases_are_updated'));
	// データベースファイルを開きます（ない場合、作成されます）
	dbName1 = '/ui/common/' + dbName + '/' + dbName + '.sqlite';
	dbName2 = dbName;
	db = Titanium.Database.install(dbName1,dbName2);
	db.close();
	*/
};
