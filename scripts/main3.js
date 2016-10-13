console.log('it is working');
var cards = ['a', 'b', 'a', 'b'];
var board = ['', '', '', '', '', '', '', '', '' ];
var tokenPlayer = 1;
var totalMoves = 0;
var player1 = {p1name: 'Player 1', score: 0}
var player2 = {p2name: 'Player 2', score: 0}
var roundWinner = null;
var $p1Div = $('#player1');
var $p1Name = $('<p>').attr('id','p1Name').text(player1.p1name);
var $p1Score = $('<p>').attr('id','p1Score').text('Score: '+ player1.score);
$p1Div.append($p1Name,$p1Score);
var $p2Div = $('#player2');
var $p2Name = $('<p>').attr('id','p2Name').text(player2.p2name);
var $p2Score = $('<p>').attr('id','p2Score').text('Score: '+ player2.score);
$p2Div.append($p2Name,$p2Score);

//______________________________Event Listener________________________
function addEventListener() {
  $('.board').on('click', function(event){
    // update move
    var $index = $(event.target).attr('data-index'); // store data-index of event.target
    var $empty = $(event.target).attr('empty');
    var result = null;
    if ($empty == 'true') {
      if (tokenPlayer == 1) {
        result = clickBox('X',$index);
        if (result == true) { // if there is a winner
         player1.score = player1.score + 1;
         $('#p1Score').text('Score: ' + player1.score)
          roundWinner = 'Crosses';
          // Stop event listener (game over)
          $('.board').off();
        }
      }else {
        result = clickBox('O',$index);
        if (result == true) { // if there is a winner
          player2.score = player2.score + 1;
           $('#p2Score').text('Score: ' + player2.score)
          roundWinner = 'Crosses';
          // Stop event listener (game over)
          $('.board').off();
        }
      }

    }
  });
};
addEventListener();

//___________Action performed when goes through validation_______________
// --> Called by Event Listener
function clickBox(key,$index){
  board[$index] = key;
  var $target = $(event.target)
  var $pTarget = $('<p>').text(key)

  $target.append($pTarget);
  $target.attr('empty','false');
  if (tokenPlayer == 1) {
    $target.addClass('cross');
    tokenPlayer = 2;
  }else {
    $target.addClass('nought');
    tokenPlayer = 1;
  }
  totalMoves++;
  if (totalMoves > 4) {
    var roundResult = checkWinner(key);
    return roundResult;
  }
}

 //______________________Stores player's moves in an array_____________________
 // --> Called by clickBox function
function checkWinner(key){
  var allIndexPlayer = getAllIndexes(board, key);  //(Player 1 moves) player moves
  //var allIndexP2 = getAllIndexes(board, 'O'); //Player 2 moves
  console.log(allIndexPlayer);
  //console.log(allIndexP2);
  var result = mathWinner(allIndexPlayer);   //check if
  //mathWinner(allIndexP2);
  return result;

}

//_______________________ Get the indexes of the moves made_______________
//  --> Called by CheckWinner function
function getAllIndexes(arr, val) {
    var indexes = [], i;            // by the player
    for(i = 0; i < arr.length; i++){
      if (arr[i] === val)
      indexes.push(i);
    }
    return indexes;               // return the indexes back to checkWinner
}

//____Creates the possibilites to be compared with the moves made by the players__
// --> Called by CheckWinner function
function mathWinner(arr) {
  var hr1 = [0,1,2];
  var hr2 = [3,4,5];
  var hr3 = [6,7,8];
  var vt1 = [0,3,6];
  var vt2 = [1,4,7];
  var vt3 = [2,5,8];
  var diag1 = [0,4,8];
  var diag2 = [2,4,6];
  //Array with al possibilities
  var possibilities = [hr1,hr2,hr3,vt1,vt2,vt3,diag1,diag2];

  for (var i = 0; i < possibilities.length; i++) {
    var foundWinner = containsAll(possibilities[i],arr);
    if (foundWinner == true) {
      return foundWinner;
      break
    }
  }
  return foundWinner;
}

//____Compare if the content of an arran is contained in another array_________
// --> Called by mathWinner
function containsAll(possibilities, moves){ //   ( possibilities, player's moves)
  for(var i = 0 , len = possibilities.length; i < len; i++){
    // If it does not find the possibilities into the moves, return false.
    if($.inArray(possibilities[i], moves) == -1) return false;
  }
  return true; // otherwise returns true.
}

//______________________Draw board for the first time__________________________
for (var i = 0; i < board.length; i++) {
  $('.board').append($('<div>').attr({'data-index':i ,'empty':'true','class':'square'}).text(board[i]));
}
$('#resetBtn').click( function(){
  var $allSquares = $('.square')
  $.each($allSquares,function(){
    $(this).removeClass('nought');
    $(this).removeClass('cross');
    $(this).attr('empty','true');
    //redraw board
    var board = ['', '', '', '', '', '', '', '', '' ];
    $('.board').empty();
    addEventListener();
    for (var i = 0; i < board.length; i++) {
      $('.board').append($('<div>').attr({'data-index':i ,'empty':'true','class':'square'}).text(board[i]));
    }

  });
});
