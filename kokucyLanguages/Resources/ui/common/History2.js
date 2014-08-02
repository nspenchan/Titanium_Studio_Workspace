function History2(win, title, bgColor, db, db1) {
	var top = 0;
	var arrayId = [];
	var arrayRecordIds, arrayRecordIds2, back, buttonWidth, children, dataDifference, 
		label, label1, leftImage, Question, question1, recordIds, roup, row, 
		row1, rows, section, self, solve, tableview, view;
	
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
    			//arrayRecord = [];
    			//bang = '';
			Question = require('ui/common/Question');
			//construct UI
			question1 = new Question(win, 'History2_', bgColor, [], arrayId, -1, '', db, db1);
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
				
				dataDifference = yyyymmddhhmiss-arrayRecordIds2[9];
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
				    backgroundColor:arrayRecordIds2[7],
				    level:arrayRecordIds2[0],
				    id:arrayRecordIds2[1],
				    question:arrayRecordIds2[2],
				    answer:arrayRecordIds2[3],
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
					text:L('Level') + ' ' + arrayRecordIds2[0] + ' / ' + L('No_') + arrayRecordIds2[1] + ' ' + arrayRecordIds2[8] + '\n'
						+ arrayRecordIds2[4] + ' / ' + arrayRecordIds2[5] + '\n' + arrayRecordIds2[6],
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
	}

	tableview = Titanium.UI.createTableView({top: top+scale(60)});
	
	tableview.addEventListener('click', function(e){
		Ti.API.info(JSON.stringify(e));
	    section = tableview.data[0];
		children = section.rows[e.index].getChildren();
		if(children[0].image=='/assets/images/check-non.gif'){
			children[0].image = '/assets/images/check.gif';
			section.rows[e.index].check = 1;
		}else if(children[0].image=='/assets/images/check.gif'){
			children[0].image = '/assets/images/check-non.gif';
			section.rows[e.index].check = 0;
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

module.exports = History2;