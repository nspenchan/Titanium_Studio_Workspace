(function(){
	// 名前空間をさらに機能ごとに分割する
	// 今回はUIを作成するための機能を集約しているので ui と命名した
	myapp.ui = {};
	
	// ファクトリメソッド
	// アプリケーションを起動させるために必要なタブグループやウインドウを生成する
	myapp.ui.createApplicationTabGroup = function(){
		Titanium.UI.setBackgroundColor('#000');
		
		var tabGroup = Ti.UI.createTabGroup({
		    navBarHidden: true,
		});
		
		var tab1 = myapp.ui.createSampleTab('Tab 1', 'KS_nav_views.png', 'I am Window 1');
		var tab2 = myapp.ui.createSampleTab('Tab 2', 'KS_nav_ui.png', 'I am Window 2');
		
		tabGroup.addTab(tab1);
		tabGroup.addTab(tab2);
		
		return tabGroup;
	};
	
	myapp.ui.createSampleTab = function(/* string */ _title, /* string */ _icon, /* string */ _text){
		var win = Titanium.UI.createWindow({
			title: _title,
			backgroundColor: '#fff'
		});
		var tab = Titanium.UI.createTab({
			icon: _icon,
			title: _title,
			window: win
		});
		
		var label = Titanium.UI.createLabel({
			color: '#999',
			text: _text,
			font: {fontSize: 20, fontFamily: 'Helvetica Neue'},
			textAlign: 'center',
			width: 'auto'
		});
		
		win.add(label);
		
		if(Ti.Platform.osname!="android"){win.hideTabBar();}
		
        //if(Ti.Platform.osname!="android"){win.hideNavBar();}
		
		return tab;
	};
})();