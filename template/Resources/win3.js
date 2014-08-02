(function(){
    // 名前空間をさらに機能ごとに分割する
    // 今回はUIを作成するための機能を集約しているので ui と命名した
    myapp.win3 = {};
    
    // ファクトリメソッド
    // アプリケーションを起動させるために必要なタブグループやウインドウを生成する
    myapp.win3.createWindow = function(){
        var win3 = Ti.UI.createWindow({
            backgroundColor: 'red'
        });
        
        var tableview3 = myapp.win3.createTableView3('red', 'win3');
        
        win3.add(tableview3);
        
        return win3;
    };
    
    myapp.win3.createTableView3 = function(/* string */ _color, /* string */ _title, /* string */ _text){
        
        var tableview3 = Ti.UI.createTableView();
        
        Ti.include("myapp/ui/row3.js");
        
        var rows = myapp.row.createTableViewRow(/* string */ _color, /* string */ _title, /* string */ _text);
        
        /*
        var rows = [];
        
        var row1 = Ti.UI.createTableViewRow({
            backgroundColor:_color,
            title: _title,
            height: 'auto',
        });
        
        rows.push(row1);
        
        var button = Ti.UI.createButton({
            title: 'Open Win2',
            top: 5,
            bottom: 5,
            width: 200,
            height: 70
        });
        
        button.addEventListener('click', function(e){
            win1.open();// ウィンドウ２を開く
            win3.close();
        });
        
        var row2 = Ti.UI.createTableViewRow({
            backgroundColor:'#fff',
            height: 'auto',
        });
        
        row2.add(button);
        rows.push(row2);
        */
        
        tableview3.startLayout();
        tableview3.setData(rows);
        tableview3.finishLayout();

        return tableview3;
    };
})();