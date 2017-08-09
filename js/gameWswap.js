/*jshint esversion: 6 */

$(function(){
	"use strict";

	// #### GAMELOGIC ####

	let gamelogic = {

		randomRPS: function() {
			let choice = Math.floor(Math.random() * (3)) + 1;
			switch (choice) {
				case 1:
					return "rock";
				case 2:
					return "paper";
				case 3:
					return "scissors";
				default:
					return "Error";
			}
		},

		validMove: function ( selectedCor, actionCor ) {
				if ( gamelogic.validMoves[selectedCor][actionCor] ) {
					return true;
				} else {
					return false;
				}
		},

		findNextPlayer: function(){
			var currentPlayerNum = gamelogic.gameState.gameStatus.currentPlayer.split("player")[1];
			var nextPlayer = "player" + (parseInt(currentPlayerNum) + 1);

			if ( gamelogic.gameState.players[nextPlayer] )
				return nextPlayer;
			else {
				return "player1";
			}
		},

		passTurn: function ( passTo ) {
			gamelogic.gameState.gameStatus.currentPlayer = passTo;
			renderGameState();
		},

		endTurn: function () {
			if ( gamelogic.gameState.gameStatus.mode === "setup" ) {
				gamelogic.gameState.gameStatus.AP = 4;
				gamelogic.passTurn( gamelogic.findNextPlayer() );
				elem.text("");
				clearTimeout(messageTimer);
				$("#message").fadeIn( "slow", displayMessage( gamelogic.gameState.gameStatus.currentPlayer + ", click anywhere on the home row to place your units. Try to remember them. You won't be able to peek until a battle.", elem));
			} else {
				gamelogic.gameState.gameStatus.AP = 2;
				gamelogic.passTurn( gamelogic.findNextPlayer() );
			}
		},

		useAP: function ( ) {
			if ( gamelogic.gameState.gameStatus.AP > 1 ) {
				gamelogic.gameState.gameStatus.AP -= 1;
			} else {
				gamelogic.gameState.gameStatus.AP -= 1;
				gamelogic.endTurn();
			}
		},

		move: function ( objectFromSelectedCor, moveFrom, moveTo ) {
			gamelogic.gameState.grid[moveTo] = objectFromSelectedCor;
			gamelogic.gameState.grid[moveFrom] = gamelogic.emptyBoardObject;
			gamelogic.useAP();
		},

		outcome: function( attacker, defender ){
			var outcome = {};

			switch (attacker[1].type + defender[1].type) {

				// rock
				case "rockrock":
					outcome = {"winner": "tie", "loser": "tie"};
					break;
				case "rockpaper":
					outcome = {"winner": defender, "loser": attacker};
					break;
				case "rockscissors":
					outcome = {"winner": attacker, "loser": defender};
					break;

				// paper
				case "paperpaper":
					outcome = {"winner": "tie", "loser": "tie"};
					break;
				case "paperrock":
					outcome = {"winner": attacker, "loser": defender};
					break;
				case "paperscissors":
					outcome = {"winner": defender, "loser": attacker};
					break;

				// scissors
				case "scissorsscissors":
					outcome = {"winner": "tie", "loser": "tie"};
					break;
				case "scissorspaper":
					outcome = {"winner": attacker, "loser": defender};
					break;
				case "scissorsrock":
					outcome = {"winner": defender, "loser": attacker};
					break;

				default:
					outcome = "ERROR";
					break;
			}

			elem.text("");
			clearTimeout(messageTimer);
			$("#message").fadeIn( "slow", displayMessage( outcome.winner[1].type + " blows up " + outcome.loser[1].type + "!", elem));

			return outcome;
		},

		loser: function( loserCor, loser ) {
			loser.health -= 1;

			if ( loser.health === 0 ) {
					gamelogic.gameState.grid[loserCor] = gamelogic.emptyBoardObject;
					return true;
			}
			return false;

		},

		endSwap: function () {
			elem.text("");
			clearTimeout(messageTimer);
			displayMessage( gamelogic.gameState.gameStatus.currentPlayer + "\'s turn! You have " + gamelogic.gameState.gameStatus.AP + " action points.", elem);
			gamelogic.passTurn( gamelogic.gameState.gameStatus.swaps.players.first.player );
			gamelogic.gameState.gameStatus.swaps.players.first.player = null;
			gamelogic.gameState.gameStatus.swaps.players.first.cor = null;
			gamelogic.gameState.gameStatus.swaps.players.second.player = null;
			gamelogic.gameState.gameStatus.swaps.players.second.cor = null;
			gamelogic.gameState.gameStatus.swaps.numberOf = null;
		},

		initSwapOut: function( currentPlayer, opponent ) {
			gamelogic.gameState.gameStatus.mode = "swap";
			gamelogic.gameState.gameStatus.swaps.players.first.player = currentPlayer;
			gamelogic.gameState.gameStatus.swaps.players.first.cor = selectedCor;
			gamelogic.gameState.gameStatus.swaps.players.second.player = opponent;
			gamelogic.gameState.gameStatus.swaps.players.second.cor = actionCor;
			gamelogic.gameState.gameStatus.swaps.holdAP = gamelogic.gameState.gameStatus.AP;
			gamelogic.gameState.gameStatus.swaps.numberOf = 2;
			renderGameState();
		},

		battle: function( selectedCor, objectFromSelectedCor, actionCor, objectFromActionCor ) {
			let players = gamelogic.gameState.players;
			let attacker = [selectedCor, objectFromSelectedCor];
			let defender = [actionCor, objectFromActionCor];

			let outcome = gamelogic.outcome( attacker, defender);
			let winner = outcome.winner;
			let loser = outcome.loser;

			if ( winner === loser ) {
				elem.text("");
				clearTimeout(messageTimer);
				displayMessage("You two are evenly matched with your " + attacker[1].type + ". " + attacker[1].owner + ", swap from your reserve!", elem);
				gamelogic.useAP();
				gamelogic.initSwapOut(objectFromSelectedCor.owner, objectFromActionCor.owner);
			} else {
				let died = gamelogic.loser(loser[0], loser[1]); // loser(loserCor, loserObj)

				elem.text("");
				clearTimeout(messageTimer);
				displayMessage( players[loser[1].owner].name + "\'s " + loser[1].type + " was decimated!! " + players[winner[1].owner].name + "\'s " + winner[1].type + " reign victorious!!", elem);
				if ( winner === attacker && died ) {
					gamelogic.move( winner[1], winner[0], loser[0] ); // move (winnerObj, winnerCor, loserCor)
				} else {
					gamelogic.useAP();
				}
				checkGameState();
			} // ### END OF ELSE

		},

		resolveMove: function ( selectedCor, objectFromSelectedCor, actionCor, objectFromActionCor ) {
			if ( gamelogic.validMove( selectedCor, actionCor) ) {
				if ( objectFromActionCor.owner === null ) {
					gamelogic.move(objectFromSelectedCor, selectedCor, actionCor);
				} else {
				 gamelogic.battle(selectedCor, objectFromSelectedCor, actionCor, objectFromActionCor);
				}
			}
		},

		returnTrue: function() {
				return true;
			},

		emptyBoardObject: { "owner": null, "type": null, "health": null },

		validMoves: {
				"hex1": {
								 "hex2": true,
								 "hex5": true,
								 "hex6": true
								},
				"hex2": {
								 "hex1": true,
								 "hex6": true,
								 "hex7": true,
								 "hex3": true
								},
				"hex3": {
								 "hex2": true,
								 "hex7": true,
								 "hex8": true,
								 "hex4": true
								},
				"hex4": {
								 "hex3": true,
								 "hex8": true,
								 "hex9": true
							 },
				"hex5": {
								 "hex10": true,
								 "hex1": true,
								 "hex6": true
							 },
				"hex6": {
								 "hex1": true,
								 "hex2": true,
								 "hex5": true,
								 "hex7": true,
								 "hex10": true,
								 "hex11": true
							 },
				"hex7": {
								 "hex2": true,
								 "hex3": true,
								 "hex6": true,
								 "hex8": true,
								 "hex12": true,
								 "hex11": true
							 },
				"hex8": {
								 "hex3": true,
								 "hex4": true,
								 "hex7": true,
								 "hex9": true,
								 "hex13": true,
								 "hex12": true
							 },
				"hex9": {
								 "hex4": true,
								 "hex8": true,
								 "hex14": true,
								 "hex13": true
							 },
				"hex10": {
								 "hex5": true,
								 "hex6": true,
								 "hex11": true,
								 "hex16": true,
								 "hex15": true
							 },
				"hex11": {
								 "hex7": true,
								 "hex6": true,
								 "hex10": true,
								 "hex12": true,
								 "hex17": true,
								 "hex16": true
							 },
				"hex12": {
								 "hex8": true,
								 "hex7": true,
								 "hex11": true,
								 "hex13": true,
								 "hex18": true,
								 "hex17": true
							 },
				"hex13": {
								 "hex8": true,
								 "hex9": true,
								 "hex12": true,
								 "hex14": true,
								 "hex19": true,
								 "hex18": true
							 },
				"hex14": {
								 "hex9": true,
								 "hex13": true,
								 "hex19": true
							 },
				"hex15": {
								 "hex10": true,
								 "hex16": true,
								 "hex20": true
							 },
				"hex16":{
								 "hex10": true,
								 "hex11": true,
								 "hex15": true,
								 "hex17": true,
								 "hex20": true,
								 "hex21": true
							 },
				"hex17":{
								 "hex12": true,
								 "hex11": true,
								 "hex16": true,
								 "hex18": true,
								 "hex22": true,
								 "hex21": true
							 },
				"hex18":{
								 "hex13": true,
								 "hex12": true,
								 "hex17": true,
								 "hex19": true,
								 "hex22": true,
								 "hex23": true
							 },
				"hex19":{
								 "hex14": true,
								 "hex13": true,
								 "hex18": true,
								 "hex23": true,
								 "hex24": true,
							 },
				"hex20":{
								 "hex15": true,
								 "hex16": true,
								 "hex21": true,
								 "hex26": true,
								 "hex25": true
							 },
				"hex21":{
								 "hex16": true,
								 "hex17": true,
								 "hex20": true,
								 "hex22": true,
								 "hex27": true,
								 "hex26": true
							 },
				"hex22":{
								 "hex17": true,
								 "hex18": true,
								 "hex21": true,
								 "hex23": true,
								 "hex27": true,
								 "hex28": true
							 },
				"hex23":{
								 "hex18": true,
								 "hex19": true,
								 "hex22": true,
								 "hex24": true,
								 "hex28": true,
								 "hex29": true
							 },
				"hex24":{
								 "hex19": true,
								 "hex23": true,
								 "hex29": true
							 },
				"hex25":{
								 "hex20": true,
								 "hex26": true,
								 "hex30": true
							 },
				"hex26":{
								 "hex21": true,
								 "hex20": true,
								 "hex25": true,
								 "hex27": true,
								 "hex31": true,
								 "hex30": true
							 },
				"hex27":{
								 "hex22": true,
								 "hex21": true,
								 "hex26": true,
								 "hex28": true,
								 "hex32": true,
								 "hex31": true
							 },
				"hex28":{
								 "hex23": true,
								 "hex22": true,
								 "hex27": true,
								 "hex29": true,
								 "hex32": true,
								 "hex33": true
							 },
				"hex29":{
								 "hex23": true,
								 "hex24": true,
								 "hex28": true,
								 "hex33": true,
								 "hex34": true
							 },
				"hex30":{
								 "hex26": true,
								 "hex25": true,
								 "hex31": true,
								 "hex35": true
							 },
				"hex31":{
								 "hex27": true,
								 "hex26": true,
								 "hex30": true,
								 "hex32": true,
								 "hex35": true,
								 "hex36": true
							 },
				"hex32":{
								 "hex28": true,
								 "hex27": true,
								 "hex31": true,
								 "hex33": true,
								 "hex36": true,
								 "hex37": true
							 },
				"hex33":{
								 "hex29": true,
								 "hex28": true,
								 "hex32": true,
								 "hex34": true,
								 "hex37": true,
								 "hex38": true
							 },
				"hex34":{
								 "hex29": true,
								 "hex33": true,
								 "hex38": true
							 },
				"hex35":{
								 "hex30": true,
								 "hex31": true,
								 "hex36": true
							 },
				"hex36":{
								 "hex31": true,
								 "hex32": true,
								 "hex35": true,
								 "hex37": true
							 },
				"hex37":{
								 "hex32": true,
								 "hex33": true,
								 "hex36": true,
								 "hex38": true
							 },
				"hex38":{
								 "hex33": true,
								 "hex34": true,
								 "hex37": true
							 },
				},

				gameState: {
							"players": {
								"player1": {
									"name": "Player1",
									"avatarLink": "images/agents/panda.gif",
									"reserve": {
										"unit1": "scissors",
										"unit2": "rock",
										"unit3": "paper",
										"unit4": "scissors",
										"unit5": "rock",
										"unit6": "paper"
									}
								},
								"player2": {
									"name": "Player2",
									"avatarLink": "images/agents/rainbowsheep.gif",
									"reserve": {
										"unit1": "scissors",
										"unit2": "rock",
										"unit3": "paper",
										"unit4": "scissors",
										"unit5": "rock",
										"unit6": "paper"
									}
								}
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
								"AP": 4,
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
				}
	}; // END OF const gamelogic =

// ^^^^^ END OF GAMELOGIC ^^^^^


	let selectedCor = "";
	let actionCor = "";
	const elem = $("#message").find('p');
	let messageTimer;

	const unitList = {
		unit1: "scissors",
		unit2: "rock",
		unit3: "paper",
		unit4: "scissors",
		unit5: "rock",
		unit6: "paper"
	};

	const imageList = {
		rock: "images/rock.png",
		paper: "images/paper.png",
		scissors: "images/scissors.png"
	};


	function showExplosion( loserCor ) {
		// $('#'+loserCor).remove($('#'+loserCor));
		// $parent.append("<div class='notAllowed' id='hex18'>18<img src='" + "images/explosion.gif" + "' alt='Big Explosion'></div>");
		// $hex.hide().show(0);
	}


	// $('*').on("click", function(){   // turn on to see what you're clicking
	// 	console.log($(this));
	// });

	// #### CIRCLE RESERVE MENU ####
	function compileReserveMenu () {
		let atLeastOneLeft = false;
		let currentPlayer = gamelogic.gameState.gameStatus.currentPlayer;
		let reserve = gamelogic.gameState.players[currentPlayer].reserve;

		for ( var unit in reserve ) {
			if ( reserve[unit] ) {
				atLeastOneLeft = true;
				$('#'+unit).removeClass("hide");
			} else {
				$('#'+unit).addClass("hide");
			}
		}

		if ( !atLeastOneLeft ) {
			gamelogic.gameState.gameStatus.swaps.numberOf -= 1;
			if ( gamelogic.gameState.gameStatus.swaps.numberOf === 0 ) {

				gamelogic.endSwap();

			} else {
				elem.text("");
				clearTimeout(messageTimer);
				displayMessage(gamelogic.gameState.gameStatus.swaps.players.second.player + "! Now you swap from your reserve!", elem);
				gamelogic.passTurn(gamelogic.gameState.gameStatus.swaps.players.second.player );
			}
		}
	}

	function openReserveMenu( hexClicked, ev ) {
		compileReserveMenu();
		var reserveMenuWrapperHeight = $('#reserve').css("height");
		var reserveMenuWrapperWidth = $('#reserve').css("width");
		var top = ( parseInt(ev.pageY) - (parseInt(reserveMenuWrapperHeight) /2) -9 ); // -15 is to fix offset center
		var left = ( parseInt(ev.pageX) - (parseInt(reserveMenuWrapperWidth) /2) +20);

		$('#reserve').css({"top": top, "left": left});

		$('.menu-btn').toggleClass('clicked');
		$('#reserve').toggleClass('hide');
		$('.modalbackground').toggleClass('hide');
		$('.menu').toggleClass('open');
	}


	$('#close').click(function () {
		$(this).toggleClass('clicked');
	  $('.menu').toggleClass('open').delay(100).queue(function(next){
			$('#reserve').toggleClass('hide');
			$('.modalbackground').toggleClass('hide');
			next();
		});
	});




		$('#grid').on('click', 'div', function(){  // highlight valid moves when player's character is clicked
		let mode = gamelogic.gameState.gameStatus.mode;
		let currentPlayer = gamelogic.gameState.gameStatus.currentPlayer;

		// clearHighlighted();

		if ( mode === "turn") {
			if ( $(this).hasClass("canMove") ) {
				actionCor = $(this).attr('id');
			} else {
				selectedCor = $(this).attr('id');
			}
		} else {
			selectedCor = $(this).attr('id');
		}
		renderGameState();
		if ( mode != "swap" ){
			if ( gamelogic.gameState.grid[selectedCor] ) {
				if ( currentPlayer === gamelogic.gameState.grid[selectedCor].owner ) {
					for ( let move in gamelogic.validMoves[selectedCor] ) {
						if ( !gamelogic.gameState.grid[move].owner || gamelogic.gameState.grid[move].owner === gamelogic.findNextPlayer(currentPlayer)) {
							$('#' + move).addClass("canMove");   // highlight valid moves
							$('#' + move).removeClass("notAllowed");   // remove no allow clicking cursor
						}
					}
				}
			}
		}
	});



	function reserveMenuClickEventOn(){
		$("#grid").on("click", "[has-ripple='true']", function (ev) {
			if ( !$(this).find("#"+selectedCor).hasClass("notAllowed") ) {
				if ( $('.menu').hasClass('open') ) {
					$('#close').toggleClass('clicked');
					$('#reserve').toggleClass('hide');
					$('.modalbackground').toggleClass('hide');
					$('.menu').toggleClass('open').delay(100).queue(function(next) {
						openReserveMenu(this, ev);
						next();
					});
				} else {
					openReserveMenu(this, ev);
				}
			}
		});
	}


 function moveClickEventOn(){  // Attempts to Moves
		$('#grid').on('click', '.canMove', function(){  // attempt to move character
			let grid = gamelogic.gameState.grid;
			let actionCor = $(this).attr('id');

			let moveThenRender = new Promise(function(resolve, reject){
				gamelogic.resolveMove(selectedCor, grid[selectedCor], actionCor, grid[actionCor]);
			});

			moveThenRender.then(renderGameState());

		});
	}


// #### WHEN ITEM IN RESERVE MENU IS CLICKED ####
		$('.menu a').each(function (index) {
		  var thismenuItem        = $(this);

		  thismenuItem.click(function (event) {
		    event.preventDefault();
				let mode = gamelogic.gameState.gameStatus.mode;
				let owner = gamelogic.gameState.gameStatus.currentPlayer;
				let unit = thismenuItem.parent().attr('id');
				let type = unitList[unit];

				if ( mode === "swap" ) {
					let firstMatch = true;
					let characterToPutAway;
					// do swappy stuff


					if ( gamelogic.gameState.gameStatus.swaps.numberOf === 2 ) {
						characterToPutAway = gamelogic.gameState.grid[gamelogic.gameState.gameStatus.swaps.players.first.cor].type;
							for ( let unitNum in unitList ) {
								if ( unitList[unitNum] === characterToPutAway && firstMatch) {
									gamelogic.gameState.players[gamelogic.gameState.gameStatus.swaps.players.first.player].reserve[unitNum] = unitList[unitNum];
									firstMatch = false;
								}
							}
							thismenuItem.parent().addClass("hide");

							gamelogic.gameState.grid[gamelogic.gameState.gameStatus.swaps.players.first.cor] = {owner: owner, type: type, health: 1};
							gamelogic.gameState.players[owner].reserve[unit] = null;

							$('.menuitem-wrapper').eq(index).addClass('spin');

					    var timer = setTimeout(function () {
					      $('.menuitem-wrapper').eq(index).removeClass('spin')
									.queue(function(next){
											renderGameState();
											next();
									});
					      $('.menu').removeClass('open');
					      $('.menu-btn').removeClass('clicked');
								$('#reserve').toggleClass('hide');
								$('.modalbackground').toggleClass('hide');
					    }, 100);

							gamelogic.gameState.gameStatus.swaps.numberOf -= 1;
							if ( gamelogic.gameState.gameStatus.swaps.numberOf === 0 ) {

								gamelogic.endSwap();

							} else {
								elem.text("");
								clearTimeout(messageTimer);
								displayMessage(gamelogic.gameState.gameStatus.swaps.players.second.player + "! Now you swap from your reserve!", elem);
								gamelogic.passTurn(gamelogic.gameState.gameStatus.swaps.players.second.player );
							}

					} else {
						characterToPutAway = gamelogic.gameState.grid[gamelogic.gameState.gameStatus.swaps.players.second.cor].type;
							for ( let unitNum in unitList ) {
								if ( unitList[unitNum] === characterToPutAway && firstMatch) {
									gamelogic.gameState.players[gamelogic.gameState.gameStatus.swaps.players.second.player].reserve[unitNum] = unitList[unitNum];
									firstMatch = false;
								}
							}
							thismenuItem.parent().addClass("hide");

							gamelogic.gameState.grid[gamelogic.gameState.gameStatus.swaps.players.second.cor] = {owner: owner, type: type, health: 1};
							gamelogic.gameState.players[owner].reserve[unit] = null;
							$('.menuitem-wrapper').eq(index).addClass('spin');

							var timer2 = setTimeout(function () {
								$('.menuitem-wrapper').eq(index).removeClass('spin')
									.queue(function(next){
											renderGameState();
											next();
									});
								$('.menu').removeClass('open');
								$('.menu-btn').removeClass('clicked');
								$('#reserve').toggleClass('hide');
								$('.modalbackground').toggleClass('hide');
							}, 100);

							gamelogic.gameState.gameStatus.swaps.numberOf -= 1;
							if ( gamelogic.gameState.gameStatus.swaps.numberOf === 0 ) {
								gamelogic.passTurn( gamelogic.gameState.gameStatus.swaps.players.first.player );
								gamelogic.endSwap();
							} else {
								gamelogic.passTurn(gamelogic.gameState.gameStatus.swaps.players.second.player );
							}

					}

// IF SETUP MODE
				} else if ( mode === "setup" ) {

					thismenuItem.parent().addClass("hide");

					gamelogic.gameState.grid[selectedCor] = {owner: owner, type: type, health: 1};
					gamelogic.gameState.players[owner].reserve[unit] = null;


			    $('.menuitem-wrapper').eq(index).addClass('spin');

			    var timer1 = setTimeout(function () {
			      $('.menuitem-wrapper').eq(index).removeClass('spin')
							.queue(function(next){
								if ( gamelogic.gameState.gameStatus.mode === "swap" ) {
									renderGameState();
									next();
								} else {
									gamelogic.gameState.gameStatus.AP -= 1;
									renderGameState();
									next();
								}
							});
			      $('.menu').removeClass('open');
			      $('.menu-btn').removeClass('clicked');
						$('#reserve').toggleClass('hide');
						$('.modalbackground').toggleClass('hide');
			    }, 100);
					renderGameState();
				}
		  });
		}); // END OF RESERVE MENU CLICK HANDLER

// ^^^^ END OF CIRCLE MENU ^^^^


// #### DISPLAY MESSAGES IN MESSAGE WINDOW ####

function displayMessage(message, elem){

  if(message.length >0){
      //append first character
      elem.append(message[0]);
      messageTimer = setTimeout(
          function(){
              //Slice text by 1 character and call function again
              displayMessage(message.slice(1), elem, 25);
           },25
          );
	  }
	}

	function checkForMsgs() {
		var currentPlayer = gamelogic.gameState.gameStatus.currentPlayer;
		var players = gamelogic.gameState.players;
		var mode = gamelogic.gameState.gameStatus.mode;
		var ap = gamelogic.gameState.gameStatus.AP;

		// SETUP mode
		if ( mode === "setup" ) {
			elem.text("");
			clearTimeout(messageTimer);
			$("#message").fadeIn( "slow", displayMessage( players[currentPlayer].name + ", click anywhere on the home row to place your units. Try to remember them. You won't be able to peek until a battle.", elem));
			if ( currentPlayer === "player1" ) {
			}
		} else if ( mode === "turn" ) {
			elem.text("");
			clearTimeout(messageTimer);
			$("#message").fadeIn( "slow", displayMessage( players[currentPlayer].name + ", click one of your units and choose where to move or attack. You have " + ap + " action points to use.", elem));
		}
	} // ^^^^^^ END OF CHECK MESSAGES ^^^^^^


	function gamewinChecker() {
		let found1 = false;
		let found2 = false;
		let winner;
		let loser;

		for ( let grid in gamelogic.gameState.grid ) {
			if ( grid.owner && !found1) {
				found1 = true;
				winner = grid.owner;
			} else if ( grid.owner && !found2 ) {
				found2 = true;
				winner = null;
			}
		}
		if ( found1 === found2 ) {
			return false;
		} else {
			for ( let player in gamelogic.gameState.players ) {
				if ( player != winner ) {
					loser = player;
				}
			}
		}

		return {winner: winner, loser: loser};
	}

	function checkGameState() {
		var currentPlayer = gamelogic.gameState.gameStatus.currentPlayer;
		var mode = gamelogic.gameState.gameStatus.mode;
		var ap = gamelogic.gameState.gameStatus.AP;

		// SETUP MODE
				if ( mode === "setup" ) {
					reserveMenuClickEventOn();
					if ( ap > 0 ) { // if still has action points left
						if ( currentPlayer === "player1" ) {  // see who's placing characters
							for ( let i = 0; i <=4; i++ ) {
								$("#hex" + i).addClass("canMove");
								$("#hex" + i).parent().removeClass("notAllowed");
								$("#hex" + i).removeClass("notAllowed");
							}
						} else if ( currentPlayer === "player2" ) {  // see who's placing characters
							for ( let i = 35; i <=38; i++ ) {
								$("#hex" + i).addClass("canMove");
								$("#hex" + i).parent().removeClass("notAllowed");
								$("#hex" + i).removeClass("notAllowed");
							}
						}

					} else {
						if ( gamelogic.findNextPlayer(currentPlayer) === "player1" ) {
							gamelogic.gameState.gameStatus.mode = "turn";

							elem.text("");
							clearTimeout(messageTimer);
							$("#message").fadeIn( "slow", displayMessage( gamelogic.findNextPlayer(currentPlayer) + ", click one of your units and choose where to move or attack. You have " + 2 + " action points to use.", elem));

							moveClickEventOn();
							$("#grid").off("click", "[has-ripple='true']"); // TURN OFF reserveClickEvent
						}
						gamelogic.endTurn();
					}

		// TURN MODE
				} else if ( mode === "turn" ) {
					moveClickEventOn();


		// SWAP mode
				} else if ( mode === "swap" && gamelogic.gameState.gameStatus.swaps.numberOf > 0 ) {
					// $('#grid').off('click', 'div'); // TURNS OFF valid move highlighter
					reserveMenuClickEventOn();

					if ( gamelogic.gameState.gameStatus.swaps.numberOf === 2 ) {
						$('#grid').find('#'+gamelogic.gameState.gameStatus.swaps.players.first.cor).addClass("canMove");
						$('#grid').find('#'+gamelogic.gameState.gameStatus.swaps.players.first.cor).removeClass("notAllowed");
					}

					if ( gamelogic.gameState.gameStatus.swaps.numberOf === 1 ) {
						$('#grid').find('#'+gamelogic.gameState.gameStatus.swaps.players.second.cor).addClass("canMove");
						$('#grid').find('#'+gamelogic.gameState.gameStatus.swaps.players.second.cor).removeClass("notAllowed");
					}


					// $("[has-ripple='true']").trigger("click");
						// gamelogic.gameState.gameStatus.swaps.players.second.player = opponent;
						// 	gamelogic.gameState.gameStatus.swaps.players.second.cor = cors;
				} else {
					gamelogic.gameState.gameStatus.mode = "turn";
					renderGameState();
				}

// 				let gameResult = gamewinChecker();
// console.log(gameResult);
// 				if ( gameResult.winner ) {
//
// 					elem.text("");
// 					clearTimeout(messageTimer);
// 					displayMessage("congratulations, " + gameResult.winner, "!!! You annihilated " + gameResult.loser + "!! Play again?", elem);
// 					$("#restartGame").removeClass("hide");
//
// 				}
	}


	function renderGameState() {
		let currentPlayer = gamelogic.gameState.gameStatus.currentPlayer;
		let mode = gamelogic.gameState.gameStatus.mode;
		let ap = gamelogic.gameState.gameStatus.AP;
		let $li;

		$("#grid").off("click", "[has-ripple='true']"); // TURN OFF reserveClickEvent
		// $('#grid').off('click', 'div'); // TURNS OFF validMoveClickEvent
		$('#grid').off('click', '.canMove'); // TURNS OFF attemptToMoveClickEvent

		$('#grid').empty(); // clear the grid before render
		$('#grid').append("<li class='pusher'></li><li has-ripple='true'><div class='notAllowed' id='hex35'>35</div></li><li has-ripple='true'><div class='notAllowed' id='hex36'>36</div></li><li has-ripple='true'><div class='notAllowed' id='hex37'>37</div></li><li has-ripple='true'><div class='notAllowed' id='hex38'>38</div></li><li has-ripple='true'><div class='notAllowed' id='hex30'>30</div></li><li has-ripple='true'><div class='notAllowed' id='hex31'>31</div></li><li has-ripple='true'><div class='notAllowed' id='hex32'>32</div></li><li has-ripple='true'><div class='notAllowed' id='hex33'>33</div></li><li has-ripple='true'><div class='notAllowed' id='hex34'>34</div></li><li has-ripple='true'><div class='notAllowed' id='hex25'>25</div></li><li has-ripple='true'><div class='notAllowed' id='hex26'>26</div></li><li has-ripple='true'><div class='notAllowed' id='hex27'>27</div></li><li has-ripple='true'><div class='notAllowed' id='hex28'>28</div></li><li has-ripple='true'><div class='notAllowed' id='hex29'>29</div></li><li has-ripple='true'><div class='notAllowed' id='hex20'>20</div></li><li has-ripple='true'><div class='notAllowed' id='hex21'>21</div></li><li has-ripple='true'><div class='notAllowed' id='hex22'>22</div></li><li has-ripple='true'><div class='notAllowed' id='hex23'>23</div></li><li has-ripple='true'><div class='notAllowed' id='hex24'>24</div></li><li has-ripple='true'><div class='notAllowed' id='hex15'>15</div></li><li has-ripple='true'><div class='notAllowed' id='hex16'>16</div></li><li has-ripple='true'><div class='notAllowed' id='hex17'>17</div></li><li has-ripple='true'><div class='notAllowed' id='hex18'>18</div></li><li has-ripple='true'><div class='notAllowed' id='hex19'>19</div></li><li has-ripple='true'><div class='notAllowed' id='hex10'>10</div></li><li has-ripple='true'><div class='notAllowed' id='hex11'>11</div></li><li has-ripple='true'><div class='notAllowed' id='hex12'>12</div></li><li has-ripple='true'><div class='notAllowed' id='hex13'>13</div></li><li has-ripple='true'><div class='notAllowed' id='hex14'>14</div></li><li has-ripple='true'><div class='notAllowed' id='hex5'>5</div></li><li has-ripple='true'><div class='notAllowed' id='hex6'>6</div></li><li has-ripple='true'><div class='notAllowed' id='hex7'>7</div></li><li has-ripple='true'><div class='notAllowed' id='hex8'>8</div></li><li has-ripple='true'><div class='notAllowed' id='hex9'>9</div></li><li has-ripple='true'><div class='notAllowed' id='hex1'>1</div></li><li has-ripple='true'><div class='notAllowed' id='hex2'>2</div></li><li has-ripple='true'><div class='notAllowed' id='hex3'>3</div></li><li has-ripple='true'><div class='notAllowed' id='hex4'>4</div></li><li class='pusher'></li>");

		for ( let hex in gamelogic.gameState.grid ) {
				let gridHex = gamelogic.gameState.grid[hex];
				if ( gridHex.owner ) {
					$li = $("#"+hex).parent();
					$li.addClass("up");
					$li.append("<span class='notAllowed'></span>");

					if (mode === "turn" && gridHex.owner === currentPlayer ) {
						$("#"+hex).removeClass("notAllowed");
						$li.removeClass("notAllowed");
					} else {
						$("#"+hex).addClass("notAllowed");
					}
//imageList[gridHex.type]
					$("#"+hex).append("<img src='" + gamelogic.gameState.players[gridHex.owner].imageList[gridHex.type] + "' alt='Unit is Here'/>");
					}
		}


		let reserve = gamelogic.gameState.players[currentPlayer].reserve;

		for ( let unit in reserve ) {  // hide\show reserve menu items depending on reserve object
			if ( unit ) {
				$('#' + unit).removeClass("hide");
			} else {
				$('#' + unit).addClass("hide");
			}
		}

		checkGameState();
	}


	function clearHighlighted() {
		$('.canMove').removeClass("canMove").addClass("notAllowed");
	}


	// (function(){   // setup and put the game into turn mode
	// 	let game = gamelogic.gameState;
	//
	// 	game.players.player1.reserve.unit1 = null;
	// 	game.players.player1.reserve.unit2 = null;
	// 	game.players.player1.reserve.unit3 = null;
	// 	game.players.player1.reserve.unit4 = null;
	//
	// 	game.grid.hex16 = {"owner": "player1", "type": "scissors", "health": 1};
	// 	game.grid.hex17 = {"owner": "player1", "type": "rock", "health": 1};
	// 	game.grid.hex18 = {"owner": "player1", "type": "paper", "health": 1};
	// 	game.grid.hex19 = {"owner": "player1", "type": "scissors", "health": 1};
	//
	//
	// 	game.players.player2.reserve.unit1 = null;
	// 	game.players.player2.reserve.unit2 = null;
	// 	game.players.player2.reserve.unit3 = null;
	// 	game.players.player2.reserve.unit4 = null;
	//
	// 	game.grid.hex20 = {"owner": "player2", "type": "scissors", "health": 1};
	// 	game.grid.hex21 = {"owner": "player2", "type": "rock", "health": 1};
	// 	game.grid.hex22 = {"owner": "player2", "type": "paper", "health": 1};
	// 	game.grid.hex23 = {"owner": "player2", "type": "scissors", "health": 1};
	//
	// 	game.gameStatus.mode = "turn";
	// 	game.gameStatus.AP = 2;
	//
	// 	$("#grid").off("click", "[has-ripple='true']"); // TURN OFF reserveClickEvent
	//
	// })();

	checkForMsgs();
	renderGameState();


}); // End of jQuery
