import { User } from '../../models/user.models';
import { UserQueryParams } from '../actions/user.action';

export interface UserState {
  isLoading: boolean;
  users: User[] | any;
  error: string | any;
  message: string;
  //queryParams: UserQueryParams;
}
export const userState: UserState = {
  isLoading: false,
  users: null,
  error: null,
  message: '',
  //queryParams: { search: '', filter: '', page: 1, limit: 10 },
};
