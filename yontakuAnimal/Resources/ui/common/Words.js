//FirstView Component Constructor
function Words(win, label00, purchase) {
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
		text:L('Select_Language'),
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
		if(val != Ti.App.Properties.getString('answerName')){
			if(val == 'en' || val == 'ja' || Titanium.App.Properties.getBool('Purchased-'+ purchase)==true){
				Ti.API.info(val);
				var db2 = Titanium.Database.open('user');
			    var select = 'SELECT ' + val + ' FROM USER1 WHERE _id = 0';
			    //alert(select);
			    var rows = db2.execute(select);
			    alert(L('Language_change') + '\n' + L(Ti.App.Properties.getString('answerName')) + ' > ' + L(val));
				//label00.text = L(val) + '\n' + L('Level_') + rows.field(0);
				if(purchase.substr(0,1)=='y' && Titanium.App.Properties.getString('mode')=='picture'){
					label00.text = L(Titanium.App.Properties.getString('mode') + '_mode') + '\n' + L('Level_') +Titanium.App.Properties.getInt('level');
				}else if(purchase.substr(0,1)=='y' && Titanium.App.Properties.getString('mode')!='normal'){
					label00.text = L(val) + '\n' + L(Titanium.App.Properties.getString('mode') + '_mode') + '\n' + L('Level_') + Titanium.App.Properties.getInt('level');
				}else{
					label00.text = L(val) + '\n' + L('Level_') + Titanium.App.Properties.getInt('level');
				}
				
			    Titanium.App.Properties.setInt('level', rows.field(0));
			    Ti.App.Properties.setString('answerName', val);
				switch(val){
					case 'ja':
					case 'ji':
					case 'j2':
					case 'j3':
					case 'zh':
					case 'ko':
						var fontsize = 30;
					break;
					case 'ar':
					case 'el':
					case 'vi':
					case 'th':
					case 'fa':
						var fontsize = 15;
					break;
					default:
						var fontsize = 24;
					break;
				}
				Titanium.App.Properties.setInt('fontsize', fontsize);
			    rows.close();
			    db2.close();
			}else{
				alert(L('Buy_pro_ver'));
			}
				
		    	setTimeout(function(){
				win.remove(self);
			}, 100);
		}else{
		    	setTimeout(function(){
				win.remove(self);
			}, 100);
		}
	});
	
	rows.push(row);
	
	var db1 = Ti.Database.open(Titanium.App.Properties.getString('databaseName'));
    
  	var fieldName = db1.execute('PRAGMA table_info(DATA)');
  	Ti.API.info(fieldName);
	
	var val = Ti.App.Properties.getString('answerName');
    
    while(fieldName.isValidRow()){
    		if(fieldName.field(1).length == 2){
	    		var row = Ti.UI.createTableViewRow({
			    height:'auto',
			    backgroundColor:'white',
			    val:fieldName.field(1),
			});
			
			var leftImage = Titanium.UI.createImageView({
			    image: '/assets/images/Checkmark-non.png',
			    left:0,
			});
			if(fieldName.field(1) == Ti.App.Properties.getString('answerName')){
				leftImage.image = '/assets/images/Checkmark.png';
				row.backgroundColor = 'green';
			}
			/*
			leftImage.addEventListener('click', function(e) {
				if(e.source.val != Ti.App.Properties.getString('answerName')){
					if(e.source.val == 'en' || e.source.val == 'ja' || Titanium.App.Properties.getBool('Purchased-'+ purchase)==true){
						Ti.API.info(e.source.val);
						var db2 = Titanium.Database.open('user');
					    var select = 'SELECT ' + e.source.val + ' FROM USER1 WHERE _id = 0';
					    //alert(select);
					    var rows = db2.execute(select);
					    alert(L('Language_change') + '\n' + L(Ti.App.Properties.getString('answerName')) + ' > ' + L(e.source.val));
						//label00.text = L(e.source.val) + '\n' + L('Level_') + rows.field(0);
						if(purchase.substr(0,1)=='y' && Titanium.App.Properties.getString('mode')=='picture'){
							label00.text = L(Titanium.App.Properties.getString('mode') + '_mode') + '\n' + L('Level_') +Titanium.App.Properties.getInt('level');
						}else if(purchase.substr(0,1)=='y' && Titanium.App.Properties.getString('mode')!='normal'){
							label00.text = L(e.source.val) + '\n' + L(Titanium.App.Properties.getString('mode') + '_mode') + '\n' + L('Level_') + Titanium.App.Properties.getInt('level');
						}else{
							label00.text = L(e.source.val) + '\n' + L('Level_') + Titanium.App.Properties.getInt('level');
						}
						
					    Titanium.App.Properties.setInt('level', rows.field(0));
					    Ti.App.Properties.setString('answerName', e.source.val);
						switch(e.source.val){
							case 'ja':
							case 'ji':
							case 'j2':
							case 'j3':
							case 'zh':
							case 'ko':
								var fontsize = 30;
							break;
							case 'ar':
							case 'el':
							case 'vi':
							case 'th':
							case 'fa':
								var fontsize = 15;
							break;
							default:
								var fontsize = 24;
							break;
						}
						Titanium.App.Properties.setInt('fontsize', fontsize);
					    rows.close();
					    db2.close();
						
					    	setTimeout(function(){
							var Words = require('ui/common/Words');	
							//construct UI
							var words = new Words(win, label00, purchase);
							win.add(words);
							win.remove(self);
						}, 100);
					}else{
						alert(L('Buy_pro_ver'));
					}
				}
			});
			*/
			row.add(leftImage);
			
			var label = Titanium.UI.createLabel({
				color:'#000',
				backgroundColor:'transparent',
				text:L(fieldName.field(1)),
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
        fieldName.next();
    }
    fieldName.close();
    db1.close();
	
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

module.exports = Words;
