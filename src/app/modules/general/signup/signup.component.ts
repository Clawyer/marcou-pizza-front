import { Component, OnInit, ViewChild } from '@angular/core';
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
} from 'src/app/_models/userRequest';
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
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  submitted = false;
  errorMessage = '';

  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  address: string = '';
  url = env.addressApi + this.address;
  filteredAddresses: any;
  isLoading = false;
  minLengthTerm = 3;
  selectedAddress: any = '';
  hide = true;
  isLinear = false;
  errorMsg!: string;
  @ViewChild('stepper') stepper: MatStepper | any;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private fb: FormBuilder,
    private geoApiGouvAddressService: GeoApiGouvAddressService,
    private http: HttpClient,
    private router: Router
  ) {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  reloadPage(): void {
    window.location.reload();
  }
  addressForm = this.fb.group({
    address: this.fb.group({
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      zip: [''],
    }),
  });

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

  get myRegistrationForm() {
    return this.registrationForm.controls;
  }
  get myaddressForm() {
    return this.addressForm.controls;
  }

  onSelected() {
    this.selectedAddress = this.selectedAddress.properties;

    this.addressForm.controls['address']!.setValue({
      addressLine1: this.selectedAddress.name,
      addressLine2: this.myaddressForm.address.get('addressLine2')!.value,
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
  formReset() {
    this.registrationForm.reset();
    this.addressForm.reset({
      address: { addressLine1: '', addressLine2: '', city: '', zip: '' },
    });
  }

  move() {
    if (!this.registrationForm.valid) this.stepper.selectedIndex = 0;
    if (!this.addressForm.valid) this.stepper.selectedIndex = 1;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      this.move();
    } else {
      const data = {
        ...this.registrationForm.value,
        ...this.addressForm.value,
      };

      console.log(data);
    }
    /*   if (!this.registrationForm.valid) {
      // alert('Veuillez remplir tous les champs obligatoires svp');
      return false; */
    // } else {
    /* let formData: any = {};
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
      return console.log(formData);
 */
    /*  return this.authService.register(formData).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err: any) => {
          console.log(err);
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        },
        complete: () => console.info('complete'),
      }); */
    //}
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    this.addressForm
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
      });
  }
}
