// Squares
var winner = null;
var $allSquares = $('.square');
var tokenPlayer = false;
var $player1 = { name: null,
                score: null

              }

// Add event listener for all squares
$allSquares.click( function(event){ play(event);} );

function play(event) { // Function that apply the crosses or noughts to the clicked square
  if (tokenPlayer == true){  // Check who is the player (player1)
    if ($(event.target).hasClass('empty')) { // check clicked square for class empty
      $(event.target).removeClass('empty'); // remove class 'empty'
      $(event.target).addClass('cross'); // add class 'cross'
      tokenPlayer = false;    // Change player for next turn
    }
  }else if (tokenPlayer == false){
    if ($(event.target).hasClass('empty')) {
      $(event.target).removeClass('empty');
      $(event.target).addClass('nought'); // add class 'nought'
      tokenPlayer = true;
    }
  }
  //winner = checkWinner();
  $('.result').html("Winner: " + winner);
}
$('#resetBtn').click( function(){
  $.each($allSquares,function(){
    $(this).removeClass('nought')
    $(this).removeClass('cross')
    $(this).addClass('empty');
  });
});

// function checkWinner() {
//
//   var $elements = ['#sqr1, #sqr2, #sqr3'];
//   var result = 0;
//   //iterate all elements ids
//   $elements.each(function(i, v){
//   //set result false if element don't have class
//      if($(i).hasClass('square'))
//         result += 1;
//       });
//       //show final result
//       if (result = 3){
//         alert("There is a winner");
//       }
//   });
// }
