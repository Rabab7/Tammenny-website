import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgClass } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth-service';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css'
})
export class VerifyCodeComponent {
   constructor(private _AuthService:AuthService,private _Router:Router){}
      loading:boolean=false
      errorText!:string
    
    
      verifyCodeForm:FormGroup = new FormGroup({
        resetCode:new FormControl([null , [Validators.required]]),
    
      })
    
    
      verifyCode(): void {
        const email = sessionStorage.getItem('email') 
        if (this.verifyCodeForm.valid && email) {
          const resetCode = this.verifyCodeForm.get('resetCode')?.value; 
          const data = { email, resetCode }; 
      
          this.loading = true;
      
          this._AuthService.verifyCode(data).subscribe({
            next: (res) => {
              console.log(res);
              this.errorText = res.message;
              this.loading = false;
      
              setTimeout(() => {
                this._Router.navigate(['/resetPassword']);
              }, 2000);
            }
          });
        } 
      }
      
      
}
