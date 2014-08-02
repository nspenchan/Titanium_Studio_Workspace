//FirstView Component Constructor
function Music(win, opening) {
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
		text:L('Music'),
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
		if(val != Ti.App.Properties.getString('music')){
			opening.stop();
			
			var bgm00 = Titanium.Media.createSound({
			    url: '/assets/sound/' + val,
			    looping : true,
			});
			bgm00.play();
			
			var alertDialog = Titanium.UI.createAlertDialog({
			    title: L('Music'),
			    message: L('want_to_set_this_music'),
			    //message: L('Are_you_sure_you_want_to_set_this_music_to_bgm_when_you_are_learning'),
			    buttonNames: [L('OK'),L('Cancel')],
			    // キャンセルボタンがある場合、何番目(0オリジン)のボタンなのかを指定できます。
			    //cancel: 1
			});
			alertDialog.addEventListener('click',function(event){
			    // Cancelボタンが押されたかどうか
			    if(event.index == 1){
			        // cancel時の処理
			        alert(L('Reselect_Music'));
			        bgm00.stop();
			        opening.play();
			    }else if(event.index == 0){
			        // "OK"時の処理Ti.API.info(musicArray[i]);
					var index1 = musicArray.indexOf(Ti.App.Properties.getString('music'));
					var index2 = musicArray.indexOf(val);
					alert(L('Music_change') + '\n' + L(textArray[index1]) + ' > ' + L(textArray[index2]));
					
					Ti.App.Properties.setString('music', val);
			        bgm00.stop();
			        opening.play();
			    }
			});
			alertDialog.show();	
		}
		setTimeout(function(){
			win.remove(self);
		}, 100);
	});
	
	rows.push(row);
	
	var musicArray = ['kougen-naru-daichi.mp3', 'jungle.mp3', 'hirogaru-kaze.mp3', 'realism.mp3', 'wakuwaku-dokidoki.mp3', 'natures-call.mp3'];
	var textArray = ['kougen_naru_daichi_defualt', 'jungle', 'hirogaru_kaze', 'realism', 'wakuwaku_dokidoki_opening', 'natures_call_ending'];
    
    var val = Ti.App.Properties.getString('music');
    
    for(i=0; i<musicArray.length; i++){
    		var row = Ti.UI.createTableViewRow({
		    height:'auto',
		    backgroundColor:'white',
		    val:musicArray[i],
		});
		
		var leftImage = Titanium.UI.createImageView({
		    image: '/assets/images/Checkmark-non.png',
		    left:0,
		});
		if(musicArray[i] == Ti.App.Properties.getString('music')){
			leftImage.image = '/assets/images/Checkmark.png';
			row.backgroundColor = 'green';
		}
		/*
		leftImage.addEventListener('click', function(e) {
			if(e.source.val != Ti.App.Properties.getString('music')){
				opening.stop();
				
				var bgm00 = Titanium.Media.createSound({
				    url: '/assets/sound/' + e.source.val,
				    looping : true,
				});
				bgm00.play();
				
				var alertDialog = Titanium.UI.createAlertDialog({
				    title: L('Music'),
				    message: L('want_to_set_this_music'),
				    //message: L('Are_you_sure_you_want_to_set_this_music_to_bgm_when_you_are_learning'),
				    buttonNames: [L('OK'),L('Cancel')],
				    // キャンセルボタンがある場合、何番目(0オリジン)のボタンなのかを指定できます。
				    //cancel: 1
				});
				alertDialog.addEventListener('click',function(event){
				    // Cancelボタンが押されたかどうか
				    if(event.index == 1){
				        // cancel時の処理
				        alert(L('Reselect_Music'));
				        bgm00.stop();
				        opening.play();
				    }else if(event.index == 0){
				        // "OK"時の処理Ti.API.info(musicArray[i]);
						var index1 = musicArray.indexOf(Ti.App.Properties.getString('music'));
						var index2 = musicArray.indexOf(e.source.val);
						alert(L('Music_change') + '\n' + L(textArray[index1]) + ' > ' + L(textArray[index2]));
						
						Ti.App.Properties.setString('music', e.source.val);
						setTimeout(function(){
							var Music = require('ui/common/Music');	
							//construct UI
							var music = new Music(win, opening);
							win.add(music);
							win.remove(self);
						}, 100);
				        bgm00.stop();
				        opening.play();
				    }
				});
				alertDialog.show();	
			}
		});
		*/
		row.add(leftImage);
		
		var label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:L(textArray[i]),
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
		//Ti.API.info(JSON.stringify(e));
		if(e.row.val || e.row.val==0){
			val = e.row.val;
			
		    section = tableview.data[0];
			for(i=0; i<section.rows.length; i++){
				if(i==e.index){
					section.rows[i].backgroundColor = 'green';
					children = section.rows[i].getChildren();
					children[0].image = '/assets/images/Checkmark.png';
				}else{
					section.rows[i].backgroundColor = 'white';
					children = section.rows[i].getChildren();
					children[0].image = '/assets/images/Checkmark-non.png';
				}
			}
		}
	});
	
    tableview.startLayout();
    tableview.setData(rows);
    tableview.finishLayout();
    
    self.add(tableview);
	
	return self;
}

module.exports = Music;
