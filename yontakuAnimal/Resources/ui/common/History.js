//FirstView Component Constructor
function History(win, answerArray, readArray1, ending, opening) {
	var height = Ti.Platform.displayCaps.platformHeight;
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
		text:L('History'),
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
		win.remove(self);
		//ending.stop();
		//opening.play();
	});
	
	rows.push(row);
	
	for(i=0; i<answerArray.length; i++){
		if(!readArray1[i+1]){
			var bgColor = 'white';
		}else if(readArray1[i+1].substr(-1, 1)>0){
			var bgColor = 'green';
		}else if(readArray1[i+1].substr(-1, 1)==0){
			var bgColor = 'pink';
		}else{
			var bgColor = 'gray';
		}

		
		var row = Ti.UI.createTableViewRow({
		    height:'auto',
		    backgroundColor:bgColor,
		    //hasChild:true,
		});
		
		if(readArray1[i+1]){
			var text = readArray1[i+	1];
		}else{
			var text = L('No_History');
		}
		text = text.replace(/0/g, '×');
		text = text.replace(/1/g, '◎');
		text = text.replace(/2/g, '○');
		
		var label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:text,
			font:{fontSize:20*zoomTableview,fontFamily:'Helvetica Neue'},
			textAlign:'left',
			width:width-180*zoomTableview,
			height:'auto',
			right:20*zoomTableview,
			top:5*zoomTableview,
			bottom:5*zoomTableview,
			//opacity:0.7,
		});
		row.add(label);
		
		var label1 = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:answerArray[i],
			font:{fontSize:20*zoomTableview,fontFamily:'Helvetica Neue'},
			textAlign:'left',
			width:120*zoomTableview,
			height:'auto',
			left:20*zoomTableview,
			top:5*zoomTableview,
			//opacity:0.7,
		});
		row.add(label1);
		
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

module.exports = History;
