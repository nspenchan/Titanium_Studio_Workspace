(function(){
	// UIの名前空間をさらに画面ごとに分割する
	// 今回は写真タブの画面をまとめているので photo と命名した
	app.ui.photo = {};
	
	// ファクトリメソッド
	// 「写真」タブを生成する
	app.ui.photo.createTab = function(){
		var win = Titanium.UI.createWindow({
			title: '写真',
			backgroundColor: '#fff',
			barColor: '#000',
			// Titanium Mobile 1.8.0.1 では生成時に指定しなければならない
			activity: {
				onCreateOptionsMenu: function(e){
					var menu = e.menu;
					var item = menu.add({title: '写真をとる'});
					item.setIcon('/dark_camera.png');
					item.addEventListener('click', app.ui.photo.openCamera);
				}
			}
		});
		var tab = Titanium.UI.createTab({
			icon: 'dark_book.png',
			title: '写真',
			window: win
		});
		
		// ステップ1: 写真イメージを並べる
		var scrollView = Ti.UI.createScrollView({
			contentWidth: 320,
			contentHeight: 'auto',
			showVerticalScrollIndicator: true,
		});
		win.add(scrollView);
		
		var photos = app.photo.getAll();
		
		// 表示する写真の列や空白表示の大きさを設定する
		var row = 4;                                         // 写真の列の数
		var line = Math.floor((photos.length / row) + 1);    // 写真の行の数
		var space = 1;                                       // 写真と写真の隙間
		
		// 表示する画像の大きさを空白部分も考慮して求める
		var width = Math.floor((Ti.Platform.displayCaps.platformWidth - (space * (row + 1))) / row);
		var height = Math.floor((Ti.Platform.displayCaps.platformHeight - (space * (line + 1))) / row);
		
		//photos.forEach(function(photo, index){
		//	var x = index % row;
		//	var y = Math.floor(index / row);
		//	
		//	var top = space + (height * y) + (space * y);
		//	var left = space + (width * x) + (space * x);
		//	
		//	var view = Ti.UI.createImageView({
		//		image: photo.path,
		//		top: top, left: left,
		//		width: width,
		//		height: height,
		//	});
		//	scrollView.add(view);
		//	
		//	// ステップ2: 写真イメージを表示する
		//	view.addEventListener('singletap', function(){
		//		var win = app.ui.photo.createPhotoWindow(view.image);
		//		tab.open(win);
		//	});
		//});
		
		// ステップ6: 写真を並べる処理を関数にする
		var _insertPhoto = function(photo, index){
			var x = index % row;
			var y = Math.floor(index / row);
			
			var top = space + (height * y) + (space * y);
			var left = space + (width * x) + (space * x);
			
			var view = Ti.UI.createImageView({
				image: photo.path,
				top: top, left: left,
				width: width,
				height: height,
			});
			scrollView.add(view);
			
			// ステップ2: 写真イメージを表示する
			view.addEventListener('singletap', function(){
				var win = app.ui.photo.createPhotoWindow(view.image);
				tab.open(win);
			});
		};
		
		photos.forEach(_insertPhoto);
		
		// ステップ6: 受け取った写真データを反映させるアプリケーションレベルのイベントハンドラを設定する
		Ti.App.addEventListener('app:update', function(event){
			_insertPhoto(event.photo, event.photo.id - 1);
		});
		
		// ステップ3: カメラボタンを設置する
		if (Ti.Platform.osname == 'iphone') {
			var cameraButton = Ti.UI.createButton({
				systemButton: Ti.UI.iPhone.SystemButton.CAMERA
			});
			cameraButton.addEventListener('click', app.ui.photo.openCamera);
			win.rightNavButton = cameraButton;
		} else {
			win.activity.onCreateOptionsMenu = function(e){
				var menu = e.menu;
				var item = menu.add({title: '写真をとる'});
				item.setIcon('dark_camera.png');
				item.addEventListener('click', app.ui.photo.openCamera);
			};
		}
		
		return tab;
	};
	
	// ステップ3: カメラを起動させるメソッドを定義する
	app.ui.photo.openCamera = function(){
		// Ti.Media.showCamera({
		Ti.Media.openPhotoGallery({
			success: function(event){
				// ステップ8: 位置情報も合わせて登録する
				if (!app.util.geolocationEnabled()){
					alert('位置情報サービスはサポートされていないか、利用を許可されていません');
					return;
				}
				Ti.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
				Ti.Geolocation.getCurrentPosition(function(e){
					if (e.error) {
						alert(e.error);
						return;
					}
					// ステップ5: 撮った写真をデータベースへ登録する
					var photo = app.photo.save({
						image: event.media,
						latitude: e.coords.latitude,
						longitude: e.coords.longitude
					});
					Ti.API.debug(photo);
					// ステップ6: 保存した写真をイベントハンドラ経由で一覧に反映させる
					Ti.App.fireEvent('app:update', {photo: photo});
				});
			},
			cancel: function(event){
				// nothing
			},
			error: function(event){
				// nothing
			}
		});
	};
	
	// ステップ2: 写真イメージを表示するファクトリメソッドを定義する
	app.ui.photo.createPhotoWindow = function(/* string */ _image){
		var win = Ti.UI.createWindow({
			barColor: '#000',
			backgroundColor: '#fff',
			translucent: true
		});
		
		win.add(Ti.UI.createImageView({
			width: Ti.Platform.displayCaps.platformWidth,
			height: Ti.Platform.displayCaps.platformHeight,
			image: _image
		}));
		
		if (Ti.Platform.osname == "iphone") {
			win.navBarHidden = true;
			win.tabBarHidden = true;
			
			win.addEventListener('click', function(){
				win.showNavBar();
			});
		}
		
		return win;
	};
})();