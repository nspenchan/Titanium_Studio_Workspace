(function(){
	//in-app purchase setting
	var purchase = 'pro';
	
	var wWidth = Titanium.Platform.displayCaps.platformWidth;
	var wHeight = Titanium.Platform.displayCaps.platformHeight;
	var wRatio = wHeight/wWidth;
	
	if(!Ti.App.Properties.hasProperty("intialization")){
		Ti.App.Properties.setInt("intialization", 0);
	}
	
	if (!Titanium.App.Properties.hasProperty('Purchased-'+purchase)) {
		Titanium.App.Properties.setBool('Purchased-'+purchase, false);
	}
	
	if (!Titanium.App.Properties.hasProperty('bgm')) {
		Titanium.App.Properties.setBool('bgm', true);
	}
	
	if (!Titanium.App.Properties.hasProperty('themesong')) {
		Titanium.App.Properties.setBool('themesong', true);
	}
	
	if(!Ti.App.Properties.hasProperty('setDatabase')){
		Ti.App.Properties.setInt('setDatabase', 0);
	}
	
	if(!Ti.App.Properties.hasProperty('counter')){
		Ti.App.Properties.setInt('counteer', 0);
	}
	
	if(!Ti.App.Properties.hasProperty('fontsize')){
		Ti.App.Properties.setInt('fontsize', 20);
	}
	
	if(!Ti.App.Properties.hasProperty('mail')){
		Titanium.App.Properties.setString('mail', 'dev.kokucy@gmail.com');
	}
	
	if(!Ti.App.Properties.hasProperty('zoom')){
		Titanium.App.Properties.setDouble('zoom', 1.1);
	}
	//Thema Song
	var bgm00 = Titanium.Media.createSound({
	    // リモートURLも指定できます
	    // url : "http://www.nch.com.au/acm/8kmp38.wav"
	    url: 'assets/sound/Believe_In_My_Heart.mp3',
	    looping : true,
	});
	
	//alert(Titanium.App.Properties.getBool('Purchased-'+purchase));
    //Win1,Win2 共通のラベル
    var label00 = Titanium.UI.createLabel({
        color:'#000',
        backgroundColor:'#fff',
        text:L('Initialization'),
        font:{fontSize:30,fontFamily:'Helvetica Neue'},
        textAlign:'center',
        width:'auto',
        height:'auto',
        top:80,
        right:10,
        opacity:0.7
    });
    if(Ti.App.Properties.getInt("intialization")==3){
    		label00.text = L('Manege_Project');
	    if(Ti.App.Properties.getBool('Purchased-'+purchase)==false){
			label00.opacity = 0;
		}
    }
    var label_pro = Titanium.UI.createLabel({
        backgroundImage:'assets/images/pro_ver.png',
        width:100,
        height:100,
        top:0,
        right:0,
        opacity:0.7
    });
    if(Ti.App.Properties.getBool('Purchased-'+purchase)==false){
		label_pro.opacity = 0;
	}
	var themesong = Titanium.UI.createView({
		backgroundImage:'assets/images/no_sound_x.png',
		width:48,
		height:48,
		bottom:10,
		left:10,
	});
	
	//var count1 = 0;
	require('lib/db').createDatabase(1, 'p001', 'First Project');
	
	var Window1 = require('ui/win1');
	var Window2 = require('ui/win2');
	var Window3 = require('ui/win3');

	var tabGroup = Ti.UI.createTabGroup({
		navBarHidden:true,//for android
	});
	
	//Titanium.UI.iPhone.hideStatusBar();
	
	//create app tabs
	var win1 = new Window1(L('Home'), tabGroup, win1, wRatio, bgm00, label00, label_pro, themesong, purchase);
	var win2 = new Window2(L('Setting'), tabGroup, wRatio, bgm00, label00, label_pro, themesong, win1, purchase);
	var win3 = new Window3(L('Info'), tabGroup, bgm00, themesong);
	//iphone only
	win1.tabBarHidden = true;
	win1.navBarHidden = true;
	win2.tabBarHidden = true;
	win3.tabBarHidden = true;
	
	var tab1 = Ti.UI.createTab({
		title: L('Home'),
		icon: 'assets/images/light_home@2x.png',
		window: win1
	});
	win1.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: L('Setting'),
		icon: 'assets/images/light_gear@2x.png',
		window: win2
	});
	win2.containingTab = tab2;
	
	var tab3 = Ti.UI.createTab({
		title: L('Info'),
		icon: 'assets/images/light_info@2x.png',
		window: win3
	});
	win3.containingTab = tab3;
	/*
	var table = Ti.UI.createTableView({
		data: [
			{title:'Row1', hasChild:true, editable:true}
		]
	});
	*/
	//win2.add(table);
	
	tabGroup.addTab(tab1);
	tabGroup.addTab(tab2);
	tabGroup.addTab(tab3);
	tabGroup.open();
})();
/*
if(Ti.App.Properties.hasProperty("intialization")){
	Ti.App.Properties.setInt('intialization', 0);
}

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

require('lib/db').createDatabase();

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = require('ui/win1').createWin();
var win2 = require('ui/win2').createWin();
var win3 = require('ui/win3').createWin();
    
var tab1 = Titanium.UI.createTab({  
    icon:'assets/images/light_home@2x.png',
    title:'Home',
    window:win1
});   
var tab2 = Titanium.UI.createTab({  
    icon:'assets/images/light_gear@2x.png',
    title:'Setting',
    window:win2
});
var tab3 = Titanium.UI.createTab({  
    icon:'assets/images/light_info@2x.png',
    title:'Info',
    window:win3
});

//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3); 

// open tab group
tabGroup.open();
*/
