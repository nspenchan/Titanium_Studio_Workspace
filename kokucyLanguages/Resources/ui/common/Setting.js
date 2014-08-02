function Setting(win, title, bgColor, bgColor1, arrayColor, arrayLevel, arrayPurchase, dbName, db, db1, label02) {
	var top = 0;
	var arrayTitle = ['Timer', 'Choices', 'Range', 'Zoom', 'About', 'Manual', 'Store'],
		arrayLeft = ['Clock.png', 'check_2.gif', 'Refresh02.png', 'Zoom.png', 'Info.png', 'Help.png', 'shopping_basket.png'],
		arrayBool = ['noSound', 'noVibrate', 'noRecord', 'random'];
	if(Ti.Platform.locale=='ja'){
		var lang ='ja';
	}else{
		var lang = 'en';
	}
	var about, albel, alertDialog, back, body, buttonWidth, children, Choices, choices, 
		columnArray, create, create1, Delete, emailDialog, file, FirstView, firstView, 
		History2, history2, i, id, idMax, idMin, index, insert, j, k, label, leftImage, 
		mail, manual, Range, range, restart, row, rowCount, rows, self, state, store, 
		Store, switch1, tableview, Timer, timer, view, Webview, Zoom, zoom;
	
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
		setTimeout(function(){
			win.remove(self);
		}, 100);
	});
	
	
	rows = [];
	
	//Ti.API.info('rowHeight: ' + rowHeight);
	
	for(i=0; i<arrayTitle.length; i++){
		row = Ti.UI.createTableViewRow({
		    height:scale(60),
		    backgroundColor:arrayColor[i],
		    id:arrayTitle[i],
		    hasChild:true,
		});
		
		leftImage = Titanium.UI.createImageView({
		    image: '/assets/images/' + arrayLeft[i],
		    left:0,
		    width:scale(48),
		});
		row.add(leftImage);
		
		label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:L(arrayTitle[i]),
			font:{fontSize:scale(24),fontFamily:'Helvetica Neue',fontWeight:'bold'},
			textAlign:'left',
			width:width-scale(100),
			height:'auto',
			left:scale(70),
			//opacity:0.7,
		});
		row.add(label);
		
		rows.push(row);
	}
	
	//Ti.API.info('rowHeight: ' + rowHeight);
	
	for(i=0; i<arrayBool.length; i++){
		row = Ti.UI.createTableViewRow({
		    height:scale(60),
		    backgroundColor:'#fff',
		});
		
		
		label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:L(arrayBool[i]),
			font:{fontSize:scale(24),fontFamily:'Helvetica Neue',fontWeight:'bold'},
			textAlign:'left',
			width:width-scale(100),
			height:'auto',
			left:scale(10),
			//opacity:0.7,
		});
		row.add(label);
		
		//スイッチ状態の記憶
		if (Titanium.App.Properties.getBool(arrayBool[i]) == true) {
			state = true;
		} else {
			state = false;
		}
		switch1 = Titanium.UI.createSwitch({
	        value:state,
	        right:scale(10),
	        getbool:arrayBool[i]
		});
		row.add(switch1);
		
		// create a switch change listener
		switch1.addEventListener('change', function(e){
			Ti.API.info(JSON.stringify(e));
		    // e.valueにはスイッチの新しい値が true もしくは falseとして設定されます。
		    if(e.value==true){
		    		Ti.App.Properties.setBool(e.source.getbool, true);
		    }else{
		    		Ti.App.Properties.setBool(e.source.getbool, false);
		    }
		});
		
		rows.push(row);
	}
	
	row = Ti.UI.createTableViewRow({
	    height:scale(60),
	    backgroundColor:arrayColor[7],
	});
	
	label = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'transparent',
		text:L('All_History'),
		font:{fontSize:scale(24),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'left',
		width:width-scale(100),
		height:'auto',
		left:scale(10),
		//opacity:0.7,
	});
	row.add(label);
	
	Delete = Ti.UI.createButton({
		color:'#000',
		backgroundColor:arrayColor[7],
		backgroundImage: '/assets/images/gray300x300_0.4.png',
		title: L('Delete'),
		font:{fontSize:scale(20),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:scale(60),
		width:buttonWidth,
		right:scale(0),
		borderColor:'#002400',
		borderWidth:scale(1),
		opacity:1,
	});
	row.add(Delete);
		
	Delete.addEventListener('click', function(e){
		alertDialog = Titanium.UI.createAlertDialog({
		    title: L('All_History') + ' ' + L('Delete'),
		    message: L('delete_message'),
		    buttonNames: [L('OK'),L('Cancel')],
		    // キャンセルボタンがある場合、何番目(0オリジン)のボタンなのかを指定できます。
		    cancel: 1
		});
		alertDialog.addEventListener('click',function(event){
		    // Cancelボタンが押されたかどうか
		    if(event.index == 1){
		        // cancel時の処理
		    }
		    // 選択されたボタンのindexも返る
		    if(event.index == 0){
		        // "OK"時の処理
		        Titanium.App.Properties.setString('recordIds', '');
		        Titanium.App.Properties.setString('recordSearch', '');
		        
				//英語ー日本語の履歴データ、メモ、スターのカラムを作る。それ以外はpickerLnaguages.js で作成する
				create = 'ID INTEGER PRIMARY KEY, SETTINGS TEXT';//DATE TEXT, CORRECT INTEGER, STARS INTGER, MEMO TEXT';

				columnArray = ['enja', 'enzh', 'enko', 'enru'];
				for(i=0; i<columnArray.length; i++){
					Ti.API.info(columnArray[i]);
					//DATE, COFRECT, STARS, MEMO
					create = create + ', ' + columnArray[i] + '1 TEXT, ' + columnArray[i] + '2 TEXT, ' + columnArray[i] + '3 INTGER, ' + columnArray[i] + '4 TEXT';
				}
				Ti.API.info(create);
			
				for(i=1; i<=5; i++){
					//i = 1;
					//setTimeout(function(){
						rowCount = arrayLevel[i][0];
						create1 = 'CREATE TABLE IF NOT EXISTS hokudai_level' + i + ' (' + create + ')';
						db1.execute(create1);
						db1.execute('DELETE FROM hokudai_level' + i);
						for(j=0; j<5; j++){Ti.API.info(i + '/' + j);
							insert = 'INSERT INTO hokudai_level' + i + ' (ID) values ';
							idMin = 1 + 500*j;
							idMax = 500 + 500*j;
							if(idMax>rowCount){
								idMax = rowCount;
							}
							if(idMin<rowCount){
								Ti.API.info('min: ' + idMin + '/' + idMax);
								for(k=idMin; k<=idMax; k++){
									insert = insert + '(' + k + '),';
								}
								//setTimeout(function(){
									Ti.API.info(insert.slice(0,-1));
									db1.execute(insert.slice(0,-1));
								//}, 100);
							}
						}
					//}, 1000);
				}
				db1.close();
				setTimeout(function(){
					win.remove(self);
				}, 100);
		    }
		});
		alertDialog.show();
	});
	
	rows.push(row);
	
	row = Ti.UI.createTableViewRow({
	    height:scale(60),
	    backgroundColor:arrayColor[8],
	});
	
	label = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'transparent',
		text:L('Contact_us'),
		font:{fontSize:scale(24),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'left',
		width:width-scale(100),
		height:'auto',
		left:scale(10),
		//opacity:0.7,
	});
	row.add(label);
	
	mail = Ti.UI.createButton({
		color:'#000',
		backgroundColor:arrayColor[8],
		backgroundImage: '/assets/images/gray300x300_0.4.png',
		title: L('Mail'),
		font:{fontSize:scale(20),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:scale(60),
		width:buttonWidth,
		right:scale(0),
		borderColor:'#002400',
		borderWidth:scale(1),
		opacity:1,
	});
	row.add(mail);
		
	mail.addEventListener('click', function(e){
		emailDialog = Titanium.UI.createEmailDialog();
		
		// 題名の初期値をセットします
		emailDialog.setSubject(L('Countact_us') + ': kokucyLanguages32');
		
		// To, Cc, Bccについては文字列配列として引き渡します。
		emailDialog.setToRecipients([Titanium.App.Properties.getString('mail')]);
		//emailDialog.setCcRecipients(['bar@yahoo.com']);
		//emailDialog.setBccRecipients(['hoge@yahoo.com']);
		
		// 本文と添付(ここではすでにimageというオブジェクトがある前提)を初期設定します。
		emailDialog.setMessageBody(L('mail_message'));
		//emailDialog.addAttachment(image);
		
		// ツールバー色を指定して画面を開きます。
		emailDialog.setBarColor('#336699');
		emailDialog.open();
	});
	
	rows.push(row);
	
	row = Ti.UI.createTableViewRow({
	    height:scale(60),
	    backgroundColor:'#000',
	});
	
	label = Titanium.UI.createLabel({
		color:'red',
		backgroundColor:'transparent',
		text:L('Restart'),
		font:{fontSize:scale(24),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'left',
		width:width-scale(100),
		height:'auto',
		left:scale(10),
		//opacity:0.7,
	});
	row.add(label);
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	restart = Ti.UI.createButton({
		color:'red',
		backgroundColor:'#000',
		backgroundImage: '/assets/images/gray300x300_0.4.png',
		title: L('Restart'),
		font:{fontSize:scale(20),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:scale(60),
		width:buttonWidth,
		right:scale(0),
		borderColor:'#002400',
		borderWidth:scale(1),
	});
	row.add(restart);
	
	//Add behavior for UI
	restart.addEventListener('click', function(e) {
		children = win.getChildren();
		for(i=0; i<children.length; i++){
			win.remove(children[i]);
		}
		setTimeout(function(){
			FirstView = require('ui/common/FirstView');
			//construct UI
			firstView = new FirstView(dbName, bgColor1, arrayLevel, arrayPurchase);
			win.add(firstView);
		}, 1000);
	});
	
	rows.push(row);
	
	tableview = Titanium.UI.createTableView({top: top+scale(60)});
	
	tableview.addEventListener('click', function(e){
		//eventオブジェクト
	    id = e.row.id;
	    index = e.index; 
	    switch(id){
	    		case -1:
				History2 = require('ui/common/History2');
				//construct UI
				history2 = new History2(win, 'Recent', arrayColor[index], dbName, arrayPurchase, db, db1);
				win.add(history2);
				
				setTimeout(function(){
					win.remove(self);
				}, 100);
	    		break;
	    		case 'Timer':
				Timer = require('ui/common/Timer');
				//construct UI
				timer = new Timer(win, arrayTitle[index], arrayColor[index]);
				win.add(timer);
	    		break;
	    		case 'Choices':
				Choices = require('ui/common/Choices');
				//construct UI
				choices = new Choices(win, arrayTitle[index], arrayColor[index]);
				win.add(choices);
	    		break;
	    		case 'Range':
				Range = require('ui/common/Range');
				//construct UI
				range = new Range(win, arrayTitle[index], arrayColor[index], label02);
				win.add(range);
	    		break;
	    		case 'Zoom':
				Zoom = require('ui/common/Zoom');
				//construct UI
				zoom = new Zoom(win, arrayTitle[index], arrayColor[index], dbName, bgColor1, arrayColor, arrayLevel, arrayPurchase);
				win.add(zoom);
	    		break;
	    		case 'About':
				file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, '/ui/common/' + dbName + '/about_' + lang + '.html');
				body = file.read();
				Webview = require('ui/common/Webview');
				//construct UI
				about = new Webview(win, arrayTitle[index], arrayColor[index], body);
				win.add(about);
	    		break;
	    		case 'Manual':
				file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, '/ui/common/' + dbName + '/manual_' + lang + '.html');
				body = file.read();
				Webview = require('ui/common/Webview');
				//construct UI
				manual = new Webview(win, arrayTitle[index], arrayColor[index],body);
				win.add(manual);
	    		break;
	    		case 'Store':
				Store = require('ui/common/Store');
				//construct UI
				store = new Store(win, 'Shop', arrayColor[index], arrayColor, arrayPurchase);
				win.add(store);
	    		break;
	    }
	});
	
    tableview.startLayout();
    tableview.setData(rows);
    tableview.finishLayout();
    
    self.add(tableview);
	
	return self;
}

module.exports = Setting;