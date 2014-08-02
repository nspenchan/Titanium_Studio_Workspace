//FirstView Component Constructor
function FirstView(win, purchase) {
	var height = Ti.Platform.displayCaps.platformHeight;
	var width = Ti.Platform.displayCaps.platformWidth;
	var osname = Ti.Platform.osname;
	//起動時の画面が縦画面の鑑定になってしまうのを防ぐ
	if(osname=='android'){
		if(height>width){
			var height = Ti.Platform.displayCaps.platformWidth;
			var width = Ti.Platform.displayCaps.platformHeight;
		}
	}

	var left = (height*16/9-width)/2;
	Ti.API.error('height:' + height + '/width:' + width);
	var zoomByOsname = Titanium.App.Properties.getDouble('zoomByOsname');
	Ti.API.error('left' + left + '/zoomByOsname:' + zoomByOsname);
	//create object instance, a parasitic subclass of Observable
	
	var questionName = Titanium.App.Properties.getString('questionName');
	var coins = Titanium.App.Properties.getInt('coins');
    
    var db1 = Ti.Database.open(Titanium.App.Properties.getString('databaseName'));
    var questionArray = [];
    var select = 'SELECT ' + questionName + ' FROM DATA';
    //alert(select);
    var rows = db1.execute(select);
    
    while(rows.isValidRow()){
        questionArray.push(rows.fieldByName(questionName));
        rows.next();
    }
    rows.close();
    db1.close();
    
    var max = questionArray.length;
	
	//Thema Song
	var opening = Titanium.Media.createSound({
	    url: '/assets/sound/wakuwaku-dokidoki.mp3',
	    looping : true,
	});
	setTimeout(function(){
		if(opening.playing==false && Titanium.App.Properties.getBool('bgm')==true){
			opening.play();
		}
	}, 500);
	
	var self = Ti.UI.createView({
		height:height,
		width:height*16/9,
		backgroundImage:'/assets/images/home_bg.png',
		top:0,
		left:-left,
	});
	//Ti.API.info(self.height + ':' + self.width + ':' + self.left);
	
	var random1 = Math.floor(Math.random()*max);
	var random2 = Math.floor(Math.random()*5+1);
	
	imageView  = Ti.UI.createImageView({
	    image:'/assets/images/' + Titanium.App.Properties.getString('folder') + '/' + questionArray[random1] + '/l_0' + random2 +'.png',
	    width:300*zoomByOsname,
	    height:200*zoomByOsname,
	});
	self.add(imageView);
	
	if(Titanium.App.Properties.getBool('testMode')==false){
		var duration = 10000;
	}else{
		var duration = 2000;
	}
	
	var Timer1 = setInterval(function(){
		random1 = Math.floor(Math.random()*max);
		random2 = Math.floor(Math.random()*5+1);
		imageView.image = '/assets/images/' + Titanium.App.Properties.getString('folder') + '/' + questionArray[random1] + '/l_0' + random2 + '.png';
	},duration);
	
    var label_pro = Titanium.UI.createLabel({
        backgroundImage:'/assets/images/pro_ver.png',
        width:100*zoomByOsname,
        height:100*zoomByOsname,
        top:0,
        right:left,
        opacity:0.5
    });
    if(Ti.App.Properties.getBool('Purchased-'+purchase)==false){
		label_pro.opacity = 0;
	}
	if(Titanium.App.Properties.getBool('testMode')==false){
		self.add(label_pro);
	}
	
	var userImage = Titanium.UI.createImageView({
	    image: '/assets/images/userFace_default.png',
	    height:100*zoomByOsname,
	    width:100*zoomByOsname,
	    top:60*zoomByOsname,
	    left:left+10,
	});
	self.add(userImage);
	
	if(osname=='android'){
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'user/userFace.png');
		if(file.exists()){
			Ti.API.info('userFace.png');
			userImage.image = Titanium.Filesystem.applicationDataDirectory + 'user/userFace.png';
		}
	}else{
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'userFace.png');
		if(file.exists()){
			Ti.API.info('userFace.png');
			userImage.image = Titanium.Filesystem.applicationDataDirectory + 'userFace.png';
		}
	}
	var faceMask = Titanium.UI.createImageView({
	    image: '/assets/images/faceMask2.png',
	    height:100*zoomByOsname,
	    width:100*zoomByOsname,
	    top:60*zoomByOsname,
	    left:left+10,
	});
	self.add(faceMask);
	
	faceMask.addEventListener('click', function(e) {
		//alert('image change');
		if(osname=='android'){
			var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, '/user/userFace.png');
			if(file.exists()){
				Ti.API.info('userFace.png');
				userImage.image = Titanium.Filesystem.applicationDataDirectory + '/user/userFace.png';
			}
		}else{
			var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'userFace.png');
			if(file.exists()){
				Ti.API.info('userFace.png');
				userImage.image = Titanium.Filesystem.applicationDataDirectory + 'userFace.png';
			}
		}
	});

	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	
	var label01 = Ti.UI.createLabel({
		backgroundColor:'transparent',
		color:'red',
		text:String.format(L('welcome'), Ti.App.Properties.getString('userName')),
		font:{fontSize:25*zoomByOsname,fontFamily:'Helvetica Neue',fontWeight:'bold',fontStyle:'italic'},
		height:50*zoomByOsname,
		width:'auto',
		top:10*zoomByOsname,
		left:left+40,
		opacity:0.7,
	});
	self.add(label01);
	
	//Add behavior for UI
	label01.addEventListener('click', function(e) {
		alert(e.source.text);
	});
	/*
	var label2 = Ti.UI.createLabel({
		backgroundColor:'#fff',
		color:'#000000',
		text:L('Quetion'),
		font:{fontSize:30,fontFamily:'Helvetica Neue'},
		height:50,
		width:'auto',
		top:60,
		right:10+left,
		opacity:0.7,
	});
	*/
	var label2 = Ti.UI.createButton({
		color:'#fff',
		title: L('Quetion'),
		font:{fontSize:25*zoomByOsname,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:60*zoomByOsname,
		width:150*zoomByOsname,
		top:60,
		right:10+left,
		opacity:1,
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
	self.add(label2);
	
	setTimeout(function(){
		label2.opacity = 0.2;
	}, 1400);
	
	var timerCounter = 0;
	var Timer2 = setInterval(function(){
		timerCounter++;
		label2.opacity = 1;
		setTimeout(function(){
			label2.opacity = 0.2;
			if(timerCounter == 10){
				clearInterval(Timer2);
				label2.opacity = 0.9;
			}
		},1400);
	},2000);
	
	//Add behavior for UI
	var count;
	label2.addEventListener('click', function(e) {
		if(opening.playing==true){
			opening.stop();
		}
		count = 0;
		var Question = require('ui/common/' + purchase + '/Question');
		//construct UI
		var question = new Question(win, purchase, count, label00, label02, opening);
		win.add(question);
	});
	/*
	var label3 = Ti.UI.createLabel({
		backgroundColor:'#fff',
		color:'#000000',
		text:L('Settings'),
		font:{fontSize:30,fontFamily:'Helvetica Neue'},
		height:50,
		width:'auto',
		top:height/2-25,
		right:10+left,
		opacity:0.5,
	});
	*/
	var label3= Ti.UI.createLabel({
		color:'red',
		text: L('Cards'),
		font:{fontSize:25*zoomByOsname,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:80*zoomByOsname,
		width:80*zoomByOsname,
		bottom:100*zoomByOsname,
		right:10+left,
		backgroundImage:'/assets/images/Pictures.png'
	});
	self.add(label3);
	
	//Add behavior for UI
	label3.addEventListener('click', function(e) {
		var Cards = require('ui/common/Cards');
			
		//construct UI
		var cards = new Cards(win, questionArray, label02, opening);
		win.add(cards);
	});
	/*
	var label4 = Ti.UI.createLabel({
		backgroundColor:'#fff',
		color:'#000000',
		text:L('Info'),
		font:{fontSize:30,fontFamily:'Helvetica Neue'},
		height:50,
		width:'auto',
		bottom:60,
		right:10+left,
		opacity:0.5,
	});
	*/
	var label02 = Ti.UI.createLabel({
		color:'yellow',
		text: coins,
		font:{fontSize:25*zoomByOsname,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:80*zoomByOsname,
		width:80*zoomByOsname,
		bottom:10*zoomByOsname,
		right:10+left,
		backgroundImage:'/assets/images/wallet_coins.png'
	});
	self.add(label02);
	
	//Add behavior for UI
	label02.addEventListener('click', function(e) {
		var Coins = require('ui/common/Coins');
			
		//construct UI
		var coins1 = new Coins(win, questionArray, label02, opening);
		win.add(coins1);
	});
	
	var label5 = Ti.UI.createLabel({
		color:'#fff',
		//title: L('Settings'),
		font:{fontSize:25*zoomByOsname,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:60*zoomByOsname,
		width:60*zoomByOsname,
		bottom:10*zoomByOsname,
		left:10+left,
		backgroundImage:'/assets/images/System.png'
	});
	self.add(label5);
	
	//Add behavior for UI
	label5.addEventListener('click', function(e) {
		var Settings = require('ui/common/Settings');
			
		//construct UI
		var settings = new Settings(win, purchase, userImage, label00, label01, label_pro, opening);
		win.add(settings);
	});
	
	var label00 = Ti.UI.createLabel({
		backgroundColor:'transparent',
		color:'red',
		//text:label00_text,
		font:{fontSize:30*zoomByOsname,fontFamily:'Helvetica Neue',fontWeight:'bold',fontStyle:'italic'},
		height:'auto',
		width:'auto',
		bottom:80*zoomByOsname,
		left:left+20,
		opacity:0.7,
	});
	self.add(label00);
	if(purchase.substr(0,1)=='y' && Titanium.App.Properties.getString('mode')=='picture'){
		label00.text = L(Titanium.App.Properties.getString('mode') + '_mode') + '\n' + L('Level_') + Titanium.App.Properties.getInt('level');
	}else if(purchase.substr(0,1)=='y' && Titanium.App.Properties.getString('mode')!='normal'){
		label00.text = L(Titanium.App.Properties.getString('answerName')) + '\n' + L(Titanium.App.Properties.getString('mode') + '_mode') + '\n' + L('Level_') + Titanium.App.Properties.getInt('level');
	}else{
		label00.text = L(Titanium.App.Properties.getString('answerName')) + '\n' + L('Level_') + Titanium.App.Properties.getInt('level');
	}
	
	//Add behavior for UI
	label00.addEventListener('click', function(e) {
		alert(e.source.text);
	});
	/*
	var themesong = Titanium.UI.createView({
		backgroundImage:'/assets/images/no_sound_x.png',
		width:48,
		height:48,
		bottom:20,
		left:left+10,
	});
	//theme song
	setTimeout(function(){
		if(opening.playing==false){
			themesong.backgroundImage = '/assets/images/no_sound.png';
		}
	}, 500);
	setInterval(function(){
		if(opening.playing==false){
			themesong.backgroundImage = '/assets/images/no_sound.png';
		}else{
			themesong.backgroundImage = '/assets/images/no_sound_x.png';
		}
	}, 10000);
		
	themesong.addEventListener('click', function(e) {
		if(opening.playing==true && Ti.App.Properties.getBool('bgm')==true){
			opening.stop();
			Ti.App.Properties.setBool('bgm', false);
			themesong.backgroundImage = '/assets/images/no_sound.png';
		}else if(opening.playing==true && Ti.App.Properties.getBool('bgm')==false){
			opening.stop();
			//Ti.App.Properties.setBool('bgm', false);
			themesong.backgroundImage = '/assets/images/no_sound.png';
		}else if(opening.playing==false && Ti.App.Properties.getBool('bgm')==false){
			opening.play();
			Ti.App.Properties.setBool('bgm', true);
			themesong.backgroundImage = '/assets/images/no_sound_x.png';
		}else if(opening.playing==false && Ti.App.Properties.getBool('bgm')==true){
			opening.play();
			//Ti.App.Properties.setBool('bgm', true);
			themesong.backgroundImage = '/assets/images/no_sound_x.png';
		}
	});
	if(Ti.App.Properties.getBool('themesong')==true){
		self.add(themesong);
	}
	*/
	var centerLabel = Titanium.UI.createLabel({
		font : {fontSize : 30*zoomByOsname, fontFamily : 'Helvetica Neue', fontWeight :'bold'},
		backgroundColor : 'transparent',
		text:L(purchase),
		textAlign:'center',
		color:'red',
		height:'auto',
		width:'auto',
		bottom:10
	});
	self.add(centerLabel);
	//secret mode
	var tf1 = Titanium.UI.createTextField({
        color:'#336699',
        top:10,
        left:10+left,
        width:150,
        height:40,
        hintText:'secret commad',
        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	tf1.addEventListener('return',function(e){
		if(e.value=='999'){
			alert('Pro Ver.');
			Titanium.App.Properties.setBool('Purchased-'+purchase, true);
			label_pro.opacity = 0.5;
		}else if(e.value=='1000'){
			alert('No Purchase');
			Titanium.App.Properties.setBool('Purchased-'+purchase, false);
			label_pro.opacity = 0;
		}else if(e.value=='1001'){
			//alert('secret mode');
			/*
			opening.play();
			Ti.App.Properties.setBool('bgm', true);
			themesong.backgroundImage = '/assets/images/themesong_x.png';
			*/
		}
		e.source.value='';
	});
	var secret_button = Titanium.UI.createLabel({
		//backgroundColor:'#fff',
		width:20,
		height:20,
		top:0,
		left:left,
	});
	secret_button.addEventListener('click', function(e) {
		//alert('secretMode');
		self.add(tf1);
		setTimeout(function(){
			self.remove(tf1);
		}, 8000);
	});
	self.add(secret_button);
	
	return self;
}

///////////////////////////////////////////////////////
function shuffle(list) {
	var i = list.length;
	
	while (--i) {
		var j = Math.floor(Math.random() * (i + 1));
		if (i == j) continue;
		var k = list[i];
		list[i] = list[j];
		list[j] = k;
	}
	return list;
}

module.exports = FirstView;
