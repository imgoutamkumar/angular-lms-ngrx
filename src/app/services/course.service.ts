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
        withCredentials: true, // Include cookies with the request
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

  updateCourseById(id: string, data: Course): Observable<any> {
    return this.httpClient.put<any>(
      `https://node-lms-restapi.onrender.com/api/course/update/${id}`,
      data
    );
  }

  deleteCourseById(id: string): Observable<any> {
    return this.httpClient.delete<any>(
      `https://node-lms-restapi.onrender.com/api/course/delete/${id}`
    );
  }

  createReview(id: string, data: any): Observable<any> {
    console.log('id :', id, 'data :', data);
    return this.httpClient.put<any>(
      `https://node-lms-restapi.onrender.com/api/course/${id}/review`,
      data,
      {
        withCredentials: true, // Include cookies with the request
      }
    );
  }

  allReviewsByCourseId(id: string): Observable<any> {
    return this.httpClient.get<any>(
      `https://node-lms-restapi.onrender.com/api/course/${id}/reviews`,
      {
        withCredentials: true, // Include cookies with the request
      }
    );
  }
}
