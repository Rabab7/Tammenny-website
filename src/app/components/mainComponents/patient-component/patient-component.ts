import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-patient-component',
  imports: [RouterLink],
  templateUrl: './patient-component.html',
  styleUrl: './patient-component.css',
})
export class PatientComponent {
   constructor(
    private _AuthService: AuthService,
    private _Router: Router
  ) {}


  handleLogout(): void {
   
    this._AuthService.logout();

   
    this._Router.navigate(['/login']);
  }
  
 
  get isAuthenticated(): boolean {
      return this._AuthService.isLoggedIn();
  }

}
