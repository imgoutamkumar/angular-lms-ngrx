import { createReducer, on, State } from '@ngrx/store';
import { courseState } from '../states/course.state';
import {
  loadCoursesFaliure,
  loadCoursesSuccess,
} from '../actions/course.action';
import { state } from '@angular/animations';

const courseReducer = createReducer(
  courseState,
  on(loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      list: action.list,
      errorMessage: '',
    };
  }),
  on(loadCoursesFaliure, (state, action) => {
    return {
      ...state,
      list: [],
      errorMessage: action.errorMessage,
    };
  })
);

export function CourseReducer(state: any, action: any) {
  return courseReducer(state, action);
}
