import { createReducer, on, State } from '@ngrx/store';
import { courseInitialState } from '../states/course.state';
import {
  createCourseFaliure,
  deleteCourseSuccess,
  loadCourseById,
  loadCourseByIdFailure,
  loadCourses,
  loadCoursesFaliure,
  loadCoursesSuccess,
  updateCourseSuccess,
} from '../actions/course.action';
import {
  createCourseSuccess,
  createCourse,
  loadCourseByIdSuccess,
} from '../actions/course.action';
import { Course } from '../../models/course.models';

const courseReducer = createReducer(
  courseInitialState,
  on(loadCourses, (state) => ({ ...state, isLoading: true })),
  on(loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      courses: action.courses,
      error: '',
    };
  }),
  on(loadCoursesFaliure, (state, action) => {
    return {
      ...state,
      courses: null,
      error: action.error,
    };
  }),
  on(createCourse, (state) => ({ ...state, isLoading: true })),
  on(createCourseSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      courses: [...state.courses, action.course],
    };
  }),
  on(createCourseFaliure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),

  on(loadCourseById, (state) => ({ ...state, isLoading: true })),
  on(loadCourseByIdSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      selectedCourse: action.course,
    };
  }),
  on(loadCourseByIdFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),

  // Update Course
  on(updateCourseSuccess, (state, action) => ({
    ...state,
    courses: state.courses.map((course: Course) =>
      course._id === action.course._id ? action.course : course
    ),
  })),

  // Delete Course
  on(deleteCourseSuccess, (state, action) => ({
    ...state,
    courses: state.courses.filter((course: Course) => course._id !== action.id),
  }))
);

export function CourseReducer(state: any, action: any) {
  return courseReducer(state, action);
}
