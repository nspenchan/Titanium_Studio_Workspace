exports.createDatabase = function(id, name, display, count1){
	if(Ti.App.Properties.getInt('setDatabase') == 0){
		Ti.App.Properties.setInt('setDatabase', 1);
		Ti.App.Properties.setString('project', name);
		//初回起動時のデータベース作成処理
		alert(L('New_databases_are_created'));
		// データベースファイルを開きます（ない場合、作成されます）
		var db1 = Titanium.Database.open(name);
		
		// DB内にテーブルが無い場合、定義に基づいてテーブルを作成します。
		db1.execute('CREATE TABLE IF NOT EXISTS WORDS(ID INTEGER, WORD TEXT, NUMBER INTEGER, COLOR TEXT, BACKGROUNDCOLOR TEXT, FONTSIZE TEXT, FONTFAMILY TEXT, FONTWEIGHT TEXT, TEXTALIGN TEXT, WIDTH INTEGER, HEIGHT INTEDER, TOP INTEGER, RIGHT INTEGER, OPACITY INTEGER)');
		//db1.execute('CREATE TABLE IF NOT EXISTS DATA(ID INTEGER, NAME TEXT, DISPLAY TEXT, ARTIST TEXT, TITLE TEXT, GENRE TEXT, DATE TEXT)');
		db1.execute('CREATE TABLE IF NOT EXISTS PHOTO(ID INTEGER, TURN INTEGER, NAME TEXT, RATIO REAL, POINT INTEGER, ZOOM REAL, ANGLE INTEGER, MESSAGE TEXT)');
		
		//db1.execute('DELETE FROM WORDS');
		if(Ti.Platform.locale=='ja'){
			db1.execute('INSERT INTO WORDS (ID, WORD, NUMBER) VALUES(1, "ありがとう", 5)');
			db1.execute('INSERT INTO WORDS (ID, WORD, NUMBER) VALUES(2, "無理しないでね", 7)');
			db1.execute('INSERT INTO WORDS (ID, WORD, NUMBER) VALUES(3, "君ならできる！", 7)');
			db1.execute('INSERT INTO WORDS (ID, WORD, NUMBER) VALUES(4, "いいことあるさ♥", 8)');
			db1.execute('INSERT INTO WORDS (ID, WORD, NUMBER) VALUES(5, "元気を出して！", 7)');
			db1.execute('INSERT INTO WORDS (ID, WORD, NUMBER) VALUES(6, "気を楽にね", 5)');
			db1.execute('INSERT INTO WORDS (ID, WORD, NUMBER) VALUES(7, "全力でやりなさい", 8)');
			db1.execute('INSERT INTO WORDS (ID, WORD, NUMBER) VALUES(8, "おかえりなさい。ゆっくり休んでね", 11)');
		}else{
			db1.execute('INSERT INTO WORDS (ID, WORD, NUMBER) VALUES(1, "Thank you very much.", 20)');
			db1.execute('INSERT INTO WORDS (ID, WORD, NUMBER) VALUES(2, "Take it easy.", 13)');
			db1.execute('INSERT INTO WORDS (ID, WORD, NUMBER) VALUES(3, "You can do it !", 15)');
			db1.execute('INSERT INTO WORDS (ID, WORD, NUMBER) VALUES(4, "Good luck.", 10)');
			db1.execute('INSERT INTO WORDS (ID, WORD, NUMBER) VALUES(5, "Cheer up!", 9)');
			db1.execute('INSERT INTO WORDS (ID, WORD, NUMBER) VALUES(6, "Let your hair down.", 18)');
			db1.execute('INSERT INTO WORDS (ID, WORD, NUMBER) VALUES(7, "You must put your best foot forward.", 26)');
			db1.execute('INSERT INTO WORDS (ID, WORD, NUMBER) VALUES(8, "Welcome back. Please some rest", 30)');
		}
		
		db1.close();
		
		// データベースファイルを開きます（ない場合、作成されます）
		var db2 = Titanium.Database.open('project');
		
		// DB内にテーブルが無い場合、定義に基づいてテーブルを作成します。
		db2.execute('CREATE TABLE IF NOT EXISTS DATA(ID INTEGER, NAME TEXT, DISPLAY TEXT, ARTIST TEXT, TITLE TEXT, GENRE TEXT, TIME INTEGER, COUNTER INTEGER, RANDOM INTEGER, MODE TEXT, DATE TEXT)');
		
		//db2.execute('DELETE FROM DATA');
		var NowDate = nowDate();
		db2.execute('INSERT INTO DATA VALUES('+ id + ', "' + name + '", "' + display + '", "", "", "", 5, 10, 1, "random", "' + NowDate + '")');
		
		db2.close();
		
		function nowDate(){
			// 日付の取得
		    var date = new Date();
		    var year = date.getYear();
		    var mon = date.getMonth() + 1;
		    var day = date.getDate();
		
		    // 西暦の処理とゼロパディング
		    year = (year < 2000) ? year+1900 : year;
		    if (mon < 10) { mon = "0" + mon; }
		    if (day < 10) { day = "0" + day; }
		
		    // 時間の取得
		    var time = new Date();
		    var hour = time.getHours();
		    var min = time.getMinutes();
		    var sec = time.getSeconds();
		
		    // ゼロパディング
		    if (hour < 10) { hour = "0" + hour; }
		    if (min < 10) { min = "0" + min; }
		    if (sec < 10) { sec = "0" + sec; }
		
		    // 書き出し
		    var nowDate = year + "-" + mon + "-" + day + " " + hour + ":" + min + ":" + sec;
		    return nowDate;
		}
	}
};