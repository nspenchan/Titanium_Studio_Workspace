// アプリケーションの名前空間を定義する
// 名前が長いとコーディングしづらくなるので、2文字〜3文字程度の名前を定義する
var app = {};

// アプリケーションを構築するために必要なJavaScriptファイルをすべて読み込む
Ti.include(
	"app/util.js",
	"app/ui/ui.js",
	"app/model/photo.js"
);

// アプリケーションを起動するためのタブグループやウインドウを生成するメソッドを呼び出してオープンする
var tabGroup = app.ui.createApplicationTabGroup();
tabGroup.open();