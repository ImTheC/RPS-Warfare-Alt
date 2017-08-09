### With Each Battle

* Loser gets health decremented  loser()

* if loser dies,
		Winner moves to (or stays in) battle square
	else,
		Both stay in current squares

* if tie,
		- if barbarian,
		take the barbarian for a piece, placed on home row

	else, 	
		Both get chance to swap out character from reserve

### Movements

	UP:     [-][],
	DOWN:   [+][],
	LEFT:   [][-],
	RIGHT   [][+]

### SCRATCH


- click on piece to stage, run canMove( cor ) -(TRACK: cor of staged piece)
	- click again to turn off
	- click square to action -(TRACK: cor of action square)
		- resolve action based on contents of action square

gameboard = [
						 [0-5],
						 [0-5],
						 [0-5],
						 [0-5],
						 [0-5],
						 [0-5]
						]

		{"owner": "P1", "character": 1, "type": "rock", "health": 1};
		{"owner": "P2", "character": 2, "type": "paper", "health": 1};
		{"owner": "barbarian", "character": 3, "type": "scissors", "health": 1};



		for ( var y = 0; gameboard.length; iy++ ) {
			for ( var x = 0; gameboard.length; x++ ) {
				console.log( gameboard[y, x] ) ;
			}
		}



		Check if owner of square is you




gameboard["cor" + x + y]
gameboard[y][x];
