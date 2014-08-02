// アプリケーションの名前空間を定義する
// 名前が長いとコーディングしづらくなるので、2文字〜3文字程度の名前を定義する
var app = {};

// アプリケーションを構築するために必要なJavaScriptファイルをすべて読み込む
Ti.include("app/ui/ui.js");

// アプリケーションを起動するためのタブグループやウインドウを生成するファクトリメソッドを呼び出してオープンする
var tabGroup = app.ui.createApplicationTabGroup();
tabGroup.open();