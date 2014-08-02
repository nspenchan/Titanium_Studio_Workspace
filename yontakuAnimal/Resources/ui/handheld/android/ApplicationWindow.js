//Application Window Component Constructor
function ApplicationWindow(purchase) {
	//load component dependencies
	var FirstView = require('ui/common/FirstView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		navBarHidden:true,
		exitOnClose:true
	});
	self.orientationModes = [  
	    Titanium.UI.LANDSCAPE_LEFT
	];
		
	//construct UI
	var firstView = new FirstView(self, purchase);
	self.add(firstView);
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
