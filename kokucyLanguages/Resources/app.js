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
	if (!Titanium.App.Properties.hasProperty('ver')) {
		Titanium.App.Properties.setInt('ver', 100);
	}
	var osname = Ti.Platform.osname,
	    version = Ti.Platform.version,
	    height = Ti.Platform.displayCaps.platformHeight,
	    width = Ti.Platform.displayCaps.platformWidth,
		platform = Ti.Platform.osname,
		//databeseName
		dbName = 'hokudai',//すべて小文字で
		arrayBool = ['noSound', 'noVibrate', 'noRecord', 'random'];
	var bgColor, arrayColor, arrayPurchase, arrayLevel, psc, tiAndroid, isTable, Window;
		
	switch(dbName){
		case 'hokudai':
		arrayColor = ['#50755e', '#053e1c', '#28cc6a', '#36ae66', '#005520', '#04d055', '#45855e', '#cddad2', '#366549', '#9eb6a8', '#2fd571', '#1fc060'];
			bgColor = arrayColor[0];
			if(!Ti.App.Properties.hasProperty('hidead')){
				Titanium.App.Properties.setString('hidead', 'hidead_languages');
			}
			//解説準備OK
			arrayPurchase = [ Titanium.App.Properties.getString('hidead'),];
			
			arrayLevel = [
				[0, ''],
				[786, 'junior_high_school'],
				[1778, 'high_school'],
				[2096, 'university_entrance'],
				[1520, 'university_basic'],
				[1274, 'university_senior']
			];
			//最初の問題番号
			if (!Titanium.App.Properties.hasProperty('min')) {
				Titanium.App.Properties.setInt('min', 1);
			}
			//最後の問題番号
			if (!Titanium.App.Properties.hasProperty('max')) {
				Titanium.App.Properties.setInt('max', arrayLevel[1][0]);
			}
			
			if (!Titanium.App.Properties.hasProperty('nend_spotid')) {
				Ti.App.Properties.setInt('nend_spotid_android', 173032);
				Ti.App.Properties.setInt('nend_spotid', 173031);
				Titanium.App.Properties.setString('nend_appkey_android', '7e89f1457c734a8732afc62799fcb01e06b2320b');
				Titanium.App.Properties.setString('nend_appkey', '9da5bdc3127dd16e6a83f95b9841dcc3d7759583');
			}
			
			if(!Ti.App.Properties.hasProperty('inAppBillingPublicKey')){
				Titanium.App.Properties.setString('inAppBillingPublicKey', 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAg5XZUzevHpNtPhKaa1iVMt9w9tMrppuTCSUHWtPH7hwtTtzXgiqg/6+apAsh7+3wvDfyIYEppI6ZTdYNVSMZhgfG/SUvClsV9153VSkA5TKZsHlKeiFI1jjHz8qAEdV1mqOMyzYIQ3PAtI+gDun7+TKqEwOl4KCymaFGD9vl5npIcyulGtAxpe60bK78SovuScoKCbYCJLZhrDmD3syqofYNpzt8cQWexazR0ct7/IiZsEUbAVyRrZ2gG5KoBWLMXgwX/ULUWKj7jQNnS9oDj1jMlw8mSnqEZ7AgYALaW941Qn5nq/j27eXKjRbsTHUtvKXELb51i4SdIFfbBhwX6wIDAQAB');
			}
		break;
		default:
		break;
	}
	
	/////////////////
	//Ti.API.info('rowHeight: ' + rowHeight);
	
	for(i=0; i<arrayBool.length; i++){
		if (!Titanium.App.Properties.hasProperty(arrayBool[i])) {
			Titanium.App.Properties.setBool(arrayBool[i], false);
		}
	}
	
	if(!Ti.App.Properties.hasProperty('question')){
		Titanium.App.Properties.setString('question', 'en');
	}
	
	if(!Ti.App.Properties.hasProperty('answer')){
		Titanium.App.Properties.setString('answer', 'ja');
	}
	/*
	if(!Ti.App.Properties.hasProperty('table')){
		Titanium.App.Properties.setString('table', 'enja');
	}
	*/
	//in-app purchase setting
	if (!Titanium.App.Properties.hasProperty('Purchased-' + Titanium.App.Properties.getString('hidead'))) {
		Titanium.App.Properties.setBool('Purchased-' + Titanium.App.Properties.getString('hidead'), false);
	}
	
	if(!Ti.App.Properties.hasProperty('recordIds')){
		Titanium.App.Properties.setString('recordIds', '');
	}
	
	if(!Ti.App.Properties.hasProperty('recordSearch')){
		Titanium.App.Properties.setString('recordSearch', '');
	}
	
	if (!Titanium.App.Properties.hasProperty('serachMode')) {
		Titanium.App.Properties.setBool('serachMode', false);
	}
	
	if (!Titanium.App.Properties.hasProperty('from')) {
		Titanium.App.Properties.setInt('from', 1);
	}
	
	if (!Titanium.App.Properties.hasProperty('timer')) {
		Titanium.App.Properties.setInt('timer', 0);
	}
	
	if (!Titanium.App.Properties.hasProperty('bgm')) {
		Titanium.App.Properties.setBool('bgm', true);
	}
	
	if (!Titanium.App.Properties.hasProperty('hint')) {
		Titanium.App.Properties.setBool('hint', true);
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
	
	if(!Ti.App.Properties.hasProperty('level')){
		Titanium.App.Properties.setInt('level', 1);
	}
	
	if(!Ti.App.Properties.hasProperty('choices')){
		Titanium.App.Properties.setInt('choices', 4);
	}
	//学習する範囲
	if(!Ti.App.Properties.hasProperty('range')){
		Titanium.App.Properties.setInt('range', 20);
	}
	
	if(!Ti.App.Properties.hasProperty('hintCounter')){
		Titanium.App.Properties.setInt('hintCounter', 10);
	}
	
	if(!Ti.App.Properties.hasProperty('bgColor')){
		Titanium.App.Properties.setString('bgColor', '#000');
	}
	
	if(!Ti.App.Properties.hasProperty('color')){
		Titanium.App.Properties.setString('color', '#fff');
	}
	
	if(!Ti.App.Properties.hasProperty('zoom')){//for webview
		Titanium.App.Properties.setDouble('zoom', 1);
	}
	
	if(!Ti.App.Properties.hasProperty('selfZoom')){
		Titanium.App.Properties.setDouble('selfZoom', 1);
	}
	
	//if(!Ti.App.Properties.hasProperty('osZoom')){
		if(osname == 'ipad'){
			Titanium.App.Properties.setDouble('osZoom', 0.6);
		}else if(osname == 'android'){
			Titanium.App.Properties.setDouble('osZoom', 0.6);
		}else{
			Titanium.App.Properties.setDouble('osZoom', 1);
		}
	//}
	
	//database create
	require('lib/db').createDatabase(dbName, arrayLevel);
	
  //render appropriate components based on the platform and form factor

  //considering tablets to have width over 720px and height over 600px - you can define your own
  function checkTablet() {

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

  Window;
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
  new Window(dbName, bgColor, arrayColor, arrayLevel, arrayPurchase).open();
})();
