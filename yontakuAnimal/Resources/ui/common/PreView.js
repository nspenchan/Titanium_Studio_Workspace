//FirstView Component Constructor
function PreView(win, purchase) {
	//andriod FirstViewが縦画面の回転になってしまう問題を解決するため、プレ画面を入れる	
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'#000',
	});
	win.add(self);
	setTimeout(function(){
		var FirstView = require('ui/common/FirstView');	
		//construct UI
		var firstView = new FirstView(win, purchase);
		win.add(firstView);
		win.remove(self);
	} ,500);
	return self;
}

module.exports = PreView;
