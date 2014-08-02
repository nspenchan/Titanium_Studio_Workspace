//FirstView Component Constructor
function Camera(win, oldWindow, label01) {
	var height = Ti.Platform.displayCaps.platformHeight;
	var width = Ti.Platform.displayCaps.platformWidth;
	var osname = Ti.Platform.osname;
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'#000',
	});
	//Titanium.UI.iPhone.hideStatusBar();
	
	if (Titanium.Platform.model == 'google_sdk' || Titanium.Platform.model == 'Simulator'){
	//om simulator
		self.backgroundColor = 'red';
		var label = Ti.UI.createLabel({
			color:'#fff',
			text:'Simulator',
		});
		self.add(label);
		setTimeout(function(){
			alert('Back');
			win.remove(self);
		}, 1000);
		
	}else{
	//on device
		var shutter = Titanium.Media.createSound({
		    // リモートURLも指定できます
		    // url : "http://www.nch.com.au/acm/8kmp38.wav"
		    url: '/assets/sound/se-033.mp3',
		    looping : false,
		});
		
		Titanium.Media.showCamera({
		    // JSON形式の引数です
		    success:function(event){
		        // cropRectにはx,y,height,widthといったデータがはいる。
		        var cropRect = event.cropRect;
		        var image    = event.media;
		        
		        	var pHeight = cropRect.height;
		        	var pWidth = cropRect.width;
		        	Ti.API.error('x:' + pWidth +'/y:' + pHeight);
			    if(pWidth>=pHeight){
			        	var shift_x = (pWidth-pHeight)/2;
		            var blob = image.imageAsCropped({x:shift_x, y:0, width:pHeight, height:pHeight});	
		        	}else if(pWidth<pHeight){
			        	var shift_y = (pHeight-pWidth)/2;
		            var blob = image.imageAsCropped({x:0, y:shift_y, width:pWidth, height:pWidth});	
		        	}
	
	            if(osname=='android'){
		            blob.imageAsResized(320, 320);
		            var directory = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'user');
		            if(!directory.exists()) {
		            	    directory.createDirectory();
		            	}
	            	    var f = Ti.Filesystem.getFile(directory.nativePath, "userFace.png");
		            f.write(blob);
	            }else{
		            blob.imageAsResized(640, 640);
		            // アプリケーションデータディレクトリに出力する。
			        var f = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "userFace.png");
			        if (!f.exists()) {
			            f.createFile();
			        }
			        f.write(blob);
		        }
		        
	            var imageView = Ti.UI.createImageView({
	                width:320,
	                height:320,
	                image:blob,
	                //top:0,
	            });
	            self.add(imageView);
	            
	            var faceMask = Ti.UI.createImageView({
	                width:320,
	                height:320,
	                image:'/assets/images/faceMask.png',
	                //top:0,
	            });
	            self.add(faceMask);
		        
	        		var label = Titanium.UI.createLabel({
					color:'#000',
					backgroundColor:'#fff',
					text:L('Saved'),
					font:{fontSize:20,fontFamily:'Helvetica Neue'},
					textAlign:'center',
					width:'auto',
					height:'auto',
					bottom:10,
					right:10,
					opacity:0.7,
				});
				
				self.add(label);
	            
	            setTimeout(function(){
		            	shutter.play();
					//win.remove(firstView);
					var User = require('ui/common/User');
					//construct UI
					var user = new User(win, label01);
					win.add(user);
					win.remove(oldWindow);
					win.remove(self);
				}, 1000);
		    },
		    cancel:function(){
	            // キャンセル時の挙動
				win.remove(self);
		    },
		    error:function(error){
		        // errorとしてカメラがデバイスにないようなケース(iPod touchなどがそうでしょうか)では
		        // error.code が Titanium.Media.NO_CAMERA として返ります。
		    },
		    // 撮影データのフォトギャラリーへの保存
		    saveToPhotoGallery:true,
		    // 撮影直後に拡大縮小移動をするか否かのフラグ
		    allowEditing:true,
		    // 撮影可能なメディア種別を配列で指定
		    mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO],
	    });
	}
	
	return self;
}

module.exports = Camera;
