import { User } from '../../models/user.models';

export interface AuthState {
  isLoading: boolean;
  user: User | any;
  isAuthenticated: boolean;
  token: string;
  role: string;
  error: string | any;
}
export const authState: AuthState = {
  isLoading: false,
  user: null,
  isAuthenticated: false,
  token: '',
  role: '',
  error: null,
};
