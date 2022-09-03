import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { environment as env } from '../../environments/environment';
import {
  IUserRegister,
  LoginRequest,
  UserRegister,
} from '../_models/userRequest';
import { TokenStorageService } from './token-storage.service';
import { UserResponse } from '../_models/user';
const AUTH_API = env.apiUrl + 'user/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  public loggedInListener = this.loggedIn.asObservable();
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {
    this.updateLoggedIn(this.tokenStorage.isLoggedIn());
  }

  login(credentials: LoginRequest): Observable<any> {
    try {
      return this.http.post(AUTH_API + 'login', credentials, httpOptions).pipe(
        map((user: any) => {
          this.tokenStorage.saveToken(user.accessToken);
          this.tokenStorage.saveUser(user);
          this.loggedIn.next(true);
          return user;
        })
      );
    } catch (error: any) {
      return error.message;
    }
  }
/*   logout(): void {
    this.tokenStorage.signOut();
    this.loggedIn.next(false);
  } */
  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }
  register(user: IUserRegister): Observable<any> {
    console.log(user);
    return this.http.post(AUTH_API + 'signup', user, httpOptions);
  }
  updateLoggedIn(value: boolean): void {
    this.loggedIn.next(value);
  }

  isLoggedIn() {
    return this.loggedIn.getValue();
  }
}
