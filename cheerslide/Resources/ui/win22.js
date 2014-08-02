function ApplicationWindow(title, wRatio, tableview) {
	//alert(count1);
	//counter for APP property
	var count1 = 0;
	if(Ti.App.Properties.getInt("intialization")==1 && count1==0){
		alert(L('Step_') + '2:\n' + L('Eight_words'));
	}
	
	var db1 = Titanium.Database.open(Ti.App.Properties.getString('project'));
	
	var rows_db = db1.execute('SELECT * FROM WORDS');
	
	var last_id = 0;
	while(rows_db.isValidRow()){
		last_id = rows_db.field(0);
		rows_db.next();
	}
	rows_db.close();
	db1.close();
	
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'blue'
	});
	//3.1.2
	self.showNavBar();
	//if(Ti.Platform.osname!='andriod'){self.hideTabBar();}
	
	var view = Titanium.UI.createImageView({
	    width:320,
	    height:568,
	    top:0,
	    left:0,
	});
	
	if(wRatio<1.6){
		var top = -30;
	}else{
		var top = 0;
	}
	
	var imageView = Titanium.UI.createImageView({
	    image: '/assets/images/splash.png',
	    width: 320,
	    height :568,
	    top:top,
	    left:0,
	    opacity:0.9,
	});
	view.add(imageView);
	
	var label = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'white',
		text:L('Enter_your_favorite_words'),
		font:{fontSize:20,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:300,
		height:'auto',
		top:200,
		right:10,
		opacity:0.7,
	});
	view.add(label);
	
	self.add(view);
	/*
	var b2 = Titanium.UI.createButton({title:L('Add')});
	self.RightNavButton = b2;
	
	b2.addEventListener('click', function(e){
		
	});
	*/
	ta();
	
	//textArea
	function ta(){
		var ta1 = Titanium.UI.createTextArea({
	        //value:L('Input_your_favorite_words'),
	        height:70,
	        width:300,
	        top:60,
	        font:{fontSize:20,fontFamily:'Marker Felt', fontWeight:'bold'},
	        color:'#888',
	        textAlign:'left',
	        appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,       
	        keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
	        returnKeyType:Titanium.UI.RETURNKEY_DONE,
	        borderWidth:2,
	        borderColor:'#bbb',
	        borderRadius:5
		});
		
		ta1.addEventListener('return',function(e){
	    		last_id++;
	    		Ti.API.info(last_id);
	    		var db1 = Titanium.Database.open(Ti.App.Properties.getString('project'));
	    		db1.execute("INSERT INTO WORDS (ID, WORD, NUMBER) VALUES (" + last_id + ", '" + e.value + "', " + e.value.length + ")");
	    		db1.close();
	    		self.remove(ta1);
	    		ta();
	    		alert(L('Add_words') + '\n' + e.value);
	    		//intialization process
	    		count1++;
			if(Ti.App.Properties.getInt("intialization")==1 && count1==1){
				alert(L('When_add_words'));
				Ti.App.Properties.setInt("intialization", 2);
				var section = tableview.data[0];
				section.rows[2].backgroundColor = 'black';
				section.rows[3].backgroundColor = 'black';
				//self.close();続けて入力してよい
			}
		});
		
		self.add(ta1);
	}
	
	return self;
};

module.exports = ApplicationWindow;