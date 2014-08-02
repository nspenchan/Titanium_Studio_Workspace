exports.createWin2 = function(_title, _backgroundColor, _top, _b1_title, _b2_title, _num1, _num2){
	
	var win2 = require('/ui/ui').createWindow(_title, _backgroundColor, _top);
	
	var ad = require('/lib/admob').createAdmob();
	win2.add(ad);
	
	if (Titanium.Platform.osname !== 'android') {
		var b1 = Titanium.UI.createButton({title:_b1_title});
		var b2 = Titanium.UI.createButton({title:_b2_title});
		win2.LeftNavButton = b1;
		win2.RightNavButton = b2;
		var top = 50;
	}else{
		var b1 = require('ui/ui').createButton('#000', '#fff', 'Back', 16, 'center', 'auto', 'auto');
		b1.bottom = 9;
		b1.left = 10;
		var b2 = require('ui/ui').createButton('#000', '#fff', 'Next', 16, 'center', 'auto', 'auto');
		b2.bottom = 9;
		b2.right = 10;
		var top = 75;
	}
	
	b1.addEventListener('click', function(e){
	   g.tabGroup.activeTab = g.tabGroup.tabs[_num1];
	});
	b2.addEventListener('click', function(e){
	   g.tabGroup.activeTab = g.tabGroup.tabs[_num2];
	});
	
	var url = 'http://google.co.jp/';
	var webview = require('/ui/ui').createWebView(url, top);
	win2.add(webview);
	
	if (Titanium.Platform.osname === 'android') {
		win2.add(b1);
		win2.add(b2);
	}
	/*
	var label = require('ui/ui').createLabel('#999', 'transparent', 'I am Window 2', 20, 'center');
	
	var button = require('ui/ui').createButton('#000', '#fff', 'Open Window 3', 16, 'center', 200, 50, 50);
	
	button.addEventListener('click', function(e){
	    //win1.open();// ウィンドウ２を開く
	    //win2.close();
	    g.tabGroup.activeTab = g.tabGroup.tabs[2];
	});
	
	win2.add(label);
	win2.add(button);
	*/
	//hide tabbar
	//if (Titanium.Platform.osname !== 'android') {win2.hideTabBar();}
	
	return win2;
};