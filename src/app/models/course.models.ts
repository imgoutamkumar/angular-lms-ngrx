export interface Course {
  _id: string;
  title: string;
  category: string;
  level: string;
  price: number;
  primaryLanguage: string;
  subtitle: string;
  description: string;
  objectives: string;
  welcomeMessage: string;
  imageUrl: string;
  lectures: Lecture[];
  coupanCode: string;
  discount: string;
}

export interface Lecture {
  title: string;
  isFreePreview: boolean;
  videoUrl: string;
  public_id: string;
}

/* export interface CourseModel {
  list: Course[];
  errorMessage: string;
} */
