import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { IUserRegister, LoginRequest, UserRegister } from '../models/userRequest';
const AUTH_API = env.apiUrl + 'user/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(credentials: LoginRequest): Observable<any> {
    console.log(credentials)
    return this.http.post(
      AUTH_API + 'login',
      credentials,
      httpOptions
    );
  }
  register(user: IUserRegister): Observable<any> {
    console.log(user);
    return this.http.post(
      AUTH_API + 'signup',
      user,
      httpOptions
    );
  }
}
