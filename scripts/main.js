
var board = ['', '', '', '', '', '', '', '', '' ];
var tokenPlayer = 1;
var P1character = null;
var totalMoves = 0;
var player1 = {nick: '' , score: 0};
var player2 = {nick: '' , score: 0};
var roundWinner = null;
var classP1 = null;
var classP2 = null;

//DOM stuff
var $p2Div = $('#player2');
var $p1Div = $('#player1');



//____Button to start playing and get values from Form _______

$('#btnStart').click(function () {
  player1.nick = $('#inputP1Name').val();
  player2.nick = $('#inputP2Name').val();

  P1character = $(':checked').attr('value');
  P1character = Number(P1character)

  $('.form').css('display',"none");
  $('.game').css('display','block');

  // Display Player 1 Name and Score
  var $p1Name = $('<p>').attr('id','p1Name').text(player1.nick );
  var $p1Score = $('<p>').attr('id','p1Score').text('Score: '+ player1.score);
  $p1Div.append($p1Name,$p1Score);

  // Display Player 2 Name and Score
  var $p2Name = $('<p>').attr('id','p2Name').text(player2.nick);
  var $p2Score = $('<p>').attr('id','p2Score').text('Score: '+ player2.score);
  $p2Div.append($p2Name,$p2Score);

  // if (P1character === 1) {  //Tells what Character player 1 selected
  //   hoverP1 = 'hoverCross'; // vars to be used when hovering squares
  //   hoverP2 = 'hoverNought';
  // } else {
  //   hoverP1 = 'hoverNought';
  //   hoverP2 = 'hoverCross';
  // }

  if (P1character === 1) {  //Tells what Character player 1 selected
    hoverP1 = 'X'; // vars to be used when hovering squares
    hoverP2 = 'O';
  } else {
    hoverP1 = 'O';
    hoverP2 = 'X';
  }
  makeBoardListen();
  hover();
})

//____________HOVER_________________
function hover() {

  $('.board').mouseover( function (event) {
    var $empty = $(event.target).attr('empty');
    if ($empty === "true"){
      if (tokenPlayer == 1) {
        $( event.target ).text(hoverP1).addClass('hover-div');
      }else {
        $( event.target ).text(hoverP2).addClass('hover-div');
      }
    }
  });

  $('.board').mouseout( function (event) {
    var $empty = $(event.target).attr('empty');
    if (tokenPlayer == 1) {
      if ($empty == 'true') { // not clicked
        $( event.target ).text('');
      }
    }else {
      if ($empty == 'true') { // not clicked
        $( event.target ).text('');
      }
    }
  });
}


//______________________________Event Listener________________________

function makeBoardListen() {
  $('.board').on('click', function(event){
    // update move
    var $index = $(event.target).attr('data-index'); // store data-index of event.target
    var $empty = $(event.target).attr('empty');     // store empty value of event.target
    var result = null;

    if (P1character == 1) { //Tells what Character player 1 selected
      var printP1 = 'X';
      var printP2 = 'O';
    }else {
      var printP1 = 'O';
      var printP2 = 'X';
    }

    if ($empty == 'true') {      // If ther's nothing inside the square
      if (tokenPlayer == 1) {   // Check who's playing (Player 1)
        result = clickBox(printP1,$index); // Call function to select the square
                                           // and wait for result

        if (result == true) { // if there is a winner
          player1.score = player1.score + 1;
          $('#p1Name').text(player1.nick);
          $('#p1Score').text('Score: ' + player1.score);
          // Stop event listener (game over)
          $('.board').off();
          $('.displayResult').text(player1.nick + ' Win!').css("color", "#dd3044");
          //var $eraser = $('<button>').attr({id:"resetBtn",type:"button"}).text('Play Again!');
          var $eraser = $('<img src="images/eraser.png">').attr({id:"resetBtn",type:"button"}).text('Play Again!');
          $('.eraser').append($eraser);
        } else if (result == false && totalMoves == 9) {
            $('.board').off();
            $('.displayResult').text('Tie game!').css("color", "grey");
            var $eraser = $('<button>').attr({id:"resetBtn",type:"button"}).text('Play Again!');
            $('.eraser').append($eraser);
            $('.square').removeClass('hoverNought','hoverCross');
        }

      } else {
        result = clickBox(printP2,$index);
        if (result == true) { // if there is a winner
          player2.score = player2.score + 1;
          $('#p2Name').text(player2.nick);
          $('#p2Score').text('Score: ' + player2.score);
          // Stop event listener (game over)
          $('.board').off();
          $('.displayResult').text(player2.nick + ' Win!').css("color", "navy");
          var $eraser = $('<img src="images/eraser.png">').attr({id:"resetBtn",type:"button"}).text('Play Again!');
          $('.eraser').append($eraser);
        }else if (result == false && totalMoves == 9) {
          $('.board').off();
          $('.displayResult').text('Tie game!').css("color", "grey");
          var $eraser = $('<img src="images/eraser.png">').attr({id:"resetBtn",type:"button"}).text('Play Again!');
          $('.eraser').append($eraser);
          $('.square').removeClass('hoverNought','hoverCross');
        }
      }
    }
  });
};


