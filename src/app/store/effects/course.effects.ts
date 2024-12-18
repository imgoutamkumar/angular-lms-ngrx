import { Injectable } from '@angular/core';
import {
  loadCourses,
  loadCoursesFaliure,
  loadCoursesSuccess,
} from '../actions/course.action';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
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
        switchMap(() => {
          return this.courseService.getAllCourses().pipe(
            map((data) => {
              console.log('data', data);
              return loadCoursesSuccess({ courses: data.data });
            }),
            catchError((error) =>
              of(
                loadCoursesFaliure({
                  error: error.message || 'Unknown error',
                })
              )
            )
          );
        })
      )
    );

    /* loadCourses$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CourseActions.loadCourses),
        switchMap(({ queryParams }) =>
          this.courseService.getAllCourses(queryParams).pipe(
            map((response) =>
              CourseActions.loadCoursesSuccess({
                courses: response.courses,
                total: response.total,
              })
            ),
            catchError((error) => of(CourseActions.loadCoursesFailure({ error })))
          )
        )
      )
    ); */

    // Load Course By ID
    /* loadCourseById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadCourseById),
      exhaustMap(({ id }) =>
        this.courseService.getCourseById(id).pipe(
          map((course) => CourseActions.loadCourseByIdSuccess({ course })),
          catchError((error) =>
            of(CourseActions.loadCourseByIdFailure({ error }))
          )
        )
      )
    )
  ); */

    // Create Course
    /* createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.createCourse),
      mergeMap(({ course }) =>
        this.courseService.createCourse(course).pipe(
          map((newCourse) => CourseActions.createCourseSuccess({ course: newCourse })),
          catchError((error) =>
            of(CourseActions.createCourseFailure({ error }))
          )
        )
      )
    )
  ); */

    // Update Course
    /* updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.updateCourse),
      mergeMap(({ course }) =>
        this.courseService.updateCourse(course).pipe(
          map((updatedCourse) =>
            CourseActions.updateCourseSuccess({ course: updatedCourse })
          ),
          catchError((error) =>
            of(CourseActions.updateCourseFailure({ error }))
          )
        )
      )
    )
  ); */

    // Delete Course
    /* deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.deleteCourse),
      mergeMap(({ id }) =>
        this.courseService.deleteCourse(id).pipe(
          map(() => CourseActions.deleteCourseSuccess({ id })),
          catchError((error) =>
            of(CourseActions.deleteCourseFailure({ error }))
          )
        )
      )
    )
  ); */
  }
}
