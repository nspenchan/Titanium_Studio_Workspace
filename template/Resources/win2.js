(function(){
    // 名前空間をさらに機能ごとに分割する
    // 今回はUIを作成するための機能を集約しているので ui と命名した
    myapp.win2 = {};
    
    // ファクトリメソッド
    // アプリケーションを起動させるために必要なタブグループやウインドウを生成する
    myapp.win2.createWindow = function(){
        var win2 = Ti.UI.createWindow({
            backgroundColor: 'yellow'
        });
        
        //var tableview2 = myapp.win2.createTableView2('yellow', 'win2');
        
        var imageview2 = myapp.win2.createImageView2('photo02.jpg');
        
        var label2 = myapp.win2.createLabel2(words[1]);
        
        //win2.add(tableview2);
        
        win2.add(imageview2);
        
        win2.add(label2);
        
        return win2;
    };
    
    myapp.win2.createImageView2 = function(/* string */ _photo){
        
        var imageview2 = Ti.UI.createImageView({
            image: 'myapp/images/' + _photo,
            height: 300,
            top: 0
        });
        
        imageview2.addEventListener('click', function(e){
            win1.open();// ウィンドウ２を開く
            win2.close();   
        });
        
        return imageview2;
    };
    
    myapp.win2.createLabel2 = function(/* string */ _word){
        
        var label2 = Ti.UI.createLabel({
            text: _word,
            width: 320,
            height: 'auto',
            bottom: 0,
            backgroundColor: '#fff',
            color:'#000',
            font:{fontSize: 24},
            textAlign:'center'  
        });
        
        return label2;
    };
    
    myapp.win2.createTableView2 = function(/* string */ _color, /* string */ _title, /* string */ _text){
        
        var tableview2 = Ti.UI.createTableView();
        
        Ti.include("myapp/ui/row2.js");
        
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
            win3.open();// ウィンドウ２を開く
            win2.close();
        });
        
        var row2 = Ti.UI.createTableViewRow({
            backgroundColor:'#fff',
            height: 'auto',
        });
        
        row2.add(button);
        rows.push(row2);
        */
        
        tableview2.startLayout();
        tableview2.setData(rows);
        tableview2.finishLayout();

        return tableview2;
    };
})();