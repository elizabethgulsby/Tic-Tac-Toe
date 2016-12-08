// 1. Set up the board
// 2. User should be able to click a box and a mark shows up
	// --put an onclick in the first square
	// --when user clicks, call fxn that puts an x in the box
// MILESTONE

function markSquare(square) {
	console.log(square.id);
	square.innerHTML = "X";
}

function computerChoice() {
	// generate a random number between 1-3, make sure that computer doesn't change what's already been marked by the user
	var randomSelect = Math.floor(Math.random() * 3);
	assign the guess to either an X or an O
	var compGuess = 
}