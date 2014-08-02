exports.createWin1 = function(_title, _backgroundColor, _top, _b1_title, _b2_title, _num1, _num2){
	var win1 = require('/ui/ui').createWindow(_title, _backgroundColor, _top);
	
	var ad = require('/lib/admob').createAdmob();
	win1.add(ad);
	
	if (Titanium.Platform.osname !== 'android') {
		var b1 = Titanium.UI.createButton({title:_b1_title});
		var b2 = Titanium.UI.createButton({title:_b2_title});
		win1.LeftNavButton = b1;
		win1.RightNavButton = b2;
		var top = 50;
	}else{
		var b1 = require('ui/ui').createButton('#000', '#fff', 'Sound ON', 16, 'center', 'auto', 'auto');
		b1.bottom = 9;
		b1.left = 10;
		var b2 = require('ui/ui').createButton('#000', '#fff', 'Next', 16, 'center', 'auto', 'auto');
		b2.bottom = 9;
		b2.right = 10;
		var top = 75;
	}
	
	b1.addEventListener('click', function(){
		//g.tabGroup.activeTab = g.tabGroup.tabs[_num1];
		//アンドロイド・エミュは再政不可？
		alert(g.sound.playing);
		if(g.sound.playing == false){
			g.sound.play();
			b1.title = 'Sound OFF';
			b1.backgroundColor = 'red';
		}else{
			g.sound.stop();
			b1.title = 'Sound ON';
			b1.backgroundColor = '';
		}
	});
	b2.addEventListener('click', function(e){
	   g.tabGroup.activeTab = g.tabGroup.tabs[_num2];
	});
	
	var view = require('ui/ui').createView('transparent', 'auto', 'auto', top);
	
	var label = require('ui/ui').createLabel('#999', 'transparent', 'I am Window 1', 20, 'center');
	
	var button = require('ui/ui').createButton('#000', '#fff', 'Open Window 2', 16, 'center', 200, 50, 50);
	
	button.addEventListener('click', function(e){
	    //win2.open();// ウィンドウ２を開く
	   // win1.close();
	   g.tabGroup.activeTab = g.tabGroup.tabs[1];
	});
	
	var button1 = require('ui/ui').createButton('#000', '#fff', 'Open Window 11', 16, 'center', 200, 50);
	button1.bottom = 50;
	
	button1.addEventListener('click', function(e){
	    //win2.open();// ウィンドウ２を開く
	   // win1.close();
	   //g.tabGroup.activeTab = g.tabGroup.tabs[1];
	   g.win11 = require('ui/win11').createWin11('', 'pink', 0, 'Back', 'Next');
	   g.win11.open();
	});
	
	view.add(label);
	view.add(button);
	view.add(button1);
	
	win1.add(view);
	
	if (Titanium.Platform.osname === 'android') {
		win1.add(b1);
		win1.add(b2);
	}
	
	//hide tabbar
	//if (Titanium.Platform.osname !== 'android') {win1.hideTabBar();}
	
	return win1;
};