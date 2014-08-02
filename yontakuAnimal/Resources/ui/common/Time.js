//FirstView Component Constructor
function Time(win) {
	var width = Ti.Platform.displayCaps.platformWidth;
	var zoomTableview = Titanium.App.Properties.getDouble('zoomTableview');
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'#000',
	});
	
	var rows = [];
	
	var row = Ti.UI.createTableViewRow();
	
	var label = Titanium.UI.createLabel({
		color:'#fff',
		text:L('Time'),
		font:{fontSize:25*zoomTableview,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'center',
		width:Ti.UI.FILL,
	    height:60*zoomTableview,
	    backgroundGradient:{
		    type:'linear',
		    colors:[
		        {position:0.00,color:'#bfd255'},
		        {position:0.50,color:'#8eb92a'},
		        {position:0.51,color:'#72aa00'},
		        {position:1.00,color:'#9ecb2d'}
		    ]
		}
	});
	row.add(label);
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var back = Ti.UI.createButton({
		color:'#fff',
		title: L('Back'),
		font:{fontSize:20*zoomTableview,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:50*zoomTableview,
		width:100*zoomTableview,
		top:5*zoomTableview,
		bottom:5*zoomTableview,
		left:10*zoomTableview,
		radius:10*zoomTableview,
		borderRadius : 10*zoomTableview,
		borderColor:'#002400',
		borderWidth:1*zoomTableview,
		backgroundGradient:{
		    type:'linear',
		    colors:[
		        {position:0.00,color:'#bfd255'},
		        {position:0.50,color:'#8eb92a'},
		        {position:0.51,color:'#72aa00'},
		        {position:1.00,color:'#9ecb2d'}
		    ]
		},
		style:''
	});
	row.add(back);
	
	//Add behavior for UI
	back.addEventListener('click', function(e) {
		if(val != Ti.App.Properties.getInt('time')){
			Ti.API.info(val);
			var index1 = timeArray.indexOf(Ti.App.Properties.getInt('time'));
			var index2 = timeArray.indexOf(val);
			alert(L('Time_change') + '\n' + L(textArray[index1]) + ' > ' + L(textArray[index2]));
			Ti.App.Properties.setInt('time', val);
		}
		setTimeout(function(){
			win.remove(self);
		}, 100);
	});
	
	rows.push(row);
	
	var timeArray = [0, 5, 10, 20, 30, 60, 120];
	var textArray = ['No_Limit', 's5s', 's10s', 's20s', 's30s', 's60s', 's120s'];
	
	var val = Ti.App.Properties.getInt('time');
    
    for(i=0; i<timeArray.length; i++){
    		var row = Ti.UI.createTableViewRow({
		    height:'auto',
		    backgroundColor:'white',
		    val:timeArray[i],
		});
		
		var leftImage = Titanium.UI.createImageView({
		    image: '/assets/images/Checkmark-non.png',
		    left:0,
		});
		if(timeArray[i] == Ti.App.Properties.getInt('time')){
			leftImage.image = '/assets/images/Checkmark.png';
			row.backgroundColor = 'green';
		}
		/*
		leftImage.addEventListener('click', function(e) {
			if(e.source.val != Ti.App.Properties.getInt('time')){
				Ti.API.info(e.source.val);
				var index1 = timeArray.indexOf(Ti.App.Properties.getInt('time'));
				var index2 = timeArray.indexOf(e.source.val);
				alert(L('Time_change') + '\n' + L(textArray[index1]) + ' > ' + L(textArray[index2]));
				Ti.App.Properties.setInt('time', e.source.val);
				setTimeout(function(){
					var Time = require('ui/common/Time');	
					//construct UI
					var time = new Time(win);
					win.add(time);
					win.remove(self);
				}, 100);
			}
		});
		*/
		row.add(leftImage);
		
		var label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:L(textArray[i]),
			font:{fontSize:20*zoomTableview,fontFamily:'Helvetica Neue'},
			textAlign:'left',
			width:width-100,
			height:'auto',
			top:10,
			bottom:10,
			left:60,
			//opacity:0.7,
		});
		row.add(label);
		
		rows.push(row);
	}
	
	var tableview = Titanium.UI.createTableView({top: 0});
	
	tableview.addEventListener('click', function(e){
		//Ti.API.info(JSON.stringify(e));
		if(e.row.val || e.row.val==0){
			val = e.row.val;
			
		    section = tableview.data[0];
			for(i=0; i<section.rows.length; i++){
				if(i==e.index){
					section.rows[i].backgroundColor = 'green';
					children = section.rows[i].getChildren();
					children[0].image = '/assets/images/Checkmark.png';
				}else{
					section.rows[i].backgroundColor = 'white';
					children = section.rows[i].getChildren();
					children[0].image = '/assets/images/Checkmark-non.png';
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

module.exports = Time;
