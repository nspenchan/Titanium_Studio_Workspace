function History(win, title, bgColor, dbName, arrayPurchase, db, db1) {
	var top = 0,
		arrayId = [];
	var ampm, arrayRecord, back, backgroundColor, buttonWidth, children, corrects, 
		daat1, data, History2, history2, i, idMax, idMin, index, label, labelTop, 
		leftImage, que, Question, question, row, rows, sectiion, section, 
		select, select1, self, solve, stars, tableview, test, view;
	
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
				arrayId.push(section.rows[i].id);
			}
		}
		if(arrayId.length==0){
			alert(L('Select_Questions'));
		}else{
			Question = require('ui/common/Question');
			//construct UI
			question = new Question(win, 'History_', bgColor, dbName, arrayPurchase, [], arrayId, -1, '', db, db1);
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
	
	test = Titanium.App.Properties.getString('test');
	if(test.substring(0, 4) == 'care'){
		ampm = '';
	}else if(test.substring(7) == 'a'){
		ampm = '午前';
	}else if(test.substring(7) == 'b'){
		ampm = '午後';
	}
		
	labelTop = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'transparent',
		text:L(test.substring(0, 4)) + test.substring(4, 7) + '回' + ampm,
		font:{fontSize:scale(24),fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:Ti.UI.FILL,
		height:'auto',
		//opacity:0.7,
	});
	row.add(labelTop);
	
	rows.push(row);
	
	arrayRecord = [];
	
	idMin = Titanium.App.Properties.getInt('idMin');
	idMax = Titanium.App.Properties.getInt('idMax');
	select1 = 'SELECT CORRECT, STARS FROM record WHERE ID >= ' + idMin + ' AND ID<= ' + idMax;
	data1 = db1.execute(select1);
	select = 'SELECT bang, question FROM ' + dbName + ' WHERE name = "' + Titanium.App.Properties.getString('test') + '"';
	data = db.execute(select);
	
	count = 0;
	while(data1.isValidRow()){
		//arrayRecord[i] = [data1.field(0), data1.field(1)];
		
		if(data1.field(1)){
			stars = data1.field(1);
		}else{
			stars = '';
		}
		//Ti.API.info(i + ': stars: ' + arraycorrects[i][1]);
		
		que = data.field(1);
		if(que.length>20){
			que = que.substr(0, 20) +'…';
		}
		
		corrects = data1.field(0) + '';
		//Ti.API.info(corrects);
		
		if(data1.field(0)){
			if(corrects.substr(-1,1)=='○' || corrects.substr(-1,1)=='◎' ){
				backgroundColor = 'green';
			}else if(corrects.substr(-1, 1)=='×'){
				backgroundColor = 'pink';
			}
		}else{
			corrects = L('Not_questions_yet');
			backgroundColor = 'white';
		}
		
		//Ti.API.info(i);
		row = Ti.UI.createTableViewRow({
		    height:'auto',
		    backgroundColor:backgroundColor,
		    id:idMin + count,
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
			text:stars + ' ' + data.field(0) + '問 '+ que + '\n' + corrects,
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
		
		count++;
	    data.next();
	    data1.next();
	}
	data.close();
	data1.close();

	tableview = Titanium.UI.createTableView({top: top+scale(60)});
	
	tableview.addEventListener('click', function(e){
		Ti.API.info(JSON.stringify(e));
		if(e.row.id=='record'){
			History2 = require('ui/common/History2');
			//construct UI
			history2 = new History2(win, 'Recent', '#ff7f7f', dbName, arrayPurchase, db, db1);
			win.add(history2);
			
			setTimeout(function(){
				win.remove(self);
			}, 100);
		}else if(e.row.id!=''){
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