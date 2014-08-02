exports.createWin11 = function(){
	var win11 = require('/ui/ui').createWindow('', 'pink');
	
	var b1 = require('ui/ui').createButton('#000', '#fff', 'Back to Win1', 12, 'center', 'auto', 32, 9, 10);
	var b2 = require('ui/ui').createButton('#000', '#fff', 'Next', 12, 'center', 'auto', 32, 9);
	b2.right = 10;
	
	b1.addEventListener('click', function(e){
	    //Back to win1.js
	    win11.close();
	});
	b2.addEventListener('click', function(e){
	    //move to win12.js
		win12 = require('ui/win12').createWin12('', 'cyan');
		win12.open();
		win11.close();

	});

	var scrollView = Titanium.UI.createScrollView({
	    contentWidth:320,
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
	var photo_dir = Titanium.Filesystem.applicationDataDirectory + '../../../Media/DCIM/100APPLE/IMG_2146.JPG';
	//alert(photo_dir);
	//var imageView = require('ui/ui').createImageView('light_add@2x.png', 100, 100);
	var imageView = Titanium.UI.createImageView({
	    image: photo_dir,
	});
	// 画像読み込み完了時のイベント
	imageView.addEventListener('load', function(e){
	    // e.stateに状態が返されます
	    //alert('e.state: ' + JSON.stringify(e.state));
	});
	scrollView.add(imageView);
	win11.add(scrollView);
	
	//win11.add(imageView)

	win11.add(b1);
	win11.add(b2);
	
	return win11;
};