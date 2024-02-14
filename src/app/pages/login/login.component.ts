import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { SignUpService } from '../../../service/sign-up.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showLogin=inject(SignUpService);
  constructor(private http:HttpClient, private route:Router){}

  login = new FormGroup({
    'username': new FormControl('',[Validators.required, Validators.minLength(4)]),
    'password': new FormControl('',[Validators.required, Validators.minLength(5)])
  })
  get username(){
    return this.login.get('username');
  }
  get password(){
    return this.login.get('password');
  }


  logindata(login:FormGroup){
    // console.log(this.login.value);

    function x(){
      let a=2;
      var b=4;
      console.log(a)
      console.log(b)
    }
    this.http.get<any>("http://localhost:3000/signup").subscribe({
      next:(res:any)=>{
    
        const user =res.find((a:any)=>{
            return a.username === this.login.value.username && a.password ===this.login.value.password
          });
          console.log(user)
          localStorage.setItem('userLoggedIn',JSON.stringify(user))
          if(user){
            alert('You are successfully Login');
            
            this.showLogin.setIsLoggedIn(false);
            this.login.reset();
            this.route.navigate(['./dashboard']);
          }else{
            alert('Invalid Credentials');
            this.route.navigate(['./login']);
          }
        },
        error:err=>{
          console.log(err)
        }
    })
  }
}
