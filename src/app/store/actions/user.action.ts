import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../models/user.models';

export interface UserQueryParams {
  search?: string;
  filter?: string; // e.g., gender, status, etc.
  page: number;
  limit: number;
}

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    //update user
    updateUserProfile: props<{ user: Partial<User> }>(), // Update user profile
    updateUserProfileSuccess: props<{ user: User }>(), // Handle successful profile update
    updateUserProfileFailure: props<{
      error: { code: string; message: string };
    }>(), // Handle profile update failure

    //all user
    loadUsers: props<{ queryParams: UserQueryParams }>(), // load all user
    loadUsersSuccess: props<{ users: User[]; total: number }>(), // Handle successful load all user
    loadUsersFailure: props<{
      error: { code: string; message: string };
    }>(),
  },
});
