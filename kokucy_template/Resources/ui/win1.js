exports.createWin1 = function(){
	var win1 = require('/ui/ui').createWindow('Tab_', 'blue');
	
	var b1 = Titanium.UI.createButton({title:L('BGM_ON')});
	var b2 = Titanium.UI.createButton({title:L('Next')});
	win1.LeftNavButton = b1;
	win1.RightNavButton = b2;
		
	b1.addEventListener('click', function(){
		//tabGroup.activeTab = tabGroup.tabs[4];
		if(bgm.playing == false){
			bgm.play();
			b1.title = L('BGM_OFF');
			//b1.backgroundColor = 'red';
		}else{
			bgm.stop();
			b1.title = L('BGM_ON');
			//b1.backgroundColor = '';
		}
	});
	b2.addEventListener('click', function(e){
	   tabGroup.activeTab = tabGroup.tabs[1];
	});	

	
	var label1 = require('ui/ui').createLabel('#999', 'transparent', 'I_am_Window_', 20, 'center');
	
	win1.add(label1);
	
	//ボタンの作成
	var button1 = require('ui/ui').createButton('#000', '#fff', 'Open Window 11', 16, 'center', 200, 50, 50);
	//イベントリスナー
	button1.addEventListener('click', function(){
		// タブの切り替え
		//tabGroup.activeTab = tabGroup.tabs[1];
		win13 = require('ui/win13').createWin13('', 'pink');
	   win13.open();
	});
	
	win1.add(button1);

	return win1;
};
