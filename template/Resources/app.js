/*
// アプリケーションの名前空間を定義する
// 名前が長いとコーディングしづらくなるので、2文字〜3文字程度の名前を定義する
var myapp = {};

// アプリケーションを構築するために必要なJavaScriptファイルをすべて読み込む
Ti.include("myapp/ui/ui.js");

// アプリケーションを起動するためのタブグループやウインドウを生成するファクトリメソッドを呼び出してオープンする
var tabGroup = myapp.ui.createApplicationTabGroup();
tabGroup.open();
*/
var myapp = {};

Ti.include("property.js");
Ti.include("win1.js");
Ti.include("win2.js");
Ti.include("win3.js");

var win1 = myapp.win1.createWindow();
var win2 = myapp.win2.createWindow();
var win3 = myapp.win3.createWindow();

win1.open();

/*
// ２つのwindowを作る
var win1 = Ti.UI.createWindow({
    backgroundColor: 'blue'
});

var win2 = Ti.UI.createWindow({
    backgroundColor: 'yellow'
});

var win3 = Ti.UI.createWindow({
    backgroundColor: 'red'
});

// ２つのviewを作る
var view1 = Ti.UI.createView();
var view2 = Ti.UI.createView();
var view3 = Ti.UI.createView();

// ２つのviewを作る
var tableview1 = Ti.UI.createTableView();
var tableview2 = Ti.UI.createTableView();
var tableview3 = Ti.UI.createTableView();

var rows1 = [];
var rows2 = [];
var rows3 = [];

var row11 = Ti.UI.createTableViewRow({
    backgroundColor:'blue',
    title: 'win1',
    height: 'auto',
});

rows1.push(row11);

var row21 = Ti.UI.createTableViewRow({
    backgroundColor:'yellow',
    title: 'win2',
    height: 'auto',
});

rows2.push(row21);

var row31 = Ti.UI.createTableViewRow({
    backgroundColor:'red',
    title: 'win3',
    height: 'auto',
});

rows3.push(row31);

// ウィンドウ１ -> ウィンドウ２へ行くための処理
var button1 = Ti.UI.createButton({
    title: 'Open Win2',
    top: 5,
    bottom: 5,
    width: 200,
    height: 70
});

button1.addEventListener('click', function(e){
    win2.open();// ウィンドウ２を開く
    win1.close();
});

var row12 = Ti.UI.createTableViewRow({
    backgroundColor:'#fff',
    height: 'auto',
});

row12.add(button1);
rows1.push(row12);

tableview1.startLayout();
tableview1.setData(rows1);
tableview1.finishLayout();

// ウィンドウ２ -> ウィンドウ１へ行くための処理
var button2 = Ti.UI.createButton({
    title: 'Open Win3',
    top: 5,
    bottom: 5,
    width: 200,
    height: 70
});

button2.addEventListener('click', function(e){
    //処理的にはウィンドウ２を閉じてウィンドウ１を表示させている
    win3.open();
    win2.close();
});

var row22 = Ti.UI.createTableViewRow({
    backgroundColor:'#fff',
    height: 'auto',
});

row22.add(button2);
rows2.push(row22);

tableview2.startLayout();
tableview2.setData(rows2);
tableview2.finishLayout();

// ウィンドウ２ -> ウィンドウ１へ行くための処理
var button3 = Ti.UI.createButton({
    title: 'Open Win1',
    top: 5,
    bottom: 5,
    width: 200,
    height: 70
});

button3.addEventListener('click', function(e){
    //処理的にはウィンドウ２を閉じてウィンドウ１を表示させている
    win1.open();
    win3.close();
});

var row32 = Ti.UI.createTableViewRow({
    backgroundColor:'#fff',
    height: 'auto',
});

row32.add(button3);
rows3.push(row32);

tableview3.startLayout();
tableview3.setData(rows3);
tableview3.finishLayout();

// viewにパーツ追加
view1.add(button1);
view2.add(button2);
view3.add(button3);

// windowにview追加
win1.add(tableview1);
win2.add(tableview2);
win3.add(tableview3);

win1.open();
*/