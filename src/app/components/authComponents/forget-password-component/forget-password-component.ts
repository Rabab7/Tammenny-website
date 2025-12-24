import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-forget-password-component',
  imports: [ ReactiveFormsModule , NgClass],
  templateUrl: './forget-password-component.html',
  styleUrl: './forget-password-component.css',
})
export class ForgetPasswordComponent {
  _AuthService = inject(AuthService)
   _Router = inject(Router)

  loading: boolean = false;
  errorText!: string;
  step = 'email' ; 
  userEmail: string = ''; 

  emailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  codeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.maxLength(6)]),
  });

  
  sendResetEmail(): void {
    if (this.emailForm.invalid) return;

    this.loading = true;
    this.userEmail = this.emailForm.get('email')?.value;

    this._AuthService.forgetPassword({ email: this.userEmail }).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.message === 'success') {
          this.errorText = 'Code sent successfully. Enter the code below.';
          this.step = 'code'; 
        } else {
          this.errorText = res.message || 'Failed to send code.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorText = err.error?.message || 'Error occurred while sending email.';
      },
    });
  }

 
  verifyCode(): void {
    if (this.codeForm.invalid) return;

    this.loading = true;
    const resetCode = this.codeForm.get('resetCode')?.value;

    this._AuthService.verifyCode({ email: this.userEmail, resetCode: resetCode }).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.message === 'success') {
          this.errorText = 'Code verified. Redirecting to reset password...';
          
          this._Router.navigate(['/auth/resetPassword'], { queryParams: { email: this.userEmail } });
        } else {
          this.errorText = res.message || 'Invalid code.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorText = err.error?.message || 'Error occurred during verification.';
      },
    });
  }
}
