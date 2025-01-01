import { inject } from '@angular/core';
import { CanActivateFn, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectRole, selectToken } from '../store/selectors/auth.selectors';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router: Router = inject(Router);
  /* const role = sessionStorage.getItem('role');
  const token = sessionStorage.getItem('token'); */
  let token: string | null = null;
  let role: string | null = null;

  store.select(selectToken).subscribe((t) => (token = t));
  store.select(selectRole).subscribe((r) => (role = r));

  const isAdminRoute = state.url.startsWith('/admin');
  const isUserRoute = state.url.startsWith('/main');
  const isPublicRoute =
    state.url.includes('/auth/signin') ||
    state.url.includes('/auth/signup') ||
    state.url.includes('/auth/verify-otp');

  //const protectedRoutes: string[] = ['/main/home'];
  /*  return protectedRoutes.includes(state.url)
    ? router.navigate(['/auth/login'])
    : false; */

  // Helper function to navigate and return a UrlTree
  const redirectTo = (path: string): UrlTree => router.parseUrl(path);

  // Case 1: Root URL ('/')
  if (state.url === '/') {
    if (!token) {
      return redirectTo('/auth/signin');
    }
    return role === 'admin'
      ? redirectTo('/admin/dashboard')
      : redirectTo('/main/home');
  }

  // Case 2: Public routes (Login, Signup, Verify OTP)
  if (!token && !isPublicRoute) {
    return redirectTo('/auth/signin');
  }

  if (token && isPublicRoute) {
    return role === 'admin'
      ? redirectTo('/admin/dashboard')
      : redirectTo('/main/home');
  }

  // Case 3: Unauthorized access to admin routes
  if (token && role !== 'admin' && isAdminRoute) {
    return redirectTo('/un-authorized');
  }

  // Case 4: Unauthorized access to user routes
  if (token && role === 'admin' && isUserRoute) {
    return redirectTo('/un-authorized');
  }

  // Default case: Allow navigation
  return true;
};
