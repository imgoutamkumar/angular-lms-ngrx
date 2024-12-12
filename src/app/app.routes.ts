import { Routes } from '@angular/router';
import { MainComponent } from './components/layouts/main/main.component';
import { AuthComponent } from './components/layouts/auth/auth.component';
import { AdminComponent } from './components/layouts/admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/main/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      /* {
        path: 'products',
        loadComponent: () =>
          import('./pages/main/products/products.component').then(
            (m) => m.ProductsComponent
          ),
      }, */
      {
        path: 'courses',
        loadComponent: () =>
          import('./pages/main/courses/courses.component').then(
            (m) => m.CoursesComponent
          ),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full',
      },
      {
        path: 'signin',
        loadComponent: () =>
          import('./pages/auth/sign-in/sign-in.component').then(
            (m) => m.SignInComponent
          ),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./pages/auth/sign-up/sign-up.component').then(
            (m) => m.SignUpComponent
          ),
      },
      {
        path: 'verify-otp',
        loadComponent: () =>
          import('./pages/auth/verify-otp/verify-otp.component').then(
            (m) => m.VerifyOtpComponent
          ),
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import(
            './pages/admin/admin-dashboard/admin-dashboard.component'
          ).then((m) => m.AdminDashboardComponent),
      },
      {
        path: 'courseList',
        loadComponent: () =>
          import('./pages/admin/course-list/course-list.component').then(
            (m) => m.CourseListComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  }, //fallback route
];
