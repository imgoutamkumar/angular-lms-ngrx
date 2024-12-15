import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../../store/actions/auth.action';
import { selectLoginSuccess } from '../../../store/selectors/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
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
    // Stop if the form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    console.log('Login successful!', this.loginForm.value);
    // Perform login logic here (e.g., dispatch NgRx action or call service)
    this.store.dispatch(login(this.loginForm.value));

    this.store.select(selectLoginSuccess).subscribe((data) => {
      console.log('data :', data);
      if (data) {
        this.router.navigate(['/home']); // Navigate to home page on success
      }
    });
  }
}
