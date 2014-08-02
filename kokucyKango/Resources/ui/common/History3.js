function History(win, title, bgColor, dbName, arrayPurchase, db, db1) {
	var top = 0;
	var addData, ampm, arrayRecordSearch, arrayRecordSearch2, back, buttonWidth, 
		count, data0, dataDifference, dataNum, i, idMax, idMin, index, keyword, 
		label, label1, limit, mode, que, range, recordSearch, recordSearch2, 
		result, roup, row, row1, rowCount, rows, search, Search, searchMode, 
		searchRange, select, self, tableview, test, val, view;
	
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
	
	recordSearch = Titanium.App.Properties.getString('recordSearch');
	Ti.API.info(recordSearch);
	arrayRecordSearch = recordSearch.split(',');
	//Ti.API.info(arrayRecordSearch);
	if(arrayRecordSearch[0]==''){
		row = Ti.UI.createTableViewRow({
		    height:'auto',
		    backgroundColor:'#fff',
		    id:'',
		    check:0,
		});
		
		label = Titanium.UI.createLabel({
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
		roup = 0;//時間表示Rowを管理する
		for(i=0; i<arrayRecordSearch.length; i++){
			if(arrayRecordSearch[i]){
				arrayRecordSearch2 = arrayRecordSearch[i].split('|');
				
				dataDifference = yyyymmddhhmiss-arrayRecordSearch2[3];
				row1 = Ti.UI.createTableViewRow({
				    height:'auto',
				    backgroundColor:'gray',
				    id:'',
				});
				
				label1 = Titanium.UI.createLabel({
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
				
				row = Ti.UI.createTableViewRow({
				    height:'auto',
				    backgroundColor:'#fff',
				    id:arrayRecordSearch2[0],
				    range:arrayRecordSearch2[2],
				    result:arrayRecordSearch2[1],
				    hasChild:true,
				});
				
				if(arrayRecordSearch2[1]>=1){
					row.backgroundColor = 'green';
				}else{
					row.backgroundColor = 'pink';
				}

				
				if(arrayRecordSearch2[2]=='all'){
					serachMode = L('Search_Range_') + L('ALL');
				}else{
					test = arrayRecordSearch2[2];
					if(test.substring(0, 4) == 'care'){
						ampm = '';
					}else if(test.substring(7) == 'a'){
						ampm = '午前';
					}else if(test.substring(7) == 'b'){
						ampm = '午後';
					}
					serachMode = L('Search_Range_') + L(test.substring(0, 4)) + test.substring(4, 7) + '回' + ampm;
				}
				row.mode = serachMode;
				
				label = Titanium.UI.createLabel({
					color:'#000',
					backgroundColor:'transparent',
					text:L('search_word_') + arrayRecordSearch2[0] + '\n' + serachMode + '\n'
						+ L('search_result_') + arrayRecordSearch2[1] + L('Hit_'),
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
	}

	tableview = Titanium.UI.createTableView({top: top+scale(60)});
	
	tableview.addEventListener('click', function(e){
		Ti.API.info(JSON.stringify(e));
		
		keyword = e.row.id;
		range = e.row.range;
		result = e.row.result;
		mode = e.row.mode;
		limit = 100;
		
	    if(result>0){
		    if(keyword){
				arraySearch = [];
				if (range!='all') {
					searchRange = range;
					///db0 = Ti.Database.open(dbName);
					select = 'SELECT id FROM ' + dbName + ' WHERE name = "' + range+ '"';
					data0 = db.execute(select);
					idMin  = data0.field(0);
					rowCount = data0.rowCount;
					idMax = idMin + rowCount - 1;
					data0.close();
					
					//取得データを１００件に制限
					select = "SELECT id, times, ampm, bang, question FROM " + dbName + " WHERE (question LIKE '%" + keyword + "%'";
					select = select + " OR question2 LIKE '%" + keyword + "%' OR answer1 LIKE '%" + keyword + "%'";
					select = select + " OR answer2 LIKE '%" + keyword + "%' OR answer3 LIKE '%" + keyword + "%'";
					select = select + " OR answer4 LIKE '%" + keyword + "%' OR answer5 LIKE '%" + keyword + "%')";
					select = select + " AND (ID >= " + idMin + " AND ID<= " + idMax + ") ORDER BY id LIMIT " + limit;
				}else{
					searchRange = 'all';
					//取得データを１００件に制限
					select = "SELECT id, times, ampm, bang, question FROM " + dbName + " WHERE question LIKE '%" + keyword + "%'";
					select = select + " OR question2 LIKE '%" + keyword + "%' OR answer1 LIKE '%" + keyword + "%'";
					select = select + " OR answer2 LIKE '%" + keyword + "%' OR answer3 LIKE '%" + keyword + "%'";
					select = select + " OR answer4 LIKE '%" + keyword + "%' OR answer5 LIKE '%" + keyword + "%'";
					select = select + " ORDER BY id LIMIT " + limit;
				}
				//db = Titanium.Database.open(dbName);
				//Ti.API.info(select);
				data = db.execute(select);
				//Ti.API.info('count: ' + data.rowCount);
				dataNum = data.rowCount;
				if(dataNum>0){
					if(dataNum>=100){
						searchResult = L('search_word_') + keyword + '\n' + L('search_result_') + L('Multiple_results');
					}else{
						searchResult = L('search_word_') + keyword + '\n' + L('search_result_') + data.rowCount + ' ' + L('Hit_');
					}
					
					count = 0;
					while(data.isValidRow()){
						que = data.field(4);
						if(que.length>20){
							que = que.substr(0, 20) +'…';
						}
						val = data.field(1) + '回' + data.field(2) + data.field(3) + '問 ' + que;
						//Ti.API.info('val: ' + val);
						arraySearch[count] = [data.field(0), val];
						count++;
					    data.next();
					}
					Search = require('ui/common/Search');
					//construct UI
					search = new Search(win, 'Searches_', '#ff7fff', dbName, arrayPurchase, arraySearch, db, db1, searchResult, mode);
					win.add(search);
					setTimeout(function(){
						win.remove(self);
					}, 100);
				}else{
					searchResult = L('search_word_')+ keyword + '\n' + L('search_non');
					
					Search = require('ui/common/Search');
					//construct UI
					search = new Search(win, 'Searches_', '#ff7fff', dbName, arrayPurchase, [], db, db1, searchResult, mode);
					win.add(search);
					setTimeout(function(){
						win.remove(self);
					}, 100);
				}
				
				//検索履歴の保存
				recordSearch = Titanium.App.Properties.getString('recordSearch');
				arrayRecordSearch = recordSearch.split(',');
				addData = keyword + '|' + dataNum + '|' + searchRange + '|' + yyyymmddhhmiss;
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