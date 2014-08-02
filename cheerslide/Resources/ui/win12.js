function ApplicationWindow(title, tabGroup, parentwindow, wRatio, bgm00, label00, label1, label2, purchase, themesong) {
	//alert("intialization:" + Ti.App.Properties.getInt("intialization"));
	Ti.API.info(Ti.App.Properties.getBool('Purchased-'+purchase) + ':' + purchase);
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'blue'
	});
	//3.1.2
	self.showNavBar();
	
	var b1 = Titanium.UI.createButton({title:L('Back')});
	//var b2 = Titanium.UI.createButton({title:L(' ＋ ')});
	var b2 = Titanium.UI.createImageView({image:'/assets/images/Plus.png'});
	self.LeftNavButton = b1;
	self.RightNavButton = b2;
		
	b1.addEventListener('click', function(){
		//Thema Song
		if(bgm00.playing==false && Ti.App.Properties.getBool('bgm')==true){
			bgm00.play();
			themesong.backgroundImage = 'assets/images/no_sound_x.png';
		}
		self.close();
	});
	b2.addEventListener('click', function(e){
		if(Ti.App.Properties.getBool('Purchased-'+purchase)==true){
			tableview.top = 60;
			var tf1 = Titanium.UI.createTextField({
		        color:'#336699',
		        top:10,
		        left:10,
		        width:220,
		        height:40,
		        hintText:L('Enter_New_Project_Name'),
		        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		        returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
			});
			self.add(tf1);
			
			// TEXT FIELD EVENTS (return, focus, blur, change)
			tf1.addEventListener('return',function(e){
				var NowDate = nowDate();
				var id = last_id + 1;
				if(id<1000){
					var name = 'p' + convertNum(id, 3);
					Ti.App.Properties.setInt('setDatabase', 0);
					//var count1 = 0;
					require('lib/db').createDatabase(id, name, e.value);
					
					/*
					var db2 = Titanium.Database.open('project');
					db2.execute('INSERT INTO DATA VALUES(' + id + ', "' + name + '", "' + e.value + '", "", "", "", "' + NowDate + '")');
					db2.close();
					*/
				}else{
					alert(L('Cant_make_project_1000_over'));
				}
				Ti.App.Properties.setString('project', name);
				self.remove(tf1);
				self.remove(button);
				self.remove(tableview);
				
				Ti.App.Properties.setInt("intialization", 0);
				label00.text = L('Initialization');
				label1.opacity = 0;
				label2.opacity = 0;
				themesong.backgroundImage = 'assets/images/no_sound_x.png';
				//Thema Song
				if(bgm00.playing==false && Ti.App.Properties.getBool('bgm')==true){
					setTimeout(function(){
						bgm00.play();
					},100);
				}
				setTimeout(function(){
					self.close();
				},500);
			});
			
			var button = Ti.UI.createButton({
				height:40,
				width:70,
				title:'Cancel',
				top:10,
				right:10
			});
			
			self.add(button);
			button.addEventListener('click', function() {
				//containingTab attribute must be set by parent tab group on
				//the window for this work
				self.remove(tf1);
				self.remove(button);
				self.remove(tableview);
				setTimeout(function(){
					table();	
				}, 100);
			});
		}else{
			alert(L('Cant_make_new_project'));
		}
	});
	
	table();
	
	//tableView
	var tableview;
	var last_id;
	function table(){
		var db2 = Titanium.Database.open('project');
		
		var rows = [];
		
		var rows_db = db2.execute('SELECT * FROM DATA');
		
		while(rows_db.isValidRow()){
			last_id = rows_db.field(0);
			var row = Ti.UI.createTableViewRow({
			    //画像表示用の自作のプロパティ
			    height:'auto',
			    backgroundColor:'white',
			    num:rows_db.field(0),
			    del:false,
			});
			
			var leftImage = Titanium.UI.createImageView({
			    image: '/assets/images/Checkmark-non.png',
			    left:0,
			    num:rows_db.field(0),
			});
			if(convertNum(rows_db.field(0), 3) == Ti.App.Properties.getString('project').substr(1, 3)){
				leftImage.image = '/assets/images/Checkmark.png';
				row.backgroundColor = 'green';
			}
			leftImage.addEventListener('click', function(e) {
				var num = e.source.num;
				var name = 'p' + convertNum(num, 3);
				Ti.App.Properties.setString('project', name);
				self.remove(tableview);
				
				setTimeout(function(){
					table();	
				}, 100);
			});
			row.add(leftImage);
			
			var label = Titanium.UI.createLabel({
				color:'#000',
				backgroundColor:'transparent',
				text:L('Project') + ' ' + rows_db.field(0) + ':\n' + rows_db.fieldByName('DISPLAY'),
				font:{fontSize:20,fontFamily:'Helvetica Neue'},
				//textAlign:'left',
				width:170,
				height:'auto',
				top:10,
				bottom:10,
				left:50,
				//opacity:0.7,
			});
			row.add(label);
			
			var renameButton = Titanium.UI.createImageView({
			    image: '/assets/images/Pencil.png',
			    right:50,
			    num:rows_db.field(0),
			});
			renameButton.addEventListener('click', function(e) {
				tableview.top = 60;
				var tf1 = Titanium.UI.createTextField({
			        color:'#336699',
			        top:10,
			        left:10,
			        width:220,
			        height:40,
			        hintText:L('Rename_Project'),
			        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
			        returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
			        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
				    num:e.source.num,
				});
				self.add(tf1);
				
				var button = Ti.UI.createButton({
					height:40,
					width:70,
					title:'Cancel',
					top:10,
					right:10
				});
				
				self.add(button);
				button.addEventListener('click', function() {
					//containingTab attribute must be set by parent tab group on
					//the window for this work
					self.remove(tf1);
					self.remove(button);
					self.remove(tableview);
					
					setTimeout(function(){
						table();	
					}, 100);
				});
				
				// TEXT FIELD EVENTS (return, focus, blur, change)
				tf1.addEventListener('return',function(e){
					var db2 = Titanium.Database.open('project');
					db2.execute('UPDATE DATA SET DISPLAY = "' + e.value + '" WHERE ID = ' + e.source.num);
					db2.close();
					self.remove(tf1);
					self.remove(button);
					self.remove(tableview);
					
					setTimeout(function(){
						table();	
					}, 100);
				});

			});
			row.add(renameButton);
			
			var deleteButton = Titanium.UI.createImageView({
			    image: '/assets/images/X.png',
			    right:0,
			    num:rows_db.field(0),
			});
			deleteButton.addEventListener('click', function(e) {
				var num = e.source.num;
				Ti.API.info('num: ' + e.source.num);
				Ti.API.info('e: ' + JSON.stringify(e));
				//containingTab attribute must be set by parent tab group on
				//the window for this work
				var alertDialog = Titanium.UI.createAlertDialog({
				    title: L('Delete_Project'),
				    message: L('Are_you_sure_you_want_to_delete_this_project'),
				    buttonNames: [L('OK'),L('Cancel')],
				    // キャンセルボタンがある場合、何番目(0オリジン)のボタンなのかを指定できます。
				    //cancel: 1
				});
				alertDialog.addEventListener('click',function(event){
				    // Cancelボタンが押されたかどうか
				    if(event.index == 1){
				    		//alert('Cancel');
				        // cancel時の処理
						self.remove(tableview);
						
						setTimeout(function(){
							table();	
						}, 100);
				    }
				    // 選択されたボタンのindexも返る
				    if(event.index == 0){
						var db2 = Titanium.Database.open('project');
						if(num != 1){
							db2.execute('DELETE FROM DATA WHERE ID = ' + num);
							if(convertNum(num, 3) == Ti.App.Properties.getString('project').substr(1, 3)){
								Ti.App.Properties.setString('project', 'p001');
							}
						}else{
							alert(L('Cant_delete_Project_1'));
						}

						db2.close();
						
						//database delete
						var name = 'p' + convertNum(num, 3);
						var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, '../Library/Private\ Documents/' + name + '.sql');
						file.deleteFile();
						
						//photo delete
						var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory);
						var photoArray = dir.getDirectoryListing(); 
						for(i=0; i<photoArray.length; i++){
							//alert(photoArray[i].substr(-4,4));
							if(photoArray[i].substr(-4,4)=='.png' && photoArray[i].substr(0,4)==name){
								var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, photoArray[i]);
								file.deleteFile();
							}
						}

						self.remove(tableview);
						
						setTimeout(function(){
							table();	
						}, 100);
				    }
				});
				alertDialog.show();
				
			});
			row.add(deleteButton);
			
			rows.push(row);
			
			rows_db.next();
		}
		rows_db.close();
		db2.close();
		
		// 先ほどのデータに基づいてTable Viewを起こします。
		tableview = Titanium.UI.createTableView({
		    data: rows
		});
		// イベントリスナにクリック時のイベントを登録します。
		tableview.addEventListener('click', function(e){
			e.row.backgroundColor = 'pink';
		});
		// Windowに追加する
		self.add(tableview);
	}
	return self;
	
	var result = convertNum(1234, 5);//01234
 
	function convertNum(num, figures) {
		var str = String(num);
		while (str.length < figures) {
			str = "0"+str;
		}
		return str;
	}
	
	function nowDate(){
		// 日付の取得
	    var date = new Date();
	    var year = date.getYear();
	    var mon = date.getMonth() + 1;
	    var day = date.getDate();
	
	    // 西暦の処理とゼロパディング
	    year = (year < 2000) ? year+1900 : year;
	    if (mon < 10) { mon = "0" + mon; }
	    if (day < 10) { day = "0" + day; }
	
	    // 時間の取得
	    var time = new Date();
	    var hour = time.getHours();
	    var min = time.getMinutes();
	    var sec = time.getSeconds();
	
	    // ゼロパディング
	    if (hour < 10) { hour = "0" + hour; }
	    if (min < 10) { min = "0" + min; }
	    if (sec < 10) { sec = "0" + sec; }
	
	    // 書き出し
	    var nowDate = year + "-" + mon + "-" + day + " " + hour + ":" + min + ":" + sec;
	    return nowDate;
	}
};

module.exports = ApplicationWindow;