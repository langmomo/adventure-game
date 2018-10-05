import { Component, ViewChild, ElementRef } from '@angular/core';
import { Map } from './map';
import { Router, NavigationExtras } from '@angular/router';
import { Http } from '@angular/http';
import { publicProperty } from '../models/publicProperty';
import "rxjs/add/observable/timer";
import "rxjs/add/operator/finally";
import "rxjs/add/operator/takeUntil";
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { ModalDirective } from 'ngx-bootstrap';
import { timer } from 'rxjs/observable/timer';
@Component({
    selector: 'maingame',
	templateUrl: './maingame.component.html',
	styles: [
		':host {margin: 50px; ' +
		'display: block;}',
		'.row {height: 80px;}',
		'.column { width: 80px; height: 100px; display: inline-block; vertical-align: middle;' +
		'text-align: center;}' +
		'button{ width:80px; height:80px;}'
	]

})
export class MainGameComponent {
	public gameArray = [
		"snake",
		"shop",
		"sleep",
		"back",
		"forward",
		"empty"
	]
	public endGame: boolean=false;
	public board: boolean[][] = [];
	public game: string[][] = [];
	public statue: boolean[][] = [];
	//public state: number = 0;
	public map: Map[] = [];
	public p: number = 0;
	public showNum: number = 1;
	public isSelect: boolean= false;
	public x: number = 0;
	public y: number = 0;
	public state: string = "";
	public story: string = "";
	public scene: string = "";
	public cusName: string = publicProperty.cusName;
	public count: number = 10;
	public display: boolean = true;
	public needSleep: boolean = true;
	public tools: Array<string> = [];
	public tool: boolean = false;
	public show: string = "";
	public time: number = 0;
	public coin: number = 0;
	public storys: Array<string> = [];
	public rank: string = "";
	public timer: any;
	public availTool: Array<string> = [];
	@ViewChild("btn") template: ElementRef;
	public constructor(private router: Router, public http: Http, private elementRef: ElementRef, ) {
		
		this.show = "block";
		var url = publicProperty.basURL + "Map";
		console.log(url);
		this.http.get(url).subscribe(result => {
			this.map = result.json();
			
		});
		this.setupBoard();
		this.setGame();
		console.log("cusName:" + this.cusName);
		if (publicProperty.cusName == "") {
			alert("Please click restart!");
			this.p = 1;
		} else {
			this.http.get(publicProperty.basURL+ "customer/"+ publicProperty.cusName).subscribe(result => {
				var item = result.json();
				if (item != "Not Found") {
					var ind = this.map.findIndex(_ => _.x == item.x && _.y == item.y);
					if (ind != -1) {
						this.statue[item.x][item.y] = true;
						console.log("current time is " + item.time);
						this.p = ind;
						console.log("current position is" + ind);
					}
					
				}
			});
			var time = 0;
			this.http.get(publicProperty.basURL + "customer/" + publicProperty.cusName + "/info").subscribe(result => {
				var resp = result.json();
				time = resp.time;
				this.coin = resp.coin;
				this.tools = resp.tool;
				
			});
			this.getTool();
			this.timer = Observable.timer(1, 1000).subscribe(t => {
				this.time = t+time;
			});
			//this.time = time;
			//console.log(this.time);
			
			
		}
		
	}
	ngAfterViewInit() {
		if (publicProperty.cusName != "") {
			this.getTool();
		}
		else {
			this.tool = false;
			this.tools = [];
		}
			
		console.log(this.template);
		var ele = this.elementRef.nativeElement.querySelector('button');
		console.log(ele);
		//this.renderer.setElementAttribute
	}
	// fill the the map
	setupBoard() {
		this.board = [];
		for (let i = 0; i < 5; i++) {
			this.board[i] = [];
			
			for (let j = 0; j < 6; j++) {
				
				if (i % 2 == 0)
					this.board[i][j] = true;
				else
					this.board[i][j] = false;
			}
		}
		this.board[1][5] = true;
		this.board[3][0] = true;
		//this.setMap();
	}
	//setMap() {
	//	var n = 0;
	//	for (let i = 0; i < 6; i++) {
	//		n++;
	//		this.map.push({
	//			x: 0, y: i, color: "blue", story:"story" + n});
	//	}
	//	this.map.push({ x: 1, y: 5, color: "blue", story: "story" + n++ });
	//	for (let i = 5; i >=0; i --) {

	//		this.map.push({ x: 2, y: i, color: "blue", story: "story" + n++});
	//	}
	//	this.map.push({ x: 3, y: 0, color: "blue", story: "story" + n++});
	//	for (let i = 0; i < 6; i++) {

	//		this.map.push({ x: 4, y: i, color: "blue", story: "story" + n++});
	//	}
	//}
	//getMapInd(x: number, y: number) {
	//	var ind = this.map.findIndex(_ => _.x == x && _.y == y);
	//	console.log("ind nodw:" + ind);
	//	return ind
	//}
	getMap(x: number, y: number) {
		//return this.board[x][y];
		//for (var ind in this.map) {
		//	if (this.map[ind].x == x && this.map[ind].y == y) {
		//		return true;
		//	} else {
		//		return false;
		//	}
		//}
		var ind = this.map.findIndex(_ => _.x == x && _.y == y);
		if (ind == -1) {
			return false;
		} else {
			return true;
		}
	}

