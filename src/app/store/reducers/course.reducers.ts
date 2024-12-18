import { createReducer, on, State } from '@ngrx/store';
import { courseInitialState } from '../states/course.state';
import {
  deleteCourseSuccess,
  loadCoursesFaliure,
  loadCoursesSuccess,
  updateCourseSuccess,
} from '../actions/course.action';
import { state } from '@angular/animations';

const courseReducer = createReducer(
  courseInitialState,
  on(loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      courses: action.courses,
      error: '',
    };
  }),
  on(loadCoursesFaliure, (state, action) => {
    return {
      ...state,
      courses: [],
      error: action.error,
    };
  }),

  // Update Course
  on(updateCourseSuccess, (state, action) => ({
    ...state,
    courses: state.courses.map((c) =>
      c.id === action.course.id ? action.course : c
    ),
  })),

  // Delete Course
  on(deleteCourseSuccess, (state, action) => ({
    ...state,
    courses: state.courses.filter((course) => course.id !== action.id),
  }))
);

export function CourseReducer(state: any, action: any) {
  return courseReducer(state, action);
}
