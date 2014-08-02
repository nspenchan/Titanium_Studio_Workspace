exports.createWindow = function(_title, _backgroundColor){
	var window = Titanium.UI.createWindow({
	    title: _title,
	    backgroundColor: _backgroundColor
	});
	return window;
};

exports.createLabel = function(_color, _backgroundColor, _text, _fontSize, _textAlign, _width, _height, _top, _left){
	var label = Titanium.UI.createLabel({
		color: _color,
	    backgroundColor: _backgroundColor,
		text: _text,
		font:{fontSize: _fontSize,fontFamily:'Helvetica Neue'},
		textAlign: _textAlign,
		width: _width,
		height: _height,
		top: _top,
		left: _left,
	});
	return label;
};

exports.createButton = function(_color, _backgroundColor, _title, _fontSize, _textAlign, _width, _height, _top, _left){
	var button = Titanium.UI.createButton({
		color: _color,
	    backgroundColor: _backgroundColor,
		title: _title,
		font:{fontSize: _fontSize,fontFamily:'Helvetica Neue'},
		textAlign: _textAlign,
		width: _width,
		height: _height,
		top: _top,
		left: _left,
	});
	return button;
};
	
exports.createTab = function(_icon, _title, _window){
	var tab = Titanium.UI.createTab({  
		    icon: _icon,
		    title: _title,
		    window: _window
		});
	return tab;
};

exports.createWebView = function(_url, _top){
	var webview = Ti.UI.createWebView({
		url: _url,
		top: _top
	});
	return webview;
};

exports.createView = function(_backgroundColor, _width, _height, _top, _left){
	var view = Titanium.UI.createView({
	    backgroundColor: _backgroundColor,
	    width: _width,
	    height: _height,
	    top: _top,
	    left: _left,
	});
	return view;
};

exports.createTableViewRow = function(_title, _backgroundColor, _height, _hasChild){
	var row = Ti.UI.createTableViewRow({
	    title: _title,
	    backgroundColor: _backgroundColor,
	    height: _height,
	    hasChild: _hasChild,
	    selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE //iphone クリック時、青反転しない
	});
	
	return row;
};

exports.createImageView = function(_image, _width, _height, _top, _left){
	var imageview = Titanium.UI.createImageView({
	    image: 'assets/images/' + _image,
	    width: _width,
	    height :_height,
	    top: _top,
	    left: _left,
	});
	return imageview;
};	

exports.createView = function(_backgroundColor, _width, _height, _top, _left){
	var view = Titanium.UI.createView({
	    backgroundColor: _backgroundColor,
	    width: _width,
	    height: _height,
	    top: _top,
	    left: _left,
	});
	return view;
};