function ApplicationWindow(title, parentWindow, wRatio, bgm00, label00, label1, label2, purchase, themesong) {
	//alert("intialization:" + Ti.App.Properties.getInt("intialization"));
	
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'blue'
	});
	//3.1.2
	self.showNavBar();
	var b1 = Titanium.UI.createButton({title:L('Back')});
	//var b2 = Titanium.UI.createButton({title:L('Next')});
	self.LeftNavButton = b1;
	//self.RightNavButton = b2;
		
	b1.addEventListener('click', function(){
		//Thema Song
		if(bgm00.playing==false && Ti.App.Properties.getBool('bgm')==true){
			bgm00.play();
			themesong.backgroundImage = 'assets/images/no_sound_x.png';
		}
		self.close();
	});
	
	var rows = [];
	var arrayTitle = ['Step_', 'Photo', 'Step_', 'Word', 'Step_', 'Music'];
	var arrayTitle2 = [1, '', 2, '', 3, ''];
	var arrayChild = [false, true, false, true,false, true];
	var arrayColor = ['blue', 'white', 'yellow', 'white', 'red', 'white'];
	var arrayLeft = ['non.png', 'Photo_+.png', 'non.png', 'Speech-Bubble_+.png', 'non.png', 'Music_+.png'];
	
	for(i=0; i<arrayTitle.length; i++){
		var row = Ti.UI.createTableViewRow({
		    height:'auto',
		    backgroundColor:arrayColor[i],
		    hasChild:arrayChild[i],
		});
		
		var leftImage = Titanium.UI.createImageView({
		    image: '/assets/images/' + arrayLeft[i],
		    left:0,
		});
		row.add(leftImage);
		
		var label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:L(arrayTitle[i]) + arrayTitle2[i],
			font:{fontSize:20,fontFamily:'Helvetica Neue'},
			textAlign:'left',
			width:240,
			height:'auto',
			top:10,
			bottom:10,
			left:60,
			//opacity:0.7,
		});
		row.add(label);
		
		rows.push(row);
	}
	var tableview = Titanium.UI.createTableView({top: 0});
	
	tableview.addEventListener('click', function(e){
		//eventオブジェクト
	    var index = e.index;
	    if(Ti.App.Properties.getInt("intialization")==0){
		    switch(index){
		    		case 0:
		    		case 1:
		    		var count1 = 0;
		    		var turn = '';
		    		var Window20 = require('ui/win20');
				var win20 = new Window20(L('Photo'), count1, turn, tableview);
		    		win20.open();
		    		break;
		    		
		    		case 2:
		    		case 3:
		    		case 4:
		    		case 5:
		    		alert(String.format(L('To_end_the_step_ahead'), '1'));
		    		break;
		    }
	    }else if(Ti.App.Properties.getInt("intialization")==1){
		    switch(index){
		    		case 2:
		    		case 3:
		    		var Window22 = require('ui/win22');
				var win22 = new Window22(L('Word'), wRatio, tableview);
			    	parentWindow.containingTab.open(win22);
		    		break;
		    		
		    		case 0:
		    		case 1:
		    		alert(String.format(L('Finished_step_'), '1'));
		    		//var al = String.format(L('replace_str'), 'Kevin');
		    		//alert(al);
		    		break;
		    		
		    		case 4:
		    		case 5:
		    		alert(String.format(L('To_end_the_step_ahead'), '1&2'));
		    		break;
	   	 	}
		}else if(Ti.App.Properties.getInt("intialization")==2){
		    switch(index){
		    		case 4:
		    		case 5:
		    		var Window24 = require('ui/win24');
				var win24 = new Window24(L('Music'), purchase, tableview, label00, label1, label2);
			    	win24.open();
		    		break;
		    		
		    		case 0:
		    		case 1:
		    		alert(String.format(L('Finished_step_'), '1'));
		    		break;
		    		
		    		case 2:
		    		case 3:
		    		alert(String.format(L('Finished_step_'), '2'));
		    		break;
		    }
		}else if(Ti.App.Properties.getInt("intialization")>=3){
			switch(index){
		    		case 0:
		    		case 1:
		    		case 2:
		    		case 3:
		    		case 4:
		    		case 5:
		    		break;
		    }
		}
	});
	
    tableview.startLayout();
    tableview.setData(rows);
    tableview.finishLayout();
	
	self.add(tableview);
	
	var section = tableview.data[0];
	
	if(Ti.App.Properties.getInt("intialization")==1){
		section.rows[0].backgroundColor = 'black';
		section.rows[1].backgroundColor = 'black';
	}else if(Ti.App.Properties.getInt("intialization")==2){
		section.rows[0].backgroundColor = 'black';
		section.rows[1].backgroundColor = 'black';
		section.rows[2].backgroundColor = 'black';
		section.rows[3].backgroundColor = 'black';
	}else if(Ti.App.Properties.getInt("intialization")==3){
		section.rows[0].backgroundColor = 'black';
		section.rows[1].backgroundColor = 'black';
		section.rows[2].backgroundColor = 'black';
		section.rows[3].backgroundColor = 'black';
		section.rows[4].backgroundColor = 'black';
		section.rows[5].backgroundColor = 'black';
	}
	
	return self;
};

module.exports = ApplicationWindow;