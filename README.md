#README

##About the game project

  My game chosen for this project was Tic Tac Toe.
  The project was made using Javascript , Jquery , HTML and CSS.


##The game

  This is a simple Tic Tac Toe game, which takes the user's input in one of the 9 spaces.
  The players take turns choosing the spaces to place your selection and when there is a line of three consecutive selections of the same type horizontally, vertically or diagonally the game shows who is the winner and keeps the players scores.

###Storing inputs

  The approach taken was creating an array of 9 values.
  Every time a player select one of the boxes, the value for that position in the array is changed.

  The other inputs asked at the beginning of the game is both players's names and a selection (for player 1) of what option he wants between crosses and noughts.

###Find the winner

  To find a winner is necessary to compare two arrays:
    1 - An array that store the index of all the selections made by the user.
    2 - An array that has one of the valid combination to determine the winner.

  So when compared, if inside the array with indexes of the user's input are contained the same indexes of the valid combination, it returns a winner.
  The first array is compared with the eight possible combinations.

###The Layout

  I tried to make it look like a casual game between friends in a place that
  could be an Office, School or even at home. Where there is a table with few belongings.
