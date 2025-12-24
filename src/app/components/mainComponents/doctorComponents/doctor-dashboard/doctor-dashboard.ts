import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainDataService } from '../../../../core/services/main/main-data-service';
import { AuthService } from '../../../../core/services/auth/auth-service';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DoctorSlotsComponent } from '../doctor-slots-component/doctor-slots-component';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [NgClass, ReactiveFormsModule, DatePipe],
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.css',
})
export class DoctorDashboard {
  doctorId: any = '1';
  appointments: any[] = [];
  activeRecord: any = null;

  commentForm: FormGroup;
  dataService = inject(MainDataService);
  authService = inject(AuthService);
  _Router = inject(Router);
  fb = inject(FormBuilder);

  constructor() {
    this.commentForm = this.fb.group({
      doctorNotes: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const savedId = this.authService.tokenDecode?.id;
    this.doctorId = savedId ? String(savedId) : '1';

    this.loadAppointments();
  }

  loadAppointments(): void {
    this.dataService.getDoctorAppointments(this.doctorId).subscribe({
      next: (appointments) => {
        this.appointments = [];

        appointments.forEach((appt: any) => {
          this.dataService.getPatientById(appt.patientId).subscribe((patient) => {
            this.dataService.getPatientRecords(appt.patientId).subscribe((records) => {
              const record = records.find((r: any) => String(r.doctorId) === String(this.doctorId));

              this.appointments.push({
                appointment: appt,
                patient: patient,
                record: record,
              });
            });
          });
        });
      },
      error: (err) => console.error('Error loading appointments:', err),
    });
  }

  openCommentForm(item: any): void {
    this.activeRecord = item;
    this.commentForm.patchValue({
      doctorNotes: item.record?.doctorNotes || '',
    });
  }


  submitComment(): void {
    if (!this.activeRecord || this.commentForm.invalid) return;

    const notes = this.commentForm.value.doctorNotes;

    // * If the patient has a previous record (update)
    if (this.activeRecord.record) {
      const recordId = this.activeRecord.record.id;
      this.dataService.updateMedicalRecord(recordId, { doctorNotes: notes }).subscribe({
        next: () => {
          this.activeRecord.record.doctorNotes = notes;
          this.closeCommentForm();
          alert('Notes updated!');
        },
      });
    }
    // * If it is a new patient (creating a record for the first time)
    else {
      const newRecord = {
        patientId: String(this.activeRecord.appointment.patientId),
        doctorId: String(this.doctorId),
        date: new Date().toISOString().split('T')[0],
        doctorNotes: notes,
        diagnosis: 'Initial Diagnosis',
      };

      this.dataService.createMedicalRecord(newRecord).subscribe({
        next: (res) => {
          // * We update the element in the array immediately so that the "Edit" button appears instead of "Add"
          this.activeRecord.record = res;
          this.closeCommentForm();
          alert('New record created and notes saved!');
          this.loadAppointments(); // * Reload to ensure data linking
        },
      });
    }
  }

  
  finalizeAction(message: string): void {
    alert(message);
    this.activeRecord = null;
    this.commentForm.reset();
    this.loadAppointments(); 
  }

  closeCommentForm(): void {
    this.activeRecord = null;
  }

  handleLogout(): void {
    this.authService.logout();

    this._Router.navigate(['/auth/login']);
  }

  get isAuthenticated(): boolean {
    return this.authService.isLoggedIn();
  }
}
