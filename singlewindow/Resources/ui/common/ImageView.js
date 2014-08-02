//FirstView Component Constructor
function ImageView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var imageView = Ti.UI.createImageView({
		image: 'ui/images/apple_logo.jpg',
		top: 50,
		width: 50,
	});
	self.add(imageView);
	
	return self;
}

module.exports = ImageView;
