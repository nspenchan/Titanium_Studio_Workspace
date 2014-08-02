exports.createWin5 = function(){
	var win5 = require('/ui/ui').createWindow('Tab 5', 'orange');
	
	var b1 = Titanium.UI.createButton({title:'Back'});
	var b2 = Titanium.UI.createButton({title:'Next'});
	win5.LeftNavButton = b1;
	win5.RightNavButton = b2;
		
	b1.addEventListener('click', function(){
		tabGroup.activeTab = tabGroup.tabs[3];
	});
	b2.addEventListener('click', function(e){
	   tabGroup.activeTab = tabGroup.tabs[0];
	});	
	
	//tableView
	var rows = [
	    {title:'Row 1', hasChild:true},
	    {title:'Row 2', hasDetail:true},
	    {title:'Row 3', hasCheck:true},
	    {title:'Row 4'}
	];
	
	var rows1 = require('lib/db').makeRows1();
	
	var rows0 = rows.concat(rows1);
	
	var rows2 = require('lib/db').makeRows2();
	
	var rows00 = rows0.concat(rows2);

	var tableview = Titanium.UI.createTableView({top: 0});
	
	tableview.addEventListener('click', function(e){
		//eventオブジェクト
		/*
	    var index     = e.index; 
	    alert('index: ' + index);
	    var section  = e.section; 
	    alert('section: ' + JSON.stringify(section));
	    var row       = e.row; 
	    alert('row: ' + JSON.stringify(row));
	    var rowdata = e.rowData; 
	    alert('rowdata: ' + JSON.stringify(rowdata));
	    */
	   //Tab番号の取得
	    var num = e.row.num; //alert(num);
	    if(num || num==0){//0は偽と判定されるので
	    		tabGroup.activeTab = tabGroup.tabs[num];
	    }
	});
	
    tableview.startLayout();
    tableview.setData(rows00);
    tableview.finishLayout();
	
	win5.add(tableview);
	
	return win5;
};