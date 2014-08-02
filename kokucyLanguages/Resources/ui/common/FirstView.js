//FirstView Component Constructor
function FirstView(dbName, bgColor, arrayColor, arrayLevel, arrayPurchase) {
	var top = 0;
	var title = 'Home';
		arraySearch = [],
		level = Ti.App.Properties.getInt('level'),
		question = Titanium.App.Properties.getString('question'),
		answer = Titanium.App.Properties.getString('answer'),
		arrayTitle = ['Question', 'History', 'Search', 'Setting'],
		arrayLeft = ['Questions.png', 'List.png', 'Search.png', 'System.png'];
	var bang, buttonWidth, db, db1, From, from, History1, history1, index, label, lable02, 
		Language, language, leftImage, Level, level1, line, max, Question, 
		question, questionTimes, range, row, rowFinal, rowHeight, rows, rowTest, s1, 
		Search, search, searchMode, self, Setting, setting, state1, tableview, view;
	
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
	//Ti.API.info(Ti.Platform.displayCaps.logicalDensityFactor);
	
	//Ti.API.info('h: ' + height + '/w: ' + width);
	
	view = Ti.UI.createView({
	    height:scale(60),
	    backgroundColor:bgColor,
	    top:top,
	});
	self.add(view);
	
	line = Ti.UI.createView({
	    height:scale(2),
	    backgroundColor:'#000',
	    bottom:0,
	    //hasChild:true,
	});
	view.add(line);
	
	label = Titanium.UI.createLabel({
		color:'#fff',
		backgroundColor:'transparent',
		text:L(dbName),
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
	
	//tableview
	rows = [];
	if(osname=='android'){
		rowHeight = (height-scale(160))/8;
	}else{
		rowHeight = (height-scale(120))/8;
	}
	
	row = Ti.UI.createTableViewRow({
	    height:rowHeight,
	    backgroundColor:'#fff',
	    hasChild:true,
	});
	
	label00 = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'transparent',
		text:L(question) + ' > ' + L(answer),
		font:{fontSize:scale(24),fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:Ti.UI.FILL,
		height:'auto',
		//opacity:0.7,
	});
	row.add(label00);
	
	rows.push(row);
	
	row = Ti.UI.createTableViewRow({
	    height:rowHeight,
	    backgroundColor:'#fff',
	    hasChild:true,
	});
	
	label01 = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'transparent',
		text:L('Level') + ' ' + level +' / ' + arrayLevel[level][0] + L('words'),
		font:{fontSize:scale(24),fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:Ti.UI.FILL,
		height:'auto',
		//opacity:0.7,
	});
	row.add(label01);
	
	rows.push(row);
	
	row = Ti.UI.createTableViewRow({
	    height:rowHeight,
	    backgroundColor:'#fff',
	    hasChild:true,
	});
	max = Titanium.App.Properties.getInt('from') + Titanium.App.Properties.getInt('range')-1;
	if(max>Titanium.App.Properties.getInt('max')){
		max = Titanium.App.Properties.getInt('max');
	}
	
	label02 = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'transparent',
		text:L('Range_') + ' ' + Titanium.App.Properties.getInt('from') + ' ' + L('to') + ' ' + max,
		font:{fontSize:scale(22),fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:Ti.UI.FILL,
		height:'auto',
		//opacity:0.7,
	});
	row.add(label02);
	
	rows.push(row);
	//Ti.API.info('rowHeight: ' + rowHeight);
	
	for(i=0; i<arrayTitle.length; i++){
		row = Ti.UI.createTableViewRow({
		    height:rowHeight,
		    backgroundColor:arrayColor[i],
		    hasChild:true,
		});
		if(i==0){
			row.height = rowHeight*2;
		}
		
		leftImage = Titanium.UI.createImageView({
		    image: '/assets/images/' + arrayLeft[i],
		    left:0,
		    width:scale(48),
		});
		row.add(leftImage);
		
		label = Titanium.UI.createLabel({
			color:'#fff',
			backgroundColor:'transparent',
			//backgroundImage: '/assets/images/gray300x300_0.4.png',
			text:L(arrayTitle[i]),
			font:{fontSize:scale(30),fontFamily:'Helvetica Neue',fontWeight:'bold'},
			textAlign:'center',
			width:'auto',
			height:'auto',
			//left:0,
			//opacity:0.7,
		});
		row.add(label);
		
		rows.push(row);
	}
	//final Row
	rowFinal = Ti.UI.createTableViewRow({
	    height:scale(60),
	    backgroundColor:bgColor,
	    //bottom:0,
	    //hasChild:true,
	});
	
	line = Ti.UI.createView({
	    height:scale(2),
	    backgroundColor:'#000',
	    top:0,
	    //hasChild:true,
	});
	rowFinal.add(line);
		
	leftImage = Titanium.UI.createImageView({
	    image: '/assets/images/nspenchan_logo_114.png',
	    width:scale(48),
	    height:scale(48),
	    left:0,
	});
	rowFinal.add(leftImage);
	
	label = Titanium.UI.createLabel({
		color:'#fff',
		backgroundColor:'transparent',
		text:L('Developed_by_nspenchan'),
		font:{fontSize:scale(18),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'left',
		width:width-scale(60),
		height:'auto',
		left:scale(60),
		//opacity:0.7,
	});
	rowFinal.add(label);
	
	rows.push(rowFinal);
	
	rowFinal.addEventListener('click', function(e) {
		alert('Thank you for using kokucy app!');
	});
	
	//Test Mode
	rowTest = Ti.UI.createTableViewRow({
	    height:'auto',
	    backgroundColor:'white',
	    //hasChild:true,
	});
		
	leftImage = Titanium.UI.createImageView({
	    image: '/assets/images/Alert.png',
	    left:0,
	});
	rowTest.add(leftImage);
	
	label = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'transparent',
		text:L('Test_Mode'),
		font:{fontSize:scale(20),fontFamily:'Helvetica Neue'},
		textAlign:'left',
		width:width-scale(100),
		height:'auto',
		top:scale(10),
		bottom:scale(10),
		left:scale(60),
		//opacity:0.7,
	});
	rowTest.add(label);
	//スイッチ状態の記憶
	if (Titanium.App.Properties.getBool('testMode') == true) {
		state1 = true;
	} else {
		state1 = false;
	}
	s1 = Titanium.UI.createSwitch({
        value:state1,
        //top:10,
        //bottom:10,
        right:scale(10),
	});
	rowTest.add(s1);

	// create a switch change listener
	s1.addEventListener('change', function(e) {
	    // e.valueにはスイッチの新しい値が true もしくは falseとして設定されます。
	    if(e.value==true){
	    		Ti.App.Properties.setBool('testMode', true);
	    }else{
	    		Ti.App.Properties.setBool('testMode', false);
	    }
	});

	//test mode
	//rows.push(rowTest);
	
	tableview = Titanium.UI.createTableView({top: top+scale(60)});
	
	tableview.addEventListener('click', function(e){
		//eventオブジェクト
	    index = e.index; 
	    switch(index){
	    		case 0:
				Language = require('ui/common/Language');
				db1 = Ti.Database.open('record_' + dbName);
				//construct UI
				language = new Language(self, 'Language', bgColor, arrayLevel, db1, label00);
				self.add(language);
	    		break;
	    		case 1:
				Level = require('ui/common/Level');
				db1 = Ti.Database.open('record_' + dbName);
				//construct UI
				level1 = new Level(self, 'Level', bgColor, arrayLevel, db1, label01, label02);
				self.add(level1);
	    		break;
	    		case 2:
		    		alert(L('Wait_a_moment'));
				From = require('ui/common/From');
				db1 = Ti.Database.open('record_' + dbName);
				//construct UI
				from = new From(self, 'From', bgColor, db1, label02);
				self.add(from);
	    		break;
	    		case 3:
				db = Ti.Database.open(dbName);
				db1 = Ti.Database.open('record_' + dbName);
	    			bang = Titanium.App.Properties.getInt('from')-1;
	    			range = Titanium.App.Properties.getInt('range');
	    			if((Titanium.App.Properties.getInt('max')-Titanium.App.Properties.getInt('from'))<range){
	    				questionTimes = (Titanium.App.Properties.getInt('max')-Titanium.App.Properties.getInt('min'))%range + 1;
	    			}else{
	    				questionTimes = range;
	    			}
				Question = require('ui/common/Question');
				//construct UI
				question1 = new Question(self, arrayTitle[0], arrayColor[0], [], [], -1, bang, db, db1, questionTimes, label02);
				self.add(question1);
	    		break;
	    		case 4:
		    		alert(L('Wait_a_moment'));
				db = Ti.Database.open(dbName);
				db1 = Ti.Database.open('record_' + dbName);
				History1 = require('ui/common/History');
				//construct UI
				history1 = new History1(self, arrayTitle[1], arrayColor[1], dbName, db, db1, label02);
				self.add(history1);
	    		break;
	    		case 5:
				db = Ti.Database.open(dbName);
				db1 = Ti.Database.open('record_' + dbName);
	    			if (Titanium.App.Properties.getBool('serachMode') == true) {
					searchMode = L('Search_Range_') + L(question) + ' / ' + L(answer) + '\n' + L('ALL');
				}else{
					searchMode = L('Search_Range_') + L(question) + ' / ' + L(answer) + '\n' + L('Level') + ' ' + level;
				}
				Search = require('ui/common/Search');
				//construct UI
				search = new Search(self, arrayTitle[2], arrayColor[2], [], db, db1, L('enter_word'), searchMode);
				self.add(search);
	    		break;
	    		case 6:
				db = Ti.Database.open(dbName);
				db1 = Ti.Database.open('record_' + dbName);
				Setting = require('ui/common/Setting');
				//construct UI
				setting = new Setting(self, arrayTitle[3], arrayColor[3], bgColor, arrayColor, arrayLevel, arrayPurchase, dbName, db, db1, label02);
				self.add(setting);
	    		break;
	    		
	    		default:
	    		
	    		break;
	    }
	});
	
    tableview.startLayout();
    tableview.setData(rows);
    tableview.finishLayout();
    
    self.add(tableview);
	
	return self;
}

module.exports = FirstView;
