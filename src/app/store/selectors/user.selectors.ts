import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUserState = createFeatureSelector<any>('User');

// Individual selectors
export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectTotal = createSelector(
  selectUserState,
  (state) => state.total
);
