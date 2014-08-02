(function(){
	// 名前空間をさらに機能ごとに分割する
	// 今回はUIを作成するための機能を集約しているので ui と命名した
	myapp.row = {};
	
	// ファクトリメソッド
	// アプリケーションを起動させるために必要なタブグループやウインドウを生成する
	myapp.row.createTableViewRow = function(/* string */ _color, /* string */ _title, /* string */ _text){
	    var rows = [];
        
        var row1 = Ti.UI.createTableViewRow({
            backgroundColor:_color,
            title: _title,
            height: 'auto',
        });
        
        rows.push(row1);
        
        var button = Ti.UI.createButton({
            title: 'Open Win3',
            top: 5,
            bottom: 5,
            width: 200,
            height: 70
        });
        
        button.addEventListener('click', function(e){
            win3.open();// ウィンドウ２を開く
            win2.close();
        });
        
        var row2 = Ti.UI.createTableViewRow({
            backgroundColor:'#fff',
            height: 'auto',
        });
        
        row2.add(button);
        rows.push(row2);
		
		return rows;
	};
})();