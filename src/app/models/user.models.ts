export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface UserModel {
  data: User | null;
  errorMessage: string;
  isLoading: boolean;
}
