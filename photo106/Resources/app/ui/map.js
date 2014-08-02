(function(){
	// UIの名前空間をさらに画面ごとに分割する
	// 今回は撮影地タブの画面をまとめているので map と命名した
	app.ui.map = {};
	
	// ファクトリメソッド
	// 「撮影地」タブを生成する
	app.ui.map.createTab = function(){
		var win = Titanium.UI.createWindow({
			title: '撮影地',
			backgroundColor: '#fff',
			barColor: '#000',
			translucent: true
		});
		var tab = Titanium.UI.createTab({
			icon: 'dark_flag.png',
			title: '撮影地',
			window: win
		});
		
		// ステップ7: 自分の現在位置を中心に地図を表示する
		win.addEventListener('open', function(){
			// 位置情報サービスが有効かどうか確認する
			if (!app.util.geolocationEnabled()){
				alert('位置情報サービスはサポートされていないか、利用を許可されていません');
				return false;
			}
			
			// 精度を設定して、位置情報を取得する
			Ti.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
			Ti.Geolocation.getCurrentPosition(function(e){
				if (e.error) {
					alert(e.error);
					return;
				}
				
				var mapView = Ti.Map.createView({
					mapType: Ti.Map.STANDARD_TYPE,
					region: {
						latitude: e.coords.latitude,
						longitude: e.coords.longitude,
						latitudeDelta: 0.05,
						longitudeDelta: 0.05
					},
					regionFit: true,
					animate: true,
					userLocation: true
				});
				mapView.addEventListener('regionChanged', function(){});
				win.add(mapView);
				
				// ステップ9: アノテーションを設置する
				var _insertAnotation = function(photo){
					var date = new Date;
					date.setTime(photo.created_at);
					
					var anotation = Ti.Map.createAnnotation({
						latitude: photo.latitude,
						longitude: photo.longitude,
						title: String.formatDate(date, "long"),
						pincolor: Titanium.Map.ANNOTATION_RED,
						animate: true,
						leftView: Ti.UI.createImageView({image: photo.path, width: 32, height: 32}),
						rightButton: (Ti.Platform.osname == "iphone" ? Ti.UI.iPhone.SystemButton.DISCLOSURE : "/light_more.png"),
						photo: photo
					});
					mapView.addAnnotation(anotation);
				};
				
				app.photo.getAll().forEach(_insertAnotation);
				
				// ステップ10: 写真を表示する
				mapView.addEventListener('click', function(event){
					if (event.annotation && event.clicksource == "rightButton"){
						var win = app.ui.photo.createPhotoWindow(event.annotation.photo.path);
						tab.open(win);
					}
				});
				
				// ステップ11: 登録した写真をマップに反映させる
				Ti.App.addEventListener('app:update', function(event){
					_insertAnnotation(event.photo);
				});
			});
		});
		
		return tab;
	};
})();
