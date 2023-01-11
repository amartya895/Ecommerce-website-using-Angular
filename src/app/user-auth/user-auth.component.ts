import { Component, OnInit } from '@angular/core';
import { loginData, signupData } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  showLogin:boolean = false;
  authError:string|undefined = '';

  constructor(private user:UserService) { }

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data:signupData){
    this.user.userSignUp(data);
  }

  login(data:loginData){
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result)=>{

      if(result)
      {
        this.authError = "Please enter valid user details";
      }
      setTimeout(()=>{
        this.authError = undefined
      },3000)

    })
  }
  openLogin()
  {
    this.showLogin = true;
  };
  openSignUp()
  {
    this.showLogin = false;
  };

}
