import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
@Component({
	selector:'app-header',
	templateUrl:'./header.component.html',
	styleUrls:['./header.component.css']
})

export class HeaderComponent{

	constructor(private auth:AuthenticationService){

	}

	logOut(){
		this.auth.logout();
		location.reload();
	}

}