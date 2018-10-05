import { Component } from '@angular/core';

@Component({
    selector: 'battle',
	templateUrl: './battle.component.html',
	styles: [
		':host {margin: 50px; ' +
		'display: block;}',
		'.row {height: 100px;}',
		'.tc-battlefield{width:100%;height:100%;border:40px solid black;border-radius:6px;background:black;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-box-shadow:0 22px 43px 0 rgba(0,0,0,0.3);box-shadow:0 22px 43px 0 rgba(0,0,0,0.3)}',
		'.square {border: 1px dotted #455A64; width: 220px; height: 220px; display: inline-block; vertical-align: middle;' +
		'text-align: center;}' +
		'.top{margin-top:0}.bottom{margin-bottom:0}.left{margin-left:0}.right{margin-right:0}' +
		'button{ width:100px; height:100px;}'
	]
})
export class BattleComponent {
	public battlefield: Array<any> = [];
	winner: any;
	draw: any;
	currentPlayer: boolean = true; //true = x | false = o 
	currentPlayerLabel: any;
	public constructor() {
		this.startGame();
	}
	startGame() {
		// hard code
		this.battlefield = [
			// y: 0  y: 1  y: 2
			[null, null, null], // x: 0
			[null, null, null], // x: 1
			[null, null, null]  // x: 2
		];

		this.winner = this.draw = false;
		this.currentPlayerLabel = this.returnCurrentPlayer(this.currentPlayer);
	}

	play(x: number, y: number, currentPlayer: boolean) {
		if (typeof (this.battlefield[x][y]) !== "string") {
			if (currentPlayer)
				this.battlefield[x][y] = 'X';
			else
				this.battlefield[x][y] = 'O';

			this.checkGame(this.battlefield);
			this.currentPlayer = !this.currentPlayer;
			this.currentPlayerLabel = this.returnCurrentPlayer(this.currentPlayer);
		}
	}

	checkGame(battlefield: Array<any>) {
		let gameStatus: any = this.checkGameS(battlefield) || false;

		if (gameStatus && gameStatus.endGame) {
			gameStatus.winner = this.returnCurrentPlayer(this.currentPlayer);
			this.winner = gameStatus;
		} else if (gameStatus && gameStatus.draw) {
			this.draw = gameStatus.draw;
		}
	}

	returnCurrentPlayer(currentPlayer: any) {
		if ((currentPlayer && typeof (currentPlayer) === 'boolean') || (currentPlayer && typeof (currentPlayer) === 'string') && currentPlayer === 'X')
			return '<img src="../image/x.svg" alt="X">';
		else
			return '<img src="../image/o.svg" alt="O">';
	}

	checkForColMatch(hash: Array<any>, x: number) {
		return (hash[x][0] === hash[x][1]) && (hash[x][1] === hash[x][2]) && hash[x][2];
	}

	checkForRowMatch(hash: Array<any>, x: number) {
		return (hash[0][x] === hash[1][x]) && (hash[1][x] === hash[2][x]) && hash[2][x];
	}

	checkForXMatch(hash: Array<any>) {
		const center = hash[1][1];

		if (!center)
			return false;

		return hash[0][0] === hash[2][2] && hash[2][2] === center || hash[0][2] === hash[2][0] && hash[2][0] === center;
	}
	checkGameS(hash: Array<any>): any {
		const factor = hash.length;
		//const checkForColMatch = (hash, x) => (hash[x][0] === hash[x][1]) && (hash[x][1] === hash[x][2]) && hash[x][2];
		//const checkForRowMatch = (hash, x) => (hash[0][x] === hash[1][x]) && (hash[1][x] === hash[2][x]) && hash[2][x];

		//const checkForXMatch = (hash) => {
		//	const center = hash[1][1];

		//	if (!center)
		//		return false;

		//	return hash[0][0] === hash[2][2] && hash[2][2] === center || hash[0][2] === hash[2][0] && hash[2][0] === center;
		//};

		for (let i = 0; i < factor; i += 1) {
			if (this.checkForColMatch(hash, i) || this.checkForRowMatch(hash, i)) {
				return { endGame: true };
			}
		}

		if (this.checkForXMatch(hash))
			return { endGame: true };

		//if (hash.every(elm => elm.reduce((a, b) => !a ? a : b) !== null))
		//	return { draw: true };
		return { draw: true };
	}
}
