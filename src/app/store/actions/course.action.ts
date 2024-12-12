import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course.models';

export const loadCourses = createAction(`[Course] Load Course`);
export const loadCoursesSuccess = createAction(
  '[Course] Load Course Success',
  props<{ list: any[] }>()
);
export const loadCoursesFaliure = createAction(
  '[Course] Load Course Faliure',
  props<{ errorMessage: string }>()
);

export const createCourse = createAction(
  '[Course] Create Course',
  props<{ course: Course }>()
);
export const createCourseSuccess = createAction(
  '[Course] Create Course Success',
  props<{ course: Course }>()
);
export const createCourseFaliure = createAction(
  '[Course] Create Course Faliure',
  props<{ error: string }>()
);

export const deleteCourse = createAction(
  '[Course] Delete Course',
  props<{ id: string }>()
);
export const deleteCourseSuccess = createAction(
  '[Course] Delete Course Success',
  props<{ id: string }>()
);
export const deleteCourseFaliure = createAction(
  '[Course] Delete Course Faliure',
  props<{ error: string }>()
);
