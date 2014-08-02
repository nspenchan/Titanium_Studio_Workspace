exports.createWin3 = function(){
	var win3 = Titanium.UI.createWindow({  
	    title:String.format(L('Tab_'), '3'),
	    backgroundColor:'red'
	});
	
	//mapView
	// マーカーはAnnotationオブジェクトとして表現される。
	var tokyo_station = Titanium.Map.createAnnotation({
        latitude:35.681382,
        longitude:139.766084,
        title:"東京駅",
        subtitle:'Tokyo Station (Tokyo)',
        pincolor:Titanium.Map.ANNOTATION_PURPLE,
        animate:true,
        //leftButton:'images/atlanta.jpg',
        //rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
        //myid:3 // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS    
	});
	// MapViewオブジェクトを作成する。
	var mapview = Titanium.Map.createView({
		top: 0,
        mapType: Titanium.Map.STANDARD_TYPE,
        region: {latitude:35.681382, longitude:139.766084, latitudeDelta:0.01, longitudeDelta:0.01},
        animate:true,
        regionFit:true,
        userLocation:true,
        annotations:[tokyo_station]
	});
	win3.add(mapview);
	
	var b1 = Titanium.UI.createButton({title:L('Back')});
	var b2 = Titanium.UI.createButton({title:L('Next')});
	win3.LeftNavButton = b1;
	win3.RightNavButton = b2;
		
	b1.addEventListener('click', function(){
		tabGroup.activeTab = tabGroup.tabs[1];
	});
	b2.addEventListener('click', function(e){
	   tabGroup.activeTab = tabGroup.tabs[3];
	});	

	
	return win3;
};