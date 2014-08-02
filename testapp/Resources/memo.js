//add to win11.js
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
	    //alert('e.state: ' + JSON.stringify(e.state));
	});
	scrollView.add(imageView);
	win11.add(scrollView);
