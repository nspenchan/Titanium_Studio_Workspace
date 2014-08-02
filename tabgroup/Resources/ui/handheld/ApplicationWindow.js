/*
function ApplicationWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});
	
	var button = Ti.UI.createButton({
		height:44,
		width:200,
		title:L('openWindow'),
		top:20
	});
	self.add(button);
	
	button.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		self.containingTab.open(Ti.UI.createWindow({
			title: L('newWindow'),
			backgroundColor: 'white'
		}));
	});
	
	return self;
};

module.exports = ApplicationWindow;
*/
//ui/handheld/ApplicationWindow.js
function ApplicationWindow(title, num, tabGroup) {
  var self = Ti.UI.createWindow({
    title:title,
    backgroundColor:'white',
    bubbleParent: false,
    fullscreen: false, // <- 重要、これがないとWindowを開いてもバックボタンでアプリが閉じてしまう
    layout: 'vertical'
  });
  self.add(Ti.UI.createLabel({text: title, top: 100, width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: 'Black'}));
  self.addEventListener('click', function(){
  	/*
    var Window = require('ui/handheld/AnotherWindow');
    window = new Window('Another Window');
    window.bubbleParent = false;
    self.containingTab.open(window);
    */
   Ti.API.info(tabGroup.tabs[num].title);
   tabGroup.activeTab = tabGroup.tabs[num];
   
  });
  return self;
}
module.exports = ApplicationWindow;
