function Question(win, title, bgColor, arrayRecord, arrayId2, roup, bang, db, db1, questionTimes, label02) {
	var utterance = require('bencoding.utterance');
	var ad, addData, adView, answer, answerArray, arrayId, arrayRecordIds, button1, button2, 
		buttonWidth, children, column, continueMode, correctArray, corrects, count, count1, 
		data, data1, from, hintArray, hintUse, i, image, ind, index, j, label, labelTimer, 
		labelTitle, leftImage, level, nowId, nowLevel, num, numArray, numArray0, numStars, 
		question, questionArray, range, recordIds, recordIds2, Result, result, roup12, row, 
		rowColor, rowCount, rowId, rows, rowStars, sec, section, select, select1, speech, speechLang,  
		selectAnswer, self, stars, starsArray, table, tableview, top, update, value, view, questionLabel;
	
	//var mode = Titanium.App.Properties.getString('mode');
	var columnArray = ['column', 'a', 'b', 'c', 'd', 'e'],//レベル１=a, レベル５=e
		choices = Titanium.App.Properties.getInt('choices'),
		randomArray = [],//ランダムモード用
		Timer; //タイマーを格納する変数（タイマーID）の宣言//カウントダウン関数を1000ミリ秒毎に呼び出す関数
	
	
	var arrayColor = ['#ff7f7f', '#ff7fbf', '#ff7fff', '#bf7fff', '#7f7fff', '#7fbfff', '#7fffff', '#7fffbf', '#7fff7f', '#bfff7f', '#ffff7f', '#ffbf7f'],
		arrayColor2 = ['#a8ffa8', '#a8ffff', '#a8a8ff', '#ffa8ff', '#ffa8a8'],
		//sound
		seikai = Titanium.Media.createSound({
		    url: '/assets/sound/seikai.mp3',
		}),
		huseikai = Titanium.Media.createSound({
		    url: '/assets/sound/huseikai.mp3',
		}),
		sprayer = Titanium.Media.createSound({
		    url: '/assets/sound/sprayer01.mp3',
		}),
		clock = Titanium.Media.createSound({
		    url: '/assets/sound/clock_35sec.mp3',
		    looping : true,
		});
		
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
		stars = '';
		for(j=1; j<=numStars; j++){
			stars += '★';
		}
		//スターの数が変わってから、配列arrayRecordのセット（結果画面用）
		
		arrayRecord[roup] = [level, bang, question, answer, stars + '\n' + questionArray[bang] + ' / ' + answerArray[bang] + '\n' + corrects, rowColor];
		
		//出題履歴の保存
		recordIds = Titanium.App.Properties.getString('recordIds');
		arrayRecordIds = recordIds.split(',');
		addData = level + '|' + bang + '|' + question + '|' + answer + '|' + questionArray[bang] + '|' + answerArray[bang] + '|' + corrects + '|' + rowColor + '|' + stars + '|' + yyyymmddhhmiss;
		Ti.API.info(arrayRecordIds);
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
			update = 'UPDATE ' + table + ' SET ' + column + '1 = "' + yyyymmddhhmiss + '", ' + column + '2 = "' + corrects + '", ' + column + '3 = "' + stars + '" WHERE ID = ' + bang;
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
		Ti.API.info(hintArray);
    		button1.enabled = false;
    		button2.enabled = false;
		if (Titanium.App.Properties.getBool('noSound') != true) {
			sprayer.play();
		}
		hintUse++;
		section = tableview.data[0];
		for(i=0; i<section.rows.length; i++){
			//for(j=1; j<arrayHint.length; j++){
				if(section.rows[i].id!=hintArray[0] && section.rows[i].id!=hintArray[1] && section.rows[i].id){
					section.rows[i].backgroundColor = 'gray';
				}
			//}
		}
		button2.opacity = 0;
		button2.removeEventListener('click', hintButton);
    		button1.enabled = true;
    		button2.enabled = true;
	}
	
	function stopButton(){
		stars = '';
		for(j=1; j<=numStars; j++){
			stars += '★';
		}
		//スターの数が変わってから、配列arrayRecordのセット（結果画面用）
		//スターの数が変わってから、配列arrayRecordのセット（結果画面用）
		
		arrayRecord[roup] = [level, bang, question, answer, stars + '\n' + questionArray[bang] + ' / ' + answerArray[bang] + '\n' + corrects, rowColor];
		
		//出題履歴の保存
		recordIds = Titanium.App.Properties.getString('recordIds');
		arrayRecordIds = recordIds.split(',');
		addData = level + '|' + bang + '|' + question + '|' + answer + '|' + questionArray[bang] + '|' + answerArray[bang] + '|' + corrects + '|' + rowColor + '|' + stars + '|' + yyyymmddhhmiss;
		Ti.API.info(arrayRecordIds);
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
			update = 'UPDATE ' + table + ' SET ' + column + '1 = "' + yyyymmddhhmiss + '", ' + column + '2 = "' + corrects + '", ' + column + '3 = "' + stars + '" WHERE ID = ' + bang;
			db1.execute(update)
		}
		
		if(arrayId2.length == 0 && roup==questionTimes-1 && bang+1<=rowCount){
			continueMode = true;
		}else{
			continueMode = false;
		}
		Result = require('ui/common/Result');
		//construct UI
		result = new Result(win, 'Result', bgColor, arrayRecord, db, db1, label02, continueMode);
		win.add(result);

		setTimeout(function(){
			win.remove(self);
		}, 500);
	}
	
	function answerButton(){
		if(osname!='android'){
			//speechLang = 'ja-JP';
			Ti.API.info('speechLang: ' + speechLang);
			speech = utterance.createSpeech();
			speech.startSpeaking({
			    text:questionLabel.text,
			    voice:speechLang,
			    rate:0.1
			});
		}
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
		
		section = tableview.data[0];
		for(i=0; i<section.rows.length; i++){
	    		section.rows[i].touchEnabled = false;
	    		if(osname != 'android'){
		    		section.rows[i].selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE;
	    		}
			//Ti.API.info(section.rows[i].number);
			if(section.rows[i].check==4){
				children = section.rows[i].getChildren();
				Ti.API.info(children.length);
				for(j=0; j<children.length; j++){
					if(children[j].star<=numStars){
						children[j].opacity=1;
					}else{
						children[j].opacity=0.4;
					}
				}
			}
			if(section.rows[i].check==1){
				selectAnswer = section.rows[i].id;
			}
			if(section.rows[i].id==bang){
				image = Titanium.UI.createImageView({
					image: '/assets/images/symbol_001_red.png',
					height: scale(50),
				});
				section.rows[i].add(image);
			}
		}
		
		//データベース　アップデート
		if(selectAnswer == bang){
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
		}, 500);
	}














	
	function createTableView(){
		roup++;
		if(arrayId2.length == 0){
			level = Titanium.App.Properties.getString('level');
			from = Titanium.App.Properties.getInt('from');
			range = Titanium.App.Properties.getInt('range');
			question = Titanium.App.Properties.getString('question');
			answer = Titanium.App.Properties.getString('answer');
			speechLang = speechLanguage(question);
			column = columnArray[level];
			table = question + answer;
			arrayId = arrayId2;
			if(Titanium.App.Properties.getBool('random')){
				if(roup==0){
					createArray();
					labelTitle.text = L('Random');
					if(from+range>rowCount){
						for(i=from; i<=rowCount; i++){
							randomArray.push(i);
						}
					}else{
						for(i=from; i<from+range; i++){
							randomArray.push(i);
						}
					}
					shuffle(randomArray);
				}//else{
				//	nowLevel = level;
				//}
				bang = randomArray[roup];
			}else{
				if(roup==0){
					createArray();
				}
				bang++;
			}
			//select = 'SELECT * FROM ' + dbName + ' WHERE bang = ' + bang + ' AND name = "' + Titanium.App.Properties.getString('test') + '"';
		}else{
			if(roup==0){
				//重複した要素を削除
				arrayId = arrayId2.filter(function (x, i, self) {
		            return self.indexOf(x) === i;
		        });
		        if(Titanium.App.Properties.getBool('random')){
		        		shuffle(arrayId);
		        }
		        Ti.API.info(arrayId);
				nowId = arrayId[roup].split(',');
				bang = nowId[1];
				level = nowId[0];
				question = nowId[2];
				answer = nowId[3];
				speechLang = speechLanguage(question);
				column = columnArray[level];
				table = question + answer;
				createArray();
				questionTimes = arrayId.length;
			}else{
				nowId = arrayId[roup].split(',');
				bang = nowId[1];
				nowLevel = nowId[0];
				nowQuestion = nowId[2];
				nowAnswer = nowId[3];
				if(nowLevel != level || nowQuestion != question || nowAnswer != answer){
					level = nowLevel;
					question = nowQuestion;
					answer = nowAnswer;
					column = columnArray[level];
					table = question + answer;
					createArray();
				}
			}
		}
		sec=Titanium.App.Properties.getInt('timer');
		
		corrects = correctArray[bang];
		if(starsArray[bang]){
			stars = starsArray[bang];
		}else{
			stars = '★';
		}
		
		numStars = stars.length;
		//Ti.API.info('stars: ' + stars);
		hintArray = [],
		numArray0 = [],// 1,2,3,4,...単語数
		numArray = [];// 正解番号とダミー番号を含む、ランダム数列（長さは、選択肢の数）
		
		for(i=1; i<=rowCount; i++){
			numArray0.push(i);
		}
		shuffle(numArray0);
		numArray.push(bang);
		for(i=0; i<choices-1; i++){
			if(numArray0[i]!=bang){
				numArray.push(numArray0[i]);
			}else{//正解番号は２つ含まない
				i--;
			}
		}
		for(i=0; i<2; i++){
			hintArray.push(numArray[i]);
		}
		shuffle(numArray);
		Ti.API.info(numArray);
		
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
			text:L('Level') + ' ' + level + ' / ' + L('No_') + ' ' + bang,
			font:{fontSize:scale(20),fontFamily:'Helvetica Neue'},
			textAlign:'center',
			width:Ti.UI.FILL,
			height:'auto',
			top:scale(10),
			bottom:scale(10),
		});
		if(arrayId.length == 0){
			label.text = label.text + '\n' + label02.text;
		}
		if(corrects && Titanium.App.Properties.getBool('noRecord') != true){
			if(corrects.substr(-1,1)=='○' ||corrects.substr(-1,1)=='◎' ){
				row.backgroundColor = 'green';
			}else if(corrects.substr(-1,1)=='×'){
				row.backgroundColor = 'pink';
			}
			//Ti.API.info('num: ' + corrects + stars)
			label.text = label.text + L('_history_')+ corrects + L('_stars_') + stars;
		}
		
		row.add(label);
		
		rows.push(row);
		//question
		row = Ti.UI.createTableViewRow({
		    height:'auto',
		    backgroundColor:arrayColor2[level],
		    touchEnabled : false,
		});
		if(osname != 'android'){
			row.selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE;
		}
		
		questionLabel = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:questionArray[bang],
			font:{fontSize:scale(24),fontFamily:'Helvetica Neue'},
			textAlign:'center',
			width:width,
			height:'auto',
			top:scale(10),
			bottom:scale(10),
		});
		row.add(questionLabel);
		
		rows.push(row);
		
		for(i=0; i<numArray.length; i++){
			j = i+1;
			id = numArray[i];
			//Ti.API.info(i + ': ' + data.fieldByName(arrayQuestion[i]));
			row = Ti.UI.createTableViewRow({
			    height:'auto',
			    backgroundColor:'transparent',
			    check:0,
			    id:id,
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
				text:j +'. ' + answerArray[id],
				font:{fontSize:scale(20),fontFamily:'Helvetica Neue'},
				textAlign:'left',
				width:width-scale(70),
				height:'auto',
				top:scale(10),
				bottom:scale(10),
				left:scale(60)
			});
			row.add(label);
			
			rows.push(row);
		}
		
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
		
		tableview = Titanium.UI.createTableView({
			top: top+scale(60),
			backgroundColor:'transparent',
		});
		
		tableview.addEventListener('click', function(e){
			//Ti.API.info(JSON.stringify(e));
			//eventオブジェクト
			index = e.index;
			rowId = e.row.id;
			section = tableview.data[0];
			if(rowId=='stars' && e.source.star){
				children = section.rows[index].getChildren();
				for(j=0; j<children.length; j++){
					if(children[j].star<=e.source.star){
						children[j].opacity=1;
					}else{
						children[j].opacity=0.4;
					}
				}
				numStars = e.source.star;
			}else if(rowId!=''){
				children = section.rows[index].getChildren();
				if(children[0].image=='/assets/images/check-non.gif'){
					children[0].image = '/assets/images/check.gif';
					section.rows[index].check = 1;
				}else if(children[0].image=='/assets/images/check.gif'){
					children[0].image = '/assets/images/check-non.gif';
					section.rows[index].check = 0;
				}
			}
		});
		
	    tableview.startLayout();
	    tableview.setData(rows);
	    tableview.finishLayout();
	    
	    setTimeout(function(){
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
		// 受信エラー通知
		adView.addEventListener('error',function(e){
		    Ti.API.info('AdView error');
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
		    Ti.API.info('AdView receive');
		});
		self.add(adView);
	}
	
	function createArray(){
		questionArray = ['question']; 
		answerArray = ['answer'];
		correctArray = ['correct'];
		starsArray = ['stars'];
		
		select = 'SELECT ' + question + ', ' + answer + ' FROM hokudai_level' + level;
		Ti.API.info(select);
		data = db.execute(select);
		rowCount = data.rowCount;
		while(data.isValidRow()){
			if(data.field(0)){
				questionArray.push(data.field(0));
			}else{
				questionArray.push(L('undefined'));
			}
			if(data.field(1)){
				answerArray.push(data.field(1));
			}else{
				answerArray.push(L('undefined'));
			}
			data.next();
		}
		//Ti.API.info(questionArray);
		select1 = "SELECT " + column + "2, "+ column + "3 FROM " + table;
		data1 = db1.execute(select1);
		while(data1.isValidRow()){
			if(data1.field(0)){
				correctArray.push(data1.field(0));
			}else{
				correctArray.push('');
			}
			if(data1.field(1)){
				starsArray.push(data1.field(1));
			}else{
				starsArray.push('');
			}
			data1.next();
		}
		//データベースを閉じるとエラーになる（android）
		data1.close();
		//db1.close();
		data.close();
		//db.close();
	}
	
	function speechLanguage(str){
	    switch(str){
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
		return speechLang;
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