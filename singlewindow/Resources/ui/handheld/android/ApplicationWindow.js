//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var FirstView = require('ui/common/FirstView');
	var ImageView = require('ui/common/ImageView');
	var ButtonView = require('ui/common/ButtonView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		navBarHidden:true,
		exitOnClose:true
	});
		
	//construct UI
	var firstView = new FirstView();
	var ImageView = new ImageView();
	var ButtonView = new ButtonView();
	self.add(firstView);
	self.add(ImageView);
	self.add(ButtonView);
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
