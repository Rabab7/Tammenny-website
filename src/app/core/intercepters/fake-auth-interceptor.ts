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
  { id: '1', email: 'doctor@test.com', password: '123456', name: 'Dr. Wael', role: 'Doctor' },
  {id: '101', email: 'patient@test.com', password: '123456',name: 'Patient Ali',role: 'Patient',},
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

          // * if user We create a fake JWT (token) and record the role in localStorage
          if (user) {
            const userPayload = {
              id: user.id,
              name: user.name,
              role: user.role,
              iat: 1516239022, // * the iat stands for "Issued At Time" which is the timestamp when the token was issued (fixed in this fake api)
            };

            const base64Payload = btoa(JSON.stringify(userPayload));

            // * taken (header.payload.signture)
            const fakeToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${base64Payload}.SflKxwRJSMeKKF2QT4fWsyDq1W5I_MDF9EBNqJ0rKng`;

            localStorage.setItem('role', user.role);

            return of(
              new HttpResponse({
                status: 200,
                body: {
                  message: 'success',
                  token: fakeToken,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                  },
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

          const newId =
            FAKE_USERS.length > 0
              ? (Math.max(...FAKE_USERS.map((u) => Number(u.id))) + 1).toString()
              : '1';

          if (FAKE_USERS.find((u) => u.email === email)) {
            return throwError(
              () =>
                new HttpResponse({
                  status: 409,
                  body: { message: 'Account already exists. Please login.' },
                })
            );
          }

          const newUser = { id: newId, email, password, name, role };

          FAKE_USERS.push(newUser);

          localStorage.setItem('role', role);

          return of(
            new HttpResponse({
              status: 200,
              body: {
                message: 'success',
                user: { id: newId, name, email, role },
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
            // fake code
            return of(new HttpResponse({ status: 200, body: { message: 'success' } }));
          } else {
            return throwError(
              () => new HttpResponse({ status: 400, body: { message: 'Invalid reset code.' } })
            );
          }
        }

        // * 6.(Reset Password)
        if (req.url.endsWith('/auth/resetPassword') && req.method === 'PUT') {
          const { email, newPassword } = req.body; 

          
          const userIndex = FAKE_USERS.findIndex((u) => u.email === email);

          if (userIndex !== -1) {
            FAKE_USERS[userIndex].password = newPassword; 
            console.log('Password updated for user:', email, 'New password is:', newPassword);

            return of(
              new HttpResponse({
                status: 200,
                body: { message: 'success' },
              })
            );
          } else {
            return throwError(
              () =>
                new HttpResponse({
                  status: 404,
                  body: { message: 'User not found' },
                })
            );
          }
        }

        return next(req);
      })
    )
    .pipe(delay(500));
};
