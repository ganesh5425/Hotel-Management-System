import {  Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  // for show login or signup form
  loginStatus:boolean = false;

  // show content after login or signup
  signupStatus:boolean = true;
  isLoggedIn = new BehaviorSubject<boolean>(false)
  
  constructor(private route:Router) { }

  // function for login->signup or signup->login
  setLoginStatus(status:boolean){
    console.log(status);
    this.loginStatus=status;
  }

  setIsLoggedIn(status:boolean){
    // console.log(status)
    return this.isLoggedIn.next(status);
  }
  getIsLoggedIn(){
    return this.isLoggedIn.asObservable()
  }

  userLogout(){
    this.setIsLoggedIn(false);
    this.setLoginStatus(true);
    this.route.navigateByUrl('/login')
  }
  
}
