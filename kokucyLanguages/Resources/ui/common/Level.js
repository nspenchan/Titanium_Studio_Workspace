function Level(win, title, bgColor, arrayLevel, db1, label01, label02) {
	var top = 0;
	var level = Titanium.App.Properties.getInt('level'),
		max = Titanium.App.Properties.getInt('max');
	var back, buttonWidth, children, column, column1, 
		idMax, idMin, label, leftImage, row, rows, section, 
		self, tableview, view;
	
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
		if(Titanium.App.Properties.getInt('level')!=level){
			Titanium.App.Properties.setInt('level', level);
			Titanium.App.Properties.setInt('max', max);
			Titanium.App.Properties.setInt('from', 1);
			label01.text = L('Level') + ' ' + level +' / ' + arrayLevel[level][0] + L('words');
			idMin = 1;
			idMax = idMin + Titanium.App.Properties.getInt('range')-1;
			if(idMax>max){
				idMax = max;
			}
			/*
			column = Ti.App.Properties.getString('question') + Ti.App.Properties.getString('answer');
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
			*/
			label02.text = L('Range_') + ' ' + idMin + ' ' + L('to') + ' ' + idMax;
		}
		db1.close();
		setTimeout(function(){
			win.remove(self);
		}, 100);
	});
	
	rows = [];
	
	for(i=1; i<=arrayLevel.length-1; i++){
		
		row = Ti.UI.createTableViewRow({
		    height:scale(60),
		    backgroundColor:'#fff',
		    level:i,
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
			text:L('Level') + ' ' + i +' / ' + arrayLevel[i][0] + L('words') + '\n (' + L(arrayLevel[i][1]) + ')',
			font:{fontSize:scale(22),fontFamily:'Helvetica Neue'},
			textAlign:'left',
			width:width-scale(70),
			height:'auto',
			left:scale(60),
			//opacity:0.7,
		});
		row.add(label);
		
		if(Titanium.App.Properties.getInt('level')==i){
			leftImage.image = '/assets/images/check.gif';
		}
		
		rows.push(row);
	}
	
	tableview = Titanium.UI.createTableView({top:top+scale(60)});
	
	tableview.addEventListener('click', function(e){
		Ti.API.info(JSON.stringify(e));
		level = e.row.level;
		max = arrayLevel[level][0];
		
	    section = tableview.data[0];
		for(i=0; i<section.rows.length; i++){
			if(i==e.index){
				children = section.rows[i].getChildren();
				if(children[0].image){
					children[0].image = '/assets/images/check.gif';
				}
			}else{
				children = section.rows[i].getChildren();
				if(children[0].image){
					children[0].image = '/assets/images/check-non.gif';
				}
			}
		}
	});
	
    tableview.startLayout();
    tableview.setData(rows);
    tableview.finishLayout();
    
    self.add(tableview);
	
	return self;
}

module.exports = Level;