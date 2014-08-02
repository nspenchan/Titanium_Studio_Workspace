function Question(win, title, bgColor, dbName, arrayPurchase, arrayRecord, arrayId2, roup, bang, db, db1, questionTimes, label01) {
	var utterance = require('bencoding.utterance');
	var about, ad, adView, ampm, ans, answer1, appData, arrayAnswer, arrayHint, arrayId, arrayNum, arrayRecordIds, 
		button1, button2, buttonWidth, children, continueMode, corrects, count, 
		data, data1, from, hintUse, i, id, image, imageFile, ind, index, j, k, 
		kaisetu, label1, label2, labelComment, labelTimer, labelTitle, leftImage, 
		max, name, numId, numStars, que, range, recordIds, recordIds2, 
		Result, result, roup12, row, rowColor, rowComment, rowInput, rows, 
		rowStars, sec, section, sei, select, stars, str, subject, table, table2, 
		table3, tableview, tf1, tf2, times, top, update, view, voiceText, Webview;
	var Timer; //タイマーを格納する変数（タイマーID）の宣言//カウントダウン関数を1000ミリ秒毎に呼び出す関数
	var selectAnswer = '',
		osname = Ti.Platform.osname,
		randomArray = [],
		arrayColor = ['#ff7f7f', '#ff7fbf', '#ff7fff', '#bf7fff', '#7f7fff', '#7fbfff', '#7fffff', '#7fffbf', '#7fff7f', '#bfff7f', '#ffff7f', '#ffbf7f'],
		arrayQuestion = ['question2', 'img2', 'table2', 'question', 'img', 'table'],
		speed = Titanium.App.Properties.getDouble('speed'),
		speech = utterance.createSpeech(),
		speech1 = utterance.createSpeech();
	
	//入力問題　テキストフィールド用
	var num1 = '',
		num2 = '';
		
	//sound
	var seikai = Titanium.Media.createSound({
	    url: '/assets/sound/seikai.mp3',
	});
	var huseikai = Titanium.Media.createSound({
	    url: '/assets/sound/huseikai.mp3',
	});
	var sprayer = Titanium.Media.createSound({
	    url: '/assets/sound/sprayer01.mp3',
	});
	var clock = Titanium.Media.createSound({
	    url: '/assets/sound/clock_35sec.mp3',
	    looping : true,
	});
	
	if(osname=='android'){
		height = Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor,
		width = Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor;
	}else{
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	}
	//create object instance, a parasitic subclass of Observable
	self = Ti.UI.createView({
		backgroundColor:'#fff',
	});
	
	function scale(dimension) {
		return Math.round(dimension *  Ti.App.Properties.getDouble('osZoom') * Ti.App.Properties.getDouble('selfZoom') * Ti.Platform.displayCaps.platformWidth / 320);
	}
	
	//adView
	if(Titanium.App.Properties.getBool('Purchased-' + Titanium.App.Properties.getString('hidead'))){
		top = 0;
	}else{
		top = 50;
		createAdView();
	}
	

	view = Titanium.UI.createView({
		width:Ti.UI.FILL,
	    height:scale(60),
	    top:top,
	});
	self.add(view);
	
	labelTitle = Titanium.UI.createLabel({
		color:'#fff',
		backgroundColor:bgColor,
		text:L(title),
		font:{fontSize:scale(25),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'center',
		width:Ti.UI.FILL,
	    height:scale(60),
	    top:0,
	    opacity:1,
	});
	view.add(labelTitle);
	
	//timer
	labelTimer = Ti.UI.createLabel({
		backgroundColor:'transparent',
		color:'red',
		text:sec,
		font:{fontSize:scale(40),fontFamily:'Helvetica Neue',fontWeight:'bold',fontStyle:'italic'},
		textAlign:'center',
		width:Ti.UI.FILL,
	    height:scale(60),
	    top:0,
		opacity:0,
	});
	view.add(labelTimer);
	
	if(scale(90)>width/2-10){
		buttonWidth = width/2-10;
	}else{
		buttonWidth = scale(90);
	}
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	button1 = Ti.UI.createButton({
		name:'answer',
		color:'#fff',
		backgroundColor:bgColor,
		backgroundImage: '/assets/images/gray300x300_0.4.png',
		title: L('Answer'),
		font:{fontSize:scale(20),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:scale(60),
		width:buttonWidth,
		right:scale(0),
		borderColor:'#002400',
		borderWidth:scale(1),
		opacity:1,
		enabled:false,
	});
	view.add(button1);
	
	//Add behavior for UI
	button1.addEventListener('click', answerButton);
	
	button2 = Ti.UI.createButton({
		color:'#fff',
		backgroundColor:bgColor,
		backgroundImage: '/assets/images/gray300x300_0.4.png',
		title: L('Hint'),
		font:{fontSize:scale(20),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:scale(60),
		width:buttonWidth,
		left:scale(0),
		borderColor:'#002400',
		borderWidth:scale(1),
		opacity:1,
		enabled:false,
	});
	view.add(button2);
		
	hintUse = 0;
	button2.addEventListener('click', hintButton);
	
	tableview = createTableView();
	self.add(tableview);	
	
	return self;
	
	function nextButton(){
		if(speech1.isSpeaking){
	    		speech1.stopSpeaking();
		}
		//スターの数が変わってから、配列arrayRecordのセット（結果画面用）
		if(que.length>20){
			que = que.substr(0, 20) +'…';
		}
		stars = '';
		for(j=1; j<=numStars; j++){
			stars += '★';
		}
		
		arrayRecord[roup] = [id, stars + ' ' + times + '回' + ampm + bang + '問 ' + que + '\n' + corrects, rowColor];
		
		//出題履歴の保存
		recordIds = Titanium.App.Properties.getString('recordIds');
		arrayRecordIds = recordIds.split(',');
		addData = id + '|' + corrects + '|' + rowColor + '|' + stars + '|' + yyyymmddhhmiss;
		//Ti.API.info(arrayRecordIds);
		if(recordIds==''){
			Titanium.App.Properties.setString('recordIds', addData);
		}else if(arrayRecordIds.length>100){
			recordIds2 = addData;
			for(i=0; i<100; i++){
				recordIds2 = recordIds2 + ',' + arrayRecordIds[i];
			}
			Titanium.App.Properties.setString('recordIds', recordIds2);
		}else{
			Titanium.App.Properties.setString('recordIds', addData + ',' + recordIds);
		}
		if(Titanium.App.Properties.getBool('noRecord') != true){
			update = 'UPDATE record SET DATE = "' + yyyymmddhhmiss + '", CORRECT = "' + corrects + '", STARS = "' + stars + '" WHERE ID = ' + id;
			db1.execute(update)
		}
		setTimeout(function(){//adView
			if(!Titanium.App.Properties.getBool('Purchased-' + Titanium.App.Properties.getString('hidead'))){
				self.remove(adView);
				createAdView();
			}
	    		button1.enabled = false;
	    		button2.enabled = false;
			button1.title = L('Answer');
			button1.backgroundColor = bgColor;
			button1.removeEventListener('click', nextButton);
			button1.addEventListener('click', answerButton);
			hintUse = 0;
			button2.title = L('Hint');
			button2.backgroundColor = bgColor;
			button2.removeEventListener('click', stopButton);
			button2.addEventListener('click', hintButton);
			
			self.backgroundColor = '#fff';
			self.remove(tableview);	
			//Ti.API.info('next:5');
			setTimeout(function(){
				//adView.resume();
				tableview = createTableView();
				self.add(tableview);	
		    		button1.enabled = true;
		    		button2.enabled = true;
			}, 500);
		}, 500);
	}
	
	function hintButton(){
    		button1.enabled = false;
    		button2.enabled = false;
		if (Titanium.App.Properties.getBool('noSound') != true) {
			sprayer.play();
		}
		hintUse++;
		section = tableview.data[0];
		for(i=0; i<section.rows.length; i++){
			for(j=1; j<arrayHint.length; j++){
				if(section.rows[i].number==arrayHint[j]){
					section.rows[i].backgroundColor = 'gray';
				}
			}
		}
		button2.opacity = 0;
		button2.removeEventListener('click', hintButton);
    		button1.enabled = true;
    		button2.enabled = true;
	}
	
	function stopButton(){
		if(speech1.isSpeaking){
	    		speech1.stopSpeaking();
		}
		//スターの数が変わってから、配列arrayRecordのセット（結果画面用）
		if(que.length>20){
			que = que.substr(0, 20) +'…';
		}
		stars = '';
		for(j=1; j<=numStars; j++){
			stars += '★';
		}
		
		arrayRecord[roup] = [id, stars + ' ' + times + '回' + ampm + bang + '問 ' + que + '\n' + corrects, rowColor];
		
		//出題履歴の保存
		recordIds = Titanium.App.Properties.getString('recordIds');
		arrayRecordIds = recordIds.split(',');
		addData = id + '|' + corrects + '|' + rowColor + '|' + stars + '|' + yyyymmddhhmiss;
		//Ti.API.info(arrayRecordIds);
		if(recordIds==''){
			Titanium.App.Properties.setString('recordIds', addData);
		}else if(arrayRecordIds.length>100){
			recordIds2 = addData;
			for(i=0; i<100; i++){
				recordIds2 = recordIds2 + ',' + arrayRecordIds[i];
			}
			Titanium.App.Properties.setString('recordIds', recordIds2);
		}else{
			Titanium.App.Properties.setString('recordIds', addData + ',' + recordIds);
		}
		if(Titanium.App.Properties.getBool('noRecord') != true){
			update = 'UPDATE record SET DATE = "' + yyyymmddhhmiss + '", CORRECT = "' + corrects + '", STARS = "' + stars + '" WHERE ID = ' + id;
			db1.execute(update)
		}
		
		if(arrayId2.length == 0 && roup==questionTimes-1 && bang+1<=Titanium.App.Properties.getInt('max')){
			continueMode = true;
		}else{
			continueMode = false;
		}
		Result = require('ui/common/Result');
		//construct UI
		result = new Result(win, 'Result', bgColor, dbName, arrayPurchase, arrayRecord, db, db1, label01, continueMode);
		win.add(result);

		
		setTimeout(function(){
			win.remove(self);
		}, 500);
	}
	
	function answerButton(){
		//if(osname!='android' && !Ti.App.Properties.getBool('noVoice')){
			if(speech.isSpeaking){
		    		speech.stopSpeaking();
			}
		//}
		if(labelTimer.opacity==1){
			clearInterval(Timer);//timer
			labelTitle.opacity = 1;
			labelTimer.opacity = 0;
			clock.stop();
		}
    		button1.enabled = false;
    		button2.enabled = false;
		button1.removeEventListener('click', answerButton);
		if(button2.opacity != 0){
			button2.removeEventListener('click', hintButton);
		}
		
		if(arrayId.length == 0){
			if(bang != Titanium.App.Properties.getInt('max') && roup<questionTimes-1){
				button1.title = L('Next');
				button1.backgroundColor = 'green';
				button2.title = L('Stop');
				button2.backgroundColor = 'red';
				button2.opacity = 1;
			}else{
				button1.title = L('Stop');
				button1.backgroundColor = 'red';
				button2.opacity = 0;
			}
		}else{
			if(roup<arrayId.length-1){
				button1.title = L('Next');
				button1.backgroundColor = 'green';
				button2.title = L('Stop');
				button2.backgroundColor = 'red';
				button2.opacity = 1;
			}else{
				button1.title = L('Stop');
				button1.backgroundColor = 'red';
				button2.opacity = 0;
			}
		}
		
		if(arrayPurchase.indexOf(name)==-1){
			labelComment.text = '解説：準備中です...';
		}else{
			if(Titanium.App.Properties.getBool('Purchased-'+ name)==true){
				labelComment.text = '解説：' + kaisetu;
				if(!Ti.App.Properties.getBool('noVoice')){
					if(osname=='android'){
						speech1.startSpeaking({
						    text:'解説：' + kaisetu,
						    //voice:'ja-JP',
						    rate:speed
						});
					}else{
						speech1.startSpeaking({
						    text:'解説：' + kaisetu,
						    voice:'ja-JP',
						    rate:speed
						});
					}
				}
			}else if(bang<=10){
				labelComment.text = '解説：' + kaisetu + '\n※はじめの10問は無料で閲覧できます。';
				if(!Ti.App.Properties.getBool('noVoice')){
					if(osname=='android'){
						speech1.startSpeaking({
						    text:'解説：' + kaisetu + '。はじめの10問は無料で閲覧できます。',
						    //voice:'ja-JP',
						    rate:speed
						});
					}else{
						speech1.startSpeaking({
						    text:'解説：' + kaisetu + '。はじめの10問は無料で閲覧できます。',
						    voice:'ja-JP',
						    rate:speed
						});
					}
				}
			}else{
				labelComment.text = '解説が必要な方は、アプリ内課金を購入してください。';
			}
		}
		
		if(answer1 !='input' && sei!=0){
			section = tableview.data[0];
			for(i=0; i<section.rows.length; i++){
		    		section.rows[i].touchEnabled = false;
		    		if(osname != 'android'){
			    		section.rows[i].selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE;
		    		}
				//Ti.API.info(section.rows[i].number);
				if(section.rows[i].check == 1){
					selectAnswer = selectAnswer + section.rows[i].number;
				}else if(section.rows[i].check==4){
					children = section.rows[i].getChildren();
					for(j=0; j<children.length; j++){
						if(children[j].star<=numStars){
							children[j].opacity=1;
						}else{
							children[j].opacity=0.4;
						}
					}
				}
				//正解のrowに○を付ける
				for(k=0; k<arrayAnswer.length; k++){
					if(section.rows[i].number == arrayAnswer[k]){
						image = Titanium.UI.createImageView({
							image: '/assets/images/symbol_001_red.png',
							height: scale(50),
						});
						section.rows[i].add(image);
					}
				}
			}
		}else if(answer1 =='input' && sei!=0){
			section = tableview.data[0];
			for(i=0; i<section.rows.length; i++){
		    		section.rows[i].touchEnabled = false;
		    		if(osname != 'android'){
			    		section.rows[i].selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE;
		    		}
				//Ti.API.info(section.rows[i].number);
				if(section.rows[i].check==4){
					children = section.rows[i].getChildren();
					for(j=0; j<children.length; j++){
						if(children[j].star<=numStars){
							children[j].opacity=1;
						}else{
							children[j].opacity=0.4;
						}
					}
				}
			}
			
			sei = '' + sei;
			label = Titanium.UI.createLabel({
				color:'red',
				backgroundColor:'transparent',
				text:sei.substr(0,1),
				font:{fontSize:scale(20),fontFamily:'Helvetica Neue'},
				textAlign:'center',
				width:scale(60),
				top:0,
				left:scale(80)
			});
			rowInput.add(label);
			
			label1 = Titanium.UI.createLabel({
				color:'red',
				backgroundColor:'transparent',
				text:sei.substr(-1),
				font:{fontSize:scale(20),fontFamily:'Helvetica Neue'},
				textAlign:'center',
				width:scale(60),
				top:0,
				right:scale(80)
			});
			rowInput.add(label1);
			
			selectAnswer = '' + num1 + num2;
		}else{//sei == 0
			selectAnswer = 0;
			labelTitle.text = L('Inappropriate');
		}
		//Ti.API.info('sei: ' + sei);
		//Ti.API.info('selectAnswer: ' + selectAnswer);
		//データベース　アップデート
		if(selectAnswer == sei){
			//振動（正解の時）
			if (Titanium.App.Properties.getBool('noVibrate') != true) {
				Titanium.Media.vibrate();
			}
			if (Titanium.App.Properties.getBool('noSound') != true) {
				seikai.play();
			}
			self.backgroundColor = 'green';
			if(hintUse==0){
				corrects = corrects + '◎';
				rowColor = 'green';
			}else{
				corrects = corrects + '○';
				rowColor = 'green';
			}
		}else{
			if (Titanium.App.Properties.getBool('noSound') != true) {
				huseikai.play();
			}
			self.backgroundColor = 'pink';
				corrects = corrects + '×';
				rowColor = 'pink';
		}
		//next ボタンにチェンジ
		setTimeout(function(){
			if(arrayId.length == 0){
				if(bang != Titanium.App.Properties.getInt('max') && roup<questionTimes-1){
					button1.addEventListener('click', nextButton);
					button2.addEventListener('click', stopButton);	
				}else{
					button1.addEventListener('click', stopButton);
				}
			}else{
				if(roup<arrayId.length-1){
					button1.addEventListener('click', nextButton);
					button2.addEventListener('click', stopButton);	
				}else{
					button1.addEventListener('click', stopButton);
				}
			}
	    		button1.enabled = true;
	    		button2.enabled = true;
	    		selectAnswer = '';
		}, 500);
	}
	
	function createTableView(){
		voiceText = '';//読み上げテキスト
		roup++;
		if(arrayId2.length == 0){
			from = Titanium.App.Properties.getInt('from');
			range = Titanium.App.Properties.getInt('range');
			max = Titanium.App.Properties.getInt('max');
			arrayId = arrayId2;
			if(Titanium.App.Properties.getBool('random')){
				if(roup==0){
					labelTitle.text = L('Random');
					if(from+range>max){
						for(i=from; i<=max; i++){
							randomArray.push(i);
						}
					}else{
						for(i=from; i<from+range; i++){
							randomArray.push(i);
						}
					}
					shuffle(randomArray);
				}
				bang = randomArray[roup];
			}else{
				bang++;
			}
			select = 'SELECT * FROM ' + dbName + ' WHERE bang = ' + bang + ' AND name = "' + Titanium.App.Properties.getString('test') + '"';
		}else{
			if(roup==0){
				//重複した要素を削除
				arrayId = arrayId2.filter(function (x, i, self) {
		            return self.indexOf(x) === i;
		        });
		        if(Titanium.App.Properties.getBool('random')){
		        		shuffle(arrayId);
		        }
				questionTimes = arrayId.length;
			}
			numId = arrayId[roup];
			select = 'SELECT * FROM ' + dbName + ' WHERE id = ' + numId;
		}
		
		data = db.execute(select);
		sec=Titanium.App.Properties.getInt('timer');
		id = data.fieldByName('id');
		times = data.fieldByName('times');
		subject = data.fieldByName('subject');
		bang = data.fieldByName('bang');
		ampm = data.fieldByName('ampm');
		sei = data.fieldByName('seikai');
		kaisetu = data.fieldByName('kaisetu');
		name = data.fieldByName('name');
		answer1 = data.fieldByName('answer1');//入力問題の判定に使用
		
		data1 = db1.execute("SELECT CORRECT, STARS FROM record WHERE ID = " + id);
		
		corrects = data1.field(0);
		if(!corrects){
			corrects = '';
		}
		stars = data1.field(1);
		if(!stars){
			stars = '★';
		}
		numStars = stars.length;
		//Ti.API.info('numStars: ' + numStars);
		
		//正解番号を分解する
		str = sei + '';
		arrayAnswer = [];
		if(sei>=100){
			arrayAnswer.push(str.substr(0,1));
			arrayAnswer.push(str.substr(1,1));
			arrayAnswer.push(str.substr(2,1));
		}else if(sei>=10){
			arrayAnswer.push(str.substr(0,1));
			arrayAnswer.push(str.substr(1,1));
		}else{
			arrayAnswer.push(str.substr(0,1));
		}
		//Ti.API.info('arrayAnswer: ' + arrayAnswer);
		
		arrayHint = [];
		if(data.fieldByName('answer5')){
			arrayNum = [1, 2, 3, 4, 5];
			shuffle(arrayNum);
			for(i=0; i<arrayNum.length; i++){
				count = 0;
				for(j=0; j<arrayAnswer.length; j++){
					if(arrayNum[i]==arrayAnswer[j]){
						count++;
					}
				}
				if(count==0){
					arrayHint.push(arrayNum[i]);
				}
			}
		}else{
			arrayNum = [1, 2, 3, 4];
			shuffle(arrayNum);
			for(i=0; i<arrayNum.length; i++){
				count = 0;
				for(j=0; j<arrayAnswer.length; j++){
					if(arrayNum[i]==arrayAnswer[j]){
						count++;
					}
				}
				if(count==0){
					arrayHint.push(arrayNum[i]);
				}
			}
		}
		//Ti.API.info('arrayHint: ' + arrayHint);
		
		rows = [];
		
		row = Ti.UI.createTableViewRow({
		    height:scale(60),
		    backgroundColor:'#000',
		    touchEnabled : false,
		});
		
		//alert(value);
		value = roup+1;
		ind=Titanium.UI.createProgressBar({
			width:scale(300),
			min:0,
			max:questionTimes,
			value:value,
			height: 'auto',
			color:'#888',
			message:value + ' / ' + questionTimes,
			font:{fontSize:scale(16), fontWeight:'bold'},
			textAlign:'center',
			top:scale(20),
			//bottom:15,
			style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
		});
		row.add(ind);
		ind.show();
		
		rows.push(row);
	
		row = Ti.UI.createTableViewRow({
		    height:'auto',
		    backgroundColor:'gray',
		    touchEnabled : false,
		});
		if(osname != 'android'){
			row.selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE;
		}
		
		label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:subject	+ times + '回'+ ampm + bang + '問',
			font:{fontSize:scale(20),fontFamily:'Helvetica Neue'},
			textAlign:'center',
			width:Ti.UI.FILL,
			height:'auto',
			top:scale(10),
			bottom:scale(10),
		});
		if(corrects != '' && Titanium.App.Properties.getBool('noRecord') != true){
			if(corrects.substr(-1,1)=='○' || corrects.substr(-1,1)=='◎' ){
				row.backgroundColor = 'green';
			}else if(corrects.substr(-1,1)=='×'){
				row.backgroundColor = 'pink';
			}
			//Ti.API.info('num: ' + corrects + stars)
			label.text = label.text + L('_history_')+ corrects + L('_stars_') + stars;
		}
		
		row.add(label);
		
		rows.push(row);
		
		for(i=0; i<arrayQuestion.length; i++){
			//Ti.API.info(i + ': ' + data.fieldByName(arrayQuestion[i]));
			row = Ti.UI.createTableViewRow({
			    height:'auto',
			    backgroundColor:'transparent',
			    touchEnabled : false,
			});
			if(osname != 'android'){
				row.selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE;
			}
			
			switch(i){
				case 0: case 3:
					que = data.fieldByName(arrayQuestion[i]);
					//alert(question);
					que = que + '';
					que = que.replace(/\\n/g, '\n');//改行コードの復元
					que = que.replace(/<br \/>/g, '\n');//改行コードの復元
					que = que.replace(/<br>/g, '\n');//改行コードの復元
					
					label = Titanium.UI.createLabel({
						color:'#000',
						backgroundColor:'transparent',
						text:que,
						font:{fontSize:scale(20),fontFamily:'Helvetica Neue'},
						textAlign:'left',
						width:width-scale(20),
						height:'auto',
						top:scale(10),
						bottom:scale(10),
						left:scale(10)
					});
					row.add(label);
					voiceText += que;
				break;
				case 1: case 4:
					imageFile = data.fieldByName(arrayQuestion[i]);
					if(imageFile){
					    imageFile = imageFile + '';
						imageFile = imageFile.substr(-15);
					}
					image = Titanium.UI.createImageView({
						image: '/assets/images/' + dbName + '/' + imageFile,
						top: scale(10),
						bottom: scale(10),
						width:width,
						//height: 'auto',
					});
					if(osname!='android'){//androidで指定すると画像が小さくなる（バグ）
						image.height = 'auto';
					}
					row.add(image);
					//Ti.API.info('/ui/common/' + dbName + '/images/' + imageFile);
				break;
				case 2: case 5:
					table = data.fieldByName(arrayQuestion[i]);
					table = table + '';
					
				    table2 = replaceAll( table, '＜＜', '<');
				    table3 = replaceAll( table2, '＞＞', '>');
				    
					row.height = scale(60);
					row.backgroundColor = 'gray';
					row.hasChild = true;
			    		row.touchEnabled = true;
			    		row.html = table3;
			    		row.check = 5;
					if(osname != 'android'){
						row.selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE;
					}
					
					leftImage = Titanium.UI.createImageView({
					    image: '/assets/images/Graph.png',
					    left:0,
					    width:scale(48),
					});
					row.add(leftImage);
					
					label = Titanium.UI.createLabel({
						color:'#000',
						backgroundColor:'transparent',
						text:L('Table'),
						font:{fontSize:scale(24),fontFamily:'Helvetica Neue'},
						textAlign:'left',
						width:width-scale(100),
						height:'auto',
						left:scale(70),
						//opacity:0.7,
					});
					row.add(label);
				break;
				default:
				break;
			}
			if(data.fieldByName(arrayQuestion[i])){
				rows.push(row);
			}
		}
		//解答欄
		if(answer1 !='input'){//入力問題？
			for(i=1; i<=5; i++){
				ans = 'answer' + i;
				row = Ti.UI.createTableViewRow({
				    height:'auto',
				    backgroundColor:'transparent',
				    number:i,
				    check:0
				});
				
				leftImage = Titanium.UI.createImageView({
				    image: '/assets/images/check-non.gif',
				    width:scale(48),
				    height:scale(48),
				    left:0,
				});
				row.add(leftImage);
				
				label = Titanium.UI.createLabel({
					color:'#000',
					backgroundColor:'transparent',
					text:data.fieldByName(ans),
					font:{fontSize:scale(20),fontFamily:'Helvetica Neue'},
					textAlign:'left',
					width:width-scale(70),
					height:'auto',
					top:scale(10),
					bottom:scale(10),
					left:scale(60)
				});
				row.add(label);
				
				if(data.fieldByName(ans)){
					rows.push(row);
					voiceText += '。' + data.fieldByName(ans);
				}
			}
		}else{
			//ヒントボタン無効化
			button2.opacity = 0;
			button2.removeEventListener('click', hintButton);
			rowInput = Ti.UI.createTableViewRow({
			    height:scale(90),
			    backgroundColor:'transparent',
			});
			
			label = Titanium.UI.createLabel({
				color:'#000',
				backgroundColor:'transparent',
				text:'解答：',
				font:{fontSize:scale(20),fontFamily:'Helvetica Neue'},
				textAlign:'left',
				width:scale(70),
				left:scale(10)
			});
			rowInput.add(label);
			
			label1 = Titanium.UI.createLabel({
				color:'#000',
				backgroundColor:'transparent',
				text:data.fieldByName('answer2'),
				font:{fontSize:scale(20),fontFamily:'Helvetica Neue'},
				textAlign:'right',
				width:scale(70),
				right:scale(10)
			});
			if(data.fieldByName('answer2') != 'non-demension'){
				rowInput.add(label1);
			}
			
			label2 = Titanium.UI.createLabel({
				color:'#000',
				backgroundColor:'transparent',
				text:'.',
				font:{fontSize:scale(20),fontFamily:'Helvetica Neue'},
				textAlign:'center',
				width:scale(10),
			});
			if(data.fieldByName('answer3')=='comma'){
				rowInput.add(label2);
			}
			
			tf1 = Titanium.UI.createTextField({
	            font : {fontSize : scale(20),fontFamily : 'Helvetica Neue'},
				color : '#336699',
				width : scale(60),
				height : scale(40),
				left : scale(80),
				hintText : '1',
				maxLength: 1,
				textAlign:'center',
				keyboardType : Titanium.UI.KEYBOARD_NUMBER_PAD,
				returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
				borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
			});
			tf1.addEventListener('blur', function(e) {
				num1 = e.value;
				num1 = num1 + '';
				tf1.blur();
			});
			tf1.addEventListener('change', function(e) {
				num1 = e.value;
				num1 = num1 + '';
				tf1.blur();
			});
			
			tf2 = Titanium.UI.createTextField({
	            font : {fontSize : scale(20),fontFamily : 'Helvetica Neue'},
				color : '#336699',
				width : scale(60),
				height : scale(40),
				right : scale(80),
				hintText : '1',
				maxLength: 1,
				textAlign:'center',
				keyboardType : Titanium.UI.KEYBOARD_NUMBER_PAD,
				returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
				borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
			});
			tf2.addEventListener('blur', function(e) {
				num2 = e.value;
				num2 = num2 + '';
				tf2.blur();
			});
			tf2.addEventListener('change', function(e) {
				num2 = e.value;
				num2 = num2 + '';
				tf2.blur();
			});
			rowInput.add(tf1);
			rowInput.add(tf2);
			
			rows.push(rowInput);
		}
			
		rowComment = Ti.UI.createTableViewRow({
		    height:'auto',
		    backgroundColor:'transparent',
		    check:3
		});
		
		labelComment = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:'',
			font:{fontSize:scale(20),fontFamily:'Helvetica Neue'},
			textAlign:'left',
			width:Ti.UI.FILLh-scale(20),
			height:'auto',
			top:scale(10),
			bottom:scale(10),
			left:scale(10)
		});
		rowComment.add(labelComment);
		
		rows.push(rowComment);
		
		if(Titanium.App.Properties.getBool('noRecord') != true){
			rowStars = Ti.UI.createTableViewRow({
			    height:scale(70),
			    backgroundColor:'transparent',
			    check:4,
			});
			
			for(i=1; i<=5; i++){
				image = Titanium.UI.createImageView({
					image: '/assets/images/star_on_50x50.png',
					top: scale(10),
					left:scale(15) + (i-1)*scale(60),
					width:scale(50),
					star:i,
					opacity:0,
				});
				rowStars.add(image);
			}
			rows.push(rowStars);
		}
		
		if(!Ti.App.Properties.getBool('noVoice')){
			if(osname=='android'){
				speech.startSpeaking({
				    text:voiceText,
				    //voice:'ja-JP',
				    rate:speed
				});
			}else{
				speech.startSpeaking({
				    text:voiceText,
				    voice:'ja-JP',
				    rate:speed
				});
			}
		}
		
		tableview = Titanium.UI.createTableView({
			top: top+scale(60),
			backgroundColor:'transparent',
		});
		
		tableview.addEventListener('click', function(e){
			//Ti.API.info(JSON.stringify(e));
			//eventオブジェクト
		    index = e.index; 
		    switch(index){
		    		default:
		    		
		    		break;
		    }
		    section = tableview.data[0];
			for(i=0; i<section.rows.length; i++){
				if(i==index){
					if(e.row.check==4 && e.source.star){
						children = section.rows[i].getChildren();
						for(j=0; j<children.length; j++){
							if(children[j].star<=e.source.star){
								children[j].opacity=1;
							}else{
								children[j].opacity=0.4;
							}
						}
						numStars = e.source.star;
					}else if(e.row.check==5){
						Webview = require('ui/common/Webview');
						//construct UI
						about = new Webview(win, 'Table', 'gray', e.row.html);
						win.add(about);
					}else{
						children = section.rows[i].getChildren();
						if(children[0].image=='/assets/images/check-non.gif'){
							children[0].image = '/assets/images/check.gif';
							section.rows[i].check = 1;
						}else if(children[0].image=='/assets/images/check.gif'){
							children[0].image = '/assets/images/check-non.gif';
							section.rows[i].check = 0;
						}
					}
				}
			}
		});
		
	    tableview.startLayout();
	    tableview.setData(rows);
	    tableview.finishLayout();
	    
	    setTimeout(function(){
			//データベースを閉じるとエラーになる（android）
			data1.close();
			//db1.close();
			data.close();
			//db.close();
	    		button1.enabled = true;
	    		button2.enabled = true;
	    }, 500);
	    
		//表示が終わってから、タイマーをスタート
		if(sec != 0){
			labelTitle.opacity = 0.5;
			labelTimer.opacity = 1;
			
			if (Titanium.App.Properties.getBool('noSound') != true) {
				clock.play();
			}
			Timer = setInterval(function(){
				sec =sec-1;
				labelTimer.text = sec;
				//Ti.API.info(sec);
				if(sec<=0){
					answerButton();
				}
			},1000);
		}
		//重なりのテスト
		//labelTitle.text = win.getChildren().length;
		
		return tableview;
	}
	
	function createAdView(){
		ad = require('net.nend');
		if(osname === 'android'){
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
		// 受信エラー通知
		adView.addEventListener('error',function(e){
		    //Ti.API.info('AdView error');
		    roup12 = roup%12;
		    adView.add(Titanium.UI.createImageView({
		    		image: '/assets/images/kokucy_640x100.png',
		    		backgroundColor:arrayColor[roup12],
		    		width:320,
		    		height:50,
		    	}));
		});
		// 受信成功通知
		adView.addEventListener('receive',function(e){
		    //Ti.API.info('AdView receive');
		});
		self.add(adView);
	}
}

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
	return yyyy + mm + dd + hh + mi + ss;
}();

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
// 全ての文字列 s1 を s2 に置き換える
function replaceAll(expression, org, dest){
    return expression.split(org).join(dest);
}

module.exports = Question;