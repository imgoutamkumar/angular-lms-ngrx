import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authState } from '../states/auth.state';

export const selectAuthState = createFeatureSelector<any>('Auth');

// Selector to get the login success status
export const selectLoginSuccess = createSelector(
  selectAuthState,
  (state: any) => state.isLoading
);
