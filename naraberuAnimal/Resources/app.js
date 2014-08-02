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
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}

// This is a single context application with multiple windows in a stack
(function() {
		//render appropriate components based on the platform and form factor
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	if(osname=='iphone'){
		var ratio = 1;
	}else if(height>width){
		var ratio = height/568;
	}else{
		var ratio = width/568;
	}
	Ti.API.info('ratio: ' + ratio);
		
	//in-app purchase setting
	//yontakuanimal, irekaeanimal
	var purchase = 'naraberuanimal';//すべて小文字で
	
	if(!Ti.App.Properties.hasProperty('folder')){
		Titanium.App.Properties.setString('folder', 'animal');
	}
	
	if (!Titanium.App.Properties.hasProperty('nend_spotid')) {
		Ti.App.Properties.setInt('nend_spotid_android', 124305);
		Ti.App.Properties.setInt('nend_spotid', 124304);
		Titanium.App.Properties.setString('nend_appkey_android', '8ec15573c6726b60087f03cdd32ed71f53288cad');
		Titanium.App.Properties.setString('nend_appkey', 'f7b1223c9a133076e5f9047a5d978cc28ecfd224');
	}
	
	if(!Ti.App.Properties.hasProperty('inAppBillingPublicKey')){
		Titanium.App.Properties.setString('inAppBillingPublicKey', 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAggGMIlefMw7l2uxwbpGqZjxdQf1QFaDm9moccwMycOejt/JUsny41eoV9xTp09Pb+XYkEV27JBvY6aT+Ygxt/8m2ffmjimFUulpbBTijV9iCiz8nzO74FQ5KDQa+NvgdVCU6LHRCPOHCW82Dbi30lNSrbEDM3UIm64MCsLBC7wE9c6QcIBE6JYGK7qW2qSHgwuCX+oM1JXOvP3OQkct/m4LrPlPfsF6sMcMrAxozCT9VJX+ON/fnTw3HO19gCo7LjImCroyFH3EqCJ4+y8E64w1muS4iJoj+q8ZMiQaK8Ut6leqKIHPkrrAnqKeN2UYMGmeu85CAvIptl2VksCHl3QIDAQAB');
	}
	
	//////////////////
	if(!Ti.App.Properties.hasProperty('recordDatabase')){
		Titanium.App.Properties.setString('recordDatabase', 'USER1');
	}
	
	if(!Ti.App.Properties.hasProperty('mode')){
		Titanium.App.Properties.setString('mode', 'normal');
	}
	
	if (!Titanium.App.Properties.hasProperty('Purchased-'+purchase)) {
		Titanium.App.Properties.setBool('Purchased-'+purchase, false);
	}
	
	if (!Titanium.App.Properties.hasProperty('bgm')) {
		Titanium.App.Properties.setBool('bgm', true);
	}
	
	if (!Titanium.App.Properties.hasProperty('hint')) {
		Titanium.App.Properties.setBool('hint', true);
	}
	
	if (!Titanium.App.Properties.hasProperty('themesong')) {
		Titanium.App.Properties.setBool('themesong', true);
	}
	
	if (!Titanium.App.Properties.hasProperty('testMode')) {
		Titanium.App.Properties.setBool('testMode', false);
	}
	
	if(!Ti.App.Properties.hasProperty('setDatabase')){
		Ti.App.Properties.setInt('setDatabase', 0);
	}
	
	if(!Ti.App.Properties.hasProperty('mail')){
		Titanium.App.Properties.setString('mail', 'dev.kokucy@gmail.com');
	}
	
	if(!Ti.App.Properties.hasProperty('databaseName')){
		Titanium.App.Properties.setString('databaseName', 'animal');
	}
	
	if(!Ti.App.Properties.hasProperty('questionNmae')){
		Titanium.App.Properties.setString('questionName', 'en');
	}
	
	if(!Ti.App.Properties.hasProperty('answerName')){
		if(Ti.Platform.locale=='ja'){
			Titanium.App.Properties.setString('answerName', 'ja');
		}else{
			Titanium.App.Properties.setString('answerName', 'en');
		}
	}
	
	if(!Ti.App.Properties.hasProperty('time')){
		Titanium.App.Properties.setInt('time', 0);
	}
	
	if(!Ti.App.Properties.hasProperty('level')){
		Titanium.App.Properties.setInt('level', 1);
	}
	
	if(!Ti.App.Properties.hasProperty('fontsize')){
		if(Ti.Platform.locale=='ja'){
			Titanium.App.Properties.setInt('fontsize', 30);
		}else{
			Titanium.App.Properties.setInt('fontsize', 24);
		}
	}
	
	if(!Ti.App.Properties.hasProperty('levelupMinimumPoint')){
		Titanium.App.Properties.setInt('levelupMinimumPoint', 10);
	}
	
	if(!Ti.App.Properties.hasProperty('hintCounter')){
		Titanium.App.Properties.setInt('hintCounter', 10);
	}
	
	if(!Ti.App.Properties.hasProperty('coins')){
		Titanium.App.Properties.setInt('coins', 0);
	}
	
	if(!Ti.App.Properties.hasProperty('effect')){
		Titanium.App.Properties.setString('effect', 'non');
	}
	
	if(!Ti.App.Properties.hasProperty('userName')){
		if(Ti.Platform.locale=='ja'){
			Titanium.App.Properties.setString('userName', 'ユーザーさん');
		}else{
			Titanium.App.Properties.setString('userName', 'User');
		}
	}
	
	if(!Ti.App.Properties.hasProperty('music')){
		Titanium.App.Properties.setString('music', 'kougen-naru-daichi.mp3');
	}
	
	//文字の大きさ
	if(!Ti.App.Properties.hasProperty('zoom')){
		Titanium.App.Properties.setDouble('zoom', 1);
	}
	//画面サイズによる調整
	if(!Ti.App.Properties.hasProperty('zoomByOsname')){
		Titanium.App.Properties.setDouble('zoomByOsname', ratio);
	}else if(Titanium.App.Properties.getDouble('zoomByOsname')!=ratio){
		Titanium.App.Properties.setDouble('zoomByOsname', ratio);
	}
	//画面サイズによる調整
	if(!Ti.App.Properties.hasProperty('zoomTableview')){
		Titanium.App.Properties.setDouble('zoomTableview', ratio);
	}else if(Titanium.App.Properties.getDouble('zoomTableview')!=ratio){
		Titanium.App.Properties.setDouble('zoomTableview', ratio);
	}
	
	//database create
	require('lib/db').createDatabase();
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var Window;
	if (isTablet) {
		Window = require('ui/tablet/ApplicationWindow');
	}
	else {
		// Android uses platform-specific properties to create windows.
		// All other platforms follow a similar UI pattern.
		if (osname === 'android') {
			Window = require('ui/handheld/android/ApplicationWindow');
		}
		else {
			Window = require('ui/handheld/ApplicationWindow');
		}
	}
	var win = new Window(purchase);
	//Titanium.UI.iPhone.hideStatusBar();
	win.open();
})();
