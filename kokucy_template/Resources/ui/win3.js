exports.createWin3 = function(){
	var win3 = require('/ui/ui').createWindow('Tab 3', 'red');
	
	var b1 = Titanium.UI.createButton({title:'Back'});
	var b2 = Titanium.UI.createButton({title:'Next'});
	win3.LeftNavButton = b1;
	win3.RightNavButton = b2;

	var arrayName = [];
	var count = 0;
		
	b1.addEventListener('click', function(){
		tabGroup.activeTab = tabGroup.tabs[1];
	});
	
	b2.addEventListener('click', function() {
		tabGroup.activeTab = tabGroup.tabs[3];
	});	
	
	var label1 = require('ui/ui').createLabel('#999', 'transparent', 'I_am_Window_', 20, 'center');
	
	win3.add(label1);
	
	var button1 = require('ui/ui').createButton('#000', '#fff', 'SlideShow', 16, 'center', 200, 50, 50);
	//イベントリスナー
	button1.addEventListener('click', function(){
		// タブの切り替え
		//tabGroup.activeTab = tabGroup.tabs[1];
		win31 = require('ui/win31').createWin31('', 'pink');
	   win31.open();
	});
	
	win3.add(button1);

	return win3;
};