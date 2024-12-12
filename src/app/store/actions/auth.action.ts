import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.models';

export const login = createAction(
  '[Login] Login',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ data: User }>()
);

export const loginFailure = createAction(
  '[Login] Login Failure',
  props<{ errorMessage: string }>()
);
