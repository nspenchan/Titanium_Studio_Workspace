function ApplicationWindow(title, purchase, tableview, label00, label1, label2) {
	if(Ti.App.Properties.getInt("intialization")<3){
		alert(L('Step_') + '3:\n' + L('To_choose_the_music_of_slide_show'));
	}
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'black'
	});
	
	/*
	var b1 = Titanium.UI.createButton({title:'Back'});
	var b2 = Titanium.UI.createButton({title:'Next'});
	self.LeftNavButton = b1;
	self.RightNavButton = b2;
		
	b1.addEventListener('click', function(){
		tabGroup.activeTab = tabGroup.tabs[0];
	});
	b2.addEventListener('click', function(e){
	   tabGroup.activeTab = tabGroup.tabs[2];
	});	
	
	*/
	var player = null;
	
	try {
		player = Titanium.Media.systemMusicPlayer;
	}
	
	catch (e) {
		// create alert
		Titanium.UI.createAlertDialog({
			title:'Music Player',
			message:'Please run this test on device: Inoperative on simulator'
		}).show();
		self.close();
	}
	
	var settings = {
		success:function(picked)
		{
			if (!settings.autohide) {
				Ti.API.log("You didn't autohide me!");
				Ti.Media.hideMusicLibrary();
			}
			player.setQueue(picked);
			
			player.play();
			
			var alertDialog = Titanium.UI.createAlertDialog({
			    title: L('Music_Setting'),
			    message: L('Are_you_sure_you_want_to_set_the_current_music'),
			    buttonNames: [L('OK'),L('Cancel')],
			    // キャンセルボタンがある場合、何番目(0オリジン)のボタンなのかを指定できます。
			    //cancel: 1
			});
			alertDialog.addEventListener('click',function(event){
			    // Cancelボタンが押されたかどうか
			    if(event.index == 1){
			        // cancel時の処理
			        alert(L('Reselect_Music'));
			        player.stop();
			        Ti.Media.openMusicLibrary(settings);
			    }
			    // 選択されたボタンのindexも返る
			    if(event.index == 0){
					if(Ti.App.Properties.getInt("intialization")<3){
						alert(L('Initialization_is_over'));
						Ti.App.Properties.setInt("intialization", 3);
						var section = tableview.data[0];
						section.rows[4].backgroundColor = 'black';
						section.rows[5].backgroundColor = 'black';
						label00.text = L('Manege_Project');
						label1.opacity = 0.7;
						label2.opacity = 0.7;
						if(Ti.App.Properties.getBool('Purchased-'+purchase)==false){
							label00.opacity = 0;
						}
					}
			        // "OK"時の処理
			        alert(L('Setted_Music') + ':\n' + picked.items[0].title);
			        
			        //queryMusicLibrary にセットして、音楽を取得する
					/*
					Ti.App.Properties.setString('artist', picked.items[0].artist);
					Ti.App.Properties.setString('title', picked.items[0].title);
					Ti.App.Properties.setString('genre', picked.items[0].genre);
					*/
					var db1 = Titanium.Database.open('project');
					db1.execute('UPDATE DATA SET ARTIST = "' + picked.items[0].artist + '", TITLE = "' + picked.items[0].title + '", GENRE = "' + picked.items[0].genre + '" WHERE NAME = "' + Ti.App.Properties.getString('project') + '"');
					//alert('UPDATE DATA SET ARTIST = "' + picked.items[0].artist + '", TITLE = "' + picked.items[0].title + '", GENRE = "' + picked.items[0].genre + '" WHERE NAME = "' + Ti.App.Properties.getString('project') + '"');
					db1.close();
					
					player.stop();
					self.close();
			    }
			});
			alertDialog.show();
		},
		error:function(error)
		{
			// create alert
			var a = Titanium.UI.createAlertDialog({title:'Music Picker'});
	
			// set message
			if (error.code == Titanium.Media.NO_MUSIC_PLAYER)
			{
				a.setMessage('Please run this test on device');
				//alert('count1:' + count1);
				//alert('intial:' + Ti.App.Properties.getInt("intialization"));
				if(Ti.App.Properties.getInt("intialization")<3){
					alert(L('Initialization_is_over') + 'on simulator');
					Ti.App.Properties.setInt("intialization", 3);
					var section = tableview.data[0];
					section.rows[4].backgroundColor = 'black';
					section.rows[5].backgroundColor = 'black';
					label00.text = L('Manege_Project');
					label1.opacity = 0.7;
					label2.opacity = 0.7;
					if(Ti.App.Properties.getBool('Purchased-'+purchase)==false){
						label00.opacity = 0;
					}
				}
				self.close();
			}
			else
			{
				a.setMessage('Unexpected error: ' + error.code);
				self.close();
			}
	
			// show alert
			a.show();
		},
		mediaTypes:[Ti.Media.MUSIC_MEDIA_TYPE_ALL],
		autohide:true,
		cancel : function() {
            // キャンセル時の挙動
            self.close();
        },
	};
	
	Ti.Media.openMusicLibrary(settings);
	
	self.addEventListener('close', function() {
		//close_action
	});
	
	return self;
};

module.exports = ApplicationWindow;