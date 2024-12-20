import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course.models';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private httpClient: HttpClient) {}

  createCourse(data: any): Observable<any> {
    return this.httpClient.post<any>(
      `https://node-lms-restapi.onrender.com/api/course/create`,
      data,
      {
        withCredentials: true, // Ensure cookies are sent with the request
      }
    );
  }

  getAllCourses(): Observable<any> {
    //const params = new HttpParams().set('limit', 10).set('level', 'Medium');
    return this.httpClient.get<any>(
      `https://node-lms-restapi.onrender.com/api/course/all-courses`
      /* {
        params,
      } */
    );
  }

  getCourseDetailsById(id: string): Observable<any> {
    return this.httpClient.get<any>(
      `https://node-lms-restapi.onrender.com/api/course/details/${id}`
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
