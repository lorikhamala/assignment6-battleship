//Set up the Game and Create the players (2 players, 4 ships, gameboard)
    //Create 2 objects that have name, shipCount and gameBoard
    //Create the gameboard as an array inside the object: 2-dimensional array w 4 rows and 4 columns filled w zeros

let message;
let winner;

let player1 = {
  name:  " ",
  shipCount: 4,
  gameBoard: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
}

let player2 = {
  name:  " ",
  shipCount: 4,  //change back to 4
  gameBoard: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
}

// Ask for the name via prompt, then use that to change the value of the name property

player1.name = prompt("What is the name of the first player?"); 
player2.name = prompt("What is the name of the second player?");

//Add 4 ships to random spots on each player's board. 
    //Create a loop that runs until all ships are added, generate random x and y coordinate
    //check if any ship already exists there:
    //if no ship: add a ship (value change from 0 to 1) and increment ship counter. 
    //if yes ship: do nothing, continue the loop
    //while shipCount > 0, run the loop, countdown shipCount at each interation
    //Create a function to store it all in so you can call it multiple times later

function addShips(player) {
    let shipCountAdd = player.shipCount

    while (shipCountAdd > 0) {
      let x = Math.floor( Math.random() * 3 ) +1;
      let y = Math.floor( Math.random() * 3 ) +1;

      if (player.gameBoard[x][y] === 0) {
        player.gameBoard[x][y] = 1;
        shipCountAdd--;
      }  
    }
}

//call the function to add ships for player 1 and player 2

addShips(player1);
addShips(player2);

alert(`Player 1:  ${player1.gameBoard} ` );
alert(`Player 2:  ${player2.gameBoard} `);

//ships are added! game board is all set up! great!

// Ask player 1 to choose strike coordinates. --> assign to variable and check against current location of ships
// set a function to set up the play
// put x and y guesses into an array so you can access it?
// loop through it
//change to integere


//prompt user for strike coordinates, and check to make sure it is between 0-3
function promptGuess( attackingPlayer, targetPlayer) {
  let strikeGuessX
  let strikeGuessY


  while ( strikeGuessX !== 0 && strikeGuessX !== 1 && strikeGuessX !== 2 && strikeGuessX !== 3) {
    strikeGuessX = parseInt( prompt(`${attackingPlayer.name}'s Turn! Try to sink ${targetPlayer.name}'s battleship! Guess the X coordinate (a number between 0 and 3).` ) );
  }
  while ( strikeGuessY !== 0 && strikeGuessY !== 1 && strikeGuessY !== 2 && strikeGuessY !== 3) {
    strikeGuessY = parseInt( prompt(`${attackingPlayer.name}, Now guess the Y coordinate (a number between 0 and 3).` ));
  }

  return Array(strikeGuessX, strikeGuessY);
}
// This ends the promptGuess function, which returns the strike coordinate guesses in an array [x,y].  


//set a function
  //now, check the guesses (returned from the promptGuess function) against the player's gameboard
  // if return value from player's gameboard === 1, then message "sink"
   //--> change value from 1 to 0 and decrement shipcount //else, miss 

function takeATurn(playerA, playerB) {

    player1Guess = promptGuess(playerA, playerB);
    //alert(player1Guess); //to test if it returns the right thing
    //player1Guess[0] = x coordinate.    player1Guess[1] = y coordinate. 

    let strikeGuessX = player1Guess[0];
    let strikeGuessY = player1Guess[1];

   if(playerB.gameBoard[strikeGuessX][strikeGuessY] === 1) {
      playerB.gameBoard[strikeGuessX][strikeGuessY] = 0;
      playerB.shipCount--;
      message = `${playerA.name}, you got a hit! ${playerB.name} has lost a ship!`

    } else if (playerB.gameBoard[strikeGuessX][strikeGuessY] === 0) {
      message = "You missed! Better luck next time!"
    } 
  alert(message);
}

//let each player take turns until one player's ships are down to zero.
//then declare a winner.
//if player1 shipcount is 0, winner is player2. if player2 shipcount is 0, then winner is player1 

do {
  takeATurn(player1, player2);
  takeATurn(player2, player1);
} while (player1.shipCount > 0 && player2.shipCount > 0); //change back to 0


if (player1.shipCount === 0 && player2.shipCount === 0 ){ // change to ===0 ; <= 2 for the test
  winner = `No one. It was a tie.` 
  message = `No one won this game. It was a tie.` 

} else if (player1.shipCount === 0 ) {   // change to shipCount === 0; <= 2 for the test
  winner =  `${player2.name}`;
  message = `${player2.name} sunk all ${player1.name}'s ships!!  ${player2.name} is the winner!`

} else if (player2.shipCount === 0) {  // change to shipCount === 0; <= 2 for the test
  winner = `${player1.name}` ;
  message = `${player1.name} sunk all ${player2.name}'s ships!!  ${player1.name} is the winner!`
}
alert(message);


//Run the full game and Return the winner of the game in the browser.

const battleship = () => {
  return `The winner of this game is ${winner}. But in war, NO ONE REALLY WINS. WORK FOR PEACE.`
}

const gameResult = battleship()

const htmlTarget = document.getElementById('result')
htmlTarget.innerHTML = gameResult
