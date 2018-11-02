import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Validators,FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { ToastrService } from 'ngx-toastr';
import { PasswordValidation } from '../../validators/passwordValidation';
import { AppComponent } from '../../app/app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	public registerUsers:any = {};
  public myform:FormGroup;
  public passwords:FormGroup;

  constructor(private app:AppComponent,private authentificationService:AuthenticationService,private toastr:ToastrService) {
    this.authentificationService.logout();
    this.app.showLoginPannel = 0;
   }



  ngOnInit() {


    this.myform = new FormGroup({
      email:new FormControl('',[
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*'),

      ]),
      password:new FormControl('',[
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword:new FormControl('',[
        Validators.required,
        Validators.minLength(8),
      ])
    },{validators:PasswordValidation.MatchPassword})

  }

  register(){
  	this.authentificationService.register(this.registerUsers.Email,this.registerUsers.Password)
  	.then(result => {
  					
	  					console.log(result);
	  				});
  	this.toastr.success('User has beed registred','Registration Complete');
        
  }



}
