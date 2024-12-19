import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(data: any): Observable<any> {
    return this.httpClient.post<any>(
      `https://node-lms-restapi.onrender.com/api/auth/login`,
      data
    );
  }

  logout(): Observable<any> {
    return this.httpClient.post<any>(
      `https://node-lms-restapi.onrender.com/api/auth/logout`,
      {}
    );
  }
}
