var canvas=document.getElementById('canvasBoard'),
    ctx=canvas.getContext('2d');

repaint();

function drawCellCanvas(col, row, color){
  if(color === 'white'){
    color = '#FF7F7F';
    console.log(color);
  }
  ctx.fillStyle = color;
  ctx.fillRect((col - 1) * 54 + 2, (row - 1) * 54 + 2, 52, 52);
}
function clearCellCanvas(col, row){
  drawCellCanvas(col, row, '#CCC');
}

// 重绘整个页面
function repaint(){

  // 绘制棋盘
  ctx.fillStyle='#CCC';
  ctx.fillRect(0,0,650,650);
  ctx.fillStyle = '#A7AAAA';
  ctx.font =  "130px Courier New";
  //从坐标点(50,50)开始绘制文字
  ctx.fillText("Canvas", 70, 300);

  ctx.fillStyle='#FFF';

  for(var i = 0; i <= 12; i++){
    ctx.fillRect(0, 54 * i, 650, 2);
    ctx.fillRect(54 * i, 0, 2, 650);
  }
  chessBoard.getStepChain(function(ele){
    if (ele.color == 'white') {
      drawCellCanvas(ele.col, ele.row, '#FF7F7F');
    }else if(ele.color == 'black'){
      drawCellCanvas(ele.col, ele.row, '#000');
    }

  });


  // var col = 1,
  //     row = 1;
  // chessBoard.getBoardCell(function(ele, index){
  //   console.log(index);
  //   console.log(col, row);


  //   // if(ele === 'white'){
  //   //   console.log('it\'s white');
  //   //   drawCellCanvas(col, row, '#FF7F7F');
  //   // }else if(ele === 'black'){
  //   //   console.log('it\'s black');
  //   //   drawCellCanvas(col, row, '#000');
  //   // }else{
  //   //   // console.log('it\'s undefined');
  //   // }
  //   // col += 1;
  //   // if(col > 12){
  //   //   col = 1;
  //   //   row += 1;
  //   // }
  // });
}


$('#canvasBoard').bind('click', function(event) {
  /* Act on the event */
  var left = $(this).offset().left,
      top = $(this).offset().top,
      canvaspageX = event.pageX - left,
      canvaspageY = event.pageY - top,
      offsetLeft = Math.floor(canvaspageX/54),
      offsetTop = Math.floor(canvaspageY/54),
      col = offsetLeft + 1,
      row = offsetTop + 1;

  // console.log(offsetLeft, offsetTop);

  // 验证该棋格中是否含有棋子，有则跳出该次事件
  if(chessBoard.isNewCell(col ,row)){
    return;
  }

  // player为true时将棋子设为白子，false为黑子
  if(chessBoard.getPlayerState()){
    drawCellCanvas(col, row, '#FF7F7F');
  }else{
    drawCellCanvas(col, row, '#000');
  }
  chessBoard.newCell(col, row);
});
