//針4本分の変数を宣言
var country1 = "T O K Y O";
var tcolor1 = "7";
var lag1 = 0;

var country2 = "HONOLULU";
var color2 = "1";
var lag2 = -19;

var country3 = "G M T";
var color3 = "2";
var lag3 = -9;

var country4 = "MELBOURNE";
var color4 = "5";
var lag4 = 2;

//適用ボタンが押されたタイミングで変数に値を格納してp-topへ移動
$(document).on("click", "#OK",function(e){
	
	country1 = $("input[name='area']").val();
	tcolor1 = $("input[name='color']:checked").val();
	lag1 = $("select[name='jisa']").val();
	
	country2 = $("input[name='area2']").val();
	color2 = $("input[name='color2']:checked").val();
	lag2 = $("select[name='jisa2']").val();
	
	country3 = $("input[name='area3']").val();
	color3 = $("input[name='color3']:checked").val();
	lag3 = $("select[name='jisa3']").val();
	
	country4 = $("input[name='area4']").val();
	color4 = $("input[name='color4']:checked").val();
	lag4 = $("select[name='jisa4']").val();

	window.location.href = "#p-top";
});


/*
*  canvasの処理
*/

// ページ読み込み時に init関数を実行
window.onload = function() {
init();
};

// clock関数を１秒周期で繰り返す
function init(){
sample();
setInterval('sample();',1000);
}

