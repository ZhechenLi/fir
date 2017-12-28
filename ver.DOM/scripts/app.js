// 初始化一个12x12的棋盘
(function(colNum, rowNum){
  var col = 0,
      row = 0;

  for(var i = 0 ; i < rowNum; i++){
    $('tbody').append('<tr></tr>');
  }

  $('tr').each(function(index, el) {
    row = index + 1;
    for(var i = 0; i < colNum; i++){
      col = i + 1;
      // col 和 row 属性用于
      $(this).append('<td class="undone" col=' + col + ' row=' + row + '></td>');
    }
  });
}(12, 12));