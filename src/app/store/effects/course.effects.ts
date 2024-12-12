import { Injectable } from '@angular/core';
import {
  loadCourses,
  loadCoursesFaliure,
  loadCoursesSuccess,
} from '../actions/course.action';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CourseService } from '../../services/course.service';
import { of } from 'rxjs';

@Injectable()
export class CourseEffects {
  loadCourses$;
  constructor(private action$: Actions, private courseService: CourseService) {
    console.log('Actions injected:', this.action$);
    console.log('CourseService injected:', this.courseService);

    this.loadCourses$ = createEffect(() =>
      this.action$.pipe(
        ofType(loadCourses),
        exhaustMap(() => {
          return this.courseService.getAllCourses().pipe(
            map((data) => {
              return loadCoursesSuccess({ list: data });
            }),
            catchError((error) =>
              of(
                loadCoursesFaliure({
                  errorMessage: error.message || 'Unknown error',
                })
              )
            )
          );
        })
      )
    );
  }
}
