function History(win, title, bgColor, dbName, db, db1, label02) {
	var top = 0,
		columnArray = ['column', 'a', 'b', 'c', 'd', 'e'],//レベル１=a, レベル５=e
		arrayId = [],
		level = Titanium.App.Properties.getString('level'),
		question = Titanium.App.Properties.getString('question'),
		answer = Titanium.App.Properties.getString('answer'),
		column = columnArray[level],
		table = question + answer,
		arrayRecord = [],
		questionArray = ['question'],
		answerArray = ['answer'],
		correctArray = ['correct'],
		starsArray = ['stars'];
	var back, backgroundColor, buttonWidath, children, corrects, count, data, data1, 
		history2, Histrory2, i, index, j, label, labelTop, leftImage, 
		Question, question, row, rowCount, rowId, rows, section, select, select1, 
		self, solve, stars, tableview, view;
	
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
	
	solve = Ti.UI.createButton({
		color:'#fff',
		backgroundColor:bgColor,
		backgroundImage: '/assets/images/gray300x300_0.4.png',
		title: L('Solve'),
		font:{fontSize:scale(20),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:scale(60),
		width:buttonWidth,
		right:scale(0),
		borderColor:'#002400',
		borderWidth:scale(1),
		opacity:1,
	});
	view.add(solve);
		
	solve.addEventListener('click', function(e){
		section = tableview.data[0];
		for(i=0; i<section.rows.length; i++){
			if(section.rows[i].check == 1){
				arrayId.push(level + ',' + section.rows[i].id + ',' + section.rows[i].question + ',' + section.rows[i].answer);
			}
		}
		Ti.API.info(arrayId);
		if(arrayId.length==0){
			alert(L('Select_Questions'));
		}else{
			//alert('arrayId[0]: ' + arrayId[0]);
			//db = Ti.Database.open(dbName);
			//db1 = Ti.Database.open('record_' + dbName);
    			//arrayRecord = [];
    			//bang = '';
			Question = require('ui/common/Question');
			//construct UI
			question = new Question(win, 'History_', bgColor, [], arrayId, -1, '', db, db1, '', label02);
			win.add(question);
			
			setTimeout(function(){
				win.remove(self);
			}, 100);
		}
	});
	
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
		db.close();
		db1.close();
		setTimeout(function(){
			win.remove(self);
		}, 100);
	});
	
	rows = [];
	
	if(Titanium.App.Properties.getString('recordIds')){
		row = Ti.UI.createTableViewRow({
		    height:scale(60),
		    backgroundColor:'#ff7f7f',
		    hasChild:true,
		    id:'record',
		});
		
		leftImage = Titanium.UI.createImageView({
		    image: '/assets/images/Bookmark.png',
		    left:0,
		    width:scale(48),
		});
		row.add(leftImage);
		
		label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:L('History_Questions'),
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
	
	row = Ti.UI.createTableViewRow({
	    height:scale(60),
	    backgroundColor:'gray',
	    id:'',
	});
		
	labelTop = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'transparent',
		text:L('Level') + ' ' + level,
		font:{fontSize:scale(24),fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:Ti.UI.FILL,
		height:'auto',
		//opacity:0.7,
	});
	row.add(labelTop);
	
	rows.push(row);

	select = 'SELECT ' + question + ', ' + answer + ' FROM hokudai_level' + level;
	Ti.API.info(select);
	data = db.execute(select);
	rowCount = data.rowCount;
	while(data.isValidRow()){
		if(data.field(0)){
			questionArray.push(data.field(0));
		}else{
			questionArray.push(L('undefined'));
		}
		if(data.field(1)){
			answerArray.push(data.field(1));
		}else{
			answerArray.push(L('undefined'));
		}
		data.next();
	}
	//Ti.API.info(questionArray);
	select1 = "SELECT " + column + "2, "+ column + "3 FROM " + table;
	data1 = db1.execute(select1);
	count = 0;
	while(data1.isValidRow()){
		if(count<rowCount){
			if(data1.field(0)){
				correctArray.push(data1.field(0));
			}else{
				correctArray.push('');
			}
			if(data1.field(1)){
				starsArray.push(data1.field(1));
			}else{
				starsArray.push('');
			}
		}
		data1.next();
		count++;
	}
	data.close();
	data1.close();

	for(i=1; i<=rowCount; i++){
		corrects = correctArray[i] + '';
		//Ti.API.info(corrects);
		
		if(correctArray[i]){
			if(corrects.substr(-1,1)=='○' || corrects.substr(-1,1)=='◎' ){
				backgroundColor = 'green';
			}else if(corrects.substr(-1, 1)=='×'){
				backgroundColor = 'pink';
			}
		}else{
			corrects = L('Not_questions_yet');
			backgroundColor = 'white';
		}
		
		if(starsArray[i]){
			stars = starsArray[i];
		}else{
			stars = '';
		}
		
		//Ti.API.info(i);
		row = Ti.UI.createTableViewRow({
		    height:'auto',
		    backgroundColor:backgroundColor,
		    id:i,
		    question:question,
		    answer:answer,
		    check:0,
		});
		leftImage = Titanium.UI.createImageView({
		    image: '/assets/images/check-non.gif',
		    width:scale(48),
		    height:scale(48),
		    left:0,
		});
		row.add(leftImage);
		
		label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:L('Level') + ' ' + level + ' / ' + L('No_') + i + ' ' + stars + '\n' + questionArray[i] + ' / ' + answerArray[i] + '\n' + corrects,
			font:{fontSize:scale(18),fontFamily:'Helvetica Neue'},
			textAlign:'left',
			width:width-scale(60),
			height:'auto',
			left:scale(50),
			top:scale(10),
			bottom:scale(10),
			//opacity:0.7,
		});
		row.add(label);
		
		rows.push(row);
	}

	tableview = Titanium.UI.createTableView({top: top+scale(60)});
	
	tableview.addEventListener('click', function(e){
		rowId = e.row.id;
		Ti.API.info(JSON.stringify(e));
		if(rowId=='record'){
			History2 = require('ui/common/History2');
			//construct UI
			history2 = new History2(win, 'Recent', '#ff7f7f', db, db1);
			win.add(history2);
			
			setTimeout(function(){
				win.remove(self);
			}, 100);
		}else if(rowId!=''){
		    section = tableview.data[0];
			index = e.index;
			children = section.rows[index].getChildren();
			if(children[0].image=='/assets/images/check-non.gif'){
				children[0].image = '/assets/images/check.gif';
				section.rows[index].check = 1;
			}else if(children[0].image=='/assets/images/check.gif'){
				children[0].image = '/assets/images/check-non.gif';
				section.rows[index].check = 0;
			}
		}
	});
	
    tableview.startLayout();
    tableview.setData(rows);
    tableview.finishLayout();
    
    self.add(tableview);
	
	return self;
}

module.exports = History;