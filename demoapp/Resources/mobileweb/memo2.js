//add to win4.js
	//scrollableView
	var view1 = Titanium.UI.createView({
	    backgroundColor: 'red',
	});
	var view2 = Titanium.UI.createView({
	    backgroundColor: 'blue',
	});
	var view3 = Titanium.UI.createView({
	    backgroundColor: 'green',
	});
	var view4 = Titanium.UI.createView({
	    backgroundColor: 'black',
	});
	var label01 = Titanium.UI.createLabel({
		color: '#999',
	    backgroundColor: 'transparent',
		text: 'View1\nSwipe and Scrool',
		font:{fontSize: 20,fontFamily:'Helvetica Neue'},
		textAlign: 'center',
	});
	var label02 = Titanium.UI.createLabel({
		color: '#999',
	    backgroundColor: 'transparent',
		text: 'View2\nSwipe and Scrool',
		font:{fontSize: 20,fontFamily:'Helvetica Neue'},
		textAlign: 'center',
	});
	var label03 = Titanium.UI.createLabel({
		color: '#999',
	    backgroundColor: 'transparent',
		text: 'View3\nSwipe and Scrool',
		font:{fontSize: 20,fontFamily:'Helvetica Neue'},
		textAlign: 'center',
	});
	var label04 = Titanium.UI.createLabel({
		color: '#999',
	    backgroundColor: 'transparent',
		text: 'View4\nSwipe and Scrool',
		font:{fontSize: 20,fontFamily:'Helvetica Neue'},
		textAlign: 'center',
	});
	view1.add(label01);
	view2.add(label02);
	view3.add(label03);
	view4.add(label04);
	
	// 上記のviewを配列としてviewsプロパティに引き渡します。
	var scrollView = Titanium.UI.createScrollableView({
	    views: [view1,view2,view3,view4],
	    showPagingControl: true,
	    pagingControlHeight: 30,
	    maxZoomScale: 2.0
	});
	// スクロールビューを配置する
	win4.add(scrollView);