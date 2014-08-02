//FirstView Component Constructor
function FirstView(arrayPurchase, arrayImages, arrayWords, arrayWords2, arrayWords3) {
	var ad, adView, alertDialog, alertDialog2, alertDialog3, arrayCorrect, arrayCorrect2, arrayNewWord, arrayNewWord2, arrayImages2, arrayImages3, arrayKeyColor, 
	arrayLeft, arrayPurchase, arrayTitle, arrayWords, arrayWords4, arrayWords5, attachImage, back, 
	backImage, children, children2, children3, children4, closeImage, closeImage2, closeImage3, 
	closePhotoImage, correctImage, correctLetter, correctSound, coverView, cursorImage, dakutenArray, data,
	date, db, dd, decode, decodeArray, decodeArray2, defaultImage, dockView, emailDialog, eraserImage, 
	eraserSound, f, familyPhoto, filename, firstMailTablefrom, helpImage, hh, hiragana, i, image, 
	imageName, incorrectImage, incorrectSound, infoImage, j, k, katakana, keyBaseView, keyView, keyView2, 
	l, label, label2, label_ad, lastLetter, leftImage, m, mailAddress, mailContent, mailImage, mi, mm, 
	mode, modeLabel, module, num, num1, num2, Photo, photo, practiceStatement, practiceStatement2, questionImage, 
	questionMode, random5, random10, row, rows, select, self, settingsImage, speakerImage, speech, speech0, 
	speechLang, speechText, ss, Store, store, storeImage, Template, template, templateImage, testImage, 
	text, text0, textContent, textContent2, textField, textView, tipImage, titleLabel, toDoubleDigits, 
	Tools, tools, toolsImage, triangleImage, update, userPhoto, utterance, val, val2, val3, val4, val5, val6, val7, 
	WebView, webView, word, yyyy, yyyymmddhhmiss, card, Card, cardButton, 
	cardView, cardImage, cardImage2, cardImage3, cardLabel, cardLabel2, countPurchase, playImage, stopImage, 
	gamePlay, gameStop, gameCount, playTop, stopTop, everyLifeSound, replicaSound, allCorrect, 
	userImage, kingImage, hand1, hand2, paper1, paper2, file, Timer1, Timer2, osname, width, height, 
	adViewColor, adViewBack, adViewContent, textContentOld, adInterval;
	//Ti.API.info('hasProperty/' + Titanium.App.Properties.hasProperty('Purchased-'+ purchase));
	//Ti.API.info('hasProperty3/' + Titanium.App.Properties.hasProperty('osZoom'));
	if(Ti.Platform.locale=='ja'){
		speechLang = 'ja-JP',
		filename = 'index_ja';
	}else{
		speechLang = 'en-US',
		filename = 'index_en';
	}
	height = Ti.Platform.displayCaps.platformHeight;
	width = Ti.Platform.displayCaps.platformWidth;
	osname = Ti.Platform.osname;
	utterance = require('bencoding.utterance'),
	speech = utterance.createSpeech(),
	speech0 = utterance.createSpeech(),
	eraserSound = Ti.Media.createSound({url:'/assets/sound/press.mp3'}),
	correctSound = Ti.Media.createSound({url:'/assets/sound/seikai.mp3'}),
	incorrectSound = Ti.Media.createSound({url:'/assets/sound/huseikai.mp3'}),
	fanfareSound = Ti.Media.createSound({url:'/assets/sound/fanfare2.mp3'}),
	completeSound = Ti.Media.createSound({url: '/assets/sound/fanfare.mp3'});
	tsudoiSound = Ti.Media.createSound({
		url:'/assets/sound/tsudoi.mp3',
		looping:true,
		volume:0.2,
	}),
	replicaSound = Ti.Media.createSound({
		url:'/assets/sound/replica.mp3',
		looping:true,
		volume:0.2,
	}),
	everyLifeSound = Ti.Media.createSound({
		url:'/assets/sound/every-life.mp3',
		looping:true,
		volume:0.2,
	}),
	arrayImages2 = [],
	arrayImages3 = [],
	arrayCorrect = [],
	arrayCorrect2 = [],
	arrayNewWord = [],
	arrayNewWord2 = [],
	dbArray = [],
	mode = '',
	textContent = '', 
	questionMode = 0,
	gameCount = 0,
	ad = require('net.nend');
	
	decodeArray = {
		'あ' : [0, 0], 'い' : [0, 1], 'う' : [0, 2], 'え' : [0, 3], 'お' : [0, 4],
		'か' : [1, 0], 'き' : [1, 1], 'く' : [1, 2], 'け' : [1, 3], 'こ' : [1, 4],
		'さ' : [2, 0], 'し' : [2, 1], 'す' : [2, 2], 'せ' : [2, 3], 'そ' : [2, 4],
		'た' : [3, 0], 'ち' : [3, 1], 'つ' : [3, 2], 'て' : [3, 3], 'と' : [3, 4],
		'な' : [4, 0], 'に' : [4, 1], 'ぬ' : [4, 2], 'ね' : [4, 3], 'の' : [4, 4],
		'は' : [5, 0], 'ひ' : [5, 1], 'ふ' : [5, 2], 'へ' : [5, 3], 'ほ' : [5, 4],
		'ま' : [6, 0], 'み' : [6, 1], 'む' : [6, 2], 'め' : [6, 3], 'も' : [6, 4],
		'や' : [7, 0], 'ゆ' : [7, 2], 'よ' : [7, 4],
		'ら' : [8, 0], 'り' : [8, 1], 'る' : [8, 2], 'れ' : [8, 3], 'ろ' : [8, 4],
		'わ' : [9, 0], 'を' : [9, 1], 'ん' : [9, 2], '、' : [9, 3], '。' : [9, 4], '？' : [9, 3], '！' : [9, 4],
		'ア' : [0, 0], 'イ' : [0, 1], 'ウ' : [0, 2], 'エ' : [0, 3], 'オ' : [0, 4],
		'カ' : [1, 0], 'キ' : [1, 1], 'ク' : [1, 2], 'ケ' : [1, 3], 'コ' : [1, 4],
		'サ' : [2, 0], 'シ' : [2, 1], 'ス' : [2, 2], 'セ' : [2, 3], 'ソ' : [2, 4],
		'タ' : [3, 0], 'チ' : [3, 1], 'ツ' : [3, 2], 'テ' : [3, 3], 'ト' : [3, 4],
		'ナ' : [4, 0], 'ニ' : [4, 1], 'ヌ' : [4, 2], 'ネ' : [4, 3], 'ノ' : [4, 4],
		'ハ' : [5, 0], 'ヒ' : [5, 1], 'フ' : [5, 2], 'ヘ' : [5, 3], 'ホ' : [5, 4],
		'マ' : [6, 0], 'ミ' : [6, 1], 'ム' : [6, 2], 'メ' : [6, 3], 'モ' : [6, 4],
		'ヤ' : [7, 0], 'ユ' : [7, 2], 'ヨ' : [7, 4],
		'ラ' : [8, 0], 'リ' : [8, 1], 'ル' : [8, 2], 'レ' : [8, 3], 'ロ' : [8, 4],
		'ワ' : [9, 0], 'ヲ' : [9, 1], 'ン' : [9, 2],
		'aa' : [0, 0], 'ai' : [0, 1], 'au' : [0, 2], 'ae' : [0, 3], 'ao' : [0, 4],
		'ka' : [1, 0], 'ki' : [1, 1], 'ku' : [1, 2], 'ke' : [1, 3], 'ko' : [1, 4],
		'sa' : [2, 0], 'si' : [2, 1], 'su' : [2, 2], 'se' : [2, 3], 'so' : [2, 4],
		'ta' : [3, 0], 'ti' : [3, 1], 'tu' : [3, 2], 'te' : [3, 3], 'to' : [3, 4],
		'na' : [4, 0], 'ni' : [4, 1], 'nu' : [4, 2], 'ne' : [4, 3], 'no' : [4, 4],
		'ha' : [5, 0], 'hi' : [5, 1], 'hu' : [5, 2], 'he' : [5, 3], 'ho' : [5, 4],
		'ma' : [6, 0], 'mi' : [6, 1], 'mu' : [6, 2], 'me' : [6, 3], 'mo' : [6, 4],
		'ya' : [7, 0], 'yu' : [7, 2], 'yo' : [7, 4],
		'ra' : [8, 0], 'ri' : [8, 1], 'ru' : [8, 2], 're' : [8, 3], 'ro' : [8, 4],
		'wa' : [9, 0], 'wi' : [9, 1], 'wu' : [9, 2]
	};
	arrayKeyColor = [
		['#ff7f7f', '#ff7fbf', '#ff7fff', '#bf7fff', '#7f7fff', '#7fbfff', '#7fffff', '#7fffbf', '#7fff7f', '#bfff7f', '#ffff7f', '#ffbf7f'],
		['#ff8484', '#ff84c1', '#ff84ff', '#c184ff', '#8484ff', '#84c1ff', '#84ffff', '#84ffc1', '#84ff84', '#c1ff84', '#ffff84', '#ffc184'],
		['#ff8989', '#ff89c4', '#ff89ff', '#c489ff', '#8989ff', '#89c4ff', '#89ffff', '#89ffc4', '#89ff89', '#c4ff89', '#ffff89', '#ffc489'],
		['#ff8e8e', '#ff8ec6', '#ff8eff', '#c68eff', '#8e8eff', '#8ec6ff', '#8effff', '#8effc6', '#8eff8e', '#c6ff8e', '#ffff8e', '#ffc68e'],
		['#ff9393', '#ff93c9', '#ff93ff', '#c993ff', '#9393ff', '#93c9ff', '#93ffff', '#93ffc9', '#93ff93', '#c9ff93', '#ffff93', '#ffc993'],
		['#ff9999', '#ff99cc', '#ff99ff', '#cc99ff', '#9999ff', '#99ccff', '#99ffff', '#99ffcc', '#99ff99', '#ccff99', '#ffff99', '#ffcc99'],
		['#ff9e9e', '#ff9ece', '#ff9eff', '#ce9eff', '#9e9eff', '#9eceff', '#9effff', '#9effce', '#9eff9e', '#ceff9e', '#ffff9e', '#ffce9e'],
		['#ffa3a3', '#ffa3d1', '#ffa3ff', '#d1a3ff', '#a3a3ff', '#a3d1ff', '#a3ffff', '#a3ffd1', '#a3ffa3', '#d1ffa3', '#ffffa3', '#ffd1a3'],
		['#ffa8a8', '#ffa8d3', '#ffa8ff', '#d3a8ff', '#a8a8ff', '#a8d3ff', '#a8ffff', '#a8ffd3', '#a8ffa8', '#d3ffa8', '#ffffa8', '#ffd3a8'],
		['#ffadad', '#ffadd6', '#ffadff', '#d6adff', '#adadff', '#add6ff', '#adffff', '#adffd6', '#adffad', '#d6ffad', '#ffffad', '#ffd6ad'],
		['#ffb2b2', '#ffb2d8', '#ffb2ff', '#d8b2ff', '#b2b2ff', '#b2d8ff', '#b2ffff', '#b2ffd8', '#b2ffb2', '#d8ffb2', '#ffffb2', '#ffd8b2'],
		['#ffb7b7', '#ffb7db', '#ffb7ff', '#dbb7ff', '#b7b7ff', '#b7dbff', '#b7ffff', '#b7ffdb', '#b7ffb7', '#dbffb7', '#ffffb7', '#ffdbb7'],
		['#ffbcbc', '#ffbcdd', '#ffbcff', '#ddbcff', '#bcbcff', '#bcddff', '#bcffff', '#bcffdd', '#bcffbc', '#ddffbc', '#ffffbc', '#ffddbc'],
		['#ffc1c1', '#ffc1e0', '#ffc1ff', '#e0c1ff', '#c1c1ff', '#c1e0ff', '#c1ffff', '#c1ffe0', '#c1ffc1', '#e0ffc1', '#ffffc1', '#ffe0c1'],
		['#ffc6c6', '#ffc6e2', '#ffc6ff', '#e2c6ff', '#c6c6ff', '#c6e2ff', '#c6ffff', '#c6ffe2', '#c6ffc6', '#e2ffc6', '#ffffc6', '#ffe2c6'],
		['#ffcccc', '#ffcce5', '#ffccff', '#e5ccff', '#ccccff', '#cce5ff', '#ccffff', '#ccffe5', '#ccffcc', '#e5ffcc', '#ffffcc', '#ffe5cc'],
		['#ffd1d1', '#ffd1e8', '#ffd1ff', '#e8d1ff', '#d1d1ff', '#d1e8ff', '#d1ffff', '#d1ffe8', '#d1ffd1', '#e8ffd1', '#ffffd1', '#ffe8d1'],
		['#ffd6d6', '#ffd6ea', '#ffd6ff', '#ead6ff', '#d6d6ff', '#d6eaff', '#d6ffff', '#d6ffea', '#d6ffd6', '#eaffd6', '#ffffd6', '#ffead6'],
		['#ffdbdb', '#ffdbed', '#ffdbff', '#eddbff', '#dbdbff', '#dbedff', '#dbffff', '#dbffed', '#dbffdb', '#edffdb', '#ffffdb', '#ffeddb'],
		['#ffe0e0', '#ffe0ef', '#ffe0ff', '#efe0ff', '#e0e0ff', '#e0efff', '#e0ffff', '#e0ffef', '#e0ffe0', '#efffe0', '#ffffe0', '#ffefe0'],
		['#ffe5e5', '#ffe5f2', '#ffe5ff', '#f2e5ff', '#e5e5ff', '#e5f2ff', '#e5ffff', '#e5fff2', '#e5ffe5', '#f2ffe5', '#ffffe5', '#fff2e5'],
		['#ffeaea', '#ffeaf4', '#ffeaff', '#f4eaff', '#eaeaff', '#eaf4ff', '#eaffff', '#eafff4', '#eaffea', '#f4ffea', '#ffffea', '#fff4ea'],
		['#ffefef', '#ffeff7', '#ffefff', '#f7efff', '#efefff', '#eff7ff', '#efffff', '#effff7', '#efffef', '#f7ffef', '#ffffef', '#fff7ef'],
		['#fff4f4', '#fff4f9', '#fff4ff', '#f9f4ff', '#f4f4ff', '#f4f9ff', '#f4ffff', '#f4fff9', '#f4fff4', '#f9fff4', '#fffff4', '#fff9f4'],
		['#fff9f9', '#fff9fc', '#fff9ff', '#fcf9ff', '#f9f9ff', '#f9fcff', '#f9ffff', '#f9fffc', '#f9fff9', '#fcfff9', '#fffff9', '#fffcf9']
	];
	decodeArray2 = {'ゃ' : 0, 'ゅ' : 1, 'ょ' : 2, 'っ' : 3, '゛' : 4, '゜' : 5, 'ー' : 6};
	dakutenArray = ['が', 'ぎ', 'ぐ', 'げ', 'ご', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ', 'だ', 'ぢ', 'づ', 'で', 'ど', 'ば', 'び', 'ぶ', 'べ', 'ぼ', 'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ', 'ガ', 'ギ', 'グ', 'ゲ', 'ゴ', 'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ', 'ダ', 'ヂ', 'ヅ', 'デ', 'ド', 'バ', 'ビ', 'ブ', 'ベ', 'ボ', 'パ', 'ピ', 'プ', 'ペ', 'ポ'];  
	
	db = Ti.Database.open(Titanium.App.Properties.getString('template'));
	select = 'SELECT word, newword, ' + Titanium.App.Properties.getString('moji') + ' FROM ' + Titanium.App.Properties.getString('template');
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
			//Ti.API.info(arrayNewWord2);
			arrayImages2[i] = arrayImages3;
			arrayCorrect[i] = arrayCorrect2;
			arrayNewWord[i] = arrayNewWord2;
			arrayImages3 = [];
			arrayCorrect2 = [];
			arrayNewWord2 = [];
			i++;
			//Ti.API.info(arrayNewWord);
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
	//Ti.API.info(arrayNewWord);
	/*
	arrayImages2 = arrayImages2_origin;
	
	for(i=0; i<10; i++){
		for(j=0; j<5; j++){
			if(arrayImages[i][j]){
				if(Titanium.App.Properties.getString(arrayImages[i][j])){
					//l = decodeArray[arrayWords[i][j]][0];
					//m = decodeArray[arrayWords[i][j]][1];
					arrayImages2[i][j] = Titanium.App.Properties.getString(arrayImages[i][j]);
				}
			}
		}
	}
	*/
		
	//create object instance, a parasitic subclass of Observable
	self = Ti.UI.createView({
		backgroundColor:'#fff',
	});
	
	//textView
	textView = Ti.UI.createView({
	});
	
	textView.addEventListener('click', function(e){
		textContentOld++;//iphone キー操作があれば、adViewを表示させない
		Ti.API.info(e.source.val + '/mode: ' + mode );
		switch(e.source.val){
			case 'test':
			if(Ti.App.Properties.getBool('enableSpeaker')==true){
				eraserFunction();
				if(e.source.state==0){
					tsudoiSound.play();
					mode = 'test';
					testImage.state = 1;
					keyBaseView.remove(katakana);
					keyBaseView.remove(hiragana);
					testImage.add(closeImage);
					self.remove(settingsImage);
					self.add(cardButton);
					textView.add(tipImage);
					textView.remove(mailImage);
					gamePlay();
				}else{
					tsudoiSound.stop();
					gameStop();
				}
			}else{
				alert(L('not_use'));
			}
			break;
			case 'tip':
			if(Titanium.App.Properties.getString('moji')=='katakana'){
					val = replaceKatakana(questionImage.val);
				}else{//hiragana2
					val = questionImage.val;
				}
			//Ti.API.info('val: ' + val);
			
			if(textContent.length>val.length){
				incorrectSound.play();
				children2 = questionImage.getChildren();
				for(i=0; i<children2.length; i++){
					questionImage.remove(children2[i]);
				}
				questionImage.add(incorrectImage);
				speech.startSpeaking({
					text:val + L('is_incorrect'),
					voice:speechLang,
					rate:0.1,
				});
			}else if(textContent.length==val.length){
				//val = りんご textContent = りんこ
				val3 = val.slice(0, -1);//りん
				val4 = val.slice(-1);//ご
				val5 = textContent.slice(0, -1);//りん
				val6 = textContent.slice(-1);//こ
				val7 = replace2(val4).slice(0, 1);//こ
				val2 = replace2(val4).slice(-1);// ゛
				//Ti.API.info(Titanium.App.Properties.getString('moji') + '/' + val2 + '/' + val3 + '/' + val4 + '/' + val5 + '/' + val6 + '/' + val7);
				if(val==textContent){
					correctSound.play();
					speech.startSpeaking({
						text:val + L('is_correct'),
						voice:speechLang,
						rate:0.1,
					});
				}else if((val3==val5) && (val6==val7)){
					hintFunction(val, val2);
				}else{
					incorrectSound.play();
					questionImage.add(incorrectImage);
					speech.startSpeaking({
						text:val + L('is_incorrect'),
						voice:speechLang,
						rate:0.1,
					});
				}
			}else if(textContent.length>0){
				/*
			   てがみ　　　　がらす
			   て　　　　　　か
			   てか　　　　　か゛
			   てか゛　　　　がら
			   てがみ　　　　がらす
			   */
				val2 = val.substr(textContent.length, 1);//次の文字候補
				val3 = val.substr(textContent.length-1, 1);
				val4 = val.substr(0, textContent.length-1);
				val5 = val4 + val3;
				val6 = val4 + replace2(val3).substr(0,1);//val4が濁点付きでなければ、val5==val6 となる
				//textContent = replaceHiragana(textContent);//入力がカタカナのとき、ひらがなにする
				//Ti.API.info('check: ' + val5 + ' or ' + val6 + ' = ' + textContent);
				if(textContent==val5 || textContent==val6){//入力した文字が正しいか
					if(dakutenArray.indexOf(val3)!=-1){
						if(dakutenArray.indexOf(textContent.slice(-1))!=-1){//入力した文字列の最後の文字が濁点付きの文字であるか
							if(dakutenArray.indexOf(val2)!=-1){
								val2 = replace2(val2).substr(0,1);//濁点を取った次の文字候補
							}
						}else{
							val2 = replace2(val3).substr(1,1);//濁点または半濁点
						}
					}else{
						if(dakutenArray.indexOf(val2)!=-1){
							val2 = replace2(val2).substr(0,1);//濁点を取った次の文字候補
						}
					}
					hintFunction(val, val2);
				}else{
					incorrectSound.play();
					questionImage.add(incorrectImage);
					speech.startSpeaking({
						text:val + L('is_incorrect'),
						voice:speechLang,
						rate:0.1,
					});
				}
			}else{//textContent.length==0
				val2 = val.substr(textContent.length, 1);//次の文字候補
				if(dakutenArray.indexOf(val2)!=-1){
					val2 = replace2(val2).substr(0,1);//濁点を取ったひらがな
				}
				hintFunction(val, val2);
			}
			break;
			case 'eraser':
			eraserFunction();
			break;
			case 'speaker':
			if(Ti.App.Properties.getBool('enableSpeaker')==true){
				//Ti.API.info('mode: ' + mode );
				speech.startSpeaking({
					text:textContent,
					voice:speechLang,
					rate:0.1,
				});
			}else{
				alert(L('not_use'));
			}
			break;
			case 'mail':
			if(Ti.App.Properties.getBool('enableMail')==true){
				mailAddress =  Ti.App.Properties.getString('userFamilyEmail');
				if(e.source.state==1){
					everyLifeSound.stop();
					eraserFunction();
					self.add(settingsImage);
					textView.add(testImage);
					mailImage.remove(closeImage3);
					keyBaseView.add(katakana);
					keyBaseView.add(hiragana);
					changeHiragana('hiragana');
					mailImage.state = 0;
					mode = '';
				}else if(!mailAddress){//メールアドレスの設定
					eraserFunction();
					self.remove(settingsImage);
					textView.remove(testImage);
					mailImage.add(closeImage3);
					//alert('メールアドレスをせっていしてください');
					keyBaseView.remove(katakana);
					keyBaseView.remove(hiragana);
					changeAlphabet('mailaddress');
					mailImage.state = 1;
				}else{
					if(textContent){
						speech0.startSpeaking({
							text:L('send_mail2'),
							voice:speechLang,
							rate:0.1,
						});
						//alert(L('write_letter'));
						alertDialog3 = Titanium.UI.createAlertDialog({
							title: L('send_mail'),
							message: L('send_mail2'),
							buttonNames: [L('OK'),L('Cancel')],
							// キャンセルボタンがある場合、何番目(0オリジン)のボタンなのかを指定できます。
							cancel: 1
						});
						
						alertDialog3.addEventListener('click',function(event){
							// Cancelボタンが押されたかどうか
							if(event.index == 1){
								// cancel時の処理
								speech.startSpeaking({
									text:L('cancel_send_mail'),
									voice:speechLang,
									rate:0.1,
								});
								alert(L('cancel_send_mail'));
							}
							// 選択されたボタンのindexも返る
							if(event.index == 0){
								everyLifeSound.play();
								// "OK"時の処理
								mode = 'email';
								textView.add(cursorImage);
								emailFunction();
							}
						});
						alertDialog3.show();
					}else{
						speech0.startSpeaking({
							text:L('your_first_mail2'),
							voice:speechLang,
							rate:0.1,
						});
						//alert(L('write_letter'));
						alertDialog2 = Titanium.UI.createAlertDialog({
							title: L('your_first_mail'),
							message: L('your_first_mail2'),
							buttonNames: [L('OK'),L('Cancel')],
							// キャンセルボタンがある場合、何番目(0オリジン)のボタンなのかを指定できます。
							cancel: 1
						});
						
						alertDialog2.addEventListener('click',function(event){
							// Cancelボタンが押されたかどうか
							if(event.index == 1){
								// cancel時の処理
								speech.startSpeaking({
									text:L('cancel_first_mail'),
									voice:speechLang,
									rate:0.1,
								});
							}
							// 選択されたボタンのindexも返る
							if(event.index == 0){
								everyLifeSound.play();
								// "OK"時の処理
								mode = 'firstmail';
								mailImage.add(closeImage3);
								mailImage.state = 1;//firstmail
								self.add(coverView);
								speech.startSpeaking({
									text:L('description_first_mail'),
									voice:speechLang,
									rate:0.1,
								});
							}
						});
						alertDialog2.show();
					}
				}
			}else{
				alert(L('not_use'));
			}
			break;
		}
	});
	/*
	copyRightLabel = Ti.UI.createLabel({
		color:'#000000',
		backgroundColr:'transparent',
		text:'Photo by (c)Tomo.Yun / ゆんフリー写真素材集 (http://www.yunphoto.net)',
		textAlign:'right',
		font : {fontSize:12 ,fontFamily:'Helvetica Neue', fontWeight:'bold'},
		height:30,
		width:800,
		bottom:0,
		right:130,
	});
	textView.add(copyRightLabel);
	*/
	textField = Ti.UI.createLabel({
		color:'#000000',
		backgroundColr:'#fff',
		text:'',
		textAlign:'center',
	});

	questionImage = Ti.UI.createView({
		backgroundImage:'/assets/images/' + Titanium.App.Properties.getString('template') + '/aa.png',
		val0:'',//画像の変更時に、言葉を入力するときに使用
		val:'あさか゛お',
		val2:'アサカ゛オ',
		k:'',//画像の変更時に、言葉を入力するときに使用
		opacity:0,
	});

	cursorImage = Ti.UI.createImageView({
		backgroundColor:'#000',
		opacity:1,
	});

	setInterval(function(){
		if(cursorImage.opacity==0){
			cursorImage.opacity = 1;
		}else{
			cursorImage.opacity = 0;
		}  
	}, 500);

	testImage = Ti.UI.createImageView({
		image:'/assets/images/super_mario_question_box.png',
		state:0,
		val:'test',
	});

	eraserImage = Ti.UI.createImageView({
		image:'/assets/images/eraser.png',
		val:'eraser',
	});

	speakerImage = Ti.UI.createImageView({
		image:'/assets/images/Announcement.png',
		val:'speaker',
	});

	mailImage = Ti.UI.createImageView({
		image:'/assets/images/Mail_Read.png',
		state:0,
		val:'mail',
	});
	
	if(osname=='ipad'){
		textField.backgroundImage = '/assets/images/flame05_3.png',
		textField.font = {fontSize:80 ,fontFamily:'Helvetica Neue', fontWeight:'bold'},
		textField.height = 180,
		textField.width = 800,
		textField.bottom = 0,
		textField.left = 100,
		questionImage.height = 140,
		questionImage.width = 140,
		questionImage.bottom = 20,
		cursorImage.height = 80,
		cursorImage.width = 3,
		cursorImage.bottom = 50,//25=TextFeild.heigth=130のとき
		testImage.height = 80,
		testImage.width = 80,
		testImage.top = 10,
		testImage.left = 20,
		eraserImage.height = 80,
		eraserImage.width = 80,
		eraserImage.top = 10,
		eraserImage.right = 20,
		speakerImage.height = 60,
		speakerImage.width = 60,
		speakerImage.bottom = 20,
		speakerImage.right = 30,
		mailImage.height = 80,
		mailImage.width = 80,
		mailImage.bottom = 10,
		mailImage.left = 20;
	}else{
		textField.backgroundImage = '/assets/images/flame05_4.png',
		textField.font = {fontSize:30 ,fontFamily:'Helvetica Neue', fontWeight:'bold'},
		textField.height = 50,
		textField.width = 320,
		textField.bottom = 0,
		textField.left = (width-320)/2,
		questionImage.height = 50,
		questionImage.width = 50,
		questionImage.bottom = 0,
		cursorImage.height = 40,
		cursorImage.width = 2,
		cursorImage.bottom = 5,//25=TextFeild.heigth=130のとき
		testImage.height = 40,
		testImage.width = 40,
		testImage.top = 5,
		testImage.left = (width-480)/6,
		eraserImage.height = 40,
		eraserImage.width = 40,
		eraserImage.top = 5,
		eraserImage.right = (width-320)/4,
		speakerImage.height = 40,
		speakerImage.width = 40,
		speakerImage.bottom = 5,
		speakerImage.right = (width-480)/6,
		mailImage.height = 40,
		mailImage.width = 40,
		mailImage.bottom = 5,
		mailImage.left = (width-320)/4;
	}

	closeImage = Ti.UI.createImageView({
		image:'/assets/images/Close.png',
		bottom:0,
		right:0,
		state:1,//出題の解除
		val:'test',
	});

	closeImage2 = Ti.UI.createImageView({
		image:'/assets/images/Close.png',
		bottom:0,
		right:0,
		state:1,//設定画面の解除
		val:'settings',
	});

	closeImage3 = Ti.UI.createImageView({
		image:'/assets/images/Close.png',
		bottom:0,
		right:0,
		state:1,//アドレス設定の解除
		val:'mail',
	});

	tipImage = Ti.UI.createImageView({
		image:'/assets/images/Tip.png',
		val:'tip',
	});

	correctImage = Ti.UI.createLabel({
		backgroundColor:'transparent',
		height:questionImage.height,
		width:questionImage.height,
		borderColor:'red',
		borderWidth:5,
		borderRadius:questionImage.height/2,
	});

	incorrectImage = Ti.UI.createImageView({
		image:'/assets/images/incorrect.png',
	});
	
	//dockView
	dockView = Ti.UI.createView({
		opacity:0
	});
	
	dockView.addEventListener('click', function(e) {
		switch(e.source.val){
			case 'store':
			countPurchase = 0;
			for(i=0; i<arrayPurchase.length; i++){
				if(!Titanium.App.Properties.getBool('Purchased-'+ arrayPurchase[i])){
					countPurchase++;
				}
			}
			if(countPurchase==0){
				alert(L('is_purchased'));
			}else{
				Store = require('ui/common/Store');
				//construct UI
				store = new Store(self, 'Store', 'blue', arrayPurchase, textField, cursorImage, questionImage, adView);
				self.add(store);
			}
			break;
			case 'tools':
			Tools = require('ui/common/Tools');
			//construct UI
			tools = new Tools(self, 'Tools', 'blue', speech0, firstMailTable, StrCheck_adress, replicaSound);
			self.add(tools);
			break;
			case 'help':
			emailDialog = Titanium.UI.createEmailDialog();
			
			// 1桁の数字を0埋めで2桁にする
			toDoubleDigits = function(num) {
				num += "";
				if (num.length === 1) {
					num = "0" + num;
				}
				return num;
			};
			
			// 日付をYYYY/MM/DD HH:DD:MI:SS形式で取得
			yyyymmddhhmiss = function() {
				date = new Date();
				yyyy = date.getFullYear();
				mm = toDoubleDigits(date.getMonth() + 1);
				dd = toDoubleDigits(date.getDate());
				hh = toDoubleDigits(date.getHours());
				mi = toDoubleDigits(date.getMinutes());
				ss = toDoubleDigits(date.getSeconds());
				return yyyy + mm + dd + '_' + hh + mi + ss;
			}();
			
			//　メールの題名
			emailDialog.setSubject(L('mojiban') + ': ' + yyyymmddhhmiss);
			// メールの宛先（宛先、Cc、Bcc）
			emailDialog.setToRecipients([Titanium.App.Properties.getString('mail')]);
			//	emailDialog.setCcRecipients(['bar@xxxxx.com']);
			//	emailDialog.setBccRecipients(['hoge@xxxxx.com']);
			// メール本文
			text0 = L('Thank_you_for_your_use');
			
			emailDialog.setMessageBody(text0);
			// 添付がある場合
			// f = Ti.Filesystem.getFile('cricket.mp3');
			// emailDialog.addAttachment(f);
			
			// メール送信画面を起動
			emailDialog.open();
			break;
			case 'template':
			Template = require('ui/common/Template');
			//construct UI
			template = new Template(self, 'template_change', '#000', speech0, arrayPurchase, arrayCorrect, arrayCorrect2, arrayNewWord, arrayNewWord2, arrayImages2, arrayImages3, changeHiragana, textField, cursorImage, questionImage, adView);
			self.add(template);
			break;
			case 'info':
			replicaSound.stop();
			//win.remove(firstView);
			WebView = require('ui/common/WebView');
			//construct UI
			webView = new WebView(self, L('About'), filename, replicaSound);
			self.add(webView);
			break;
			/*
			case 'card':
			//win.remove(firstView);
			Card = require('ui/common/Card');
			//construct UI
			card = new Card(self, 'card', '#000', speech0, arrayImages2, arrayCorrect, arrayNewWord, arrayKeyColor, arrayImages, arrayWords);
			self.add(card);
			break;
			*/
		}
	});

	storeImage = Ti.UI.createImageView({
		image:'/assets/images/Shopping_Cart.png',
		val:'store',
	});
	/*
	if(Titanium.App.Properties.getBool('Purchased-'+ purchase)){
			storeImage.image = '/assets/images/Shopping_Cart_Remove.png';
	}
	*/
	
	toolsImage = Ti.UI.createImageView({
		image:'/assets/images/Tools.png',
		val:'tools',
	});
	
	helpImage = Ti.UI.createImageView({
		image:'/assets/images/Help.png',
		val:'help',
	});
	
	templateImage = Ti.UI.createImageView({
		image:'/assets/images/Template.png',
		val:'template',
	});
	
	infoImage = Ti.UI.createImageView({
		image:'/assets/images/Info.png',
		val:'info',
	});
	
	if(osname=='ipad'){
		textView.height = 180,
		textView.width = 1000,
		textView.top = 8,
		textView.right = 12;
		closeImage.height = 50,
		closeImage.width = 50,
		closeImage2.height = 50,
		closeImage2.width = 50,
		closeImage3.height = 50,
		closeImage3.width = 50,
		tipImage.height = 80,
		tipImage.width = 80,
		tipImage.bottom = 10,
		tipImage.left = 20,
		incorrectImage.height = 80,
		incorrectImage.width = 80,
		dockView.backgroundImage = '/assets/images/dock800x200.png',
		dockView.height = 140,
		dockView.width = 760,
		storeImage.height = 80,
		storeImage.width = 80,
		storeImage.bottom = 20,
		storeImage.left = 140,
		toolsImage.height = 80,
		toolsImage.width = 80,
		toolsImage.bottom = 20,
		toolsImage.left = 240,
		helpImage.height = 80,
		helpImage.width = 80,
		helpImage.bottom = 20,
		helpImage.left = 340,
		templateImage.height = 80,
		templateImage.width = 80,
		templateImage.bottom = 20,
		templateImage.left = 440,
		infoImage.height = 80,
		infoImage.width = 80,
		infoImage.bottom = 20,
		infoImage.left = 540;
		setTimeout(function(){
			dockView.animate({center:{x:500,y:270},curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,duration:1000});
			//dockView.animate({center:{x:500,y:270},curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,duration:1000}, function(){
				// STEP 2. 中心座標(0, 200)に移動
				//Ti.API.info('dockView.opacity = 1');
				//dockView.opacity = 1;
			//});
		}, 500);
	}else{
		textView.height = 50,
		textView.width = width,
		textView.top = 0,
		textView.right = 0;
		closeImage.height = 30,
		closeImage.width = 30,
		closeImage2.height = 30,
		closeImage2.width = 30,
		closeImage3.height = 30,
		closeImage3.width = 30,
		tipImage.height = 40,
		tipImage.width = 40,
		tipImage.bottom = 5,
		tipImage.left = (width-320)/4,
		incorrectImage.height = 50,
		incorrectImage.width = 50,
		//dockView.backgroundImage = '/assets/images/dock800x200.png',
		dockView.height = 50,
		dockView.width = 320,
		storeImage.height = 40,
		storeImage.width = 40,
		storeImage.bottom = 5,
		storeImage.left = 20,
		toolsImage.height = 40,
		toolsImage.width = 40,
		toolsImage.bottom = 5,
		toolsImage.left = 80,
		helpImage.height = 40,
		helpImage.width = 40,
		helpImage.bottom = 5,
		helpImage.left = 140,
		templateImage.height = 40,
		templateImage.width = 40,
		templateImage.bottom = 5,
		templateImage.left = 200,
		infoImage.height = 40,
		infoImage.width = 40,
		infoImage.bottom = 5,
		infoImage.left = 260;
		setTimeout(function(){
			dockView.animate({center:{x:width/2,y:100},curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,duration:1000});
			//dockView.animate({center:{x:500,y:270},curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,duration:1000}, function(){
				// STEP 2. 中心座標(0, 200)に移動
				//Ti.API.info('dockView.opacity = 1');
				//dockView.opacity = 1;
			//});
		}, 500);
	}
	
	textView.add(textField);
	textView.add(cursorImage);
	textView.add(questionImage);
	textView.add(testImage);
	textView.add(eraserImage);
	textView.add(speakerImage);
	textView.add(mailImage);
	
	dockView.add(storeImage);
	dockView.add(toolsImage);
	dockView.add(helpImage);
	dockView.add(templateImage);
	dockView.add(infoImage);
	textView.add(dockView);
	
	self.add(textView);
	
	//keyBaseView
	keyBaseView = Ti.UI.createView();
	
	keyBaseView.addEventListener('click', function(e) {
		//Ti.API.info(JSON.stringify(e));
		//Ti.API.info(e.source.val + '/' + e.source.val2);
		switch(e.source.val){
			case 'hiragana':
			//completeFunction();
			changeHiragana('hiragana');
			break;
			case 'katakana':
			changeKatakana('katakana');
			break;
			case 'key2':
			text = e.source.text2;
			if(e.source.val2=='firstmail'){
				firstmailFunction(e);
			}else{
				//Ti.API.info(JSON.stringify(e));
				lastLetter = textContent.slice(-1);
				lastLetter = replaceHiragana(lastLetter);
				if(e.source.text2==undefined){
					//何もしない
				}else if(textContent.length==0){
					alert(L('unable_to_input'));
					incorrectSound.play();
				}else if(e.source.text2=='゜' && !(lastLetter=='は' || lastLetter=='ひ' || lastLetter=='ふ' || lastLetter=='へ' || lastLetter=='ほ')){
					alert(L('unable_to_input'));
					incorrectSound.play();
				}else if(e.source.text2=='゛' && !(lastLetter=='か' || lastLetter=='き' || lastLetter=='く' || lastLetter=='け' || lastLetter=='こ' || lastLetter=='さ' || lastLetter=='し' || lastLetter=='す' || lastLetter=='せ' || lastLetter=='そ' || lastLetter=='た' || lastLetter=='ち' || lastLetter=='つ' || lastLetter=='て' || lastLetter=='と' || lastLetter=='は' || lastLetter=='ひ' || lastLetter=='ふ' || lastLetter=='へ' || lastLetter=='ほ')){
					alert(L('unable_to_input'));
					incorrectSound.play();
				}else{
					textWrite();
				}
			}
		break;
		case 'key'://５０音
		case 'key3'://メールアドレス用アルファベット
		case 'key4'://点と○
		text = e.source.text;
		if(text==L('Enter')){
			if(e.source.val2==='mailaddress'){
				if(textContent==''){
					alert(L('enter_mailaddress'));
					incorrectSound.play();
				}else if(StrCheck_adress(textContent)){
					alert(L('registed_mailaddress'));
					Titanium.App.Properties.setString('userFamilyEmail', textContent);
				}else{
					eraserFunction();
					alert(L('no_check_mailaddress'));
				}
			}
		}else{
			if(e.source.val2=='firstmail'){
				firstmailFunction(e);
			}else if(e.source.val2=='settings'){
				if(e.source.val!='key4'){
					if(e.source.state==1){
						speech0.startSpeaking({
							text:L('delete_photo2'),
							voice:speechLang,
							rate:0.1,
						});
						alertDialog = Titanium.UI.createAlertDialog({
							title: L('delete_photo'),
							message: L('delete_photo2'),
							buttonNames: [L('OK'),L('Cancel')],
								// キャンセルボタンがある場合、何番目(0オリジン)のボタンなのかを指定できます。
								cancel: 1
							});
						alertDialog.addEventListener('click',function(event){
							// Cancelボタンが押されたかどうか
							if(event.index == 1){
								// cancel時の処理
							}
							// 選択されたボタンのindexも返る
							if(event.index == 0){
								// "OK"時の処理
								f = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, Titanium.App.Properties.getString('template') + '/' + e.source.imageName + ".png");
								if (f.exists()) {
									f.deleteFile();
								}
								Titanium.App.Properties.setString(e.source.imageName, '');
								Titanium.App.Properties.setString('moji', 'settings');
								//Ti.API.info(e.source.imageName + ' / ' + decodeArray[e.source.imageName]);
								l = decodeArray[e.source.imageName][0];
								m = decodeArray[e.source.imageName][1];
								num = 5*l + m + 1;
									//Ti.API.info(l + ' / ' + m);
									//Ti.API.info(e.source.imageName);
									arrayNewWord[l][m] = '';
									//Ti.API.info(arrayImages2[i][j]);
									textContent = '';
									textField.text = textContent;
									questionImage.opacity = 0;
									db = Ti.Database.open(Titanium.App.Properties.getString('template'));
									update = 'UPDATE ' + Titanium.App.Properties.getString('template') + ' SET hiragana = 0, katakana = 0, newword = "" WHERE id = ' + num;
									db.execute(update);
									db.close();
									setTimeout(function(){
										changeHiragana('settings');
									}, 500);
								}
							});
							alertDialog.show();
						}else{
							//k = e.source.key;
							imageName = e.source.imageName;
							//Ti.API.info(k);
							word = e.source.word;
							from = 'FirstView';
							if(text){
								Photo = require('ui/common/Photo');
								//construct UI
								photo = new Photo(self, from, word, text, imageName, '', speech0, '', incorrectSound, changeHiragana, StrCheck_hiragana, 
									decodeArray, arrayNewWord, replaceHiragana, replaceKatakana, dakutenArray, replace2);
								self.add(photo);
							}
						}
					}
				}else{
					if(textContent==''){
						if(e.source.val=='key4'){
							alert(L('unable_to_input'));
							incorrectSound.play();
						}else{
							textView.remove(cursorImage);
							textWrite();
						}
					}else{
						textWrite();
					}
				}
			}
			break;
		}
	});

	settingsImage = Ti.UI.createImageView({
		image:'/assets/images/System.png',
		left:12,
		state:0,
		press:0,
		val:'settings',
	});

	settingsImage.addEventListener('click', function(e) {
		//	Ti.API.info('click');
		if(settingsImage.state==0){
			alert(L('press3s'));
		}else{
			replicaSound.stop();
			mode = 'settings';
			keyBaseView.add(katakana);
			keyBaseView.add(hiragana);
			textView.add(testImage);
			textView.add(speakerImage);
			textView.add(eraserImage);
			textView.add(mailImage);
			textView.add(cursorImage);
			settingsImage.state=0;
			settingsImage.remove(closeImage2);
			children2 = mailImage.getChildren();
			for(i=0; i<children2.length; i++){
				mailImage.remove(children2[i]);
			}
			changeHiragana('hiragana');
			questionImage.opacity = 0;
			if(osname=='ipad'){
				dockView.animate({center:{x:500,y:270},curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,duration:1000});
			}else{
				dockView.animate({center:{x:width/2,y:100},curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,duration:1000});
			}
		}
	});

	settingsImage.addEventListener('touchend', function(e) {
		//Ti.API.info('touchend');
		settingsImage.press = 0;
	});

	settingsImage.addEventListener('touchstart', function(e) {
		//Ti.API.info('touchstart');
		settingsImage.press = 1;
		setTimeout(function(){
			if(settingsImage.press==1){
				replicaSound.play();
				eraserFunction();
				if(settingsImage.state==0){
					mode = 'settings';
					keyBaseView.remove(katakana);
					keyBaseView.remove(hiragana);
					textView.remove(testImage);
					textView.remove(speakerImage);
					textView.remove(eraserImage);
					textView.remove(mailImage);
					textView.remove(cursorImage);
					settingsImage.state=1;
					settingsImage.add(closeImage2);
					speech0.startSpeaking({
						text:L('change_illust2'),
						voice:speechLang,
						rate:0.1,
					});
					dockView.opacity = 1;
					setTimeout(function(){
						//Ti.API.info('animate');
						if(osname=='ipad'){
							dockView.animate({center:{x:500,y:100},curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,duration:1000});
						}else{
							dockView.animate({center:{x:width/2,y:25},curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,duration:1000});
						}
						setTimeout(function(){
							changeHiragana('settings');
						}, 500);
					}, 500);
				}else{
					replicaSound.stop();
					keyBaseView.add(katakana);
					keyBaseView.add(hiragana);
					textView.add(testImage);
					textView.add(speakerImage);
					textView.add(eraserImage);
					textView.add(mailImage);
					textView.add(cursorImage);
					settingsImage.state=0;
					settingsImage.remove(closeImage2);
					children2 = mailImage.getChildren();
					for(i=0; i<children2.length; i++){
						mailImage.remove(children2[i]);
					}
					changeHiragana('hiragana');
					questionImage.opacity = 0;
					mode = '';
					if(osname=='ipad'){
						dockView.animate({center:{x:500,y:270},curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,duration:1000});
					}else{
						dockView.animate({center:{x:width/2,y:100},curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,duration:1000});
					}
				}
			}
		}, 3000);
	});
	
	cardButton = Ti.UI.createImageView({
		image:'/assets/images/Card.png',
	});
	//self.add(cardButton);
	
	cardButton.addEventListener('click', function(e) {
		speech.startSpeaking({
			text:L('your_card_collection'),
			voice:speechLang,
			rate:0.1,
		});
		
		children3 = cardView.getChildren();
		if(children3.length>1){
			for(i=1; i<children3.length; i++){
				cardView.remove(children3[i]);//playImage stopImage
			}
		}
		
		/*
		children = self.getChildren();
		for(i=0; i<children.length; i++){
			self.remove(children[i]);//playImage stopImage
		}
		*/
		Card = require('ui/common/Card');
		//construct UI
		card = new Card(self, 'card', '#000', cardView, speech, speech0, arrayImages2, arrayCorrect, arrayNewWord, arrayKeyColor, arrayImages, arrayWords, makeCard);
		self.add(card);
	});
	
	if(osname=='ipad'){
		keyBaseView.height = 560;
		keyBaseView.width = 1000;
		keyBaseView.top = 196;
		keyBaseView.right = 12;
		settingsImage.height = 60,
		settingsImage.width = 60,
		settingsImage.left = 12,
		settingsImage.bottom = 10,
		cardButton.height = 80,
		cardButton.width = 80,
		cardButton.bottom = 10,
		cardButton.left = 12;
	}else{
		keyBaseView.height = 270;
		keyBaseView.width = width;
		keyBaseView.top = 50;
		keyBaseView.right = 0;
		settingsImage.height = 30,
		settingsImage.width = 30,
		settingsImage.left = 0,
		settingsImage.bottom = 0,
		cardButton.height = 45,
		cardButton.width = 45,
		cardButton.bottom = 0,
		cardButton.left = 0;	
	}
	self.add(keyBaseView);
	self.add(settingsImage);
	
	backImage = Ti.UI.createImageView({
		image:'/assets/images/Back.png',
		backgroundColor:'transparent',
		height:40,
		width:40,
		opacity:1,
		top:0,
		right:70,//25=TextFeild.heigth=130のとき:
		val:'backImage',
	});
	
	setInterval(function(){
		if(backImage.opacity==0){
			backImage.opacity = 1;
		}else{
			backImage.opacity = 0;
		}  
	}, 500);
	
	//firstmail
	coverView = Ti.UI.createView({
		backgroundColor:'transparent',
		opacity:1,
	});
	//textView.add(infoImage);
	
	triangleImage = Ti.UI.createImageView({
		backgroundColor:'#bfd255',
		width:50,
		height:50,
		borderRadius:3,
		transform : Ti.UI.create2DMatrix().rotate(45),
		borderColor:"#bbb",
		borderWidth:1,
		zIndex:0,
	});
	
	firstMailTable = Titanium.UI.createTableView({
		borderColor:"#bbb",
		borderWidth:1,
	});
	
	firstMailTable.addEventListener('click', function(e) {
		switch(e.index){
			case 0:
			self.remove(coverView);
			mailImage.remove(closeImage3);
			mailImage.state = 0;
			practiceStatement = '';
			mode = '';
			everyLifeSound.stop();
			break;
			case 1:
			speech0.startSpeaking({
				text:L(arrayTitle[e.index-1]),
				voice:speechLang,
				rate:0.1,
			});
			break;
			case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10:
			practiceStatement = L(arrayTitle[e.index-1]);
			practiceStatement2 = replace2(practiceStatement);
			speech0.startSpeaking({
				text:practiceStatement2,
				voice:speechLang,
				rate:0.1,
			});
			changeHiragana('firstmail');
			self.remove(coverView);
			break;
		}
	});
	
	rows = [];
	
	row = Ti.UI.createTableViewRow();
	
	titleLabel = Titanium.UI.createLabel({
		color:'#fff',
		text:L('your_first_mail'),
		textAlign:'center',
		width:Ti.UI.FILL,
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
	row.add(titleLabel);
	
	back = Ti.UI.createButton({
		color:'#fff',
		title: L('Back'),
		textAlign : 'center',
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
		style:'',
		val:'back',
	});
	row.add(back);
	
	rows.push(row);
	
	f = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, '/userFace.png');
	if (f.exists()) {
		userPhoto = Titanium.Filesystem.applicationDataDirectory + '/userFace.png';
	}else{
		userPhoto = '/assets/images/userFace_default.png';
	}
	
	familyPhoto = '/assets/images/' + Titanium.App.Properties.getString('userFamily') + '.jpg';
	
	arrayTitle = ['description_first_mail', 'thanks_mail', 'love_mail', 'please_mail', 'want_mail', 'question_mail', 'fight_mail'];
	arrayLeft = [userPhoto, familyPhoto, familyPhoto, familyPhoto, familyPhoto, familyPhoto, familyPhoto, familyPhoto, familyPhoto, familyPhoto, familyPhoto, familyPhoto];

	for(i=0; i<arrayTitle.length; i++){
		row = Ti.UI.createTableViewRow({
			height:'auto',
			backgroundColor:'white',
			hasChild:true,
		});
		if(i==0){
			row.hasChild = false;
		}
		
		leftImage = Titanium.UI.createImageView({
			image: arrayLeft[i],
			num:i,
		});
		row.add(leftImage);
		
		label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:L(arrayTitle[i]),
			textAlign:'left',
			height:'auto',
			//opacity:0.7,
		});
		row.add(label);
		
		if(osname=='ipad'){
			leftImage.left = 10,
			leftImage.height = 50,
			leftImage.width = 50,
			label.font = {fontSize:25,fontFamily:'Helvetica Neue'},
			label.width = 400,
			label.top = 10,
			label.bottom = 10,
			label.left = 70;
		}else{
			leftImage.left = 4,
			leftImage.height = 20,
			leftImage.width = 20,
			label.font = {fontSize:16,fontFamily:'Helvetica Neue'},
			label.width = 180,
			label.top = 4,
			label.bottom = 4,
			label.left = 30;
		}
		
		rows.push(row);
	}
	
	if(osname=='ipad'){
		triangleImage.left = 50,
		triangleImage.top = 170,
		firstMailTable.height = 500,
		firstMailTable.width = 500,
		firstMailTable.top = 180,
		firstMailTable.left = 10,
		titleLabel.height = 60,
		titleLabel.font = {fontSize:25,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		back.height = 50,
		back.width = 100,
		back.top = 5,
		back.left = 10,
		back.radius = 10,
		back.borderRadius = 10,
		back.font = {fontSize:20,fontFamily:'Helvetica Neue',fontWeight:'bold'};
	}else{
		triangleImage.left = 60,
		triangleImage.top = 50,
		firstMailTable.height = 250,
		firstMailTable.width = 250,
		firstMailTable.top = 50,
		firstMailTable.left = 10,
		titleLabel.height = 30,
		titleLabel.font = {fontSize:18,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		back.height = 24,
		back.width = 40,
		back.top = 3,
		back.left = 4,
		back.radius = 4,
		back.borderRadius = 4,
		back.font = {fontSize:12,fontFamily:'Helvetica Neue',fontWeight:'bold'};
	}
	
	coverView.add(triangleImage);
	coverView.add(firstMailTable);
	
	firstMailTable.startLayout();
	firstMailTable.setData(rows);
	firstMailTable.finishLayout();
	
	//card
	cardView = Ti.UI.createView({
		//width:1024,
		//height:768,
		val:''//Card.js val='card' を設定
	});
	
	cardView.addEventListener('click', function(e){
		Ti.API.info(JSON.stringify(e));
		allCorrect = true;
		for(i=0; i<10; i++){
			for(j=0; j<5; j++){
				if((i==7 && (j==1 || j==3))||(i==9 && (j==3 || j==4))){
					//何もしない
				}else if(arrayCorrect[i][j]==0){
					allCorrect = false;
					i=10;
					j=5;
				}
			}
		}
		/*
		db = Ti.Database.open(Titanium.App.Properties.getString('template'));
		select = 'SELECT ' + Titanium.App.Properties.getString('moji') + ' FROM ' + Titanium.App.Properties.getString('template') + ' WHERE ID = 50';
		data = db.execute(select);
		*/
		//self.remove(cardView);
		if(allCorrect && arrayCorrect[9][4]==0){
			self.remove(cardView);
			gameStop();
			setTimeout(function(){
				completeFunction();
				update = 'UPDATE ' + Titanium.App.Properties.getString('template') + ' SET ' + Titanium.App.Properties.getString('moji') + ' = 1 WHERE ID = 50';
				db.execute(update);
				arrayCorrect[9][4] = 1;
			}, 500);
		}else if(e.source.val=='card'){
			self.remove(cardView);
		}else if(e.source.val=='play'){//mode=='test'
			self.remove(cardView);
			gamePlay();
		}else if(e.source.val=='stop'){//mode=='test'
			self.remove(cardView);
			gameStop();
		}
		data.close();
		db.close();
	});
	
	cardImage = Ti.UI.createImageView({
		backgroundColor:'white',
		top:scale1(134),
		//left:height/1.414*(0.05+i),
		width:scale1(500/1.414),
		height:scale1(500),
		borderColor:'#000',
		borderRadius	:scale1(40),
		borderWidth:scale1(4),
	});
	cardView.add(cardImage);
	
	cardImage2 = Ti.UI.createImageView({
		//image: '/assets/images/flowers-leaves001.jpg',
		//backgroundColor:arrayColor[i%12],
		top:scale1(25),
		//left:height/1.414*0.05,
		width:scale1(500/1.414-50),
		height:scale1(450),
		borderColor:'#000',
		borderRadius	:scale1(35),
		borderWidth:scale1(4),
	});
	cardImage.add(cardImage2);
	
	cardImage3  = Ti.UI.createImageView({
		//image:'/assets/images/' + Titanium.App.Properties.getString('teplate'),
		width:scale1(400/1.414),
		height:scale1(400/1.414),
		top:scale1(50),
		left:scale1(50/1.414),
	});
	cardImage.add(cardImage3);
	
	cardLabel  = Ti.UI.createLabel({
		color:'#fff',
		backgroundColor:'red',
		text:'NEW',
		font:{fontSize:scale1(30),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		width:scale1(90),
		height:scale1(60),
		top:0,
		right:0,
		textAlign:'center',
		borderColor:'#000',
		borderRadius	:scale1(30),
		borderWidth:scale1(4),
	});
	cardImage.add(cardLabel);
	/*
	if(levelArray[i+1]!=1){
		cardLabel.text = levelArray[i+1];
		cardLabel.color = 'red';
		cardLabel.backgroundColor = 'transparent';
		cardLabel.borderColor = 'transparent';
	}
	*/
	
	cardLabel2 = Titanium.UI.createLabel({
		color:'#000',
		//text:answerArray[i],
		font:{fontSize:scale1(40),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'center',
		width:Ti.UI.FILL,
		height:'auto',
		bottom:scale1(60),
	});
	cardImage.add(cardLabel2);
	
	playImage = Ti.UI.createImageView({
		backgroundColor:'#fff',
		//top:134,
		left:width/2 + scale1(240),
		width:scale1(160),
		height:scale1(160),
		val:'play',
		borderColor:'#000',
		borderRadius	:scale1(80),
		borderWidth:scale1(4),
	});
	playTop = Ti.UI.createImageView({
		image:'/assets/images/Play.png',
		top:scale1(30),
		right:scale1(30),
		width:scale1(100),
		height:scale1(100),
		val:'play',
	});
	playImage.add(playTop);
	//playImage.addEventListener('click', function(){gamePlay();});
	
	stopImage = Ti.UI.createImageView({
		backgroundColor:'#fff',
		//top:134,
		right:width/2+scale1(240),
		width:scale1(160),
		height:scale1(160),
		val:'stop',
		borderColor:'#000',
		borderRadius	:scale1(80),
		borderWidth:scale1(4),
	});
	stopTop = Ti.UI.createImageView({
		image:'/assets/images/Stop.png',
		top:scale1(30),
		right:scale1(30),
		width:scale1(100),
		height:scale1(100),
		val:'stop',
	});
	stopImage.add(stopTop);
	//stopImage.addEventListener('click', function(){gameStop();});
	
	hiragana = Ti.UI.createLabel({
		color:'#000000',
		backgroundColr:'#fff',
		text:L('Hiragana'),
		textAlign:'center',
		top:0,
		borderColor:'#000',
		borderWidth:1,
		val:'hiragana',
	});
	
	katakana = Ti.UI.createLabel({
		color:'#000000',
		backgroundColr:'#fff',
		text:L('Katakana'),
		textAlign:'center',
		top:0,
		borderColor:'#000',
		borderWidth:1,
		val:'katakana',
	});
	
	if(Ti.App.Properties.getString('moji')=='hiragana'){
		hiragana.color = '#fff';
		hiragana.backgroundColor = '#000';
		katakana.color = '#000';
		katakana.backgroundColor = '#fff';
	}else{
		hiragana.color = '#000';
		hiragana.backgroundColor = '#fff';
		katakana.color = '#fff';
		katakana.backgroundColor = '#000';
	}

	modeLabel = Ti.UI.createLabel({
		color:'red',
		backgroundColor:'yellow',
		text:'',
		top:0,
		right:0,
		textAlign:'center',
		borderColor:'red',
		opacity:0,
	});
	
	if(osname=='ipad'){
		hiragana.font  =  {fontSize:25 ,fontFamily:'Helvetica Neue', fontWeight:'bold'},
		hiragana.height = 60,
		hiragana.width = 150,
		hiragana.right = 0,
		katakana.font  =  {fontSize:25 ,fontFamily:'Helvetica Neue', fontWeight:'bold'},
		katakana.height = 60,
		katakana.width = 150,
		katakana.right = 150,
		modeLabel.font = {fontSize:20,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		modeLabel.height = 60,
		modeLabel.width = 300,
		modeLabel.borderWidth = 5,
		modeLabel.borderRadius = 5;
	}else{
		hiragana.font  =  {fontSize:15 ,fontFamily:'Helvetica Neue', fontWeight:'bold'},
		hiragana.height = 45,
		hiragana.width = width*3/20,
		hiragana.right = 0,
		katakana.font  =  {fontSize:15 ,fontFamily:'Helvetica Neue', fontWeight:'bold'},
		katakana.height = 45,
		katakana.width = width*3/20,
		katakana.right = width*3/20,
		modeLabel.font = {fontSize:10,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		modeLabel.height = 45,
		modeLabel.width = 3*width/10,
		modeLabel.borderWidth = 2,
		modeLabel.borderRadius = 2;
	}
	keyBaseView.add(hiragana);
	keyBaseView.add(katakana);
	keyBaseView.add(modeLabel);
	
	makeBoard('hiragana');

	if(!(Titanium.App.Properties.getBool('Purchased-mojiban1')||Titanium.App.Properties.getBool('Purchased-mojiban2')||Titanium.App.Properties.getBool('Purchased-mojiban3')||Titanium.App.Properties.getBool('Purchased-mojiban4')||Titanium.App.Properties.getBool('Purchased-mojiban5')||Titanium.App.Properties.getBool('Purchased-mojiban6')||Titanium.App.Properties.getBool('Purchased-mojiban7')||Titanium.App.Properties.getBool('Purchased-mojiban8')||Titanium.App.Properties.getBool('Purchased-mojiban9')||Titanium.App.Properties.getBool('Purchased-mojiban10'))){
		if(osname=='ipad'){
			textField.height = 130;
			cursorImage.bottom = 25;
			questionImage.width = 100;
			questionImage.height = 100;
			questionImage.bottom = 15;
			adView = ad.createView({
				width:320,
				height:50,
				top:0,
				spotId: Titanium.App.Properties.getInt('nend_spotid'),//118508,
				apiKey: Titanium.App.Properties.getString('nend_appkey'),//"a3faebdba7223598eb433397b2b15a399710179f",
				state:1,
			});
			self.add(adView);
			if(Titanium.Network.online == false){
				label_ad = Titanium.UI.createLabel({
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
				adView.add(label_ad);
				
				label_ad.addEventListener('click', function(e) {
					alert(e.source.text);
				});
			}
		}else{
			adView = Ti.UI.createView({
				state:0,
			});
			
			adViewColor = Ti.UI.createLabel({
				width:width,
				height:height,
				backgroundColor:'#000',
				opacity:0.5,
			});
			
			adViewLabel = Ti.UI.createLabel({
				color:'#fff',
				text:L('no_operate'),
				font:{fontSize:15,fontFamily:'Helvetica Neue',fontWeight:'bold'},
				textAlign:'center',
				width:width,
				height:35,
				bottom:0,
				backgroundColor:'transparent',
				opacity:0.8,
			});
			
			adViewBack = Ti.UI.createButton({
				top:10,
				left:20,
				width:40,
				height:40,
				backgroundImage:'/assets/images/Undo.png',
				opacity:1,
			});
			//Add behavior for UI
			adViewBack.addEventListener('click', function(e) {
				self.remove(adView);
				adView.state = 0;
			});
			
			adViewContent = ad.createView({
				width:300,
				height:250,
				top:35,
				spotId: Titanium.App.Properties.getInt('nend_spotid'),//118508,
				apiKey: Titanium.App.Properties.getString('nend_appkey'),//"a3faebdba7223598eb433397b2b15a399710179f",
			});
			
			adView.add(adViewColor);
			adView.add(adViewLabel);
			adView.add(adViewBack);
			adView.add(adViewContent);
			
			if(Titanium.Network.online == false){
				label_ad = Titanium.UI.createLabel({
					color:'#fff',
					text:L('offline'),
					font:{fontSize:25,fontFamily:'Helvetica Neue',fontWeight:'bold'},
					textAlign:'center',
					width:300,
					height:250,
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
				adViewContent.add(label_ad);
				
				label_ad.addEventListener('click', function(e) {
					alert(e.source.text);
				});
			}
			
			textContentOld = 0;
			adInterval = setInterval(function(){
				if(adView.state==0 && textContentOld==0){
					self.add(adView);
					adView.state = 1;
				}
				textContentOld = 0;
			}, 180000);
		}
	}
	
	//初期設定
	if(Ti.App.Properties.getInt('setTools')==0){
		speech0.startSpeaking({
			text:L('firstSettings'),
			voice:speechLang,
			rate:0.1,
		});
		alert(L('firstSettings'));
		setTimeout(function(){
			replicaSound.play();
			Tools = require('ui/common/Tools');
			//construct UI
			tools = new Tools(self, 'Initial', 'blue', speech0, firstMailTable, StrCheck_adress, replicaSound);
			self.add(tools);
		}, 1000);
	}
	
	
	
	
	
	////////////////////////////
	//       function      /////
	////////////////////////////
	
	function scale(dimension) {
		return Math.round(dimension *  Ti.App.Properties.getDouble('osZoom') * Ti.Platform.displayCaps.platformWidth / 320);
	}
	
	function scale1(dimension) {
		return Math.round(dimension *  height / 768);
	}
	
	function changeHiragana(str) {
		//Ti.API.info('mode: ' + mode);
		if(Titanium.App.Properties.getString('moji')!='hiragana' || mode=='test' || mode=='settings' || mode=='firstmail' || mode=='email'){
			//if(str=='settings' || str=='firstmail'){
			//	Titanium.App.Properties.setString('moji', str);
			//}else{
				Titanium.App.Properties.setString('moji', 'hiragana');
			//}
			hiragana.color = '#fff';
			hiragana.backgroundColor = '#000';
			katakana.color = '#000';
			katakana.backgroundColor = '#fff';
			children = keyBaseView.getChildren();
			for(i=0; i<children.length; i++){
				if(children[i].val=='key' || children[i].val=='key2' || children[i].val=='key3' || children[i].val=='key4'){
					keyBaseView.remove(children[i]);
				}
			}
			arrayWords = [
				['あ', 'い', 'う', 'え', 'お'],
				['か', 'き', 'く', 'け', 'こ'],
				['さ', 'し', 'す', 'せ', 'そ'],
				['た', 'ち', 'つ', 'て', 'と'],
				['な', 'に', 'ぬ', 'ね', 'の'],
				['は', 'ひ', 'ふ', 'へ', 'ほ'],
				['ま', 'み', 'む', 'め', 'も'],
				['や', '', 'ゆ', '', 'よ'],
				['ら', 'り', 'る', 'れ', 'ろ'],
				['わ', 'を', 'ん', '、', '。']
			];
			arrayWords2 = ['や', 'ゆ', 'よ', 'つ', '〝', '°', 'ー'];
			arrayWords3 = ['ゃ', 'ゅ', 'ょ', 'っ', '゛', '゜', 'ー'];
			arrayWords4 = ['', '', '', '', '', '', ''];
			arrayWords5 = ['', '', '', '', '', '', ''];
			
			db = Ti.Database.open(Titanium.App.Properties.getString('template'));
			select = 'SELECT hiragana FROM ' + Titanium.App.Properties.getString('template');
			//Ti.API.info(select);
			data = db.execute(select);
			k = 0;
			i = 0;
			while(data.isValidRow()){
				//Ti.API.info(k + '/' + data.field(0) + '/' + data.field(1) + '/' + data.field(2));
				j = k%5;
				arrayCorrect2[j] = data.field(0);
				if(j%5==4){
					//Ti.API.info(arrayImages3);
					//Ti.API.info(arrayNewWord2);
					arrayCorrect[i] = arrayCorrect2;
					arrayCorrect2 = [];
					i++;
					//Ti.API.info(arrayNewWord);
				}
				//setTimeout(function(){
					data.next();
				//}, 100);
				k++;
			}
			data.close();
			db.close();
			arrayCorrect2 = [];
			
			makeBoard(str);
		}
	};
	
	function changeKatakana(str) {
		if(Titanium.App.Properties.getString('moji')!='katakana' || mode=='test' || mode=='settings' || mode=='firstmail' || mode=='email'){
			//if(str=='settings' || str=='firstmail'){
			//	Titanium.App.Properties.setString('moji', str);
			//}else{
				Titanium.App.Properties.setString('moji', 'katakana');
			//}
			hiragana.color = '#000';
			hiragana.backgroundColor = '#fff';
			katakana.color = '#fff';
			katakana.backgroundColor = '#000';
			children = keyBaseView.getChildren();
			for(i=0; i<children.length; i++){
				if(children[i].val=='key' || children[i].val=='key2' || children[i].val=='key3' || children[i].val=='key4'){
					keyBaseView.remove(children[i]);
				}
			}
			arrayWords = [
				['ア', 'イ', 'ウ', 'エ', 'オ'],
				['カ', 'キ', 'ク', 'ケ', 'コ'],
				['サ', 'シ', 'ス', 'セ', 'ソ'],
				['タ', 'チ', 'ツ', 'テ', 'ト'],
				['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
				['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
				['マ', 'ミ', 'ム', 'メ', 'モ'],
				['ヤ', '', 'ユ', '', 'ヨ'],
				['ラ', 'リ', 'ル', 'レ', 'ロ'],
				['ワ', 'ヲ', 'ン', '、', '。']
			];
			arrayWords2 = ['ヤ', 'ユ', 'ヨ', 'ツ', '〝', '°', 'ー'];
			arrayWords3 = ['ャ', 'ュ', 'ョ', 'ッ', '゛', '゜', 'ー'];
			arrayWords4 = ['', '', '', '', '', '', ''];
			arrayWords5 = ['', '', '', '', '', '', ''];
			
			db = Ti.Database.open(Titanium.App.Properties.getString('template'));
			select = 'SELECT katakana FROM ' + Titanium.App.Properties.getString('template');
			//Ti.API.info(select);
			data = db.execute(select);
			k = 0;
			i = 0;
			while(data.isValidRow()){
				//Ti.API.info(k + '/' + data.field(0) + '/' + data.field(1) + '/' + data.field(2));
				j = k%5;
				arrayCorrect2[j] = data.field(0);
				if(j%5==4){
					//Ti.API.info(arrayImages3);
					//Ti.API.info(arrayNewWord2);
					arrayCorrect[i] = arrayCorrect2;
					arrayCorrect2 = [];
					i++;
					//Ti.API.info(arrayNewWord);
				}
				//setTimeout(function(){
					data.next();
				//}, 100);
				k++;
			}
			data.close();
			db.close();
			arrayCorrect2 = [];
			
			makeBoard(str);
		}
	};
	
	function changeAlphabet(str) {
		if(Titanium.App.Properties.getString('moji')!='alphabet' || str=='mailaddress'){
			Titanium.App.Properties.setString('moji', 'alphabet');
			hiragana.color = '#000';
			hiragana.backgroundColor = '#fff';
			katakana.color = '#000';
			katakana.backgroundColor = '#fff';
			children = keyBaseView.getChildren();
			for(i=0; i<children.length; i++){
				if(children[i].val=='key' || children[i].val=='key2' || children[i].val=='key3' || children[i].val=='key4'){
					keyBaseView.remove(children[i]);
				}
			}
			arrayWords = [
				['0', 'j', 't', '&', '}'],
				['9', 'i', 's', '$', '|'],
				['8', 'h', 'r', '#', '{'],
				['7', 'g', 'q', '!', '¥'],
				['6', 'f', 'p', 'z', '^'],
				['5', 'e', 'o', 'y', '?'],
				['4', 'd', 'n', 'x', '='],
				['3', 'c', 'm', 'w', '"'],
				['2', 'b', 'l', 'v', "'"],
				['1', 'a', 'k', 'u', '']
			];
			arrayWords2 = ['＠', '＊', '＋', '．', '＿', 'ー', ':'];
			arrayWords3 = ['@', '*', '+', '.', '_', '-', ':'];
			arrayWords4 = ['', '', '', '', '', '', ''];
			arrayWords5 = ['', '', '', '', '', '', ''];
			makeBoard(str);
		}
	};

	function makeBoard(val){
		//Ti.API.info('val: ' + val);
		//Titanium.App.Properties.setString('moji', val);
		if(val=='hiragana2' || val=='katakana2'){
			self.backgroundColor = '#ffc1ff';
			modeLabel.text = L('what_name');
			modeLabel.opacity = 1;
			speech0.startSpeaking({
				text:L('what_name2'),
				voice:speechLang,
				rate:0.1,
			});
		}else if(val=='settings'){
			self.backgroundColor = '#ffffc1';
			modeLabel.text = L('change_illust');
			modeLabel.opacity = 1;
				/*
			speech0.startSpeaking({
				text:L('change_illust2'),
				voice:speechLang,
				rate:0.1,
			});
		*/
		}else if(val=='mailaddress'){
			self.backgroundColor = '#c1ffff';
			modeLabel.text = L('enter_mailaddress');
			modeLabel.opacity = 1;
			speech0.startSpeaking({
				text:L('enter_mailaddress2'),
				voice:speechLang,
				rate:0.1,
			});
		}else if(val=='firstmail'){
			self.backgroundColor = '#c1c1ff';
			modeLabel.text = L('your_first_mail');
			modeLabel.opacity = 1;
			speech.startSpeaking({
				text:L('your_first_mail3'),
				voice:speechLang,
				rate:0.1,
			});
		}else{
			self.backgroundColor = '#fff';
			modeLabel.opacity = 0;
		}
		for(i=0; i<7; i++){
			keyView2 = Ti.UI.createView({
				key:i,
				val:'key2',
				val2:val
			});
			keyBaseView.add(keyView2);
			
			label2 = Ti.UI.createLabel({
				color:'#fff',
				backgroundColor:'gray',
				num:i,
				textAlign:'center',
				borderColor:'#000',
				borderWidth:1,
				correct:0,//firstmail
				val:'key2',
				val2:val
			});
			if(osname=='ipad'){
				keyView2.height = 60;
				keyView2.width = 100;
				keyView2.top = 0;
				keyView2.right = 100*i+300;
				label2.font = {fontSize:25 ,fontFamily:'Helvetica Neue', fontWeight:'bold'};
				label2.height = 56;
				label2.width = 96;
				label2.top = 2;
				label2.right = 2;
				label2.borderRadius = 10;
			}else{
				keyView2.height = 45;
				keyView2.width = width/10;
				keyView2.top = 0;
				keyView2.right = width*(3+i)/10;
				label2.font = {fontSize:15 ,fontFamily:'Helvetica Neue', fontWeight:'bold'};
				label2.height = 41;
				label2.width = width/10-4;
				label2.top = 2;
				label2.right = 2;
				label2.borderRadius = 5;
			}
			if(val=='settings'){
				label2.text = arrayWords4[i];
				label2.text2 = arrayWords5[i];
				if(arrayWords4[i]){
					keyView2.add(label2);
				}
			}else{
				label2.text = arrayWords2[i];
				label2.text2 = arrayWords3[i];
				if(arrayWords2[i]){
					keyView2.add(label2);
				}
			}
		}
		for(i=0; i<10; i++){
			for(j=0; j<5; j++){
				if(((val=='mailaddress') && (i==9 && j==4))){
					text = L('Enter');
				}else{
					text = arrayWords[i][j];
				}
				k = '' + i + j;
				keyView = Ti.UI.createView({
					color:'#000000',
					backgroundColor:arrayKeyColor[j*5][i],
					text:text,
					imageName:arrayImages[i][j],
					key:k,//for hintFunction
					word:arrayImages2[i][j],
				});
				
				label = Ti.UI.createLabel({
					text:text,
					text2:text,//firstmail
					textAlign:'center',
					color:'#000000',
					backgroundColor:'#fff',
					borderColor:'#000',
					borderWidth:1,
					state:0,
					imageName:arrayImages[i][j],
					//key:k,
					word:arrayImages2[i][j],
					correct:0,//firstmail
				});
				
				image = Ti.UI.createImageView({
					text:text,
					backgroundImage:'/assets/images/' + Titanium.App.Properties.getString('template') + '/' + arrayImages[i][j] + '.png',
					state:0,
					imageName:arrayImages[i][j],
					//key:k,
					word:arrayImages2[i][j],
					//borderColor:'#000',
					//borderWidth:1,
				});
				if(osname=='ipad'){
					keyView.height = 100;
					keyView.width = 100;
					keyView.top = 100*j+60;
					keyView.right = 100*i;
					label.font = {fontSize:25, fontFamily:'Helvetica Neue', fontWeight:'bold'};
					label.top = 5;
					label.left = 5;
					label.height = 40;
					label.width = 40;
					label.borderRadius = 20;
					image.height = 80;
					image.width = 80;
					image.bottom = 5;
					image.right = 5;
				}else{
					keyView.height = 45;
					keyView.width = width/10;
					keyView.top = 45*(j+1);
					keyView.right = width*i/10;
					label.font = {fontSize:15, fontFamily:'Helvetica Neue', fontWeight:'bold'};
					label.top = 2;
					label.left = 2;
					label.height = 20;
					label.width = 20;
					label.borderRadius = 10;
					image.height = 40;
					image.width = 40;
					image.bottom = 2;
					image.right = 2;
				}
				
				if(val=='mailaddress'){
					if(!(i==9 && j==4)){
						keyBaseView.add(keyView);
					}
					keyView.val = 'key3';
					label.val = 'key3';
					image.val = 'key3';
					keyView.val2 = val;
					label.val2 = val;
					image.val2 = val;
					keyView.backgroundColor = 'transparent';
					keyView.borderWidth = 0;
					
					if(StrCheck_az(text)){
						label.color = '#000000';
						label.backgroundColor = 'yellow';
					}else if(StrCheck_09(text)){
						label.color = '#000000';
						label.backgroundColor = 'blue';
					}else{
						label.color = '#fff';
						label.backgroundColor = 'gray';
					}
					if(osname=='ipad'){
						label.height = 90;
						label.width = 90;
						label.borderRadius = 45;
						label.font = {fontSize:60, fontFamily:'Helvetica Neue', fontWeight:'bold'};
					}else{
						label.top = 2.5;
						label.left = width/20-20;
						label.height = 40;
						label.width = 40;
						label.borderRadius = 20;
						label.font = {fontSize:25, fontFamily:'Helvetica Neue', fontWeight:'bold'};
					}
					
					if(text){
						keyView.add(label);
					}
					if(i==9 && j==4){
						image.backgroundImage = '/assets/images/check.png';
						image.opacity = 0.3;
						if(osname=='ipad'){
							image.height = 90;
							image.width = 90;
							label.height = 90;
							label.width = 90;
							label.borderRadius = 5;
							label.font = {fontSize:30, fontFamily:'Helvetica Neue', fontWeight:'bold'};
						}else{
							image.height = 40;
							image.width = 40;
							label.height = 40;
							label.top = 2.5;
							label.left = 2.5;
							label.width = width/10-5;
							label.borderRadius = 2;
							label.font = {fontSize:15, fontFamily:'Helvetica Neue', fontWeight:'bold'};
						}
						label.color = 'red';
						label.backgroundColor = 'pink';
						keyBaseView.add(keyView);
						keyView.add(image);
					}
				}else{
					if(!(i==9 && (j==3 || j==4))){
						keyBaseView.add(keyView);
					}
					keyView.borderColor = '#000';
					keyView.borderWidth = 3;
					//keyView.key = k;
					keyView.val = 'key';
					label.val = 'key';
					image.val = 'key';
					keyView.val2 = val;
					label.val2 = val;
					image.val2 = val;
					if(val=='settings'){
						if (arrayNewWord[i][j]) {
							image.backgroundImage = Titanium.Filesystem.applicationDataDirectory + Titanium.App.Properties.getString('template') + '/' + arrayImages[i][j] + '.png';
							
							closePhotoImage = Ti.UI.createImageView({
								text:text,
								image:'/assets/images/Close.png',
								right:0,
							});
							
							if(osname=='ipad'){
								closePhotoImage.height = 40,
								closePhotoImage.width = 40,
								closePhotoImage.bottom = 45;
							}else{
								closePhotoImage.height = 20,
								closePhotoImage.width = 20,
								closePhotoImage.bottom = 25;
							}
							
							keyView.add(image);
							if(text){
								keyView.add(label);
							}
							keyView.add(closePhotoImage);
							
							image.state = 1;
							label.state = 1;
						}else if(label.text!='、' && label.text!='。'){
							if(osname=='ipad'){
								image.height = 50;
								image.width = 50;
							}else{
								image.height = 25;
								image.width = 25;
							}
							keyView.add(image);
							if(text){
								keyView.add(label);
							}
						}
					}else{
						if (arrayNewWord[i][j]) {
							image.backgroundImage = Titanium.Filesystem.applicationDataDirectory + Titanium.App.Properties.getString('template') + '/' + arrayImages[i][j] + '.png';
						}
						if(val!='hiragana2' && val!='katakana2'){
							if(label.text=='、' || label.text=='。'){
								label.color = '#fff';
								label.backgroundColor = 'gray';
								if(osname=='ipad'){
									label.font = {fontSize:40, fontFamily:'Helvetica Neue', fontWeight:'bold'};
									label.borderRadius = 10;
									label.height = 60;
									label.width = 90;
									keyView.height = 70;
									if(label.text=='。'){
										keyView.top = keyView.top - 30;
									}
								}else{
									label.font = {fontSize:20, fontFamily:'Helvetica Neue', fontWeight:'bold'};
									label.borderRadius = 5;
									label.height = 26;
									label.width = width/10-4;
									keyView.height = 30;
									if(label.text=='。'){
										keyView.top = keyView.top - 15;
									}
								}
								keyView.backgroundColor = 'transparent';
								keyView.borderWidth = 0;
								keyView.val = 'key4';
								label.val = 'key4';
								image.val = 'key4';
								keyView.val2 = val;
								label.val2 = val;
								image.val2 = val;
								keyBaseView.add(keyView);
							}
							keyView.add(image);
							if(text){
								keyView.add(label);
							}
							if(val=='firstmail'){
								if(label.text==practiceStatement2.slice(0, 1)){
									label.backgroundColor = 'red';
									if(osname=='ipad'){
										label.height = 90;
										label.width = 90;
										label.borderRadius = 45;
										label.font = {fontSize:60, fontFamily:'Helvetica Neue', fontWeight:'bold'};
									}else{
										label.height = 40;
										label.width = 40;
										label.left = width/20-20,
										label.borderRadius = 20;
										label.font = {fontSize:25, fontFamily:'Helvetica Neue', fontWeight:'bold'};
									}
									label.correct = 1;
								}
							}
						}else{
							if(label.text!='、' && label.text!='。'){
								keyView.add(image);
								if(text){
									keyView.add(label);
								}
							}
						}
					}
				}
			}
		}
	}
	
	function textWrite(){
		textContent = textContent + text;
		textContent = replace(textContent);
		if(osname=='ipad'){
			if(textContent.length>39){
				textField.font = {fontSize:30 ,fontFamily:'Helvetica Neue', fontWeight:'bold'};
			}else if(textContent.length>9){
				textField.font = {fontSize:40 ,fontFamily:'Helvetica Neue', fontWeight:'bold'};
			}else{
				textField.font = {fontSize:80 ,fontFamily:'Helvetica Neue', fontWeight:'bold'};
			}
		}else{
			if(textContent.length>30){
				textField.font = {fontSize:12 ,fontFamily:'Helvetica Neue', fontWeight:'bold'};
			}else if(textContent.length>9){
				textField.font = {fontSize:20 ,fontFamily:'Helvetica Neue', fontWeight:'bold'};
			}else{
				textField.font = {fontSize:30 ,fontFamily:'Helvetica Neue', fontWeight:'bold'};
			}
		}
		textField.text = textContent;
		clearKey(text);//text== 、。のとき、？！に変換する
		if(text=='ー' || text=='っ' || text=='ょ' || text=='ゅ' || text=='ゃ'){
			speechText = textContent.slice(-2);
		}else{
			speechText = textContent.slice(-1);
		}
		speech.startSpeaking({
			text:speechText,
			voice:speechLang,
			rate:0.1,
		});
		if(questionImage.opacity!=0){
			questionImage.opacity = 0.3;
			//Ti.API.info(replaceHiragana(textContent) + '/' + questionImage.val);
			if(replaceHiragana(textContent)==questionImage.val){
				correctSound.play();
				questionImage.add(correctImage);
				num1 = questionImage.num1;
				num2 = questionImage.num2;
				num = 5*num1 + num2 + 1;
				arrayCorrect[num1][num2] = arrayCorrect[num1][num2] + 1;
				setTimeout(function(){
					speech.startSpeaking({
						text:textContent + L('is_correct'),
						voice:speechLang,
						rate:0.1,
					});
					makeCard(num1, num2, textContent, 'test');
					setTimeout(function(){
						if(arrayCorrect[num1][num2]==1){
							speech0.startSpeaking({
								text:L('new_card_get'),
								voice:speechLang,
								rate:0.1,
							});
							setTimeout(function(){fanfareSound.play();}, 3000);
						}
					}, 1500);
					db = Ti.Database.open(Titanium.App.Properties.getString('template'));
					update = 'UPDATE ' + Titanium.App.Properties.getString('template') + ' SET ' + Titanium.App.Properties.getString('moji') + ' = ' + arrayCorrect[num1][num2] + ' WHERE id = ' + num;
					db.execute(update);
					db.close();
				}, 1000);
			}
		} 
	}

	function eraserFunction() {
		Ti.API.info('eraser:mode: ' + mode);
		if(mode=='firstmail'){
			if(textContent.length>0){
				textContent = '';
				textField.text = '';
				textView.add(cursorImage);
			}
			changeHiragana('hiragana');
			children = mailImage.getChildren();
			mailImage.remove(children[0]);
			mode = '';
			everyLifeSound.stop();
			mailImage.state = 0;
		}else{
			if(textContent!=''){
				textView.add(cursorImage);
				textField.text = '';
				textContent = '';
				eraserSound.play();
			}
			if(questionImage.opacity!=0){
				questionImage.opacity = 1;
				children2 = questionImage.getChildren();
				for(i=0; i<children2.length; i++){
					questionImage.remove(children2[i]);
				}
				clearKey();
			}
		}
	};

	function hintFunction(str, str2){
		//Ti.API.info(str + '/' + str2);
		speech.startSpeaking({
			text:str + '。の。' + replaceRead(str2),
			voice:speechLang,
			rate:0.1,
		});
		if(str2=='。' || str2=='、' || str2=='？' || str2=='！'){
			decode = '' + decodeArray[str2][0] + decodeArray[str2][1];
			children = keyBaseView.getChildren();
			for(i=0; i<children.length; i++){
				if(children[i].val=='key4'){
					if(children[i].key==decode){
						children2 = children[i].getChildren();
						children2[1].backgroundColor = 'red';
						children2[1].correct = 1;
					}else{
						//Ti.API.info(i);
						children2 = children[i].getChildren();
						children2[1].backgroundColor = 'gray';
						children2[1].correct = 0;
					}
				}else if(children[i].val=='key'){
					children2 = children[i].getChildren();
					if(children2.length>1){
						children2[1].backgroundColor = '#fff';
						children2[1].correct = 0;
					}
				}else if(children[i].val=='key2'){
					children4 = children[i].getChildren();
					children4[0].backgroundColor = 'gray';
					children4[0].correct = 0;
				}
			}
		}else if(str2=='ゃ' || str2=='ゅ' || str2=='ょ' || str2=='っ' || str2=='゛' || str2=='゜' || str2=='ー'){
			decode = '' + decodeArray2[str2];
			children = keyBaseView.getChildren();
			for(i=0; i<children.length; i++){
				if(osname=='ipad'){
					if(children[i].val=='key4'){
						children2 = children[i].getChildren();
						if(children2.length>1){
							children2[1].backgroundColor = 'gray';
							children2[1].correct = 0;
						}
					}else if(children[i].val=='key'){
						children2 = children[i].getChildren();
						if(children2.length>1){
							children2[1].backgroundColor = '#fff';
							children2[1].correct = 0;
							children2[1].height = 40;
							children2[1].width = 40;
							children2[1].borderRadius = 20;
							children2[1].font = {fontSize:25, fontFamily:'Helvetica Neue', fontWeight:'bold'};
						}
					}else if(children[i].val=='key2'){
						if(children[i].key==decode){
							children2 = children[i].getChildren();
							children2[0].backgroundColor = 'red';
							children2[0].correct = 1;
						}else{
							children2 = children[i].getChildren();
							children2[0].backgroundColor = 'gray';
							children2[0].correct = 0;
						}
					}
				}else{//iphone
					if(children[i].val=='key4'){
						children2 = children[i].getChildren();
						if(children2.length>1){
							children2[1].backgroundColor = 'gray';
							children2[1].correct = 0;
						}
					}else if(children[i].val=='key'){
						children2 = children[i].getChildren();
						if(children2.length>1){
							children2[1].backgroundColor = '#fff';
							children2[1].correct = 0;
							children2[1].height = 20;
							children2[1].width = 20;
							children2[1].borderRadius = 10;
							children2[1].font = {fontSize:15, fontFamily:'Helvetica Neue', fontWeight:'bold'};
						}
					}else if(children[i].val=='key2'){
						if(children[i].key==decode){
							children2 = children[i].getChildren();
							children2[0].backgroundColor = 'red';
							children2[0].correct = 1;
						}else{
							children2 = children[i].getChildren();
							children2[0].backgroundColor = 'gray';
							children2[0].correct = 0;
						}
					}
				}
			}
		}else{
			decode = '' + decodeArray[str2][0] + decodeArray[str2][1];
			children = keyBaseView.getChildren();
			for(i=0; i<children.length; i++){
				if(osname=='ipad'){
					if(children[i].val=='key4'){
						children2 = children[i].getChildren();
						if(children2.length>1){
							children2[1].backgroundColor = 'gray';
							children2[1].correct = 0;
						}
					}else if(children[i].val=='key'){
						if(children[i].key==decode){
							children2 = children[i].getChildren();
							children2[1].backgroundColor = 'red';
							children2[1].height = 90;
							children2[1].width = 90;
							children2[1].borderRadius = 45;
							children2[1].font = {fontSize:60, fontFamily:'Helvetica Neue', fontWeight:'bold'};
							children2[1].correct = 1;
						}else{
							//Ti.API.info(i);
							children2 = children[i].getChildren();
							if(children2.length>1){
								children2[1].backgroundColor = '#fff';
								children2[1].height = 40;
								children2[1].width = 40;
								children2[1].borderRadius = 20;
								children2[1].font = {fontSize:25, fontFamily:'Helvetica Neue', fontWeight:'bold'};
								children2[1].correct = 0;
							}
						}
					}else if(children[i].val=='key2'){
						children4 = children[i].getChildren();
						children4[0].backgroundColor = 'gray';
						children4[0].correct = 0;
					}
				}else{//iphone
					if(children[i].val=='key4'){
						children2 = children[i].getChildren();
						if(children2.length>1){
							children2[1].backgroundColor = 'gray';
							children2[1].correct = 0;
						}
					}else if(children[i].val=='key'){
						if(children[i].key==decode){
							children2 = children[i].getChildren();
							children2[1].backgroundColor = 'red';
							children2[1].height = 40;
							children2[1].width = 40;
							children2[1].left = width/20-20,
							children2[1].borderRadius = 20;
							children2[1].font = {fontSize:25, fontFamily:'Helvetica Neue', fontWeight:'bold'};
							children2[1].correct = 1;
						}else{
							//Ti.API.info(i);
							children2 = children[i].getChildren();
							if(children2.length>1){
								children2[1].backgroundColor = '#fff';
								children2[1].height = 20;
								children2[1].width = 20;
								children2[1].borderRadius = 10;
								children2[1].font = {fontSize:15, fontFamily:'Helvetica Neue', fontWeight:'bold'};
								children2[1].correct = 0;
							}
						}
					}else if(children[i].val=='key2'){
						children4 = children[i].getChildren();
						children4[0].backgroundColor = 'gray';
						children4[0].correct = 0;
					}
				}
			}
		}
	}
	
	function clearKey(str){
		//Ti.API.info('str: ' + str);
		children3 = keyBaseView.getChildren();
		for(i=0; i<children3.length; i++){
			if(children3[i].val=='key4'){
				children4 = children3[i].getChildren();
				//Ti.API.info('text: ' + children4[1].text);
				if(children4.length>1){
					children4[1].backgroundColor = 'gray';
					children4[1].correct = 0;//firstmail
					if(str=='、'){
						if(children4[1].text=='、'){
							children4[1].text = '？';
							children4[1].text2 = '？';
							children4[1].backgroundColor = '#000';
						}else if(children4[1].text=='？'){
							children4[1].text = '、';
							children4[1].text2 = '、';
						}else if(children4[1].text=='！'){
							children4[1].text = '。';
							children4[1].text2 = '。';
						}
					}else if(str=='。'){
						if(children4[1].text=='。'){
							children4[1].text = '！';
							children4[1].text2 = '！';
							children4[1].backgroundColor = '#000';
						}else if(children4[1].text=='！'){
							children4[1].text = '。';
							children4[1].text2 = '。';
						}else if(children4[1].text=='？'){
							children4[1].text = '、';
							children4[1].text2 = '、';
						}
					}else{
						if(children4[1].text=='？'){
							children4[1].text = '、';
							children4[1].text2 = '、';
						}else if(children4[1].text=='！'){
							children4[1].text = '。';
							children4[1].text2 = '。';
						}
					}
				}
			}else if(children3[i].val=='key'){
				children4 = children3[i].getChildren();
				if(children4.length>1){
					children4[1].backgroundColor = '#fff';
					children4[1].correct = 0;//firstmail
					if(osname=='ipad'){
						children4[1].height = 40;
						children4[1].width = 40;
						children4[1].borderRadius = 20;
						children4[1].font = {fontSize:25, fontFamily:'Helvetica Neue', fontWeight:'bold'};
					}else{
						children4[1].height = 20;
						children4[1].width = 20;
						children4[1].borderRadius = 10;
						children4[1].font = {fontSize:15, fontFamily:'Helvetica Neue', fontWeight:'bold'};
					}
				}
			}else if(children3[i].val=='key2'){
				children4 = children3[i].getChildren();
				children4[0].backgroundColor = 'gray';
				children4[0].correct = 0;//firstmail
			}
		}
	}
	
	function firstmailFunction(e){
		if(replace2(textContent).length==1){
			textView.remove(cursorImage);
		}
		textContent2 = replace(textContent + e.source.text2);
		if(textContent2==practiceStatement){
			textContent = textContent2;
			textField.text = textContent;
			correctSound.play();
			textView.add(cursorImage);
			emailFunction();
			speech.startSpeaking({
				text:textContent2,
				voice:'ja-JP',
				rate:0.1,
			});
		}else if(e.source.correct==1){
			correctLetter = practiceStatement2.substr(textContent.length+1, 1);
			if(correctLetter=='？'){
				children3 = keyBaseView.getChildren();
				for(i=0; i<children3.length; i++){
					if(children3[i].val=='key4'){
						children4 = children3[i].getChildren();
						//Ti.API.info('text: ' + children4[1].text);
						if(children4.length>1){
							children4[1].backgroundColor = 'gray';
							if(children4[1].text=='、'){
								children4[1].text = '？';
								children4[1].text2 = '？';
							}
						}
					}
				}
			}else if(correctLetter=='！'){
				children3 = keyBaseView.getChildren();
				for(i=0; i<children3.length; i++){
					if(children3[i].val=='key4'){
						children4 = children3[i].getChildren();
						//Ti.API.info('text: ' + children4[1].text);
						if(children4.length>1){
							children4[1].backgroundColor = 'gray';
							if(children4[1].text=='。'){
								children4[1].text = '！';
								children4[1].text2 = '！';
							}
						}
					}
				}
			}
			textContent = textContent + e.source.text2;
			if(osname=='ipad'){
				if(textContent.length>39){
					textField.font = {fontSize:30 ,fontFamily:'Helvetica Neue', fontWeight:'bold'};
				}else if(textContent.length>9){
					textField.font = {fontSize:40 ,fontFamily:'Helvetica Neue', fontWeight:'bold'};
				}else{
					textField.font = {fontSize:80 ,fontFamily:'Helvetica Neue', fontWeight:'bold'};
				}
			}else{
				if(textContent.length>30){
					textField.font = {fontSize:12 ,fontFamily:'Helvetica Neue', fontWeight:'bold'};
				}else if(textContent.length>9){
					textField.font = {fontSize:20 ,fontFamily:'Helvetica Neue', fontWeight:'bold'};
				}else{
					textField.font = {fontSize:30 ,fontFamily:'Helvetica Neue', fontWeight:'bold'};
				}
			}
			textField.text = textContent2;
			
			speech.startSpeaking({
				text:textContent2,
				voice:'ja-JP',
				rate:0.1,
			});
			hintFunction(practiceStatement, correctLetter);
		}else{
			incorrectSound.play();
		}
	}
	
	function emailFunction(){
		speech.startSpeaking({
			text:L('tap_send_button'),
			voice:speechLang,
			rate:0.1,
		});
		
		emailDialog = Titanium.UI.createEmailDialog();

		// 1桁の数字を0埋めで2桁にする
		toDoubleDigits = function(num) {
			num += "";
			if (num.length === 1) {
				num = "0" + num;
			}
			return num;
		};

		// 日付をYYYY/MM/DD HH:DD:MI:SS形式で取得
		yyyymmddhhmiss = function() {
			date = new Date();
			yyyy = date.getFullYear();
			mm = toDoubleDigits(date.getMonth() + 1);
			dd = toDoubleDigits(date.getDate());
			hh = toDoubleDigits(date.getHours());
			mi = toDoubleDigits(date.getMinutes());
			ss = toDoubleDigits(date.getSeconds());
			return yyyy + mm + dd + '_' + hh + mi + ss;
		}();

		//　メールの題名
		emailDialog.setSubject(L('mojiban') + ': ' + L('from') +  Titanium.App.Properties.getString('userName') + L('yori'));
		// メールの宛先（宛先、Cc、Bcc）
		emailDialog.setToRecipients([mailAddress]);
		// メール本文;
		mailContent = L('dear') + ' ' + L(Titanium.App.Properties.getString('userFamily')) 
		+ L('he') + '\n' + textContent + '\n' + L('from') + ' ' + Titanium.App.Properties.getString('userName') + L('yori'); 
		emailDialog.setMessageBody(mailContent);
		//メール添付
		attachImage = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "userFace.png");
		if (attachImage.exists()) {
			emailDialog.addAttachment(attachImage);
		}else{
			attachImage = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, "/assets/images/userFace_default.png");
			emailDialog.addAttachment(attachImage);
		}
		
		// メール送信画面を起動
		emailDialog.open();
		
		emailDialog.addEventListener('complete', function(e){
			mailImage.state = 0;
			//Ti.API.info(JSON.stringify(e));
			// e.resultに以下の４つのいずれかが返る
			// ・Titanium.UI.EmailDialog.SENT
			// ・Titanium.UI.EmailDialog.SAVED
			// ・Titanium.UI.EmailDialog.CANCELED
			// ・Titanium.UI.EmailDialog.FAILED
			if(e.type=='complete'){
				textView.remove(backImage);
				everyLifeSound.stop();
				eraserFunction();
			}
			
			// 送信成功時にはe.success == trueが設定される
			if(e.success == false){
				// e.errorにエラー時のメッセージ
				alert(L('mail_not_send'));
				speech.startSpeaking({
					text:L('mail_not_send'),
					voice:speechLang,
					rate:0.1,
				});
			}
		});
		
		setTimeout(function(){
			textView.add(backImage);
		}, 1000);
	}
	
	function makeCard(num1, num2, textContent, gameMode){
		//Ti.API.info('gameMode: ' + gameMode);
		children3 = cardView.getChildren();
		if(gameMode=='test' && children3.length==1){//ゲームで正解したとき
			cardView.add(playImage);
			cardView.add(stopImage);
		}
		cardImage2.backgroundColor = arrayKeyColor[num2*5][num1];
		if(arrayNewWord[num1][num2]){//写真に変更していたとき
			cardImage3.image = Titanium.Filesystem.applicationDataDirectory + Titanium.App.Properties.getString('template') + '/' + arrayImages[num1][num2] + '.png';
		}else{
			cardImage3.image = '/assets/images/' + Titanium.App.Properties.getString('template') + '/' + arrayImages[num1][num2] + '.png';
		}
		cardLabel2.text = textContent;
		//Ti.API.info(arrayCorrect[num1][num2]);
		if(arrayCorrect[num1][num2]==0){
			cardView.backgroundImage = '';
			//cardLabel.text = arrayCorrect[num1][num2];
			cardLabel.color = 'transparent';
			cardLabel.backgroundColor = 'transparent';
			cardLabel.borderColor = 'transparent';
			setTimeout(function(){
				self.remove(cardView);
			}, 1000);
		}else if(arrayCorrect[num1][num2]==1){
			cardView.backgroundImage = '/assets/images/burst.png';
			burstInterval = setInterval(function(){
				if(cardView.backgroundImage=='/assets/images/burst.png'){
					cardView.backgroundImage = '/assets/images/burst2.png';
				}else{
					cardView.backgroundImage = '/assets/images/burst.png';
				}
			}, 500);
			cardLabel.text = 'NEW';
			cardLabel.color = '#fff';
			cardLabel.backgroundColor = 'red';
			cardLabel.borderColor = '#000';
			/*
			speech0.startSpeaking({
				text:L('new_card_get'),
				voice:speechLang,
				rate:0.1,
			});
			setTimeout(function(){fanfareSound.play();}, 3000);
			*/
			setTimeout(function(){
				cardView.backgroundImage = '';
				clearInterval(burstInterval);
			}, 6000);
		}else{
			cardView.backgroundImage = '';
			cardLabel.text = arrayCorrect[num1][num2];
			cardLabel.color = 'red';
			cardLabel.backgroundColor = 'transparent';
			cardLabel.borderColor = 'transparent';
		}
		self.add(cardView);
	}
	
	function gamePlay(){
		//すべて正解したかのチェック
		allCorrect = true;
		for(i=0; i<10; i++){
			for(j=0; j<5; j++){
				if((i==7 && (j==1 || j==3))||(i==9 && (j==3 || j==4))){
					//何もしない
				}else if(arrayCorrect[i][j]==0){
					allCorrect = false;
					i=10;
					j=5;
				}
			}
		}
		textContent = '';
		textField.text = '';
		children2 = questionImage.getChildren();
		for(i=0; i<children2.length; i++){
			questionImage.remove(children2[i]);
		}
		for(i=0; i<1;){//arrayImages[random10][random5]が存在するまでループ
			random5 = Math.floor( Math.random() * 5);//0-4
			random10 = Math.floor( Math.random() * 10);//0-9
			if(gameCount%3!=0 || allCorrect==true){
				if(arrayImages[random10][random5]){
					i++;
				}
				//Ti.API.info(gameCount + 'gameCount%3!=0');
			}else{
				if(arrayImages[random10][random5] && arrayCorrect[random10][random5]==0){
					i++;
					//Ti.API.info(gameCount + 'gameCount%3==0 未出題だったとき');
				}else{
					for(j=0; j<1;){//arrayImages[random10][random5]が存在するまでループ
						//Ti.API.info(gameCount + 'gameCount%3==0 未出題をさがす');
						random5 = Math.floor( Math.random() * 5);//0-4
						random10 = Math.floor( Math.random() * 10);//0-9
						if(arrayImages[random10][random5] && arrayCorrect[random10][random5]==0){
							j++;
						}	
					}
					i++;			
				}
			}
		}
		//test
		//random10 = 0;
		//random5 = 0;
		if(arrayNewWord[random10][random5]){
			questionImage.backgroundImage = Titanium.Filesystem.applicationDataDirectory + Titanium.App.Properties.getString('template') + '/' + arrayImages[random10][random5] + '.png';
			questionImage.val = arrayNewWord[random10][random5];
		}else{
			questionImage.backgroundImage = '/assets/images/' + Titanium.App.Properties.getString('template') + '/' + arrayImages[random10][random5] + '.png';
			questionImage.val = arrayImages2[random10][random5];
		}
		questionImage.num1 = random10;
		questionImage.num2 = random5;
		
		questionImage.opacity = 1;
		if(Ti.App.Properties.getString('moji')=='hiragana'){
			changeHiragana('hiragana2');
		}else{
			changeKatakana('katakana2');
		}
		gameCount++;
	}
	
	function gameStop(){
		tsudoiSound.stop();
		eraserFunction();
		testImage.state = 0;
		keyBaseView.add(katakana);
		keyBaseView.add(hiragana);
		testImage.remove(closeImage);
		self.add(settingsImage);
		self.remove(cardButton);
		clearKey();
		textView.remove(tipImage);
		textView.add(mailImage);
		questionImage.opacity = 0;
		children3 = cardView.getChildren();
		if(children3.length>1){
			for(i=1; i<children3.length; i++){
				cardView.remove(children3[i]);//playImage stopImage
			}
		}
		if(Ti.App.Properties.getString('moji')=='hiragana'){
			changeHiragana('hiragana');
		}else{
			changeKatakana('katakana');
		}
		mode = '';
	}
	
	function completeFunction(){
		//completeView
		completeView = Ti.UI.createView({
			//backgroundImage:'/assets/images/flame05_3.png',
			height:180,
			width:1000,
			top:8,
			right:12,
			//borderColor:'#000',
			//borderWidth:1,
			//borderRadius:50,
		});
		self.add(completeView);
		
		completeSound.play();
		if(Ti.App.Properties.getString('moji')=='hiragana'){
			speakText = L('complete_hiragana');
		}else{
			speakText = L('complete_katakana');
		}
		speech.startSpeaking({
			text:speakText,
			voice:speechLang,
			rate:0.1,
		});
		
		userImage = Titanium.UI.createImageView({
			image: '/assets/images/userFace_default.png',
			width:90,
			height:90,
			top:32,
		});
		completeView.add(userImage);
		
		file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'userFace.png');
		if(file.exists()){
			userImage.image = Titanium.Filesystem.applicationDataDirectory + 'userFace.png';
		}
		
		kingImage = Titanium.UI.createView({
			backgroundColor:'transparent',
			backgroundImage: '/assets/images/king.png',
			width:142,
			height:192.5,
		});
		completeView.add(kingImage);
	
		hand1 = Titanium.UI.createImageView({
			image: '/assets/images/hand1.png',
			bottom:0,
			left:200,
			opacity:0
		});
		completeView.add(hand1);
		
		hand2 = Titanium.UI.createImageView({
			image: '/assets/images/hand2.png',
			bottom:0,
			right:200,
			opacity:1.0
		});
		completeView.add(hand2);
		
		paper1 = Titanium.UI.createImageView({
			image: '/assets/images/kamifubuki1.png',
			top:0,
			right:300,
			opacity:0
		});
		completeView.add(paper1);
		
		paper2 = Titanium.UI.createImageView({
			image: '/assets/images/kamifubuki2.png',
			top:0,
			left:300,
			opacity:1.0
		});
		completeView.add(paper2);
		
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
		
		
		setTimeout(function(){
			clearInterval(Timer1);
			clearInterval(Timer2);
			self.remove(completeView);
		}, 40000);
	}
	
	function replace(val){
		//Ti.API.info('before: ' + val);
		val = val.replace(/か゛/g, 'が');
		val = val.replace(/き゛/g, 'ぎ');
		val = val.replace(/く゛/g, 'ぐ');
		val = val.replace(/け゛/g, 'げ');
		val = val.replace(/こ゛/g, 'ご');
		val = val.replace(/さ゛/g, 'ざ');
		val = val.replace(/し゛/g, 'じ');
		val = val.replace(/す゛/g, 'ず');
		val = val.replace(/せ゛/g, 'ぜ');
		val = val.replace(/そ゛/g, 'ぞ');
		val = val.replace(/た゛/g, 'だ');
		val = val.replace(/ち゛/g, 'ぢ');
		val = val.replace(/つ゛/g, 'づ');
		val = val.replace(/て゛/g, 'で');
		val = val.replace(/と゛/g, 'ど');
		val = val.replace(/は゛/g, 'ば');
		val = val.replace(/ひ゛/g, 'び');
		val = val.replace(/ふ゛/g, 'ぶ');
		val = val.replace(/へ゛/g, 'べ');
		val = val.replace(/ほ゛/g, 'ぼ');
		val = val.replace(/は゜/g, 'ぱ');
		val = val.replace(/ひ゜/g, 'ぴ');
		val = val.replace(/ふ゜/g, 'ぷ');
		val = val.replace(/へ゜/g, 'ぺ');
		val = val.replace(/ほ゜/g, 'ぽ');
		
		val = val.replace(/カ゛/g, 'ガ');
		val = val.replace(/キ゛/g, 'ギ');
		val = val.replace(/ク゛/g, 'グ');
		val = val.replace(/ケ゛/g, 'ゲ');
		val = val.replace(/コ゛/g, 'ゴ');
		val = val.replace(/サ゛/g, 'ザ');
		val = val.replace(/シ゛/g, 'ジ');
		val = val.replace(/ス゛/g, 'ズ');
		val = val.replace(/セ゛/g, 'ゼ');
		val = val.replace(/ソ゛/g, 'ゾ');
		val = val.replace(/タ゛/g, 'ダ');
		val = val.replace(/チ゛/g, 'ヂ');
		val = val.replace(/ツ゛/g, 'ヅ');
		val = val.replace(/テ゛/g, 'デ');
		val = val.replace(/ト゛/g, 'ド');
		val = val.replace(/ハ゛/g, 'バ');
		val = val.replace(/ヒ゛/g, 'ビ');
		val = val.replace(/フ゛/g, 'ブ');
		val = val.replace(/ヘ゛/g, 'ベ');
		val = val.replace(/ホ゛/g, 'ボ');
		val = val.replace(/ハ゜/g, 'パ');
		val = val.replace(/ヒ゜/g, 'ピ');
		val = val.replace(/フ゜/g, 'プ');
		val = val.replace(/ヘ゜/g, 'ペ');
		val = val.replace(/ホ゜/g, 'ポ');
		val = val.replace(/、？/g, '？');
		val = val.replace(/。！/g, '！');
		//Ti.API.info('after: ' + val);
		
		return val;
	}
	
	function replace2(val){
		//Ti.API.info('before: ' + val);
		val = val.replace(/が/g, 'か゛');
		val = val.replace(/ぎ/g, 'き゛');
		val = val.replace(/ぐ/g, 'く゛');
		val = val.replace(/げ/g, 'け゛');
		val = val.replace(/ご/g, 'こ゛');
		val = val.replace(/ざ/g, 'さ゛');
		val = val.replace(/じ/g, 'し゛');
		val = val.replace(/ず/g, 'す゛');
		val = val.replace(/ぜ/g, 'せ゛');
		val = val.replace(/ぞ/g, 'そ゛');
		val = val.replace(/だ/g, 'た゛');
		val = val.replace(/ぢ/g, 'ち゛');
		val = val.replace(/づ/g, 'つ゛');
		val = val.replace(/で/g, 'て゛');
		val = val.replace(/ど/g, 'と゛');
		val = val.replace(/ば/g, 'は゛');
		val = val.replace(/び/g, 'ひ゛');
		val = val.replace(/ぶ/g, 'ふ゛');
		val = val.replace(/べ/g, 'へ゛');
		val = val.replace(/ぼ/g, 'ほ゛');
		val = val.replace(/ぱ/g, 'は゜');
		val = val.replace(/ぴ/g, 'ひ゜');
		val = val.replace(/ぷ/g, 'ふ゜');
		val = val.replace(/ぺ/g, 'へ゜');
		val = val.replace(/ぽ/g, 'ほ゜');
		
		val = val.replace(/ガ/g, 'カ゛');
		val = val.replace(/ギ/g, 'キ゛');
		val = val.replace(/グ/g, 'ク゛');
		val = val.replace(/ゲ/g, 'ケ゛');
		val = val.replace(/ゴ/g, 'コ゛');
		val = val.replace(/ザ/g, 'サ゛');
		val = val.replace(/ジ/g, 'シ゛');
		val = val.replace(/ズ/g, 'ス゛');
		val = val.replace(/ゼ/g, 'セ゛');
		val = val.replace(/ゾ/g, 'ソ゛');
		val = val.replace(/ダ/g, 'タ゛');
		val = val.replace(/ヂ/g, 'チ゛');
		val = val.replace(/ヅ/g, 'ツ゛');
		val = val.replace(/デ/g, 'テ゛');
		val = val.replace(/ド/g, 'ト゛');
		val = val.replace(/バ/g, 'ハ゛');
		val = val.replace(/ビ/g, 'ヒ゛');
		val = val.replace(/ブ/g, 'フ゛');
		val = val.replace(/ベ/g, 'ヘ゛');
		val = val.replace(/ボ/g, 'ホ゛');
		val = val.replace(/パ/g, 'ハ゜');
		val = val.replace(/ピ/g, 'ヒ゜');
		val = val.replace(/プ/g, 'フ゜');
		val = val.replace(/ペ/g, 'ヘ゜');
		val = val.replace(/ポ/g, 'ホ゜');
		//val = val.replace(/？/g, '、？');
		//val = val.replace(/！/g, '。！');
		//Ti.API.info('after: ' + val);
		
		return val;
	}
	
	function replaceRead(val){
		switch(val){
			case 'ゃ':
			val = '小さい。や';
			break;
			case 'ゅ':
			val = '小さい。ゆ';
			break;
			case 'ょ':
			val = '小さい。よ';
			break;
			case 'ゃ':
			val = '小さい。や';
			break;
			case 'っ':
			val = '小さい。つ';
			break;
			case '゛':
			val = 'てんてん';
			break;
			case '゜':
			val = 'まる';
			break;
			case 'ー':
			val = 'のばし棒';
			break;
			default:
			break;
		}
		
		return val;
	}
	// カタカナ変換
	function replaceKatakana(val){
		val = val.replace(/[ぁ-ん]/g, function(s) {
			return String.fromCharCode(s.charCodeAt(0) + 0x60);
		});
		return val;
	}
	// ひらがな変換
	function replaceHiragana(val){
		val = val.replace(/[ァ-ン]/g, function(s) {
			return String.fromCharCode(s.charCodeAt(0) - 0x60);
		});
		return val;
	}
	
	function StrCheck_az(strSrc) 
	{ 
		return /^[a-zA-Z]+$/.test(strSrc);
	}
	
	function StrCheck_09(strSrc) 
	{ 
		return /^[0-9]+$/.test(strSrc);
	}
	
	function StrCheck_hiragana(strSrc) 
	{ 
		return /^[\u3040-\u309Fー]+$/.test(strSrc);
	}
	
	function StrCheck_adress(strSrc) 
	{ 
		return /^[A-Za-z0-9]+[\w._-]+@[\w\.-]+\.\w{2,}$/.test(strSrc);
	}

	return self;
}

module.exports = FirstView;
