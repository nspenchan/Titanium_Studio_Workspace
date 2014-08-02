//Application Window Component Constructor
function ApplicationWindow(purchase) {
	//iphone
	//Titanium.UI.iPhone.showStatusBar();変化なし？　上部20ピクセル黒帯を消せないか？
	//load component dependencies
	var FirstView = require('ui/common/FirstView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#000',
		fullscreen:true,
	});
	/*
	self.orientationModes = [  
	    Titanium.UI.LANDSCAPE
	];
	*/
	//Titanium.UI.iPhone.hideStatusBar(); after 3.1.3
		
	//construct UI
	var firstView = new FirstView(self, purchase);
	self.add(firstView);
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
