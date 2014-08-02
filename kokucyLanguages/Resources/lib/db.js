exports.createDatabase = function(dbName, arrayLevel){
	/*データベースの存在確認
	var db1 = Titanium.Database.open('record_' + dbName);
	var checkTable = db1.execute("SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name='enja'");
	Ti.API.info('enja: ' + checkTable.field(0));//=1 ある
	var checkTable1 = db1.execute("SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name='jaen'");
	Ti.API.info('jaen: ' + checkTable1.field(0));//=0 ない
	*/
	if(Ti.App.Properties.getInt('setDatabase') == 0){
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
		
		var i, j, k, create1, insert, idMin, idMax;
		var tableArray = ['enja', 'enzh', 'enko', 'enru'];
		var columnArray = ['column', 'a', 'b', 'c', 'd', 'e'];//レベル１=a, レベル５=e
		var create = 'ID INTEGER PRIMARY KEY, SETTINGS TEXT';
		for(i=1; i<=5; i++){
			for(j=1; j<=4; j++){//DATE, CORRECT, STARS, MEMO
				create = create + ', ' + columnArray[i] + j + ' TEXT';
			}
		}
		Ti.API.info(create);

		for(i=0; i<tableArray.length; i++){
			Ti.API.info(columnArray[i]);
			create1 = 'CREATE TABLE IF NOT EXISTS ' + tableArray[i] + ' (' + create + ')';
			db1.execute(create1);
			db1.execute('DELETE FROM ' + tableArray[i]);
			for(j=0; j<5; j++){Ti.API.info(i + '/' + j);
				insert = 'INSERT INTO ' + tableArray[i] + ' (ID) values ';	
				idMin = 1 + 500*j;
				idMax = 500 + 500*j;
				if(idMax>2096){
					idMax = 2096;
				}
				Ti.API.info('min: ' + idMin + '/max: ' + idMax);
				for(k=idMin; k<=idMax; k++){
					insert = insert + '(' + k + '),';
				}
				Ti.API.info(insert.slice(0,-1));
				db1.execute(insert.slice(0,-1));
			}
		}
		Ti.App.Properties.setInt('setDatabase', 1);
	}else if(Ti.App.Properties.getInt('setDatabase') == 3){
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
};
