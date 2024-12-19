import { createActionGroup, props } from '@ngrx/store';
import { User } from '../../models/user.models';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    updateUserProfile: props<{ user: Partial<User> }>(), // Update user profile
    updateUserProfileSuccess: props<{ user: User }>(), // Handle successful profile update
    updateUserProfileFailure: props<{
      error: { code: string; message: string };
    }>(), // Handle profile update failure
  },
});
