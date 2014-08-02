//FirstView Component Constructor
function FinalView(win, recordArray, questionArray, answerArray, label00, label02, opening, purchase) {
	var utterance = require('bencoding.utterance');
	var speech = utterance.createSpeech();
	if(Ti.Platform.locale=='ja'){
		var speechLang = 'ja-JP';
	}else{
		var speechLang = 'en-US';
	}
	var height = Ti.Platform.displayCaps.platformHeight;
	var width = Ti.Platform.displayCaps.platformWidth;
	var left = (height*16/9-width)/2;
	var osname = Ti.Platform.osname;
	var zoomTableview = Titanium.App.Properties.getDouble('zoomTableview');
	var zoomByOsname = Titanium.App.Properties.getDouble('zoomByOsname');
	
	//曲の途中でbackしたとき、stopするため	
	var fanfare = Titanium.Media.createSound({
	    // リモートURLも指定できます
	    // url : "http://www.nch.com.au/acm/8kmp38.wav"
	    url: '/assets/sound/fanfare.mp3',
	});
	var recovery = Titanium.Media.createSound({
	    // リモートURLも指定できます
	    // url : "http://www.nch.com.au/acm/8kmp38.wav"
	    url: '/assets/sound/a2-038_recovery_07.mp3',
	});
	var ending = Titanium.Media.createSound({
	    // リモートURLも指定できます
	    // url : "http://www.nch.com.au/acm/8kmp38.wav"
	    url: '/assets/sound/natures-call.mp3',
	    looping : true,
	    volume:0
	});
	var coinGet = Titanium.Media.createSound({
	    // リモートURLも指定できます
	    // url : "http://www.nch.com.au/acm/8kmp38.wav"
	    url: '/assets/sound/coin04.mp3',
	});
		
	
	var i18n = Titanium.App.Properties.getString('answerName');
	switch(i18n){
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
	
	//timer
	var Timer1, Timer2;
	
	var counter = 0;
	for(i=0; i<recordArray.length; i++){
		if(recordArray[i][1]>0){
			counter++;
		}
	}
	var coins0 = Titanium.App.Properties.getInt('coins');
	var coins = coins0 + counter;
	Titanium.App.Properties.setInt('coins', coins);
	label02.text = coins;
	Ti.API.info('coins: ' + coins);
	//Ti.API.info('counter:' + counter);
	
	var db2 = Titanium.Database.open('user');
	var answerName = Ti.App.Properties.getString('answerName');
    var select = 'SELECT ' + answerName + ' FROM '  + Titanium.App.Properties.getString('recordDatabase');
    //alert(select);
    var rows = db2.execute(select);
    
    var readArray = [];
    while(rows.isValidRow()){
    		//Ti.API.info(rows.field(0));
	    	readArray.push(rows.field(0));
        rows.next();
    }
    rows.close();
    //Ti.API.info(recordArray);
    //Ti.API.info(readArray);
    
    for(i=0; i<recordArray.length; i++){
    		var j = recordArray[i][0]+1;
    		var value = readArray[j] + recordArray[i][1];
    		var update = 'UPDATE '  + Titanium.App.Properties.getString('recordDatabase') + ' SET ' + answerName + ' = "' + value + '" WHERE _id = ' + j;
        //Ti.API.info(update);
    		db2.execute(update);
    }
    
    var select1 = 'SELECT ' + answerName + ' FROM '  + Titanium.App.Properties.getString('recordDatabase');
    //alert(select1);
    var rows1 = db2.execute(select1);
    
    var readArray1 = [];
    while(rows1.isValidRow()){
	    	readArray1.push(rows1.field(0));
        rows1.next();
    }
    rows1.close();
    
    if(counter>=questionArray.length){
    		var level = Titanium.App.Properties.getInt('level')+5;
		Titanium.App.Properties.setInt('level', level);
    		var update = 'UPDATE '  + Titanium.App.Properties.getString('recordDatabase') + ' SET ' + answerName + ' = "' + level + '" WHERE _id = 0';
    		db2.execute(update);
    		//label00.text = L(answerName) + '\n' + L('Level_') + level;
    }else if(counter>=Ti.App.Properties.getInt('levelupMinimumPoint')){//questionArray.length){
		var level = Titanium.App.Properties.getInt('level')+1;
		Titanium.App.Properties.setInt('level', level);
    		var update = 'UPDATE '  + Titanium.App.Properties.getString('recordDatabase') + ' SET ' + answerName + ' = "' + level + '" WHERE _id = 0';
    		db2.execute(update);
    		//label00.text = L(answerName) + '\n' + L('Level_') + level;
    }else{
    		var level = Titanium.App.Properties.getInt('level');
    }
	if(purchase.substr(0,1)=='y' && Titanium.App.Properties.getString('mode')=='picture'){
		label00.text = L(Titanium.App.Properties.getString('mode') + '_mode') + '\n' + L('Level_') + level;
	}else if(purchase.substr(0,1)=='y' && Titanium.App.Properties.getString('mode')!='normal'){
		label00.text = L(answerName) + '\n' + L(Titanium.App.Properties.getString('mode') + '_mode') + '\n' + L('Level_') + level;
	}else{
		label00.text = L(answerName) + '\n' + L('Level_') + level;
	}
    
    db2.close();
    
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'#000',
	});
	
	var rows = [];
	
	var row = Ti.UI.createTableViewRow();
	
	var label_top = Titanium.UI.createLabel({
		color:'#fff',
		text:L('Result'),
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
	row.add(label_top);
	
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
		fanfare.stop();
		recovery.stop();
		ending.stop();
		opening.play();
		clearInterval(Timer1);
		clearInterval(Timer2);
	});
	
	rows.push(row);
	
	var rowTop = Ti.UI.createTableViewRow({
	    height:'auto',
	    backgroundColor:'white',
	    //hasChild:true,
	});
	
	var userImage = Titanium.UI.createImageView({
		image: '/assets/images/userFace_default.png',
		width:90,
		height:90,
		top:32,
		left:width/2-48
	});
	rowTop.add(userImage);
	
	if(osname=='android'){
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'user/userFace.png');
		if(file.exists()){
			Ti.API.info('userFace.png');
			userImage.image = Titanium.Filesystem.applicationDataDirectory + 'user/userFace.png';
		}
	}else{
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'userFace.png');
		if(file.exists()){
			userImage.image = Titanium.Filesystem.applicationDataDirectory + 'userFace.png';
		}
	}
	
	var view = Titanium.UI.createView({
		backgroundColor:'transparent',
		backgroundImage: '/assets/images/king.png',
		width:142,
		height:192.5,
	});
	rowTop.add(view);
	
	var label1 = Titanium.UI.createLabel({
		color:'red',
		backgroundColor:'transparent',
		text:L('brave') + ' ' + Ti.App.Properties.getString('userName') + '\n' + L('You_were_given') + '\n' + L('knight_of') + ' ' +  L(Titanium.App.Properties.getString('answerName')) + '\n' + L('titled_'),
		font:{fontSize:25,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'center',
		width:'auto',
		height:'auto',
		right:width/2+60,
		//bottom:20,
	});
	rowTop.add(label1);
	
	var label2 = Titanium.UI.createLabel({
		color:'red',
		backgroundColor:'transparent',
		text:L('Level_up'),
		font:{fontSize:30,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'center',
		width:'auto',
		height:'auto',
		left:width/2+60,
		top:20,
	});
	rowTop.add(label2);
	
	if(counter>=questionArray.length){
		var hand1 = Titanium.UI.createImageView({
			image: '/assets/images/hand1.png',
			bottom:0,
			left:width/2-150,
			opacity:0
		});
		rowTop.add(hand1);
		
		var hand2 = Titanium.UI.createImageView({
			image: '/assets/images/hand2.png',
			bottom:0,
			right:width/2-150,
			opacity:1.0
		});
		rowTop.add(hand2);
		
		var paper1 = Titanium.UI.createImageView({
			image: '/assets/images/kamifubuki1.png',
			top:0,
			right:width/2-200,
			opacity:0
		});
		rowTop.add(paper1);
		
		var paper2 = Titanium.UI.createImageView({
			image: '/assets/images/kamifubuki2.png',
			top:0,
			left:width/2-200,
			opacity:1.0
		});
		rowTop.add(paper2);
		
		setTimeout(function(){
			hand1.opacity = 1.0;
			hand2.opacity = 0;
		}, 250);
		
		Timer1 = setInterval(function(){
			hand1.opacity = 0;
			hand2.opacity = 1.0;
			setTimeout(function(){
				hand1.opacity = 1.0;
				hand2.opacity = 0;
			}, 250);
		}, 500);
		
		setTimeout(function(){
			paper1.opacity = 1.0;
			paper2.opacity = 0;
		}, 400);
		
		Timer2 = setInterval(function(){
			paper1.opacity = 0;
			paper2.opacity = 1.0;
			setTimeout(function(){
				paper1.opacity = 1.0;
				paper2.opacity = 0;
			}, 400);
		}, 800);
		//fanfare.play();
		//fanfare.addEventListener('complete', function() {
		//	ending.volume = 3;
		//});
		label_top.text = L('Perfect');
		label1.text = L('brave') + ' ' + Ti.App.Properties.getString('userName') + '\n' + L('You_were_given') + '\n' + L('King_of') + ' ' +  L(Titanium.App.Properties.getString('answerName')) + '\n' + L('titled_');
		label2.text = L('Perfect');
		
		rows.push(rowTop);
	}else if(counter>=Ti.App.Properties.getInt('levelupMinimumPoint')){
		var up = Titanium.UI.createImageView({
			image: '/assets/images/Up.png',
			width:90,
			height:90,
			top:80,
			left:width/2+100,
			opacity:0.5
		});
		rowTop.add(up);
		
		setTimeout(function(){
			up.opacity = 1.0;
		}, 250);
		
		Timer1 = setInterval(function(){
			up.opacity = 0.5;
			setTimeout(function(){
				up.opacity = 1.0;
			}, 250);
		}, 500);
		Timer2 = setInterval(function(){}, 100000);
		//recovery.play();
		//recovery.addEventListener('complete', function() {
		//	ending.volume = 3;
		//});
		label_top.text = L('Level_up');
		
		rows.push(rowTop);
	}else{
		Timer1 = setInterval(function(){}, 100000);
		Timer2 = setInterval(function(){}, 100000);
		//ending.volume = 3;
	}

	for(i=0; i<recordArray.length; i++){
		if(recordArray[i][1]>0){
			var bgColor = 'green';
		}else{
			var bgColor = 'pink';
		}
		
		var view = Titanium.UI.createView({
			backgroundColor:bgColor,
			backgroundImage: '/assets/images/' + Titanium.App.Properties.getString('folder') + '/' + questionArray[recordArray[i][0]] + '/l_0' + recordArray[i][2] + '.png',
			borderColor:'#000',
			borderWidth:2,
			width:width/4,
			height:width/6,
			top:10,
			bottom:10,
		});
		
		var label = Titanium.UI.createLabel({
			color:'red',
			text:answerArray[recordArray[i][0]],
			font:{fontSize:fontsize*zoomTableview,fontFamily:'Helvetica Neue',fontWeight:'bold'},
			textAlign:'center',
			width:width/4,
			height:width/6,
		});
		Ti.API.info(label.text);
		switch (i%4){
			case 0:
				var row = Ti.UI.createTableViewRow({
				    height:'auto',
				    backgroundColor:'white',
				});
				view.left = 0;
				view.add(label);
				row.add(view);
				rows.push(row);
			break;
			case 1:
				view.left = width/4;
				view.add(label);
				row.add(view);
			break;
			case 2:
				view.left = width/2;
				view.add(label);
				row.add(view);
			break;
			case 3:
				view.left = width*3/4;
				view.add(label);
				row.add(view);
			break;
	    }
	}
	
	var row = Ti.UI.createTableViewRow({
	    height:'auto',
	    backgroundColor:'white',
	    hasChild:true,
	});
	
	var leftImage = Titanium.UI.createImageView({
	    image: '/assets/images/Database.png',
	    left:0,
	});
	row.add(leftImage);
	
	var label_history = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'transparent',
		text:L('History'),
		font:{fontSize:20*zoomTableview,fontFamily:'Helvetica Neue'},
		textAlign:'left',
		width:150*zoomTableview,
		height:'auto',
		top:10,
		bottom:10,
		left:60,
		//opacity:0.7,
	});
	row.add(label_history);
	
	row.addEventListener('click', function(e){
		//win.remove(firstView);
		var History = require('ui/common/History');
		//construct UI
		var history = new History(win, answerArray, readArray1, ending, opening);
		win.add(history);
		//win.remove(self);タイマーをクリアするため、history.jsからfirstviewに戻れないようにした
	});
	
	rows.push(row);
	/*
		Titanium.UI.createView({
			height:100*zoomByOsname,
			width:100*zoomByOsname,
			//top:buttonTop2,
			right:10*zoomByOsname,
		});
		
		refreshLabel = Titanium.UI.createLabel({
			color:'#fff',
			font : {fontSize : 30*zoomByOsname, fontFamily : 'Helvetica Neue', fontWeight :'bold'},
			//text:L('Clear'),
			textAlign:'center',
			height:100*zoomByOsname,
			width:100*zoomByOsname,
			backgroundImage:'/assets/images/super_mario_rocket.png'
		});
		refresh.add(refreshLabel);
		
		refresh.addEventListener('click', function(e){
			bomb.play();
			//clear buttons
			children = answerRow.getChildren();
			for(i=0;i<children.length;i++){
			    if(children[i].opacity==0.2){
			    		children[i].opacity = 1;
			    		children[i].backgroundColor = '#fff';
			    }
			}
			refresh.animate({center:{x:width/4,y:height/2},curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,duration:500}, function(){
				//reset counter
				answerCounter = 0;
				//clear centerLabel
				centerLabel.text = '';
				if(length<=8){
					for(i=0; i<length; i++){
						answerLetter.push(answer.substr(i, 1));
						centerLabel.text = centerLabel.text + '●';
					}
				}else{
					for(i=0; i<8; i++){
						answerLetter.push(answer.substr(i, 1));
						centerLabel.text = centerLabel.text + '●';
					}
					centerLabel.text = centerLabel.text + answer.substr(8);
				}
				refresh.remove(refreshLabel);
				refresh.animate({center:{x:width-60*zoomByOsname,y:height/2},curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,duration:500}, function(){
					self.remove(refresh);
					refresh.add(refreshLabel);
				});			
			});
		});
		*/
	
	//coin and wallet
	var coinView = Titanium.UI.createView({
		height:50*zoomByOsname,
		width:50*zoomByOsname,
		//top:10*zoomByOsname,
		backgroundImage:'/assets/images/super_mario_coin.png',
		opacity:0,
	});
	self.add(coinView);
	var coinLabel = Titanium.UI.createLabel({
		color:'yellow',
		left:100*zoomByOsname,
		font:{fontSize:50*zoomTableview,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		text:counter,
	});
	self.add(coinLabel);
	coinView.animate({center:{x:width/2,y:50*zoomByOsname},curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,duration:100}, function(){
		// STEP 2. 中心座標(0, 200)に移動
		coinView.opacity = 1;
	});
	var coinCount = 0;
	var coinInterval = setInterval(function(){
		coinCount++;
		if(coinCount<=counter){
			coinLabel.text = coinLabel.text - 1;
			walletImage.text = walletImage.text + 1;
			coinGet.play();
			coinView.animate({center:{x:width/2,y:height-50*zoomByOsname},curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,duration:500}, function(){
				// STEP 2. 中心座標(0, 200)に移動
				coinView.opacity = 0;
				coinView.animate({center:{x:width/2,y:-50*zoomByOsname},duration:100}, function(){
					coinView.opacity = 1;
				});
			});
		}else{
			clearInterval(coinInterval);
			self.remove(coinView);
			self.remove(walletImage);
		    self.add(tableview);
			ending.play();
			if(counter>=questionArray.length){
				fanfare.play();
				fanfare.addEventListener('complete', function() {
					ending.volume = 3;
				});
				if(Ti.Platform.osname!='android'){
					speech.startSpeaking({
					    text:label_top.text + '。' + label1.text,
					    voice:speechLang,
					    rate:0.3
					});
				}else{
					speech.startSpeaking({
					    text:label_top.text + '。' + label1.text,
					    rate:1
					});
				}
			}else if(counter>=Ti.App.Properties.getInt('levelupMinimumPoint')){
				recovery.play();
				recovery.addEventListener('complete', function() {
					ending.volume = 3;
				});
				if(Ti.Platform.osname!='android'){
					speech.startSpeaking({
					    text:label_top.text + '。' + label1.text,
					    voice:speechLang,
					    rate:0.3
					});
				}else{
					speech.startSpeaking({
					    text:label_top.text + '。' + label1.text,
					    rate:1
					});
				}
			}else{
				ending.volume = 3;
			}
		}
	}, 1000);
	
	var walletImage = Titanium.UI.createLabel({
		text:coins0,
		color:'yellow',
		font:{fontSize:50*zoomTableview,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'center',
		height:100*zoomByOsname,
		width:100*zoomByOsname,
		bottom:10*zoomByOsname,
		//right:10*zoomByOsname,
		backgroundImage:'/assets/images/wallet.png'
	});
	self.add(walletImage);
	
	var tableview = Titanium.UI.createTableView({top: 0});
	
	tableview.addEventListener('click', function(e){
		
	});
	
    tableview.startLayout();
    tableview.setData(rows);
    tableview.finishLayout();
    
    //self.add(tableview);
	//ending.play();
	
	return self;
}

module.exports = FinalView;
