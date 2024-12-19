import { Injectable } from '@angular/core';
import {
  createCourse,
  createCourseFaliure,
  createCourseSuccess,
  loadCourseById,
  loadCourseByIdFailure,
  loadCourseByIdSuccess,
  loadCourses,
  loadCoursesFaliure,
  loadCoursesSuccess,
} from '../actions/course.action';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CourseService } from '../../services/course.service';
import { of } from 'rxjs';

@Injectable()
export class CourseEffects {
  loadCourses$;
  createCourse$;
  loadCourseById$;
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
              return loadCoursesSuccess({ courses: data.courses });
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

    // Create Course
    this.createCourse$ = createEffect(() =>
      this.action$.pipe(
        ofType(createCourse),
        mergeMap(({ course }) => {
          return this.courseService.createCourse(course).pipe(
            map((data) => createCourseSuccess({ course: data.course })),
            catchError((error) =>
              of(createCourseFaliure({ error: error.message }))
            )
          );
        })
      )
    );

    // Load Course By ID
    this.loadCourseById$ = createEffect(() =>
      this.action$.pipe(
        ofType(loadCourseById),
        exhaustMap(({ id }) =>
          this.courseService.getCourseDetailsById(id).pipe(
            map((data) => loadCourseByIdSuccess({ course: data.course })),
            catchError((error) =>
              of(loadCourseByIdFailure({ error: error.message }))
            )
          )
        )
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
