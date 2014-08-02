exports.createWin4 = function(_title, _backgroundColor, _top, _b1_title, _b2_title, _num1, _num2){
	var win4 = require('/ui/ui').createWindow(_title, _backgroundColor, _top);
	
	var ad = require('/lib/admob').createAdmob();
	win4.add(ad);
	
	if (Titanium.Platform.osname !== 'android') {
		var b1 = Titanium.UI.createButton({title:_b1_title});
		var b2 = Titanium.UI.createButton({title:_b2_title});
		win4.LeftNavButton = b1;
		win4.RightNavButton = b2;
		var top = 50;
	}else{
		var b1 = require('ui/ui').createButton('#000', '#fff', 'Back', 16, 'center', 'auto', 'auto');
		b1.bottom = 9;
		b1.left = 10;
		var b2 = require('ui/ui').createButton('#000', '#fff', 'Next', 16, 'center', 'auto', 'auto');
		b2.bottom = 9;
		b2.right = 10;
		var top =75;
	}
	
	b1.addEventListener('click', function(e){
	   g.tabGroup.activeTab = g.tabGroup.tabs[_num1];
	});
	b2.addEventListener('click', function(e){
	   g.tabGroup.activeTab = g.tabGroup.tabs[_num2];
	});
	// マーカーはAnnotationオブジェクトとして表現される。
	var tokyo_station = Titanium.Map.createAnnotation({
        latitude:35.681382,
        longitude:139.766084,
        title:"東京駅",
        subtitle:'Tokyo Station (Tokyo)',
        pincolor:Titanium.Map.ANNOTATION_PURPLE,
        animate:true,
        //leftButton:'images/atlanta.jpg',
        //rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
        //myid:3 // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS    
	});
	// MapViewオブジェクトを作成する。
	var mapview = Titanium.Map.createView({
		top: top,
        mapType: Titanium.Map.STANDARD_TYPE,
        region: {latitude:35.681382, longitude:139.766084, latitudeDelta:0.01, longitudeDelta:0.01},
        animate:true,
        regionFit:true,
        userLocation:true,
        annotations:[tokyo_station]
	});
	win4.add(mapview);
	
	if (Titanium.Platform.osname === 'android') {
		win4.add(b1);
		win4.add(b2);
	}
	/*
	var label = require('ui/ui').createLabel('#999', 'transparent', 'I am Window 4', 20, 'center');
	
	var button = require('ui/ui').createButton('#000', '#fff', 'Open Window 5', 16, 'center', 200, 50, 50);
	
	button.addEventListener('click', function(e){
	    //win1.open();// ウィンドウ２を開く
	    //win2.close();
	    g.tabGroup.activeTab = g.tabGroup.tabs[4];
	});
	
	win4.add(label);
	win4.add(button);
	*/
	//hide tabbar
	//if (Titanium.Platform.osname !== 'android') {win4.hideTabBar();}
	
	return win4;
};