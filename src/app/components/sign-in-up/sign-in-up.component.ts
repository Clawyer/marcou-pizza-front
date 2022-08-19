import { Component, OnInit } from '@angular/core';

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
  constructor() {
    console.log(this.resetBtn && 'frame-long', 'frame');
    console.log(this.checked);
  }

  ngOnInit(): void {}
}
