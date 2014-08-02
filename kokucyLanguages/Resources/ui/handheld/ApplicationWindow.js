//Application Window Component Constructor
function ApplicationWindow(dbName, bgColor, arrayColor, arrayLevel, arrayPurchase) {
	//load component dependencies
	var FirstView = require('ui/common/FirstView');

	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		fullscreen: true,
	});

	//construct UI
	var firstView = new FirstView(dbName, bgColor, arrayColor, arrayLevel, arrayPurchase);
	self.add(firstView);

	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
