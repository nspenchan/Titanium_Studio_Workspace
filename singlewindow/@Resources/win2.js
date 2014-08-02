var w2 = Ti.UI.currentWindow;
w2.backgroundColor='yellow';

var label = w2.label;

var view2 = Ti.UI.createView();

var button2 = Ti.UI.createButton({
	title: 'Next',
	top: 180,
	width: 200,
	height: 70
});

button2.addEventListener('click', function(e){
	var w10 = Ti.UI.createWindow({
		url : 'win1.js'
	});
	w10.label = label + "ah";
	w10.open();
	if(Ti.Platform.osname=="android"){w2.close();}
});
var label2 = Ti.UI.createLabel({
	text: label,
	top: 0,
	width: 300,
	height: 'auto'
});

view2.add(button2);

view2.add(label2);

w2.add(view2);