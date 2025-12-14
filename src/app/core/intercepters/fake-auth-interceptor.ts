// src/app/core/interceptors/fake-auth.interceptor.ts

import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { environment } from '../environments/environment';
import { delay, mergeMap, Observable, of, throwError } from 'rxjs';

let FAKE_USERS = [
  { email: 'doctor@test.com', password: '123456', name: 'Dr. Wael', role: 'Doctor' },
  { email: 'patient@test.com', password: '123456', name: 'Patient Ali', role: 'Patient' },
];

export const fakeAuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const baseUrl = environment.baseUrl;

  
  return of(null)
    .pipe(
      mergeMap(() => {
        // * 2.(Sign In)
        if (req.url.endsWith('/auth/signin') && req.method === 'POST') {
          const { email, password } = req.body;
          const user = FAKE_USERS.find((u) => u.email === email && u.password === password);

          if (user) {
            
            

            const userPayload = {
              id: '1a2b3c',
              name: user.name,
              role: user.role, 
              iat: 1516239022,
            };

            
            const base64Payload = btoa(JSON.stringify(userPayload));

            
            const fakeToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${base64Payload}.SflKxwRJSMeKKF2QT4fWsyDq1W5I_MDF9EBNqJ0rKng`;
            
           
            localStorage.setItem('role', user.role); 

            return of(
              new HttpResponse({
                status: 200,
                body: {
                  message: 'success',
                  token: fakeToken,
                  user: { name: user.name, email: user.email },
                },
              })
            );
             

          } else {
           
            return throwError(
              () =>
                new HttpResponse({
                  status: 401,
                  body: { message: 'Invalid email or password.' },
                })
            );
          }
        }

        // * 3.(Sign Up)
        if (req.url.endsWith('/auth/signup') && req.method === 'POST') {
          const { email, password, role, name } = req.body;

          if (FAKE_USERS.find((u) => u.email === email)) {
            
            return throwError(
              () =>
                new HttpResponse({
                  status: 409,
                  body: { message: 'Account already exists. Please login.' },
                })
            );
          }

         
          FAKE_USERS.push({ email, password, name, role });

          
          localStorage.setItem('role', role);

          return of(
            new HttpResponse({
              status: 200,
              body: {
                message: 'success',
                user: { name: name, email: email, role: role },
              },
            })
          );
        }

        // * 4. (Forgot Password)
        if (req.url.endsWith('/auth/forgotPasswords') && req.method === 'POST') {
          return of(
            new HttpResponse({
              status: 200,
              body: { message: 'success', statusMsg: 'Reset code sent successfully.' },
            })
          );
        }

        // * 5. (Verify Reset Code)
        if (req.url.endsWith('/auth/verifyResetCode') && req.method === 'POST') {
          const { resetCode } = req.body;
          if (resetCode === '123456') {
            // كود وهمي
            return of(new HttpResponse({ status: 200, body: { message: 'success' } }));
          } else {
            return throwError(
              () => new HttpResponse({ status: 400, body: { message: 'Invalid reset code.' } })
            );
          }
        }

        // * 6.(Reset Password)
        if (req.url.endsWith('/auth/resetPassword') && req.method === 'PUT') {
          return of(new HttpResponse({ status: 200, body: { message: 'success' } }));
        }

        
        return next(req);
      })
    )
    .pipe(delay(500));
};