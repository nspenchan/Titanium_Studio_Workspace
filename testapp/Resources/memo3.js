//add to ui/win11.js
exports.createWin11 = function(){
	var win11 = require('/ui/ui').createWindow('', 'pink');
	
	var b1 = require('ui/ui').createButton('#000', '#fff', 'Back to Win1', 12, 'center', 'auto', 32, 9, 10);
	var b2 = require('ui/ui').createButton('#000', '#fff', 'Next', 12, 'center', 'auto', 32, 9);
	b2.right = 10;
	
	b1.addEventListener('click', function(e){
	    //Back to win1.js
	    win11.close();
	});
	b2.addEventListener('click', function(e){
	    //move to win12.js
		win12 = require('ui/win12').createWin12('', 'cyan');
		win12.open();
		win11.close();

	});

	var label = require('ui/ui').createLabel('#999', 'transparent', 'I am Window 11', 20, 'center');
	
	var button = require('ui/ui').createButton('#000', '#fff', 'Open Window 12', 16, 'center', 200, 50, 50);
	
	button.addEventListener('click', function(e){
	    //move to win12
		win12 = require('ui/win12').createWin12('', 'cyan');
		win12.open();
		win11.close();
	});
	
	win11.add(label);
	win11.add(button);

	win11.add(b1);
	win11.add(b2);
	
	return win11;
};

//add tio ui/win12.js
exports.createWin12 = function(){

	var win12 = require('/ui/ui').createWindow('', 'cyan');
	
	var b1 = require('ui/ui').createButton('#000', '#fff', 'Back to win1', 12, 'center', 'auto', 32, 9, 10);
	var b2 = require('ui/ui').createButton('#000', '#fff', 'Next', 12, 'center', 'auto', 32, 9);
	b2.right = 10;
	
	b1.addEventListener('click', function(e){
	    //back to win1
	    win12.close();
	});
	b2.addEventListener('click', function(e){
	    //move to win11
		win11 = require('ui/win11').createWin11('', 'pink');
		win11.open();
		win12.close();
	});
	
	var label = require('ui/ui').createLabel('#999', 'transparent', 'I am Window 12', 20, 'center');
	
	var button = require('ui/ui').createButton('#000', '#fff', 'Open Window 11', 16, 'center', 200, 50, 50);
	
	button.addEventListener('click', function(e){
	    //move to win11
		win11 = require('ui/win11').createWin11('', 'pink');
		win11.open();
		win12.close();
	});
	
	win12.add(label);
	win12.add(button);
	
	win12.add(b1);
	win12.add(b2);
	
	return win12;
};

//add tio win1.js
	   win11 = require('ui/win11').createWin11('', 'pink');
	   win11.open();