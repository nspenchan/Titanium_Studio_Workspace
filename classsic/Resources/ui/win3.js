exports.createWin3 = function(_title, _backgroundColor, _top, _b1_title, _b2_title, _num1, _num2){
	var win3 = require('/ui/ui').createWindow(_title, _backgroundColor, _top);
	
	var ad = require('/lib/admob').createAdmob();
	win3.add(ad);
	
	if (Titanium.Platform.osname !== 'android') {
		var b1 = Titanium.UI.createButton({title:_b1_title});
		var b2 = Titanium.UI.createButton({title:_b2_title});
		win3.LeftNavButton = b1;
		win3.RightNavButton = b2;
		var top = 50;
	}else{
		var b1 = require('ui/ui').createButton('#000', '#fff', 'Back', 16, 'center', 'auto', 'auto');
		b1.bottom = 9;
		b1.left = 10;
		var b2 = require('ui/ui').createButton('#000', '#fff', 'Next', 16, 'center', 'auto', 'auto');
		b2.bottom = 9;
		b2.right = 10;
		var top = 75;
	}
	
	b1.addEventListener('click', function(e){
	   g.tabGroup.activeTab = g.tabGroup.tabs[_num1];
	});
	b2.addEventListener('click', function(e){
	   g.tabGroup.activeTab = g.tabGroup.tabs[_num2];
	});
	/*
	var rows = [
	    {title:'Row 1', hasChild:true},
	    {title:'Row 2', hasDetail:true},
	    {title:'Row 3', hasCheck:true},
	    {title:'Row 4'}
	];
	*/
	
	g.rows = [];
	
	var row = require('/ui/ui').createTableViewRow('TableView', '#fff', 'auto', false);
	g.rows.push(row);
	/*
	var array1 = ['win1', 'win2', 'win3', 'win4', 'win5'];
	var array2 = ['blue', 'yellow', 'red', 'orange', 'green'];

	for(var i=0; i<array1.length; i++){
		var row = require('/ui/ui').createTableViewRow(array1[i], array2[i], 'auto', true);
		row.num = i;//異動先のタブ番号を表す（自作のプロパティ
		row.selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE; //クリック時に色反転
		g.rows.push(row);
	}
	*/
	require('lib/db').makeRows();
	//require('lib/db').makeRows1();
	
	var tableview = Titanium.UI.createTableView({top: top});
	
	tableview.addEventListener('click', function(e){
		
	    //var index     = e.index; alert('index: ' + index);
	    //var section  = e.section; alert('section: ' + JSON.stringify(section));
	    var row       = e.row; //alert('row: ' + JSON.stringify(row));
	    //var rowdata = e.rowData; alert('rowdata: ' + JSON.stringify(rowdata));
	    var num = row.num; //alert(num);
	    if(num || num==0){//0は偽と判定されるので
	    		g.tabGroup.activeTab = g.tabGroup.tabs[num];
	    }
	});
	
    tableview.startLayout();
    tableview.setData(g.rows);
    tableview.finishLayout();
	
	win3.add(tableview);
	
	if (Titanium.Platform.osname === 'android') {
		win3.add(b1);
		win3.add(b2);
	}

	/*
	var label = require('ui/ui').createLabel('#999', 'transparent', 'I am Window 3', 20, 'center');
	
	var button = require('ui/ui').createButton('#000', '#fff', 'Open Window 4', 16, 'center', 200, 50, 50);
	
	button.addEventListener('click', function(e){
	    //win1.open();// ウィンドウ２を開く
	    //win2.close();
	    g.tabGroup.activeTab = g.tabGroup.tabs[3];
	});
	
	win3.add(label);
	win3.add(button);
	*/
	//hide tabbar
	//if (Titanium.Platform.osname !== 'android') {win3.hideTabBar();}
	
	return win3;
};