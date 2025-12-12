import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-reset-password-component',
  imports: [NgClass , RouterLink , ReactiveFormsModule],
  templateUrl: './reset-password-component.html',
  styleUrl: './reset-password-component.css',
})
export class ResetPasswordComponent {
  authService = inject(AuthService);
  router = inject(Router); 
  route = inject(ActivatedRoute); // لجلب الباراميترات من الرابط
  loading: boolean = false;
  errorText: string | null = null;
  oobCode: string | null = null; // الكود الذي نحتاجه لتغيير كلمة المرور

  resetForm: FormGroup = new FormGroup({
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    confirmPassword: new FormControl(null, [Validators.required]),
  });

  constructor() {
    // جلب oobCode من الكويري باراميتر (Query Parameters)
    this.route.queryParams.subscribe((params) => {
      this.oobCode = params['oobCode'] || null;
      // إذا لم يكن هناك oobCode، لا يمكننا الاستمرار (أو نوجههم إلى صفحة الخطأ/البدء)
      if (!this.oobCode) {
        this.errorText = 'رابط إعادة تعيين كلمة المرور غير صالح أو منتهي الصلاحية.';
      }
    });

    // إضافة Custom Validator للتأكد من تطابق كلمتي المرور
    
  }

  // دالة تحقق مخصصة لتطابق كلمتي المرور
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      form.get('confirmPassword')?.setErrors(null);
      return null;
    }
  }

  resetPassword() {
    if (this.resetForm.invalid || !this.oobCode) return;

    this.loading = true;
    this.errorText = null;

    const newPassword = this.resetForm.get('newPassword')?.value;

    this.authService.confirmPasswordReset(this.oobCode!, newPassword).subscribe({
      next: () => {
        this.loading = false;
        alert('تم تغيير كلمة المرور بنجاح! سيتم توجيهك لصفحة الدخول.');
        // التوجيه إلى صفحة الدخول
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.errorText = err.code || 'فشل تغيير كلمة المرور. تأكد من أن الرابط صالح.';
      },
    });
  }
}
