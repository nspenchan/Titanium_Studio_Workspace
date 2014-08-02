(function(){
    // 名前空間をさらに機能ごとに分割する
    // 今回はUIを作成するための機能を集約しているので ui と命名した
    myapp.win1 = {};
    
    // ファクトリメソッド
    // アプリケーションを起動させるために必要なタブグループやウインドウを生成する
    myapp.win1.createWindow = function(){
        var win1 = Ti.UI.createWindow({
            backgroundColor: 'blue'
        });
        
        //var tableview1 = myapp.win1.createTableView1('blue', 'win1');
        
        var imageview1 = myapp.win1.createImageView1('photo01.jpg');
        
        var label1 = myapp.win1.createLabel1(words[0]);
        
        //win1.add(tableview1);
        
        win1.add(imageview1);
        
        win1.add(label1);
        
        return win1;
    };
    
    myapp.win1.createImageView1 = function(/* string */ _photo){
        
        var imageview1 = Ti.UI.createImageView({
            image: 'myapp/images/' + _photo,
            height: 300,
            top: 0
        });
        
        imageview1.addEventListener('click', function(e){
            win2.open();// ウィンドウ２を開く
            win1.close();   
        });
        
        return imageview1;
    };
    
    myapp.win1.createLabel1 = function(/* string */ _word){
        
        var label1 = Ti.UI.createLabel({
            text: _word,
            width: 320,
            height: 'auto',
            bottom: 0,
            backgroundColor: '#fff',
            color:'#000',
            font:{fontSize: 24},
            textAlign:'center'  
        });
        
        return label1;
    };
    
    myapp.win1.createTableView1 = function(/* string */ _color, /* string */ _title, /* string */ _text){
        
        var tableview1 = Ti.UI.createTableView();
        
        Ti.include("myapp/ui/row1.js");
        
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
            win2.open();// ウィンドウ２を開く
            win1.close();
        });
        
        var row2 = Ti.UI.createTableViewRow({
            backgroundColor:'#fff',
            height: 'auto',
        });
        
        row2.add(button);
        rows.push(row2);
        */
        tableview1.startLayout();
        tableview1.setData(rows);
        tableview1.finishLayout();

        return tableview1;
    };
})();