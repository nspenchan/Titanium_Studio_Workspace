//Application Window Component Constructor

function ApplicationWindow(purchase) {
	//load component dependencies
	var PreView = require('ui/common/PreView');
	var FirstView = require('ui/common/FirstView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		fullscreen:true,
	});
	
	var osname = Ti.Platform.osname;
	if(osname=='ipad'){
		//Titanium.UI.iPhone.hideStatusBar(); after 3.1.3
		//construct UI
		var firstView = new FirstView(self, purchase);
		self.add(firstView);
	}else{
		self.navBarHidden=true;
		self.exitOnClose=true;
		self.orientationModes = [  
		    Titanium.UI.LANDSCAPE_LEFT
		];
		//construct UI
		var preView = new PreView(self, purchase);
		self.add(preView);
	}
		
	
	
	return self;
}
//make constructor function the public component interface
module.exports = ApplicationWindow;
