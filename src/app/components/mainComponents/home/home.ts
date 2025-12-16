import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth-service';
import { Router, RouterLink } from '@angular/router';
import { MainDataService } from '../../../core/services/main/main-data-service';


@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  doctors: any[] = [];
 departments: any[] = [];
 loading: boolean = true;
 error: string | null = null;
 
 constructor(private _DataService: MainDataService ,   private _AuthService: AuthService,
    private _Router: Router) {}

 ngOnInit(): void {
  this.loadDepartments();
  this.loadDoctors();
 }

 loadDepartments(): void {
  this._DataService.getDepartments().subscribe({
   next: (data) => { this.departments = data; },
   error: (err) => { this.error = 'Failed to load departments.'; this.loading = false; }
  });
 }
 
 loadDoctors(): void {
  this._DataService.getDoctors().subscribe({
   next: (data) => { this.doctors = data; this.loading = false; },
   error: (err) => { this.error = 'Failed to load doctors.'; this.loading = false; }
  });
 }

  handleLogout(): void {
   
    this._AuthService.logout();

   
    this._Router.navigate(['/login']);
  }
  
 
  get isAuthenticated(): boolean {
      return this._AuthService.isLoggedIn();
  }

 

}
