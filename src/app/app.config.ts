import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { provideAuth, getAuth } from '@angular/fire/auth';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import {environment}  from './core/environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { fakeAuthInterceptor } from './core/intercepters/fake-auth-interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptoeInterceptor } from './core/intercepters/loading/loading-interceptoe-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(
      withInterceptors([
        fakeAuthInterceptor 
      ]),
     
    ),

   
  ]
};
