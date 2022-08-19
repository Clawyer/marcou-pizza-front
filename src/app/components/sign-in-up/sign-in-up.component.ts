import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { LoginRequest } from '../../models/userRequest';
@Component({
  selector: 'app-sign-in-up',
  templateUrl: './sign-in-up.component.html',
  styleUrls: ['./sign-in-up.component.scss'],
})
export class SignInUpComponent implements OnInit {
  resetBtn: boolean = false;
  signIn: boolean = false;
  signUp: boolean = false;
  checked: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.minLength(8)),
  });
  registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.minLength(8)),
    confirmpassword: new FormControl('', Validators.minLength(8)),
  });
  reset(): void {
    this.resetBtn = !this.resetBtn;
  }
  signInClick(): void {
    this.signIn = !this.signIn;
    this.signUp = false;
  }
  signUpClick(): void {
    this.signUp = !this.signUp;
    this.signIn = false;
    this.checked = !this.checked;
  }
  constructor(private apiService: ApiService) {

  }
  signUpSubmit(): void {
    console.log('ok');
    // console.log('Name:' + this.loginForm.get('email').value);
  }
  signInSubmit() {

     return this.apiService.login({"email": this.loginForm.get('email')!.value, "password": this.loginForm.get('password')!.value} as LoginRequest)


  }

  ngOnInit(): void {}
}
