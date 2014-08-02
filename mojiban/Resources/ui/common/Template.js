//FirstView Component Constructor
function Template(win, title, bgColor, speech0, arrayPurchase, arrayCorrect, arrayCorrect2, arrayNewWord, arrayNewWord2, arrayImages2, arrayImages3, changeHiragana, textField, cursorImage, questionImage, adView) {
	var speechlang, height, width, osname, arrayTemplate, numArray, self, scrollView, 
	templateImage, templateLabel, label, back;
	if(Ti.Platform.locale=='ja'){
		speechLang = 'ja-JP';
	}else{
		speechLang = 'en-US';
	}
	height = Ti.Platform.displayCaps.platformHeight;
	width = Ti.Platform.displayCaps.platformWidth;
	osname = Ti.Platform.osname;
	arrayTemplate = ['mojiban', 'mojiban1'];
	numArray = arrayTemplate.length;
	
	//create object instance, a parasitic subclass of Observable
	self = Ti.UI.createView({
		backgroundColor:bgColor,
	});
	
	scrollView = Titanium.UI.createScrollView({
		top:0,
		showVerticalScrollIndicator:true,
		showHorizontalScrollIndicator:true
	});
	/*
	imageView = Ti.UI.createImageView({
		// http://ja.wikipedia.org/wiki/ %E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB:Tokyo_metro_map.png
		//image: 'Tokyo_metro_map.png',
		backgroundColor:'#000',
		width:767*numArray+100,
		height:768,
	});
	*/
	//test
	//Titanium.App.Properties.setBool('Purchased-mojiban1', true);
	
	scrollView.addEventListener('click', function(e){
		if(arrayPurchase.indexOf(e.source.template)==-1 && e.source.template!='mojiban'){
			alert(L('now_preparing'));
			speech0.startSpeaking({
				text:L('now_preparing'),
				voice:speechLang,
				rate:0.1,
			});
		}else if(Titanium.App.Properties.getBool(e.source.val)){
			if(e.source.template!=Titanium.App.Properties.getString('template')){
				alert(L('template_change'));
				speech0.startSpeaking({
					text:L('template_change3'),
					voice:speechLang,
					rate:0.1,
				});
				Titanium.App.Properties.setString('template', e.source.template);
				db = Ti.Database.open(Titanium.App.Properties.getString('template'));
				select = 'SELECT word, newword, hiragana FROM ' + e.source.template;
				//Ti.API.info(select);
				data = db.execute(select);
				k = 0;
				i = 0;
				while(data.isValidRow()){
					//Ti.API.info(k + '/' + data.field(0) + '/' + data.field(1) + '/' + data.field(2));
					j = k%5;
					arrayImages3[j] = data.field(0);
					arrayCorrect2[j] = data.field(2);
					arrayNewWord2[j] = data.field(1);
					if(j%5==4){
						//Ti.API.info(arrayImages3);
						Ti.API.info(arrayNewWord2);
						arrayImages2[i] = arrayImages3;
						arrayCorrect[i] = arrayCorrect2;
						arrayNewWord[i] = arrayNewWord2;
						arrayImages3 = [];
						arrayCorrect2 = [];
						arrayNewWord2 = [];
						i++;
						Ti.API.info(arrayNewWord);
					}
					//setTimeout(function(){
						data.next();
					//}, 100);
					k++;
				}
				data.close();
				db.close();
				arrayImages3 = [];
				arrayCorrect2 = [];
				arrayNewWord2 = [];
				changeHiragana('settings');
				setTimeout(function(){
					win.remove(self);
				}, 3000);
			}
		}else{
			//alert(L('buy_now'));
			speech0.startSpeaking({
				text:L('buy_now2'),
				voice:speechLang,
				rate:0.1,
			});
		alertDialog = Titanium.UI.createAlertDialog({
			title: L('buy_now'),
			message: L('buy_now2'),
			buttonNames: [L('OK'),L('Cancel')],
				// キャンセルボタンがある場合、何番目(0オリジン)のボタンなのかを指定できます。
				cancel: 1
			});
		alertDialog.addEventListener('click',function(event){
			// Cancelボタンが押されたかどうか
			if(event.index == 1){
				// cancel時の処理
				win.remove(self);
			}
			// 選択されたボタンのindexも返る
			if(event.index == 0){
				// "OK"時の処理
				win.remove(self);
				Store = require('ui/common/Store');
				//construct UI
				store = new Store(win, 'Store', 'blue', arrayPurchase, textField, cursorImage, questionImage, adView);
				win.add(store);
			}
		});
		alertDialog.show();
		}
		setTimeout(function(){
			//win.remove(self);
		}, 2000);
	});
	
	
	for(i=0; i<numArray; i++){
		templateImage = Ti.UI.createLabel({
			// http://ja.wikipedia.org/wiki/ %E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB:Tokyo_metro_map.png
			//image: 'Tokyo_metro_map.png',
			backgroundImage:'/assets/images/' + osname + '/' + arrayTemplate[i] + '.png',
			borderColor:'#000',
			borderWidth:2,
			val:'Purchased-'+ arrayTemplate[i],
			template:arrayTemplate[i],
		});
		/*
		if(!Titanium.App.Properties.getBool(arrayTemplate[i])){
			templateImage.opacity = 0.2;
		}
		*/
		
		if(Titanium.App.Properties.getString('template')==arrayTemplate[i]){
			templateImage.borderColor = 'red';
			templateImage.borderWidth = 15;
		}
		
		templateLabel  = Ti.UI.createLabel({
			color:'#fff',
			backgroundColor:'transparent',
			text:L(arrayTemplate[i]),
			textAlign:'center',
		});
		
		if(osname=='ipad'){
			templateImage.top = 134,
			templateImage.left = 100 + 767*i,
			templateImage.width = 667,
			templateImage.height = 500,
			templateLabel.font = {fontSize:30,fontFamily:'Helvetica Neue',fontWeight:'bold'},
			templateLabel.width = 667,
			templateLabel.height = 50,
			templateLabel.bottom = 50,
			templateLabel.left = 100 + 767*i;
		}else{
			templateImage.top = 60,
			templateImage.left = 42 + 397*i,
			templateImage.width = 355,
			templateImage.height = 200,
			templateLabel.font = {fontSize:20,fontFamily:'Helvetica Neue',fontWeight:'bold'},
			templateLabel.width = 355,
			templateLabel.height = 20,
			templateLabel.bottom = 20,
			templateLabel.left = 42 + 397*i;
		}
		
		scrollView.add(templateImage);
		scrollView.add(templateLabel);
	}
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	label = Ti.UI.createLabel({
		color:'#fff',
		backgroundColor:'transparent',
		text:L(title),
		textAlign:'center',
	});
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	back = Ti.UI.createButton({
		backgroundImage:'/assets/images/Undo.png',
		opacity:0.5,
	});
	//Add behavior for UI
	back.addEventListener('click', function(e) {
		win.remove(self);
	});
		
	if(osname=='ipad'){
		scrollView.contentWidth = 767*numArray+100,
		scrollView.contentHeight = 768,
		label.font = {fontSize:40,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		label.width = 524,
		label.height = 50,
		label.top = 50,
		label.left = 250,
		back.height = 50,
		back.width = 50,
		back.top = 5,
		back.left = 10;
	}else{
		scrollView.contentWidth = 355*numArray+100,
		scrollView.contentHeight = 320,
		label.font = {fontSize:24,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		label.width = 218,
		label.height = 35,
		label.top = 20,
		label.left = (width-218)/2,
		back.height = 40,
		back.width = 40,
		back.top = 5,
		back.left = 10;
	}
	//scrollView.add(imageView);
	scrollView.scrollTo(0, 0);
	self.add(scrollView);
	self.add(label);
	self.add(back);
	
	setTimeout(function(){
		speech0.startSpeaking({
			text:L('template_change2'),
			voice:speechLang,
			rate:0.1,
		});
	}, 1000);
	
	return self;
}

module.exports = Template;
