import { Component } from '@angular/core';
import { Part } from './Part';
import { Fruit } from './Fruit'
import { Snake } from './Snake'
import { Observable } from 'rxjs/Observable';
import { publicProperty } from '../models/publicProperty';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
@Component({
    selector: 'gamesnake',
	templateUrl: './gamesnake.component.html',
	styles: [
		':host {margin: 50px; ' +
		'box-shadow: 0 4px 5px -2px rgba(0,0,0,.2),0 7px 10px 1px rgba(0,0,0,.14),0 2px 16px 1px rgba(0,0,0,.12);' +
		'display: block;}',
		'.row {height: 28px;}',
		'.column {border: 1px dotted #455A64; width: 28px; height: 28px; display: inline-block; vertical-align: middle;' +
		'text-align: center;}'
	]
})
export class GameSnakeComponent {
	public KEYS = {
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		ESC: 27,
		SPACE_BAR: 32,
		ENTER: 13
	};

	public board: boolean[][] = [];
	public snake: Snake = { direction: 0, parts: [] };
	public fruit: Fruit = { x: 0, y: 0, type:""};
	public isStarted: boolean = false;
	public fruitType: Array<string>;
	public score: number;
	private isGameOver: boolean = true;
	private interval: number = 0;
	private tempDirection: number = 0;
	public count: number = 0;
	public display: string = "";
	public cusName: string = publicProperty.cusName;
	constructor(private router: Router, public http: Http,) {
		this.fruitType = [
			'apple',
			'avocado',
			'banana',
			'blueberries',
			'cherries',
			'grapes',
			'lemon',
			'lime',
			'orange',
			'peach',
			'pear',
			'pineapple',
			'pomegranate',
			'raspberry',
			'strawberry',
			'tomato'
		];

		this.score = 0;
		this.setupBoard();

		window.addEventListener('keyup', (e: any) => {
			switch (e.keyCode) {
				case this.KEYS.ESC:
					if (this.isStarted) {
						this.gameOver();
					}
					break;
				case this.KEYS.SPACE_BAR:
				case this.KEYS.ENTER:
					this.toggle();
					break;
				case this.KEYS.LEFT:
					if (this.snake.direction !== this.KEYS.RIGHT) {
						this.tempDirection = this.KEYS.LEFT;
					}
					break;
				case this.KEYS.UP:
					if (this.snake.direction !== this.KEYS.DOWN) {
						this.tempDirection = this.KEYS.UP;
					}
					break;
				case this.KEYS.RIGHT:
					if (this.snake.direction !== this.KEYS.LEFT) {
						this.tempDirection = this.KEYS.RIGHT;
					}
					break;
				case this.KEYS.DOWN:
					if (this.snake.direction !== this.KEYS.UP) {
						this.tempDirection = this.KEYS.DOWN;
					}
					break;
			}
		});
	}
	openModal() {


		this.display = 'block';


	}
	onCloseHandled() {
		var url = publicProperty.basURL + "Customer/Score/" + this.cusName + "/" + this.score;
		this.http.get(url).subscribe(result => {
			var resp = result.json();
			if (resp != "Update Successful") {
				alert("Update Failed");
			}
		});

		this.router.navigate(['/maingame']);
		this.display = 'none';
	}

	setupBoard() {
		this.board = [];
		for (let i = 0; i < 20; i++) {
			this.board[i] = [];
			for (let j = 0; j < 20; j++) {
				this.board[i][j] = false;
				
			}
		}
		
		this.fruit = {
			x: -1,
			y: -1,
			type: this.getFruitType()
		};
		this.snake = {
			direction: this.KEYS.LEFT,
			parts: [{
				x: -1,
				y: -1
			}]
		};
	}

