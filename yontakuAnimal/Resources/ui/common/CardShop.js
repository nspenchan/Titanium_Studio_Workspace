//FirstView Component Constructor
function CardShop(win, questionArray, label02, opening) {
	if(opening.playing==true){
		opening.stop();
	}
	var gameBGM = Titanium.Media.createSound({
	    url: '/assets/sound/choco-zai.mp3',
	    looping : true,
	});
	gameBGM.play();
	var chime = Titanium.Media.createSound({
	    url: '/assets/sound/se_maoudamashii_chime13.mp3',
	    //looping : true,
	});
	var chime_x3 = Titanium.Media.createSound({
	    url: '/assets/sound/se_maoudamashii_chime14.mp3',
	    //looping : true,
	});
	var jump = Titanium.Media.createSound({
	    url: '/assets/sound/jump05.mp3',
	    //looping : true,
	});
	var utterance = require('bencoding.utterance');
	var speech = utterance.createSpeech();
	var speech1 = utterance.createSpeech();
	var speech2 = utterance.createSpeech();
	var speech3 = utterance.createSpeech();
	var speech4 = utterance.createSpeech();
	var speech5 = utterance.createSpeech();
	if(Ti.Platform.locale=='ja'){
		var speechLang = 'ja-JP';
	}else{
		var speechLang = 'en-US';
	}
	var height = Ti.Platform.displayCaps.platformHeight;
	var width = Ti.Platform.displayCaps.platformWidth;
	var zoomTableview = Titanium.App.Properties.getDouble('zoomTableview');
	var zoomByOsname = Titanium.App.Properties.getDouble('zoomByOsname');
	var answerName = Titanium.App.Properties.getString('answerName');
    var answerArray = [];
	var arrayColor = ['#ff7f7f', '#ff7fbf', '#ff7fff', '#bf7fff', '#7f7fff', '#7fbfff', '#7fffff', '#7fffbf', '#7fff7f', '#bfff7f', '#ffff7f', '#ffbf7f'];
	var coins = Ti.App.Properties.getInt('coins');
	//coins = 51;
	var left = (height*16/9-width)/2;
	var val = -1, 
		val1 = val-1;
	var self, animalImage, animalBase, pipeImage, pipeImage2, pipeBase, pipeCover, 
		children, children2, children3, label2, Coins, coins1, cardImage, cardImage2, cardImage3, 
		ctrlView, play, playLabel, stop, stopLabel, fontsize, db1, rows, select, gView, 
		random0, random1, random2, random3,randomArray, db2, nowLevel, update, count, burstImage; 
	
	switch(answerName){
		case 'ja':
		case 'ji':
		case 'j2':
		case 'j3':
		case 'zh':
		case 'ko':
			fontsize = 30*zoomByOsname;
		break;
		case 'ar':
		case 'el':
		case 'vi':
		case 'th':
		case 'fa':
			fontsize = 15*zoomByOsname;
		break;
		default:
			fontsize = 24*zoomByOsname;
		break;
	}
	
	db1 = Ti.Database.open(Titanium.App.Properties.getString('databaseName'));
    select = 'SELECT ' + answerName + ' FROM DATA';
    //alert(select);
    rows = db1.execute(select);
    
    while(rows.isValidRow()){
        answerArray.push(rows.field(0));
        rows.next();
    }
    rows.close();
    db1.close();
	
	//create object instance, a parasitic subclass of Observable
	self = Ti.UI.createView({
		backgroundColor:'#fff',
		backgroundImage:'/assets/images/094a.png',
	});
	
	label2 = Ti.UI.createLabel({
		color:'yellow',
		text: coins,
		font:{fontSize:25*zoomByOsname,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:80*zoomByOsname,
		width:80*zoomByOsname,
		top:10*zoomByOsname,
		right:10*zoomByOsname,
		backgroundImage:'/assets/images/wallet_coins.png'
	});
	self.add(label2);
	
	//Add behavior for UI
	label2.addEventListener('click', function(e) {
		Coins = require('ui/common/Coins');
			
		//construct UI
		coins1 = new Coins(win, questionArray, label02);
		win.add(coins1);
		setTimeout(function(){
			win.remove(self);
		}, 500);
	});
	
	controlView();
		
	return self;
	
	function gameView(){//animal
		if(Ti.Platform.osname!='android'){
			speech4.startSpeaking({
			    text:L('Which_pipe'),
			    voice:speechLang,
			    rate:0.2
			});
		}else{
			speech4.startSpeaking({
			    text:L('Which_pipe'),
			    rate:1
			});
		}
		random0 = Math.floor(Math.random()*96);
		if(random0<80){
			random0 = random0%12;
		}else{
			random0 = random0%16;
		}
		random1 = Math.floor(Math.random()*96);
		if(random1<80){
			random1 = random1%12;
		}else{
			random1 = random1%16;
		}
		random2 = Math.floor(Math.random()*96);
		if(random2<80){
			random2 = random2%12;
		}else{
			random2 = random2%16;
		}
		random3 = Math.floor(Math.random()*5+1);
		randomArray = [random0, random1, random2];
		gView= Titanium.UI.createView({
			backgroundColor:'transparent',
		});
		
		animalBase = Ti.UI.createLabel({
			backgroundColor:'transparent',
			height:height,
			width:width,
		});
		gView.add(animalBase);
		
		for(i=0; i<3; i++){
			animalImage = Ti.UI.createLabel({
				//backgroundColor:'green',
				color:'#000',
				text: i+1,
				font:{fontSize:25*zoomByOsname,fontFamily:'Helvetica Neue',fontWeight:'bold'},
				textAlign : 'center',
				height:width/6,
				width:width/4,
				bottom:0,
				left:(8*i+1)*width/24,
				backgroundImage:'/assets/images/' + Titanium.App.Properties.getString('folder') + '/' + questionArray[randomArray[i]] + '/l_0' + random3 +'.png',
				//borderColor:'#000',
				//borderWidth:2*zoomByOsname,
				opacity:0,
			});
			animalBase.add(animalImage);
			pipeBase = Ti.UI.createLabel({
				backgroundColor:'transparent',
				height:120*zoomByOsname,
				width:width/3,
				bottom:0,
				left:width*i/3,
				val:i+1,
			});
			gView.add(pipeBase);
			pipeImage = Ti.UI.createLabel({
				backgroundColor:'green',
				color:'#000',
				text: i+1,
				font:{fontSize:25*zoomByOsname,fontFamily:'Helvetica Neue',fontWeight:'bold'},
				textAlign : 'center',
				height:80*zoomByOsname,
				width:80*zoomByOsname,
				bottom:0,
				backgroundImage:'/assets/images/pipe_shadow_green.png',
				borderColor:'#000',
				borderWidth:2*zoomByOsname,
			});
			pipeBase.add(pipeImage);
			
			pipeImage2 = Ti.UI.createLabel({
				backgroundColor:'green',
				color:'#000',
				//text: 2,
				font:{fontSize:25*zoomByOsname,fontFamily:'Helvetica Neue',fontWeight:'bold'},
				textAlign : 'center',
				height:40*zoomByOsname,
				width:100*zoomByOsname,
				bottom:80*zoomByOsname,
				backgroundImage:'/assets/images/pipe_shadow_green.png',
				borderColor:'#000',
				borderWidth:2*zoomByOsname,
			});
			pipeBase.add(pipeImage2);
			
			pipeCover = Ti.UI.createView({
				backgroundColor:'transparent',
				height:120*zoomByOsname,
				width:width,
				bottom:0
			});
			
			pipeBase.addEventListener('click', function(e){
				Ti.API.info(JSON.stringify(e));
				coins = coins-10;
				Ti.App.Properties.setInt('coins', coins);
				label02.text = coins;
				label2.text = coins;
				val = e.source.val;
				val1 = val-1;
				idNum = randomArray[val1] + 1;
				
				db2 = Titanium.Database.open('user');
			    select = 'SELECT level FROM USER1 WHERE _id = '  + idNum;
			    //alert(select);
			    rows = db2.execute(select);
			    nowLevel = rows.field(0);
			    if(nowLevel==''){
			    		nowLevel = 1;
			    }else{
			    		nowLevel++;
			    }
			    
		    		update = 'UPDATE USER1 SET level = ' + nowLevel + ' WHERE _id = ' + idNum;
		        //Ti.API.info(update);
		    		db2.execute(update);
		    		
		    		rows.close();
		    		db2.close();
		    		
				children = gView.getChildren();
				children2 = children[val].getChildren();
				children2[0].backgroundImage = '/assets/images/pipe_shadow_red.png';
				children2[1].backgroundImage = '/assets/images/pipe_shadow_red.png';
				
				gView.add(pipeCover);
				
				jump.play();
				
				children3 = animalBase.getChildren();
				setTimeout(function(){
					children3[0].opacity = 1;
					children3[1].opacity = 1;
					children3[2].opacity = 1;
				}, 900);
				
				animalBase.animate({center:{x:width/2,y:0},curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,duration:2000}, function(){
					controlView();
					self.remove(gView);
				});
			});
		}
		self.add(gView);
	}
	
	function controlView(){
		ctrlView = Titanium.UI.createView({
			backgroundColor:'transparent',
			backgroundImage:'/assets/images/transparent.png',
		});
		
		cardImage = Ti.UI.createImageView({
		    // http://ja.wikipedia.org/wiki/ %E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB:Tokyo_metro_map.png
		    //image: 'Tokyo_metro_map.png',
		    backgroundColor:'white',
		    width:height/1.414,
		    height:height,
		    borderColor:'#000',
			borderRadius	:10*zoomByOsname,
			borderWidth:1*zoomByOsname,
		});
		
		cardImage2 = Ti.UI.createImageView({
		    // http://ja.wikipedia.org/wiki/ %E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB:Tokyo_metro_map.png
		    //image: '/assets/images/flowers-leaves001.jpg',
		    top:height*0.05,
		    left:height/1.414*0.05,
		    width:height/1.414*0.9,
		    height:height*0.9,
		    borderColor:'#000',
			borderRadius	:10*zoomByOsname,
			borderWidth:1*zoomByOsname,
		});
		cardImage.add(cardImage2);
		
		if(val==-1){
			cardImage2.image = '/assets/images/flowers-leaves001.jpg';
			cardImage3 = Ti.UI.createImageView({
			    // http://ja.wikipedia.org/wiki/ %E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB:Tokyo_metro_map.png
			    image: '/assets/images/Shopping_Cart.png',
			    top:height*0.1,
			    width:height/3,
			    height:height/3,
			});
			cardImage.add(cardImage3);
			cardLabel2 = Titanium.UI.createLabel({
				color:'#000',
				text:10 + L('Coins'),
				font:{fontSize:fontsize*1.1,fontFamily:'Helvetica Neue',fontWeight:'bold'},
				textAlign:'center',
				width:Ti.UI.FILL,
			    height:'auto',
			    bottom:height*0.1,
			});
			cardImage.add(cardLabel2);
			if(Ti.Platform.osname!='android'){
				speech.startSpeaking({
				    text:String.format(L('Welcome_to_cardshop'), Ti.App.Properties.getString('userName')),
				    voice:speechLang,
				    rate:0.2
				});
			}else{
				speech.startSpeaking({
				    text:String.format(L('Welcome_to_cardshop'), Ti.App.Properties.getString('userName')),
				    rate:1
				});
			}
		}else{
			cardImage2.backgroundColor = arrayColor[randomArray[val1]%12];
			cardImage3  = Ti.UI.createImageView({
			    image:'/assets/images/' + Titanium.App.Properties.getString('folder') + '/' + questionArray[randomArray[val1]] + '/l_0' + random3 +'.png',
			    width:height/1.414,
			    height:height/1.414*2/3,
			    top:height*0.2,
			    left:0,
			});
			cardImage.add(cardImage3);
			
			cardLabel  = Ti.UI.createLabel({
				color:'#fff',
				backgroundColor:'red',
				text:'NEW',
				font:{fontSize:14*zoomByOsname,fontFamily:'Helvetica Neue',fontWeight:'bold'},
			    width:height/6,
			    height:height/9,
			    top:0,
			    right:0,
				textAlign:'center',
			    borderColor:'#000',
				borderRadius	:height/18,
				borderWidth:1*zoomByOsname,
			});
			cardImage.add(cardLabel);
			
			if(nowLevel!=1){
				cardLabel.color = 'red';
				cardLabel.backgroundColor = 'transparent';
				cardLabel.borderColor = 'transparent';
				chime.play();
				cardLabel.text = nowLevel;
				if(Ti.Platform.osname!='android'){
					speech2.startSpeaking({
					    text:String.format(L('Get'), answerArray[randomArray[val1]]),
					    voice:speechLang,
					    rate:0.3
					});
				}else{
					speech2.startSpeaking({
					    text:String.format(L('Get'), answerArray[randomArray[val1]]),
					    rate:1
					});
				}
			}else{
				count = 0;
				burstImage = setInterval(function(){
					count++;
					if(count<10){
						ctrlView.backgroundImage = '/assets/images/burst.png';
						setTimeout(function(){
							ctrlView.backgroundImage = '/assets/images/burst2.png';
						}, 500);
					}else{
						clearInterval(burstImage);
						ctrlView.backgroundImage = '/assets/images/transparent.png';
					}
				}, 1000);
				chime_x3.play();
				if(Ti.Platform.osname!='android'){
					speech2.startSpeaking({
					    text:String.format(L('New_get'), answerArray[randomArray[val1]]),
					    voice:speechLang,
					    rate:0.3
					});
				}else{
					speech2.startSpeaking({
					    text:String.format(L('New_get'), answerArray[randomArray[val1]]),
					    rate:1
					});
				}
			}
			
			cardLabel2 = Titanium.UI.createLabel({
				color:'#000',
				text:answerArray[randomArray[val1]],
				font:{fontSize:fontsize*1.1,fontFamily:'Helvetica Neue',fontWeight:'bold'},
				textAlign:'center',
				width:Ti.UI.FILL,
			    height:'auto',
			    bottom:height*0.1,
			});
			cardImage.add(cardLabel2);
		}
		ctrlView.add(cardImage);
		
		play = Titanium.UI.createView({
			height:100*zoomByOsname,
			width:100*zoomByOsname,
			top:height/2-100*zoomByOsname/2,
			right:50*zoomByOsname,
		});
		playLabel = Titanium.UI.createLabel({
			color:'#000',
			font : {fontSize : 30*zoomByOsname, fontFamily : 'Helvetica Neue', fontWeight :'bold'},
			text:L('Buy_Now'),
			textAlign:'center',
			height:100*zoomByOsname,
			width:100*zoomByOsname,
			backgroundImage:'/assets/images/Play.png'
		});
		play.add(playLabel);
		play.addEventListener('click', function(e){
			if(!speech.isSpeaking){
				speech.stopSpeaking();
			}
			if(!speech2.isSpeaking){
				speech2.stopSpeaking();
			}
			gameView();
			ctrlView.backgroundImage = '/assets/images/transparent.png';
			self.remove(ctrlView);
		});
		
		stop = Titanium.UI.createView({
			height:100*zoomByOsname,
			width:100*zoomByOsname,
			top:height/2-100*zoomByOsname/2,
			left:50*zoomByOsname,
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
			if(Ti.Platform.osname!='android'){
				speech5.startSpeaking({
				    text:L('Thank_you'),
				    voice:speechLang,
				    rate:0.2
				});
			}else{
				speech5.startSpeaking({
				    text:L('Thank_you'),
				    rate:1
				});
			}
			gameBGM.stop();
			var Cards = require('ui/common/Cards');
				
			//construct UI
			var cards = new Cards(win, questionArray, label02, opening);
			win.add(cards);
			setTimeout(function(){
				opening.play();
				win.remove(self);
			}, 500);
		});
		ctrlView.add(stop);
		if(coins>=10){
			ctrlView.add(play);
		}else{
			stop.left = width/2-100*zoomByOsname/2;
			setTimeout(function(){
				if(Ti.Platform.osname!='android'){
					speech1.startSpeaking({
					    text:L('No_money'),
					    voice:speechLang,
					    rate:0.2
					});
				}else{
					speech1.startSpeaking({
					    text:L('No_money'),
					    rate:1
					});
				}
			}, 3000);
		}
		self.add(ctrlView);
	}
}

module.exports = CardShop;
