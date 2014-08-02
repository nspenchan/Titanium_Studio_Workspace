function ApplicationWindow(title, count1, turn, tableview) {
	if(Ti.App.Properties.getInt("intialization")==0 && count1==0){
		//from win10 firsttime
		alert(L('Step_') + '1:\n' + L('To_choose_a_photo_three_or_more'));
		
		var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory);
		
		var photoArray = dir.getDirectoryListing();
		//phot number
		var numArray = [];
		
		for(i=0; i<photoArray.length; i++){
			//alert(photoArray[i].substr(-4,4));
			if(photoArray[i].substr(-4,4)=='.png' && photoArray[i].substr(0,4)==Ti.App.Properties.getString('project')){
				count1++;
				Ti.API.info('first:' + count1);
				numArray.push(parseInt(photoArray[i].substr(-7,3)));
				if(count1>=3){
					alert(L('When_add_photo'));
					var section = tableview.data[0];
					section.rows[0].backgroundColor = 'black';
					section.rows[1].backgroundColor = 'black';
					Ti.App.Properties.setInt("intialization", 1);
				}
			}
		}
		if(numArray.length==0){
			count1 = 0;
			turn = 0;
		}else{
			count1 = Math.max.apply(null, numArray);
			turn = Math.max.apply(null, numArray);
		}
	}else if(Ti.App.Properties.getInt("intialization")==3 && count1==0){
		//from win2 firsttime
		var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory);
		
		var photoArray = dir.getDirectoryListing();
		//phot number
		var numArray = [];
		
		for(i=0; i<photoArray.length; i++){
			//alert(photoArray[i].substr(-4,4));
			if(photoArray[i].substr(-4,4)=='.png' && photoArray[i].substr(0,4)==Ti.App.Properties.getString('project')){
				count1++;
				numArray.push(parseInt(photoArray[i].substr(-7,3)));
			}
		}
		if(numArray.length==0){
			count1 = 0;
			turn = 0;
		}else{
			count1 = Math.max.apply(null, numArray);
			turn = Math.max.apply(null, numArray);
		}
	}

	//alert('pictures:' + count1);
	
	var shutter = Titanium.Media.createSound({
	    // リモートURLも指定できます
	    // url : "http://www.nch.com.au/acm/8kmp38.wav"
	    url: 'assets/sound/se-033.mp3',
	    looping : false,
	});
	
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'black'
	});
	
	var b1 = Titanium.UI.createButton({title:L('Cancel')});
	var b2 = Titanium.UI.createButton({title:L('OK')});
	self.LeftNavButton = b1;
	self.RightNavButton = b2;
	////if(Ti.Platform.osname!='andriod'){self.hideTabBar();}
	/*
	if (!Ti.App.Properties.hasProperty('photoname')) {
		//初回起動時のみ、実行される
		Ti.App.Properties.setInt('photoname', 1);
	}
	var turn = Ti.App.Properties.getInt('photoname');
	*/
	var db1 = Titanium.Database.open(Ti.App.Properties.getString('project'));
	
	//Titanium.UI.iPhone.hideStatusBar();
	
	Titanium.Media.openPhotoGallery({
        success : function(event) {
        		//number of photos at phtoliobrary
	        	count1++;
	        	//numer of photo name (0001, 0002, 0003, etc)
			turn++;
			Ti.API.info('all:' + count1);
			//alert('pictures:' + count1);
	        	var pHeight = event.media.height;
	        	var pWidth = event.media.width;
	        	var ratio = pHeight/pWidth;
            //var name = convertNum(Ti.App.Properties.getInt('photoname'), 4);
            var photoName = Ti.App.Properties.getString('project') + convertNum(turn, 4) + '.png';
            
            var imageView = Ti.UI.createImageView({
                //width:wWidth,
                image:event.media,
                //top:0,
            });
            self.add(imageView);
            
            var blob = event.media.imageAsResized(640, 640*ratio);
            // アプリケーションデータディレクトリに出力する。
	        var f = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "/" + photoName);
	        if (!f.exists()) {
	            f.createFile();
	        }
	        f.write(blob);
	        //point=9 no focus
	        var insert = 'INSERT INTO PHOTO (ID, NAME) VALUES(' + turn + ', "' + photoName + '")';
	        db1.execute(insert);
			
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
	            	if(Ti.App.Properties.getInt("intialization")==0 && count1>=3){
					alert(L('When_add_photo'));
					Ti.App.Properties.setInt("intialization", 1);
					var section = tableview.data[0];
					section.rows[0].backgroundColor = 'black';
					section.rows[1].backgroundColor = 'black';
				}
				self.close();
				var Window20 = require('ui/win20');
				var win20 = new Window20(L('Photo'), count1, turn, tableview);
		    		win20.open();
			}, 1000);
            
        },
        error : function(error) {
        },
        cancel : function() {
            // キャンセル時の挙動
            self.close();
        },
        // 選択直後に拡大縮小移動をするか否かのフラグ
        allowEditing : true,
        // 選択可能なメディア種別を配列で指定
        mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
        
        //autohide: false,
    });
	
	return self;
};

var result = convertNum(1234, 5);//01234
 
function convertNum(num, figures) {
	var str = String(num);
	while (str.length < figures) {
		str = "0"+str;
	}
	return str;
}

module.exports = ApplicationWindow;