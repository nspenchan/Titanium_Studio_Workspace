function doClick(e) {
    alert($.label.text);
}

function toApple(e) {
	var apple = Alloy.createController('apple').getView();
	apple.open();
}
$.index.open();