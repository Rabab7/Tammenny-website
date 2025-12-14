import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  tokenDecode: any;
  userId!: string;
  userRole!: string;

  // * 1. Register
  register(registerData: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/auth/signup`, registerData);
  }

  // * 2. Login
  login(loginData: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/auth/signin`, loginData);
  }

  // * 3. Forget Password (Send Reset Code)
  forgetPassword(data: { email: string }): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/auth/forgotPasswords`, data);
  }

  // * 4. Verify Code
  verifyCode(data: { email: string; resetCode: string }): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/auth/verifyResetCode`, data);
  }

  // * 5. Reset Password
  resetPassword(data: { email: string; newPassword: string }): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/auth/resetPassword`, data);
  }

  saveDecodedToken(token: string): void {
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('role', this.userRole);

      this.tokenDecode = jwtDecode(token);
      this.userId = this.tokenDecode.id;

      const localRole = localStorage.getItem('role');
      this.userRole = localRole || this.tokenDecode.role || 'Guest';
    } catch (e) {
      console.error('Error decoding token:', e);
    }
  }

  // * Logout
  logout(): void {
    // * 1. delete token
    localStorage.removeItem('token');

    // * 2. delete role
    localStorage.removeItem('role');

    // * 3. delete other data
    this.tokenDecode = null;
    this.userId = '';
    this.userRole = '';
  }

  // * show status of authentication 
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
