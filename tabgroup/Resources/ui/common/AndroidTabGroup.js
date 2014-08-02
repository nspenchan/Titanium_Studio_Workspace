//ui/common/AndroidTabGroup.js
function createTab(window){
  var self, windows, i, len;
  self = new Object();
  windows = new Array();
  windows.push(window);
 
  self.init = function(){
    windows[0].open();
    windows[0].visible = true;
  };
 
  self.show = function(){
    len = windows.length - 1;
    if(windows[len].visible !== true){
      windows[len].open();
      windows[len].visible = true;
    }
    for(i = 0, len = windows.length; i < len; i++){
      windows[i].show();
    }
  };
 
  self.hide = function(){
    for(i = 0, len = windows.length; i < len; i++){
      windows[i].hide();
    }
  };
 
  self.open = function(new_window){
    windows.push(new_window);
    new_window.open();
  };
  return self;
}
 
function createTabGroup(){
  var tabs, i, len;
  tabs = [];
  this.open = function(){
    for(i = 1, len = tabs.length; i < len; i++){
      tabs[i].hide();
    }
    tabs[0].init();
  };
  this.addTab = function(tab){
    tabs.push(tab);
  };
  this.setActiveTab = function(obj){
    var fn;
    if(typeof(obj) != 'number' && typeof(obj) != 'string'){
      fn = function(index, arg){
        return obj === arg;
      };
    }else{
      fn = function(index, arg){
        return obj === index;
      };
    }
    for(i = 0, len = tabs.length; i < len; i++){
      if(fn(tabs[i] === true)){
        tabs[i].show();
      }else{
        tabs[i].hide();
      }
    }
  };
}
 
function AndroidTabGroup(Window){
  var tabs, tab1, tab2, window1, window2, i, len, tabGroup;
  window1 = new Window(L("home"), 1, tabGroup);
  window2 = new Window(L("settings"), 0, tabGroup);
 
  tab1 = new createTab(window1);
  tab2 = new createTab(window2);
  window1.containingTab = tab1;
  window2.containingTab = tab2;
 
  tabGroup = new createTabGroup();
  tabGroup.addTab(tab1);
  tabGroup.addTab(tab2);
  return tabGroup;
}
 
module.exports = AndroidTabGroup;