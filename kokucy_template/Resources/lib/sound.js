exports.createBgm = function(_url){
	var bgm = Titanium.Media.createSound({
	    // リモートURLも指定できます
	    // url : "http://www.nch.com.au/acm/8kmp38.wav"
	    url: _url,
	    looping : true,
	});
	
	var listenerId = function() {
	    bgm.removeEventListener('complete', listenerId);
	    var dialog = Titanium.UI.createAlertDialog({
	        'title' : 'Sound Complete',
	        'message' : 'sound completed',
	        'buttonNames' : [ 'OK' ]
	    });
	    dialog.show();
	};
	bgm.addEventListener('complete', listenerId);
	
	return bgm;
};