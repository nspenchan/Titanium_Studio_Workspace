function Result(win, title, bgColor, arrayRecord, db, db1, label02, continueMode) {
	var top = 0,
		arrayId = [],
		correctNum = 0,
		questionTimes,
		level = Titanium.App.Properties.getInt('level'),
		min = Titanium.App.Properties.getInt('min'),
		max = Titanium.App.Properties.getInt('max'),
		range = Titanium.App.Properties.getInt('range'),
		from = Titanium.App.Properties.getInt('from'),
		from10 = from + Titanium.App.Properties.getInt('range');
	var alertDialog, back, buttonWidth, children, children, idMax, label, labelTop, 
		leftImage, Question, question, retry, row, rows, section, section, self, tableview, 
		view;
	
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
		return Math.round(dimension *  Ti.App.Properties.getDouble('osZoom') * Ti.App.Properties.getDouble('selfZoom') * Ti.Platform.displayCaps.platformWidth / 320);
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
	
	retry = Ti.UI.createButton({
		color:'#fff',
		backgroundColor:'green',
		backgroundImage: '/assets/images/gray300x300_0.4.png',
		title: L('Retry'),
		font:{fontSize:scale(20),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:scale(60),
		width:buttonWidth,
		right:scale(0),
		borderColor:'#002400',
		borderWidth:scale(1),
		opacity:1,
	});
	view.add(retry);
		
	retry.addEventListener('click', function(e){
		section = tableview.data[0];
		for(i=0; i<section.rows.length; i++){
			if(section.rows[i].check == 1){
				arrayId.push(section.rows[i].level + ',' + section.rows[i].id + ',' + section.rows[i].question + ',' + section.rows[i].answer);
			}
		}
		if(arrayId.length==0){
			alert(L('Select_Questions'));
		}else{
    			//arrayRecord = [];
    			//bang = '';
    			questionTimes = arrayId.length;
			Question = require('ui/common/Question');
			//construct UI
			question = new Question(win, 'Result_', bgColor, [], arrayId, -1, '', db, db1, questionTimes, label02);
			win.add(question);
			
			setTimeout(function(){
				win.remove(self);
			}, 100);
		}
	});
	
	back = Ti.UI.createButton({
		color:'#fff',
		backgroundColor:'red',
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
	
	if(continueMode==true){
		back.title = L('Continue');
		back.backgroundColor = 'green';
	}
		
	back.addEventListener('click', function(e){
		if(continueMode==true){
			alertDialog = Titanium.UI.createAlertDialog({
			    title: L('Continue'),
			    message: L('Level') + ' ' + level + '\n' + L('continue_message'),
			    buttonNames: [L('OK'),L('Cancel')],
			    // キャンセルボタンがある場合、何番目(0オリジン)のボタンなのかを指定できます。
			    cancel: 1
			});
			alertDialog.addEventListener('click',function(event){
			    // Cancelボタンが押されたかどうか
			    if(event.index == 1){
			        // cancel時の処理
			        alert(L('Level') + ' ' + level + '\n' + L('stop_message'));
					db.close();
					db1.close();
					setTimeout(function(){
						//ホーム画面以外をすべて消す
						children = win.getChildren();
						for(i=2; i<children.length; i++){
							win.remove(children[i]);
						}
					}, 100);
			    }
			    // 選択されたボタンのindexも返る
			    if(event.index == 0){
					idMax = from10 + range - 1;
					if(idMax>max){
						idMax = max;
					}
			        label02.text = L('Range_') + ' ' + from10 + ' ' + L('to') + ' ' + idMax;
			        // "OK"時の処理
			        bang = from10-1;
		    			if((max-from10)<range){
		    				questionTimes = (max-min)%range + 1;
		    			}else{
		    				questionTimes = range;
		    			}
					Titanium.App.Properties.setInt('from', from10);
					Question = require('ui/common/Question');
					//construct UI
					question = new Question(win, 'Question', '#ff7f7f', [], [], -1, bang, db, db1, questionTimes, label02);
					win.add(question);
					
					setTimeout(function(){
						//win.remove(self);
						//ホーム画面と出題画面以外をすべて消す
						children = win.getChildren();
						for(i=2; i<children.length-1; i++){
							win.remove(children[i]);
						}
					}, 100);
			    }
			});
			alertDialog.show();
		}else{
			alert(L('stop_message'));

			db.close();
			db1.close();
			setTimeout(function(){
				//win.remove(self);
				//ホーム画面以外をすべて消す
				children = win.getChildren();
				for(i=2; i<children.length; i++){
					win.remove(children[i]);
				}
			}, 100);
		}
	});
	
	rows = [];
	
	row = Ti.UI.createTableViewRow({
	    height:scale(60),
	    backgroundColor:'gray',
	    id:'',
	});
		
	labelTop = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'transparent',
		//text:L('Accuracy_Rate_') + correctNum + '/' + arrayRecord.length,
		font:{fontSize:scale(24),fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:Ti.UI.FILL,
		height:'auto',
		//opacity:0.7,
	});
	row.add(labelTop);
	
	rows.push(row);
	
	for(i=0; i<arrayRecord.length; i++){
		if(arrayRecord[i][2]=='green'){
			correctNum++;
		}
		row = Ti.UI.createTableViewRow({
		    height:'auto',
		    backgroundColor:arrayRecord[i][5],
		    id:arrayRecord[i][1],
		    level:arrayRecord[i][0],
		    question:arrayRecord[i][2],
		    answer:arrayRecord[i][3],
		    check:0,
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
			text:L('Level') + ' ' + arrayRecord[i][0] + ' / ' + L('No_') + ' ' + arrayRecord[i][1] + ' ' 
				+ arrayRecord[i][4],
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
	
	labelTop.text = L('Accuracy_Rate_') + correctNum + '/' + arrayRecord.length;
	
	tableview = Titanium.UI.createTableView({top: top+scale(60)});
	
	tableview.addEventListener('click', function(e){
		Ti.API.info(JSON.stringify(e));
		
	    section = tableview.data[0];
		for(i=0; i<section.rows.length; i++){
			if(section.rows[i].id==e.row.id && e.row.id!=''){
				children = section.rows[i].getChildren();
				//for(j=0; j<children.length; j++){
					if(children[0].image=='/assets/images/check-non.gif'){
						children[0].image = '/assets/images/check.gif';
						section.rows[i].check = 1;
					}else if(children[0].image=='/assets/images/check.gif'){
						children[0].image = '/assets/images/check-non.gif';
						section.rows[i].check = 0;
					}
				//}
			}
		}
	});
	
    tableview.startLayout();
    tableview.setData(rows);
    tableview.finishLayout();
    
    self.add(tableview);
	
	return self;
}

module.exports = Result;