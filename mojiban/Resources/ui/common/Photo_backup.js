//FirstView Component Constructor
function Photo(win, questionImage, k, text, imageName, changeHiragana) {
	var height = Ti.Platform.displayCaps.platformHeight;
	var width = Ti.Platform.displayCaps.platformWidth;
	var osname = Ti.Platform.osname;
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'#fff',
	});
	//Titanium.UI.iPhone.hideStatusBar();
    
    self.addEventListener('click', function(e) {
    		win.remove(self);
    });

   	var undoImage = Ti.UI.createImageView({
        image:'/assets/images/Undo.png',
        height:80,
        width:80,
        top:20,
        left:40,
    });
    
    undoImage.addEventListener('click', function(e) {
    		win.remove(self);
    });
    
    self.add(undoImage);
    
    var label = Ti.UI.createLabel({
		height:60,
		width:60,
		borderRadius:30,
		color:'#000000',
		backgroundColor:'#fff',
		font:{fontSize:35, fontFamily:'Helvetica Neue', fontWeight:'bold'},
        text:text,
        textAlign:'center',
        top:5,
        borderColor:'#000',
        borderWidth:1,
    });
    
    self.add(label);
    
    var keyView = Ti.UI.createView({
        color:'#000000',
        height:200,
        width:200,
		left:20,
        borderColor:'#000',
        borderWidth:1,
    });
    
    self.add(keyView);
    
    var image = Ti.UI.createImageView({
        backgroundImage:'/assets/images/mojiban/' + imageName + '.png',
        height:190,
        width:190,
        top:5,
        right:5,
        //borderColor:'#000',
        //borderWidth:1,
    });
	
	keyView.add(image);
    
    var forward = Ti.UI.createImageView({
        backgroundImage:'/assets/images/Forward.png',
        height:64,
        width:64,
        left:255,
        //borderColor:'#000',
        //borderWidth:1,
    });
	
	self.add(forward);
	
	var shutter = Titanium.Media.createSound({
	    // リモートURLも指定できます
	    // url : "http://www.nch.com.au/acm/8kmp38.wav"
	    url: '/assets/sound/se-033.mp3',
	    looping : false,
	});
	
	Titanium.Media.openPhotoGallery({
        success : function(event) {
			//alert('pictures:' + count1);
	        	var pHeight = event.media.height;
	        	var pWidth = event.media.width;
	        	Ti.API.error('x:' + pWidth +'/y:' + pHeight);
		    if(pWidth>=pHeight){
		        	var shift_x = (pWidth-pHeight)/2;
	            var blob = event.media.imageAsCropped({x:shift_x, y:0, width:pHeight, height:pHeight});	
	        	}else if(pWidth<pHeight){
		        	var shift_y = (pHeight-pWidth)/2;
	            var blob = event.media.imageAsCropped({x:0, y:shift_y, width:pWidth, height:pWidth});	
	        	}
            blob.imageAsResized(640, 640);
            // アプリケーションデータディレクトリに出力する。
	        var f = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, imageName + ".png");
	        if (!f.exists()) {
	            f.createFile();
	        }
	        f.write(blob);
	        
            var imageView = Ti.UI.createImageView({
                width:320,
                height:320,
                image:blob,
                //top:0,
            });
            self.add(imageView);
	        
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
	            	questionImage.backgroundImage = Titanium.Filesystem.applicationDataDirectory + imageName + ".png";
	            	questionImage.opacity = 1;
	            	questionImage.val0 = text;
	            	shutter.play();
				win.remove(self);
				changeHiragana('input');
			}, 1000);
        },
        error : function(error) {
        },
        cancel : function() {
            // キャンセル時の挙動
			win.remove(self);
        },
        // 選択直後に拡大縮小移動をするか否かのフラグ
        allowEditing : true,
        // 選択可能なメディア種別を配列で指定
        mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
    });
	
	return self;
}

module.exports = Photo;
