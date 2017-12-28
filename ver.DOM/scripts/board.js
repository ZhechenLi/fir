var chessBoard = (function(){
  var boardCell = [], // 用于记录棋盘上所有棋子的位置
      boardCellLength = 144,
      stepChain = [], // 记录玩家走的每一目
      backChain = [], // 记录悔棋的每一目
      player = true;  // 记录当前玩家颜色，为true时白子走，false黑子走

  // 用于记录每一步棋的颜色及位置
  function cell(color, col, row){
    if(isNaN(+col+row)){
      throw 'col或row非法！！'
    }
    this.color = color;
    this.col = col;
    this.row = row;
  }
  //
  cell.prototype.addAdj = function(){
    this.adjNum += 1;
  }

  // 判断输赢, 最先出现五连珠的一方获胜
  // 分别记录垂直，水平，左斜方及右斜方同一颜色棋子的数目，每一维度需要做两次循环
  function judge(){
    var color = player?'white':'black',
        adjNum = 1,
        indexOfBoard = arguments[0],
        /*
         *    如图所示:
         *
         *        -13 -12 -11
         *          ↖  ↑  ↗
         *        -1←  0  →1
         *          ↙  ↓  ↘
         *         11  12  13
         *
        */
        adjStatueNum = [-1, 1, -12, 12, -13, 13, 11, -11];


    for(var i = 0; i < adjStatueNum.length; i += 2){

      adjNum = adjNumOperate(adjStatueNum[i], adjStatueNum[i+1], arguments[0]);
      if(adjNum == 5) {
        console.log(color + ' is win!!');
        alert(color + ' is win!!');
        $('tbody').unbind();
      }else{
        adjNum = 1;
      }
    }

  }
  // 代码复用而已，包装了两个while循环
  function adjNumOperate(){
    var adjNum = 1,
        color = player?'white':'black',
        indexOfBoard = arguments[2];

    while(boardCell[indexOfBoard + arguments[0]] == color){
      adjNum += 1;
      indexOfBoard += arguments[0];
    }
    indexOfBoard = arguments[2];

    while(boardCell[indexOfBoard + arguments[1]] == color){
      adjNum += 1;
      indexOfBoard += arguments[1];
    }

    return adjNum;
  }


  // 公有接口
  return{
    newCell: function(col, row){
      if(isNaN(+col+row)){
        throw 'col或row非法！！'
      }
      var color = player?'white':'black',
          indexOfBoard = +col + (row  - 1) * 12; //

      // console.log(indexOfBoard);
      boardCell[indexOfBoard] = color;
      stepChain.push(new cell(color, col, row));
      backChain = [];   //
      judge(indexOfBoard);
      player = !player;

    },
    isNewCell: function(col, row){
      if(isNaN(+col+row)){
        throw 'col或row非法！！'
      }
      var indexOfBoard = +col + (row  - 1) * 12;

      return boardCell[indexOfBoard]?true:false;

    },
    getPlayerState: function() {
      var pState = player;
      return pState;
    },
    getStepChain: function(callback){
      for (var i = 0; i < stepChain.length; i++) {
        callback(stepChain[i]);
      }
    },
    getLastStep: function() {
      var lastStep = stepChain.pop();
      if(!lastStep){
        console.log('lastStep不存在');
        return
      }
      var col = lastStep.col,
          row = lastStep.row,
          indexOfBoard = +col + (row  - 1) * 12;

      backChain.push(lastStep); // 记录起来以便于撤销
      boardCell[indexOfBoard] = undefined;

      player = !player;
      return lastStep;
    },
    getLastBackStep: function() {
      var lastBackStep = backChain.pop();
      console.log(lastBackStep);
      if(!lastBackStep){
        return
      }
      stepChain.push(lastBackStep);

      player = !player;
      return lastBackStep;
    },
    getBoardCell: function(callback){
      for (var i = 1; i < boardCell.length; i++) {
        callback(boardCell[i], i);
      }
    }
  }
}());





$('tbody').on('click', '.undone', function(e){
  var col = $(this).attr('col'),
      row = $(this).attr('row');  //用于记录本局落子的位置

  // player为true时将棋子设为白子，false为黑子
  $(this).addClass(chessBoard.getPlayerState()?'white':'black');

  $(this).removeClass('undone');
  $(this).addClass('done');
  chessBoard.newCell(col, row);

});

// 悔棋
$('.back-button').on('click', function(e){

  var lastStep = chessBoard.getLastStep();  //用于记录本局落子的位置
  if(!lastStep){
    console.log('棋盘上没有棋子');
    return;
  }
  var col = lastStep.col,
      row = lastStep.row,
      cell = $('.done[col="' + col + '"][row="' + row + '"]');

  // 初始化
  cell.removeClass();
  cell.addClass('undone');


  // 检测canvas状态
  // console.log($('#canvasBoard'));


  // repaint();

});

// 撤销悔棋
// TODO:只能撤销一次
$('.redo-button').on('click', function(e){

  var lastBackStep = chessBoard.getLastBackStep();
  if(!lastBackStep){
    console.log('还没进行过悔棋操作');
    return;
  }

  var col = lastBackStep.col,
      row = lastBackStep.row,
      color = lastBackStep.color;

  console.log(col, row, color);
  $('.undone[col="' + col + '"][row="' + row + '"]').addClass('done');
  // player为true时将棋子设为白子，false为黑子
  if(color == 'white'){
    $('.undone[col="' + col + '"][row="' + row + '"]').addClass('white');
  }else if(color == 'black'){
    $('.undone[col="' + col + '"][row="' + row + '"]').addClass('black');
  }



  // drawCellCanvas(col ,row, color);
});


