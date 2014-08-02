//FirstView Component Constructor
function Question(win, purchase, count, label00, opening, questionArray, answerArray, randomArray1, randomArray2, recordArray, bgm00, adView, hintCounter) {
	var utterance = require('bencoding.utterance');
	var speech = utterance.createSpeech();
	speech.startSpeaking({
	    text:"Welcome to the kokucy app!",
	    voice:"en-US",
	    rate:0.2
	});
	var correct, tip, child;//hint function
	var Timer, Timer1; //タイマーを格納する変数（タイマーID）の宣言//カウントダウン関数を1000ミリ秒毎に呼び出す関数
	var height = Ti.Platform.displayCaps.platformHeight;
	var width = Ti.Platform.displayCaps.platformWidth;
	var fontsize = Ti.App.Properties.getInt('fontsize');
	var zoomByOsname = Titanium.App.Properties.getDouble('zoomByOsname');
	
	var self, no, imageView, random1_5, seikai, huseikai, bgm00, underView,
		randomArray2, randomArray3, randomArray4, hintButton, hintCounter, hintUse;
	seikai = Titanium.Media.createSound({
	    url: '/assets/sound/seikai.mp3',
	});
	huseikai = Titanium.Media.createSound({
	    url: '/assets/sound/huseikai.mp3',
	});
	
	//create object instance, a parasitic subclass of Observable
	self = Ti.UI.createView({
		backgroundColor:'#fff',
	});
	
	if(count == 0){
		var bgm00 = Titanium.Media.createSound({
		    url: '/assets/sound/' + Titanium.App.Properties.getString('music'),
		    looping : true,
		});
		bgm00.play();
		
		var questionName =  Titanium.App.Properties.getString('questionName');
	    var answerName =  Titanium.App.Properties.getString('answerName');
	    
	    var db1 = Ti.Database.open(Titanium.App.Properties.getString('databaseName'));
	    var questionArray = [];
	    var answerArray = [];
	    var select = 'SELECT ' + questionName + ', ' + answerName + ' FROM DATA';
	    //alert(select);
	    var rows = db1.execute(select);
	    
	    while(rows.isValidRow()){
	        questionArray.push(rows.fieldByName(questionName));
	        answerArray.push(rows.fieldByName(answerName));
	        rows.next();
	    }
	    rows.close();
	    db1.close();
		
		var ad = require('net.nend');
		var adView;
		if(Ti.Platform.osname === 'android'){
		    adView = ad.createView({
		        spotId: Titanium.App.Properties.getInt('nend_spotid_android'),//123711,
		        apiKey: Titanium.App.Properties.getString('nend_appkey_android'),//"97d4189dd3d26f29a3565d2030c208fb21303cd9",
		        width: 320,
		        height: 50,
		        top: 0
		    });
		}else{
		    adView = ad.createView({
		        spotId: Titanium.App.Properties.getInt('nend_spotid'),//118508,
		        apiKey: Titanium.App.Properties.getString('nend_appkey'),//"a3faebdba7223598eb433397b2b15a399710179f",
		        width: 320,
		        height: 50,
		        top: 0
		    });
		}
		
		var randomArray1 = [];
		var randomArray2 = [];
		for(i = 0; i<questionArray.length; i++){
			randomArray1.push(i);
			randomArray2.push(i);
		}
		shuffle(randomArray1);
		var recordArray = [];
		
		var hintCounter = Titanium.App.Properties.getInt('hintCounter');
	}
	
	//question number
	no = randomArray1[count];
	
	//answer number
	shuffle(randomArray2);
	randomArray3 = randomArray2.concat(randomArray2);
	randomArray4 = [];//question number と　ランダムな数字が３つ並んだ配列
	for(i=0; i<randomArray3.length; i++){
		if(randomArray3[i]==no){
			randomArray4.push(randomArray3[i]);
			randomArray4.push(randomArray3[i+1]);
			randomArray4.push(randomArray3[i+2]);
			randomArray4.push(randomArray3[i+3]);
			i = i+1000;//end
		}
	}
	randomArray4 = shuffle(randomArray4);
	
	//1-5のランダム
	random1_5 = Math.floor(Math.random()*5+1);
	underView = Ti.UI.createView({
		height: 300*zoomByOsname,
		width: 300*zoomByOsname,
	});
	
	colorArray=['red', 'blue', 'green', 'yellow'];
	shuffle(colorArray);
	if(Titanium.App.Properties.getBool('Purchased-'+purchase)==false){
		var buttonTop = 60;
		var buttonTop2 = height/2-100*zoomByOsname/2+25;
	}else{
		var buttonTop = 10;
		var buttonTop2 = height/2-100*zoomByOsname/2;
	}
	
	for(i=0; i<4; i++){
		var answerView = Titanium.UI.createView({
			height:100*zoomByOsname,
			width:200*zoomByOsname,
			value:randomArray4[i],
		});
		var answerLabel = Titanium.UI.createLabel({
			font : {fontSize : fontsize*zoomByOsname, fontFamily : 'Helvetica Neue', fontWeight :'bold'},
			backgroundColor : '#fff',
			backgroundImage : '/assets/images/' + colorArray[i] + '_frame.png',
			//text:answerArray[randomArray4[i]],
			textAlign:'center',
			color:'#000000',
			height:100*zoomByOsname,
			width:200*zoomByOsname,
		});
		switch (i){
			case 0:
				answerView.top = buttonTop;
				answerView.left = 10;
			break;
			case 1:
				answerView.top = buttonTop;
				answerView.right = 10;
			break;
			case 2:
				answerView.bottom = 10;
				answerView.left = 10;
			break;
			case 3:
				answerView.bottom = 10;
				answerView.right = 10;
			break;
	    }
	    answerView.add(answerLabel);
	    
		//機能追加　反転表示モード
		if(Titanium.App.Properties.getString('mode')=='reverse' || Titanium.App.Properties.getString('mode')=='picture'){
			var _random1_5 = (random1_5+i+1)%5;
			if(_random1_5==0){
				_random1_5 =5 ;
			}
			var answerImage = Ti.UI.createImageView({
			    image: '/assets/images/' + Titanium.App.Properties.getString('folder') + '/' + questionArray[randomArray4[i]] + '/l_0' + _random1_5 + '.png',
			    //height: 200*zoomByOsname,
			});
			answerView.add(answerImage);
		}else if(Titanium.App.Properties.getString('mode')=='normal'){
			answerLabel.text = answerArray[randomArray4[i]];
		}else if(Titanium.App.Properties.getString('mode')=='word'){
			answerLabel.text = questionArray[randomArray4[i]];
		}
		self.add(answerView);
	}
	//機能追加　モード
	if(Titanium.App.Properties.getString('mode')=='reverse' || Titanium.App.Properties.getString('mode')=='word'){
		imageView = Titanium.UI.createLabel({
			font : {fontSize : fontsize*zoomByOsname*2, fontFamily : 'Helvetica Neue', fontWeight :'bold'},
			backgroundColor : 'transparent',
			//backgroundImage : '/assets/images/' + colorArray[i] + '_frame.png',
			text:answerArray[no],
			textAlign:'center',
			color:'#696969',
			//height:'auto',
			//width:width-20,
		});
	}else{
		imageView  = Ti.UI.createImageView({
		    image: '/assets/images/' + Titanium.App.Properties.getString('folder') + '/' + questionArray[no] + '/l_0' + random1_5 + '.png',
		    //height: 200*zoomByOsname,
		});
	}
	underView.add(imageView);
	self.add(underView);
	setTimeout(function(){
		animation();
	} ,100);
	Timer1 = setInterval(function(){animation();}, 4000);
	
	//effect
	Ti.API.info('Effect:' + Titanium.App.Properties.getString('effect'));
	if(Titanium.App.Properties.getInt('time')==0){
		var animateDuration = 10000;
	}else{
		var animateDuration = Titanium.App.Properties.getInt('time')*1000;
	}
	if(Titanium.App.Properties.getString('effect')=='opacity'){
		animation1(animateDuration);
	}else if(Titanium.App.Properties.getString('effect')=='cloud'){
		imageView2  = Ti.UI.createImageView({
		    image: '/assets/images/cloud.png',
		    width:261*zoomByOsname,
		    height: 178*zoomByOsname,
		});
		animation2(animateDuration);
		self.add(imageView2);
	}else if(Titanium.App.Properties.getString('effect')=='zoom'){
		animation3(animateDuration);
	}else if(Titanium.App.Properties.getString('effect')=='rotate'){
		animation4(animateDuration);
	}else if(Titanium.App.Properties.getString('effect')=='random'){
		random1_4 = Math.floor(Math.random()*4+1);
		if(random1_4==1){
			animation1(animateDuration);
		}else if(random1_4==2){
			imageView2  = Ti.UI.createImageView({
			    image: '/assets/images/cloud.png',
			    width:261*zoomByOsname,
			    height: 178*zoomByOsname,
			});
			animation2(animateDuration);
			self.add(imageView2);
		}else if(random1_4==3){
			animation3(animateDuration);
		}else if(random1_4==4){
			animation4(animateDuration);
		}
	}
	
	for(i=0; i<4; i++){
		var answerButton = Titanium.UI.createView({
			height:100*zoomByOsname,
			width:200*zoomByOsname,
			val:randomArray4[i],
			//backgroundSelectedImage:'/assets/images/shadow.png',
			//style:'',//透明ボタンにする
		});
		switch (i){
			case 0:
				answerButton.top = buttonTop;
				answerButton.left = 10;
			break;
			case 1:
				answerButton.top = buttonTop;
				answerButton.right = 10;
			break;
			case 2:
				answerButton.bottom = 10;
				answerButton.left = 10;
			break;
			case 3:
				answerButton.bottom = 10;
				answerButton.right = 10;
			break;
	    }
		answerButton.addEventListener('click', function(e){
			e.source.backgroundColor = 'yellow';
			e.source.opacity = 0.2;
			if(Titanium.App.Properties.getBool('hint')==true && hintCounter>0){
				self.remove(hintUnderView);
			}
			clearInterval(Timer1);//animation
			if(sec != 0){
				clearInterval(Timer);//timer
				self.remove(labelTimer);
				clock.stop();
			}
			Ti.API.info(JSON.stringify(e));
			if(e.source.val == no){
				seikai.play();
				self.backgroundColor = 'green';
				if(hintUse==0){
					recordArray.push([no, 1, random1_5]);
				}else{
					recordArray.push([no, 2, random1_5]);
				}
			}else{
				huseikai.play();
				self.backgroundColor = 'pink';
				recordArray.push([no, 0, random1_5]);
			}
			controlView();
		});
		self.add(answerButton);
	}
	if(Titanium.App.Properties.getBool('Purchased-'+purchase)==false){
		if(Titanium.Network.online == false){
			var label = Titanium.UI.createLabel({
				color:'#fff',
				text:L('offline'),
				font:{fontSize:25,fontFamily:'Helvetica Neue',fontWeight:'bold'},
				textAlign:'center',
				width:320,
				height:50,
				top:0,
			    backgroundGradient:{
				    type:'linear',
				    colors:[
				        {position:0.00,color:'#bfd255'},
				        {position:0.50,color:'#8eb92a'},
				        {position:0.51,color:'#72aa00'},
				        {position:1.00,color:'#9ecb2d'}
				    ]
				}
				//opacity:0.7,
			});
			self.add(label);
			
			label.addEventListener('click', function(e) {
				alert(e.source.text);
			});
		}else{
			self.add(adView);
		}
	}
	//hint
	var sprayer = Titanium.Media.createSound({
	    url: '/assets/sound/sprayer01.mp3',
	});
	var hintUse = 0;
	if(Titanium.App.Properties.getBool('hint')==true && hintCounter>0){
		hintUnderView = Ti.UI.createView({
			height:68*zoomByOsname,
			width:68*zoomByOsname,
			bottom:0,
		});
		hintButton = Ti.UI.createImageView({
			backgroundImage:'/assets/images/Tip.png',
			//backgroundSelectedImage:'/assets/images/Tip_gray.png',
			//color:'red',
			//title:hintCounter,
			//font:{fontSize:20*zoomByOsname,fontFamily:'Helvetica Neue',fontWeight:'bold',fontStyle:'italic'},
			//textAlign:'center',
			height:48*zoomByOsname,
			width:48*zoomByOsname,
			opacity:1,
		});
		hintLabel = Ti.UI.createLabel({
			color:'red',
			text:hintCounter,
			font:{fontSize:20*zoomByOsname,fontFamily:'Helvetica Neue',fontWeight:'bold',fontStyle:'italic'},
			textAlign:'center',
		});
		hintUnderView.add(hintButton);
		hintUnderView.add(hintLabel);
		self.add(hintUnderView);
		
		hintUnderView.addEventListener('click', function(e){
			hintButton.opacity = 0.2;
			sprayer.play();
			hintUse++;
			hintCounter--;
			if(hintCounter<=0){
				self.remove(hintUnderView);
			}else{
				hintLabel.text = hintCounter;
			}
			var children = self.getChildren();
			
			random1_3 = Math.floor(Math.random()*3+1);
			//random1_3 = 1;//test
			switch (random1_3){
				case 1:
					correct = Ti.UI.createImageView({
						backgroundImage:'/assets/images/correct.png',
						height:48*zoomByOsname,
						width:120*zoomByOsname,
						opacity:0.7,
					});
					for(i=0;i<children.length;i++){
					    if(children[i].val || children[i].val==0){
					    		if(children[i].val == no){
					    			child = children[i];
					    			child.add(correct);
								setTimeout(function(){
								    	child.remove(correct);
								    	hintButton.opacity = 1;
								}, 500);
					    		}
					    }
					}
				break;
				case 2:
					for(i=0;i<children.length;i++){
					    if(children[i].val || children[i].val==0){
					    		if(children[i].val == no){
					    			children[i].backgroundColor = '#fff';
					    			children[i].opacity = 0.7;
					    		}
					    }
					}
					setTimeout(function(){
						for(i=0;i<children.length;i++){
						    if(children[i].val || children[i].val==0){
					    			children[i].backgroundColor = 'transparent';
					    			children[i].opacity = 1;
						    }
						}
					    	hintButton.opacity = 1;
					}, 500);
				break;
				case 3:
					tip = Ti.UI.createImageView({
						image:'/assets/images/Tip.png',
						height:48*zoomByOsname,
						width:48*zoomByOsname,
						opacity:0.7
					});
					for(i=0;i<children.length;i++){
					    if(children[i].val || children[i].val==0){
					    		if(children[i].val == no){
					    			var child = children[i];
					    			child.add(tip);
								setTimeout(function(){
								    	child.remove(tip);
								    	hintButton.opacity = 1;
								}, 500);
					    		}
					    }
					}
				break;
			}
		});
	}
	//timer
	var sec=Titanium.App.Properties.getInt('time');
	var labelTimer = Ti.UI.createLabel({
		backgroundColor:'transparent',
		color:'red',
		text:sec,
		font:{fontSize:30*zoomByOsname,fontFamily:'Helvetica Neue',fontWeight:'bold',fontStyle:'italic'},
		height:'auto',
		width:'auto',
		top:buttonTop,
		opacity:0.7,
	});
	//表示が終わってから、タイマーをスタート
	if(sec != 0){
		self.add(labelTimer);
		var clock = Titanium.Media.createSound({
		    url: '/assets/sound/clock_35sec.mp3',
		    looping : true,
		});
		clock.play();
		Timer = setInterval(function(){
			sec =sec-1;
			labelTimer.text = sec;
			Ti.API.info(sec);
			if(sec<=0){
				if(Titanium.App.Properties.getBool('hint')==true && hintCounter>0){
					self.remove(hintUnderView);
				}
				clearInterval(Timer1);//animation
				clearInterval(Timer);//timer
				self.remove(labelTimer);
				clock.stop();
				huseikai.play();
				self.backgroundColor = 'pink';
				recordArray.push([no, 0, random1_5]);
				controlView();
			}
		},1000);
	}
	
	return self;
	//move ramdom
	function animation(){
		var random = Math.floor(Math.random()*1000000);
		random = zeroformat(random, 6);
		random = String(random);
		var x1 = parseInt(random.substr(-1,1));
		if(x1%2==0){x1=-x1;}
		var x2 = parseInt(random.substr(-2,1));
		if(x2%2==0){x2=-x2;}
		var x3 = parseInt(random.substr(-3,1));
		if(x3%2==0){x3=-x3;}
		var y1 = parseInt(random.substr(-4,1));
		if(y1%2==0){y1=-y1;}
		var y2 = parseInt(random.substr(-5,1));
		if(y2%2==0){y2=-y2;}
		var y3 = parseInt(random.substr(-6,1));
		if(y3%2==0){y3=-y3;}
		underView.animate({center:{x:width/2+x1,y:height/2+y1},curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,duration:975}, function(){
		    // STEP 2. 中心座標(0, 200)に移動
		    underView.animate({center:{x:width/2+x2,y:height/2+y2},duration:975}, function(){
		        // STEP 3. 中心座標(300, 300)に移動
		        underView.animate({center:{x:width/2+x3,y:height/2+y3},duration:975},function(){
		            // STEP 4. 元の位置である中心座標(150, 60)に戻る
		            underView.animate({center:{x:width/2,y:height/2, duration:975}});
		        });
		   });
		});
	}
	//opacity
	function animation1(duration){
		imageView.opacity = 0.1;
		setTimeout(function(){
			//clearInterval(Timer1);
			imageView.animate({
				opacity:1,duration:duration-100
			});
		}, 100);
	}
	//cloud
	function animation2(duration){
		//imageView2.opacity = 1;
		setTimeout(function(){
			//clearInterval(Timer1);
			imageView2.animate({
				opacity:0,duration:duration/2
			});
		}, duration/2);
	}
	//zoom
	function animation3(duration){
		var matrix0 = Titanium.UI.create2DMatrix().scale(0.2, 0.2);
		setTimeout(function(){
			//clearInterval(Timer1);
			imageView.transform = matrix0;
		}, 100);
		// 通常のサイズ(1×1)にへの変形指定をします。
		var matrix1 = Ti.UI.create2DMatrix();
		//matrix1 = matrix1.rotate(180);
		matrix1 = matrix1.scale(1, 1);
		setTimeout(function(){
			imageView.animate({
				transform: matrix1,
				duration: duration/2,
				repeat:1
			});
		}, duration/2);
	}
	//rotate
	function animation4(duration){
		var matrix0 = Titanium.UI.create2DMatrix().rotate(180);
		setTimeout(function(){
			//clearInterval(Timer1);
			imageView.transform = matrix0;
		}, 100);
		// 通常のサイズ(1×1)にへの変形指定をします。
		var matrix1 = Ti.UI.create2DMatrix();
		//matrix1 = matrix1.rotate(180);
		matrix1 = matrix1.rotate(0);
		setTimeout(function(){
			imageView.animate({
				transform: matrix1,
				duration: duration/2,
				repeat:1
			});
		}, duration/2);
	}
	
	function controlView(){
		var children = self.getChildren();
		for(i=0;i<children.length;i++){
			var correct = Ti.UI.createImageView({
				backgroundImage:'/assets/images/correct.png',
				height:48*zoomByOsname,
				width:120*zoomByOsname,
				opacity:0.9,
			});
			var incorrect = Ti.UI.createImageView({
				backgroundImage:'/assets/images/incorrect.png',
				height:48*zoomByOsname,
				width:120*zoomByOsname,
				opacity:0.7,
			});
		    if(children[i].value || children[i].value==0){
		    		Ti.API.info(no + '/' + children[i].value);
		    		if(children[i].value == no){
		    			//children[i].backgroundImage = '/assets/images/correct.png';
		    			children[i].add(correct);
		    			//children[i].opacity = 0.7;
		    		}else{
		    			//children[i].backgroundImage = '/assets/images/incorrect.png';
		    			children[i].add(incorrect);
		    			//children[i].opacity = 0.5;
		    		}
		    }
		}
		var view = Titanium.UI.createView({
			backgroundColor:'transparent',
		});
		var play = Titanium.UI.createView({
			height:100*zoomByOsname,
			width:100*zoomByOsname,
			top:buttonTop2,
			right:50*zoomByOsname,
		});
		var playLabel = Titanium.UI.createLabel({
			color:'#000',
			font : {fontSize : 30*zoomByOsname, fontFamily : 'Helvetica Neue', fontWeight :'bold'},
			text:L('Next'),
			textAlign:'center',
			height:100*zoomByOsname,
			width:100*zoomByOsname,
			backgroundImage:'/assets/images/Play.png'
		});
		play.add(playLabel);
		play.addEventListener('click', function(e){
			count++;
			if(count < randomArray1.length){
				var Question = require('ui/common/' + purchase + '/Question');
				//construct UI
				var question = new Question(win, purchase, count, label00, opening, questionArray, answerArray, randomArray1, randomArray2, recordArray, bgm00, adView, hintCounter);
				win.add(question);
				win.remove(self);
			}else{
				bgm00.stop();
				var FinalView = require('ui/common/FinalView');	
				//construct UI
				var finalView = new FinalView(win, recordArray, questionArray, answerArray, label00, opening, purchase);
				win.add(finalView);
				win.remove(self);
			}
		});
		
		var stop = Titanium.UI.createView({
			height:100*zoomByOsname,
			width:100*zoomByOsname,
			top:buttonTop2,
			left:50*zoomByOsname,
		});
		var stopLabel = Titanium.UI.createLabel({
			color:'#000',
			font : {fontSize : 30*zoomByOsname, fontFamily : 'Helvetica Neue', fontWeight :'bold'},
			text:L('Stop'),
			textAlign:'center',
			height:100*zoomByOsname,
			width:100*zoomByOsname,
			backgroundImage:'/assets/images/Stop.png'
		});
		stop.add(stopLabel);
		stop.addEventListener('click', function(e){
			bgm00.stop();
			var FinalView = require('ui/common/FinalView');	
			//construct UI
			var finalView = new FinalView(win, recordArray, questionArray, answerArray, label00, opening, purchase);
			win.add(finalView);
			win.remove(self);
		});
		view.add(play);
		if(count<randomArray1.length-1){
			view.add(stop);
		}else{
			playLabel.text = L('Fin');
			play.right = width/2-100*zoomByOsname/2;
		}
		self.add(view);
	}
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

//v=数値　n=桁数
function zeroformat(v, n) {
	vl = String(v).length;
	if(n > vl) {
		return (new Array((n - vl) + 1).join(0)) + v;
	} else {
		return v;
	}
}

module.exports = Question;
