import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authState } from '../states/auth.state';

export const selectAuthState = createFeatureSelector<any>('Auth');

// Individual selectors
export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);
export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);
export const selectRole = createSelector(
  selectAuthState,
  (state) => state.role
);
export const selectIsLoading = createSelector(
  selectAuthState,
  (state) => state.isLoading
);
export const selectError = createSelector(
  selectAuthState,
  (state) => state.error
);

export const selectMessage = createSelector(
  selectAuthState,
  (state) => state.message
);

// Combined selector (if needed)
/* export const selectAuthInfo = createSelector(selectAuthState, (state) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
  token: state.token,
  role: state.role,
})); */

export const selectPersistAuthState = (state: { auth: AuthState }) =>
  state.auth;

export const selectPersistToken = createSelector(
  selectPersistAuthState,
  (auth) => auth.token
);
