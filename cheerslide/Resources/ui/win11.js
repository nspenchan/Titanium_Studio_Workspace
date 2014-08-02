function ApplicationWindow(title, wRatio, purchase, tabGroup, bgm00, themesong) {
	var ad = require('net.nend');
	var adView;
	if(Ti.Platform.osname === 'android'){
	    adView = ad.createView({
	        spotId: 3174,
	        apiKey: "c5cb8bc474345961c6e7a9778c947957ed8e1e4f",
	        width: 320,
	        height: 50,
	        top: 0
	    });
	}else{
	    adView = ad.createView({
	        spotId: 108438,
	        apiKey: "04d343f70616c1a18c78422c3b6465a67275f8e2",
	        width: 320,
	        height: 50,
	        top: 0
	    });
	}
	
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'black'
	});
	//alert(time + ':' + counter);
	if(wRatio<1.6){
		var top = -30;
	}else{
		var top = 0;
	}
	
	var view = Titanium.UI.createImageView({
	    width: 320,
	    height: 568,
	    top:top,
	});
	
	var imageView = Titanium.UI.createImageView({
	    image: '/assets/images/splash.png',
	    width: 320,
	    height :568,
	});
	view.add(imageView);
	self.add(view);
		
	if(Titanium.App.Properties.getBool('Purchased-'+purchase)==false){
		self.add(adView);
	}
	
	var db2 = Titanium.Database.open('project');
		
	var rows_db = db2.execute('SELECT * FROM DATA WHERE NAME = "' + Ti.App.Properties.getString('project') + '"');
	
	var artist = rows_db.fieldByName('ARTIST');
	var title = rows_db.fieldByName('TITLE');
	var genre = rows_db.fieldByName('GENRE');
	var counter = rows_db.fieldByName('COUNTER');
	var time = rows_db.fieldByName('TIME');
	var display = rows_db.fieldByName('DISPLAY');
	//alert(Ti.App.Properties.getString('project') + '\n' + artist + '\n' + title + '\n' + genre);
	Ti.API.info('title:' + title);
	if(title){
		Ti.API.info(artist + ':' + title + ':' + genre);
		var query = {};
		//ライブラリ内から検索する条件を設定(全ての種類の音楽ファイルに指定)
		query['mediaType'] = Titanium.Media.MUSIC_MEDIA_TYPE_ANY_AUDIO;
		
		//undefined をセットすると、queue でエラーになるため
		if(artist != "undefined"){
			Ti.API.info('artist');
			query['artist'] = artist;
		}
		if(genre != "undefined"){
			Ti.API.info('genre');
			query['genre'] = genre;
		}
		query['title'] = title;
		//query['genre'] = genre;
		var result = Ti.Media.queryMusicLibrary(query);
		Ti.API.info(JSON.stringify(result[0]));
		Ti.API.info(result[0]);
		// "OK"時の処理
		//alert(L('Setted_Music') + ':\n' + artist + '\n' + title);
		if(result[0]){
			var bgm = Titanium.Media.systemMusicPlayer;
			//no repeat on home button
			bgm.repeatMode = 1;
			//alert('repeatMode:' + bgm.repeatMode);
			bgm.setQueue(result[0]);
		}else{
			//artist==undefined
			alert(L('No_music'));
			var bgm ='';
		}
	}else{
		var bgm = Titanium.Media.createSound({
		    // リモートURLも指定できます
		    // url : "http://www.nch.com.au/acm/8kmp38.wav"
		    url: 'assets/sound/Believe_In_My_Heart.mp3',
		    looping : true,
		    val:'simulator'
		});
		Ti.API.info(bgm.duration);
	}
	
	var arrayPhoto = [];
	var arrayRatio = [];
	var arrayWord = [];
	var count = 0;
	
	//var b1 = Titanium.UI.createButton({title:'Stop', top:10, left:10, });
	var b2 = Titanium.UI.createLabel({
		backgroundColor:'white',
		text:'Close',
		top:10,
		right:10,
		opacity:0.5,
	});
	if(Titanium.App.Properties.getBool('Purchased-'+purchase)==false || wRatio>1.6){
		b2.top = 60;
	}
	/*	
	b1.addEventListener('click', function(){
		bgm.stop();
		clearInterval(s);
		var count = 0;
	});
	*/
	b2.addEventListener('click', function() {
		bgm.stop();
		clearInterval(s);
		//Thema Song
		Ti.API.info(bgm00.playing);
		if(bgm00.playing==false && Ti.App.Properties.getBool('bgm')==true){
			themesong.backgroundImage = 'assets/images/no_sound_x.png';
			bgm00.play();
		}
		self.close();
	});	
	
	var db2 = Titanium.Database.open(Ti.App.Properties.getString('project'));
	
	var select = 'SELECT * FROM PHOTO';
	var rows = db2.execute(select);
	/*
	var count1 = 0;
	while(rows.isValidRow()){
		arrayPhoto[count1] = [rows.fieldByName('NAME'), rows.fieldByName('RATIO'), rows.fieldByName('POINT'), rows.fieldByName('ZOOM'), rows.fieldByName('ANGLE'), rows.fieldByName('MESSAGE'),];
		count1++;
		rows.next();
	}
	var photo_limit = count1;
	rows.close();
	db2.close();
	*/
	//ディレクトリ情報取得
	var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory);
	//Ti.API.info(dir.getDirectoryListing());
	
	var photoArray = dir.getDirectoryListing();
	
	var num_limit = photoArray.length; 
	for(i=0; i<num_limit; i++){
		//alert(photoArray[i].substr(-4,4));
		if(photoArray[i].substr(-4,4)=='.png' && photoArray[i].substr(0,4)==Ti.App.Properties.getString('project')){
			Ti.API.info(dir + '/' + photoArray[i]);
			arrayPhoto.push(photoArray[i]);
			//写真の情報取得
			var imageTemp = Ti.UI.createImageView({
				image:Titanium.Filesystem.applicationDataDirectory + '/' + photoArray[i],
			});
			//blob変換
			var blob = imageTemp.toBlob();
			var w = blob.width;
			var h = blob.height;
			arrayRatio.push(h/w);
		}
	}
	
	var db2 = Titanium.Database.open(Ti.App.Properties.getString('project'));
	
	var select = 'SELECT * FROM WORDS';
	var rows = db2.execute(select);
	
	var count1 = 0;
	while(rows.isValidRow()){
		arrayWord[count1] = rows.fieldByName('WORD');
		count1++;
		rows.next();
	}
	var word_limit = count1;
	rows.close();
	db2.close();
	
	if(arrayPhoto.length>=3 && bgm){
		Ti.API.info('JSON:' + JSON.stringify(bgm.nowPlaying));
		bgm.play();
		if(bgm.val == 'simulator'){//for simulator
			if(counter==''){
				var counter = parseInt(bgm.duration/time) + 1;
			}
		}else{
			var musicTime = bgm.nowPlaying.playbackDuration;
			Ti.API.info('1:' + counter + 'x' + time);
			Ti.API.info('2:' + musicTime);
			if(counter==''){
				var counter = parseInt(musicTime/time) + 1; 
			}else if(counter!='' && counter*time>musicTime){
				var musicTime = bgm.nowPlaying.playbackDuration;
				var counter = parseInt(musicTime/time) + 1;
			}
		}
		
		var size = Ti.App.Properties.getInt('fontsize');
		var label = Ti.UI.createLabel({
			backgroundColor: '#fff',
			text: display + '\n' + L('In_preparation'),
			font:{fontSize:size,fontFamily:'Helvetica Neue',fontWeight:'bold'},
			textAlign:'center',
			opacity:0.5
		});
		setTimeout(function(){
			var a =Titanium.UI.createAnimation();
			var matrix1 = Ti.UI.create2DMatrix();
			matrix1 = matrix1.scale(2, 2);
			a.transform = matrix1;
			a.duration = time*1000-2000;
			a.repeat = 1;
	        view.animate(a);
		}, 1500);
		
		var s = setInterval(function(){
			var random = Math.floor(Math.random()*1000);
			var randomWord = random%word_limit;
			var randomPhoto = random%arrayPhoto.length;
			var randomPoint = random%13;
			var randomZoom = random%37;
			var randomAngle = random%107;
			var randomEven = random%2;
			count++;
			if(count<counter){
				Ti.API.info('Name:' + arrayPhoto[randomPhoto]);
				switch(randomPoint){
					case 0:
					var top = -160;
					var left = -160;
					break;
					
					case 1:
					var top = -160;
					var left = -80;
					break;
					
					case 2:
					var top = -160;
					var left = 0;
					break;
					
					case 3:
					var top = -80;
					var left = -160;
					break;
					
					case 4:
					var top = -80;
					var left = -80;
					break;
					
					case 5:
					var top = -80;
					var left = 0;
					break;
					
					case 6:
					var top = 0;
					var left = -160;
					break;
					
					case 7:
					var top = 0;
					var left = -80;
					break;
					
					case 8:
					var top = 0;
					var left = 0;
					break;
					
					default:
					var top = -80;
					var left = -80;
					break;
				}
				
				switch(randomZoom){
					case 0:
					var zoom = 10;
					break;
					
					case 1:
					case 2:
					var zoom = 5;
					break;
					
					case 3:
					case 4:
					case 5:
					var zoom = 2;
					break;
					
					case 6:
					case 7:
					case 8:
					case 9:
					case 10:
					var zoom = 1.5;
					break;
					
					default:
					var zoom = 1;
					break;
				}
				
				switch(randomAngle){
					case 0:
					var angle = 180;
					break;
					
					case 1:
					case 2:
					var angle = 60;
					break;
					
					case 3:
					case 4:
					case 5:
					var angle = 20;
					break;
					
					case 6:
					case 7:
					case 8:
					case 9:
					case 10:
					var angle = 10;
					break;
					
					default:
					var angle = 0;
					break;
				}
				if(randomEven == 0){
					angle = -angle;
				}
				var matrix2 = Titanium.UI.create2DMatrix();
			    view.animate({transform:matrix2, duration:10});
			    
			    label.text = arrayWord[randomWord];
			    label.bottom = 20;
			    
				//Aa space
				if(Titanium.App.Properties.getBool('Purchased-'+purchase)==false || wRatio>1.6){
					view.top = top+50;
				}else{
					view.top = top;
				}
			    	view.left = left;
			    	view.width = 480;
			    	view.height = 480;
			    	
				imageView.top = -top + 160*(1-arrayRatio[randomPhoto]);
				imageView.left = -left;
				imageView.height = 320*arrayRatio[randomPhoto];
		        imageView.image = Titanium.Filesystem.applicationDataDirectory + arrayPhoto[randomPhoto];
		        
				setTimeout(function(){
					var a =Titanium.UI.createAnimation();
					var matrix1 = Ti.UI.create2DMatrix();
					matrix1 = matrix1.rotate(angle);
					matrix1 = matrix1.scale(zoom, zoom);
					a.transform = matrix1;
					a.duration = time*1000-2000;
					a.repeat = 1;
			        view.animate(a);
				}, 1000);
		   }else{
			    var matrix2 = Titanium.UI.create2DMatrix();
			    view.animate({transform:matrix2, duration:10});
			    clearInterval(s);
			    bgm.stop();
			    alert(L('end'));
		   }
		}, time*1000);
		
		self.add(label);
		//self.add(b1);
		self.add(b2);
	}else{
		if(!bgm){
			alert(L('Please_reselect_music'));
		}
		if(arrayPhoto.length<3){
			alert(L('Please_Set_multiple_photos'));
		}
		if(Titanium.App.Properties.getBool('Purchased-'+purchase)==false){
			self.remove(adView);
		}
		
		var b3 = Titanium.UI.createLabel({
			backgroundColor:'white',
			text:L('Setting') + ' >>',
			font:{fontSize:40,fontFamily:'Helvetica Neue',fontWeight:'bold'},
			//top:100,
			right:10,
			opacity:0.5,
		});
		b3.addEventListener('click', function(){
			self.close();
			tabGroup.activeTab = tabGroup.tabs[1];
			if(arrayPhoto.length<3 && bgm){
		    		var count1 = 0;
		    		var turn = '';
		    		var Window20 = require('ui/win20');
				var win20 = new Window20(L('Photo'), count1, turn);
		    		win20.open();
		    }else if(arrayPhoto.length>=3 && !bgm){
		    		var count1 = 0;
		    		var Window24 = require('ui/win24');
				var win24 = new Window24(L('Music'), purchase);
		    		win24.open();
		    }
		});
		self.add(b3);
		//tabGroup.activeTab = tabGroup.tabs[1];
	}
	
	return self;
};

module.exports = ApplicationWindow;