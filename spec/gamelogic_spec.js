var gamelogic = require('../webapp/js/gamelogic.js');

function resetGameState(){
	gamelogic.gameState = {
				"players": {
					"player1": {
						"name": "player1",
						"reserve": {
							"unit1": "Rock",
							"unit2": "Rock",
							"unit3": "Paper",
							"unit4": "Paper",
							"unit5": "Scissors",
							"unit6": "Scissors"
						},
					},
					"player2": {
						"name": "player2",
						"reserve": {
							"unit1": "Rock",
							"unit2": "Rock",
							"unit3": "Paper",
							"unit4": "Paper",
							"unit5": "Scissors",
							"unit6": "Scissors"
						}
					},
				},
				"gameStatus": {
					"currentPlayer": "player1",
					"mode": "setup",
					"swaps": {
						"numberOf": null,
						"players": {
							"first": {"player": null, "cor": null},
							"second": {"player": null, "cor": null}
						}
					},
					"AP": null,
				},
				"grid": {
					"hex1": {
								 "owner": null, "type": null, "health": null
							 },
					"hex2": {
								 "owner": null, "type": null, "health": null
							 },
					"hex3": {
								 "owner": null, "type": null, "health": null
							 },
					"hex4": {
								 "owner": null, "type": null, "health": null
							 },
					"hex5": {
								 "owner": null, "type": null, "health": null
							 },
					"hex6": {
								 "owner": null, "type": null, "health": null
							 },
					"hex7": {
								 "owner": null, "type": null, "health": null
							 },
					"hex8": {
								 "owner": null, "type": null, "health": null
							 },
					"hex9": {
								 "owner": null, "type": null, "health": null
							 },
					"hex10": {
								 "owner": null, "type": null, "health": null
							 },
					"hex11": {
								 "owner": null, "type": null, "health": null
							 },
					"hex12": {
								 "owner": null, "type": null, "health": null
							 },
					"hex13": {
								 "owner": null, "type": null, "health": null
							 },
					"hex14": {
								 "owner": null, "type": null, "health": null
							 },
					"hex15": {
								 "owner": null, "type": null, "health": null
							 },
					"hex16": {
								 "owner": null, "type": null, "health": null
							 },
					"hex17": {
								 "owner": null, "type": null, "health": null
							 },
					"hex18": {
								 "owner": null, "type": null, "health": null
							 },
					"hex19": {
								 "owner": null, "type": null, "health": null
							 },
					"hex20": {
								 "owner": null, "type": null, "health": null
							 },
					"hex21": {
								 "owner": null, "type": null, "health": null
							 },
					"hex22": {
								 "owner": null, "type": null, "health": null
							 },
					"hex23": {
								 "owner": null, "type": null, "health": null
							 },
					"hex24": {
								 "owner": null, "type": null, "health": null
							 },
					"hex25": {
								 "owner": null, "type": null, "health": null
							 },
					"hex26": {
								 "owner": null, "type": null, "health": null
							 },
					"hex27": {
								 "owner": null, "type": null, "health": null
							 },
					"hex28": {
								 "owner": null, "type": null, "health": null
							 },
					"hex29": {
								 "owner": null, "type": null, "health": null
							 },
					"hex30": {
								 "owner": null, "type": null, "health": null
							 },
					"hex31": {
								 "owner": null, "type": null, "health": null
							 },
					"hex32": {
								 "owner": null, "type": null, "health": null
							 },
					"hex33": {
								 "owner": null, "type": null, "health": null
							 },
					"hex34": {
								 "owner": null, "type": null, "health": null
							 },
					"hex35": {
								 "owner": null, "type": null, "health": null
							 },
					"hex36": {
								 "owner": null, "type": null, "health": null
							 },
					"hex37": {
								 "owner": null, "type": null, "health": null
							 },
				 "hex38": {
								 "owner": null, "type": null, "health": null
							 }
					} // end of grid:
	};
}

