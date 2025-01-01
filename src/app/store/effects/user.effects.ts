import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { UserActions } from '../actions/user.action';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserEffects {
  loadUsers$;
  constructor(private actions$: Actions, private userService: UserService) {
    this.loadUsers$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.loadUsers),
        switchMap(({ queryParams }) =>
          this.userService.getAllUsers(queryParams).pipe(
            tap((response) => {
              console.group('Load Users Debugging');
              console.log('Response from service:', response);
              console.groupEnd();
            }),
            map((response: any) =>
              UserActions.loadUsersSuccess({
                users: response.users,
                total: response.total,
              })
            ),
            catchError((error) =>
              of(
                UserActions.loadUsersFailure({
                  error: {
                    code: error?.status || '500',
                    message: error?.message || 'An unexpected error occurred',
                  },
                })
              )
            )
          )
        )
      )
    );
  }
}
