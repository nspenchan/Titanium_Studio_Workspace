function From(win, title, bgColor, db1, label02) {
	var top = 0;
	var columnArray = ['column', 'a', 'b', 'c', 'd', 'e'];
	var back, bang, buttonWidth, children, correctHistorys, data1, label, labelText, 
		leftImage, max, roup, roup2, row, rows, section, select1, self, 
		tableview, view;
		from = Titanium.App.Properties.getString('from'),
		level = Titanium.App.Properties.getString('level'),
		range = Titanium.App.Properties.getString('range'),
		min = Titanium.App.Properties.getInt('min'),
		max = Titanium.App.Properties.getInt('max'),
		question = Titanium.App.Properties.getString('question'),
		answer = Titanium.App.Properties.getString('answer'),
		column = columnArray[level],
		table = question + answer;
	
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
		if(Titanium.App.Properties.getString('from')!=from){
			Titanium.App.Properties.setInt('from', from);
			label02.text = labelText;
		}
		setTimeout(function(){
			win.remove(self);
		}, 100);
	});
	
	select1 = 'SELECT ' + column + '2 FROM ' + table + ' WHERE ID >= ' + min + ' AND ID<= ' + max;
	data1 = db1.execute(select1);
	
	rows = [];
	
	roup = 0;
	roup2 = 0;
	correctHistorys = '';
	while(data1.isValidRow()){
		if(data1.field(0)){
			correctHistorys +=data1.field(0).substr(-1);
			roup2++;
		}else{
			correctHistorys += '-';
		}
		
		row = Ti.UI.createTableViewRow({
		    height:'auto',
		    backgroundColor:'#fff',
		    //from:bang,
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
			//text:L('ExamFrom') + bang + L('ExamFrom3') + '\n' + correctHistorys,
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

		roup++;
		if(roup%range==0){
			bang = min + roup - range;
			label.text = L('ExamFrom') + bang + L('ExamFrom3') + '\n' + correctHistorys;
			row.from = bang;
			
			if(roup2==range){
				row.backgroundColor = 'pink';
			}else if(roup2>0){
				row.backgroundColor = 'yellow';
			}
			
			if(Titanium.App.Properties.getString('from')==bang){
				leftImage.image = '/assets/images/check.gif';
				labelText = label.text;
			}
			
			rows.push(row);
			roup2 = 0;
			correctHistorys = '';
		}else if(roup == max-min+1){
			bang = max-((max-min)%range);
			label.text = L('ExamFrom') + bang + L('ExamFrom3') + '\n' + correctHistorys;
			row.from = bang;
			if(roup2>0){
				if(roup2==roup%range){
					row.backgroundColor = 'pink';
				}else{
					row.backgroundColor = 'yellow';
				}
			}
			
			if(Titanium.App.Properties.getString('from')==bang){
				leftImage.image = '/assets/images/check.gif';
				labelText = label.text;
			}
			
			rows.push(row);
			roup2 = 0;
			correctHistorys = '';
		}
		data1.next();
	}
	data1.close();
	db1.close();
	
	tableview = Titanium.UI.createTableView({top: top+scale(60)});
	
	tableview.addEventListener('click', function(e){
		Ti.API.info(JSON.stringify(e));
		from = e.row.from;
		
	    section = tableview.data[0];
		for(i=0; i<section.rows.length; i++){
			if(i==e.index){
				max = e.row.from + Titanium.App.Properties.getInt('range')-1;
				if(max>Titanium.App.Properties.getInt('max')){
					max = Titanium.App.Properties.getInt('max');
				}
				labelText = L('Range_') + ' ' + e.row.from
					+ ' ' + L('to') + ' ' + max;
				children = section.rows[i].getChildren();
				//for(j=0; j<children.length; j++){
					if(children[0].image){
						children[0].image = '/assets/images/check.gif';
					}
				//} 
			}else{
				children = section.rows[i].getChildren();
				//for(j=0; j<children.length; j++){
					if(children[0].image){
						children[0].image = '/assets/images/check-non.gif';
					}
				//}
			}
		}
	});
	
    tableview.startLayout();
    tableview.setData(rows);
    tableview.finishLayout();
    
    self.add(tableview);
	
	return self;
}

module.exports = From;