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
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/_services/snack-bar.service';

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
  formSent: boolean = false;
  formLoading: boolean = false;
  message: string = '';
  durationInSeconds = 5;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBarService: SnackBarService
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
      this.snackBarService.error('Veuillez remplir tous les champs');
      return false;
    } else {
      let formData: any = {};
      Object.keys(this.loginForm.controls).forEach((key) => {
        formData[key] = this.loginForm.get(key)!.value;
      });
      this.formLoading = true;
      return this.authService.login(formData).subscribe({
        next: (data) => {
          this.errorMessage = '';
          this.formSent = true;
          this.formLoading = false;
          this.tokenStorage.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
          this.formLoading = false;
          this.snackBarService.error(this.errorMessage);
        },
        complete: () =>
          this.snackBarService.success(
            `Bonjour ${this.tokenStorage.getUser().fullName} !`
          ),
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
