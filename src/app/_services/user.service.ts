import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
const API_URL = env.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'product/pizzas');
  }
  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user/me');
  }
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'product/list');
  }
  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'user/data');
  }
}
