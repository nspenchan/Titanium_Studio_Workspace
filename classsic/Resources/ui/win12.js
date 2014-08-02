exports.createWin12 = function(_title, _backgroundColor, _top, _b1_title, _b2_title, _num1, _num2){

	var win12 = require('/ui/ui').createWindow(_title, _backgroundColor, _top);
	
	var b1 = require('ui/ui').createButton('#000', '#fff', _b1_title, 12, 'center', 'auto', 32, 9, 10);
	var b2 = require('ui/ui').createButton('#000', '#fff', _b2_title, 12, 'center', 'auto', 32, 9);
	b2.right = 10;
	
	b1.addEventListener('click', function(e){
	    //Tab unable to change
	    //g.tabGroup.activeTab = g.tabGroup.tabs[1];
	    g.win12.close();
	});
	b2.addEventListener('click', function(e){
	    //g.tabGroup.activeTab = g.tabGroup.tabs[0];
		g.win11 = require('ui/win11').createWin11('', 'pink', 0, 'Back', 'Next');
		g.win11.open();
		g.win12.close();
	});
	
	var matrix0 = Titanium.UI.create2DMatrix().scale(0.5);
 
	// 0倍の大きさで初期化したWindowを生成します。
	var view = require('ui/ui').createImageView('cloud.png', 261, 178);
	view.transform = matrix0;
	// 通常のサイズ(1×1)にへの変形指定をします。
	var matrix1 = Ti.UI.create2DMatrix();
	matrix1 = matrix1.rotate(180);
	matrix1 = matrix1.scale(2, 2);
	 
	var a = Titanium.UI.createAnimation({
		transform: matrix1,
		duration: 2000,
		repeat:1
	});
	// 通常サイズへのアニメーションします。
	a.addEventListener('complete', function(){
	    // 実際のサイズに戻すためには次のような手順もあります。
	    var matrix2 = Titanium.UI.create2DMatrix();
	    view.animate({transform:matrix2, duration:2000});
	});
	

	var button = require('ui/ui').createButton('#000', '#fff', 'Animate', 16, 'center', 200, 40);
	button.bottom = 20;
	
	button.addEventListener('click', function(){
		view.animate(a);
	});
	
	win12.add(view);
	win12.add(button);
	/*
	var label = require('ui/ui').createLabel('#999', 'transparent', 'I am Window 12', 20, 'center');
	
	var button = require('ui/ui').createButton('#000', '#fff', 'Open Window 11', 16, 'center', 200, 50, 50);
	
	button.addEventListener('click', function(e){
	    //win1.open();// ウィンドウ２を開く
	    //win2.close();
		g.win11 = require('ui/win11').createWin11('', 'pink', 50, 'Back', 'Next');
		g.win11.open();
		g.win12.close();
	});
	
	win12.add(label);
	win12.add(button);
	*/
	
	win12.add(b1);
	win12.add(b2);
	
	return win12;
};