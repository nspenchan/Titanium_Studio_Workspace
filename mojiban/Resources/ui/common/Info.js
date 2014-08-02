function Info(win, title, bgColor, speech0) {
	if(Ti.Platform.locale=='ja'){
		var filename = 'index_ja';
	}else{
		var filename = 'index_en';
	}
	var top = 0;
	
	var rows = [],
	rows2 = [],
	rows3 = [],
	arrayTitle = ['userName', 'userSex', 'userFace', 'userFamily', 'userFamilyEmail', 'About', 'Template', 'Contact'],
	arrayLeft = ['tag.png', 'Favorite.png', '', 'family.jpg', 'Mail.png', 'Info.png', 'Template.png', 'Help.png'],
	arrayTitle2 = ['boy', 'girl'],
	arrayTitle3 = ['mama', 'papa', 'grandpa', 'grandma'];
	
	if(Ti.Platform.osname=='android'){
		var osname = Ti.Platform.osname,
		height = Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor,
		width = Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor;
	}else{
		var osname = Ti.Platform.osname,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	}
	//create object instance, a parasitic subclass of Observable
	self = Ti.UI.createView({
		backgroundColor:'#000',
	});
	
	function scale(dimension) {
		return Math.round(dimension *  Ti.App.Properties.getDouble('osZoom') * Ti.Platform.displayCaps.platformWidth / 320);
	}
	
	view = Titanium.UI.createView({
		width:Ti.UI.FILL,
		height:scale(60),
		top:top,
	});
	self.add(view);
	
	label = Titanium.UI.createLabel({
		color:'#fff',
		backgroundColor:bgColor,
		text:L(title),
		font:{fontSize:scale(25),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'center',
		width:Ti.UI.FILL,
		height:scale(60),
		top:top,
	});
	view.add(label);
	
	if(scale(90)>width/2-10){
		buttonWidth = width/2-10;
	}else{
		buttonWidth = scale(90);
	}
	
	back = Ti.UI.createButton({
		color:'#fff',
		backgroundColor:bgColor,
		backgroundImage: '/assets/images/gray300x300_0.4.png',
		title: L('Back'),
		font:{fontSize:scale(20),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:scale(60),
		width:buttonWidth,
		left:scale(0),
		borderColor:'#002400',
		borderWidth:scale(1),
		opacity:1,
	});
	view.add(back);
	
	back.addEventListener('click', function(e){
		setTimeout(function(){
			win.remove(self);
		}, 100);
	});
	
	for(i=0; i<arrayTitle.length; i++){
		var row = Ti.UI.createTableViewRow({
			height:scale(60),
			backgroundColor:'white',
			hasChild:true,
		});
		
		var leftImage = Titanium.UI.createImageView({
			image: '/assets/images/' + arrayLeft[i],
			left:scale(10),
			width:scale(50),
			height:scale(50),
		});
		row.add(leftImage);
		
		var label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:L(arrayTitle[i]),
			font:{fontSize:scale(30),fontFamily:'Helvetica Neue'},
			textAlign:'left',
			width:width-scale(100),
			left:scale(80),
			//opacity:0.7,
		});
		row.add(label);
		if(i==1){
			for(j=0; j<arrayTitle2.length; j++){
				var checkMarkImage = Titanium.UI.createImageView({
					image: '/assets/images/check-non_2.gif',
					left:scale(300)+scale(240)*j,
					width:scale(50),
					height:scale(50),
					val:arrayTitle2[j],
				});
				row.add(checkMarkImage);
				
				if(Titanium.App.Properties.getString('userSex')==arrayTitle2[j]){
					checkMarkImage.image = '/assets/images/check_2.gif';
				}
				
				var familyImage = Titanium.UI.createImageView({
					image: '/assets/images/' + arrayTitle2[j] + '.jpg',
					left:scale(350)+scale(240)*j,
					width:scale(50),
					height:scale(50),
					val:arrayTitle2[j],
				});
				row.add(familyImage);
			}
		}else if(i==2){
			var userFaceImage = Titanium.UI.createImageView({
				image: '/assets/images/userFace_default.png',
				left:scale(10),
				width:scale(50),
				height:scale(50),
			});
			var f = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "userFace.png");
			if (f.exists()) {
				userFaceImage.image = Titanium.Filesystem.applicationDataDirectory + "userFace.png";
			}
			row.add(userFaceImage);
		}else if(i==3){
			row.hasChild = false;
			for(j=0; j<arrayTitle3.length; j++){
				var checkMarkImage = Titanium.UI.createImageView({
					image: '/assets/images/check-non_2.gif',
					left:scale(300)+scale(120)*j,
					width:scale(50),
					height:scale(50),
					val:arrayTitle3[j],
				});
				row.add(checkMarkImage);
				
				if(Titanium.App.Properties.getString('userFamily')==arrayTitle3[j]){
					checkMarkImage.image = '/assets/images/check_2.gif';
				}
				var familyImage = Titanium.UI.createImageView({
					image: '/assets/images/' + arrayTitle3[j] + '.jpg',
					left:scale(350)+scale(120)*j,
					width:scale(50),
					height:scale(50),
					val:arrayTitle3[j],
				});
				row.add(familyImage);
			}
		}else if(i==0 || i==4){
			row.hasChild = false;
			var tf1 = Titanium.UI.createTextField({
				color:'#336699',
				//backgroundColor:'pink',
				tintColor:'#000',
				font:{fontSize:scale(30),fontFamily:'Helvetica Neue'},
				//top:scale(10),
				right:scale(30),
				width:scale(400),
				height:scale(50),
				borderColor:'#000',
				borderWidth:scale(1),
				borderRadius:scale(10),
				value:Ti.App.Properties.getString(arrayTitle[i]),
				keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
				returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
				//borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
				val:arrayTitle[i],
			});
			if(!tf1.value){
				tf1.value = L('please_enter');
			}
			//Ti.API.info('value: ' + Ti.App.Properties.getString(arrayTitle[i]));
			row.add(tf1);
			// TEXT FIELD EVENTS (return, focus, blur, change)
			tf1.addEventListener('return',function(e){
				Ti.App.Properties.setString(e.source.val, e.value);
			});
			
			tf1.addEventListener('focus', function(e) {
				Ti.API.info('value: ' + e.source.value + '/val: ' + e.source.val + '/this.value: ' + this.value );
				if ( this.value == Ti.App.Properties.getString(e.source.val) || this.value == L('please_enter')) {
					this.value = '';
				}
			});
			
			tf1.addEventListener('blur', function(e) {
				if ( !this.value) {
					if(Ti.App.Properties.getString(e.source.val)){
						this.value = Ti.App.Properties.getString(e.source.val);
					}else{
						this.value = L('please_enter');
					}
				}
			});
		}
		
		rows.push(row);
	}
	
	//final Row
	rowFinal = Ti.UI.createTableViewRow({
		height:scale(60),
		backgroundColor:bgColor,
		bottom:0,
		//hasChild:true,
	});
	rows.push(rowFinal);
	
	line = Ti.UI.createView({
		height:scale(2),
		backgroundColor:'#000',
		top:0,
		//hasChild:true,
	});
	rowFinal.add(line);
	
	leftImage = Titanium.UI.createImageView({
		image: '/assets/images/nspenchan_logo_114.png',
		width:scale(48),
		height:scale(48),
		left:0,
	});
	rowFinal.add(leftImage);
	
	label = Titanium.UI.createLabel({
		color:'#fff',
		backgroundColor:'transparent',
		text:L('Developed_by_nspenchan'),
		font:{fontSize:scale(18),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'left',
		width:width-scale(60),
		height:'auto',
		left:scale(60),
		//opacity:0.7,
	});
	rowFinal.add(label);
	
	tableview = Titanium.UI.createTableView({top:top+scale(60),zIndex:0});
	
	tableview.addEventListener('click', function(e){
		Ti.API.info(JSON.stringify(e));
		//eventオブジェクト
		var index = e.index; 
		switch(index){
			case 1:
			if(Titanium.App.Properties.getString('userSex')!=e.source.val){
				var children = e.row.getChildren();
				Titanium.App.Properties.setString('userSex', e.source.val);
				Ti.API.info(children[2].val + '/' + e.source.val);
				if(children[2].val==e.source.val){
					children[2].image = '/assets/images/check_2.gif';
					children[4].image = '/assets/images/check-non_2.gif';
				}else{
					children[2].image = '/assets/images/check-non_2.gif';
					children[4].image = '/assets/images/check_2.gif';
				}
			}
			break;
			case 2:
			text = L('userFace');
			imageName = 'userface';
				//Ti.API.info(k);
				word = Titanium.App.Properties.getString('userName');
				from = 'Info';
				defaultImage = userFaceImage;//使わない
				var Photo = require('ui/common/Photo');
				//construct UI
				var photo = new Photo(win, from, word, text, imageName, defaultImage, speech0);
				win.add(photo);
				break;
				case 3:
				if(Titanium.App.Properties.getString('userFamily')!=e.source.val){
					var children = e.row.getChildren();
					Titanium.App.Properties.setString('userFamily', e.source.val);
					Ti.API.info(children[2].val + '/' + e.source.val);
					switch(e.source.val){
						case 'mama':
						children[2].image = '/assets/images/check_2.gif';
						children[4].image = '/assets/images/check-non_2.gif';
						children[6].image = '/assets/images/check-non_2.gif';
						children[8].image = '/assets/images/check-non_2.gif';
						break;
						case 'papa':
						children[2].image = '/assets/images/check-non_2.gif';
						children[4].image = '/assets/images/check_2.gif';
						children[6].image = '/assets/images/check-non_2.gif';
						children[8].image = '/assets/images/check-non_2.gif';
						break;
						case 'grandpa':
						children[2].image = '/assets/images/check-non_2.gif';
						children[4].image = '/assets/images/check-non_2.gif';
						children[6].image = '/assets/images/check_2.gif';
						children[8].image = '/assets/images/check-non_2.gif';
						break;
						case 'grandma':
						children[2].image = '/assets/images/check-non_2.gif';
						children[4].image = '/assets/images/check-non_2.gif';
						children[6].image = '/assets/images/check-non_2.gif';
						children[8].image = '/assets/images/check_2.gif';
						break;
						
						default:
							//
							break;
						}
					}
					break;
					case 5:
				//win.remove(firstView);
				var WebView = require('ui/common/WebView');
				//construct UI
				var webView = new WebView(win, L('About'), filename);
				win.add(webView);
				break;
				case 6:
				//win.remove(firstView);
				alert(L('now_preparing'));
				/*
				var Template = require('ui/common/Template');
				//construct UI
				var template = new WebView(win, L('Template'), purchase);
				win.add(template);
				*/
				break;
				case 7:
				var emailDialog = Titanium.UI.createEmailDialog();
				
				// 1桁の数字を0埋めで2桁にする
				var toDoubleDigits = function(num) {
					num += "";
					if (num.length === 1) {
						num = "0" + num;
					}
					return num;
				};
				
				// 日付をYYYY/MM/DD HH:DD:MI:SS形式で取得
				var yyyymmddhhmiss = function() {
					var date = new Date();
					var yyyy = date.getFullYear();
					var mm = toDoubleDigits(date.getMonth() + 1);
					var dd = toDoubleDigits(date.getDate());
					var hh = toDoubleDigits(date.getHours());
					var mi = toDoubleDigits(date.getMinutes());
					var ss = toDoubleDigits(date.getSeconds());
					return yyyy + mm + dd + '_' + hh + mi + ss;
				}();
				
				//　メールの題名
				emailDialog.setSubject(L('mojiban') + ': ' + yyyymmddhhmiss);
				// メールの宛先（宛先、Cc、Bcc）
				emailDialog.setToRecipients([Titanium.App.Properties.getString('mail')]);
				//	emailDialog.setCcRecipients(['bar@xxxxx.com']);
				//	emailDialog.setBccRecipients(['hoge@xxxxx.com']);
				// メール本文
				var text0 = L('Thank_you_for_your_use');
				
				emailDialog.setMessageBody(text0);
				// 添付がある場合
				// var f = Ti.Filesystem.getFile('cricket.mp3');
				// emailDialog.addAttachment(f);
				
				// メール送信画面を起動
				emailDialog.open();
				break;
				
				default:
				//
				break;
			}
		});

	tableview.startLayout();
	tableview.setData(rows);
	tableview.finishLayout();

	self.add(tableview);
	/*
	tableview2 = Titanium.UI.createTableView({
		top:scale(60), 
		right:scale(50),
		width:scale(150),
		height:scale(160),
		boderWidth:scale(1),
		boderColor:'#000',
	});
	
	tableview2.addEventListener('click', function(e){});
	
	var row = Ti.UI.createTableViewRow({
		height:scale(20),
		backgroundColor:'#000',
	});
	rows2.push(row);
	
	for(i=0; i<arrayTitle2.length; i++){
		var row = Ti.UI.createTableViewRow({
			height:scale(80),
			backgroundColor:'white',
		});
		
		var label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:L(arrayTitle2[i]),
			font:{fontSize:scale(30),fontFamily:'Helvetica Neue'},
			textAlign:'center',
			width:scale(100),
			left:0,
			//opacity:0.7,
		});
		row.add(label);
		
		rows2.push(row);
	}
	
	tableview2.startLayout();
	tableview2.setData(rows2);
	tableview2.finishLayout();
	
	tableview.add(tableview2);
	*/
	
	
	return self;
}

module.exports = Info;