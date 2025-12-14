import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth-service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-reset-password-component',
  imports: [ ReactiveFormsModule , NgClass],
  templateUrl: './reset-password-component.html',
  styleUrl: './reset-password-component.css',
})
export class ResetPasswordComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  loading: boolean = false;
  errorText!: string;
  userEmail: string = '';

  resetForm: FormGroup = new FormGroup(
    {
      newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
      confirmPassword: new FormControl(null),
    },
    this.confirmPassword
  );

  ngOnInit(): void {
   
    this._ActivatedRoute.queryParams.subscribe((params) => {
      this.userEmail = params['email'] || '';
      if (!this.userEmail) {
       
        this._Router.navigate(['/forgotPassword']);
      }
    });
  }

  confirmPassword(g: AbstractControl) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null
      : { missMatch: true };
  }

  resetPassword(): void {
    if (this.resetForm.invalid || !this.userEmail) return;

    this.loading = true;
    const newPassword = this.resetForm.get('newPassword')?.value;

    this._AuthService.resetPassword({ email: this.userEmail, newPassword: newPassword }).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.message === 'success') {
          this.errorText = 'Password reset successfully. Redirecting to login...';
          setTimeout(() => {
            this._Router.navigate(['/login']);
          }, 2000);
        } else {
          this.errorText = res.message || 'Failed to reset password.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorText = err.error?.message || 'Error occurred while resetting password.';
      },
    });
  }
}
