import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-doctor-component',
  imports: [RouterLink],
  templateUrl: './doctor-component.html',
  styleUrl: './doctor-component.css',
})

export class DoctorComponent {
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
