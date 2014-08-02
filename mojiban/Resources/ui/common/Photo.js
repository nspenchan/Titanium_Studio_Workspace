//FirstView Component Constructor
function Photo(win, from, word, text, imageName, defaultImage, speech0, firstMailTable, incorrectSound, changeHiragana, StrCheck_hiragana, 
	decodeArray, arrayNewWord, replaceHiragana, replaceKatakana, dakutenArray, replace2) {
		
	var blob, f, forward, image, imageView, keyLabel, keyView, label, label2, label3, pHeight, pWidth, 
	self, shift_x, shift_y, shutter, textArea, undoImage, coverView, height, width, osname, speechLang, 
	newImageView;
	
	height = Ti.Platform.displayCaps.platformHeight,
	width = Ti.Platform.displayCaps.platformWidth,
	osname = Ti.Platform.osname;
	
	shutter = Titanium.Media.createSound({
		// リモートURLも指定できます
		// url : "http://www.nch.com.au/acm/8kmp38.wav"
		url: '/assets/sound/se-033.mp3',
		looping : false,
	});
	
	if(Ti.Platform.locale=='ja'){
		speechLang = 'ja-JP';
	}else{
		speechLang = 'en-US';
	}
	
	//create object instance, a parasitic subclass of Observable
	self = Ti.UI.createView({
		backgroundColor:'transparent',//'#c1c1ff',
	});
	//Titanium.UI.iPhone.hideStatusBar();
	
	coverView = Ti.UI.createView({
		backgroundColor:'#c1c1ff',
		opacity:0.9,
	});
	self.add(coverView);

	speech0.startSpeaking({
		text:L('select_photo_') + text + L('from_photo_library'),
		voice:speechLang,
		rate:0.1,
	});
	
	undoImage = Ti.UI.createImageView({
		image:'/assets/images/Undo.png',
	});
	
	undoImage.addEventListener('click', function(e) {
		win.remove(self);
	});
	
	label = Ti.UI.createLabel({
		color:'#000000',
		backgroundColor:'#fff',
		text:text,
		textAlign:'center',
		borderColor:'#000',
		borderWidth:1,
	});
	
	label2 = Ti.UI.createLabel({
		width:width,
		color:'#000000',
		backgroundColor:'transparent',
		text:L('select_photo_') + text + L('from_photo_library'),
		textAlign:'center',
	});
			
	label3 = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'#fff',
		text:L('Saved'),
		textAlign:'center',
		opacity:0.7,
	});
	
	keyLabel = Ti.UI.createLabel({
		text:word,
		textAlign:'center',
		color:'#000000',
		backgroundColor:'#fff',
		borderColor:'#000',
		borderWidth:1,
	});
	
	self.add(keyLabel);
	
	keyView = Ti.UI.createView({
		color:'#000000',
		borderColor:'#000',
		borderWidth:1,
	});
	
	image = Ti.UI.createImageView({
		//image:'/assets/images/' + Titanium.App.Properties.getString('template') + '/' + imageName + '.png',
		//borderColor:'#000',
		//borderWidth:1,
	});
	
	if(from=='Tools'){
		image.image = defaultImage.image;
	}else{
		image.image = '/assets/images/' + Titanium.App.Properties.getString('template') + '/' + imageName + '.png';
	}
			
	newImageView = Ti.UI.createImageView({
		borderColor:'#000',
		borderWidth:1,
	});
	
	forward = Ti.UI.createImageView({
		backgroundImage:'/assets/images/Forward.png',
	});
	
	textArea = Ti.UI.createTextArea({
		color: '#000',
		backgroundColor:'#fff',
		keyboardType: Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType: Ti.UI.RETURNKEY_GO,
		textAlign: 'center',
	});
	
	if(osname=='ipad'){
		if(from=='Tools'){
			label.width = 500;
		}else{
			label.width = 60;
		}
		label.top = 5,
		label.height = 60,
		label.borderRadius = 30,
		undoImage.height = 80,
		undoImage.width = 80,
		undoImage.top = 20,
		undoImage.left = 40,
		label.font = {fontSize:35, fontFamily:'Helvetica Neue', fontWeight:'bold'},
		label2.bottom = 100,
		label2.height = 100,
		//label2.borderRadius = 30,
		label2.font = {fontSize:30, fontFamily:'Helvetica Neue', fontWeight:'bold'},
		label3.bottom = 10,
		label3.right = 10,
		label3.width = 100,
		label3.height = 30,
		label3.font = {fontSize:20,fontFamily:'Helvetica Neue'},
		keyLabel.height = 80,
		keyLabel.width = 300,
		keyLabel.top = 120,
		keyLabel.right = width/2+192,
		keyLabel.font = {fontSize:25, fontFamily:'Helvetica Neue', fontWeight:'bold'},
		keyView.height = 300,
		keyView.width = 300,
		keyView.top = 200,
		keyView.right = width/2+192,
		image.height = 290,
		image.width = 290,
		image.top = 5,
		image.right = 5,
		newImageView.width = 300,
		newImageView.height = 300,
		newImageView.top = 200,
		newImageView.left = width/2+192,
		forward.height = 64,
		forward.width = 64,
		forward.top = 198,
		textArea.top = 120,
		textArea.left = width/2+192,
		textArea.width = 300, 
		textArea.height = 80,
		textArea.font = {fontSize:25, fontWeight:'bold'};
	}else{
		if(from=='Tools'){
			label.width = 200;
		}else{
			label.width = 26;
		}
		label.top = 5,
		label.height = 26,
		label.borderRadius = 13,
		undoImage.height = 40,
		undoImage.width = 40,
		undoImage.top = 10,
		undoImage.left = 20,
		label.font = {fontSize:15, fontFamily:'Helvetica Neue', fontWeight:'bold'},
		label2.bottom = 42,
		label2.height = 42,
		//label2.borderRadius = 30,
		label2.font = {fontSize:13, fontFamily:'Helvetica Neue', fontWeight:'bold'},
		label3.bottom = 10,
		label3.right = 10,
		label3.width = 42,
		label3.height = 12,
		label3.font = {fontSize:13,fontFamily:'Helvetica Neue'},
		keyLabel.height = 33,
		keyLabel.width = 150,
		keyLabel.top = 68,
		keyLabel.right = width/2+55,
		keyLabel.font = {fontSize:10, fontFamily:'Helvetica Neue', fontWeight:'bold'},
		keyView.height = 150,
		keyView.width = 150,
		keyView.top = 101,
		keyView.right = width/2+55,
		image.height = 144,
		image.width = 144,
		image.top = 3,
		image.right = 3,
		newImageView.width = 150,
		newImageView.height = 150,
		newImageView.top = 101,
		newImageView.left = width/2+55,
		forward.height = 40,
		forward.width = 46,
		forward.top = 147,
		textArea.top = 68,
		textArea.left = width/2+55,
		textArea.width = 150, 
		textArea.height = 33,
		textArea.font = {fontSize:10, fontWeight:'bold'};
	}
	
	self.add(undoImage);
	self.add(label);
	self.add(label2);
	self.add(keyView);
	keyView.add(image);
	self.add(forward);
	
	Titanium.Media.openPhotoGallery({
		success : function(event) {
			shutter.play();
			//alert('pictures:' + count1);
			pHeight = event.media.height;
			pWidth = event.media.width;
			Ti.API.error('x:' + pWidth +'/y:' + pHeight);
			if(pWidth>=pHeight){
				shift_x = (pWidth-pHeight)/2;
				blob = event.media.imageAsCropped({x:shift_x, y:0, width:pHeight, height:pHeight});	
			}else if(pWidth<pHeight){
				shift_y = (pHeight-pWidth)/2;
				blob = event.media.imageAsCropped({x:0, y:shift_y, width:pWidth, height:pWidth});	
			}
			//blob.imageAsResized(160, 160);
			/*
			// アプリケーションデータディレクトリに出力する。
			f = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, imageName + ".png");
			if (!f.exists()) {
				f.createFile();
			}
			f.write(blob);
			*/
			
			self.remove(label2);
			
			newImageView.image = blob;
			self.add(newImageView);
			
			self.add(label3);
			
			if(from=='Tools'){
				textArea.value = word,
				textArea.borderColor = '#000',
				textArea.borderWidth = 1;
				
				self.add(textArea);
				
				speech0.startSpeaking({
					text:L('Saved'),
					voice:speechLang,
					rate:0.1,
				});
				
				defaultImage.image = blob;
				
				section = firstMailTable.data[0];
				children = section.rows[1].getChildren();
				children[0].image = blob;
				
				setTimeout(function(){
					blob = blob.imageAsResized(160,160);
					f = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, imageName + ".png");
					if (!f.exists()) {
						f.createFile();
					}
					f.write(blob);
					win.remove(self);
				}, 1000);

			}else{//from=='FIrstView'
				textArea.borderWidth =  3,
				textArea.borderColor =  'red',
				textArea.borderRadius =  5,
				textArea.verticalAlign = Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
				textArea.value =  L('enter_name_hiragana'),
				textArea.center = 40;

				interval = setInterval(function(){
					if(textArea.backgroundColor=='#fff'){
						textArea.backgroundColor = 'pink';
					}else{
						textArea.backgroundColor = '#fff';
					}
				}, 500);

				self.add(textArea);

				textArea._hintText = textArea.value;

				textArea.addEventListener('focus',function(e){
					if(e.source.value == e.source._hintText){
						e.source.value = "";
					}
					clearInterval(interval);
					setTimeout(function(){
						textArea.backgroundColor = '#fff';
					}, 500);
				});
				textArea.addEventListener('blur',function(e){
					if(e.source.value==""){
						e.source.value = e.source._hintText;
					}
					interval = setInterval(function(){
						if(textArea.backgroundColor=='#fff'){
							textArea.backgroundColor = 'pink';
						}else{
							textArea.backgroundColor = '#fff';
						}
					}, 500);
				});

				textArea.addEventListener('change',function(e){
					Ti.API.info('change fired, value = ' + e.value + '\nfield value = ' + textArea.value);
					word = e.value;
				});
				textArea.addEventListener('return',function(e){
					blob = blob.imageAsResized(320, 320);
		            var directory = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, Titanium.App.Properties.getString('template'));
		            if(!directory.exists()) {
		            	    directory.createDirectory();
		            }
					// アプリケーションデータディレクトリに出力する。
					f = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, Titanium.App.Properties.getString('template') + '/' + imageName + ".png");
					if (!f.exists()) {
						f.createFile();
					}
					f.write(blob);
					Ti.API.info('return fired, value = ' + e.value);
					word = e.value;
					word = replaceHiragana(word);
					wordTop = word.slice(0, 1);
					if(dakutenArray.indexOf(wordTop)!=-1){//濁点付きでない
						wordTop = replace2(wordTop).slice(0, 1);
					}
					if(StrCheck_hiragana(word)){
						if(text == wordTop){
							Ti.API.info(text + ' / ' + word);
							Titanium.App.Properties.setString(imageName, word);
							//Ti.API.info(imageName + ' set ' + Titanium.App.Properties.getString(imageName));
							l = decodeArray[imageName][0];
							m = decodeArray[imageName][1];
							num = 5*l + m + 1;
							Ti.API.info(l + ' / ' + m + ' / ' + word);
							//Ti.API.info(arrayImages2[0][0]);
							arrayNewWord[l][m] = word;
							//Ti.API.info(arrayImages2[0][0]);
							alert(L('photo_') + text + L('has_been_registered_the_name_of_') + word + L('photo_2'));
							win.remove(self);
							speech0.startSpeaking({
								text:L('photo_') + text + L('has_been_registered_the_name_of_') + word + L('photo_2'),
								voice:speechLang,
								rate:0.1,
							});
							db = Ti.Database.open(Titanium.App.Properties.getString('template'));
							update = 'UPDATE ' + Titanium.App.Properties.getString('template') + ' SET hiragana = 0, katakana = 0, newword = "' + word + '" WHERE id = ' + num;
							db.execute(update);
							db.close();
							setTimeout(function(){
								changeHiragana('settings');
							}, 500);
						}else{
							alert(L('please_enter_a_name_starting_with') + text + L('starting_with'));
							incorrectSound.play();
							speech0.startSpeaking({
								text:L('please_enter_a_name_starting_with') + text + L('starting_with'),
								voice:speechLang,
								rate:0.1,
							});
							textArea.value = '';
						}
					}else{
						alert('all_hiragana');
						incorrectSound.play();
						textArea.value = '';
					}
				});

				speech0.startSpeaking({
					text:L('enter_name_hiragana2'),
					voice:speechLang,
					rate:0.1,
				});
			}
		},
		error : function(error) {
		},
		cancel : function() {
			// キャンセル時の挙動
			win.remove(self);
		},
		// 選択直後に拡大縮小移動をするか否かのフラグ
		allowEditing : true,
		// 選択可能なメディア種別を配列で指定
		mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
	});

	return self;
}

module.exports = Photo;
