function Config(win, title, bgColor, dbName) {
	var arrayId = [];
 



	var height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'#000',
	});
	
	function scale(dimension) {
		return Math.round(dimension *  Ti.App.Properties.getDouble('osZoom') * Ti.App.Properties.getDouble('selfZoom') * Ti.Platform.displayCaps.platformWidth / 320);
	}
	var rows = [];
	
	var row = Ti.UI.createTableViewRow();
	
	var label = Titanium.UI.createLabel({
		color:'#fff',
		backgroundColor:bgColor,
		text:L(title),
		font:{fontSize:scale(25),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'center',
		width:Ti.UI.FILL,
	    height:scale(60),
	});
	row.add(label);
	
	var back = Ti.UI.createButton({
		color:'#fff',
		backgroundColor:bgColor,
		title: L('Back'),
		font:{fontSize:scale(20),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:scale(50),
		width:scale(80),
		top:scale(5),
		bottom:scale(5),
		left:scale(10),
		radius:scale(10),
		borderRadius :scale(10),
		borderColor:'#002400',
		borderWidth:scale(1),
		opacity:1,
	});
	row.add(back);
		
	back.addEventListener('click', function(e){
		setTimeout(function(){
			win.remove(self);
		}, 100);
	});
	
	rows.push(row);
	
	var arrayTitle = ['Test', 'Record', 'Search', 'Setting'];
	var arrayLeft = ['Paper-pencil.png', 'List.png', 'Search.png', 'System.png'];
	var arrayColor = ['#fff', '#fff', '#fff', '#fff'];
	
	for(i=0; i<arrayTitle.length; i++){
		var row = Ti.UI.createTableViewRow({
		    height:scale(60),
		    backgroundColor:arrayColor[i],
		    hasChild:true,
		});
		
		var leftImage = Titanium.UI.createImageView({
		    image: '/assets/images/' + arrayLeft[i],
		    left:0,
		    width:scale(64),
		});
		row.add(leftImage);
		
		var label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:L(arrayTitle[i]),
			font:{fontSize:scale(24),fontFamily:'Helvetica Neue'},
			textAlign:'left',
			width:width-scale(100),
			height:'auto',
			left:scale(70),
			//opacity:0.7,
		});
		row.add(label);
		
		rows.push(row);
	}
	
	var tableview = Titanium.UI.createTableView({top: 0});
	
	tableview.addEventListener('click', function(e){
	});
	
    tableview.startLayout();
    tableview.setData(rows);
    tableview.finishLayout();
    
    self.add(tableview);
	
	return self;
}

module.exports = Config;