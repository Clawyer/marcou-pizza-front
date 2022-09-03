import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import {
  GeoApiGouvAddressResponse,
  GeoApiGouvAddressService,
} from '@placeme/ngx-geo-api-gouv-address';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import Validation from 'src/app/_utils/validate-password';
import {
  IUserRegister,
  LoginRequest,
  UserAddress,
  UserLogin,
  UserRegister,
} from '../../../_models/userRequest';
import { environment as env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  debounceTime,
  tap,
  switchMap,
  finalize,
  distinctUntilChanged,
  filter,
} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  errorMessage = '';
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  hide = true;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        Validators.email,
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(40)],
    ],
  });

  get myLoginForm() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      alert('Veuillez remplir tous les champs obligatoires svp');
      return false;
    } else {
      let formData: any = {};
      Object.keys(this.loginForm.controls).forEach((key) => {
        formData[key] = this.loginForm.get(key)!.value;
      });
      return this.authService.login(formData).subscribe({
        next: (data) => {
          this.tokenStorage.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          // navagate to home page
        },
        error: (err: any) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
          console.log(this.submitted && this.errorMessage.length > 0);
        },
        complete: () => console.info('complete'),
      });
    }
  }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
}
