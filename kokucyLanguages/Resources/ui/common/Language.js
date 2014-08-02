function Language(win, title, bgColor, arrayLevel, db1, label00) {
	var top = 0;
	var back, buttonWidth, checkTable, columns, create, create1, i, idMax, 
		idMin, insert, j, k, label, lang, lang1, row, rows, rows1, section, 
		self, table, tableview, tableview1, view, max;
	var columnArray = ['column', 'a', 'b', 'c', 'd', 'e'],//レベル１=a, レベル５=e
		arrayLanguage = ['en', 'ja', 'zh', 'ko', 'ru', 'ar', 'el', 'vi', 'tr', 'th', 'pt', 'de', 'fa', 'it', 'fr', 'es', 'id', 'sv', 'uk', 'ro', 'no', 'hi', 'he', 'da', 'is', 'ga', 'pl', 'nl', 'sw', 'ne', 'hu', 'bg'];
	
	if(Ti.Platform.osname=='android'){
		var osname = Ti.Platform.osname,
		height = Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor,
		width = Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor;
	}else{
		var osname = Ti.Platform.osname,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	}
	//create object instance, a parasitic subclass of Observable
	self = Ti.UI.createView({
		backgroundColor:'#000',
	});
	
	function scale(dimension) {
		return Math.round(dimension *  Ti.App.Properties.getDouble('osZoom') * Ti.App.Properties.getDouble('selfZoom') * Ti.Platform.displayCaps.platformWidth / 320);
	}
	
	view = Titanium.UI.createView({
		width:Ti.UI.FILL,
	    height:scale(60),
	    top:top,
	});
	self.add(view);
	
	label = Titanium.UI.createLabel({
		color:'#fff',
		backgroundColor:bgColor,
		text:L(title),
		font:{fontSize:scale(25),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'center',
		width:Ti.UI.FILL,
	    height:scale(60),
	    top:top,
	});
	view.add(label);
	
	if(scale(90)>width/2-10){
		buttonWidth = width/2-10;
	}else{
		buttonWidth = scale(90);
	}
	
	back = Ti.UI.createButton({
		color:'#fff',
		backgroundColor:bgColor,
		backgroundImage: '/assets/images/gray300x300_0.4.png',
		title: L('Back'),
		font:{fontSize:scale(20),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:scale(60),
		width:buttonWidth,
		left:scale(0),
		borderColor:'#002400',
		borderWidth:scale(1),
		opacity:1,
	});
	view.add(back);
		
	back.addEventListener('click', function(e){
		if(Titanium.App.Properties.getString('question')!=lang || Titanium.App.Properties.getString('answer')!=lang1){
			Titanium.App.Properties.setString('question', lang);
			Titanium.App.Properties.setString('answer', lang1);
			table = lang + lang1;
			label00.text = L(lang) + ' > ' + L(lang1);
			max = arrayLevel[1][0];
			Titanium.App.Properties.setInt('level', 1);
			Titanium.App.Properties.setInt('max', max);
			Titanium.App.Properties.setInt('from', 1);
			label01.text = L('Level') + ' ' + 1 +' / ' + max + L('words');
			idMin = 1;
			idMax = idMin + Titanium.App.Properties.getInt('range')-1;
			if(idMax>max){
				idMax = max;
			}
			label02.text = L('Range_') + ' ' + idMin + ' ' + L('to') + ' ' + idMax;
			
			checkTable = db1.execute("SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name='" + table + "'");
			if(checkTable.field(0)==0){
				create = 'ID INTEGER PRIMARY KEY, SETTINGS TEXT';
				for(i=1; i<=5; i++){
					for(j=1; j<=4; j++){//DATE, CORRECT, STARS, MEMO
						create = create + ', ' + columnArray[i] + j + ' TEXT';
					}
				}
				Ti.API.info(create);
		
				create1 = 'CREATE TABLE IF NOT EXISTS ' + table + ' (' + create + ')';
				db1.execute(create1);
				db1.execute('DELETE FROM ' + table);
				for(j=0; j<5; j++){
					insert = 'INSERT INTO ' + table + ' (ID) values ';
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
		}
		db1.close();
		/*
		if(Titanium.App.Properties.getString('question')!=lang && Titanium.App.Properties.getString('answer')!=lang1){
			Titanium.App.Properties.setString('question', lang);
			Titanium.App.Properties.setString('answer', lang1);
			label00.text = lang + ' > ' + lang1;
		}else if(Titanium.App.Properties.getString('question')!=lang && Titanium.App.Properties.getString('answer')==lang1){
			Titanium.App.Properties.setString('question', lang);
			//Titanium.App.Properties.setString('answer', lang1);
			label00.text = lang + ' > ' + lang1;
		}else if(Titanium.App.Properties.getString('question')==lang && Titanium.App.Properties.getString('answer')!=lang1){
			//Titanium.App.Properties.setString('question', lang);
			Titanium.App.Properties.setString('answer', lang1);
			label00.text = lang + ' > ' + lang1;
		}
		if(Titanium.App.Properties.getString('question')!=lang || Titanium.App.Properties.getString('answer')!=lang1){
			column = lang + lang1;
			column1 = column + '1';
			Titanium.App.Properties.setString('column', column);
			columnArray = [];
			pragma = 'pragma table_info(hokudai_level'+ level + ')';
			columns = db1.execute(pragma);
			while (columns.isValidRow()){
				columnArray.push(columns.field(1));
				columns.next();
			}
			Ti.API.info(columnArray);
			columns.close();
			if(columnArray.indexOf(column1)==-1){
				alter = 'ALTER TABLE hokudai_level' + level + ' ADD COLUMN ' + column + '1 TEXT';
				db1.execute(alter);
				alter1 = 'ALTER TABLE hokudai_level' + level + ' ADD COLUMN ' + column + '2 TEXT';
				db1.execute(alter1);
				alter2 = 'ALTER TABLE hokudai_level' + level + ' ADD COLUMN ' + column + '3 TEXT';
				db1.execute(alter2);
				alter3 = 'ALTER TABLE hokudai_level' + level + ' ADD COLUMN ' + column + '4 TEXT';
				db1.execute(alter3);
			}
		}
		db1.close();
		*/
		
		
		setTimeout(function(){
			win.remove(self);
		}, 100);
	});
	
	rows = [];
	
	for(i=0; i<arrayLanguage.length; i++){
		row = Ti.UI.createTableViewRow({
		    height:scale(60),
		    backgroundColor:'transparent',
		    lang:arrayLanguage[i],
		});
		
		label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:L(arrayLanguage[i]),
			font:{fontSize:scale(22),fontFamily:'Helvetica Neue'},
			textAlign:'center',
			width:width/2,
			height:'auto',
			//opacity:0.7,
		});
		row.add(label);
		
		if(Titanium.App.Properties.getString('question')==arrayLanguage[i]){
			row.backgroundColor = 'pink';
			lang = arrayLanguage[i];
		}
		
		rows.push(row);
	}
	
	tableview = Titanium.UI.createTableView({
		backgroundColor:'#fff',
		top:top+scale(60),
		width:width/2,
		left:0
	});
	
	tableview.addEventListener('click', function(e){
		Ti.API.info(JSON.stringify(e));
		lang = e.row.lang;
		
	    section = tableview.data[0];
		for(i=0; i<section.rows.length; i++){
			if(i==e.index){
				section.rows[i].backgroundColor = 'pink';
			}else{
				section.rows[i].backgroundColor = 'transparent';
			}
		}
	});
	
    tableview.startLayout();
    tableview.setData(rows);
    tableview.finishLayout();
    
    self.add(tableview);
    
    rows1 = [];
    
    for(i=0; i<arrayLanguage.length; i++){
		row = Ti.UI.createTableViewRow({
		    height:scale(60),
		    backgroundColor:'transparent',
		    lang:arrayLanguage[i],
		});
		
		label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:L(arrayLanguage[i]),
			font:{fontSize:scale(22),fontFamily:'Helvetica Neue'},
			textAlign:'center',
			width:width/2,
			height:'auto',
			//opacity:0.7,
		});
		row.add(label);
		
		if(Titanium.App.Properties.getString('answer')==arrayLanguage[i]){
			row.backgroundColor = 'pink';
			lang1 = arrayLanguage[i];
		}
		
		rows1.push(row);
	}
	
	tableview1 = Titanium.UI.createTableView({
		backgroundColor:'#ffffa3',
		top:top+scale(60),
		width:width/2,
		right:0
	});
	
	tableview1.addEventListener('click', function(e){
		Ti.API.info(JSON.stringify(e));
		lang1 = e.row.lang;
		
	    section = tableview1.data[0];
		for(i=0; i<section.rows.length; i++){
			if(i==e.index){
				section.rows[i].backgroundColor = 'pink';
			}else{
				section.rows[i].backgroundColor = 'transparent';
			}
		}
	});
	
    tableview1.startLayout();
    tableview1.setData(rows1);
    tableview1.finishLayout();
    
    self.add(tableview1);
	
	return self;
}

module.exports = Language;