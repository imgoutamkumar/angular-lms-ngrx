import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserModel } from '../../models/user.models';

export const selectAuthState = createFeatureSelector<UserModel>('Login');

// Selector to get the login success status
export const selectLoginSuccess = createSelector(
  selectAuthState,
  (state: UserModel) => state.isLoading
);
