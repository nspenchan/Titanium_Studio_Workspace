function Test(win, title, bgColor, dbName, arrayTest, db, label00, label01) {
	var top = 0;
	var back, buttonWidth, children, data, idMax, idMin, label, labelText, 
		leftImage, max, min, row, rowCount, rows, section, select, 
		self, tableview, view;
	var test = Titanium.App.Properties.getString('test');
	
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
		if(Titanium.App.Properties.getString('test')!=test){
			Titanium.App.Properties.setString('test', test);
			label00.text = labelText;
			select = 'SELECT id, bang FROM ' + dbName + ' WHERE name = "' + test + '"';
			data = db.execute(select);
			min  = data.field(1);
			idMin  = data.field(0);
			rowCount = data.rowCount;
			max = min + rowCount - 1;
			idMax = idMin + rowCount - 1;
			Ti.API.info('id: ' + idMin + '/' + idMax);
			Ti.API.info('bang: ' + min + '/' + max);
			Titanium.App.Properties.setInt('from', min);
			Titanium.App.Properties.setInt('min', min);
			Titanium.App.Properties.setInt('max', max);
			Titanium.App.Properties.setInt('idMin', idMin);
			Titanium.App.Properties.setInt('idMax', idMax);
			label01.text = L('ExamFrom') + min + L('ExamFrom2') + min + '-' + max + ' )',
			data.close();
		}
		db.close();
		setTimeout(function(){
			win.remove(self);
		}, 100);
	});
	
	rows = [];
	
	for(i=0; i<arrayTest.length; i++){
		select = 'SELECT subject, times, ampm FROM ' + dbName + ' WHERE name = "' + arrayTest[i] + '" LIMIT 1';
		data = db.execute(select);
		
		row = Ti.UI.createTableViewRow({
		    height:scale(60),
		    backgroundColor:'#fff',
		    test:arrayTest[i],
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
			text:data.field(0) + data.field(1) + '回' + data.field(2),
			font:{fontSize:scale(22),fontFamily:'Helvetica Neue'},
			textAlign:'left',
			width:width-scale(60),
			height:'auto',
			left:scale(50),
			//opacity:0.7,
		});
		row.add(label);
		
		if(Titanium.App.Properties.getString('test')==arrayTest[i]){
			leftImage.image = '/assets/images/check.gif';
			labelText = label.text;
		}
		
		rows.push(row);
	}
	data.close();
	
	tableview = Titanium.UI.createTableView({top:top+scale(60)});
	
	tableview.addEventListener('click', function(e){
		Ti.API.info(JSON.stringify(e));
		test = e.row.test;
		
	    section = tableview.data[0];
		for(i=0; i<section.rows.length; i++){
			if(i==e.index){
				children = section.rows[i].getChildren();
				children[0].image = '/assets/images/check.gif';
				labelText = children[1].text;
			}else{
				children = section.rows[i].getChildren();
				children[0].image = '/assets/images/check-non.gif';
			}
		}
	});
	
    tableview.startLayout();
    tableview.setData(rows);
    tableview.finishLayout();
    
    self.add(tableview);
	
	return self;
}

module.exports = Test;