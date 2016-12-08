// 1. Set up the board
// 2. User should be able to click a box and a mark shows up
	// --put an onclick in the first square
	// --when user clicks, call fxn that puts an x in the box
// MILESTONE
// 3. Put an X on the square.
// 4. Keep track of who's turn it is.
// 5. When a square is clicked, put the symbol in AND change whose turn it is.
// 6. Keep player from overwriting a square
// 7. We need a win checker...



var whoseTurn = 1;  //Init whoseTurn to player 1. Use this to know whether to put an X or an O in the square.
var player1Squares = [];
var player2Squares = [];
var someoneWon = false;
var computerPlayer = false;

// set up winners array, each element will be its own array (an array of arrays)
var winningCombos = [
	['A1', 'B1', 'C1'], //row1
	['A2', 'B2', 'C2'], //row2
	['A3', 'B3', 'C3'], //row3
	['A1', 'A2', 'A3'], //col1
	['B1', 'B2', 'B3'], //col2
	['C1', 'C2', 'C3'], //col3
	['A1', 'B2', 'C3'], //diag1
	['A3', 'B2', 'C1'], //diag2
];
// console.log(winningCombos);

var buttons = []

function onePlayerGame() {
	computerPlayer = true;
}

function markSquare(currentSquare) {
	// console.log(square.id);
	if ((currentSquare.innerHTML === "X") || (currentSquare.innerHTML === "O")) {
			// console.log("Someone is there. Stop cheating.");
			// if nothing there, the else statement runs
			return "taken";  //stops the function and returns it to computerMove if X or O in the square
	}
	else if (someoneWon) {
		console.log('Someone already won.');
	}
	else {
		if (whoseTurn === 1) {
			currentSquare.innerHTML = "X";
			whoseTurn = 2; //give control to player 2
			player1Squares.push(currentSquare.id); //pushes square just clicked on to player 1's squares array
			checkWin(1, player1Squares);  //want to see if player 1 won when they clicked, pass the corresponding player array into the function
			if (computerPlayer) {  //call a function that sets this to true (make a boolean) with a button onclick - onePlayerGame?
				computerMove();
			}
		}
		else {
			currentSquare.innerHTML = "O";
			whoseTurn = 1; //give control back to player 1
			player2Squares.push(currentSquare.id); //pushes square just clicked on to player 2's squares array
			checkWin(2, player2Squares); //want to see if player 2 won when they clicked, pass the corresponding player array into the function
		}
	}
}

function computerMove() {
	//go find a random square
	var needASquare = true;
	var squareButtons = document.getElementsByClassName('square'); //goes to DOM and looks for class name 'square' (9 things) - will return an array - all those buttons will be in there, stashed in this array (squareButtons)

	// need the below to keep running while taken is being returned from markSquare()
	while (needASquare) {
		var randomNumber = (Math.ceil(Math.random() * 9)) - 1; //we need it to be between 0-8 - 9 elements in the array
		var randomSquare = squareButtons[randomNumber];
		isTaken = markSquare(randomSquare);
		console.log(isTaken);
		if (isTaken !== "taken") { //then markSquare() didn't send "taken" back
			needASquare = false;  //we don't need a square anymore
		}
	}
}


function checkWin(whoJustWent, currentPlayerSquares) {
	// outer loop
	for (var i = 0; i < winningCombos.length; i++) {
		// inner loop (to run through each individual element inside winningCombos)
		var rowCount = 0;
		for (var j = 0; j < winningCombos[i].length; j++) {
			// console.log(winningCombos[i][j]);
			var winningSquare = winningCombos[i][j];
			if (currentPlayerSquares.indexOf(winningSquare) > -1) { //do they have all 3 j's? is the j inside of the currentPlayerSquares (depends on who just went, player1 or 2) ? This only has something in it because the player clicked a button
				// HIT! Player has this square, somewhere.
				rowCount++;
			}
		}
		if (rowCount === 3) { //after we've checked all of the j's
			// player had all 3 of these j's in the i that we're on. Win.
			console.log("Player " + whoJustWent + ", won!");
			gameOver(whoJustWent, winningCombos[i]); //we're passing whoJustWent, which will be player1 or 2 (depending on the turn), and whichever i they managed in winningCombos, which will contain all j's within that winning i array combo
			break; //halts the i loop, no reason to keep running - someone will have won
		}
		// console.log("Combo completed");
	}
}

function gameOver(whoJustWon, winningCombo) {
	var message = "Congrats to player " + whoJustWon + "! You just won with " + winningCombo;
	document.getElementById('message').innerHTML = message;
	for (var i = 0; i < winningCombo.length; i++) { //looping through 3 winning j's
		document.getElementById(winningCombo[i]).className += ' winning-square'; //as long as the j's are in the winning i in winningCombo (selected by the player when clicked), those squares will have the winning-square class added to them
	}
	someoneWon = true;
	var resetArea = document.getElementById('reset-area').className = 'col-sm-12 text-center'; //displays reset-area div
	// console.dir(resetArea);
}

function resetGame() {
	//needs to reset all 5 global variables, including emptying player1Squares/player2Squares
	whoseTurn = 1; 
	player1Squares = [];
	player2Squares = [];
	someoneWon = false;
	computerPlayer = false;
	var resetValue = document.getElementsByClassName('square');
	console.log(resetValue);
	for (var i= 0; i < 9; i++) {
		resetValue[i].innerHTML = "-";
		resetValue[i].className = 'square';
	}
	document.getElementById('message').innerHTML = "Hi there!  Care to play?  You can go first!"; //find a way to reference p class
	var hideResetArea = document.getElementById('reset-area').className = 'col-sm-12 text-center hidden'; //re-hides reset-area div
}

// add a feature to give the option (back?) between the computer and another human player








