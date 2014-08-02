exports.createWin31 = function(){
	bgm.play();
	
	var win3 = require('/ui/ui').createWindow('Tab 3', 'black');
	Titanium.UI.iPhone.hideStatusBar();
	
	var b1 = Titanium.UI.createButton({title:'Stop', top:10, left:10, });
	var b2 = Titanium.UI.createButton({title:'Close', top:10, right:10, });
	
	var arrayPhoto = [];
	var arrayWord = [];
	var count = 0;
		
	b1.addEventListener('click', function(){
		bgm.stop();
		clearInterval(s);
		var count = 0;
	});
	
	b2.addEventListener('click', function() {
		bgm.stop();
		clearInterval(s);
		var count = 0;
		win3.close();
	});	
	
	var db2 = Titanium.Database.open('photo');
	
	var select = 'SELECT * FROM PROJECT_1';
	var rows = db2.execute(select);
	
	var count1 = 0;
	while(rows.isValidRow()){
		arrayPhoto[count1] = [rows.fieldByName('NAME'), rows.fieldByName('RATIO'), rows.fieldByName('POINT'), rows.fieldByName('ZOOM'), rows.fieldByName('ANGLE'), rows.fieldByName('MESSAGE'),];
		count1++;
		rows.next();
	}
	var photo_limit = count1;
	rows.close();
	db2.close();
	
	var db2 = Titanium.Database.open('db1');
	
	var select = 'SELECT * FROM WORDS';
	var rows = db2.execute(select);
	
	var count1 = 0;
	while(rows.isValidRow()){
		arrayWord[count1] = [rows.fieldByName('FATHER'), rows.fieldByName('MATHER'), rows.fieldByName('STUDENT'), rows.fieldByName('BUSINESSMAN'),];
		count1++;
		rows.next();
	}
	var word_limit = count1;
	rows.close();
	db2.close();
	/*
	var random = Math.floor(Math.random()*1000);
	var randomWord = random%word_limit;
	var randomPhoto = random%photo_limit;
	var randomPoint = random%13;
	var randomZoom = random%19;
	var randomAngle = random%37;
	
	Ti.API.info('Name:' + arrayPhoto[randomPhoto][0] + '/Ratio:' + arrayPhoto[randomPhoto][1] + '/Point:' + arrayPhoto[randomPhoto][2] + '/Zoom:' + arrayPhoto[randomPhoto][3] + '/Angel:' +arrayPhoto[randomPhoto][4]);
	
	//var matrix0 = Titanium.UI.create2DMatrix().scale(1);
 
	// 0倍の大きさで初期化したWindowを生成します。
	switch(randomPoint){
		case 0:
		var top = -160*arrayPhoto[randomPhoto][1];
		var left = -160;
		break;
		
		case 1:
		var top = -160*arrayPhoto[randomPhoto][1];
		var left = -80;
		break;
		
		case 2:
		var top = -160*arrayPhoto[randomPhoto][1];
		var left = 0;
		break;
		
		case 3:
		var top = -80*arrayPhoto[randomPhoto][1];
		var left = -160;
		break;
		
		case 4:
		var top = -80*arrayPhoto[randomPhoto][1];
		var left = -80;
		break;
		
		case 5:
		var top = -80*arrayPhoto[randomPhoto][1];
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
		var top = -80*arrayPhoto[randomPhoto][1];
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
	*/
	var view = Titanium.UI.createImageView({
	    width: 480,
	    height: 852,
	    top:-80,
	    left:-142,
	   // bottom: 0,
	    //right: 0
	});
	
	var imageView = Titanium.UI.createImageView({
	    image: '/assets/images/splash.jpg',
	    width: 320,
	    height :568,
	    //top:17,
	    //left:0,
	    top:80,
	    left:142,
	});
	view.add(imageView);
	
	var label = Ti.UI.createLabel({
		backgroundColor: '#fff',
		text: '',
		font:{fontSize:20,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		bottom:20,
		textAlign:'center',
		opacity:0.5
	});
	/*
	//view.transform = matrix0;
	// 通常のサイズ(1×1)にへの変形指定をします。
	var a =Titanium.UI.createAnimation();
	var matrix1 = Ti.UI.create2DMatrix();
	setTimeout(function(){
		matrix1 = matrix1.rotate(angle);
		matrix1 = matrix1.scale(zoom, zoom);
		a.transform = matrix1;
		a.duration = 3000;
		a.repeat = 1;
		view.animate(a);
		// 通常サイズへのアニメーションします。
		a.addEventListener('complete', function(){
		    // 実際のサイズに戻すためには次のような手順もあります。
		    //var matrix2 = Titanium.UI.create2DMatrix();
		    //view.animate({transform:matrix2, duration:1000});
		});
	}, 1000);
	*/
	var s = setInterval(function(){
		var random = Math.floor(Math.random()*1000);
		var randomWord = random%word_limit;
		var randomPhoto = random%photo_limit;
		var randomPoint = random%13;
		var randomZoom = random%19;
		var randomAngle = random%37;
		count++;
		if(count<20){
			Ti.API.info('Name:' + arrayPhoto[randomPhoto][0] + '/Ratio:' + arrayPhoto[randomPhoto][1] + '/Point:' + arrayPhoto[randomPhoto][2] + '/Zoom:' + arrayPhoto[randomPhoto][3] + '/Angel:' +arrayPhoto[randomPhoto][4]);
			switch(randomPoint){
				case 0:
				var top = -160*arrayPhoto[randomPhoto][1];
				var left = -160;
				break;
				
				case 1:
				var top = -160*arrayPhoto[randomPhoto][1];
				var left = -80;
				break;
				
				case 2:
				var top = -160*arrayPhoto[randomPhoto][1];
				var left = 0;
				break;
				
				case 3:
				var top = -80*arrayPhoto[randomPhoto][1];
				var left = -160;
				break;
				
				case 4:
				var top = -80*arrayPhoto[randomPhoto][1];
				var left = -80;
				break;
				
				case 5:
				var top = -80*arrayPhoto[randomPhoto][1];
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
				var top = -80*arrayPhoto[randomPhoto][1];
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
			
			var matrix2 = Titanium.UI.create2DMatrix();
		    view.animate({transform:matrix2, duration:10});
		    
		    label.text = arrayWord[randomWord][0];
		    
		    	view.height = 480*arrayPhoto[randomPhoto][1];
		    	view.top = top;
		    	view.left = left;
		    	
			imageView.height = 320*arrayPhoto[randomPhoto][1];
			imageView.top = -top;
			imageView.left = -left;
	        imageView.image = Titanium.Filesystem.applicationDataDirectory + arrayPhoto[randomPhoto][0];
	        
			setTimeout(function(){
				Ti.API.info('Point:' + arrayPhoto[randomPhoto][2] + '/Zoom:' + arrayPhoto[randomPhoto][3] + '/Angel:' +arrayPhoto[randomPhoto][4]);
				var a =Titanium.UI.createAnimation();
				var matrix1 = Ti.UI.create2DMatrix();
				matrix1 = matrix1.rotate(angle);
				matrix1 = matrix1.scale(zoom, zoom);
				a.transform = matrix1;
				a.duration = 3000;
				a.repeat = 1;
		        view.animate(a);
			}, 1000);
	   }else{
		    var matrix2 = Titanium.UI.create2DMatrix();
		    view.animate({transform:matrix2, duration:10});
		    clearInterval(s);
		    bgm.stop();
		    alert('end');
	   }
	}, 5000);
	
	win3.add(view);
	win3.add(label);
	win3.add(b1);
	win3.add(b2);

	return win3;
};