import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseModel } from '../../models/course.models';

const getCourseState = createFeatureSelector<CourseModel>('Course');

export const getCourseList = createSelector(getCourseState, (state) => {
  return state.list;
});
