var w1 = Ti.UI.currentWindow;
w1.backgroundColor='blue';

if(w1.label == undefined){
	var label = '';
}else{
	var label = w1.label;
}

var view1 = Ti.UI.createView();

var button1 = Ti.UI.createButton({
	title: 'Next',
	top: 180,
	width: 200,
	height: 70
});

button1.addEventListener('click', function(e){
	var w10 = Ti.UI.createWindow({
		url : 'win2.js'
	});
	w10.label = label + "ah";
	w10.open();
	if(Ti.Platform.osname=="android"){w1.close();}
});
var label1 = Ti.UI.createLabel({
	text: label,
	top: 0,
	width: 300,
	height: 'auto'
});

view1.add(button1);

view1.add(label1);

w1.add(view1);