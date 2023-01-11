import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginData, signupData } from '../data-type';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private route: Router) { }

  userSignUp(user: signupData) {
    this.http.post('http://localhost:3000/users', user, { observe: 'response' }).subscribe((result) => {

      console.warn(result);
      if (result) {
        localStorage.setItem('user', JSON.stringify(result.body));
        this.route.navigate(['/']);

      }

    });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.route.navigate(['/']);
    }
  }

  userLogin(data: loginData) {
    this.http.get<signupData[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result) => {
      if (result && result.body?.length) {
        this.invalidUserAuth.emit(false);
        console.warn(result);
        localStorage.setItem('user', JSON.stringify(result.body[0]));
        this.route.navigate(['/']);
      }
      else{
        this.invalidUserAuth.emit(true);
      }
    })
  }
}
