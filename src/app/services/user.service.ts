import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserQueryParams } from '../store/actions/user.action';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getAllUsers(queryParameters: UserQueryParams): Observable<any> {
    console.log('queryParameters : ', queryParameters);
    let httpParams = new HttpParams()
      .set('search', queryParameters.search || '')
      .set('filter', queryParameters.filter || '')
      .set('page', queryParameters.page)
      .set('limit', queryParameters.limit);
    return this.httpClient.get<any>(`https://dummyjson.com/users`, {
      params: httpParams,
    });
  }
}
