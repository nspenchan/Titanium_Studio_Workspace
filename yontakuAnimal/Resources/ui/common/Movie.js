//FirstView Component Constructor
function Movie(win, purchase, opening) {//language setting
	if(Ti.Platform.locale=='ja'){
		var url = "http://nspenchan.com/app/" + purchase + ".html";
	}else{
		var url = "http://nspenchan.com/app/" + purchase + "l-en.html";
	}
	
	var width = Ti.Platform.displayCaps.platformWidth;
	var zoomTableview = Titanium.App.Properties.getDouble('zoomTableview');
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'#000',
	});
	
	
	var webview = Ti.UI.createWebView({
		top:60*zoomTableview,
	    url: url
	});
	self.add(webview);
	
	var label = Titanium.UI.createLabel({
		color:'#fff',
		text:L('Movie'),
		font:{fontSize:25*zoomTableview,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'center',
		width:Ti.UI.FILL,
	    height:60*zoomTableview,
	    top:0,
	    backgroundGradient:{
		    type:'linear',
		    colors:[
		        {position:0.00,color:'#bfd255'},
		        {position:0.50,color:'#8eb92a'},
		        {position:0.51,color:'#72aa00'},
		        {position:1.00,color:'#9ecb2d'}
		    ]
		}
	});
	self.add(label);
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var back = Ti.UI.createButton({
		color:'#fff',
		title: L('Back'),
		font:{fontSize:20*zoomTableview,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:50*zoomTableview,
		width:100*zoomTableview,
		top:5*zoomTableview,
		bottom:5*zoomTableview,
		left:10*zoomTableview,
		radius:10*zoomTableview,
		borderRadius : 10*zoomTableview,
		borderColor:'#002400',
		borderWidth:1*zoomTableview,
		backgroundGradient:{
		    type:'linear',
		    colors:[
		        {position:0.00,color:'#bfd255'},
		        {position:0.50,color:'#8eb92a'},
		        {position:0.51,color:'#72aa00'},
		        {position:1.00,color:'#9ecb2d'}
		    ]
		},
		style:''
	});
	self.add(back);
	//Add behavior for UI
	back.addEventListener('click', function(e) {
		if(opening.playing==false){
			opening.play();
		}
		win.remove(self);
	});
	/*
	var aA = Ti.UI.createButton({
		color:'#fff',
		title: L('A'),
		font:{fontSize:20,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:50,
		width:100,
		top:10,
		right:10,
		radius:10,
		borderRadius : 10,
		borderColor:'#002400',
		borderWidth:1,
		backgroundGradient:{
		    type:'linear',
		    colors:[
		        {position:0.00,color:'#bfd255'},
		        {position:0.50,color:'#8eb92a'},
		        {position:0.51,color:'#72aa00'},
		        {position:1.00,color:'#9ecb2d'}
		    ]
		}
	});
	self.add(aA);
	//Add behavior for UI
	aA.addEventListener('click', function(e) {
		//Ti.API.info(JSON.stringify(e));
		if(button_view.top == 0){
			button_view.top = 70;
			webview.top = 140;
			aA.title = L('hide');
		}else{
			button_view.top = 0;
			webview.top = 70;
			aA.title = L('aA');
			
		}
	});
	*/
	
	return self;
}

module.exports = Movie;
