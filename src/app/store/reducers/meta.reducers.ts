import { ActionReducer, MetaReducer } from '@ngrx/store';
import { AuthState } from '../states/auth.state';

export function sessionStorageMetaReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return (state, action) => {
    console.log('state', state);
    // Rehydrate state from sessionStorage on app initialization
    if (!state) {
      const token = sessionStorage.getItem('token');
      const role = sessionStorage.getItem('role');

      // Return the state with persisted values (if available)
      return {
        ...reducer(undefined, { type: '@@INIT' }), // Use the reducer's default state
        Auth: {
          token: token || null,
          role: role || null,
          isAuthenticated: !!token,
        },
      };
    }

    // Process the action and get the new state
    const nextState = reducer(state, action);
    console.log('nextState', nextState);
    console.log('action', action);
    // Persist only token, role, and userId (userId extracted from user object)
    // const authState = (nextState as { Auth: AuthState })?.Auth;
    const authState = nextState.Auth as AuthState;
    if (authState) {
      console.log('authState', authState);
      if (authState.token) {
        sessionStorage.setItem('token', authState.token);
      } else {
        sessionStorage.removeItem('token');
      }

      if (authState.role) {
        sessionStorage.setItem('role', authState.role);
      } else {
        sessionStorage.removeItem('role');
      }
    }

    return nextState;
  };
}

export const metaReducers: MetaReducer<any>[] = [sessionStorageMetaReducer];
