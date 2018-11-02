import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public userInput:any = {};
	public loading = false;
	public error = false;


  constructor(private router:Router,private authentificationService:AuthenticationService) { 
    
  }

  ngOnInit() {
    sessionStorage.clear();
  }

  login(){
  	this.loading = true;
  	this.authentificationService.login(this.userInput.Email,this.userInput.Password)
  	.then( result => {
      console.log('cacacacacaca',result);
  		if (result == true){
        location.reload();
        this.router.navigate(['home']);

  		}
  		else 
  		{
  			this.error = true;
  			// this.loading = false;
  		}
    }).catch( err => {
      console.log("dasdasdasasda");
      this.error = true;
  		// this.loading = false;
  		console.log(err);
  	})
  }

}
