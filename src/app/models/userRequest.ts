import { FormControl, FormGroup } from '@angular/forms';

export type IForm<T> = {
  [K in keyof T]?: any;
};
export interface RefreshToken {
  id: number;
  userId: number;
  token: string;
  refreshCount: number;
  expiryDate: Date;
}

/*
Interface for the Login Response (can look different, based on your backend api)
*/
export interface LoginResponse {
  accessToken: string;
  refreshToken: RefreshToken;
  fullName: string;
  email: string;
}

/*
Interface for the Login Request (can look different, based on your backend api)
*/
export interface LoginRequest {
  email: string;
  password: string;
}
export interface UserLogin {
  email: FormControl<string>;
  password: FormControl<string>;
}

/*
Interface for the Register Request (can look different, based on your backend api)
*/
export interface UserRegister {
  email: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  password: FormControl<string>;
  confirmpwd: FormControl<string>;
  gender: FormControl<string>;
  phone: FormControl<string>;
}
export interface UserAddress {
  country: FormControl<string>;
  city: FormControl<string>;
  addressLine1: FormControl<string>;
  addressLine2: FormControl<string>;
  cp: FormControl<string>;
}

export interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  zip: string;
}
export interface PasswordConfirmation {
  password: string;
  confirmPassword: string;
}
export interface IUserRegister {
  address?: Address;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  gender: string;
  password: string;
}
/*
Interface for the Register Response (can look different, based on your backend api)
*/
export interface RegisterResponse {
  status: number;
  message: string;
}
