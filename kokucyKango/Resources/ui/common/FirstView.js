//FirstView Component Constructor
function FirstView(dbName, bgColor, arrayColor, arrayTest, arrayPurchase) {
	var bang, buttonWidth, data, db, db1, From, from, height, History1, history1, 
		index, label, label00, label01, label1, leftImage, line, Question, 
		question, questionTimes, range, row, rowFinal, rowHeight, rows, rowTest, 
		s1, Search, search, select, self, Setting, setting, state1, Test, test, 
		view, width;
		
	var top = 0,
		title = 'Home',
		arraySearch = [],
		arrayTitle = ['Question', 'History', 'Search', 'Setting'],
		arrayLeft = ['Questions.png', 'List.png', 'Search.png', 'System.png'];		

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
	
	label1 = Titanium.UI.createLabel({
		color:'#fff',
		backgroundColor:'transparent',
		text:L(title),
		font:{fontSize:scale(25),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'center',
		width:Ti.UI.FILL,
	    height:scale(60),
	    top:top,
	});
	view.add(label1);
	
	if(scale(90)>width/2-10){
		buttonWidth = width/2-10;
	}else{
		buttonWidth = scale(90);
	}
	
	//tableview
	rows = [];
	if(osname=='android'){
		rowHeight = (height-scale(160))/7;
	}else{
		rowHeight = (height-scale(120))/7;
	}
	
	db = Ti.Database.open(dbName);
	
	select = 'SELECT subject, times, ampm FROM ' + dbName + ' WHERE name = "' + Titanium.App.Properties.getString('test') + '" LIMIT 1';
	data = db.execute(select);
	label1.text = data.field(0);
	
	row = Ti.UI.createTableViewRow({
	    height:rowHeight,
	    backgroundColor:'#fff',
	    hasChild:true,
	});
	
	label00 = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'transparent',
		text:data.field(0) + data.field(1) + '回' + data.field(2),
		font:{fontSize:scale(24),fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:Ti.UI.FILL,
		height:'auto',
		//opacity:0.7,
	});
	row.add(label00);
	
	rows.push(row);
	data.close();
	db.close();
	
	row = Ti.UI.createTableViewRow({
	    height:rowHeight,
	    backgroundColor:'#fff',
	    hasChild:true,
	});
	
	label01 = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'transparent',
		text:L('ExamFrom') + Titanium.App.Properties.getInt('from') 
		+ L('ExamFrom2') + Titanium.App.Properties.getInt('min') + '-' + Titanium.App.Properties.getInt('max') + ' )',
		font:{fontSize:scale(22),fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:Ti.UI.FILL,
		height:'auto',
		//opacity:0.7,
	});
	row.add(label01);
	
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
				Test = require('ui/common/Test');
				db = Ti.Database.open(dbName);
				//construct UI
				test = new Test(self, 'Test', bgColor, dbName, arrayTest, db, label00, label01);
				self.add(test);
	    		break;
	    		case 1:
				From = require('ui/common/From');
				db = Ti.Database.open(dbName);
				db1 = Ti.Database.open('record_' + dbName);
				//construct UI
				from = new From(self, 'From', bgColor, db1, label01);
				self.add(from);
	    		break;
	    		case 2:
	    			range = Titanium.App.Properties.getInt('range');
	    			bang = Titanium.App.Properties.getInt('from')-1;
	    			Ti.API.info('min: ' + Titanium.App.Properties.getInt('min'));
	    			Ti.API.info('max: ' + Titanium.App.Properties.getInt('max'));
	    			Ti.API.info('from: ' + Titanium.App.Properties.getInt('from'));
	    			if((Titanium.App.Properties.getInt('max')-Titanium.App.Properties.getInt('from'))<10){
	    				questionTimes = (Titanium.App.Properties.getInt('max')-Titanium.App.Properties.getInt('min'))%10 + 1;
	    			}else{
	    				questionTimes = range;
	    			}
				Question = require('ui/common/Question');
				db = Ti.Database.open(dbName);
				db1 = Ti.Database.open('record_' + dbName);
				//construct UI
				question = new Question(self, arrayTitle[0], arrayColor[0], dbName, arrayPurchase, [], [], -1, bang, db, db1, questionTimes, label01);
				self.add(question);
	    		break;
	    		case 3:
				db = Ti.Database.open(dbName);
				db1 = Ti.Database.open('record_' + dbName);
				History1 = require('ui/common/History');
				//construct UI
				history1 = new History1(self, arrayTitle[1], arrayColor[1], dbName, arrayPurchase, db, db1);
				self.add(history1);
	    		break;
	    		case 4:
				db = Ti.Database.open(dbName);
				db1 = Ti.Database.open('record_' + dbName);
				Search = require('ui/common/Search');
				//construct UI
				search = new Search(self, arrayTitle[2], arrayColor[2], dbName, arrayPurchase, arraySearch, db, db1, L('enter_word'), '');
				self.add(search);
	    		break;
	    		case 5:
				db = Ti.Database.open(dbName);
				db1 = Ti.Database.open('record_' + dbName);
				Setting = require('ui/common/Setting');
				//construct UI
				setting = new Setting(self, arrayTitle[3], arrayColor[3], dbName, arrayPurchase, bgColor, arrayColor, arrayTest, arrayPurchase, db, db1, label01);
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
