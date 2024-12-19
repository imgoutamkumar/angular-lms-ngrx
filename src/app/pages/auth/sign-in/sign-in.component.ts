import { Component, OnInit, signal, Signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../store/actions/auth.action';
import {
  selectIsAuthenticated,
  selectIsLoading,
  selectRole,
} from '../../../store/selectors/auth.selectors';
import { filter, Observable, switchMap, take } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatIconModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLoginFormSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.store.select(selectIsLoading);
    console.log('this.loginForm.value :', this.loginForm.value);
    // Perform login logic here (e.g., dispatch NgRx action or call service)
    this.store.dispatch(AuthActions.login(this.loginForm.value));

    this.store
      .select(selectIsLoading)
      .pipe(
        filter((isLoading) => !isLoading), // Proceed only when loading is false
        take(1), // Complete after the first emission
        switchMap(() => this.store.select(selectIsAuthenticated)), // Check authentication status
        filter((isAuth) => isAuth), // Proceed only if authenticated
        take(1), // Complete after the first emission
        switchMap(() => this.store.select(selectRole)), // Get the user role
        take(1) // Complete after the first emission
      )
      .subscribe((role) => {
        if (role === 'user') {
          this.router.navigate(['/main/home']);
        }
        if (role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        }
      });
  }
}
