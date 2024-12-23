import { Course } from '../../models/course.models';
import { CourseQueryParams } from '../actions/course.action';

export interface CourseState {
  courses: Course[] | any;
  selectedCourse: Course | null;
  selectedCourseReviews: any;
  isLoading: boolean;
  error: any;
  queryParams: CourseQueryParams;
  total: number; // Total number of courses for pagination
}

export const courseInitialState: CourseState = {
  courses: [],
  selectedCourse: null,
  selectedCourseReviews: [],
  isLoading: false,
  error: null,
  queryParams: { search: '', filter: '', page: 1, limit: 10 },
  total: 0,
};
