/*
* Single Window Application Template:
* A basic starting point for your application.  Mostly a blank canvas.
*
* In app.js, we generally take care of a few things:
* - Bootstrap the application with any data we need
* - Check for dependencies like device type, platform version or network connection
* - Require and open our top-level UI component
*
*/

//bootstrap and check dependencies
if (Ti.version < 1.8) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

// This is a single context application with multiple windows in a stack
(function() {
	//render appropriate components based on the platform and form factor
	var i;
	var osname = Ti.Platform.osname,
	version = Ti.Platform.version,
	height = Ti.Platform.displayCaps.platformHeight,
	width = Ti.Platform.displayCaps.platformWidth;

	var arrayPurchase = ['mojiban1'];//すべて小文字で
	var dbName = 'mojiban';
	var arrayImages, arrayImages2_origin, arrayImages3_origin, arrayWords, arrayWords2, arrayWords3, 
	isTablet, platform, psc, tiAndroid, Window;

	if(!Ti.App.Properties.hasProperty('template')){
		Titanium.App.Properties.setString('template', 'mojiban');
	}

	//if (!Titanium.App.Properties.hasProperty('nend_spotid')) {
		if(osname=='ipad'){
			Ti.App.Properties.setInt('nend_spotid', 206087);
			Titanium.App.Properties.setString('nend_appkey', '0a526de5278638fd6efd5dcd68a42044436a2d3a');
		}else{
			Ti.App.Properties.setInt('nend_spotid', 209058);
			Titanium.App.Properties.setString('nend_appkey', '79cabd2aa011cb9d277a012edd2d9f533e253500');
		}
	//}
	//if(!Ti.App.Properties.hasProperty('moji')){
	//起動時はひらがな
	Titanium.App.Properties.setString('moji', 'hiragana');
	//}
	if(!Ti.App.Properties.hasProperty('tel')){
		Titanium.App.Properties.setString('tel', '');
	}
	if(!Ti.App.Properties.hasProperty('userFamilyEmail')){
		Titanium.App.Properties.setString('userFamilyEmail', '');
	}
	if(!Ti.App.Properties.hasProperty('userFamily')){
		Titanium.App.Properties.setString('userFamily', 'mama');
	}
	if(!Ti.App.Properties.hasProperty('userName')){
		if(Ti.Platform.locale=='ja'){
			Titanium.App.Properties.setString('userName', 'こども');
		}else{
			Titanium.App.Properties.setString('userName', 'Child');
		}
	}
	if(!Ti.App.Properties.hasProperty('userSex')){
		Titanium.App.Properties.setString('userSex', 'boy');
	}
	if(!Ti.App.Properties.hasProperty('mail')){
		Titanium.App.Properties.setString('mail', 'dev.nspenchan@gmail.com');
	}

	if(!Ti.App.Properties.hasProperty('osZoom')){
		Titanium.App.Properties.setDouble('osZoom', 0.4);
	}

	if(!Ti.App.Properties.hasProperty('enableGame')){
		Titanium.App.Properties.setBool('enableGame', true);
	}

	if(!Ti.App.Properties.hasProperty('enableMail')){
		Titanium.App.Properties.setBool('enableMail', true);
	}

	if(!Ti.App.Properties.hasProperty('enableSpeaker')){
		Titanium.App.Properties.setBool('enableSpeaker', true);
	}

	if(!Ti.App.Properties.hasProperty('setDatabase')){
		Titanium.App.Properties.setInt('setDatabase', 0);
	}
	//初期設定
	if(!Ti.App.Properties.hasProperty('setTools')){
		Titanium.App.Properties.setInt('setTools', 0);
	}

	arrayImages = [
		['aa', 'ai', 'au', 'ae', 'ao'],
		['ka', 'ki', 'ku', 'ke', 'ko'],
		['sa', 'si', 'su', 'se', 'so'],
		['ta', 'ti', 'tu', 'te', 'to'],
		['na', 'ni', 'nu', 'ne', 'no'],
		['ha', 'hi', 'hu', 'he', 'ho'],
		['ma', 'mi', 'mu', 'me', 'mo'],
		['ya', '', 'yu', '', 'yo'],
		['ra', 'ri', 'ru', 're', 'ro'],
		['wa', 'wo', 'wu', '', '']
	];
	//Template選択画面用
	if(!Ti.App.Properties.hasProperty('Purchased-' + dbName)){
		Titanium.App.Properties.setBool('Purchased-' + dbName, true);//purachase
	}
	
	//test
	Ti.API.info('Purchased-mojiban1: ' + Titanium.App.Properties.getBool('Purchased-mojiban1'));
	for(i=0; i<10; i++){
		var templateName = 'mojiban' + i;
		if(!Ti.App.Properties.hasProperty('Purchased-' + templateName)){
			Titanium.App.Properties.setBool('Purchased-' + templateName, false);//purachase
		}
	}
		
	arrayWords = [
		['あ', 'い', 'う', 'え', 'お'],
		['か', 'き', 'く', 'け', 'こ'],
		['さ', 'し', 'す', 'せ', 'そ'],
		['た', 'ち', 'つ', 'て', 'と'],
		['な', 'に', 'ぬ', 'ね', 'の'],
		['は', 'ひ', 'ふ', 'へ', 'ほ'],
		['ま', 'み', 'む', 'め', 'も'],
		['や', '', 'ゆ', '', 'よ'],
		['ら', 'り', 'る', 'れ', 'ろ'],
		['わ', 'を', 'ん', '、', '。']
	];
	arrayWords2 = ['や', 'ゆ', 'よ', 'つ', '〝', '°', 'ー'];
	arrayWords3 = ['ゃ', 'ゅ', 'ょ', 'っ', '゛', '゜', 'ー'];

	//database create
	require('lib/db').createDatabase();

	//considering tablets to have width over 720px and height over 600px - you can define your own
	function checkTablet() {
		platform = Ti.Platform.osname;

		switch (platform) {
			case 'ipad':
			return true;
			case 'android':
				psc = Ti.Platform.Android.physicalSizeCategory;
				tiAndroid = Ti.Platform.Android;
			return psc === tiAndroid.PHYSICAL_SIZE_CATEGORY_LARGE || psc === tiAndroid.PHYSICAL_SIZE_CATEGORY_XLARGE;
			default:
			return Math.min(
				Ti.Platform.displayCaps.platformHeight,
				Ti.Platform.displayCaps.platformWidth
			) >= 400;
		}
	}

	isTablet = checkTablet();
	console.log(isTablet);

	if (isTablet) {
		Window = require('ui/tablet/ApplicationWindow');
	} else {
		// Android uses platform-specific properties to create windows.
		// All other platforms follow a similar UI pattern.
		if (osname === 'android') {
			Window = require('ui/handheld/android/ApplicationWindow');
		} else {
			Window = require('ui/handheld/ApplicationWindow');
		}
	}
	new Window(arrayPurchase, arrayImages, arrayWords, arrayWords2, arrayWords3).open();
})();