	setGame() {
		for (let i = 0; i < 5; i++) {
			this.game[i] = [];
			this.statue[i] = []
			for (let j = 0; j < 6; j++) {
				this.statue[i][j] = false;
				if (this.board[i][j] == true) {
					//var num = Math.floor(Math.random() * Math.floor(6));
					//var name = this.gameArray[num
					//var x = this.map[n];
					var ind = this.map.findIndex(_ => _.x == j && _.y == i);
					
					//this.game[i][j] = this.map[ind].story;
				}
			}
		}
	}

	getGame() {
		
		if (!this.endGame) {
			this.setGame();
			var count = this.map.length;
			
			this.showNum = Math.floor(Math.random() * 5) + 1;
			//var ind = this.map.findIndex(_ => _.x == x && _.y == y);
			this.p = this.p + this.showNum;

			if (this.p > count - 1) {
				this.p = count - 1;
				this.endGame = true
			}
			
			this.x = this.map[this.p].x;
			
			this.y = this.map[this.p].y;
			this.statue[this.x][this.y] = true;
			
			this.state = this.game[this.x][this.y];
			if (this.map[this.p].color == "pink") {
				alert("meet trap");
				this.map[this.p].color = "blue";
			}
			this.story = this.map[this.p].story;
			this.scene = this.map[this.p].scene;
		}
	}

	getStatue(x: number, y: number) {
		return this.statue[x][y];
	}

	getEnd() {
		if (this.story == "Congradulation, you complete all tests!") {
			this.timer.unsubscribe();
			this.checkRecord();
			return true;
		} else {
			return false;
		}
		//return this.endGame;
	}
	updateTime() {
		var url = publicProperty.basURL + "Customer/TIME/" + publicProperty.cusName + "/" + this.time;
		this.http.get(url).subscribe(result => {
			var resp = result.json();
		})
	}
	redirectToGame() {
		this.updateMap();
		this.updateTime();
		if (this.scene == "snakegame") {
			this.router.navigate(['/gamesnake']);
		} else if (this.scene == "shop") {
			this.router.navigate(['/shop']);
		} else if (this.scene == "trap") {
			if (this.display != false && this.needSleep == true) {
				this.updateMap();
				this.display = false;
				this.direct();
			} else {
				this.display = true;
				this.needSleep = true;
			}
			
			//this.template.nativeElement.dataset.dismiss = "none";
			//this.template.nativeElement.hidden = true;
			
		}
	}

	updateMap() {
		console.log(this.x);
		console.log(this.y);
		var url = publicProperty.basURL + "Map/" + this.x + "/" + this.y + "/" + publicProperty.cusName;
		console.log(url);
		this.http.get(url).subscribe(result => {
			result.json();
		});
	}

	getStyling(x: number, y: number) {
		var ind = this.map.findIndex(_ => _.x == x && _.y == y);
		return this.map[ind].color;
	}

	
	setStyling(x: number, y: number) {
		
		var ind = this.map.findIndex(_ => _.x == x && _.y == y);
		
		this.map[ind].color = "pink";
		
	}

	cancelStyling() {
		this.map.forEach(_ => _.color = "blue");
	}

	direct() {
		//this.router.navigate(['/gamesnake']);
		//
		const interval = 1000;
		const duration = 10 * 1000;
		var t = Observable.timer(0, interval)
			.finally(() => {
				this.updateMap();
				this.router.navigate(['/maingame']);
				this.display = true;
				this.needSleep = false;
				//this.template.nativeElement.hidden = false;
				//this.template.nativeElement.dataset.dismiss = "modal";
				//console.log(this.template);
			})
			.takeUntil(Observable.timer(duration + interval))
			.map(value => duration - value * interval);
		t.subscribe(value => this.count = value/1000);
	}

	getTool() {
		var url = publicProperty.basURL + "Shop/Tool/" + publicProperty.cusName;
		console.log(url);
		this.http.get(url).subscribe(result => {
			var resp = result.json();
			console.log(resp);
			if (resp != "No tools") {
				this.tool = true;
				this.tools = resp;
			} else {
				this.tool = false;
				this.tools = [];
			}
			console.log("tool statu:" + this.tools);
		});
		
	}
	isTool() {
		return this.tool;
	}
	submitTool(t: string) {
		this.updateMap();
		var url = publicProperty.basURL + "Customer/Tool/" + publicProperty.cusName + "/" + t;
		console.log(url);
		this.http.get(url).subscribe(result => {
			var resp = result.json();
			if (resp == "Update Successful") {

			}
		});
		//this.updateMap();
		this.updateTime();
		this.getTool();
		this.show = 'none';
		this.needSleep = false;
		if (t.toUpperCase() == "ROPE") {
			this.router.navigate(['/maingame']);
		} else if (t.toUpperCase() == "GAME CARD") {
			this.router.navigate(['/gamesnake']);
		} else if (t.toUpperCase() == "SHOPPING CARD") {
			this.router.navigate(['/shop']);
		} else if (t.toUpperCase() == "PASS CARD") {
			this.router.navigate(['/maingame']);
		}
		
	}
	checkRecord() {
		var s = this.time - this.coin;
		if (s < 30) {
			this.rank = "A+";
		} else if (s < 45) {
			this.rank = "A";
		} else if (s < 60) {
			this.rank = "B";
		} else {
			this.rank = "PASS";
		}
		//this.http.get(publicProperty.basURL + "customer/" + publicProperty.cusName + "/info").subscribe(result => {
		//	var resp = result.json();
		//	var storys = resp.story;
		//	console.log(storys);
		//	this.storys = storys;
		//	console.log(this.time);
			
		//});
	}
	restart() {
		this.router.navigate(['/home']);
	}
}
