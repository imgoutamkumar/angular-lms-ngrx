import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { CourseReducer } from './store/reducers/course.reducers';
import { provideEffects } from '@ngrx/effects';
import { CourseEffects } from './store/effects/course.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthEffects } from './store/effects/auth.effects';
import { AuthReducer } from './store/reducers/auth.reducers';
import { metaReducers } from './store/reducers/meta.reducers';
import { UserReducer } from './store/reducers/user.reducers';
import { UserEffects } from './store/effects/user.effects';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    //provideClientHydration(),
    provideHttpClient(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideStore(
      { Course: CourseReducer, Auth: AuthReducer, User: UserReducer },
      { metaReducers }
    ),
    provideEffects([CourseEffects, AuthEffects, UserEffects]),
    provideStoreDevtools(),
    provideAnimationsAsync(),
  ],
};
