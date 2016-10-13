
function makeBoard(arg1,arg2,key){
  var write = [];

  var $boardDiv = $('.board');
  var $newLineDiv = $('<div>').addClass('line');
  var $rowDiv = $('<div>').addClass('square');
  var sqrTotal = 0;
  for (var i = 0; i < arg1 ; i++) {
      var line = [];
      var $newLineDiv = $('<div>').addClass('line');
    for (var y = 0; y < arg2 ; y++) {
        line[y] = '0';
        var $newRowDiv = $('<div>').addClass('square');
        $newRowDiv.attr('id','sqr-' + (sqrTotal+1) );
        $newLineDiv.append($newRowDiv);
        sqrTotal++;
    }
      write[i] = line;
      console.log(line);
      $boardDiv.append($newLineDiv);
    }
    console.log(write);
    return write;
}
board = makeBoard(3,3,'X');

// function makeBoard(line, row, key) {
//     var boundingBoard = [];
//     for(var i = 0; i < line; i++) {
//         var line = [];
//         for(var j = 0; j < row; j++) {
//             line.push('#');
//         }
//         boundingBoard.push(line);
//
//     }
//
//     return boundingBoard;
// }
// changeBoard (board, line to change, row to change, key)
// function changeBoard(board,line,row,'X'){
//   var lineBoard = line;
//   var rowLine = row;
//
//   boundingBoard[lineBoard][rowLine] = key;
//   console.log(boundingBoard);
//   return boundingBoard;
// }

// // makeBoard ( number of total lines, number of rows, What to change for, )
 //var board = makeBoard(3, 3);
// var board = changeBoard(board,1,1,'X');
