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
	var bgColor, arrayPurchase, arrayTest, isTablet, Window, psc, tiAndroid;
	
	Titanium.App.Properties.setInt('ver', 200);
	//databeseName
	var dbName = 'kaig',//すべて小文字でkaig, care
		arrayColor = ['#ff7f7f', '#ff7fbf', '#ff7fff', '#bf7fff', '#7f7fff', '#7fbfff', '#7fffff', '#7fffbf', '#7fff7f', '#bfff7f', '#ffff7f', '#ffbf7f'],
		osname = Ti.Platform.osname,
	    version = Ti.Platform.version,
	    height = Ti.Platform.displayCaps.platformHeight,
	    width = Ti.Platform.displayCaps.platformWidth,
	    platform = Ti.Platform.osname,
	    arrayBool = ['noVoice', 'noSound', 'noVibrate', 'noRecord', 'random'];
	
	switch(dbName){
		case 'kang':
			bgColor = arrayColor[0];
			if(!Ti.App.Properties.hasProperty('hidead')){
				if(osname == 'iphone' || osname =='ipad'){
					Titanium.App.Properties.setString('hidead', 'hideAd_kango');
				}else{
					Titanium.App.Properties.setString('hidead', 'hidead_kango');
				}
			}
			//解説準備OK
			arrayPurchase = [ Titanium.App.Properties.getString('hidead'), 'kang100a'];
			
			arrayTest = [];
			
			for(i=99; i<=103; i++){
				if(i<=99){
					arrayTest.push(dbName + '0' + i + 'a');
					arrayTest.push(dbName + '0' + i + 'b');
				}else{
					arrayTest.push(dbName + i + 'a');
					arrayTest.push(dbName + i + 'b');
				}
			}
			
			for(i=0; i<arrayTest.length; i++){
				if (!Titanium.App.Properties.hasProperty('Purchased-'+arrayTest[i])) {
					Titanium.App.Properties.setBool('Purchased-'+arrayTest[i], false);
				}
			}
			
			if (!Titanium.App.Properties.hasProperty('test')) {
				Titanium.App.Properties.setString('test', 'kang099a');//最初のデータにする　idMin / idMax を合わせること
			}
			//最初の問題番号
			if (!Titanium.App.Properties.hasProperty('min')) {
				Titanium.App.Properties.setInt('min', 1);
			}
			//最後の問題番号
			if (!Titanium.App.Properties.hasProperty('max')) {
				Titanium.App.Properties.setInt('max', 120);
			}
			//最初のid番号
			if (!Titanium.App.Properties.hasProperty('idMin')) {
				Titanium.App.Properties.setInt('idMin', 1);
			}
			//最後のid番号
			if (!Titanium.App.Properties.hasProperty('idMax')) {
				Titanium.App.Properties.setInt('idMax', 120);
			}
			
			if (!Titanium.App.Properties.hasProperty('nend_spotid')) {
				Ti.App.Properties.setInt('nend_spotid_android', 152489);
				Ti.App.Properties.setInt('nend_spotid', 23892);
				Titanium.App.Properties.setString('nend_appkey_android', '9645b08bb5bbf949467490fb8a41ecb237cb62b5');
				Titanium.App.Properties.setString('nend_appkey', '0fce157894e6a599e105a743e79b47f452535e96');
			}
			
			if(!Ti.App.Properties.hasProperty('inAppBillingPublicKey')){
				Titanium.App.Properties.setString('inAppBillingPublicKey', 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuoKhGc4Ifp6ZEK0m2kiXnWto38UazMuw1kpO7zdjeAQezlnG3+D+BSOW5TJUFuzpO0fEXgPD2TUq/u2gbbXVAXeJsiO4a9mdPJWPWy/awWUw+NdIJPSraBwK86jQanE5akvuQs0V8ct10NUJv7VXACMH19rANFTPMmLLEjfybdFicyXOfRL9ZQWYe7Fqgvn1enx0+9cBKvZ+ED3GkKdl2VZwjRINefhLLt32HSefN7YkAegMdML9HiOrNauZJxKNf3tZPU8AyA/npGeOIbmXOj+Wko7QQ6vDHEilPo7i/adIOdfG8gjGJgqQbhdl5IjZKFxU6Ladl3xEsk2nFMve4wIDAQAB');
			}
		break;
		case 'kaig':
			bgColor = arrayColor[11];
			if(!Ti.App.Properties.hasProperty('hidead')){
				Titanium.App.Properties.setString('hidead', 'hidead_kaigo');
			}
			//解説準備OK
			arrayPurchase = [ Titanium.App.Properties.getString('hidead')];
			
			arrayTest = [];
			
			for(i=21; i<=26; i++){
				if(i<=99){
					arrayTest.push(dbName + '0' + i + 'a');
					arrayTest.push(dbName + '0' + i + 'b');
				}else{
					arrayTest.push(dbName + i + 'a');
					arrayTest.push(dbName + i + 'b');
				}
			}
			
			for(i=0; i<arrayTest.length; i++){
				if (!Titanium.App.Properties.hasProperty('Purchased-'+arrayTest[i])) {
					Titanium.App.Properties.setBool('Purchased-'+arrayTest[i], false);
				}
			}
			
			if (!Titanium.App.Properties.hasProperty('test')) {
				Titanium.App.Properties.setString('test', 'kaig021a');//最初のデータにする　idMin / idMax を合わせること
			}
			//最初の問題番号
			if (!Titanium.App.Properties.hasProperty('min')) {
				Titanium.App.Properties.setInt('min', 1);
			}
			//最後の問題番号
			if (!Titanium.App.Properties.hasProperty('max')) {
				Titanium.App.Properties.setInt('max', 56);
			}
			//最初のid番号
			if (!Titanium.App.Properties.hasProperty('idMin')) {
				Titanium.App.Properties.setInt('idMin', 1);
			}
			//最後のid番号
			if (!Titanium.App.Properties.hasProperty('idMax')) {
				Titanium.App.Properties.setInt('idMax', 56);
			}
			
			if (!Titanium.App.Properties.hasProperty('nend_spotid')) {
				Ti.App.Properties.setInt('nend_spotid_android', 164637);
				Ti.App.Properties.setInt('nend_spotid', 58358);
				Titanium.App.Properties.setString('nend_appkey_android', 'f5b15bfdc1e80b78fa6ea2c7d4e789a97ffd0601');
				Titanium.App.Properties.setString('nend_appkey', '6d4785a59a457742a4e7e2c80eb423ab24ee9cb8');
			}
			
			if(!Ti.App.Properties.hasProperty('inAppBillingPublicKey')){
				Titanium.App.Properties.setString('inAppBillingPublicKey', 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5Q6fJiNt5VCoTYmhQxl7cVYU4aaQKmpBMDxaHanMoQvCQ8PlVxwI6sa+cTHTmFjRFcdwpikATn/FuXTlS7w0arkOe9YNRcW5ZYTA0RCen9260ZMByLMZBWYcSF6s7rSKeP2jIy/EZ+DAcqgi4oNjNsMbtRaOPz9ek6W4R2HLuEKTjtte0nVss7SN8Sbb2ZHVB6n/0y3kr/TYwTk7jzUMrLsQveX1SyTOEdYxXdj0OZ701h3gbgbyGqxZAagNv6k8FGJgAYlVDhi12iga+eXM7QH26So90n9P/9iqJlPAZqjZnsnGe6ylTaUyEhkwsW8XGA3/S4o4rXfLHsfdH2bxxwIDAQAB');
			}
			break;
		case 'care':
			bgColor = arrayColor[3];
			if(!Ti.App.Properties.hasProperty('hidead')){
				Titanium.App.Properties.setString('hidead', 'hidead_caremane');
			}
			//解説準備OK
			arrayPurchase = [ Titanium.App.Properties.getString('hidead')];
			
			arrayTest = [];
			
			for(i=11; i<=16; i++){
				if(i<=99){
					arrayTest.push(dbName + '0' + i + 'a');
					//arrayTest.push(dbName + '0' + i + 'b');
				}else{
					arrayTest.push(dbName + i + 'a');
					//arrayTest.push(dbName + i + 'b');
				}
			}
			
			for(i=0; i<arrayTest.length; i++){
				if (!Titanium.App.Properties.hasProperty('Purchased-'+arrayTest[i])) {
					Titanium.App.Properties.setBool('Purchased-'+arrayTest[i], false);
				}
			}
			
			if (!Titanium.App.Properties.hasProperty('test')) {
				Titanium.App.Properties.setString('test', 'care011a');//最初のデータにする　idMin / idMax を合わせること
			}
			//最初の問題番号
			if (!Titanium.App.Properties.hasProperty('min')) {
				Titanium.App.Properties.setInt('min', 1);
			}
			//最後の問題番号
			if (!Titanium.App.Properties.hasProperty('max')) {
				Titanium.App.Properties.setInt('max', 60);
			}
			//最初のid番号
			if (!Titanium.App.Properties.hasProperty('idMin')) {
				Titanium.App.Properties.setInt('idMin', 1);
			}
			//最後のid番号
			if (!Titanium.App.Properties.hasProperty('idMax')) {
				Titanium.App.Properties.setInt('idMax', 60);
			}
			
			if (!Titanium.App.Properties.hasProperty('nend_spotid')) {
				Ti.App.Properties.setInt('nend_spotid_android', 164638);
				Ti.App.Properties.setInt('nend_spotid', 58361);
				Titanium.App.Properties.setString('nend_appkey_android', '6ac3912d368b54da0bcf161f1e0caaf6747ee9e5');
				Titanium.App.Properties.setString('nend_appkey', '8880285e4a92d0c2a1aa3d155dd13add20bd2786');
			}
			
			if(!Ti.App.Properties.hasProperty('inAppBillingPublicKey')){
				Titanium.App.Properties.setString('inAppBillingPublicKey', 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvEWe2u779oHOdhO6hsqTetyIHUg47YG3CXapf86G3r9Lr5O/2yyu6hrlmx+7XQ+KUfcgFgaFAsig2ft6GQxglpylKq4p9MVL3Ur0jUqKFiOplmQ0NoYdhQnEEtJP8kqAkI8yUh9J51bpvIOcvPR8pgljJaWNbW0HnQTwZXAHpcLnFo31AOZLVm4prmowtggZ/hwOW/LONAIAQwgKdRMQnz4QCib058CNycLzkGz7HBe3sJ2tnrWIIMFbmp5hN5ppkLNqlEAghoKBe7gpKcN39VI/o2KGW/dbQkdAaRnuQGaayAA+FgEbnniR6JDJBYahQxbY/qFgcysK5k7eqyUMfwIDAQAB');
			}
		break;
		default:
			bgColor = '#000';
			if(!Ti.App.Properties.hasProperty('hidead')){
				Titanium.App.Properties.setString('hidead', 'hidead');
			}
		break;
	}
	
	/////////////////
	//Ti.API.info('rowHeight: ' + rowHeight);
	
	for(i=0; i<arrayBool.length; i++){
		if (!Titanium.App.Properties.hasProperty(arrayBool[i])) {
			if(osname=='android' && arrayBool[i]=='noVoice'){
				Titanium.App.Properties.setBool(arrayBool[i], true);
			}else{
				Titanium.App.Properties.setBool(arrayBool[i], false);
			}
		}
	}
	
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
	//出題範囲
	if (!Titanium.App.Properties.hasProperty('range')) {
		Titanium.App.Properties.setInt('range', 10);
	}
	
	if (!Titanium.App.Properties.hasProperty('timer')) {
		Titanium.App.Properties.setInt('timer', 0);
	}
	
	if(!Ti.App.Properties.hasProperty('mode')){
		Titanium.App.Properties.setString('mode', 'normal');
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
	
	if(!Ti.App.Properties.hasProperty('speed')){//spech
		if(osname=='android'){
			Titanium.App.Properties.setDouble('speed', 1);
		}else{
			Titanium.App.Properties.setDouble('speed', 0.3);
		}
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
	require('lib/db').createDatabase(dbName);
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
  new Window(dbName, bgColor, arrayColor, arrayTest, arrayPurchase).open();
})();
