exports.setProperties = function(){
	if (!Ti.App.Properties.hasProperty('currentVer')) {
		Ti.App.Properties.setInt('currentVer', 100);
		Ti.App.Properties.setInt('setProperties', 0);
		Ti.App.Properties.setInt('setDatabase', 0);
	}
	
	if(Ti.App.Properties.getProperty('currentVer')==100 && Ti.App.Properties.getProperty('setProperties')==0){
		Ti.App.Properties.setInt('setProperties', 1);
		
	}
};