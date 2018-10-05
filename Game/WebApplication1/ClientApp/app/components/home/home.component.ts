import { Component, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { publicProperty } from '../models/publicProperty';
import { Customer } from '../models/Customer';
import { Router } from '@angular/router';

@Component({
    selector: 'home',
	templateUrl: './home.component.html',
	styles: [
		':host {margin: 50px; backgroud-image: url(' +
		'https://openclipart.org/image/800px/svg_to_png/227918/Video-Game-Controller-Icon.png'+')}'
		]
})
export class HomeComponent {
	//https://openclipart.org/image/800px/svg_to_png/227918/Video-Game-Controller-Icon.png
	@ViewChild("closeModal") closeModal: ElementRef;
	public name: string = "";
	public password: string = "";
	public url: string = publicProperty.basURL + "/Customer";
	constructor(public http: Http, private router: Router) {

	}

	//submitCustomer(f: NgForm) {
	//	var c = f.value;
	//}
	submitCustomer(f: NgForm) {
		var c = f.value;
		c["Coin"] = 3;
		c["Time"] = 0;
		this.http.post(this.url, c).subscribe(result => {
			var resp = result.json();
			if (resp == "Already Register!!!") {
				alert(resp);
			} else {
				console.log(resp.name);
				this.name = resp.name;
				publicProperty.cusName = resp.name;
				this.closeModal.nativeElement.click();
				this.router.navigate(['/maingame']);
			}
			
		});
		
		//this.redirect();
	}
	getCustomer() {
		this.http.get(this.url).subscribe(result => {
			var resp = result.json();
			console.log(resp);
			
		});
		
	}
	redirect() {
		this.router.navigate(['/maingame']);
	}

	
}
