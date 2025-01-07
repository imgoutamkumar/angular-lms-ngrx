import { User } from '../../models/user.models';
import { UserQueryParams } from '../actions/user.action';

export interface UserState {
  isLoading: boolean;
  users: User[] | any;
  total: number;
  error: string | any;
  message: string;
  //queryParams: UserQueryParams;
}
export const userState: UserState = {
  isLoading: false,
  users: null,
  total: 0,
  error: null,
  message: '',
  //queryParams: { search: '', filter: '', page: 1, limit: 10 },
};
