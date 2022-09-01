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
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Validation from 'src/app/utils/validate-password';
import {
  IUserRegister,
  LoginRequest,
  UserAddress,
  UserLogin,
  UserRegister,
} from '../../models/userRequest';
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
  selector: 'app-sign-in-up',
  templateUrl: './sign-in-up.component.html',
  styleUrls: ['./sign-in-up.component.scss'],
})
export class SignInUpComponent implements OnInit {
  submitted = false;
  errorMessage = '';
  register = true;

  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  address: string = '';
  url = env.addressApi + this.address;
  filteredAddresses: any;
  isLoading = false;
  errorMsg!: string;
  minLengthTerm = 3;
  selectedAddress: any = '';

  /*
  public loginForm: FormGroup<UserLogin> = new FormGroup<UserLogin>({
    email: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });
  public registrationForm: FormGroup<UserRegister> = new FormGroup<UserRegister>({
    email: new FormControl('', { nonNullable: true }),
    firstName: new FormControl('', { nonNullable: true }),
    lastName: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
    confirmpwd: new FormControl('', { nonNullable: true }),
    gender: new FormControl('', { nonNullable: true }),
    phone: new FormControl('', { nonNullable: true }),
  });
  public addressForm: FormGroup<UserAddress> = new FormGroup<UserAddress>({
    addressLine1: new FormControl('', { nonNullable: true }),
    addressLine2: new FormControl('', { nonNullable: true }),
    city: new FormControl('', { nonNullable: true }),
    country: new FormControl('', { nonNullable: true }),
    cp: new FormControl('', { nonNullable: true }),
  }); */
  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      this.register = !this.register;
    }, 1000);
  }
  switch() {
    this.register = !this.register;
  }

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private fb: FormBuilder,
    private geoApiGouvAddressService: GeoApiGouvAddressService,
    private http: HttpClient,
  ) {}
  reloadPage(): void {
    window.location.reload();
  }

  registrationForm = this.fb.group({
    fullName: this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('^[_A-z0-9]*((-|s)*[_A-z0-9])*$'),
        ],
      ],
      lastName: ['', [Validators.required]],
    }),
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ],
    ],
    phoneNumber: [
      '',
      [
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]+$'),
      ],
    ],
    address: this.fb.group({
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      zip: [''],
    }),
    gender: ['male', Validators.required],
    PasswordValidation: this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')], // your validation method
      }
    ),
  });

  loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(40)],
    ],
  });

  get myRegistrationForm() {
    return this.registrationForm.controls;
  }

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
      this.authService.login(formData).subscribe({
        next: (data) => {
          console.log(data);
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.reloadPage();
        },
        error: (err: any) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        },
        complete: () => console.info('complete'),
      });
    }
  }

  onSelected() {
    this.selectedAddress = this.selectedAddress.properties;

    this.registrationForm.controls['address']!.setValue({
      addressLine1: this.selectedAddress.name,
      addressLine2: this.myRegistrationForm.address.get('addressLine2')!.value,
      city: this.selectedAddress.city,
      zip: this.selectedAddress.citycode,
    });

    console.log(this.registrationForm.value);
  }

  displayWith(value: any) {
    return value?.name;
  }

  clearSelection() {
    this.selectedAddress = '';
    this.filteredAddresses = [];
  }

  onSubmit() {
    this.submitted = true;

    if (!this.registrationForm.valid) {
      // alert('Veuillez remplir tous les champs obligatoires svp');
      return false;
    } else {
      let formData: any = {};
      let addressData: any = {};
      const exclude = ['address', 'PasswordValidation'];
      Object.keys(this.registrationForm.get('address')!.value).forEach((k) => {
        let value = this.registrationForm.get(['address', k])?.value;
        if (value.length > 0)
          addressData[k] = this.registrationForm.get(['address', k])?.value;
      });
      formData['password'] = this.registrationForm.get([
        'PasswordValidation',
        'password',
      ])?.value;
      Object.keys(this.registrationForm.controls).forEach((key) => {
        let value = this.registrationForm.get(key)!.value;
        if (
          typeof this.registrationForm.get(key)!.value === 'string' &&
          value.length > 0
        ) {
          formData[key] = this.registrationForm.get(key)!.value;
        } else {
          if (!exclude.includes(key)) {
            Object.keys(this.registrationForm.get(key)!.value).forEach((k) => {
              let value = this.registrationForm.get([key, k])?.value;
              if (value.length > 0) {
                formData[k] = this.registrationForm.get([key, k])?.value;
              }
            });
          }
        }
      });
      if (addressData.length > 0) formData['address'] = addressData;

      this.authService.register(formData).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err: any) => {
          console.log(err);
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
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
    this.registrationForm
      .get('address')!
      .get('addressLine1')!
      .valueChanges.pipe(
        filter((res) => {
          return res !== null && res.length >= this.minLengthTerm;
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        tap<any>(() => {
          this.errorMsg = '';
          this.filteredAddresses = [];
          this.isLoading = true;
        }),
        switchMap((value: string) =>
          this.geoApiGouvAddressService
            .query({ q: value, autocomplete: 1 })
            .pipe(
              finalize(() => {
                this.isLoading = false;
              })
            )
        )
      )
      .subscribe((data: GeoApiGouvAddressResponse) => {
        if (data.features.length == 0) {
          this.errorMsg = 'no data';
          this.filteredAddresses = [];
        } else {
          this.errorMsg = '';
          this.filteredAddresses = data.features;
        }
        console.log(this.filteredAddresses);
      });
  }
}
