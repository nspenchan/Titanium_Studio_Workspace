function ApplicationWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'yellow'
	});
	//3.1.2
	self.showNavBar();
	//if(Ti.Platform.osname!='andriod'){self.hideTabBar();}
	
	var b2 = Titanium.UI.createImageView({image:'/assets/images/X.png'});
	self.RightNavButton = b2;
	
	b2.addEventListener('click', function(e){
		var db1 = Titanium.Database.open(Ti.App.Properties.getString('project'));
		section = tableview.data[0];
		/*
        Ti.API.info("rowCount:" + section.rowCount);
        Ti.API.info("row1:" + section.rows[0].title);
        Ti.API.info("row2:" + section.rows[1].title);
        */
		for (var i=0;i<section.rowCount;i++){
			//Ti.API.info(section.rows[i].value1);
			//Ti.API.info(section.rows[i].value2);
			if(section.rows[i].bool1 == true){
				Ti.API.info('delete:' + section.rows[i].value1);
				var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, section.rows[i].value1);
				file.deleteFile();
				var num = section.rows[i].value1.substr(4,4);
				num = parseInt(num);
				db1.execute('DELETE FROM PHOTO WHERE ID = ' + num);
			}
			if(section.rows[i].bool2 == true){
				Ti.API.info('delete:' + section.rows[i].value2);
				var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, section.rows[i].value2);
				file.deleteFile();
				var num = section.rows[i].value2.substr(4,4);
				num = parseInt(num);
				db1.execute('DELETE FROM PHOTO WHERE ID = ' + num);
			}
		}
		self.remove(tableview);
		db1.close();
		table();    		
	});
	
	table();
	
	//tableview
	var tableview;
	function table(){
		//ディレクトリ情報取得
		var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory);
		//Ti.API.info(dir.getDirectoryListing());
		
		var photoArray = dir.getDirectoryListing();
		
		var rows = [];
		
		var count = 0;
		var nodata = 0;
		var num_limit = photoArray.length; 
		for(i=0; i<num_limit; i++){
			//alert(photoArray[i].substr(-4,4));
			if(photoArray[i].substr(-4,4)=='.png' && photoArray[i].substr(0,4)==Ti.App.Properties.getString('project')){
				nodata++;
				var count1 = count%2;
				
				var view = Ti.UI.createLabel({
					color:'red',
					backgroundColor:'transparent',
					textAlign:'right',
					width:160,
					height:130,
					opacity:1,
				});
	            
				var imageView = Ti.UI.createImageView({
	                width:120,
	                image:Titanium.Filesystem.applicationDataDirectory + photoArray[i],
	                top:5,
	            });
				
				if(count1 == 0){
					view.left = 0;
					imageView.left = 20;
					var row = Ti.UI.createTableViewRow({
			            	backgroundColor:'white',
			            	height:130,
			            	value1:photoArray[i],
			            	bool1:false,
					    touchEnabled : false,
					    selectionStyle :'non',
			         });
				}else{
					view.right = 0;
					imageView.right = 20;
					row.value2 = photoArray[i];
					row.bool2 = false;
				}
				
				view.addEventListener('click', function(e) {
					Ti.API.info('view: '+ JSON.stringify(e));
					if(e.x <159){
						if(e.source.opacity == 1){
							Ti.API.info('delete left');
							setTimeout(function(){
								e.source.backgroundColor = 'red';
							},100);
							e.source.opacity = 0.5;
							e.row.bool1 = true;
						}else{
							setTimeout(function(){
								e.source.backgroundColor = 'transparent';
							},100);
							e.source.opacity = 1;
							e.row.bool1 = false;
						}
					}else if(e.x >161){ 
						if(e.source.opacity == 1){
							Ti.API.info('delete right');
							setTimeout(function(){
								e.source.backgroundColor = 'red';
							},100);
							e.source.opacity = 0.5;
							e.row.bool2 = true;
						}else{
							setTimeout(function(){
								e.source.backgroundColor = 'transparent';
							},100);
							e.source.opacity = 1;
							e.row.bool2 = false;
						}
					}
				});
	            
	            row.add(imageView);
				row.add(view);
				if(count1 == 1){
	            		rows.push(row);
	            }else if(count1 == 0 && i == num_limit-1){
	            		rows.push(row);
	            }
	            count++;
			}
		}
		tableview = Titanium.UI.createTableView({top: 0});
		if(nodata ==0){
		    var zoom = Titanium.App.Properties.getDouble('zoom');
			var row1 = Ti.UI.createTableViewRow({
	            height : 'auto',
	            hasChild:true
	        });
	        var label1 = Titanium.UI.createLabel({
	            color : '#999',
	            backgroundColor : '#fff',
	            text : L('No_data'),
	            font : {
	                fontSize : 16*zoom,
	                fontFamily : 'Helvetica Neue'
	            },
	            height : 'auto',
	            top : 16,
	            bottom : 16,
	            width : 260,
	            left : 20,
	        });
	        row1.add(label1);
	        row1.addEventListener('click', function(e){
	        		self.close();
		    		var count1 = 0;
		    		var turn = '';
		    		var Window20 = require('ui/win20');
				var win20 = new Window20(L('Photo'), count1, turn);
		    		win20.open();
	        });
	        tableview.appendRow(row1);
		}else{
		    tableview.startLayout();
		    tableview.setData(rows);
		    tableview.finishLayout();
		}
		
		self.add(tableview);
	}
	
	return self;
};

module.exports = ApplicationWindow;