function initGameReady(){
	// Initialize Game Setup, characters placed, no moves made yet
	gamelogic.gameState.players.player1.reserve = {
							"unit1": "Rock",
							"unit2": false,
							"unit3": "Paper",
							"unit4": false,
							"unit5": false,
							"unit6": false
						};

	gamelogic.gameState.players.player2.reserve = {
							"unit1": false,
							"unit2": false,
							"unit3": false,
							"unit4": "Paper",
							"unit5": "Scissors",
							"unit6": false
						};

	gamelogic.gameState.gameStatus.mode = "turn";
	gamelogic.gameState.gameStatus.AP = 2;
	gamelogic.gameState.grid.hex2 = {"owner": "player1", "type": "rock", "health": 1};
	gamelogic.gameState.grid.hex3 = {"owner": "player1", "type": "scissors", "health": 1};
	gamelogic.gameState.grid.hex5 = {"owner": "player1", "type": "paper", "health": 1};
	gamelogic.gameState.grid.hex10 = {"owner": "player1", "type": "scissors", "health": 1};
	gamelogic.gameState.grid.hex28 = {"owner": "player2", "type": "rock", "health": 1};
	gamelogic.gameState.grid.hex33 = {"owner": "player2", "type": "paper", "health": 1};
	gamelogic.gameState.grid.hex35 = {"owner": "player2", "type": "rock", "health": 1};
	gamelogic.gameState.grid.hex36 = {"owner": "player2", "type": "scissors", "health": 1};

}

function initBattleReady(){
	// Initialize Game Setup, characters placed, ready to battle
	gamelogic.gameState.players.player1.reserve = {
							"unit1": "Rock",
							"unit2": false,
							"unit3": "Paper",
							"unit4": false,
							"unit5": false,
							"unit6": false
						};

	gamelogic.gameState.players.player2.reserve = {
							"unit1": false,
							"unit2": false,
							"unit3": false,
							"unit4": "Paper",
							"unit5": "Scissors",
							"unit6": false
						};

	gamelogic.gameState.gameStatus.AP = 2;

	gamelogic.gameState.grid.hex29 = {"owner": "player1", "type": "scissors", "health": 1};
	gamelogic.gameState.grid.hex34 = {"owner": "player2", "type": "paper", "health": 1};

	gamelogic.gameState.grid.hex19 = {"owner": "player1", "type": "paper", "health": 1};
	gamelogic.gameState.grid.hex22 = {"owner": "player2", "type": "scissors", "health": 1};

	gamelogic.gameState.grid.hex37 = {"owner": "player1", "type": "scissors", "health": 1};
	gamelogic.gameState.grid.hex38 = {"owner": "player2", "type": "rock", "health": 1};

	gamelogic.gameState.grid.hex21 = {"owner": "player1", "type": "rock", "health": 1};
	gamelogic.gameState.grid.hex27 = {"owner": "player2", "type": "rock", "health": 1};

}

// TESTING TESTS

describe("checking the test", function () {

	it("should work", function () {
		expect("test").toEqual("test");
	});

});


describe("check to see if can import functions", function () {

	it("should return true", function () {
		expect(gamelogic.returnTrue()).toEqual(true);
	});

});



// TESTS:

describe("randomRPS()", function () {

	var rpsCheck = function(value) {
		return ( value === "rock" || value === "paper" || value === "scissors" );
	};

	it("should return 'rock', 'paper', or 'scissors'", function () {
		expect(rpsCheck(gamelogic.randomRPS())).toEqual(true);
		expect(rpsCheck(gamelogic.randomRPS())).toEqual(true);
		expect(rpsCheck(gamelogic.randomRPS())).toEqual(true);
		expect(rpsCheck(gamelogic.randomRPS())).toEqual(true);
		expect(rpsCheck(gamelogic.randomRPS())).toEqual(true);
	});

});


describe("checkGameState()", function () {

	it("description", function () {

	});

});


describe("vaildMove()", function () {

	it("should return true is move valid", function () {
		expect(gamelogic.validMove("hex5", "hex6")).toEqual(true);
		expect(gamelogic.validMove("hex12", "hex7")).toEqual(true);
	});

	it("should return false is move invalid", function () {
		expect(gamelogic.validMove("hex5", "hex16")).toEqual(false);
		expect(gamelogic.validMove("hex5", "hex19")).toEqual(false);
	});

});


describe("findNextPlayer()", function () {

	beforeAll(function () {
		initGameReady();
	});

	afterAll(function () {
		resetGameState();
	});


	it("should find the next player", function () {
		expect(gamelogic.findNextPlayer()).toEqual("player2");
	});

	it("should loop back to player1 when reached end of players", function () {
		gamelogic.gameState.gameStatus.currentPlayer = "player2";
		expect(gamelogic.findNextPlayer()).toEqual("player1");
	});

});


