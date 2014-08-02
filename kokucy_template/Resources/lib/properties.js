exports.setProperties = function(){
	if (!Ti.App.Properties.hasProperty('currentVer')) {
		//初回起動時のみ、実行される　アプリケーション・プロパティを設定
		alert('Application Properties wer set');
		Ti.App.Properties.setInt('currentVer', 100);
		Ti.App.Properties.setInt('setDatabase', 0); //データベース作成を管理する
		
		
	}
};