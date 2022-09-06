import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
const API_URL = env.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private tokenService: TokenStorageService
  ) {}

  private auth_token = this.tokenService.getToken();
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.auth_token}`,
  });
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'product/pizzas');
  }
  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user/me');
  }
  getUserAddresses(): Observable<any> {
    return this.http.get(API_URL + 'user/address', { headers: this.headers });
  }
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'product/list');
  }
  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'user/data');
  }
  resendEmailConfirmation(email: string): Observable<any> {
    return this.http.get(API_URL + 'user/resend-verify-email', {
      params: { email: email },
    });
  }
}
