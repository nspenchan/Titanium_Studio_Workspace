exports.createWin2 = function(){
	var win = require('/ui/ui').createWindow('Tab 2', 'yellow');
	
	var b1 = Titanium.UI.createButton({title:'Back'});
	var b2 = Titanium.UI.createButton({title:'Next'});
	win.LeftNavButton = b1;
	win.RightNavButton = b2;
		
	b1.addEventListener('click', function(){
		tabGroup.activeTab = tabGroup.tabs[0];
	});
	b2.addEventListener('click', function(e){
	   tabGroup.activeTab = tabGroup.tabs[2];
	});	

	/*
	//webView
	var url = 'http://google.co.jp/';
	var webview = require('/ui/ui').createWebView(url, 0);
	win.add(webview);
	*/
	var player = null;
	
	var info = Ti.UI.createLabel({
		text:'',
		height:'auto',
		width:'auto',
		top:100
	});
	win.add(info);
	var title = Ti.UI.createLabel({
		text:'',
		height:'auto',
		width:'auto',
		top:200
	});
	win.add(title);
	var timeBar = Ti.UI.createProgressBar({
		min:0,
		value:0,
		width:200,
		height:40,
		top:240,
		color:'#888',
		style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN
	});
	win.add(timeBar);
	
	var playback = null;
	var barUpdate = function () {
		timeBar.value = player.currentPlaybackTime;
		Ti.API.log('Playback time: '+player.currentPlaybackTime);
	};
	
	try {
		player = Titanium.Media.systemMusicPlayer;
	
		if (player.playbackState == Titanium.Media.MUSIC_PLAYER_STATE_PLAYING) {
			info.text = 'a: ' + player.nowPlaying.artist + ' : ' + player.nowPlaying.albumTitle;
			title.text = 'a: ' + JSON.stringify(message);//player.nowPlaying.title;
			timeBar.show();
			timeBar.max = player.nowPlaying.playbackDuration;
			timeBar.value = player.currentPlaybackTime;
			if (playback == null) {
				playback = setInterval(barUpdate, 500);
			}
		}
	
		var event1 = 'stateChange';
		var event2 = 'playingChange';
		var event3 = 'volumeChange';
		if (Ti.version >= '3.0.0') {
			event1 = 'statechange';
			event2 = 'playingchange';
			event3 = 'volumechange';
		}
		player.addEventListener(event1, function() {
			if (player.playbackState == Titanium.Media.MUSIC_PLAYER_STATE_STOPPED) {
				title.text = 'b:';
				info.text = 'b: ';
				timeBar.hide();
				timeBar.max = 0;
				timeBar.value = 0;
				clearInterval(playback);
				playback = null;
			}
			if (player.playbackState == Titanium.Media.MUSIC_PLAYER_STATE_PLAYING) {
				info.text = 'picked_object: ' + JSON.stringify(picked_object);///player.nowPlaying.artist + ' : ' + player.nowPlaying.albumTitle;
				title.text = 'picked_object: ' + JSON.stringify(picked_object.items[0]);//player.nowPlaying.title;
				Ti.API.log('picked_object: ' + JSON.stringify(picked_object));
				Ti.API.log('artist: ' + picked_object.items[0].artist);
				Ti.API.log('title: ' + picked_object.items[0].title);
				timeBar.show();
				timeBar.max = player.nowPlaying.playbackDuration;
				timeBar.value = player.currentPlaybackTime;
				if (playback == null) {
					playback = setInterval(barUpdate, 500);
				}
			}
		});
		player.addEventListener(event2, function() {
			if (player.playbackState == Titanium.Media.MUSIC_PLAYER_STATE_PLAYING) {
				info.text = 'd: ' + player.nowPlaying.artist + ' : ' + player.nowPlaying.albumTitle;
				title.text = 'd: ' + player.nowPlaying.title;
				timeBar.show();
				timeBar.max = player.nowPlaying.playbackDuration;
				timeBar.value = 0;
				if (playback == null) {
					playback = setInterval(barUpdate, 500);
				}
			}
		});
		player.addEventListener(event3, function() {
			Ti.API.log('Volume change: '+player.volume);
		});
	}
	catch (e) {
		// create alert
		Titanium.UI.createAlertDialog({
			title:'Music Player',
			message:'Please run this test on device: Inoperative on simulator'
		}).show();
	}
	
	var settings = {
		success:function(picked)
		{
			if (!settings.autohide) {
				Ti.API.log("You didn't autohide me!");
				Ti.Media.hideMusicLibrary();
			}
			player.setQueue(picked);
			picked_object = picked;
			//alert("picked:" + picked);
			//alert("JSON picked:" + JSON.stringify(picked));
		},
		error:function(error)
		{
			// create alert
			var a = Titanium.UI.createAlertDialog({title:'Music Picker'});
	
			// set message
			if (error.code == Titanium.Media.NO_MUSIC_PLAYER)
			{
				a.setMessage('Please run this test on device');
			}
			else
			{
				a.setMessage('Unexpected error: ' + error.code);
			}
	
			// show alert
			a.show();
		},
		mediaTypes:[Ti.Media.MUSIC_MEDIA_TYPE_ALL],
		autohide:true
	};
	
	var b1 = Ti.UI.createButton({
		title:'Play',
		width:80,
		height:40,
		left:20,
		top:20
	});
	b1.addEventListener('click', function() {
		player.play();
	});
	win.add(b1);
	
	var b2 = Ti.UI.createButton({
		title:'Pause',
		width:80,
		height:40,
		top:20
	});
	b2.addEventListener('click', function() {
		player.pause();
	});
	win.add(b2);
	
	var b3 = Ti.UI.createButton({
		title:'Stop',
		width:80,
		height:40,
		top:20,
		right:20
	});
	b3.addEventListener('click', function() {
		//alert('player: ' + player);
		//alert('JSON player: ' + JSON.stringify(player));
		player.stop();
	});
	win.add(b3);
	
	var b11 = Ti.UI.createButton({
		title:'Display library',
		width:120,
		height:40,
		bottom:20,
		right:20
	});
	b11.addEventListener('click', function() {
		Ti.Media.openMusicLibrary(settings);
	});
	win.add(b11);
	
	win.addEventListener('close', function() {
		if (playback != null) {
			clearInterval(playback);
		}
	});
	
	//Titanium.Media.MusicPlayer();
	return win;
};