exports.createWin11 = function(_title, _backgroundColor, _top, _b1_title, _b2_title, _num1, _num2){
	var win11 = require('/ui/ui').createWindow(_title, _backgroundColor, _top);
	
	var b1 = require('ui/ui').createButton('#000', '#fff', _b1_title, 12, 'center', 'auto', 32, 9, 10);
	var b2 = require('ui/ui').createButton('#000', '#fff', _b2_title, 12, 'center', 'auto', 32, 9);
	b2.right = 10;
	
	b1.addEventListener('click', function(e){
	    //Tab unable to change
	    //g.tabGroup.activeTab = g.tabGroup.tabs[1];
	    g.win11.close();
	});
	b2.addEventListener('click', function(e){
	    //g.tabGroup.activeTab = g.tabGroup.tabs[0];
		g.win12 = require('ui/win12').createWin12('', 'cyan', 0, 'Back', 'Next');
		g.win12.open();
		g.win11.close();

	});
	var scrollView = Titanium.UI.createScrollView({
	    contentWidth:'auto',
	    contentHeight:'auto',
	    top:0,
	    bottom: 0,
	    showVerticalScrollIndicator:true,
	    showHorizontalScrollIndicator:true,
	    maxZoomScale:2,
	    minZoomScale:0.5
	});
	
	// ローカルにある画像を指定する場合。
	//  (http://〜で始まるパスを入れるとリモートから取得されます)
	var imageView = require('ui/ui').createImageView('light_add@2x.png', 100, 100);
	// 画像読み込み完了時のイベント
	imageView.addEventListener('load', function(e){
	    // e.stateに状態が返されます
	});
	scrollView.add(imageView);
	win11.add(scrollView);
	/*
	var label = require('ui/ui').createLabel('#999', 'transparent', 'I am Window 11', 20, 'center');
	
	var button = require('ui/ui').createButton('#000', '#fff', 'Open Window 12', 16, 'center', 200, 50, 50);
	
	button.addEventListener('click', function(e){
	    //win1.open();// ウィンドウ２を開く
	    //win2.close();
		g.win12 = require('ui/win12').createWin12('', 'cyan', 50, 'Back', 'Next');
		g.win12.open();
		g.win11.close();
});
	
	win11.add(label);
	win11.add(button);
	*/
	win11.add(b1);
	win11.add(b2);
	
	return win11;
};