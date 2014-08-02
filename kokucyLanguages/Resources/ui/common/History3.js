function History(win, title, bgColor, db, db1) {
	var top = 0;
	
	//create object instance, a parasitic subclass of Observable
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
	var self = Ti.UI.createView({
		backgroundColor:'#000',
	});
	
	function scale(dimension) {
		return Math.round(dimension *  Ti.App.Properties.getDouble('osZoom') * Ti.App.Properties.getDouble('selfZoom') * Ti.Platform.displayCaps.platformWidth / 320);
	}
	
	var view = Titanium.UI.createView({
		width:Ti.UI.FILL,
	    height:scale(60),
	    top:top,
	});
	self.add(view);
	
	var label = Titanium.UI.createLabel({
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
		var buttonWidth = width/2-10;
	}else{
		var buttonWidth = scale(90);
	}
	/*
	var solve = Ti.UI.createButton({
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
		var section = tableview.data[0];
		for(i=0; i<section.rows.length; i++){
			if(section.rows[i].check == 1){
				arrayId.push(section.rows[i].id);
			}
		}
		if(arrayId.length==0){
			alert(L('Select_Questions'));
		}else{
    			//var arrayRecord = [];
    			//var bang = '';
			var Question = require('ui/common/Question');
			//construct UI
			var question = new Question(win, 'History2_', 'blue', dbName, arrayPurchase, [], arrayId, -1, '', db, db1);
			win.add(question);
			
			setTimeout(function(){
				win.remove(self);
			}, 100);
		}
	});
	*/
	var back = Ti.UI.createButton({
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
	
	var rows = [];
	
	var recordSearch = Titanium.App.Properties.getString('recordSearch');
	Ti.API.info(recordSearch);
	var arrayRecordSearch = recordSearch.split(',');
	//Ti.API.info(arrayRecordSearch);
	if(arrayRecordSearch[0]==''){
		var row = Ti.UI.createTableViewRow({
		    height:'auto',
		    backgroundColor:'#fff',
		    id:'',
		    check:0,
		});
		
		var label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:L('noHistoryData'),
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
		var roup = 0;//時間表示Rowを管理する
		for(i=0; i<arrayRecordSearch.length; i++){
			if(arrayRecordSearch[i]){
				var arrayRecordSearch2 = arrayRecordSearch[i].split('|');
				
				var dataDifference = yyyymmddhhmiss-arrayRecordSearch2[5];
				var row1 = Ti.UI.createTableViewRow({
				    height:'auto',
				    backgroundColor:'gray',
				    id:'',
				});
				
				var label1 = Titanium.UI.createLabel({
					color:'#000',
					backgroundColor:'transparent',
					//text:L('one_month'),
					font:{fontSize:scale(18),fontFamily:'Helvetica Neue'},
					textAlign:'center',
					width:Ti.UI.FILL,
					height:'auto',
					top:scale(10),
					bottom:scale(10),
					//opacity:0.7,
				});
				row1.add(label1);
				Ti.API.info(dataDifference);
				if(dataDifference<10000 && roup<1){
					label1.text = L('one_hour');
					rows.push(row1);
					roup = 1;
				}else if(dataDifference>=10000 && dataDifference<1000000 && roup<2){
					label1.text = L('one_day');
					rows.push(row1);
					roup = 2;
				}else if(dataDifference>=1000000 && dataDifference<7000000 && roup<3){
					label1.text = L('one_week');
					rows.push(row1);
					roup = 3;
				}else if(dataDifference>=7000000 && dataDifference<100000000 && roup<4){
					label1.text = L('one_month');
					rows.push(row1);
					roup = 4;
				}else if(dataDifference>=100000000 && dataDifference<10000000000 && roup<5){
					label1.text = L('one_year');
					rows.push(row1);
					roup = 5;
				}else if(dataDifference>=10000000000 && roup<6){
					label1.text = L('previos_year');
					rows.push(row1);
					roup = 6;
				}
				
				var row = Ti.UI.createTableViewRow({
				    height:'auto',
				    backgroundColor:'#fff',
				    range:arrayRecordSearch2[0],
				    question:arrayRecordSearch2[1],
				    answer:arrayRecordSearch2[2],
				    keyword:arrayRecordSearch2[3],
				    dataNum:arrayRecordSearch2[4],
				    hasChild:true,
				});
				
				if(arrayRecordSearch2[4]>=1){
					row.backgroundColor = 'green';
				}else{
					row.backgroundColor = 'pink';
				}
		
				if(arrayRecordSearch2[0]=='all'){
					var serachMode = L('Search_Range_') + L(arrayRecordSearch2[1]) + ' / ' + L(arrayRecordSearch2[2]) + '\n' + L('ALL');
				}else{
					var serachMode = L('Search_Range_') + L(arrayRecordSearch2[1]) + ' / ' + L(arrayRecordSearch2[2]) + '\n' + L('Level') + ' ' + arrayRecordSearch2[0];
				}
				
				var label = Titanium.UI.createLabel({
					color:'#000',
					backgroundColor:'transparent',
					text:L('search_word_') + arrayRecordSearch2[3] + '\n' + serachMode + '\n'
						+ L('search_result_') + arrayRecordSearch2[4] + L('Hit_'),
					font:{fontSize:scale(18),fontFamily:'Helvetica Neue'},
					textAlign:'left',
					width:width-scale(20),
					height:'auto',
					left:scale(10),
					top:scale(10),
					bottom:scale(10),
					//opacity:0.7,
				});
				row.add(label);
				
				rows.push(row);
			}
		}
		//db1.close();
		//db.close();
	}

	var tableview = Titanium.UI.createTableView({top: top+scale(60)});
	
	tableview.addEventListener('click', function(e){
		Ti.API.info(JSON.stringify(e));
		
		var range = e.row.range;
		var question = e.row.question;
		var answer = e.row.answer;
		var keyword = e.row.keyword;
		var dataNum = e.row.dataNum;//検索結果の数
		var limit = 100;
		
	    if(dataNum>0){
		    if(keyword){
				arraySearch = [];
				if (range!='all') {
					level = range;
					searchRange = level;
					searchMode = L('Search_Range_') + L(question) + ' / ' + L(answer) + '\n' + L('Level') + ' ' + level;
					//取得データを１００件に制限
					select = "SELECT cd, level, " + question + ", " + answer + " FROM hokudai_level" + level + " WHERE " + question + " LIKE '%" + keyword + "%'"
						+ " OR " + answer + " LIKE '%" + keyword + "%' ORDER BY cd LIMIT " + limit;
				}else{
					searchRange = 'all';
					searchMode = L('Search_Range_') + L(question) + ' / ' + L(answer) + '\n' + L('ALL');
					//取得データを１００件に制限
					select = "SELECT cd, level, " + question + ", " + answer + " FROM hokudai_level1 WHERE " + question + " LIKE '%" + keyword + "%'"
					+ " OR " + answer + " LIKE '%" + keyword + "%' UNION SELECT cd, level, " + question + ", " + answer + " FROM hokudai_level2 WHERE " + question + " LIKE '%" + keyword + "%'"
					+ " OR " + answer + " LIKE '%" + keyword + "%' UNION SELECT cd, level, " + question + ", " + answer + " FROM hokudai_level3 WHERE " + question + " LIKE '%" + keyword + "%'"
					+ " OR " + answer + " LIKE '%" + keyword + "%' UNION SELECT cd, level, " + question + ", " + answer + " FROM hokudai_level4 WHERE " + question + " LIKE '%" + keyword + "%'"
					+ " OR " + answer + " LIKE '%" + keyword + "%' UNION SELECT cd, level, " + question + ", " + answer + " FROM hokudai_level5 WHERE " + question + " LIKE '%" + keyword + "%'"
					+ " OR " + answer + " LIKE '%" + keyword + "%' ORDER BY level LIMIT " + limit;
				}
				Ti.API.info(select);
				data = db.execute(select);
				//Ti.API.info('count: ' + data.rowCount);
				var dataNum = data.rowCount;
				if(dataNum>0){
					if(dataNum>=100){
						searchResult = L('search_word_') + keyword + '\n' + L('search_result_') + L('Multiple_results');
					}else{
						searchResult = L('search_word_') + keyword + '\n' + L('search_result_') + data.rowCount + ' ' + L('Hit_');
					}
					
					var i = 0;
					while(data.isValidRow()){
						//var val = data.field(2) + ' / ' + data.field(3);
						//Ti.API.info('val: ' + val);
						arraySearch[i] = [data.field(0), data.field(1), data.field(2), data.field(3)];
						i++;
					    data.next();
					}
					data.close();
					
					var Search = require('ui/common/Search');
					//construct UI
					var search1 = new Search(win, title, bgColor, arraySearch, db, db1, searchResult, searchMode);
					win.add(search1);
					setTimeout(function(){
						win.remove(self);
					}, 100);
				}else{
					searchResult = L('search_word_') + keyword + '\n' + L('search_non');
					
					var Search = require('ui/common/Search');
					//construct UI
					var search1 = new Search(win, title, bgColor, [], db, db1, searchResult, searchMode);
					win.add(search1);
					setTimeout(function(){
						win.remove(self);
					}, 100);
				}
					
				//検索履歴の保存
				var recordSearch = Titanium.App.Properties.getString('recordSearch');
				var arrayRecordSearch = recordSearch.split(',');
				var addData = searchRange + '|' + question + '|' + answer + '|' + keyword + '|' + dataNum + '|' +  yyyymmddhhmiss;
				//Ti.API.info('recordIds: ' + recordIds);
				if(recordSearch==''){
					Titanium.App.Properties.setString('recordSearch', addData);
				}else if(arrayRecordSearch.length>100){
					var recordSearch2 = addData;
					for(i=0; i<100; i++){
						recordSearch2 = recordSearch2 + ',' + arrayRecordSearch[i];
					}
					Titanium.App.Properties.setString('recordSearch', recordSearch2);
				}else{
					Titanium.App.Properties.setString('recordSearch', addData + ',' + recordSearch);
				}
				//Ti.API.info('recordSearch: ' + Titanium.App.Properties.getString('recordSearch'));
		    }
		}else{
			alert(L('search_word_') + keyword + '\n' + L('search_non'));
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

module.exports = History;