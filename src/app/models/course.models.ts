export interface Course {
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
  lectures: [
    {
      title: string;
      isFreePreview: false;
      videoUrl: string;
      public_id: string;
    }
  ];
  coupanCode: string;
  discount: string;
}

export interface CourseModel {
  list: Course[];
  errorMessage: string;
}
