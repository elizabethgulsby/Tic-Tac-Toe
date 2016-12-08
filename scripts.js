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

function markSquare(currentSquare) {
	// console.log(square.id);
	if ((currentSquare.innerHTML === "X") || (currentSquare.innerHTML === "O")) {
			console.log("Someone is there. Stop cheating.");
			// if nothing there, the else statement runs
	}
	else {
		if (whoseTurn === 1) {
			currentSquare.innerHTML = "X";
			whoseTurn = 2; //give control to player 2
			player1Squares.push(currentSquare.id); //pushes square just clicked on to player 1's squares array
		}
		else {
			currentSquare.innerHTML = "O";
			whoseTurn = 1; //give control back to player 1
			player2Squares.push(currentSquare.id); //pushes square just clicked on to player 2's squares array
		}
		console.log(player1Squares);
		console.log(player2Squares);
		checkWin(); //this runs regardless of whose turn it is - not inside of an if statement
	}
}

function checkWin() {
	// outer loop
	for (var i = 0; i < winningCombos.length; i++) {
		// inner loop (to run through each individual element inside winningCombos)
		var rowCount = 0;
		for (var j = 0; j < winningCombos[i].length; j++) {
			// console.log(winningCombos[i][j]);
			var winningSquare = winningCombos[i][j];
			if (player1Squares.indexOf(winningSquare) > -1) { //do they have all 3 j's? is the j inside of the player1squares array? This only has something in it because the player clicked a button
				// HIT! Player has this square, somewhere.
				rowCount++;
			}
		}
		if (rowCount === 3) { //after we've checked all of the j's
			// player had all 3 of these j's in the i that we're on. Win.
			console.log("Player 1, won!");
		}
		// console.log("Combo completed");
	}
}