//___________Action performed when goes through validation_______________
// --> Called by Event Listener

// $index probably should be index
function clickBox(key,$index){
  board[$index] = key;
  var $target = $(event.target);
  $target.text(key);
  $target.attr('empty','false');
  if (tokenPlayer === 1) {
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
  var allIndexPlayer = getPlayerMovesIdex(board, key);  //(Player 1 moves) player moves
  //var allIndexP2 = getPlayerMovesIdex(board, 'O'); //Player 2 moves
  console.log(allIndexPlayer);
  //console.log(allIndexP2);
  var result = mathWinner(allIndexPlayer);   //check if
  //mathWinner(allIndexP2);
  return result;

}

//_____ Get the indexes of the moves made by the player__________
//  --> Called by CheckWinner function
function getPlayerMovesIdex(arr, val) {
    var indexes = [];
    for(i = 0; i < arr.length; i++){
      if (arr[i] === val)
        indexes.push(i);
    }
    return indexes;   // return the indexes back to checkWinner
}

//___Creates the possibilites to be compared with the moves made by the players__
// --> Called by CheckWinner function
function mathWinner(arr) {
 var winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for (var i = 0; i < winningCombos.length; i++) {
    var foundWinner = containsAll(winningCombos[i],arr);
    if (foundWinner == true) {
      return foundWinner;
      break
    }
  }
  return foundWinner;
}

//____Compare if the content of an arran is contained in another array_________
// --> Called by mathWinner
function containsAll(possibilities, playerMoves){

  for(var i = 0 ; i < possibilities.length ; i++){
    // If it does not find the possibilities into the moves, return false.
    if($.inArray(possibilities[i], playerMoves) == -1) return false;
  }
  return true; // otherwise returns true.
}

//________Draw board _______________
for (var i = 0; i < board.length; i++) {
  $('.board').append($('<div>').attr({'data-index':i ,'empty':'true','class':'square','id': 'sqr-'+i}).text(board[i]));
}

//_________Play Again Button________________________
// Clear all VALUES (except scores)
$('.eraser').click('button' ,function(){
  totalMoves = 0;                 //clear totalMoves
  board = ['', '', '', '', '', '', '', '', '' ]; // clear board
  var $allSquares = $('.square')

   // clear the squares removing classes and data
  $.each($allSquares,function(){
    $(this).removeClass('nought');
    $(this).removeClass('cross');
    $(this).attr('empty','true');
    $('.displayResult').text('');  // clear text from displayResult
    $('.board').empty();          // empty div Board

    // generate square divs
    for (var i = 0; i < board.length; i++) {
      $('.board').append($('<div>').attr({'data-index':i ,'empty':'true','class':'square','id': 'sqr-'+i}).text(board[i]));
    }
    makeBoardListen();       // Add Event Listener to them
    hover();
    $('#resetBtn').remove();  // hide (remove) 'Play Again' buttom
  });
});