	start() {
		this.isStarted = true;
		this.isGameOver = false;
		this.score = 0;
		this.interval = 150;

		this.snake.direction = this.KEYS.LEFT;
		this.snake.parts = [];
		this.tempDirection = this.KEYS.LEFT;

		for (let i: number = 0; i < 5; i++) {
			this.snake.parts.push({ x: 10 + i, y: 10 });
		}
		this.resetFruit();
		this.update();
	}

	toggle() {

		const interval = 1000;
		const duration = 10 * 1000;
		
		if (this.isStarted) {
			this.gameOver();
		} else {
			var t = Observable.timer(0, interval)
				.finally(() => {
					this.gameOver();
				})
				.takeUntil(Observable.timer(duration + interval))
				.map(value => duration - value * interval);
			t.subscribe(value => this.count = value / 1000);
			this.start();
		}
	}

	update() {
		let self: GameSnakeComponent = this;
		if (this.isStarted) {
			setTimeout(() => {
				let newHead: Part = self.getNewHead();

				if (self.boardCollision(newHead) || self.selfCollision(newHead)) {
					return self.gameOver();
				} else if (self.fruitCollision(newHead)) {
					self.eatFruit();
				}

				// remove tail
				let oldTail: any = self.snake.parts.pop();
				this.board[oldTail.y][oldTail.x] = false;
				this.board

				// pop tail to head
				self.snake.parts.unshift(newHead);
				this.board[newHead.y][newHead.x] = true;

				// do it again
				self.snake.direction = self.tempDirection;
				self.update();
			}, this.interval);
		};
	}

	gameOver() {
		this.isGameOver = true;

		setTimeout(() => {
			this.isGameOver = false;
		}, 500);

		this.isStarted = false;

		this.setupBoard();
		this.openModal();
	}

	getNewHead() {
		//let newHead: Part = _.cloneDeep(this.snake.parts[0]);
		let newHead: Part = { x: 0, y: 0 };
		newHead.x = this.snake.parts[0].x;
		newHead.y = this.snake.parts[0].y;
		// update Location
		if (this.tempDirection === this.KEYS.LEFT) {
			newHead.x -= 1;
		} else if (this.tempDirection === this.KEYS.RIGHT) {
			newHead.x += 1;
		} else if (this.tempDirection === this.KEYS.UP) {
			newHead.y -= 1;
		} else if (this.tempDirection ===this.KEYS.DOWN) {
			newHead.y += 1;
		}
		return newHead;
	}

	boardCollision(part: Part) {
		return part.x === 20 || part.x === -1 || part.y === 20 || part.y === -1;
	}

	selfCollision(part: Part) {
		return this.board[part.y][part.x];
	}

	fruitCollision(part: Part) {
		return part.x === this.fruit.x && part.y === this.fruit.y;
	}

	eatFruit() {
		this.score++;
		var tail: Part = {x:0, y:0};
		tail.x = this.snake.parts[this.snake.parts.length - 1].x;
		tail.y = this.snake.parts[this.snake.parts.length - 1].y;
		//let tail: Part = _.cloneDeep(this.snake.parts[this.snake.parts.length - 1]);
		this.snake.parts.push(tail);
		this.resetFruit();

		if (this.score % 5 === 0) {
			this.interval -= 15;
		}
	}

	resetFruit(): any {
		let x: number = Math.floor(Math.random() * 20);
		let y: number = Math.floor(Math.random() * 20);

		if (this.board[y][x]) {
			return this.resetFruit();
		}
		this.fruit = {
			x: x,
			y: y,
			type: this.getFruitType()
		};
	}

	getFruitType() {
		return this.fruitType[Math.random() * Math.floor(this.fruitType.length)];
	}

	getStyling() {
		if (this.isGameOver) {
			return "#F44336";
		}
		return "#37474F";
	}

	

	getFruit(col: number, row: number) {
		return (this.fruit.x === row && this.fruit.y === col);
	}

	getSnake(col: number, row: number) {
		return ((this.snake.parts.length > 0 && this.snake.parts[0].x === row && this.snake.parts[0].y === col) || this.board[col][row]);
	}
}
