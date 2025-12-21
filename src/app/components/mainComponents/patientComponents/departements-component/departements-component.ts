import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainDataService } from '../../../../core/services/main/main-data-service';
import { AuthService } from '../../../../core/services/auth/auth-service';

@Component({
  selector: 'app-departements-component',
  imports: [],
  templateUrl: './departements-component.html',
  styleUrl: './departements-component.css',
})
export class DepartementsComponent {
    doctors: any[] = [];
 departments: any[] = [];
 loading: boolean = true;
 error: string | null = null;
 
 constructor(private _DataService: MainDataService ,   private _AuthService: AuthService,
    private _Router: Router) {}

 ngOnInit(): void {
  this.loadDepartments();
 }

 loadDepartments(): void {
  this._DataService.getDepartments().subscribe({
   next: (data) => { this.departments = data; this.loading = false; },
   error: (err) => { this.error = 'Failed to load departments.'; this.loading = false; }
  });
 }
  

}
