import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from '../states/course.state';

const getCourseState = createFeatureSelector<CourseState>('Course');

export const selectAllCourses = createSelector(getCourseState, (state) => {
  return state.courses;
});

export const selectSelectedCourse = createSelector(getCourseState, (state) => {
  return state.selectedCourse;
});

export const selectIsLoading = createSelector(getCourseState, (state) => {
  return state.isLoading;
});

export const selectCourseReviews = createSelector(getCourseState, (state) => {
  return state.selectedCourseReviews;
});
