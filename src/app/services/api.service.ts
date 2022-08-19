import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../models/userRequest';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  api = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  login(loginRequest: LoginRequest) {
    return this.httpClient
      .post(`${this.api}user/login`, loginRequest)
      .subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
  }
  register(user: User) {
    return this.httpClient.post(`${this.api}users/register`, user);
  }
}
