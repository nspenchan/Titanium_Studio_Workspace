exports.createWin1 = function(){
	var win1 = Titanium.UI.createWindow({  
	    title:String.format(L('Tab_'), '1'),
	    backgroundColor:'blue'
	});
	
	var label1 = Titanium.UI.createLabel({
		color:'#999',
		text:String.format(L('I_am_Window_'), '1'),
		font:{fontSize:20,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:'auto'
	});
	
	win1.add(label1);
	
	//ボタンの作成
	var button1 = Titanium.UI.createButton({
	    backgroundColor: 'white',
		title: String.format(L('Open_Window_'), '2'),
		width: 200,
		height: 50,
		top: 50
	});
	//イベントリスナー
	button1.addEventListener('click', function(){
		// タブの切り替え
	   tabGroup.activeTab = tabGroup.tabs[1];
	});
	
	win1.add(button1);
	
	var b1 = Titanium.UI.createButton({title:L('Back')});
	var b2 = Titanium.UI.createButton({title:L('Next')});
	win1.LeftNavButton = b1;
	win1.RightNavButton = b2;
		
	b1.addEventListener('click', function(){
		tabGroup.activeTab = tabGroup.tabs[4];
	});
	b2.addEventListener('click', function(e){
	   tabGroup.activeTab = tabGroup.tabs[1];
	});	

	
	return win1;
};