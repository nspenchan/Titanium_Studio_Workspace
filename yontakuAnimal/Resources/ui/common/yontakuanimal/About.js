//FirstView Component Constructor
function About(win) {
	var height = Ti.Platform.displayCaps.platformHeight;
	var width = Ti.Platform.displayCaps.platformWidth;
	var left = (height*16/9-width)/2;
	var osname = Ti.Platform.osname;
	if(osname=='android'){
		var zoom = 1.5;
	}else if(osname=='ipad'){
		var zoom = 1.5;
	}else{
		var zoom = 1;
	}
	if(Ti.Platform.locale=='ja'){
		var text =' ■ アプリ名：よんたく　どうぶつ\n ■ バージョン情報：ver.1.0.2\n ■ リリース：2013/12\n ■ 開発：YUKIKO NAGAOKA';
	}else{
		var text = ' ■ Application Name : Yontaku Animal\n ■ Version Information : ver.1.1.0\n ■ Released: 2013 / 12\n ■ Development : YUKIKO NAGAOKA';
	}
	
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'#000',
	});
	
	var imageView = Ti.UI.createImageView();
	if(osname == 'android'){
		imageView.image = '/assets/images/yontakuanimal/about.png';
		imageView.width = width;
		imageView.height = height;
		imageView.left = -left;
	}else if(osname == 'ipad'){
		imageView.image = '/assets/images/yontakuanimal/about_ipad.png';
		imageView.width = 1024;
		imageView.height = 768;
		imageView.left = 0;
	}else{
		imageView.image = '/assets/images/yontakuanimal/about.png';
		imageView.width = 568;
		imageView.height = 320;
		imageView.left = -left;
	}
	self.add(imageView);
	imageView.addEventListener('click', function(e) {
		win.remove(self);
	});
	
	var label = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'#fff',
		text:text,
		font:{fontSize:20*zoom,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'left',
		width:'auto',
		height:'auto',
		bottom:10,
		opacity:0.7,
	});
	if(Titanium.App.Properties.getBool('testMode')==false){
		self.add(label);
	}
	label.addEventListener('click', function(e) {
		win.remove(self);
	});

	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	/*
	var back = Ti.UI.createButton({
		color:'#fff',
		title: L('Back'),
		font:{fontSize:20,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:50,
		width:100,
		top:10,
		left:10,
		radius:10,
		borderRadius : 10,
		borderColor:'#002400',
		borderWidth:1,
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
	self.add(back);
	//Add behavior for UI
	back.addEventListener('click', function(e) {
		win.remove(self);
	});
	*/
	/*
	var aA = Ti.UI.createButton({
		color:'#fff',
		title: L('A'),
		font:{fontSize:20,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:50,
		width:100,
		top:10,
		right:10,
		radius:10,
		borderRadius : 10,
		borderColor:'#002400',
		borderWidth:1,
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
	self.add(aA);
	//Add behavior for UI
	aA.addEventListener('click', function(e) {
		//Ti.API.info(JSON.stringify(e));
		if(button_view.top == 0){
			button_view.top = 70;
			webview.top = 140;
			aA.title = L('hide');
		}else{
			button_view.top = 0;
			webview.top = 70;
			aA.title = L('aA');
			
		}
	});
	*/
	
	return self;
}

module.exports = About;
