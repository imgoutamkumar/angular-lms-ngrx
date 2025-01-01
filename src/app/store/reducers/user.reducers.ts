import { createReducer, on } from '@ngrx/store';
import { UserState, userState } from '../states/user.state';
import { UserActions } from '../actions/user.action';

const userReducer = createReducer(
  userState,
  on(UserActions.loadUsers, (state) => ({
    ...state,
    isLoading: true,
    error: null, // Reset error when a new request is initiated
  })),
  on(UserActions.loadUsersSuccess, (state, action) => ({
    ...state,
    users: action.users,
    isLoading: false,
    error: null, // Clear error on success
  })),
  on(UserActions.loadUsersFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error?.message || 'An error occurred', // Use dynamic error
  }))
);

export function UserReducer(state: UserState | undefined, action: any) {
  return userReducer(state, action);
}
