const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"}
];

app.get("/keiyo", (req, res) => {
  res.render('db1', { data:station })
})

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  if( isNaN(win) ) win = 0;
  if( isNaN(total) ) total = 0;
  console.log( {hand, win, total});
  let num = NaN;
  if( hand !== undefined ) num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else if( num==3 ) cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する

  let handnum = NaN;
  if( hand=='グー' ) handnum = 1;
  else if( hand=='チョキ' ) handnum = 2;
  else if( hand=='パー') handnum = 3;

  if( num==handnum ) {
    judgement = 'あいこ';
    total += 1;
  } else if( (num+1)%3 == handnum%3 ) {
    judgement = '負け';
    total += 1;
  } else if ( (num-1)%3 == handnum%3 ) {
    judgement = '勝ち';
    win += 1;
    total += 1;
  } else if ( isNaN(num) ) {
    judgement = '';
  } else {
    judgement = '無効試合';
    total += 1;
  }

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/janken2", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  let num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  let handnum = NaN;
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else if( num==3 ) cpu = 'パー';
  
  if( hand=='グー' ) handnum = 1;
  else if( hand=='チョキ' ) handnum = 2;
  else if( hand=='パー') handnum = 3;

  if( num==handnum ) {
    judgement = 'あいこ';
  } else if( (num+1)%3 == handnum%3 ) {
    judgement = '負け';
  } else if ( (num-1)%3 == handnum%3 ) {
    judgement = '勝ち';
    win += 1;
  } else {
    judgement = 'エラー';
  }
  total += 1;

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken2', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
