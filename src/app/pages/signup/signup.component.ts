import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from '../../../service/sign-up.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private route: Router, private http: HttpClient) { };
  showLogin = inject(SignUpService);
  signuser: any;

  signup = new FormGroup({
    'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'phone': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'username': new FormControl('', [Validators.required, Validators.minLength(4)]),
    'password': new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  get name() {
    return this.signup.get('name');
  }
  get phone() {
    return this.signup.get('phone');
  }
  get email() {
    return this.signup.get('email');
  }
  get username() {
    return this.signup.get('username');
  }
  get password() {
    return this.signup.get('password');
  }

  signupdata(signup: FormGroup) {

    if (this.signup.status === 'VALID') {
      console.log()

      // console.log(this.signup.value);
      this.signuser = this.signup.value.name;
      this.http.post<any>("http://localhost:3000/signup", this.signup.value).subscribe({
        next: (res: any) => {
          localStorage.setItem('userLoggedIn', JSON.stringify(res))
          this.showLogin.setIsLoggedIn(false);
          alert(`${this.signuser} successfully sign up`);
          this.signup.reset();
          this.route.navigate(['./dashboard']);
        },
        error: err => {
          alert('Please fill all the fields');
        }
      })
    }
    else{
      console.log("Invalid")
    }
  }

}
