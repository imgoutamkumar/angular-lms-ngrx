export interface Course {
  id: '';
  title: '';
  description: '';
  price: '';
  level: '';
  created_at: '';
}

export interface CourseModel {
  list: Course[];
  errorMessage: string;
}
