function Search(win, title, bgColor, arraySearch, db, db1, searchResult, serachMode) {
	//var data1 = db1.execute("SELECT * FROM hokudai_level1 WHERE ID = 1");
	//		Ti.API.info(data1.fieldByName('id') + '/' +  data1.fieldByName('enja1') + '/' +  data1.fieldByName('enja2') + '/' +  data1.fieldByName('enja3') + '/' +  data1.fieldByName('enja4'));
	var top = 0,
		columnArray = ['column', 'a', 'b', 'c', 'd', 'e'],//レベル１=a, レベル５=e
		arrayId = [],
		level = Titanium.App.Properties.getString('level'),
		column = Titanium.App.Properties.getString('column'),
		question = Titanium.App.Properties.getString('question'),
		answer = Titanium.App.Properties.getString('answer'),
		column = columnArray[level];
		table = question + answer;
	var addData, arrayRecordSearch, back, buttonWidth, children, corrects, count, data1, 
		dataNum, History3, history3, index, keyword, label, labelSearch, leftImage, limit, 
		Question, question1, recordSearch, recordSearch2, row, rowId, rows, s1, Search, 
		search1, searchRange, section, select, self, serach, solve, stars, state1, 
		tableview, view;
	//Ti.API.info(arraySearch);
	
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
	
	solve = Ti.UI.createButton({
		color:'#fff',
		backgroundColor:bgColor,
		backgroundImage: '/assets/images/gray300x300_0.4.png',
		title: L('Solve'),
		font:{fontSize:scale(20),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:scale(60),
		width:buttonWidth,
		right:scale(0),
		borderColor:'#002400',
		borderWidth:scale(1),
		opacity:1,
	});
	view.add(solve);
		
	solve.addEventListener('click', function(e){
		section = tableview.data[0];
		for(i=0; i<section.rows.length; i++){
			if(section.rows[i].check == 1){
				arrayId.push(section.rows[i].level + ',' + section.rows[i].id + ',' + section.rows[i].question + ',' + section.rows[i].answer);
			}
		}
		if(arrayId.length==0){
			alert(L('Select_Questions'));
		}else{
			Question = require('ui/common/Question');
			//construct UI
			question1 = new Question(win, 'Search_', bgColor, [], arrayId, -1, '', db, db1);
			win.add(question1);
			
			setTimeout(function(){
				win.remove(self);
			}, 100);
		}
	});
	
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
		db.close();
		db1.close();
		setTimeout(function(){
			win.remove(self);
		}, 100);
	});
	
	rows = [];
	
	if(Titanium.App.Properties.getString('recordSearch')){
		row = Ti.UI.createTableViewRow({
		    height:scale(60),
		    backgroundColor:'#ff7f7f',
		    hasChild:true,
		    id:'search',
		});
		
		leftImage = Titanium.UI.createImageView({
		    image: '/assets/images/Bookmark.png',
		    left:0,
		    width:scale(48),
		});
		row.add(leftImage);
		
		label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:L('History_Searches'),
			font:{fontSize:scale(24),fontFamily:'Helvetica Neue',fontWeight:'bold'},
			textAlign:'left',
			width:width-scale(100),
			height:'auto',
			left:scale(70),
			//opacity:0.7,
		});
		row.add(label);
		
		rows.push(row);
	}
	
	row = Ti.UI.createTableViewRow({
	    height:scale(60),
	    backgroundColor:bgColor,
	    id:'',
	});
		
	leftImage = Titanium.UI.createImageView({
	    image: '/assets/images/Search.png',
	    left:0,
		width:scale(48),
	});
	row.add(leftImage);
		
	labelSearch = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'transparent',
		//text:L('All_Search'),
		font:{fontSize:scale(24),fontFamily:'Helvetica Neue'},
		textAlign:'left',
		width:width-scale(100),
		height:'auto',
		left:scale(50),
		//opacity:0.7,
	});
	row.add(labelSearch);
	//スイッチ状態の記憶
	if (Titanium.App.Properties.getBool('serachMode') == true) {
		state1 = true;
		labelSearch.text = L('All_Search') + ' ' + L('ON');
	} else {
		state1 = false;
		labelSearch.text = L('All_Search') + ' ' + L('OFF');
	}
	s1 = Titanium.UI.createSwitch({
        value:state1,
        //top:10,
        //bottom:10,
        right:scale(10),
	});
	row.add(s1);

	// create a switch change listener
	s1.addEventListener('change', function(e) {
	    // e.valueにはスイッチの新しい値が true もしくは falseとして設定されます。
	    if(e.value==true){
	    		Ti.App.Properties.setBool('serachMode', true);
			labelSearch.text = L('All_Search') + ' ' + L('ON');
	    }else{
	    		Ti.App.Properties.setBool('serachMode', false);
			labelSearch.text = L('All_Search') + ' ' + L('OFF');
	    }
	});
	
	rows.push(row);
	
	row = Ti.UI.createTableViewRow({
	    height:scale(60),
	    backgroundColor:bgColor,
	    id:'',
	});
	
	search = Titanium.UI.createSearchBar({
	    //backgroundColor:'red',
		//barColor:'#fff',
		//borderColor:'blue',
		//tintColor:'#fff',
		showCancel:true,
		height:scale(60),
		hintText:'Enter a search word',
	});
	row.add(search);
	
	// cancelボタンクリック時イベント
	search.addEventListener('cancel', function(e){
		Titanium.API.info('search bar cancel fired');
		search.blur();
	});
	// 内容確定時イベント
	search.addEventListener('return', function(e){
		//Titanium.UI.createAlertDialog({title:'Search Bar', message:'You typed ' + e.value }).show();
		//search.blur();
		keyword = e.value;
		limit = 100;
		
		if(keyword){
			arraySearch = [];
			if (Titanium.App.Properties.getBool('serachMode') == false) {
				searchRange = level;
				searchMode = L('Search_Range_') + L(question) + ' / ' + L(answer) + '\n' + L('Level') + ' ' + level;
				//取得データを１００件に制限
				select = "SELECT cd, level, " + question + ", " + answer + " FROM hokudai_level" + level + " WHERE " + question + " LIKE '%" + keyword + "%'"
					+ " OR " + answer + " LIKE '%" + keyword + "%' ORDER BY cd LIMIT " + limit;
			}else{
				searchRange = 'all';
				searchMode = L('Search_Range_') + L(question) + ' / ' + L(answer) + '\n' + L('All');
				//取得データを１００件に制限
				select = "SELECT cd, level, " + question + ", " + answer + " FROM hokudai_level1 WHERE " + question + " LIKE '%" + keyword + "%'"
					+ " OR " + answer + " LIKE '%" + keyword + "%' UNION SELECT cd, level, " + question + ", " + answer + " FROM hokudai_level2 WHERE " + question + " LIKE '%" + keyword + "%'"
					+ " OR " + answer + " LIKE '%" + keyword + "%' UNION SELECT cd, level, " + question + ", " + answer + " FROM hokudai_level3 WHERE " + question + " LIKE '%" + keyword + "%'"
					+ " OR " + answer + " LIKE '%" + keyword + "%' UNION SELECT cd, level, " + question + ", " + answer + " FROM hokudai_level4 WHERE " + question + " LIKE '%" + keyword + "%'"
					+ " OR " + answer + " LIKE '%" + keyword + "%' UNION SELECT cd, level, " + question + ", " + answer + " FROM hokudai_level5 WHERE " + question + " LIKE '%" + keyword + "%'"
					+ " OR " + answer + " LIKE '%" + keyword + "%' ORDER BY level LIMIT " + limit;
			}
			//Ti.API.info(select);
			data = db.execute(select);
			
			dataNum = data.rowCount;
			if(dataNum>0){
				if(dataNum>=100){
					searchResult = L('search_word_') + keyword + '\n' + L('search_result_') + L('Multiple_results');
				}else{
					searchResult = L('search_word_') + keyword + '\n' + L('search_result_') + data.rowCount + ' ' + L('Hit_');
				}
				
				count = 0;
				while(data.isValidRow()){
					//val = data.field(2) + ' / ' + data.field(3);
					//Ti.API.info('val: ' + val);
					arraySearch[count] = [data.field(0), data.field(1), data.field(2), data.field(3)];
					count++;
				    data.next();
				}
				data.close();
				//Ti.API.info(arraySearch);
				
				Search = require('ui/common/Search');
				//construct UI
				search1 = new Search(win, title, bgColor, arraySearch, db, db1, searchResult, searchMode);
				win.add(search1);
				setTimeout(function(){
					win.remove(self);
				}, 100);
			}else{
				searchResult = L('search_word_') + keyword + '\n' + L('search_non');
				
				Search = require('ui/common/Search');
				//construct UI
				search1 = new Search(win, title, bgColor, [], db, db1, searchResult, searchMode);
				win.add(search1);
				setTimeout(function(){
					win.remove(self);
				}, 100);
			}
			
			//検索履歴の保存
			recordSearch = Titanium.App.Properties.getString('recordSearch');
			arrayRecordSearch = recordSearch.split(',');
			addData = searchRange + '|' + question + '|' + answer + '|' + keyword + '|' + dataNum + '|' +  yyyymmddhhmiss;
			//Ti.API.info('recordIds: ' + recordIds);
			if(recordSearch==''){
				Titanium.App.Properties.setString('recordSearch', addData);
			}else if(arrayRecordSearch.length>100){
				recordSearch2 = addData;
				for(i=0; i<100; i++){
					recordSearch2 = recordSearch2 + ',' + arrayRecordSearch[i];
				}
				Titanium.App.Properties.setString('recordSearch', recordSearch2);
			}else{
				Titanium.App.Properties.setString('recordSearch', addData + ',' + recordSearch);
			}
			//Ti.API.info('recordSearch: ' + Titanium.App.Properties.getString('recordSearch'));
		}else{
			searchResult = L('enter_word');
		}
		alert(searchResult);
	});
	
	rows.push(row);
	
	row = Ti.UI.createTableViewRow({
	    height:'auto',
	    backgroundColor:'gray',
	});
	
	label = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'transparent',
		text:serachMode + '\n' + searchResult,
		font:{fontSize:scale(18),fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:Ti.UI.FILL,
		height:'auto',
		top:scale(10),
		bottom:scale(10),
		//opacity:0.7,
	});
	row.add(label);
	
	rows.push(row);
	
	if(arraySearch.length==0){
		row = Ti.UI.createTableViewRow({
		    height:'auto',
		    backgroundColor:'#fff',
		});
		
		label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:L('search_non'),
			font:{fontSize:scale(18),fontFamily:'Helvetica Neue'},
			textAlign:'center',
			width:Ti.UI.FILL,
			height:'auto',
			top:scale(10),
			bottom:scale(10),
			//opacity:0.7,
		});
		row.add(label);
		
		rows.push(row);
	}else{
		for(i=0; i<arraySearch.length; i++){
			row = Ti.UI.createTableViewRow({
			    height:'auto',
			    backgroundColor:'#fff',
			    id:arraySearch[i][0],
			    level:arraySearch[i][1],
			    question:question,
			    answer:answer,
			    check:0,
			});
			//Ti.API.info("SELECT " + column + "2, " + column + "3 FROM hokudai_level" + arraySearch[i][1] + " WHERE ID = " + arraySearch[i][0]);
			data1 = db1.execute("SELECT " + columnArray[arraySearch[i][1]] + "2, " + columnArray[arraySearch[i][1]] + "3 FROM " + table + " WHERE ID = " + arraySearch[i][0]);
			//Ti.API.info(data1.field(0) + data1.field(1));
			
			if(data1.field(1)){
				stars = data1.field(1);
			}else{
				stars = '';
			}
			//Ti.API.info(i + ': stars: ' + data1.field(1));
			corrects = data1.field(0) + '';
			//Ti.API.info(corrects);
			
			if(data1.field(0)){
				if(corrects.substr(-1,1)=='○' || corrects.substr(-1,1)=='◎' ){
					row.backgroundColor = 'green';
				}else if(corrects.substr(-1, 1)=='×'){
					row.backgroundColor = 'pink';
				}
			}else{
				corrects = L('Not_questions_yet');
			}
			
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
				text:L('Level') + ' ' + arraySearch[i][1] + ' / ' + L('No_') + arraySearch[i][0] + ' ' + stars + '\n' 
					+ arraySearch[i][2] + ' / ' + arraySearch[i][3]+ '\n' + corrects,
				font:{fontSize:scale(18),fontFamily:'Helvetica Neue'},
				textAlign:'left',
				width:width-scale(60),
				height:'auto',
				left:scale(50),
				top:scale(10),
				bottom:scale(10),
				//opacity:0.7,
			});
			row.add(label);
			
			rows.push(row);
		}
	}
	
	tableview = Titanium.UI.createTableView({top:top+scale(60)});
	
	tableview.addEventListener('click', function(e){
		//Ti.API.info(JSON.stringify(e));
		rowId = e.row.id;
		if(rowId=='search'){
			//Ti.API.info(Titanium.App.Properties.getString('recordSearch'));
			History3 = require('ui/common/History3');
			//construct UI
			history3 = new History3(win, 'Searches', '#ff7f7f', db, db1);
			win.add(history3);
			setTimeout(function(){
				win.remove(self);
			}, 100);
		}else if(rowId!=''){
			index = e.index;
		    section = tableview.data[0];
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
    
    self.add(tableview);
	
	return self;
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

module.exports = Search;