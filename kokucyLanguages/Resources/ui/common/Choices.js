function Choices(win, title, bgColor) {
	var top = 0;
	var selfZoom = Titanium.App.Properties.getDouble('selfZoom'),
		choices = Titanium.App.Properties.getInt('choices');
	var back, buttonWidth, children, label, leftImage, row, rows, section, 
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
		if(Titanium.App.Properties.getInt('choices')!=choices){
			Titanium.App.Properties.setInt('choices', choices);
		}
		setTimeout(function(){
			win.remove(self);
		}, 100);
	});
	
	rows = [];
	
	arrayChoices = [1, 2, 4, 6, 8, 16, 32, 64];
	
	
	for(i=0; i<arrayChoices.length; i++){
		row = Ti.UI.createTableViewRow({
		    height:scale(60),
		    backgroundColor:'#fff',
		    choices:arrayChoices[i],
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
			text:arrayChoices[i] +  ' ' + L('Choices'),
			font:{fontSize:scale(18),fontFamily:'Helvetica Neue'},
			textAlign:'left',
			width:width-scale(60),
			height:'auto',
			left:scale(50),
			//opacity:0.7,
		});
		row.add(label);
		
		if(Titanium.App.Properties.getInt('choices')==arrayChoices[i]){
			leftImage.image = '/assets/images/check.gif';
		}
		
		rows.push(row);
	}
	
	tableview = Titanium.UI.createTableView({top:top+scale(60)});
	
	tableview.addEventListener('click', function(e){
		Ti.API.info(JSON.stringify(e));
		choices = e.row.choices;
		
	    section = tableview.data[0];
		for(i=0; i<section.rows.length; i++){
			if(i==e.index){
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

module.exports = Choices;