describe("endTurn()", function () {

	afterAll(function () {

		resetGameState();

	});

	it("should pass turn to next player", function () {
		gamelogic.endTurn();
		expect(gamelogic.gameState.gameStatus.currentPlayer).toEqual("player2");
	});

	it("should reset action points to 4 if in setup mode", function () {
		gamelogic.gameState.gameStatus.mode = "turn";
		expect(gamelogic.gameState.gameStatus.AP).toEqual(4);
	});

	it("should reset action points to 2 if in turn mode", function () {
		gamelogic.gameState.gameStatus.mode = "turn";
		gamelogic.endTurn();
		expect(gamelogic.gameState.gameStatus.AP).toEqual(2);
	});

});


describe("passTurn()", function () {

	afterEach(function () {

		resetGameState();

	});

	it("should pass turn to specified player", function () {

		gamelogic.passTurn("player1");
		expect(gamelogic.gameState.gameStatus.currentPlayer).toEqual("player1");

		gamelogic.passTurn("player2");
		expect(gamelogic.gameState.gameStatus.currentPlayer).toEqual("player2");

		gamelogic.passTurn("player3");
		expect(gamelogic.gameState.gameStatus.currentPlayer).toEqual("player3");

	});

});


describe("useAP()", function () {

	beforeAll(function () {

		gamelogic.gameState.gameStatus.AP = 2;

	});

	afterAll(function () {

		gamelogic.gameState.gameStatus.AP = null;

	});

	it("should decrement AP", function () {
		gamelogic.useAP();
		expect(gamelogic.gameState.gameStatus.AP).toEqual(1);
	});

	it("should pass turn to next player if no AP are left", function () {
		gamelogic.useAP();
		expect(gamelogic.gameState.gameStatus.currentPlayer).toEqual("player2");
	});

});


describe("move()", function () {

	beforeAll(function () {

		initGameReady(); // Initialize Game Setup, characters placed, no moves made yet

		var selectedCor,
				objectFromSelectedCor,
				actionCor,
				objectFromActionCor;

	});

	afterAll(function () {

		resetGameState();

	});

	it("should move character data to new hex", function () {

		selectedCor = "hex2";
		objectFromSelectedCor = gamelogic.gameState.grid[selectedCor];
		actionCor = "hex7";
		objectFromActionCor = gamelogic.gameState.grid[actionCor];

		gamelogic.move(objectFromSelectedCor, selectedCor, actionCor);

		expect(gamelogic.gameState.grid[actionCor]).toEqual({"owner": "player1", "type": "rock", "health": 1});
		expect(gamelogic.gameState.grid[selectedCor]).toEqual({"owner": null, "type": null, "health": null});

	});

});


describe("outcome()", function () {

	var p1rock = {"owner": "player1", "type": "rock", "health": 1};
	var p2rock = {"owner": "player2", "type": "rock", "health": 1};
	var p1paper = {"owner": "player1", "type": "paper", "health": 1};
	var p2paper = {"owner": "player2", "type": "paper", "health": 1};
	var p1scissors = {"owner": "player1", "type": "scissors", "health": 1};
	var p2scissors = {"owner": "player2", "type": "scissors", "health": 1};

	var selectedCor = "hex12";
	var actionCor = "hex19";


	it("should return results object with tie outcome", function () {
		expect(gamelogic.outcome([selectedCor, p1rock], [actionCor, p2rock])).toEqual({"winner": "tie", "loser": "tie"});
		expect(gamelogic.outcome([selectedCor, p1paper], [actionCor, p2paper])).toEqual({"winner": "tie", "loser": "tie"});
		expect(gamelogic.outcome([selectedCor, p1scissors], [actionCor, p2scissors])).toEqual({"winner": "tie", "loser": "tie"});
	});

	it("should return results object with attacker as winner", function () {
		expect(gamelogic.outcome([selectedCor, p1rock], [actionCor, p2scissors])).toEqual({"winner": [selectedCor, p1rock], "loser": [actionCor, p2scissors]});
		expect(gamelogic.outcome([selectedCor, p1paper], [actionCor, p2rock])).toEqual({"winner": [selectedCor, p1paper], "loser": [actionCor, p2rock]});
		expect(gamelogic.outcome([selectedCor, p1scissors], [actionCor, p2paper])).toEqual({"winner": [selectedCor, p1scissors], "loser": [actionCor, p2paper]});
	});

	it("should return results object with attacker as loser", function () {
		expect(gamelogic.outcome([selectedCor, p1rock], [actionCor, p2paper])).toEqual({"winner": [actionCor, p2paper], "loser": [selectedCor, p1rock]});
		expect(gamelogic.outcome([selectedCor, p1paper], [actionCor, p2scissors])).toEqual({"winner": [actionCor, p2scissors], "loser": [selectedCor, p1paper]});
		expect(gamelogic.outcome([selectedCor, p1scissors], [actionCor, p2rock])).toEqual({"winner": [actionCor, p2rock], "loser": [selectedCor, p1scissors]});
	});

});  // END OF outcome() test


