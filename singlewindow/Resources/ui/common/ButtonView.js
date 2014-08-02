//FirstView Component Constructor
function ButtonView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var button = Ti.UI.createButton({
		title: 'Next',
		width: 200,
		height: 50,
		bottom: 50,
	});
	
	button.addEventListener('click', function(e){
	    alert('Clicked');
	});
	
	self.add(button);
	
	return self;
}

module.exports = ButtonView;
