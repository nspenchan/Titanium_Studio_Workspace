exports.createDatabase = function(){
	if(Ti.App.Properties.getInt('setDatabase') == 0){
		Ti.App.Properties.setInt('setDatabase', 2);
		//初回起動時のデータベース作成処理
		alert(L('New_databases_are_created'));
		// データベースファイルを開きます（ない場合、作成されます）
		var dbName = Titanium.App.Properties.getString('databaseName');
		var db1 = Titanium.Database.open(dbName);
		
		// DB内にテーブルが無い場合、定義に基づいてテーブルを作成します。
		db1.execute('CREATE TABLE IF NOT EXISTS DATA(_id INTEGER, level INTEGER, en TEXT, ja TEXT, j1 TEXT, j2 TEXT, j3 TEXT, zh TEXT, ko TEXT, ru TEXT, ar TEXT, el TEXT, vi TEXT, tr TEXT, th TEXT, pt TEXT, de TEXT, fa TEXT, it TEXT, fr TEXT, es TEXT, id TEXT, sv TEXT, uk TEXT, ro TEXT, no TEXT, hi TEXT, he TEXT, da TEXT)');
		//db1.execute('CREATE TABLE IF NOT EXISTS DATA(ID INTEGER, NAME TEXT, DISPLAY TEXT, ARTIST TEXT, TITLE TEXT, GENRE TEXT, DATE TEXT)');
		//db1.execute('CREATE TABLE IF NOT EXISTS PHOTO(ID INTEGER, TURN INTEGER, NAME TEXT, RATIO REAL, POINT INTEGER, ZOOM REAL, ANGLE INTEGER, MESSAGE TEXT)');
		
		db1.execute('DELETE FROM DATA');
		db1.execute('INSERT INTO DATA VALUES(1,1,"elephant","ぞう","ゾウ","象","ZOU","象","코끼리","слон","فيل","ελέφαντας","voi","fil","ช้าง","elefante","Elefant","فیل","elefante","éléphant","elefante","gajah","elefant","слон","elefant","elefant","हाथी","פיל","elefant")');
		db1.execute('INSERT INTO DATA VALUES(2,1,"giraffe","きりん","キリン","麒麟","KIRIN","长颈鹿","기린","жираф","زرافة","καμηλοπάρδαλη","con hươu","zürafa","ยีราฟ","girafa","Giraffe","زرافه","giraffa","girafe","jirafa","jerapah","giraff","жираф","girafă","giraff","जिराफ़","ג ירפה","giraf")');
		db1.execute('INSERT INTO DATA VALUES(3,1,"lion","らいおん","ライオン","獅子","RAION","狮子","사자","лев","أسد حيوان","λιοντάρι","sư tử","aslan","สิงโต","leão","Löwe","شیر","leone","lion","león","singa","lejon","лев","leu","løve","शेर","אריה","løve")');
		db1.execute('INSERT INTO DATA VALUES(4,1,"rhinoceros","さい","サイ","犀","SAI","犀牛","코뿔소","носорог","وحيد القرن","ρινόκερως","con tê giác","gergedan","แรด","rinoceronte","Nashorn","رده کرگدن ها","rinoceronte","rhinocéros","rinoceronte","badak","noshörning","носоріг","rinocer","neshorn","गैंडा","קרנף","næsehorn")');
		db1.execute('INSERT INTO DATA VALUES(5,1,"tiger","とら","トラ","虎","TORA","虎","호랑이","тигр","نمر","τίγρη","hổ","kaplan","เสือ","tigre","Tiger","ببر","tigre","tigre","tigre","harimau","tiger","тигр","tigru","tiger","बाघ","נמר","tiger")');
		db1.execute('INSERT INTO DATA VALUES(6,1,"gorilla","ごりら","ゴリラ","大猩々","GORIRA","大猩猩","고릴라","горилла","غوريلا","γορίλλας","con khỉ đột","goril","กอริลลา","gorila","Gorilla","گوریل","gorilla","gorille","gorila","gorila","gorilla","горила","gorilă","gorilla","वन मानुष","גורילה","gorilla")');
		db1.execute('INSERT INTO DATA VALUES(7,1,"panda","ぱんだ","パンダ","大熊猫","PANDA","熊猫","팬더","панда","بندة","αρκτοειδές ζώο της ασίας","gấu trúc","panda","หมีแพนด้า","panda","Panda","مورچه خوار فلس دار هیمالیا","panda","panda","panda","panda","panda","панда","panda","panda","रीछबिलाव","פנדה","panda")');
		db1.execute('INSERT INTO DATA VALUES(8,1,"bear","くま","クマ","熊","KUMA","承担","곰","нести","تحمل","φέρουν","mang","ayı","แบก","suportar","tragen","خرس","sopportare","porter","soportar","menanggung","bära","нести","suporta","bjørn","भालू","לשאת","bære")');
		db1.execute('INSERT INTO DATA VALUES(9,1,"koala","こあら","コアラ","子守熊","KOARA","考拉","코알라","коала","الكوال دب أسترالي","δενδρόβιο ζώο της αυστραλίας","giống đại thử ở úc châu","koala","สัตว์มีถุงหน้าท้องคล้ายหมี","coala","Koala","کوآلا","koala","koala","koala","koala","koala","коала","koala","koala","कोअला","קואלה","koala")');
		db1.execute('INSERT INTO DATA VALUES(10,1,"monkey","さる","サル","猿","SARU","猴子","원숭이","обезьяна","قرد","μαϊμού","khỉ","maymun","ลิง","macaco","Affe","میمون","scimmia","singe","mono","monyet","apa","мавпа","maimuță","ape","बंदर","קוף","abe")');
		db1.execute('INSERT INTO DATA VALUES(11,1,"horse","うま","ウマ","馬","UMA","马","말","лошадь","حصان","άλογο","ngựa","at","ม้า","cavalo","Pferd","اسب","cavallo","cheval","caballo","kuda","häst","кінь","cal","hest","घोड़ा","סוס","hest")');
		db1.execute('INSERT INTO DATA VALUES(12,1,"camel","らくだ","ラクダ","駱駝","RAKUDA","骆驼","낙타","верблюд","جمل","καμήλα","lạc đà","deve","อูฐ","camelo","Kamel","شتر","cammello","chameau","camello","unta","kamel","верблюд","cămilă","kamel","ऊंट","גמל","kamel")');
		db1.execute('INSERT INTO DATA VALUES(13,1,"cow","うし","ウシ","牛","USHI","牛","암소","корова","بقرة","αγελάδα","bò","inek","วัว","vaca","Kuh","گاو","vacca","vache","vaca","sapi","ko","корова","vacă","ku","गाय","פרה","ko")');
		db1.execute('INSERT INTO DATA VALUES(14,1,"deer","しか","シカ","鹿","SHIKA","鹿","사슴","олень","أيل","ελάφι","nai","geyik","กวาง","veado","Hirsch","گوزن","cervo","cerf","ciervo","rusa","hjort","олень","cerb","hjort","मृग","צבי","hjorte")');
		db1.execute('INSERT INTO DATA VALUES(15,1,"sheep","ひつじ","ヒツジ","羊","HITSUJI","羊","양","овца","خروف","πρόβατα","cừu","koyun","แกะ","ovelha","Schaf","گوسفند","pecora","mouton","oveja","domba","sheep","вівця","oaie","sau","भेड़","כבשה","får")');
		db1.execute('INSERT INTO DATA VALUES(16,1,"ostrich","だちょう","ダチョウ","駝鳥","DACHO","鸵鸟","타조","страус","نعامة","στρουθοκάμηλος","con đà điểu","devekuşu","นกกระจอกเทศ","avestruz","Strauß","شتر مرغ","struzzo","autruche","avestruz","burung unta","struts","страус","struț","struts","शुतुर मुर्ग","יען","struds")');
		
		db1.close();
		
		// データベースファイルを開きます（ない場合、作成されます）
		var db2 = Titanium.Database.open('user');
		
		//USER1 TABLE normal mode
		db2.execute('CREATE TABLE IF NOT EXISTS USER1(_id INTEGER, level INTEGER, en TEXT, ja TEXT, j1 TEXT, j2 TEXT, j3 TEXT, zh TEXT, ko TEXT, ru TEXT, ar TEXT, el TEXT, vi TEXT, tr TEXT, th TEXT, pt TEXT, de TEXT, fa TEXT, it TEXT, fr TEXT, es TEXT, id TEXT, sv TEXT, uk TEXT, ro TEXT, no TEXT, hi TEXT, he TEXT, da TEXT)');
		db2.execute('DELETE FROM USER1');
		var insert = 'INSERT INTO USER1 VALUES(0, "", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1")';
		db2.execute(insert);
		for(i=1; i<=16; i++){
			var insert = 'INSERT INTO USER1 VALUES(' + i +', "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "")';
			db2.execute(insert);
		}
		addTable(db2);
		db2.close();
	}else if(Ti.App.Properties.getInt('setDatabase')==1){
		Ti.App.Properties.setInt('setDatabase', 2);
		// データベースファイルを開きます（ない場合、作成されます）
		var db2 = Titanium.Database.open('user');
		addTable(db2);
		db2.close();
		
	}
};

