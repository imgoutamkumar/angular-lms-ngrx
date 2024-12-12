import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course.models';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private httpClient: HttpClient) {}

  createProduct(data: any): Observable<any> {
    return this.httpClient.post<any>(
      `https://bun-lms-restapi.onrender.com/courses/`,
      data
    );
  }

  getAllCourses(): Observable<any> {
    const params = new HttpParams().set('limit', 10).set('level', 'Medium');
    return this.httpClient.get<any>(
      `https://bun-lms-restapi.onrender.com/courses/`,
      {
        params,
      }
    );
  }

  getAllProductById(id: number): Observable<any> {
    return this.httpClient.get<any>(
      `https://bun-lms-restapi.onrender.com/courses/${id}`
    );
  }

  updateProductById(id: number, data: any): Observable<any> {
    return this.httpClient.put<any>(
      `https://bun-lms-restapi.onrender.com/product/${id}`,
      data
    );
  }

  deleteProductById(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      `https://bun-lms-restapi.onrender.com/courses/${id}`
    );
  }
}