describe("loser()", function () {

	var p1rock = {"owner": "player1", "type": "rock", "health": 1};
	var p2rock2 = {"owner": "player2", "type": "rock", "health": 2};

	var selectedCor = "hex12";


	afterEach(function () {

		resetGameState();

	});


	it("should decrement character's health if loses", function () {
		gamelogic.gameState.grid.hex12 = p2rock2;

		expect(gamelogic.loser(selectedCor, p2rock2)).toEqual(false);
		expect(gamelogic.gameState.grid[selectedCor]).toEqual({"owner": "player2", "type": "rock", "health": 1});

	});

	it("should remove character from grid if loses and health = 0", function () {
			gamelogic.gameState.grid[selectedCor] = p1rock;

			expect(gamelogic.loser(selectedCor, p1rock)).toEqual(true);
			expect(gamelogic.gameState.grid[selectedCor]).toEqual(gamelogic.emptyBoardObject);

	});

}); // END OF loser() test


describe("initSwapOut()", function () {

	it("should initialize swap mode", function () {
		gamelogic.initSwapOut("player1", "player2");

		expect(gamelogic.gameState.gameStatus.swaps.players.first.player).toEqual("player1");
		expect(gamelogic.gameState.gameStatus.swaps.players.second.player).toEqual("player2");
		expect(gamelogic.gameState.gameStatus.swaps.numberOf).toEqual(2);
	});

});


describe("battle()", function () {

	var p1rock = {"owner": "player1", "type": "rock", "health": 1};
	var p2rock = {"owner": "player2", "type": "rock", "health": 1};
	var p2scissors = {"owner": "player2", "type": "scissors", "health": 1};
	var p2scissors2 = {"owner": "player2", "type": "scissors", "health": 2};

	var selectedCor = "hex12";
	var actionCor = "hex19";


	afterAll(function () {

		resetGameState();

	});


	it("should move attacker to defender's hex if wins", function () {
		gamelogic.gameState.grid[selectedCor] = p1rock;
		gamelogic.gameState.grid[actionCor] = p2scissors;
		gamelogic.battle(selectedCor, p1rock, actionCor, p2scissors);

		expect(gamelogic.gameState.grid[actionCor]).toEqual(p1rock);
		expect(gamelogic.gameState.grid[selectedCor]).toEqual(gamelogic.emptyBoardObject);
	});

	it("should NOT move attacker to defender's hex if defender not dead", function () {
		gamelogic.gameState.grid[selectedCor] = p1rock;
		gamelogic.gameState.grid[actionCor] = p2scissors2;
		gamelogic.battle(selectedCor, p1rock, actionCor, p2scissors2);

		expect(gamelogic.gameState.grid[selectedCor]).toEqual(p1rock);
		expect(gamelogic.gameState.grid[actionCor]).toEqual({"owner": "player2", "type": "scissors", "health": 1});
	});

	it("should initiate initSwapOut() if tied", function () {
		gamelogic.gameState.grid[selectedCor] = p1rock;
		gamelogic.gameState.grid[actionCor] = p2rock;
		gamelogic.battle(selectedCor, p1rock, actionCor, p2rock);

		expect(gamelogic.gameState.gameStatus.swaps.players.first.player).toEqual("player1");
		expect(gamelogic.gameState.gameStatus.swaps.players.second.player).toEqual("player2");
		expect(gamelogic.gameState.gameStatus.swaps.numberOf).toEqual(2);
	});

});


