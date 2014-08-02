
//グローバル・オブジェクト
var g = {};

require('lib/update').update
();
require('lib/properties').setProperties();
require('lib/db').createDatabase();
g.sound = require('lib/sound').createBgm('assets/sound/bgm01.mp3');

//グローバル・オブジェクトにセット
g.tabGroup = require('ui/index').createTabGroup();

// open tab group
g.tabGroup.open();

