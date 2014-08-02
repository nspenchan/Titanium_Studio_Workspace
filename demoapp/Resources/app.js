// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

require('lib/db').createDatabase();
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

var tab1 = Titanium.UI.createTab({  
    icon:"assets/images/light_home@2x.png",
    title:String.format(L('Tab_'), '1'),
    window:win1
});

var tab2 = Titanium.UI.createTab({  
    icon:"assets/images/light_search@2x.png",
    title:String.format(L('Tab_'), '2'),
    window:win2
});

var tab3 = Titanium.UI.createTab({  
    icon:"assets/images/light_flag@2x.png",
    title:String.format(L('Tab_'), '3'),
    window:win3
});

var tab4 = Titanium.UI.createTab({  
    icon:"assets/images/light_arrow-closed@2x.png",
    title:String.format(L('Tab_'), '4'),
    window:win4
});

var tab5 = Titanium.UI.createTab({  
    icon:"assets/images/light_gear@2x.png",
    title:String.format(L('Tab_'), '5'),
    window:win5
});
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
