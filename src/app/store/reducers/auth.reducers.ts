import { createReducer, on } from '@ngrx/store';
import { authState } from '../states/auth.state';
import { login, loginFailure, loginSuccess } from '../actions/auth.action';

const authReducer = createReducer(
  authState,
  on(login, (state) => ({ ...state, isLoading: true })),
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      isLoading: false,
      errorMessage: '',
    };
  }),
  on(loginFailure, (state, action) => {
    return {
      ...state,
      data: null,
      isLoading: false,
      errorMessage: action.errorMessage,
    };
  })
);

export function AuthReducer(state: any, action: any) {
  return authReducer(state, action);
}
