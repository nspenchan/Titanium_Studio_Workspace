function Webview(win, title, bgColor, body) {
	var top = 0,
		webBgColor = Titanium.App.Properties.getString("bgColor"),
		color = Titanium.App.Properties.getString("color"),
		zoom = Titanium.App.Properties.getDouble("zoom"),
		array1 = [255,195,135,75,15],
		array2 = [18, 18, 18, 10, 30],
		array3 = ['#fff', '#8b0000', '#000', '#fff', '#fff'],
		array4 = ['#000', '#ffffe0', '#fff', '#000', '#000'],
		array5 = [25, 25, 25, 5, 5],
		array6 = [1, 1, 1, 0.9, 1.1],
		array7 = ['#fff', '#8b0000', '#000', '', ''],
		array8 = ['#000', '#ffffe0', '#fff', '', ''];
	var aA, back, button, buttonWidth, html2, label, self, view, webview;
	
	if(Ti.Platform.osname=='android'){
		var osname = Ti.Platform.osname,
		height = Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor,
		width = Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor;
	}else{
		var osname = Ti.Platform.osname,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	}
	//create object instance, a parasitic subclass of Observable
	self = Ti.UI.createView({
		backgroundColor:'#000',
	});
	
	function scale(dimension) {
		return Math.round(dimension *  Ti.App.Properties.getDouble('osZoom') * Ti.App.Properties.getDouble('selfZoom') * Ti.Platform.displayCaps.platformWidth / 320);
	}
	
	for(i=0; i<array1.length; i++){
		button = Ti.UI.createButton({
			title:L('A'),
			font : {
				fontWeight: "bold",
				fontSize : scale(array2[i]),
				fontFamily : 'Helvetica Neue'
			},
			color : array3[i],
			backgroundColor: array4[i],
			textAlign : 'center',
			right: scale(array1[i]),
			top: scale(70),
			width : scale(50),
			height : scale(50),
			borderColor: '#808080',
			borderWidth: scale(3),
			borderRadius : scale(array5[i]),
			backgroundImage:'non',
			backgroundSelectedImage:'/assets/images/shadow.png',
			_zoom: array6[i],
			_color: array7[i],
			_bgColor: array8[i],
		});
		
		button.addEventListener('click', function(e){
			//Ti.API.info(JSON.stringify(e));
			zoom = Titanium.App.Properties.getDouble('zoom');
			zoom = zoom*e.source._zoom;
			Ti.API.info(zoom);
			Titanium.App.Properties.setDouble('zoom', zoom);
			if(e.source._bgColor!=''){
				webBgColor = e.source._bgColor;
				color = e.source._color;
				Titanium.App.Properties.setString('bgColor', webBgColor);
				Titanium.App.Properties.setString('color', color);
				self.backgroundColor = webBgColor;
			}			
			//alert(zoom);
			zoom1 = zoom*1.1;
			zoom2 = zoom*1.2;
			zoom3 = zoom*1.3;
			
			css = 'body {background-color: ' + webBgColor + '; color: ' + color + '; font-size: ' + zoom + 'em}';
			css = css + 'p {color: red; font-size: ' + zoom1 + 'em}';
			css = css + 'h1 {color: blue; font-size: ' + zoom3 + 'em}';
			css = css + 'h2 {color: green; font-size: ' + zoom2 + 'em}';
			Ti.API.info(css);
			
			html2 = '<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8" /><title>Cheer-Slide</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style>';
			html2 = html2 + css;
			html2 = html2 + '</style></head><body>';
			html2 = html2 + body;
			html2 = html2 + '</body></html>';
			webview.html = html2;
		});

		self.add(button);
	}
	
	function scale(dimension) {
		if(Ti.Platform.osname=='android'){
			return Math.round(dimension *  Ti.App.Properties.getDouble('osZoom') * Ti.App.Properties.getDouble('selfZoom') * Ti.Platform.displayCaps.platformWidth / 320 / Ti.Platform.displayCaps.logicalDensityFactor);
		}else{
			return Math.round(dimension *  Ti.App.Properties.getDouble('osZoom') * Ti.App.Properties.getDouble('selfZoom') * Ti.Platform.displayCaps.platformWidth / 320);
		}
	}
	
	view = Titanium.UI.createView({
		width:Ti.UI.FILL,
	    height:scale(60),
	    top:top,
	});
	self.add(view);
	
	label = Titanium.UI.createLabel({
		color:'#fff',
		backgroundColor:bgColor,
		text:L(title),
		font:{fontSize:scale(25),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'center',
		width:Ti.UI.FILL,
	    height:scale(60),
	    top:top,
	});
	view.add(label);
	
	if(scale(90)>width/2-10){
		buttonWidth = width/2-10;
	}else{
		buttonWidth = scale(90);
	}
	
	back = Ti.UI.createButton({
		color:'#fff',
		backgroundColor:bgColor,
		backgroundImage: '/assets/images/gray300x300_0.4.png',
		title: L('Back'),
		font:{fontSize:scale(20),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:scale(60),
		width:buttonWidth,
		left:scale(0),
		borderColor:'#002400',
		borderWidth:scale(1),
		opacity:1,
	});
	view.add(back);
		
	back.addEventListener('click', function(e){
		setTimeout(function(){
			win.remove(self);
		}, 100);
	});
	
	
	aA = Ti.UI.createButton({
		color:'#fff',
		backgroundColor:bgColor,
		backgroundImage: '/assets/images/gray300x300_0.4.png',
		title: L('aA'),
		font:{fontSize:scale(20),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:scale(60),
		width:buttonWidth,
		right:scale(0),
		borderColor:'#002400',
		borderWidth:scale(1),
		opacity:1,
	});
	view.add(aA);
	//Add behavior for UI
	aA.addEventListener('click', function(e) {
		//Ti.API.info(JSON.stringify(e));
		if(webview.top == top+scale(60)){
			webview.top = top + scale(130);
			aA.title = L('hide');
		}else{
			webview.top = top + scale(60);
			aA.title = L('aA');
			
		}
	});
	
	zoom1 = zoom*1.1;
	zoom2 = zoom*1.2;
	zoom3 = zoom*1.3;
	
	css = 'body {background-color: ' + webBgColor + '; color: ' + color + '; font-size: ' + zoom + 'em}';
	css = css + 'p {color: red; font-size: ' + zoom1 + 'em}';
	css = css + 'h1 {color: blue; font-size: ' + zoom3 + 'em}';
	css = css + 'h2 {color: green; font-size: ' + zoom2 + 'em}';
	Ti.API.info(css);
	
	html2 = '<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8" /><title>Cheer-Slide</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style>';
	html2 = html2 + css;
	html2 = html2 + '</style></head><body>';
	html2 = html2 + body;
	html2 = html2 + '</body></html>';
	
	webview = Ti.UI.createWebView({
		top:scale(60),
	    html: html2
	});
	self.add(webview);
	
	return self;
}

module.exports = Webview;