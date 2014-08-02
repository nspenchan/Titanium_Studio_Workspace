(function(){
	// 名前空間をさらに機能ごとに分割する
	// 今回はUIを作成するための機能を集約しているので ui と命名した
	app.ui = {};
	
	// ステップ8: マップを表示させる
	if (Ti.Platform.osname == 'iphone') {
		Ti.Geolocation.purpose = "写真を撮った場所を保存するために利用します。";
	}
	
	// ファクトリメソッド
	// アプリケーションを起動させるために必要なタブグループやウインドウを生成する
	app.ui.createApplicationTabGroup = function(){
		Titanium.UI.setBackgroundColor('#000');
		
		var tabGroup = Ti.UI.createTabGroup();
		
		var tab1 = app.ui.photo.createTab();
		var tab2 = app.ui.map.createTab();
		
		tabGroup.addTab(tab1);
		tabGroup.addTab(tab2);
		
		return tabGroup;
	};
})();

Ti.include(
	'photo.js',
	'map.js'
);
