import { Component } from '@angular/core';
import { MainDataService } from '../../../core/services/main/main-data-service';
import { AuthService } from '../../../core/services/auth/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-doctors-component',
  imports: [RouterLink],
  templateUrl: './doctors-component.html',
  styleUrl: './doctors-component.css',
})
export class DoctorsComponent {
   doctors: any[] = [];

 loading: boolean = true;
 error: string | null = null;
 
 constructor(private _DataService: MainDataService ,   private _AuthService: AuthService,
    private _Router: Router) {}

 ngOnInit(): void {
  
  this.loadDoctors();
 }

  loadDoctors(): void {
  this._DataService.getDoctors().subscribe({
   next: (data) => { this.doctors = data; this.loading = false; },
   error: (err) => { this.error = 'Failed to load doctors.'; this.loading = false; }
  });
 }


}
