//ui/handheld/ApplicationWindow.js
function ApplicationWindow(title) {
  var self = Ti.UI.createWindow({
    title:title,
    backgroundColor:'white',
    bubbleParent: false,
    fullscreen: false, // <- 重要、これがないとWindowを開いてもバックボタンでアプリが閉じてしまう
    layout: 'vertical'
  });
  self.add(Ti.UI.createLabel({text: title, top: 100, width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: 'Black'}));
  self.addEventListener('click', function(){
    var Window = require('ui/handheld/AnotherWindow');
    window = new Window('Another Window');
    window.bubbleParent = false;
    self.containingTab.open(window);
  });
  return self;
}
module.exports = ApplicationWindow;