describe("resolveMove() that has no battle", function () {

	var selectedCor,
		objectFromSelectedCor,
		actionCor,
		objectFromActionCor;

	beforeAll(function () {

		initGameReady(); // Initialize Game Setup, characters placed, no moves made yet

	});

	afterAll(function () {

		resetGameState();

	});

	it("should NOT move character data to new hex if move NOT valid", function () {

		selectedCor = "hex2";
		objectFromSelectedCor = gamelogic.gameState.grid[selectedCor];
		actionCor = "hex27";
		objectFromActionCor = gamelogic.gameState.grid[actionCor];

		gamelogic.resolveMove(selectedCor, objectFromSelectedCor, actionCor, objectFromActionCor);

		expect(gamelogic.gameState.grid[selectedCor]).toEqual({"owner": "player1", "type": "rock", "health": 1});
		expect(gamelogic.gameState.grid[actionCor]).toEqual({"owner": null, "type": null, "health": null});
	});


	it("should move character data to new hex if hex is empty", function () {

		selectedCor = "hex2";
		objectFromSelectedCor = gamelogic.gameState.grid[selectedCor];
		actionCor = "hex7";
		objectFromActionCor = gamelogic.gameState.grid[actionCor];

		gamelogic.resolveMove(selectedCor, objectFromSelectedCor, actionCor, objectFromActionCor);

		expect(gamelogic.gameState.grid[actionCor]).toEqual({"owner": "player1", "type": "rock", "health": 1});
		expect(gamelogic.gameState.grid[selectedCor]).toEqual({"owner": null, "type": null, "health": null});

	});

	it("should have action points decremented after move", function () {

		selectedCor = "hex7";
		objectFromSelectedCor = gamelogic.gameState.grid[selectedCor];
		actionCor = "hex12";
		objectFromActionCor = gamelogic.gameState.grid[actionCor];

		expect(gamelogic.gameState.gameStatus.AP).toEqual(1); // since prev it block made move

	});

	it("should pass turn to next player if no AP are left", function () {
		gamelogic.resolveMove(selectedCor, objectFromSelectedCor, actionCor, objectFromActionCor); // make second move

		expect(gamelogic.gameState.gameStatus.currentPlayer).toEqual("player2");
	});

});


describe("resolveMove() that has battle", function () {

	var selectedCor,
		objectFromSelectedCor,
		actionCor,
		objectFromActionCor;

	beforeAll(function () {

		initBattleReady(); // Initialize Game Setup, characters placed, ready to battle

	});

	afterAll(function () {

		resetGameState();

	});


	it("should move attacker if wins", function () {

		selectedCor = "hex29";
		objectFromSelectedCor = gamelogic.gameState.grid[selectedCor];
		actionCor = "hex34";
		objectFromActionCor = gamelogic.gameState.grid[actionCor];

		gamelogic.resolveMove(selectedCor, objectFromSelectedCor, actionCor, objectFromActionCor);

		expect(gamelogic.gameState.grid[actionCor]).toEqual(objectFromSelectedCor);
		expect(gamelogic.gameState.grid[selectedCor]).toEqual(gamelogic.emptyBoardObject);

	});

	it("should have had action points decremented after move", function () {

		expect(gamelogic.gameState.gameStatus.AP).toEqual(1); // since prev it block made move

	});

	it("should destroy attacker if loses", function () {

		selectedCor = "hex34";
		objectFromSelectedCor = gamelogic.gameState.grid[selectedCor];
		actionCor = "hex38";
		objectFromActionCor = gamelogic.gameState.grid[actionCor];

		gamelogic.resolveMove(selectedCor, objectFromSelectedCor, actionCor, objectFromActionCor);

		expect(gamelogic.gameState.grid[actionCor]).toEqual({"owner": "player2", "type": "rock", "health": 1});
		expect(gamelogic.gameState.grid[selectedCor]).toEqual(gamelogic.emptyBoardObject);

	});

	it("should pass turn to next player if no AP are left", function () {
		expect(gamelogic.gameState.gameStatus.currentPlayer).toEqual("player2");
	});

});
