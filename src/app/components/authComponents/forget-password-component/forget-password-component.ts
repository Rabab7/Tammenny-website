import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-forget-password-component',
  imports: [NgClass , RouterLink , ReactiveFormsModule],
  templateUrl: './forget-password-component.html',
  styleUrl: './forget-password-component.css',
})
export class ForgetPasswordComponent {
  authService = inject(AuthService);
  authRouter = inject(Router);
  loading: boolean = false;
  successMessage: string | null = null;
  errorText: string | null = null;

  forgetForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  sendResetLink() {
    if (this.forgetForm.invalid) return;

    this.loading = true;
    this.errorText = null;
    this.successMessage = null;

    const email = this.forgetForm.get('email')?.value;

    this.authService.sendPasswordResetLink(email).subscribe({
      next: () => {
        this.loading = false;
        
        this.successMessage =
          'A password reset link has been sent. Plz check your email.';
      },
      error: (err) => {
        this.loading = false;
        this.errorText = err.code || 'Something Wrong Plz Try Again Later';
      },
    });
  }
}
