exports.createWin4 = function(){
	var win4 = require('/ui/ui').createWindow('Tab 4', 'green');
	
	var b1 = Titanium.UI.createButton({title:'Back'});
	var b2 = Titanium.UI.createButton({title:'Next'});
	win4.LeftNavButton = b1;
	win4.RightNavButton = b2;
		
	b1.addEventListener('click', function(){
		tabGroup.activeTab = tabGroup.tabs[2];
	});
	b2.addEventListener('click', function(e){
	   tabGroup.activeTab = tabGroup.tabs[4];
	});	
	
	//scrollView
	var view1 = require('ui/ui').createView('red', 'auto', 'auto', 0);
	var view2 = require('ui/ui').createView('blue', 'auto', 'auto', 0);
	var view3 = require('ui/ui').createView('green', 'auto', 'auto', 0);
	var view4 = require('ui/ui').createView('black', 'auto', 'auto', 0);
	
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
	win4.add(scrollView);
	
	return win4;
};
