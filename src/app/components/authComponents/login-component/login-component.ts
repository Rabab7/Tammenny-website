import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth-service';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  loading: boolean = false;
  errorText!: string;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
  });

  login() {
  if (this.loginForm.invalid) return;

  this.loading = true;
  const rawVal = this.loginForm.value;

  this._AuthService.login(rawVal).subscribe({
    next: (res) => {
      this.loading = false;
      if (res.message === 'success' && res.token) {
        
        // 1. حفظ التوكن
        this._AuthService.saveDecodedToken(res.token);

        // 2. الحصول على الـ Role من الاستجابة (Response) مباشرة 
        // وليس من localStorage لأن الـ API هو المصدر الموثوق
        const userRole = res.user?.role || localStorage.getItem('role'); 

        console.log('User Role is:', userRole); // للتأكد في الـ Console

        if (userRole === 'Doctor') {
          this._Router.navigate(['/doctor']);
        } else if (userRole === 'Patient') {
          this._Router.navigate(['/home']);
        } else {
          this._Router.navigate(['/home']);
        }
      }
    },
    error: (err) => {
      this.errorText = err.error?.message || 'Login failed';
      this.loading = false;
    },
  });
}
}
