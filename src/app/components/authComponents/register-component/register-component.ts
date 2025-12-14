import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth-service';
import { Router } from '@angular/router';
import { error } from 'console';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register-component',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {
 constructor(private _AuthService: AuthService, private _Router: Router) {}
 loading: boolean = false;
 errorText!: string;

 registerForm: FormGroup = new FormGroup(
  {
   name: new FormControl(null, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50), // 💡 تم تصحيح MaxLength إلى 50
   ]),
   email: new FormControl(null, [Validators.required, Validators.email]),
   password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
   rePassword: new FormControl(null),
   phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[125][0-9]{8}$/)]),
   role: new FormControl('Patient', [Validators.required]) // 💡 تعيين 'Patient' كقيمة افتراضية
  },
  this.confirmPassword
 );

 confirmPassword(g: AbstractControl) {
  return g.get('password')?.value === g.get('rePassword')?.value ? null : { missMatch: true };
 }

  // ⭐️ الإضافة الهامة: دالة لتعيين الدور عند النقر على الزر في الـ HTML
 selectRole(selectedRole: string): void {
  this.registerForm.get('role')?.setValue(selectedRole);
 }

 register(): void {
  if (this.registerForm.valid) {
   const registerData = this.registerForm.value;
  
   const userRole = this.registerForm.get('role')?.value; 
   this.loading = true;
      
   this._AuthService.register(registerData).subscribe({
    next: (res) => {
     if (res.message === 'success') {
      console.log(res);

      
      localStorage.setItem('role', userRole);

      this.errorText = 'Registration successful. Redirecting...';
      this.loading = false;

      setTimeout(() => {
       this._Router.navigate(['/login']); 
      }, 2000);
     } else {
      this.errorText = res.message;
      this.loading = false;
     }
    },

    error: (error) => {
     console.error(error);
     
     this.errorText = error.error?.message || 'An error occurred during registration.';
     this.loading = false;
    },
   });
  }
 }
}
