//add to win12.js
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

//add to lib/ui.js
exports.createView = function(_backgroundColor, _width, _height, _top, _left){
	var view = Titanium.UI.createView({
	    backgroundColor: _backgroundColor,
	    width: _width,
	    height: _height,
	    top: _top,
	    left: _left,
	});
	return view;
};

