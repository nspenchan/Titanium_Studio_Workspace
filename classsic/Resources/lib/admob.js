exports.createAdmob = function(){
	var Admob = require('ti.admob');
	/*
	 We'll make two ads. This first one doesn't care about where the user is located.
	 */
	if (Titanium.Platform.osname !== 'android') {
		var ad = Admob.createView({
		    top: 0, left: 0,
		    width: 320, height: 50,
		    publisherId: 'ca-app-pub-5185987996192774/2911071648', // You can get your own at http: //www.admob.com/
		    adBackgroundColor: 'black',
		    testing: false,
		    dateOfBirth: new Date(1985, 10, 1, 12, 1, 1),
		    gender: 'male',
		    keywords: ''
		});
		ad.addEventListener('didReceiveAd', function() {
		    alert('Did receive ad!');
		});
		ad.addEventListener('didFailToReceiveAd', function() {
		    alert('Failed to receive ad!');
		});
		ad.addEventListener('willPresentScreen', function() {
		    alert('Presenting screen!');
		});
		ad.addEventListener('willDismissScreen', function() {
		    alert('Dismissing screen!');
		});
		ad.addEventListener('didDismissScreen', function() {
		    alert('Dismissed screen!');
		});
		ad.addEventListener('willLeaveApplication', function() {
		    alert('Leaving the app!');
		});
		
		/*
		 And we'll try to get the user's location for this second ad!
		 */
		
		Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
		Ti.Geolocation.distanceFilter = 0;
		Ti.Geolocation.purpose = 'To show you local ads, of course!';
		Ti.Geolocation.getCurrentPosition(function reportPosition(e) {
		    if (!e.success || e.error) {
		        // aw, shucks...
		    }
		    else {
		       ad = Admob.createView({
		            top: 100, left: 0,
		            width: 320, height: 50,
		            publisherId: 'ca-app-pub-5185987996192774/2911071648', // You can get your own at http: //www.admob.com/
		            adBackgroundColor: 'black',
		            testing: false,
		            dateOfBirth: new Date(1985, 10, 1, 12, 1, 1),
		            gender: 'female',
		            keywords: '',
		            location: e.coords
		        });
		    }
		});
	}else{	
		// then create an adMob view
		var ad = Admob.createView({
		    publisherId:"ca-app-pub-5185987996192774/3931976444",
		    testing:false, // default is false
		    top: 0, //optional
		    left: 0, // optional
		    //right: 0, // optional
		    //bottom: 0, // optional
		    adBackgroundColor:"FF8855", // optional
		    backgroundColorTop: "738000", //optional - Gradient background color at top
		    borderColor: "#000000", // optional - Border color
		    textColor: "#000000", // optional - Text color
		    urlColor: "#00FF00", // optional - URL color
		    linkColor: "#0000FF" //optional -  Link text color
		    //primaryTextColor: "blue", // deprecated -- now maps to textColor
		    //secondaryTextColor: "green" // deprecated -- now maps to linkColor
		    
		});
		
		
		//listener for adReceived
		ad.addEventListener(Admob.AD_RECEIVED,function(){
		   alert("ad received");
		   Ti.API.info("ad received");
		});
		
		//listener for adNotReceived
		ad.addEventListener(Admob.AD_NOT_RECEIVED,function(){
		    alert("ad not received");
		    Ti.API.info("ad not received");
		});
	}	
	return ad;
};