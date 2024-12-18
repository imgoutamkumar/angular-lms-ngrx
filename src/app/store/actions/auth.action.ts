import { createAction, createActionGroup, props } from '@ngrx/store';

/* export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ errorMessage: any }>()
);

export const signup = createAction(
  '[Auth] Signup',
  props<{ username: string; password: string; email: string }>() 
);

export const signupSuccess = createAction(
  '[Auth] Signup Success',
  props<{ user: any }>() 
);


export const signupFailure = createAction(
  '[Auth] Signup Failure',
  props<{ errorMessage: any }>() 
); */

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<{ email: string; password: string }>(), // Login request action
    loginSuccess: props<{ data: any }>(), // Login success action
    loginFailure: props<{ error: any }>(), // Login failure action

    signup: props<{ email: string; password: string; name: string }>(), // Signup request action
    signupSuccess: props<{ data: any }>(), // Signup success action
    signupFailure: props<{ error: any }>(), // Signup failure action
  },
});
