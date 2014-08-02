function History(win, title, bgColor, dbName, arrayPurchase, db, db1) {
	var top = 0,
	arrayId = [];
	var arrayRecord2, back, buttonWidth, children, daraDifference, data, i, index, 
		label, label1, leftImage, que, Question, question, recordIds, roup, 
		row, row1, rows, section, select, self, solve, tableview, view;
	
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
				arrayId.push(section.rows[i].id);
			}
		}
		if(arrayId.length==0){
			alert(L('Select_Questions'));
		}else{
			Question = require('ui/common/Question');
			//construct UI
			question = new Question(win, 'History2_', bgColor, dbName, arrayPurchase, [], arrayId, -1, '', db, db1);
			win.add(question);
			
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
	
	recordIds = Titanium.App.Properties.getString('recordIds');
	//test
	//recordIds ="22|○|pink|★|20140417183035,23|○|pink|★|20140417181535,24|○|pink|★|20140417180035,25|○|pink|★|20140417174535,26|○|pink|★|20140417173035,27|○|pink|★|20140417171535,28|○|pink|★|20140417170035,29|○|pink|★|20140416190035,30|○|pink|★|20140416180035,31|○|pink|★|20140317180035,32|○|pink|★|20130317180035,33|○|pink|★|20120317180035";
	Ti.API.info(recordIds);
	arrayRecordIds = recordIds.split(',');
	Ti.API.info(arrayRecordIds);
	if(arrayRecordIds[0]==''){
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
		for(i=0; i<arrayRecordIds.length; i++){
			if(arrayRecordIds[i]){
				arrayRecordIds2 = arrayRecordIds[i].split('|');
				select = 'SELECT times, ampm, bang, question FROM ' + dbName + ' WHERE id = ' + arrayRecordIds2[0];
				data = db.execute(select);
				dataDifference = yyyymmddhhmiss-arrayRecordIds2[4];
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
				    backgroundColor:arrayRecordIds2[2],
				    id:arrayRecordIds2[0],
				    check:0,
				});
				
				leftImage = Titanium.UI.createImageView({
				    image: '/assets/images/check-non.gif',
				    width:scale(48),
				    height:scale(48),
				    left:0,
				});
				row.add(leftImage);
				
				que = data.field(3);
				if(que.length>20){
					que = que.substr(0, 20) +'…';
				}
				
				label = Titanium.UI.createLabel({
					color:'#000',
					backgroundColor:'transparent',
					text:arrayRecordIds2[3] + ' ' + data.field(0) + '回' + data.field(1) + data.field(2) + '問 '+ que + '\n' + arrayRecordIds2[1],
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
			    data.close();
			}
		}
	}

	tableview = Titanium.UI.createTableView({top: top+scale(60)});
	
	tableview.addEventListener('click', function(e){
		//Ti.API.info(JSON.stringify(e));
		
	    section = tableview.data[0];
		index = e.index;
		children = section.rows[index].getChildren();
		if(children[0].image=='/assets/images/check-non.gif'){
			children[0].image = '/assets/images/check.gif';
			section.rows[index].check = 1;
		}else if(children[0].image=='/assets/images/check.gif'){
			children[0].image = '/assets/images/check-non.gif';
			section.rows[index].check = 0;
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