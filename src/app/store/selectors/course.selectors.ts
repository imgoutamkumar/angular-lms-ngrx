import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseModel } from '../../models/course.models';
import { CourseState } from '../states/course.state';

const getCourseState = createFeatureSelector<CourseState>('Course');

export const selectAllCourses = createSelector(getCourseState, (state) => {
  return state.courses;
});