function addTable(db2){
	//USER2 TABLE reverse mode
	db2.execute('CREATE TABLE IF NOT EXISTS USER2(_id INTEGER, level INTEGER, en TEXT, ja TEXT, j1 TEXT, j2 TEXT, j3 TEXT, zh TEXT, ko TEXT, ru TEXT, ar TEXT, el TEXT, vi TEXT, tr TEXT, th TEXT, pt TEXT, de TEXT, fa TEXT, it TEXT, fr TEXT, es TEXT, id TEXT, sv TEXT, uk TEXT, ro TEXT, no TEXT, hi TEXT, he TEXT, da TEXT)');
	db2.execute('DELETE FROM USER2');
	var insert = 'INSERT INTO USER2 VALUES(0, "", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1")';
	db2.execute(insert);
	for(i=1; i<=16; i++){
		var insert = 'INSERT INTO USER2 VALUES(' + i +', "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "")';
		db2.execute(insert);
	}
	//USER3 TABLE picture mode
	db2.execute('CREATE TABLE IF NOT EXISTS USER3(_id INTEGER, level INTEGER, en TEXT, ja TEXT, j1 TEXT, j2 TEXT, j3 TEXT, zh TEXT, ko TEXT, ru TEXT, ar TEXT, el TEXT, vi TEXT, tr TEXT, th TEXT, pt TEXT, de TEXT, fa TEXT, it TEXT, fr TEXT, es TEXT, id TEXT, sv TEXT, uk TEXT, ro TEXT, no TEXT, hi TEXT, he TEXT, da TEXT)');
	db2.execute('DELETE FROM USER3');
	var insert = 'INSERT INTO USER3 VALUES(0, "", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1")';
	db2.execute(insert);
	for(i=1; i<=16; i++){
		var insert = 'INSERT INTO USER3 VALUES(' + i +', "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "")';
		db2.execute(insert);
	}
	//USER4 TABLE word mode
	db2.execute('CREATE TABLE IF NOT EXISTS USER4(_id INTEGER, level INTEGER, en TEXT, ja TEXT, j1 TEXT, j2 TEXT, j3 TEXT, zh TEXT, ko TEXT, ru TEXT, ar TEXT, el TEXT, vi TEXT, tr TEXT, th TEXT, pt TEXT, de TEXT, fa TEXT, it TEXT, fr TEXT, es TEXT, id TEXT, sv TEXT, uk TEXT, ro TEXT, no TEXT, hi TEXT, he TEXT, da TEXT)');
	db2.execute('DELETE FROM USER4');
	var insert = 'INSERT INTO USER4 VALUES(0, "", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1")';
	db2.execute(insert);
	for(i=1; i<=16; i++){
		var insert = 'INSERT INTO USER1 VALUES(' + i +', "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "")';
		db2.execute(insert);
	}
	
}