function sample() {
	//描画コンテキストの取得
	var canvas = document.getElementById('sample1');
	if (canvas.getContext) {
		var context = canvas.getContext('2d');

		//描画色変更用のファンクション
		function changeColor(num){
			if (num == 1){
				context.strokeStyle = '#7fffd4';
				context.fillStyle = '#7fffd4';
			}else if (num == 2){
				context.strokeStyle = '#fff462';
				context.fillStyle = '#fff462';
			}else if (num == 3){
				context.strokeStyle = '#c3d825';
				context.fillStyle = '#c3d825';
			}else if (num == 4){
				context.strokeStyle = '#ff962d';
				context.fillStyle = '#ff962d';
			}else if (num == 5){
				context.strokeStyle = '#ef857d';
				context.fillStyle = '#ef857d';
			}else if (num == 6){
				context.strokeStyle = '#c7a5cc';
				context.fillStyle = '#c7a5cc';
			}else if (num == 7){
				context.strokeStyle = '#ffffff';
				context.fillStyle = '#ffffff'
			}else if (num == 8){
				context.strokeStyle = '#180614';
				context.fillStyle = '#180614';
			}else {
				context.strokeStyle = 'black';
				context.fillStyle = 'black';
			}
		}

		//もろもろ設定
		canvas.width = 700;
		canvas.height = 700;
		var width = canvas.width;
		var height = canvas.height;
		var center = {x : width / 2, y : height / 2};
		var rads     = width / 2 * 0.8;

		//時間の取得
		time = new Date();
		hour = time.getHours();
		minute = time.getMinutes();
		second = time.getSeconds();

		//キャンバスをクリア
		context.clearRect(0,0,width,height);

		//デジタル時計の表示
		context.font = "20pt Arial";
		context.fillStyle = '#fafdff';
		context.fillText(hour + ":" + minute, 70, 70 ); 

		//色を指定する
		context.strokeStyle = 'rgb(255,255,255)'; //枠線の色は白
		context.fillStyle = 'dimgray'; //塗りつぶしの色は赤
		context.textAlign = "center";
		context.save(); //描画スタイルを保存

		//文字盤の円を描画する
		context.lineWidth = 30; //線の太さを変更
		context.arc(center.x,center.y,260,Math.PI*2,false);
		context.stroke();

		//rotateで目盛を描画
		context.translate(center.x, center.y);
		var pitch = Math.PI * 2 / 24;
		for (var i = 0; i < 24; i++) {
			context.beginPath();
			context.lineWidth = 3;
			context.moveTo(0, -225);
			context.lineTo(0, -240);
			context.stroke();
			context.rotate(pitch);
		}
		context.closePath();
		context.restore(); //描画スタイルをロード

		//文字盤を描画する(4つ)
		context.translate(0, 0);
		context.font = "20pt Arial";
		context.fillText("24", center.x, 100 ); //零時
		context.fillText("06", 610, 360 ); //06時
		context.fillText("12", center.x, 620 ); //12時
		context.fillText("18", 90, 360 ); //18時
		
		//時差のメーターを描画する
			//メーターB、国Bとの時差メーター
		context.save();
		changeColor(color2);  //描画色を変更
		context.translate(center.x,center.y);
		context.beginPath();
		context.lineWidth = 20; //線の太さを変更
		context.rotate(pitch * hour);
		context.rotate((pitch / 60) * minute);
		var angle = lag2 * 15;
		if (angle < 0){
		angle = -angle;
			context.arc(0,0,205, -90/180*Math.PI, (360 - angle - 90)/180*Math.PI, true)
		}else {
			context.arc(0,0,205, -90/180*Math.PI, (angle-90)/180*Math.PI, false);
		}
		context.stroke();
		context.closePath();
		context.restore();
		
			//メーターC、国Cとの時差メーター
		context.save();
		changeColor(color3);
		context.translate(center.x,center.y);
		context.beginPath();
		context.lineWidth = 20; //線の太さを変更
		context.rotate(pitch * hour);
		context.rotate((pitch / 60) * minute);
		angle = lag3 * 15;
		if (angle < 0){
			angle = -angle;
			context.arc(0,0,180, -90/180*Math.PI, (360 - angle - 90)/180*Math.PI, true)
		}else {
			context.arc(0,0,180, -90/180*Math.PI, (angle-90)/180*Math.PI, false);
		}
		context.stroke();
		context.closePath();
		context.restore();
		
			//メーターD、国Dの時差メーター
		context.save();
		changeColor(color4);
		context.translate(center.x,center.y);
		context.beginPath();
		context.lineWidth = 20; //線の太さを変更
		context.rotate(pitch * hour);
		context.rotate((pitch / 60) * minute);
		angle = lag4 * 15;
		if (angle < 0){
			angle = -angle;
			context.arc(0,0,155, -90/180*Math.PI, (360 - angle - 90)/180*Math.PI, true)
		}else{
			context.arc(0,0,155, -90/180*Math.PI, (angle-90)/180*Math.PI, false);
		}
		context.stroke();
		context.closePath();
		context.restore();
		
		//時針と国・地域名を描画する
			//東京
		changeColor(tcolor1);
		context.translate(center.x, center.y);
		context.beginPath();
		context.lineWidth = 5; //線の太さを変更
		context.rotate(pitch * hour);
		context.rotate((pitch / 60) * minute);
		context.moveTo(0,0); //東京
		context.lineTo(0,-215);
		context.stroke();
		context.closePath();
		
		context.font = "25px 'ＭＳ ゴシック'";
		context.fillText(country1, 0, -280 ); //東京
		context.restore(); //描画スタイルをロード
		
			//B国
		context.save();
		changeColor(color2);
		context.rotate(pitch * lag2);	//()に時差が入る
		context.lineWidth = 5;
		context.beginPath();
		context.moveTo(0,0);
		context.lineTo(0,-215);
		context.stroke();
		context.closePath();
		
		context.font = "25px 'ＭＳ ゴシック'";
		context.fillText(country2, 0, -280 ); //B国
		
		context.font = "18pt Arial";
		context.fillText("-19", 0, -305 ); 
		context.restore();
		
			//C国
		context.save();
		changeColor(color3);
		context.rotate(pitch * lag3);	//()に時差が入る
		context.lineWidth = 5;
		context.beginPath();
		context.moveTo(0,0);
		context.lineTo(0,-215);
		context.stroke();
		context.closePath();
		
		context.font = "25px 'ＭＳ ゴシック'";
		context.fillText(country3, 0, -280 ); //C国

		context.font = "18pt Arial";
		context.fillText("- 9", 0, -305 ); 
		context.restore();

			//D国
		context.save();
		changeColor(color4);
		context.rotate(pitch * lag4);	//()に時差が入る
		context.lineWidth = 5;
		context.beginPath();
		context.moveTo(0,0);
		context.lineTo(0,-215);
		context.stroke();
		context.closePath();
		
		context.font = "25px 'ＭＳ ゴシック'";
		context.fillText(country4, 0, -280 ); //C国

		context.font = "18pt Arial";
		context.fillText("+ 2", 0, -305 ); 
		context.restore();
	}
}


