import { createReducer, on } from '@ngrx/store';
import { authState } from '../states/auth.state';
import { AuthActions } from '../actions/auth.action';
('../actions/auth.action');
const authReducer = createReducer(
  authState,
  on(AuthActions.login, (state) => ({ ...state, isLoading: true })),
  on(AuthActions.loginSuccess, (state, action) => {
    console.log('action', action);
    return {
      ...state,
      user: action.user,
      isAuthenticated: true,
      token: action.token,
      role: action.role,
      isLoading: false,
      error: '',
    };
  }),
  on(AuthActions.loginFailure, (state, action) => {
    return {
      ...state,
      user: null,
      isAuthenticated: false,
      token: '',
      isLoading: false,
      error: action.error,
    };
  }),
  on(AuthActions.logout, (state) => ({ ...state, isLoading: true })),
  on(AuthActions.logoutSuccess, (state, action) => {
    console.log('action', action);
    return {
      ...state,
      user: null,
      token: '',
      role: '',
      isAuthenticated: false,
      isLoading: false,
      error: '',
      message: action.message,
    };
  }),
  on(AuthActions.logoutFailure, (state, action) => {
    return {
      ...state,
      user: null,
      isLoading: false,
      error: action.error,
    };
  })
);

export function AuthReducer(state: any, action: any) {
  return authReducer(state, action);
}
