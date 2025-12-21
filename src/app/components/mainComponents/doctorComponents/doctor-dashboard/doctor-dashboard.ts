import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainDataService } from '../../../../core/services/main/main-data-service';
import { AuthService } from '../../../../core/services/auth/auth-service';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [NgClass, ReactiveFormsModule, DatePipe , RouterLink],
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
  _Router = inject(Router)
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
        // تفريغ المصفوفة قبل البدء لتجنب التكرار عند إعادة التحميل
        this.appointments = [];

        appointments.forEach((appt: any) => {
          // جلب بيانات المريض
          this.dataService.getPatientById(appt.patientId).subscribe((patient) => {
            // جلب السجل الطبي
            this.dataService.getPatientRecords(appt.patientId).subscribe((records) => {
              // 3. ⚠️ النقطة الحاسمة: تحويل الطرفين لنصوص عند المقارنة
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

    const recordId = this.activeRecord.record.id;
    const notes = this.commentForm.value.doctorNotes;

    this.dataService.updateMedicalRecord(recordId, { doctorNotes: notes }).subscribe(() => {
      this.activeRecord.record.doctorNotes = notes;
      this.activeRecord = null;
      alert('Notes saved');
    });
  }

  closeCommentForm(): void {
    this.activeRecord = null;
  }

  handleLogout(): void {
    
    this.authService.logout();

    
    this._Router.navigate(['/login']);
  }
  
  
  get isAuthenticated(): boolean {
      return this.authService.isLoggedIn();
  }

}
