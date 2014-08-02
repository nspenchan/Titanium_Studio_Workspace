//FirstView Component Constructor
function Question(win, purchase, count, label00, label02, opening) {
	var utterance = require('bencoding.utterance');
	var speech0 = utterance.createSpeech();
	var speech = utterance.createSpeech();
	if(Ti.Platform.locale=='ja'){
		var speechLang0 = 'ja-JP';
	}else{
		var speechLang0 = 'en-US';
	}
	if(Ti.Platform.osname!='android'){
		speech0.startSpeaking({
		    text:L("Lets_study"),
		    voice:speechLang0,
		    rate:0.1
		});
	}else{
		speech.startSpeaking({
		    text:L("Lets_study"),
		    //voice:speechLang,
		    rate:1
		});		
	}
	
	var cover, buttonTop, buttonTop2, label, hintUse, hint, hintLabel, children, temp, sec, labelTimer, 
		refreh, refreshLabel, centerLabel, answer, length, leng, answerLetter, answerRow, answerCounter, 
		answerLabel, suffleTimes, shuffleCounter, tempArrray, tempArray2, random, x1, x2, x3, y1, y2, y3, 
		matrix0, matrix1, animationDuration, topLabel, correct, incorrect, view, play, payLabel, FinalView, 
		finalView, stop, stopLabel, self, no, imageView, random1_5, bgm00, underView, colorArray, 
		randomArray2, randomArray3, randomArray4, hintButton, hintCounter, hintUse, correct, tip, child, 
		speechLang;//hint function
	var Timer, Timer1, Timer2; //タイマーを格納する変数（タイマーID）の宣言//カウントダウン関数を1000ミリ秒毎に呼び出す関数
	var height = Ti.Platform.displayCaps.platformHeight;
	var width = Ti.Platform.displayCaps.platformWidth;
	var fontsize = Ti.App.Properties.getInt('fontsize');
	var zoomByOsname = Titanium.App.Properties.getDouble('zoomByOsname');
	var lang = Titanium.App.Properties.getString('answerName');
	var questionName =  Titanium.App.Properties.getString('questionName');
    var answerName =  Titanium.App.Properties.getString('answerName');
    switch(answerName){
		case 'en':
			speechLang = 'en-US';
			break;
		case 'ja':
		case 'j1':
		case 'j2':
		case 'j3':
			speechLang = 'ja-JP';
			break;
		case 'zh':
			speechLang = 'zh-CN';
			break;
		case 'ko':
			speechLang = 'ko-KR';
			break;
		case 'ru':
			speechLang = 'ru-RU';
			break;
		case 'ar':
			speechLang = 'ar-AE';
			break;
		case 'el':
			speechLang = 'el-GR';
			break;
		case 'vi':
			speechLang = 'vi-VN';
			break;
		case 'tr':
			speechLang = 'tr-TR';
			break;
		case 'th':
			speechLang = 'th-TH';
			break;
		case 'pt':
			speechLang = 'pt-PT';
			break;
		case 'de':
			speechLang = 'de-DE';
			break;
		case 'fa':
			speechLang = 'fa-IR';
			break;
		case 'it':
			speechLang = 'it-IT';
			break;
		case 'fr':
			speechLang = 'fr-FR';
			break;
		case 'es':
			speechLang = 'es-ES';
			break;
		case 'id':
			speechLang = 'id-ID';
			break;
		case 'sv':
			speechLang = 'sv-SE';
			break;
		case 'uk':
			speechLang = 'uk=UA';
			break;
		case 'ro':
			speechLang = 'ro-RO';
			break;
		case 'no':
			speechLang = 'nb-NO';
			break;
		case 'hi':
			speechLang = 'hi-IN';
			break;
		case 'he':
			speechLang = 'he-IL';
			break;
		case 'da':
			speechLang = 'da-DK';
			break;
		case 'is':
			speechLang = 'is-IS';
			break;
		case 'ga':
			speechLang = 'ga-IE';
			break;
		case 'pl':
			speechLang = 'pl-PL';
			break;
		case 'nl':
			speechLang = 'nl-NL';
			break;
		case 'sw':
			speechLang = 'sw-KE';
			break;
		case 'ne':
			speechLang = 'ne-NP';
			break;
		case 'hu':
			speechLang = 'hu-HU';
			break;
		case 'bg':
			speechLang = 'bg-BG';
			break;
	}
	var hintCounter = Titanium.App.Properties.getInt('hintCounter');
	
	var seikai = Titanium.Media.createSound({
	    url: '/assets/sound/seikai.mp3',
	});
	var huseikai = Titanium.Media.createSound({
	    url: '/assets/sound/huseikai.mp3',
	});
	var bgm00 = Titanium.Media.createSound({
	    url: '/assets/sound/' + Titanium.App.Properties.getString('music'),
	    looping : true,
	    volume: 0.5,
	});
	var sprayer = Titanium.Media.createSound({
	    url: '/assets/sound/sprayer01.mp3',
	});
	var clock = Titanium.Media.createSound({
	    url: '/assets/sound/clock_35sec.mp3',
	    looping : true,
	});
	var shuffleSound = Titanium.Media.createSound({
	    url: '/assets/sound/cancel4.mp3',
	});
	var bomb = Titanium.Media.createSound({
	    url: '/assets/sound/bomb.mp3',
	    looping : false,
	});
	var answerSound = Titanium.Media.createSound({
	    url: '/assets/sound/decision7.mp3',
	});
	
	//create object instance, a parasitic subclass of Observable
	self = Ti.UI.createView({
		backgroundColor:'#fff',
	});
	
	bgm00.play();
    
    var db1 = Ti.Database.open(Titanium.App.Properties.getString('databaseName'));
    var questionArray = [];
    var answerArray = [];
    var speechArray = [];//日本語（漢字）のときは、ひらがな（漢字）となる。それ以外は、answerArrayと同じ
    if(answerName=='j1' || answerName=='j2' || answerName=='j3'){
    		var select = 'SELECT ' + questionName + ', ja, ' + answerName + ' FROM DATA';
	    //alert(select);
	    var rows = db1.execute(select);
	    
	    while(rows.isValidRow()){
	        questionArray.push(rows.fieldByName(questionName));
	        answerArray.push(rows.fieldByName(answerName));
	        speechArray.push(rows.fieldByName('ja'));
	        rows.next();
	    }
    }else{
    		var select = 'SELECT ' + questionName + ', ' + answerName + ' FROM DATA';
	    //alert(select);
	    var rows = db1.execute(select);
	    
	    while(rows.isValidRow()){
	        questionArray.push(rows.fieldByName(questionName));
	        answerArray.push(rows.fieldByName(answerName));
	        speechArray.push(rows.fieldByName(answerName));
	        rows.next();
	    }
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
		//randomArray2.push(i);
	}
	shuffle(randomArray1);
	var recordArray = [];
	
	makeQuestion();
	
	function makeQuestion(){
		//question number
		no = randomArray1[count];
		
		//cover
		cover = Titanium.UI.createView();
		
		if(Titanium.App.Properties.getBool('Purchased-'+purchase)==false){
			buttonTop = 60;
			buttonTop2 = height/2-100*zoomByOsname/2+25;
		}else{
			buttonTop = 10;
			buttonTop2 = height/2-100*zoomByOsname/2;
		}
		
		//1-5のランダム
		random1_5 = Math.floor(Math.random()*5+1);
		underView = Ti.UI.createView({
			height: 300*zoomByOsname,
			width: 360*zoomByOsname,
		});
		
		if(Titanium.App.Properties.getString('mode')=='reverse'){
			imageView  = Ti.UI.createLabel({
				font : {fontSize : fontsize*zoomByOsname*2, fontFamily : 'Helvetica Neue', fontWeight :'bold'},
				backgroundColor : 'transparent',
				textAlign:'center',
				color:'#696969',
			    text: answerArray[no],
				height: 200*zoomByOsname,
				width: width,
				top:-20*zoomByOsname,
			});
		}else if(Titanium.App.Properties.getString('mode')=='word'){
			imageView  = Ti.UI.createLabel({
				font : {fontSize : fontsize*zoomByOsname*2, fontFamily : 'Helvetica Neue', fontWeight :'bold'},
				backgroundColor : 'transparent',
				textAlign:'center',
				color:'#696969',
			    text: questionArray[no],
				height: 200*zoomByOsname,
				width: width,
				top:-20*zoomByOsname,
			});
		}else{
			imageView  = Ti.UI.createImageView({
			    image: '/assets/images/' + Titanium.App.Properties.getString('folder') + '/' + questionArray[no] + '/l_0' + random1_5 + '.png',
				height: 200*zoomByOsname,
				width: 300*zoomByOsname,
			});
		}
		underView.add(imageView);
		self.add(underView);
		setTimeout(function(){
			animation();
		} ,100);
		Timer1 = setInterval(function(){animation();}, 4000);
		
		//effect
		EffevtStart();
		
		//offline
		if(Titanium.App.Properties.getBool('Purchased-'+purchase)==false){
			if(Titanium.Network.online == false){
				label = Titanium.UI.createLabel({
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
		hintUse = 0;
		hint = Titanium.UI.createView({
			height:100*zoomByOsname,
			width:100*zoomByOsname,
			//top:buttonTop2,
			left:10*zoomByOsname,
		});
		if(Titanium.App.Properties.getBool('hint')==true && hintCounter>0){
			hintLabel = Titanium.UI.createLabel({
				font : {fontSize : 30*zoomByOsname, fontFamily : 'Helvetica Neue', fontWeight :'bold'},
				text:hintCounter,
				textAlign:'center',
				height:100*zoomByOsname,
				width:100*zoomByOsname,
				backgroundImage:'/assets/images/Tip.png'
			});
			hint.add(hintLabel);
			hint.addEventListener('click', function(e){
				if(Ti.Platform.osname!='android'){
					speech.startSpeaking({
					    text:speechArray[no],
					    voice:speechLang,
					    rate:0.1
					});
				}else{
					speech.startSpeaking({
					    text:speechArray[no],
					    rate:1
					});
				}
				//reset counter
				answerCounter = 0;
				//clear centerLabel
				answerLetter = [];
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
				//clear buttons
				children = answerRow.getChildren();
				
				if(lang=='ar' || lang=='fa' || lang=='he'){
					answerLetter.reverse();
				}
				for(i=0;i<children.length;i++){
					children[i].text = answerLetter[i];
					 if(children[i].opacity==0.2){
				    		children[i].opacity = 1;
				    		children[i].backgroundColor = '#fff';
				    }
				}
				self.add(cover);
				//hint text
				temp = centerLabel.text;
				centerLabel.text = answerArray[no];
				hintLabel.opacity = 0.2;
				sprayer.play();
				hintUse++;
				hintCounter--;
				if(hintCounter<=0){
					self.remove(hint);
				}else{
					hintLabel.text = hintCounter;
				}
				setTimeout(function(){
					centerLabel.text = temp;
				    	hintLabel.opacity = 1;
				    	self.remove(cover);
				}, 2000);
			});
			self.add(hint);
		}
		
		//timer
		sec=Titanium.App.Properties.getInt('time');
		labelTimer = Ti.UI.createLabel({
			backgroundColor:'transparent',
			color:'red',
			text:sec,
			font:{fontSize:30*zoomByOsname,fontFamily:'Helvetica Neue',fontWeight:'bold',fontStyle:'italic'},
			height:'auto',
			width:'auto',
			top:buttonTop,
			opacity:0.7,
		});
		TimerStart(sec);
		
		//refresh
		refresh = Titanium.UI.createView({
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
		//self.add(refresh);
		
		//answer
		centerLabel = Titanium.UI.createLabel({
			font : {fontSize : 50*zoomByOsname, fontFamily : 'Helvetica Neue', fontWeight :'bold'},
			backgroundColor : 'transparent',
			text:'',
			textAlign:'center',
			color:'red',
			height:'auto',
			width:'auto',
		});
		//self.add(centerLabel);
		
		//answer
		if(Titanium.App.Properties.getString('mode')=='reverse'){
			answer = questionArray[no];
		}else{
			answer = answerArray[no];
		}
		length = answer.length;
		if(length>8){
			leng = 8;
		}else{
			leng = length;
		}
		answerLetter = [];
		
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
		if(lang=='ar' || lang=='fa' || lang=='he'){
			answerLetter.reverse();
		}
		//shuffle(answerLetter);
		
		colorArray=['red', 'blue', 'green', 'yellow', 'gray', 'black', 'pink', 'purple'];
		shuffle(colorArray);
		
		answerRow = Titanium.UI.createView({
			width:60*length*zoomByOsname,
			height:80*zoomByOsname,
			bottom:10*zoomByOsname,
		});
		self.add(answerRow);
		
		if(length>8){
			answerRow.width = 480*zoomByOsname;
		}
		
		answerCounter = 0;
		for(i=0; i<leng; i++){
			answerLabel = Titanium.UI.createLabel({
				font : {fontSize : 30*zoomByOsname, fontFamily : 'Helvetica Neue', fontWeight :'bold'},
				backgroundColor : '#fff',
				backgroundImage : '/assets/images/' + colorArray[i] + '_frame.png',
				text:answerLetter[i],
				textAlign:'center',
				color:'#000000',
				width:60*zoomByOsname,
				height:80*zoomByOsname,
				left:60*i*zoomByOsname
			});
			answerLabel.addEventListener('click', function(e){
				answerSound.play();
				e.source.backgroundColor = 'yellow';
				e.source.opacity = 0.2;
				centerLabel.text = centerLabel.text.substr(0, answerCounter) + e.source.text + centerLabel.text.substr(answerCounter+1);
				answerCounter++;
				if(answerCounter == 1 && leng != 1){
					self.add(refresh);
				}else if(answerCounter == leng){
					self.remove(hint);
					self.remove(refresh);
					clearInterval(Timer1);//animation
					if(sec != 0){
						clearInterval(Timer);//timer
						self.remove(labelTimer);
						clock.stop();
					}
					Ti.API.info(JSON.stringify(e));
					if(centerLabel.text == answer){
						seikai.play();
						self.backgroundColor = 'green';
						if(hintUse==0){
							num = 1;
						}else{
							num = 2;
						}
					}else{
						huseikai.play();
						self.backgroundColor = 'pink';
						num = 0;
					}
					recordArray.push([no, num, random1_5]);
					controlView(num);
				}
			});
			answerRow.add(answerLabel);
		}
		
		//shuffle
		suffleTimes = Math.floor(Math.random()*8+1);;
		self.add(cover);
		shuffleCounter = 0;
		EffevtStart(suffleTimes);
		Timer2 = setInterval(function(){
			if(shuffleCounter<suffleTimes){
				shuffleSound.play();
				//change button
				random1 = Math.floor(Math.random()*leng);
				random2 = Math.floor(Math.random()*(leng-1)+1);
				random3 = (random1 + random2)%leng;
	
				tempArray = [];
				tempArray2 = [];
				for(i=0; i<leng; i++){
					if(i==random1){
						tempArray.push(answerLetter[random3]);
						tempArray2.push(colorArray[random3]);
					}else if(i==random3){
						tempArray.push(answerLetter[random1]);
						tempArray2.push(colorArray[random1]);
					}else{
						tempArray.push(answerLetter[i]);
						tempArray2.push(colorArray[i]);
					}
				}
				answerLetter = tempArray;
				colorArray = tempArray2;
	
				children = answerRow.getChildren();
				for(i=0;i<children.length;i++){
					if(i==random1 || i==random3){
						children[i].opacity = 0.5;
					}
					children[i].text = answerLetter[i];
					children[i].backgroundImage = '/assets/images/' + colorArray[i] + '_frame.png';
				}setTimeout(function(){
					for(i=0;i<children.length;i++){
						children[i].opacity = 1;
					}
				}, 100);
			}else{
				//children = answerRow.getChildren();
				self.remove(cover);
				clearInterval(Timer2);
				self.add(centerLabel);
				TimerStart();
			}
			/*
			setTimeout(function(){
				for(i=0;i<children.length;i++){
					children[i].opacity = 1;
				}
			}, 100);
			*/
			shuffleCounter++;
		}, 1000);
	}
	return self;
	//move ramdom
	function animation(){
		random = Math.floor(Math.random()*1000000);
		random = zeroformat(random, 6);
		random = String(random);
		x1 = parseInt(random.substr(-1,1));
		if(x1%2==0){x1=-x1;}
		x2 = parseInt(random.substr(-2,1));
		if(x2%2==0){x2=-x2;}
		x3 = parseInt(random.substr(-3,1));
		if(x3%2==0){x3=-x3;}
		y1 = parseInt(random.substr(-4,1));
		if(y1%2==0){y1=-y1;}
		y2 = parseInt(random.substr(-5,1));
		if(y2%2==0){y2=-y2;}
		y3 = parseInt(random.substr(-6,1));
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
	function animation1(duration, num){
		imageView.opacity = 0.1;
		setTimeout(function(){
			//clearInterval(Timer1);
			imageView.animate({
				opacity:1,
				duration:duration-100
			});
		}, 100+num*1000);
	}
	//cloud
	function animation2(duration, num){
		//imageView2.opacity = 1;
		setTimeout(function(){
			//clearInterval(Timer1);
			imageView2.animate({
				opacity:0,duration:duration/2
			});
		}, duration/2+num*1000);
	}
	//zoom
	function animation3(duration, num){
		matrix0 = Titanium.UI.create2DMatrix().scale(0.2, 0.2);
		setTimeout(function(){
			//clearInterval(Timer1);
			imageView.transform = matrix0;
		}, 100);
		// 通常のサイズ(1×1)にへの変形指定をします。
		matrix1 = Ti.UI.create2DMatrix();
		//matrix1 = matrix1.rotate(180);
		matrix1 = matrix1.scale(1, 1);
		setTimeout(function(){
			imageView.animate({
				transform: matrix1,
				duration: duration/2,
				repeat:1
			});
		}, duration/2+num*1000);
	}
	//rotate
	function animation4(duration, num){
		matrix0 = Titanium.UI.create2DMatrix().rotate(180);
		setTimeout(function(){
			//clearInterval(Timer1);
			imageView.transform = matrix0;
		}, 100);
		// 通常のサイズ(1×1)にへの変形指定をします。
		matrix1 = Ti.UI.create2DMatrix();
		//matrix1 = matrix1.rotate(180);
		matrix1 = matrix1.rotate(0);
		setTimeout(function(){
			imageView.animate({
				transform: matrix1,
				duration: duration/2,
				repeat:1
			});
		}, duration/2+num*1000);
	}
	
	function EffevtStart(num){
		Ti.API.info('Effect:' + Titanium.App.Properties.getString('effect'));
		if(Titanium.App.Properties.getInt('time')==0){
			animateDuration = 10000;
		}else{
			animateDuration = Titanium.App.Properties.getInt('time')*1000;
		}
		if(Titanium.App.Properties.getString('effect')=='opacity'){
			animation1(animateDuration, num);
		}else if(Titanium.App.Properties.getString('effect')=='cloud'){
			imageView2  = Ti.UI.createImageView({
			    image: '/assets/images/cloud.png',
			    width:261*zoomByOsname,
			    height: 178*zoomByOsname,
			});
			animation2(animateDuration, num);
			self.add(imageView2);
		}else if(Titanium.App.Properties.getString('effect')=='zoom'){
			animation3(animateDuration, num);
		}else if(Titanium.App.Properties.getString('effect')=='rotate'){
			animation4(animateDuration, num);
		}else if(Titanium.App.Properties.getString('effect')=='random'){
			random1_4 = Math.floor(Math.random()*4+1);
			if(random1_4==1){
				animation1(animateDuration, num);
			}else if(random1_4==2){
				imageView2  = Ti.UI.createImageView({
				    image: '/assets/images/cloud.png',
				    width:261*zoomByOsname,
				    height: 178*zoomByOsname,
				});
				animation2(animateDuration, num);
				self.add(imageView2);
			}else if(random1_4==3){
				animation3(animateDuration, num);
			}else if(random1_4==4){
				animation4(animateDuration, num);
			}
		}
	}

	function TimerStart(){
		//表示が終わってから、タイマーをスタート
		if(sec != 0){
			self.add(labelTimer);
			clock.play();
			Timer = setInterval(function(){
				sec =sec-1;
				labelTimer.text = sec;
				Ti.API.info(sec);
				if(sec<=0){
					/*
					if(Titanium.App.Properties.getBool('hint')==true && hintCounter>0){
						self.remove(hintUnderView);
					}
					*/
					clearInterval(Timer1);//animation
					clearInterval(Timer);//timer
					self.remove(labelTimer);
					clock.stop();
					huseikai.play();
					self.backgroundColor = 'pink';
					recordArray.push([no, 0, random1_5]);
					controlView(0);
					self.remove(refresh);
				}
			},1000);
		}
	}
	
	function controlView(num){
		text1 = speechArray[no];
		setTimeout(function(){
			if(Ti.Platform.osname!='android'){
				speech.startSpeaking({
				    text:text1,
				    voice:speechLang,
				    rate:0.1
				});
			}else{
				speech.startSpeaking({
				    text:text1,
				    //voice:speechLang,
				    rate:1
				});		
			}
		}, 1000);
		topLabel = Titanium.UI.createLabel({
			font : {fontSize : 50*zoomByOsname, fontFamily : 'Helvetica Neue', fontWeight :'bold'},
			backgroundColor : '#fff',
			text:answerArray[no],
			textAlign:'center',
			color:'#000',
			height:'auto',
			width:'auto',
			top:60,
			opacity:0.7,
		});
		
		correct = Ti.UI.createImageView({
			backgroundImage:'/assets/images/correct.png',
			height:144*zoomByOsname,
			width:360*zoomByOsname,
			opacity:0.9,
		});
		incorrect = Ti.UI.createImageView({
			backgroundImage:'/assets/images/incorrect.png',
			height:144*zoomByOsname,
			width:360*zoomByOsname,
			opacity:0.7,
		});
		if(num == 0){
			self.add(topLabel);
			underView.add(incorrect);
			answerLetter = [];
			if(length<=8){
				for(i=0; i<length; i++){
					answerLetter.push(answer.substr(i, 1));
				}
			}else{
				for(i=0; i<8; i++){
					answerLetter.push(answer.substr(i, 1));
				}
			}
			//clear buttons
			children = answerRow.getChildren();
			
			if(lang=='ar' || lang=='fa' || lang=='he'){
				answerLetter.reverse();
			}
			for(i=0;i<children.length;i++){
				children[i].text = answerLetter[i];
				 if(children[i].opacity==0.2){
			    		children[i].opacity = 1;
			    		children[i].backgroundColor = '#fff';
			    }
			}
		}else{
			centerLabel.color = '#000';
			underView.add(correct);
			centerLabel.backgroundColor = '#fff';
			centerLabel.opacity = 0.7;
		}
		view = Titanium.UI.createView({
			backgroundColor:'transparent',
		});
		play = Titanium.UI.createView({
			height:100*zoomByOsname,
			width:100*zoomByOsname,
			//top:buttonTop2,
			right:10*zoomByOsname,
		});
		playLabel = Titanium.UI.createLabel({
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
				/*
				Question = require('ui/common/' + purchase + '/Question');
				//construct UI
				question = new Question(win, purchase, count, label00, opening, questionArray, answerArray, randomArray1, randomArray2, recordArray, bgm00, adView, hintCounter);
				win.add(question);
				win.remove(self);
				*/
				
				children = self.getChildren();
				for(i=0;i<children.length;i++){
					self.remove(children[i]);
				}
				Ti.API.info('remove_count: ' + i);
				self.backgroundColor = '#fff';
				makeQuestion();
			}else{
				bgm00.stop();
				FinalView = require('ui/common/FinalView');	
				//construct UI
				finalView = new FinalView(win, recordArray, questionArray, answerArray, label00, label02, opening, purchase);
				win.add(finalView);
				win.remove(self);
			}
		});
		
		stop = Titanium.UI.createView({
			height:100*zoomByOsname,
			width:100*zoomByOsname,
			//.top:buttonTop2,
			left:10*zoomByOsname,
		});
		stopLabel = Titanium.UI.createLabel({
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
			FinalView = require('ui/common/FinalView');	
			//construct UI
			finalView = new FinalView(win, recordArray, questionArray, answerArray, label00, label02, opening, purchase);
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
