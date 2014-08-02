(function(){
	app.photo = {};
	
	var db = Ti.Database.open("tiphoto");
	// カメラで撮った写真を保存するデータベースを生成する
	db.execute('CREATE TABLE IF NOT EXISTS photos(id INTEGER PRIMARY KEY, path TEXT, latitude REAL, longitude REAL, created_at REAL)');
	// テスト用の初期データを投入する
	//if (!Ti.App.Properties.getBool('seed', false)) {
	//	for (var i = 0; i < 20; i++) {
	//		db.execute('INSERT INTO photos (path, latitude, longitude, created_at) VALUES (?, ?, ?, ?)', 'photo_example2.png', 0, 0, (new Date).getTime());
	//	}
	//	Ti.App.Properties.setBool('seed', true);
	//}
	db.close();
	
	// 写真の一覧を返すメソッド
	app.photo.getAll = function(){
		var db = Ti.Database.open("tiphoto");
		
		// ステップ4: データベースから写真情報を取得する
		var photos = [];
		
		var rows = db.execute('SELECT id, path, latitude, longitude, created_at FROM photos');
		while(rows.isValidRow()){
			photos.push({
				id: rows.fieldByName('id'),
				path: rows.fieldByName('path'),
				latitude: rows.fieldByName('latitude'),
				longitude: rows.fieldByName('longitude'),
				created_at: rows.fieldByName('created_at')
			});
			rows.next();
		}
		rows.close();
		
		// ダミー情報を返すようにする
		// var photos = [];
		// for(var i = 0; i < 20; i++) {
		//	photos.push({id: i, path: 'photo_example1.png', latitude: 0, longitude: 0});
		// }
		
		db.close();
		
		return photos;
	};
	
	// 写真を登録するメソッド
	app.photo.save = function(options){
		// ステップ5: 撮った写真をデータベースへ登録する
		var now = (new Date).getTime();
		
		var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,
			String.format("%d-%d.png", now, Math.floor( Math.random() * 1000)));
		file.write(options.image);
		
		// ステップ8: 位置情報も合わせて登録する
		var db = Ti.Database.open("tiphoto");
		db.execute("INSERT INTO photos (path, latitude, longitude, created_at) VALUES (?, ?, ?, ?)",
			file.nativePath, options.latitude, options.longitude, now);
		
		var photo = {
			id: db.lastInsertRowId,
			path: file.nativePath,
			latitude: options.latitude,
			longitude: options.longitude,
			created_at: now
		};
		
		db.close();
		
		return photo;
	};
})();
