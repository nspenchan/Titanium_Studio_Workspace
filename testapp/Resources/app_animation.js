
// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var win1 = Titanium.UI.createWindow({  
    title:'Window 1',
    backgroundColor:'#fff'
});


/*
var view = Titanium.UI.createView({
   backgroundColor:'red'
});
// イベントリスナに登録するため、変数化している。
// 実際にはJSON形式で渡す省略記法もある（後述）
var animation = Titanium.UI.createAnimation();
animation.backgroundColor = 'black';
animation.duration = 10000;
animation.addEventListener('complete',function(){
    //animation.removeEventListener('complete',this);
    animation.backgroundColor = 'orange';
    view.animate(animation);
});
// Viewに対してアニメーションを指示している。
view.animate(animation);
win1.add(view);

// 枠線によって円形にしているViewを配置し、
// これに対するアニメーションを指示する、というものです。
var circle = Titanium.UI.createView({
    height:100,
    width:100,
    borderRadius:50,
    backgroundColor:'#336699',
    top:10
});

//
// ここではTitanium.UI.Animationではなく、JSON形式で直接指示している。
//
// STEP 1. 中心座標(100, 100)に移動
circle.animate({center:{x:100,y:100},curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,duration:1000}, function(){
    // STEP 2. 中心座標(0, 200)に移動
    circle.animate({center:{x:0,y:200},duration:1000}, function(){
        // STEP 3. 中心座標(300, 300)に移動
        circle.animate({center:{x:300,y:300},duration:1000},function(){
            // STEP 4. 元の位置である中心座標(150, 60)に戻る
            circle.animate({center:{x:150,y:60, duration:1000}});
        });
    });
});
win1.add(circle);
*/
/*
var view = Titanium.UI.createView({
	backgroundColor:'red'
});

var button = Titanium.UI.createButton({
    title:'Animate Me', 
    width:300,
    height:40,
    top:10
});
button.addEventListener('click', function(){
    win1.animate({
    		view: view,
        //transition:Ti.UI.iPhone.AnimationStyle.CURL_UP,
    		transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT,
    });
});

view.add(button);
win1.add(view);
*/
/*
// 画像を表示したviewを変形させます
var cloud = Titanium.UI.createView({
    backgroundImage:'cloud.png',
    height:178,
    width:261,
    top:10
});
var button = Titanium.UI.createButton({
    title:'Animate',
    width:200,
    height:40,
    bottom:20
});

button.addEventListener('click', function(){
    // 先ほどの画像を変形アニメーションします。
    var t = Ti.UI.create2DMatrix();
    t = t.rotate(20);
    t = t.scale(1.5);

    var animation = Titanium.UI.createAnimation();
    animation.transform = t;
    animation.duration = 3000;
    animation.autoreverse = true;
    animation.repeat = 3;

    // 上記の設定は以下のようなものです。
    // ----------------------------------
    // 「全体的に20度右回転(t.rotate)し、1.5倍に拡大(t.scale)する」変形(transform)を
    // 3000ミリ秒(duration)かけて行い、その後同じ時間かけて元に戻す(autoreverse)
    // 処理を3回繰り返す(repeat)
    cloud.animate(animation);
});
win1.add(cloud);
win1.add(button);
*/
/*
var v = Titanium.UI.createView({
    backgroundColor:'#336699',
    top:10,
    left:220,
    height:50,
    width:50,
    anchorPoint:{x:0,y:0}
});
var t = Ti.UI.create2DMatrix();
t = t.rotate(90);

var a = Titanium.UI.createAnimation();
a.transform = t;
a.duration = 1000;
a.autoreverse = true;


var button = Titanium.UI.createButton({
    title:'Animate',
    width:200,
    height:40,
    bottom:20
});

button.addEventListener('click', function(){
	v.animate(a);
});
win1.add(button);
win1.add(v);
*/

var matrix0 = Titanium.UI.create2DMatrix().scale(0.5);
 
// 0倍の大きさで初期化したWindowを生成します。
var view = Titanium.UI.createView({
    //backgroundColor:'#336699',
    backgroundImage:'cloud.png',
    //borderWidth:8,
    //borderColor:'#999',
    height:178,
    width:261,
    //borderRadius:10,
    //opacity:0.92,
    transform:matrix0
});
 
// 通常のサイズ(1×1)にへの変形指定をします。
var matrix1 = Ti.UI.create2DMatrix();
matrix1 = matrix1.rotate(180);
matrix1 = matrix1.scale(2, 2);
 
var a = Titanium.UI.createAnimation({
	transform: matrix1,
	duration: 2000,
	repeat:3
});
// 通常サイズへのアニメーションします。
a.addEventListener('complete', function(){
    // 実際のサイズに戻すためには次のような手順もあります。
    var matrix2 = Titanium.UI.create2DMatrix();
    view.animate({transform:matrix2, duration:2000});
});

var button = Titanium.UI.createButton({
    title:'Animate',
    width:200,
    height:40,
    bottom:20
});

button.addEventListener('click', function(){
	view.animate(a);
});

win1.add(view);
win1.add(button);

win1.open();
