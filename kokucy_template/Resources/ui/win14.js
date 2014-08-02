exports.createWin14 = function(turn, pointViewLabel){
	var db1 = Titanium.Database.open('photo');
	
	pointViewLabel.text = 'FOCUS x 1.5 / 0°';
	pointViewLabel.color = 'red';

	var win14 = require('/ui/ui').createWindow('', 'blue');
	Titanium.UI.iPhone.hideStatusBar();

	var b1 = require('ui/ui').createButton('#000', '#fff', L('Back'), 12, 'center', 'auto', 32, 9, 10);
	//var b2 = require('ui/ui').createButton('#000', '#fff', 'Next', 12, 'center', 'auto', 32, 9);
	//b2.right = 10;
	
	b1.addEventListener('click', function(e){
	    //back to win1
	    db1.close();
	    win14.close();
	});
	/*
	b2.addEventListener('click', function(e){
	    //move to win11
		win11 = require('ui/win11').createWin11('', 'pink');
		win11.open();
		win14.close();
	});
	*/
	
	var label = Ti.UI.createLabel({top:50});
	
	var picker = Ti.UI.createPicker();
	
	var array1 = [
		['x 1', 1],
		['x 1.1', 1.1],
		['x 1.2', 1.2],
		['x 1.5', 1.5],
		['x 2', 2],
		['x 5', 5],
		['x 10', 10],
	];
	
	var array2 = [
		['-180°', -180],
		['-60°', -60],
		['-20°', -20],
		['-10°', -10],
		['-5°', -5],
		['-2°', -2],
		['-1°', -1],
		['0°', 0],
		['1°', 1],
		['2°', 2],
		['5°', 5],
		['10°', 10],
		['20°', 20],
		['60°', 60],
		['180°', 180],
	];
	 
	var column1 = Ti.UI.createPickerColumn();
	for(var i=0; i<7; i++){
		column1.addRow(Ti.UI.createPickerRow({title:array1[i][0],custom_item:array1[i][1]}));
	}
	 
	var column2 = Ti.UI.createPickerColumn();
	for(var i=0; i<15; i++){
		column2.addRow(Ti.UI.createPickerRow({title:array2[i][0],custom_item:array2[i][1]}));
	}
	 
	// それぞれの列定義を配列として渡します。
	picker.add([column1,column2]);
	 
	// 選択状況表示を有効にします
	picker.selectionIndicator = true;
	
	Ti.API.info(JSON.stringify(picker));

	setTimeout(function() {
	    picker.setSelectedRow(0, 3);
	    picker.setSelectedRow(1, 7);
	}, 100);
	
	// 選択状況が変わったときのイベントです
	picker.addEventListener('change',function(e){
	    // e.rowとe.columnに選択された行列が返ります。
	    // e.rowIndex, e.columnIndexには選択された行列のindexが返ります。
	    // 上記の例ではcolumn1の各rowにcustom_itemプロパティを付随させているので、
	    // e.row.custom_itemでそれらのデータも取得できます。
	    Ti.API.info("You selected row: "+e.row+", column: "+e.column+", custom_item: "+e.row.custom_item);
	    label.text = "row index: "+e.rowIndex+", column index: "+e.columnIndex;
	    if(e.columnIndex ==0){
	    		var update = 'UPDATE PROJECT_1 SET ZOOM = ' + e.row.custom_item + ' WHERE ID = ' +  turn;
        		db1.execute(update);
	    }else{
	    		var update = 'UPDATE PROJECT_1 SET ANGLE = ' + e.row.custom_item + ' WHERE ID = ' +  turn;
        		db1.execute(update);
	    }
    		var select = 'SELECT ZOOM, ANGLE FROM PROJECT_1 WHERE ID = ' +  turn;
    		var rows = db1.execute(select);
    		
		pointViewLabel.text = 'FOCUS x ' + rows.fieldByName('ZOOM') + ' / ' + rows.fieldByName('ANGLE') + '°';
		//alert(labelText);
		rows.close();
	});
	
	win14.add(picker);
	win14.add(label);
	/*
	var button = require('ui/ui').createButton('#000', '#fff', 'OK', 16, 'center', 200, 40);
	button.bottom = 20;
	
	button.addEventListener('click', function(){
		db1.close();
		win14.close();
	});
	
	win14.add(button);
	*/
	win14.add(b1);
	//win14.add(b2);
	
	
	return win14;
};