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

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  authRouter = inject(Router);
  loading: boolean = false;
  errorText!: string;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(5),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
   
  });

  login() {
    const rawVal = this.registerForm.getRawValue();
    this.authService.login(rawVal.email, rawVal.password).subscribe({
      next: (res) => {
        this.authRouter.navigate(['/home']);
      },
      error: (err) => {
        this.errorText = err.code;
      },
    });
  }

  
 reset(){
  this.authRouter.navigate(['/forgotPassword'])
 }
}
