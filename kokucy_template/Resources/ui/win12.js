exports.createWin12 = function(){

	var win12 = require('/ui/ui').createWindow('', 'cyan');
	
	var b1 = require('ui/ui').createButton('#000', '#fff', 'Back to win1', 12, 'center', 'auto', 32, 9, 10);
	var b2 = require('ui/ui').createButton('#000', '#fff', 'Next', 12, 'center', 'auto', 32, 9);
	b2.right = 10;
	
	b1.addEventListener('click', function(e){
	    //back to win1
	    win12.close();
	});
	b2.addEventListener('click', function(e){
	    //move to win11
		win13 = require('ui/win13').createWin13('', 'parple');
		win13.open();
		win12.close();
	});
	
	var matrix0 = Titanium.UI.create2DMatrix().scale(1);
 
	// 0倍の大きさで初期化したWindowを生成します。
	//var view = require('ui/ui').createImageView('cloud.png', 261, 178);
	var photo_dir = Titanium.Filesystem.applicationDataDirectory + '../../../Media/DCIM/100APPLE/IMG_2146.JPG';
	var view = Titanium.UI.createImageView({
	    image: photo_dir,
	    width: 480,
	    height: 690,
	    top:-230,
	    left:-160,
	   // bottom: 0,
	    //right: 0
	});
	
	var imageview = Titanium.UI.createImageView({
	    image: photo_dir,
	    width: 320,
	    height :426,
	    //top:17,
	    //left:0,
	    bottom: 17,
	    right: 0
	});
	view.add(imageview);
	
	view.transform = matrix0;
	// 通常のサイズ(1×1)にへの変形指定をします。
	var matrix1 = Ti.UI.create2DMatrix();
	//matrix1 = matrix1.rotate(180);
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
	
	win12.add(b1);
	win12.add(b2);
	
	return win12;
};