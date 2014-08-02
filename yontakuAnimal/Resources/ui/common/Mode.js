//FirstView Component Constructor
function Mode(win, purchase, label00) {
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
		text:L('Mode_Select'),
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
		if(val != Ti.App.Properties.getString('mode')){
			Ti.API.info(val);
			var index1 = modeArray.indexOf(Ti.App.Properties.getString('mode'));
			var index2 = modeArray.indexOf(val);
			alert(L('Mode_change') + '\n' + L(textArray[index1]) + '\n => \n' + L(textArray[index2]));
			Ti.App.Properties.setString('mode', val);
			switch(val){
		    		case modeArray[0]:
					Titanium.App.Properties.setString('recordDatabase', 'USER1');
		    		break;
		    		case modeArray[1]:
					Titanium.App.Properties.setString('recordDatabase', 'USER2');
		    		break;
		    		case modeArray[2]:
					Titanium.App.Properties.setString('recordDatabase', 'USER3');
		    		break;
		    		case modeArray[3]:
					Titanium.App.Properties.setString('recordDatabase', 'USER4');
		    		break;
		    		
		    		default:
		    			//
		    		break;
		    }
			setTimeout(function(){
				var db2 = Titanium.Database.open('user');
			    var select = 'SELECT ' + Titanium.App.Properties.getString('answerName') + ' FROM '  + Titanium.App.Properties.getString('recordDatabase') + ' WHERE _id = 0';;
			    //alert(select);
			    var rows = db2.execute(select);
			    while(rows.isValidRow()){
				    var level = rows.field(0);
				    rows.next();
				}
			    Ti.API.info('level: ' + level);
			    rows.close();
			    db2.close();
			    
			    	Titanium.App.Properties.setInt('level', level);
			    
				if(purchase.substr(0,1)=='y' && Titanium.App.Properties.getString('mode')=='picture'){
					label00.text = L(Ti.App.Properties.getString('mode') + '_mode') + '\n' + L('Level_') + level;
				}else if(purchase.substr(0,1)=='y' && val!='normal'){
					label00.text = L(Titanium.App.Properties.getString('answerName')) + '\n' + L(Ti.App.Properties.getString('mode') + '_mode') + '\n' + L('Level_') + level;
				}else{
					label00.text = L(Titanium.App.Properties.getString('answerName')) + '\n' + L('Level_') + level;
				}
			    
				win.remove(self);
			}, 100);
		}else{
			setTimeout(function(){
				win.remove(self);
			}, 100);
		}
	});
	
	rows.push(row);
	
	if(purchase.substr(0, 1)=='y'){
		var modeArray = ['normal', 'reverse', 'picture', 'word'];
		var textArray = ['normal_mode', 'reverse_mode', 'picture_mode', 'word_mode'];
		var textArray2 = ['q1', 'q2', 'q1', 'q2'];
		var textArray3 = ['a2', 'a1', 'a1', 'a2'];
	}else{
		var modeArray = ['normal', 'word', 'reverse'];
		var textArray = ['normal_mode', 'word_mode', 'reverse_mode'];
		var textArray2 = ['q1', 'q3', 'q4'];
		var textArray3 = ['a2', 'a3', 'a4'];
	}
	
	var val = Ti.App.Properties.getString('mode');
    
    for(i=0; i<modeArray.length; i++){
    		var row = Ti.UI.createTableViewRow({
		    height:'auto',
		    backgroundColor:'white',
		    val:modeArray[i],
		});
		
		var leftImage = Titanium.UI.createImageView({
		    image: '/assets/images/Checkmark-non.png',
		    left:0,
		});
		if(modeArray[i] == Ti.App.Properties.getString('mode')){
			leftImage.image = '/assets/images/Checkmark.png';
			row.backgroundColor = 'green';
		}
		/*
		leftImage.addEventListener('click', function(e) {
			if(e.source.val != Ti.App.Properties.getString('mode')){
				Ti.API.info(e.source.val);
				var index1 = modeArray.indexOf(Ti.App.Properties.getString('mode'));
				var index2 = modeArray.indexOf(e.source.val);
				alert(L('Mode_change') + '\n' + L(textArray[index1]) + '\n => \n' + L(textArray[index2]));
				Ti.App.Properties.setString('mode', e.source.val);
				switch(e.source.val){
			    		case modeArray[0]:
						Titanium.App.Properties.setString('recordDatabase', 'USER1');
			    		break;
			    		case modeArray[1]:
						Titanium.App.Properties.setString('recordDatabase', 'USER2');
			    		break;
			    		case modeArray[2]:
						Titanium.App.Properties.setString('recordDatabase', 'USER3');
			    		break;
			    		case modeArray[3]:
						Titanium.App.Properties.setString('recordDatabase', 'USER4');
			    		break;
			    		
			    		default:
			    			//
			    		break;
			    }
				setTimeout(function(){
					var db2 = Titanium.Database.open('user');
				    var select = 'SELECT ' + Titanium.App.Properties.getString('answerName') + ' FROM '  + Titanium.App.Properties.getString('recordDatabase') + ' WHERE _id = 0';;
				    //alert(select);
				    var rows = db2.execute(select);
				    while(rows.isValidRow()){
					    var level = rows.field(0);
					    rows.next();
					}
				    Ti.API.info('level: ' + level);
				    rows.close();
				    db2.close();
				    
				    	Titanium.App.Properties.setInt('level', level);
				    
					if(purchase.substr(0,1)=='y' && Titanium.App.Properties.getString('mode')=='picture'){
						label00.text = L(Ti.App.Properties.getString('mode') + '_mode') + '\n' + L('Level_') + level;
					}else if(purchase.substr(0,1)=='y' && e.source.val!='normal'){
						label00.text = L(Titanium.App.Properties.getString('answerName')) + '\n' + L(Ti.App.Properties.getString('mode') + '_mode') + '\n' + L('Level_') + level;
					}else{
						label00.text = L(Titanium.App.Properties.getString('answerName')) + '\n' + L('Level_') + level;
					}
				    
					var Mode = require('ui/common/Mode');	
					//construct UI
					var mode = new Mode(win, purchase, label00);
					win.add(mode);
					win.remove(self);
				}, 100);
			}
		});
		*/
		row.add(leftImage);
		
		var label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:L(textArray[i]) + '\n' + L(textArray2[i]) + ' / ' + L(textArray3[i]) ,
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

module.exports = Mode;
