//FirstView Component Constructor
function Effect(win) {
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
		text:L('Visual_Effect'),
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
		if(val != Ti.App.Properties.getString('effect')){
			alert(L('Visual_Effect_change') + '\n' + L(Ti.App.Properties.getString('effect')) + ' > ' + L(val));
			Ti.App.Properties.setString('effect', val);
		}
		setTimeout(function(){
			win.remove(self);
		}, 100);
	});
	
	rows.push(row);
	
	var effectArray = ['non', 'opacity', 'cloud', 'zoom', 'rotate', 'random'];
	
	var val = Ti.App.Properties.getString('effect');
    
    for(i=0; i<effectArray.length; i++){
    		var row = Ti.UI.createTableViewRow({
		    height:'auto',
		    backgroundColor:'white',
		    val:effectArray[i],
		});
		
		var leftImage = Titanium.UI.createImageView({
		    image: '/assets/images/Checkmark-non.png',
		    left:0
		});
		if(effectArray[i] == Ti.App.Properties.getString('effect')){
			leftImage.image = '/assets/images/Checkmark.png';
			row.backgroundColor = 'green';
		}
		/*
		leftImage.addEventListener('click', function(e) {
			if(e.source.val != Ti.App.Properties.getString('effect')){
				Ti.API.info(effectArray[i]);
				alert(L('Visual_Effect_change') + '\n' + L(Ti.App.Properties.getString('effect')) + ' > ' + L(e.source.val));
				Ti.App.Properties.setString('effect', e.source.val);
				setTimeout(function(){
					var Effect = require('ui/common/Effect');	
					//construct UI
					var effect = new Effect(win);
					win.add(effect);
					win.remove(self);
				}, 100);
			}
		});
		*/
		row.add(leftImage);
		
		var label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:L(effectArray[i]),
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

module.exports = Effect;
