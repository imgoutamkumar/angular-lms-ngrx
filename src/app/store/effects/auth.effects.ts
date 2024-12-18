import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import { AuthActions } from '../actions/auth.action';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';

//Note
/* Use switchMap when you only care about the latest emission and want to cancel ongoing requests.
 Use switchMap when dealing with frequent or consecutive actions (like search inputs, typing events, or rapid clicks). */

/* Use exhaustMap when you want to ignore duplicate actions and ensure that only one API call is processed at a time.
If the login action is triggered multiple times, exhaustMap ensures that only one API call will be executed. */

@Injectable()
export class AuthEffects {
  login$;
  setSessionOnLoginSuccess$;
  //logout$;
  constructor(private action$: Actions, private userService: UserService) {
    console.log('Actions injected:', this.action$);
    console.log('CourseService injected:', this.userService);

    this.login$ = createEffect(() =>
      this.action$.pipe(
        ofType(AuthActions.login),
        tap((action) => {
          console.log('action :', action);
        }),
        switchMap((data) => {
          return this.userService.login(data).pipe(
            map((resData: any) => {
              return AuthActions.loginSuccess({ data: resData });
            }),
            catchError((error) =>
              of(
                AuthActions.loginFailure({
                  error: error.message || 'Unknown error',
                })
              )
            )
          );
        })
      )
    );

    this.setSessionOnLoginSuccess$ = createEffect(
      () =>
        this.action$.pipe(
          ofType(AuthActions.loginSuccess),
          tap((action) => {
            console.log(
              'Login successful, setting session storage:',
              action.data
            );
            sessionStorage.setItem('role', action.data.user.role);
            sessionStorage.setItem('token', action.data.token);
          })
        ),
      { dispatch: false } // No new action dispatched from this effect
    );

    // Effect to handle logout and set session storage
    /* this.logout$ = createEffect(
      () =>
        this.action$.pipe(
          ofType(AuthActions.logout),
          tap(() => {
            console.log('Logging out, clearing session storage');
            sessionStorage.removeItem('authData');
          })
        ),
      { dispatch: false }
    ); */
  }
}
