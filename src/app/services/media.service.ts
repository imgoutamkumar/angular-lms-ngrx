import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  constructor(private httpClient: HttpClient) {}

  uploadFile(data: any): Observable<any> {
    return this.httpClient.post<any>(
      `http://localhost:3000/api/media/upload`,
      data
    );
  }
}
