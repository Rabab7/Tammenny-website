import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth-service';
import { Router } from '@angular/router';
import { error } from 'console';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register-component',
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {
  authService = inject(AuthService)
  authRouter = inject(Router)
   loading:boolean=false
  errorText!:string
  message!:string
  registerForm :FormGroup = new FormGroup({
    name:new FormControl(null, [Validators.required , Validators.minLength(3), Validators.maxLength(5)]),
    email: new FormControl(null , [Validators.required , Validators.email]),
    password: new FormControl(null , [Validators.required ,  Validators.pattern(/^\w{6,}$/) ]),
    rePassword: new FormControl(null),
    phone: new FormControl(null , [ Validators.required  , Validators.pattern(/^01[125][0-9]{8}$/)]),
  } , this.confirmPassword)

   confirmPassword(g: AbstractControl){
    return g.get('password')?.value === g.get('rePassword')?.value ? null : {missMatch:true};
   
  }

  regiter(){
    const rawVal = this.registerForm.getRawValue();
    this.authService.register(rawVal.email , rawVal.password , rawVal.name , rawVal.role).subscribe({next:(res) => {
      this.authRouter.navigate(['/login'])
    },
    error:(err) => {
      this.errorText = err.code
    }}
    
      
    )
    
  }
  
  
}
