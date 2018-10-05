import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Shop } from '../models/shop';
import { publicProperty } from '../models/publicProperty';
import { Router } from '@angular/router';

@Component({
    selector: 'shop',
	templateUrl: './shop.component.html',
	styles: [
		'img {max-width: 100%; max - height: 100 %;}',
		'.container {text-align:center; vertical-align:middle; margin-top:25%; margin-botton:50%}'
	]
})
export class ShopComponent {
	public items: Shop[] = [];
	public message: string = "";
	public url: string = publicProperty.basURL + "Shop";
	constructor(private router: Router, public http: Http) {
		this.getItems();
	}
	getItems() {
		var url = this.url + "/" + publicProperty.cusName;
		console.log(url);
		this.http.get(url).subscribe(result => {
			var resp = result.json();
			console.log(resp);
			if (resp != "Not Found!!" && resp != "Not Found This Customer")
				this.items = resp;
			else
				alert(resp);
		});
		
	}
	submitOrder(name: string) {
		if (publicProperty.cusName == null) {
			alert("Please Register First");
		} else {
			//var url = this.url + "/" + name + "/" + publicProperty.cusName;
			var url = this.url + "/Order/" + name + "/" + publicProperty.cusName;
			console.log(url);
			this.http.get(url).subscribe(result => {
				var resp = result.json();
				console.log(resp);
				if (resp == "Submit Failed")
					alert(resp);
				else if (resp == "Balance Not Enough!") {
					this.message = resp;
				} else {
					this.message = "Card Add Successfully";
				}
			});
		}
		
	}
	returnGame() {
		this.router.navigate(['/maingame']);
	}
}
