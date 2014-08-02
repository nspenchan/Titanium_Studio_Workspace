exports.createWin5 = function(_title, _backgroundColor, _top, _b1_title, _b2_title, _num1, _num2){
	var win5 = require('/ui/ui').createWindow(_title, _backgroundColor, _top); 
	
	var ad = require('/lib/admob').createAdmob();
	win5.add(ad);
	
	if (Titanium.Platform.osname !== 'android') {
		var b1 = Titanium.UI.createButton({title:_b1_title});
		var b2 = Titanium.UI.createButton({title:_b2_title});
		win5.LeftNavButton = b1;
		win5.RightNavButton = b2;
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
	
	var view1 = require('ui/ui').createView('red', 'auto', 'auto', top);
	var view2 = require('ui/ui').createView('blue', 'auto', 'auto', top);
	var view3 = require('ui/ui').createView('green', 'auto', 'auto', top);
	var view4 = require('ui/ui').createView('black', 'auto', 'auto', top);
	
	var label1 = require('ui/ui').createLabel('#999', 'transparent', 'View1\nSwipe and Scrool', 20, 'center');
	var label2 = require('ui/ui').createLabel('#999', 'transparent', 'View2\nSwipe and Scrool', 20, 'center');
	var label3 = require('ui/ui').createLabel('#999', 'transparent', 'View3\nSwipe and Scrool', 20, 'center');
	var label4 = require('ui/ui').createLabel('#999', 'transparent', 'View4\nSwipe and Scrool', 20, 'center');
	
	view1.add(label1);
	view2.add(label2);
	view3.add(label3);
	view4.add(label4);
	
	// 上記のviewを配列としてviewsプロパティに引き渡します。
	var scrollView = Titanium.UI.createScrollableView({
	    views: [view1,view2,view3,view4],
	    showPagingControl: true,
	    pagingControlHeight: 30,
	    maxZoomScale: 2.0
	});
	// スクロールビューを配置する
	win5.add(scrollView);
	
	if (Titanium.Platform.osname === 'android') {
		win5.add(b1);
		win5.add(b2);
	}
	/*
	var label = require('ui/ui').createLabel('#999', 'transparent', 'I am Window 5', 20, 'center');
	
	var button = require('ui/ui').createButton('#000', '#fff', 'Return Window 1', 16, 'center', 200, 50, 50);
	
	button.addEventListener('click', function(e){
	    //win1.open();// ウィンドウ２を開く
	    //win2.close();
	    g.tabGroup.activeTab = g.tabGroup.tabs[0];
	});
	
	win5.add(label);
	win5.add(button);
	*/
	//hide tabbar
	//if (Titanium.Platform.osname !== 'android') {win5.hideTabBar();}
	
	return win5;
};