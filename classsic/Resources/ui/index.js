exports.createTabGroup = function(){
	// this sets the background color of the master UIView (when there are no windows/tab groups on it)
	Titanium.UI.setBackgroundColor('#000');
	
	// create tab group
	var tabGroup = Titanium.UI.createTabGroup();

	//
	// create base UI tab and window
	//
	g.win1 = require('ui/win1').createWin1('Tab 1', 'blue', 0, 'Sound ON', 'Next', 4, 1);

	g.win2 = require('ui/win2').createWin2('Tab 2', 'yellow', 0, 'Back', 'Next', 0, 2);
	
	g.win3 = require('ui/win3').createWin3('Tab 3', 'red', 0, 'Back', 'Next', 1, 3);

	g.win4 = require('ui/win4').createWin4('Tab 4', 'orange', 0, 'Back', 'Next', 2, 4);

	g.win5 = require('ui/win5').createWin5('Tab 5', 'green', 0, 'Back', 'Next', 3, 0);

	var tab1 = require('ui/ui').createTab('assets/images/light_home@2x.png', 'Tab 1', g.win1);
	
	var tab2 = require('ui/ui').createTab('assets/images/light_info@2x.png', 'Tab 2', g.win2);
	
	var tab3 = require('ui/ui').createTab('assets/images/light_book@2x.png', 'Tab 3', g.win3);
	
	var tab4 = require('ui/ui').createTab('assets/images/light_cart@2x.png', 'Tab 4', g.win4);
	
	var tab5 = require('ui/ui').createTab('assets/images/light_gear@2x.png', 'Tab 5', g.win5);

	//
	//  add tabs
	//
	tabGroup.addTab(tab1);  
	tabGroup.addTab(tab2);
	tabGroup.addTab(tab3);  
	tabGroup.addTab(tab4);
	tabGroup.addTab(tab5);  
	
	return tabGroup;
};