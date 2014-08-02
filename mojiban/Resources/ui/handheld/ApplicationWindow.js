//Application Window Component Constructor
function ApplicationWindow(arrayPurchase, arrayImages, arrayWords, arrayWords2, arrayWords3) {
	//load component dependencies
	var FirstView = require('ui/common/FirstView');

	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});

	//construct UI
	var firstView = new FirstView(arrayPurchase, arrayImages, arrayWords, arrayWords2, arrayWords3);
	self.add(firstView);

	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
