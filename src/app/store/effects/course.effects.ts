import { Injectable } from '@angular/core';
import {
  createCourse,
  createCourseFaliure,
  createCourseSuccess,
  deleteCourse,
  deleteCourseFailure,
  deleteCourseSuccess,
  loadCourseById,
  loadCourseByIdFailure,
  loadCourseByIdSuccess,
  loadCourses,
  loadCoursesFaliure,
  loadCoursesSuccess,
  loadReviewsByCourseIdFailure,
  loadReviewsByCourseIdSuccess,
  updateCourse,
  updateCourseFailure,
  updateCourseSuccess,
} from '../actions/course.action';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CourseService } from '../../services/course.service';
import { of } from 'rxjs';

@Injectable()
export class CourseEffects {
  loadCourses$;
  createCourse$;
  loadCourseById$;
  updateCourse$;
  deleteCourse$;
  allReviewsCourseId$;
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
    this.updateCourse$ = createEffect(() =>
      this.action$.pipe(
        ofType(updateCourse),
        mergeMap(({ id, course }) =>
          this.courseService.updateCourseById(id, course).pipe(
            map((updatedCourse) =>
              updateCourseSuccess({ course: updatedCourse })
            ),
            catchError((error) => of(updateCourseFailure({ error })))
          )
        )
      )
    );

    // Delete Course
    this.deleteCourse$ = createEffect(() =>
      this.action$.pipe(
        ofType(deleteCourse),
        mergeMap(({ id }) =>
          this.courseService.deleteCourseById(id).pipe(
            map(() => deleteCourseSuccess({ id })),
            catchError((error) =>
              of(deleteCourseFailure({ error: error.message }))
            )
          )
        )
      )
    );

    // All Reviews By Course ID
    this.allReviewsCourseId$ = createEffect(() =>
      this.action$.pipe(
        ofType(loadCourseByIdSuccess),
        tap((action) => {
          console.log('on loadCourseBYIdSuccess', action);
        }),
        mergeMap((action) =>
          this.courseService.allReviewsByCourseId(action.course._id).pipe(
            map((resData) =>
              loadReviewsByCourseIdSuccess({ reviews: resData })
            ),
            catchError((error) =>
              of(loadReviewsByCourseIdFailure({ error: error.message }))
            )
          )
        )
      )
    );
  }
}
