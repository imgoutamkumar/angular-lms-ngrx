import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course.models';

// Query Params Interface
export interface CourseQueryParams {
  search?: string;
  filter?: string; // e.g., category, status, etc.
  page: number;
  limit: number;
}

// Load Courses
export const loadCourses = createAction(`[Course] Load Course`);
export const loadCoursesSuccess = createAction(
  '[Course] Load Course Success',
  props<{ courses: Course[] | null }>()
);
export const loadCoursesFaliure = createAction(
  '[Course] Load Course Faliure',
  props<{ error: string }>()
);

// Create Course
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

// View Course Details by ID
export const loadCourseById = createAction(
  '[Course] Load Course By ID',
  props<{ id: string }>()
);
export const loadCourseByIdSuccess = createAction(
  '[Course] Load Course By ID Success',
  props<{ course: Course }>()
);
export const loadCourseByIdFailure = createAction(
  '[Course] Load Course By ID Failure',
  props<{ error: any }>()
);

// Update Course
export const updateCourse = createAction(
  '[Course] Update Course',
  props<{ id: string; course: Course }>()
);
export const updateCourseSuccess = createAction(
  '[Course] Update Course Success',
  props<{ course: Course }>()
);
export const updateCourseFailure = createAction(
  '[Course] Update Course Failure',
  props<{ error: any }>()
);

// Delete Course
export const deleteCourse = createAction(
  '[Course] Delete Course',
  props<{ id: string }>()
);
export const deleteCourseSuccess = createAction(
  '[Course] Delete Course Success',
  props<{ id: string }>()
);
export const deleteCourseFailure = createAction(
  '[Course] Delete Course Faliure',
  props<{ error: string }>()
);

// Load reviews
export const loadReviewsByCourseIdSuccess = createAction(
  '[Course] Load Reviews By Course ID Success',
  props<{ reviews: any }>()
);

export const loadReviewsByCourseIdFailure = createAction(
  '[Course] Load Reviews By Course ID Failure',
  props<{ error: any }>()
);

//create review
export const createReview = createAction(
  '[Course] Create Review',
  props<{ id: string; data: any }>()
);
export const createReviewSuccess = createAction(
  '[Course] Create Review Success',
  props<{ review: any }>()
);
export const createReviewFaliure = createAction(
  '[Course] Create Review Faliure',
  props<{ error: string }>()
);
