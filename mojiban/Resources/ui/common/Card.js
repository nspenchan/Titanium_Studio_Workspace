//FirstView Component Constructor
function Card(win, title, bgColor, cardView, speech, speech0, arrayImages2, arrayCorrect, arrayNewWord, arrayKeyColor, arrayImages, arrayWords, makeCard) {
	var speechLang, height, width, self, scrollView, scrollView1, scrollView2, back, wordImage, 
	cardImage, cardImage1, cardImage2, cardLabe, cardLabel2, cardLabel3, imageName, osname;
	
	if(Ti.Platform.locale=='ja'){
		speechLang = 'ja-JP';
	}else{
		speechLang = 'en-US';
	}
	height = Ti.Platform.displayCaps.platformHeight;
	width = Ti.Platform.displayCaps.platformWidth;
	osname = Ti.Platform.osname;
	cardView.val = 'card';
	
	//create object instance, a parasitic subclass of Observable
	self = Ti.UI.createView({
		backgroundColor:bgColor,
	});
	
	
	function scale1(dimension) {
		return Math.round(dimension *  height / 768);
	}
	
	self.addEventListener('click', function(e){
		Ti.API.info(JSON.stringify(e));
		if(e.source.val=='back'){
			cardView.val = '';
			win.remove(self);
		}else{
			if(arrayNewWord[e.source.num1][e.source.num2]){
				imageName = arrayNewWord[e.source.num1][e.source.num2];
			}else{
				imageName = arrayImages2[e.source.num1][e.source.num2];
			}
			makeCard(e.source.num1, e.source.num2, imageName, 'card');
			
			if(e.source.num0==0){
				//makeCard(e.source.num1, e.source.num2, imageName, 'card');
				speech0.startSpeaking({
					text:L('by_solving_problem'),
					voice:speechLang,
					rate:0.1,
				});
			}else if(e.source.num0==1){
				//makeCard(e.source.num3, e.source.num4, arrayImages2[e.source.num3][e.source.num4], 'card');
				speech.startSpeaking({
					text:imageName,
					voice:'ja-JP',
					rate:0.1,
				});
				speech0.startSpeaking({
					text:L('it_is_new_card'),
					voice:speechLang,
					rate:0.1,
				});
				setTimeout(function(){fanfareSound.play();}, 3000);
			}else{
				//makeCard(e.source.num5, e.source.num6, arrayImages2[e.source.num5][e.source.num6], 'card');
				speech.startSpeaking({
					text:imageName,
					voice:'ja-JP',
					rate:0.1,
				});
				speech0.startSpeaking({
					text:L('there_are') + ' ' + arrayCorrect[e.source.num1][e.source.num2] + ' ' + L('there_are2'),
					voice:speechLang,
					rate:0.1,
				});
			}
		}
	});
	
	scrollView = Titanium.UI.createScrollView({
		backgroundColor:arrayKeyColor[0][0],
		contentWidth:scale1(3050),
		contentHeight:scale1(256),
		top:0,
		//bottom: 0,
		showVerticalScrollIndicator:true,
		showHorizontalScrollIndicator:true
	});
	
	//scrollView.add(imageView);
	scrollView.scrollTo(0, 0);
	/*
	scrollView = Titanium.UI.createView({
		backgroundColor:arrayKeyColor[0][0],
		width:3250,
		height:768,
		top:0,
		left:0,
	});
	*/
	//setTimeout(function(){
		self.add(scrollView);
	//}, 1000);
	
	scrollView1 = Titanium.UI.createScrollView({
		backgroundColor:arrayKeyColor[0][3],
		contentWidth:scale1(3050),
		contentHeight:scale1(256),
		top:scale1(256),
		//bottom: 0,
		showVerticalScrollIndicator:true,
		showHorizontalScrollIndicator:true
	});
	
	//scrollView1.add(imageView1);
	scrollView1.scrollTo(0, 0);
	
	//setTimeout(function(){
		self.add(scrollView1);
	//}, 2000);
	
	scrollView2 = Titanium.UI.createScrollView({
		backgroundColor:arrayKeyColor[0][6],
		contentWidth:scale1(3250),
		contentHeight:scale1(256),
		top:scale1(512),
		//bottom: 0,
		showVerticalScrollIndicator:true,
		showHorizontalScrollIndicator:true
	});
	
	//scrollView2.add(imageView2);
	scrollView2.scrollTo(0, 0);
	
	//setTimeout(function(){
		self.add(scrollView2);
	//}, 3000);
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	back = Ti.UI.createButton({
		backgroundImage:'/assets/images/Undo.png',
		top:5,
		left:10,
		opacity:0.5,
		val:'back',
	});
	self.add(back);
	
	if(osname=='ipad'){
		back.height = 50,
		back.width = 50;
	}else{
		back.height = 40,
		back.width = 40;
	}
	//Add behavior for UI
	/*
	back.addEventListener('click', function(e) {
		cardView.val = '';
		win.remove(self);
	});
	*/
	
	
	
	
	
	
	
	
	
	//１段目
	//setTimeout(function(){
	k = 0;
	//l = 0;
	for(i=0; i<10; i++){
		for(j=0; j<5; j++){
			
			if((i==3 && j==0) || (i==6 && j==0)){
				k = 0;
				//l++;
			}
			Ti.API.info(i + '/' +j);
			wordImage = Ti.UI.createLabel({
				backgroundColor:'transparent',
				text:arrayWords[i][j],
				font:{fontSize:scale1(30),fontFamily:'Helvetica Neue',fontWeight:'bold'},
				top:scale1(210),//+256*l,
				left:scale1(50+200*k),
				width:scale1(200/1.414),
				height:scale1(40),
				textAlign:'center',
			});
			
			cardImage = Ti.UI.createImageView({
				backgroundColor:'white',
				top:scale1(10),//+256*l,
				left:scale1(50+200*k),
				width:scale1(200/1.414),
				height:scale1(200),
				borderColor:'#000',
				borderRadius	:scale1(16),
				borderWidth:2,
			});
			if(i<3){
				if(arrayImages[i][j]){
					scrollView.add(cardImage);
					scrollView.add(wordImage);
					k++;
				}
			}else if(i>=3 && i<6){
				if(arrayImages[i][j]){
					scrollView1.add(cardImage);
					scrollView1.add(wordImage);
					k++;
				}
			}else{
				if(arrayImages[i][j]){
					scrollView2.add(cardImage);
					scrollView2.add(wordImage);
					k++;
				}
			}
			
			cardImage2 = Ti.UI.createImageView({
				//image: '/assets/images/flowers-leaves001_2.jpg',
				//backgroundColor:arrayKeyColor[j*5][i],
				top:scale1(10),
				//left:height/1.414*0.05,
				width:scale1(200/1.414-20),
				height:scale1(180),
				borderColor:'#000',
				borderRadius	:scale1(14),
				borderWidth:2,
				num0:arrayCorrect[i][j],
				num1:i,
				num2:j,
			});
			cardImage.add(cardImage2);
			
			cardImage3  = Ti.UI.createImageView({
				image:'/assets/images/' + Titanium.App.Properties.getString('template') + '/' + arrayImages[i][j] + '.png',
				width:scale1(160/1.414),
				height:scale1(160/1.414),
				top:scale1(20),
				left:scale1(20/1.414),
				num0:arrayCorrect[i][j],
				num1:i,
				num2:j,
			});
			//cardImage.add(cardImage3);
			
			cardLabel = Ti.UI.createLabel({
				color:'#fff',
				backgroundColor:'red',
				text:'NEW',
				font:{fontSize:scale1(12),fontFamily:'Helvetica Neue',fontWeight:'bold'},
				width:scale1(36),
				height:scale1(24),
				top:0,
				right:0,
				textAlign:'center',
				borderColor:'#000',
				borderRadius	:scale1(12),
				borderWidth:2,
			});
			//cardImage.add(cardLabel);
			
			cardLabel2 = Titanium.UI.createLabel({
				color:'#000',
				text:arrayImages2[i][j],
				font:{fontSize:scale1(16),fontFamily:'Helvetica Neue',fontWeight:'bold'},
				textAlign:'center',
				width:Ti.UI.FILL,
				height:'auto',
				bottom:scale1(24),
				num0:arrayCorrect[i][j],
				num1:i,
				num2:j,
			});
			//cardImage.add(cardLabel2);
			if(arrayNewWord[i][j]){
				cardImage3.image = Titanium.Filesystem.applicationDataDirectory + Titanium.App.Properties.getString('template') + '/' + arrayImages[i][j] + '.png';
				cardLabel2.text = arrayNewWord[i][j];
			}
			
			if(arrayCorrect[i][j]==0){
				cardImage2.image = '/assets/images/flowers-leaves001_2.jpg';
			}else if(arrayCorrect[i][j]==1){
				cardImage2.backgroundColor = arrayKeyColor[j*5][i];
				cardImage.add(cardImage3);
				cardImage.add(cardLabel);
				cardImage.add(cardLabel2);
			}else{
				cardImage2.backgroundColor = arrayKeyColor[j*5][i];
				cardLabel.text = arrayCorrect[i][j];
				cardLabel.color = 'red';
				cardLabel.backgroundColor = 'transparent';
				cardLabel.borderColor = 'transparent';
				cardImage.add(cardImage3);
				cardImage.add(cardLabel);
				cardImage.add(cardLabel2);
			}
		}
	}
	
	return self;
}

module.exports = Card;
