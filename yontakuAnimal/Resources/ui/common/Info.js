//FirstView Component Constructor
function Info(win, purchase, opening) {
	var width = Ti.Platform.displayCaps.platformWidth;
	var zoomTableview = Titanium.App.Properties.getDouble('zoomTableview');
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'#000',
	});
	
	var rows = [];
	
	var row = Ti.UI.createTableViewRow();
	
	var label = Titanium.UI.createLabel({
		color:'#fff',
		text:L('Info'),
		font:{fontSize:25*zoomTableview,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'center',
		width:Ti.UI.FILL,
	    height:60*zoomTableview,
	    backgroundGradient:{
		    type:'linear',
		    colors:[
		        {position:0.00,color:'#bfd255'},
		        {position:0.50,color:'#8eb92a'},
		        {position:0.51,color:'#72aa00'},
		        {position:1.00,color:'#9ecb2d'}
		    ]
		}
	});
	row.add(label);
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var back = Ti.UI.createButton({
		color:'#fff',
		title: L('Back'),
		font:{fontSize:20*zoomTableview,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:50*zoomTableview,
		width:100*zoomTableview,
		top:5*zoomTableview,
		bottom:5*zoomTableview,
		left:10*zoomTableview,
		radius:10*zoomTableview,
		borderRadius : 10*zoomTableview,
		borderColor:'#002400',
		borderWidth:1*zoomTableview,
		backgroundGradient:{
		    type:'linear',
		    colors:[
		        {position:0.00,color:'#bfd255'},
		        {position:0.50,color:'#8eb92a'},
		        {position:0.51,color:'#72aa00'},
		        {position:1.00,color:'#9ecb2d'}
		    ]
		},
		style:''
	});
	row.add(back);
	
	//Add behavior for UI
	back.addEventListener('click', function(e) {
		win.remove(self);
	});
	
	rows.push(row);
	
	
	var arrayTitle = ['Feature', 'How_to', 'Movie', 'Mail', 'About'];
	
	var arrayLeft = [purchase + '/icon_48.png', 'Info.png', 'CD.png', 'Mail.png', 'Pictures.png'];
	
	for(i=0; i<arrayTitle.length; i++){
		var row = Ti.UI.createTableViewRow({
		    height:'auto',
		    backgroundColor:'white',
		    hasChild:true,
		});
		
		var leftImage = Titanium.UI.createImageView({
		    image: '/assets/images/' + arrayLeft[i],
		    left:0,
		});
		row.add(leftImage);
		
		var label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:L(arrayTitle[i]),
			font:{fontSize:20*zoomTableview,fontFamily:'Helvetica Neue'},
			textAlign:'left',
			width:width-100,
			height:'auto',
			top:10,
			bottom:10,
			left:60,
			//opacity:0.7,
		});
		row.add(label);
		
		rows.push(row);
	}
	
	var tableview = Titanium.UI.createTableView({top: 0});
	
	tableview.addEventListener('click', function(e){
		//eventオブジェクト
	    var index = e.index; 
	    switch(index){
	    		case 1:
				//win.remove(firstView);
				var Feature = require('ui/common/Feature');
				//construct UI
				var feature = new Feature(win, purchase);
				win.add(feature);
	    		break;
	    		case 2:
				//win.remove(firstView);
				var Howto = require('ui/common/Howto');
				//construct UI
				var howto = new Howto(win, purchase);
				win.add(howto);
	    		break;
	    		case 3:
				//win.remove(firstView);
				var Movie = require('ui/common/Movie');
				//construct UI
				var movie = new Movie(win, purchase, opening);
				win.add(movie);
				if(opening.playing==true){
					opening.stop();
				}
	    		break;
	    		case 4:
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
				emailDialog.setSubject(L(purchase) + ': ' + yyyymmddhhmiss);
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
	    		case 5:
				//win.remove(firstView);
				var About = require('ui/common/' + purchase + '/About');
				//construct UI
				var about = new About(win);
				win.add(about);
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
	
	return self;
}

module.exports = Info;
