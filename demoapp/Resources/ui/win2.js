exports.createWin2 = function(){
	var win2 = Titanium.UI.createWindow({  
	    title:String.format(L('Tab_'), '2'),
	    backgroundColor:'yellow'
	});
	
	//webView
	var url = 'http://google.co.jp/';
	var webview = Ti.UI.createWebView({
		url: url,
		top: 0
	});
	win2.add(webview);
	
	var b1 = Titanium.UI.createButton({title:L('Back')});
	var b2 = Titanium.UI.createButton({title:L('Next')});
	win2.LeftNavButton = b1;
	win2.RightNavButton = b2;
		
	b1.addEventListener('click', function(){
		tabGroup.activeTab = tabGroup.tabs[0];
	});
	b2.addEventListener('click', function(e){
	   tabGroup.activeTab = tabGroup.tabs[2];
	});	

	
	return win2;
};