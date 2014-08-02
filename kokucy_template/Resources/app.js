// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

require('lib/properties').setProperties();
require('lib/db').createDatabase();
require('lib/update').update();

var bgm = require('lib/sound').createBgm('assets/sound/bgm01.mp3');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

//
// create base UI tab and root window
//
var win1 = require('ui/win1').createWin1();

var win2 = require('ui/win2').createWin2();

var win3 = require('ui/win3').createWin3();

var win4 = require('ui/win4').createWin4();

var win5 = require('ui/win5').createWin5();

var tab1 = require('ui/ui').createTab('assets/images/light_home@2x.png', 'Tab 1', win1);

var tab2 = require('ui/ui').createTab('assets/images/light_info@2x.png', 'Tab 2', win2);

var tab3 = require('ui/ui').createTab('assets/images/light_book@2x.png', 'Tab 3', win3);

var tab4 = require('ui/ui').createTab('assets/images/light_cart@2x.png', 'Tab 4', win4);

var tab5 = require('ui/ui').createTab('assets/images/light_gear@2x.png', 'Tab 5', win5);

//
//  add tabs
//
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);
tabGroup.addTab(tab5);


// open tab group
tabGroup.open();
