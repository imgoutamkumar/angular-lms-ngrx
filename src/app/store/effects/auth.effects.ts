import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import { login, loginFailure, loginSuccess } from '../actions/auth.action';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { User } from '../../models/user.models';

@Injectable()
export class AuthEffects {
  login$;
  constructor(private action$: Actions, private userService: UserService) {
    console.log('Actions injected:', this.action$);
    console.log('CourseService injected:', this.userService);

    this.login$ = createEffect(() =>
      this.action$.pipe(
        ofType(login),
        switchMap((data) => {
          return this.userService.login(data).pipe(
            map((userData: User) => {
              return loginSuccess({ data: userData });
            }),
            catchError((error) =>
              of(
                loginFailure({
                  errorMessage: error.message || 'Unknown error',
                })
              )
            )
          );
        })
      )
    );
  }
}
