//FirstView Component Constructor
function User(win, label01) {
	var height = Ti.Platform.displayCaps.platformHeight;
	var width = Ti.Platform.displayCaps.platformWidth;
	var osname = Ti.Platform.osname;
	var zoomTableview = Titanium.App.Properties.getDouble('zoomTableview');
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'#000',
	});
	
	var rows = [];
	
	var row = Ti.UI.createTableViewRow();
	
	var label = Titanium.UI.createLabel({
		color:'#fff',
		text:L('User'),
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
		//userImage.image = Titanium.Filesystem.applicationDataDirectory + 'user/userFace.png';
	});
	
	rows.push(row);
	
	var row = Ti.UI.createTableViewRow({backgroundColor:'#fff',});
	
	var label = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'#fff',
		text:L('User_Name'),
		font:{fontSize:20*zoomTableview,fontFamily:'Helvetica Neue'},
		textAlign:'left',
		width:150*zoomTableview,
		height:50*zoomTableview,
		top:5*zoomTableview,
		bottom:5*zoomTableview,
		left:20*zoomTableview,
		//opacity:0.7,
	});
	row.add(label);

	var tf1 = Titanium.UI.createTextField({
	    color:'#336699',
	    top:5*zoomTableview,
		bottom:5*zoomTableview,
	    left:130*zoomTableview,
	    width:290*zoomTableview,
	    height:50*zoomTableview,
	    hintText:L('Enter_Your_Name'),
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	if(Ti.App.Properties.getString('userName')!=''){
		tf1.hintText = Ti.App.Properties.getString('userName');
	}
	row.add(tf1);
	// TEXT FIELD EVENTS (return, focus, blur, change)
	tf1.addEventListener('return',function(e){
		Ti.App.Properties.setString('userName', e.value);
		label01.text = String.format(L('welcome'), e.value);
	});
	
	rows.push(row);

	var row = Ti.UI.createTableViewRow({
		backgroundColor:'#fff',
		hasChild:true,
	});
	
	var label = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'#fff',
		text:L('User_Photo'),
		font:{fontSize:20*zoomTableview,fontFamily:'Helvetica Neue'},
		textAlign:'left',
		width:150*zoomTableview,
		height:80,
		top:10,
		bottom:10,
		left:20*zoomTableview,
		//opacity:0.7,
	});
	row.add(label);
	
	var userImage2 = Titanium.UI.createImageView({
	    image: '/assets/images/userFace_default.png',
	    height:100,
	    width:100,
	    top:0,
	    bottom:0,
	    left:130*zoomTableview,
	});
	
	userImage2.addEventListener('click', function(e) {
		alert(String.format(L('welcome'), Ti.App.Properties.getString('userName')));
	});
	
	if(osname=='android'){
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'user/userFace.png');
		if(file.exists()){
			Ti.API.info('userFace.png');
			userImage2.image = Titanium.Filesystem.applicationDataDirectory + 'user/userFace.png';
		}
	}else{
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'userFace.png');
		if(file.exists()){
			Ti.API.info('userFace.png');
			userImage2.image = Titanium.Filesystem.applicationDataDirectory + 'userFace.png';
		}
	}
	
	row.add(userImage2);
	
	var faceMask = Titanium.UI.createImageView({
	    image: '/assets/images/faceMask.png',
	    height:100,
	    width:100,
	    top:0,
	    bottom:0,
	    left:130*zoomTableview,
	});
	row.add(faceMask);
	
	row.addEventListener('click', function(){
		//win.remove(firstView);
		var Photo = require('ui/common/Photo');
		//construct UI
		var photo = new Photo(win, self, label01);
		win.add(photo);	
	});
	rows.push(row);
	
	var row = Ti.UI.createTableViewRow({
		backgroundColor:'#fff',
		hasChild:true,
	});
	
	var label = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'#fff',
		text:L('Camera'),
		font:{fontSize:20*zoomTableview,fontFamily:'Helvetica Neue'},
		textAlign:'left',
		width:150*zoomTableview,
		height:'auto',
		top:10,
		bottom:10,
		left:20*zoomTableview,
		//opacity:0.7,
	});
	row.add(label);
	
	var image = Titanium.UI.createImageView({
	    image: '/assets/images/digital_camera.png',
	    left:130*zoomTableview,
	});
	row.add(image);
	
	row.addEventListener('click', function(){
		//win.remove(firstView);
		var Camera = require('ui/common/Camera');
		//construct UI
		var camera = new Camera(win, self, label01);
		win.add(camera);	
	});
	rows.push(row);

	var tableview = Titanium.UI.createTableView({top: 0});
	
    tableview.startLayout();
    tableview.setData(rows);
    tableview.finishLayout();
    
    self.add(tableview);
	
	return self;
}

module.exports = User;
