exports.createWin13 = function(){
	if (!Ti.App.Properties.hasProperty('photoname')) {
		//初回起動時のみ、実行される
		Ti.App.Properties.setInt('photoname', 1);
	}
	var turn = Ti.App.Properties.getInt('photoname');
	var db1 = Titanium.Database.open('photo');
	
	// DB内にテーブルが無い場合、定義に基づいてテーブルを作成します。
	db1.execute('CREATE TABLE IF NOT EXISTS PROJECT_1(ID INTEGER, TURN INTEGER, NAME TEXT, RATIO REAL, POINT INTEGER, ZOOM REAL, ANGLE INTEGER, MESSAGE TEXT)');
	
	var win13 = require('/ui/ui').createWindow('', 'purple');
	Titanium.UI.iPhone.hideStatusBar();
	var wWidth = Titanium.Platform.displayCaps.platformWidth;
	var wHeight = Titanium.Platform.displayCaps.platformHeight;

	var b1 = require('ui/ui').createButton('#000', '#fff', 'Back to win1', 12, 'center', 'auto', 32, 9, 10);
	//var b2 = require('ui/ui').createButton('#000', '#fff', 'Next', 12, 'center', 'auto', 32, 9);
	//b2.right = 10;
	
	b1.addEventListener('click', function(e){
	    //back to win1
	    win13.close();
	});
	/*
	b2.addEventListener('click', function(e){
	    //move to win14
		win14 = require('ui/win14').createWin14('', 'blue').win;
		win14.open();
		win13.close();
	});
	*/
	Titanium.Media.openPhotoGallery({
        success : function(event) {
	        	var pHeight = event.media.height;
	        	var pWidth = event.media.width;
	        	var ratio = pHeight/pWidth;
            var name = convertNum(Ti.App.Properties.getInt('photoname'), 4);
            var photoName = 'p' + name + '.png';
            //var photo = event.media.imageAsThumbnail(100);//100はサムネイル写真のサイズを設定する（１００＊１００)
            
            if(ratio >1){//縦長
            		var ratio2 = wWidth/pWidth;
            		var imageView = Ti.UI.createImageView({
	                width:wWidth,
	                image:event.media,
	                top:(wHeight-wWidth*ratio)/2,
	            });
	            win13.add(imageView);
	            
	           var blob = event.media.imageAsResized(640, 640*ratio);
	            // アプリケーションデータディレクトリに出力する。
		        var f = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "/" + photoName);
		        if (!f.exists()) {
		            f.createFile();
		        }
		        f.write(blob);
		        //point=9 no focus
		        var insert = 'INSERT INTO PROJECT_1 VALUES(' + turn + ', ' + turn + ', "' + photoName + '", ' + ratio + ', 9, 1, 0, "non")';
		        db1.execute(insert);
	        		Ti.App.Properties.setInt('photoname', Ti.App.Properties.getInt('photoname')+1);
		        
		        var b3 = require('ui/ui').createButton('#000', '#fff', L('OK'), 12, 'center', 'auto', 32);
	            	b3.bottom = 10;
	            
	            b3.addEventListener('click', function(){
	            		win13.remove(b3);
	            		win13.add(pointView);
	            		win13.add(b1);
					//win13.add(b2);
	            });
	            win13.add(b3);
            } else {//横長
            		var ratio2 = wWidth/pHeight/ratio;
	            var scrollView = Titanium.UI.createScrollView({
				    contentWidth:wWidth/ratio/ratio,
				    //contentHeight:wWidth/ratio,
				    contentHeight:wHeight,
				    //top:(wHeight-wWidth/ratio)/2,
				    //showVerticalScrollIndicator:true,
				    //showHorizontalScrollIndicator:true,
				    maxZoomScale:1,
				    minZoomScale:1,
				    //left:-(1/ratio/ratio -1)*wWidth/2,
				});
				
				var xPosition = (1/ratio/ratio -1)*wWidth/2;
	            
	            scrollView.addEventListener('scroll', function(e){
				    // e.x, e.y スクロール後の座標を返す。右上角
				    Ti.API.info(e.x + ' / ' + e.y);
	            		xPosition = e.x;	
				});
	            
	             var imageView = Ti.UI.createImageView({
	             	//width:wWidth/ratio/ratio,
	                //height:wWidth/ratio,
	                image:event.media,
	            });
	            
	            	var b3 = require('ui/ui').createButton('#000', '#fff', L('TRIM'), 12, 'center', 'auto', 32);
	            	b3.bottom = 10;
	            
	            b3.addEventListener('click', function(){
		            //alert(xPosition);
		            var blob0 = event.media.imageAsCropped({
		            		width:pHeight*ratio,
				        height:pHeight,
				        x:xPosition*pHeight/wWidth*ratio,
				        y:0
		            });
		            //alert('x2:'+xPosition*pHeight/wWidth*ratio);
		            var blob = blob0.imageAsResized(640, 640/ratio);
		            // アプリケーションデータディレクトリに出力する。
			        var f = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "/" + photoName);
			        if (!f.exists()) {
			            f.createFile();
			        }
			        f.write(blob);
			        //point=9 no focus
		        var insert = 'INSERT INTO PROJECT_1 VALUES(' + turn + ', ' + turn + ', "' + photoName + '", ' + 1/ratio + ', 9, 1, 0, "non")';
					//alert(insert);
			        db1.execute(insert);
		        		Ti.App.Properties.setInt('photoname', Ti.App.Properties.getInt('photoname')+1);
			        
			        scrollView.scrollingEnabled = false;
			        win13.remove(b3);
		            win13.remove(frame1);
		            win13.remove(frame2);
		            win13.remove(frame3);
		            win13.remove(frame4);
		            win13.add(pointView);
	            		win13.add(b1);
					//win13.add(b2);
	            });
	            
	           var frame1 = Ti.UI.createView({
	           		backgroundColor:'red',
	           		width:5,
	           		height:wHeight,
	           		left:0
	            });
	            
	           var frame2 = Ti.UI.createView({
	           		backgroundColor:'red',
	           		width:5,
	           		height:wHeight,
	           		right:0
	            });
	            
	           var frame3 = Ti.UI.createView({
	           		backgroundColor:'red',
	           		width:wWidth,
	           		height:5,
	           		top:0
	            });
	            
	           var frame4 = Ti.UI.createView({
	           		backgroundColor:'red',
	           		width:wWidth,
	           		height:5,
	           		bottom:0
	            });
	            
	            scrollView.add(imageView);
			        
	            win13.add(scrollView);
	            
	            win13.add(b3);
	            
	            win13.add(frame1);
	            win13.add(frame2);
	            win13.add(frame3);
	            win13.add(frame4);
	            
				scrollView.scrollTo(xPosition, 0);
            	}
			
			var pointView = Ti.UI.createView();
			var pointViewLabel = Ti.UI.createLabel({color:'black', backgroundColor:'white', text:L('NO FOCUS'), top:50});
            pointView.add(pointViewLabel);
			var array = [
				[wWidth/4, wHeight/2-pHeight*ratio2/4],
				[wWidth/2, wHeight/2-pHeight*ratio2/4],
				[wWidth*3/4, wHeight/2-pHeight*ratio2/4],
				[wWidth/4, wHeight/2],
				[wWidth/2, wHeight/2],
				[wWidth*3/4, wHeight/2],
				[wWidth/4, wHeight/2+pHeight*ratio2/4],
				[wWidth/2, wHeight/2+pHeight*ratio2/4],
				[wWidth*3/4, wHeight/2+pHeight*ratio2/4],
			];
			for(var i=0; i<9; i++){
				var point= Ti.UI.createView({
					top:array[i][1],
					left:array[i][0],
	           		backgroundColor:'white',
	           		width:20,
	           		height:20,
	           		borderColor:'black',
	           		borderRadius:10,
	           		borderWidth:5,
	           		num:i
	            });
	            point.addEventListener('click', function(e){
	            		//すべての選択を解除する
	            		var children = pointView.getChildren();
					for (var i=0;i<children.length;i++){
					    var child = children[i];
					    child.backgroundColor = 'white';
					}
	            		e.source.backgroundColor = 'red';
	            		//alert(e.source.num);
	            		Ti.API.info('e: ' + JSON.stringify(e));
	            		var update = 'UPDATE PROJECT_1 SET ZOOM = 1.5, POINT = ' + e.source.num + ' WHERE ID = ' +  turn;
	            		db1.execute(update);
					win14 = require('ui/win14').createWin14(turn, pointViewLabel);
					win14.open();
	            });
	            pointView.add(point);
			}
        },
        error : function(error) {
        },
        cancel : function() {
            // キャンセル時の挙動
            win13.close();
        },
        // 選択直後に拡大縮小移動をするか否かのフラグ
        allowEditing : false,
        // 選択可能なメディア種別を配列で指定
        mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
    });
	
	return win13;
	
	var result = convertNum(1234, 5);//01234
 
	function convertNum(num, figures) {
		var str = String(num);
		while (str.length < figures) {
			str = "0"+str;
		}
		return str;
	}
};