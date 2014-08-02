var args = arguments[0] || {};　　// index.jsから引数を受け取る

$.row.backgroundColor = args.bgcolor ? "faf8f5": "#eee4db";  // 背景色指定

$.title.text = "Menu" + args.id;  // タイトル指定

$.image.image = "/image" + args.id + ".jpg"; // 画像指定