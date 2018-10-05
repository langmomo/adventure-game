import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
	getUrl() {
		return "url('http://www.dincerdemir.com/wp-content/uploads/2016/04/FDS_350581.jpg')";
	}
}
