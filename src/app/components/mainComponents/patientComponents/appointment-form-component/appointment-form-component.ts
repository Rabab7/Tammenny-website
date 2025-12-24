import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { generate } from 'rxjs';
import { Appointment, Doctor } from '../../../../core/interfaces/models/medical';
import { MainDataService } from '../../../../core/services/main/main-data-service';
import { AuthService } from '../../../../core/services/auth/auth-service';
import { suggestSpecialty } from '../../../../core/constants/symptoms';

@Component({
  selector: 'app-appointment-form-component',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './appointment-form-component.html',
  styleUrl: './appointment-form-component.css',
})
export class AppointmentFormComponent {
  private _DataService = inject(MainDataService);
  private _AuthService = inject(AuthService);
  private _Router = inject(Router);

  suggestedDoctors: Doctor[] = [];
  allDoctors: Doctor[] = [];
  availableSlots: any[] = [];
  suggestedSpecialty: string | null = null;
  loadingDoctors: boolean = true;
  error: string | null = null;
  selectedSlotId: string | null = null;

  // * specialists list
  specialties: string[] = [
    'Cardiology',
    'Neurology',
    'Hepatology',
    'Physical Therapy',
    'Eyecare',
    'Pediatrics',
    'Dermatology',
  ];

  appointmentForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    symptoms: new FormControl(''),
    specialty: new FormControl(''),
    tests: new FormControl(''),
    selectedDoctorId: new FormControl(null, Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.loadAllDoctors();

    this.appointmentForm.get('selectedDoctorId')?.valueChanges.subscribe((docId) => {
      if (docId) {
        this.selectedSlotId = null;
        this.appointmentForm.patchValue({ date: '', time: '' });
        this.loadDoctorSlots(docId); // * Here we use the docId we just selected
      }
    });

    // * Monitoring specialty and symptoms 
    this.appointmentForm
      .get('specialty')
      ?.valueChanges.subscribe((spec) => this.filterDoctors(spec));
    this.appointmentForm.get('symptoms')?.valueChanges.subscribe((value) => {
      const suggested = suggestSpecialty(value);
      if (suggested) {
        this.suggestedSpecialty = suggested;
        this.appointmentForm.get('specialty')?.setValue(suggested, { emitEvent: true });
      }
    });
  }

  // * 1. method that get all doctors 
  loadAllDoctors(): void {
    this.loadingDoctors = true;
    this._DataService.getDoctors().subscribe({
      next: (data: Doctor[]) => {
        this.allDoctors = data;
        this.suggestedDoctors = data;
        this.loadingDoctors = false;
      },
      error: (err) => {
        this.error = 'Failed to load doctors.';
        this.loadingDoctors = false;
      },
    });
  }

  // * filteration method
  filterDoctors(spec: string): void {
    if (spec) {
      this.suggestedDoctors = this.allDoctors.filter((doc) => doc.specialty === spec);
    } else {
      this.suggestedDoctors = this.allDoctors;
    }

    this.appointmentForm.get('selectedDoctorId')?.setValue(null);
    this.availableSlots = [];
  }

  // * 2. Appointment fetching function (only called when we select a doctor)
  loadDoctorSlots(doctorId: string): void {
    this._DataService.getAvailableSlots(doctorId).subscribe({
      next: (slots) => {
        // * Filtering here: We only show appointments that still have slots (bookedCount < maxPatients)
        this.availableSlots = slots.filter((s: any) => s.bookedCount < s.maxPatients);
        console.log('Available Slots for this doctor:', this.availableSlots);
      },
      error: () => (this.error = 'Could not load slots for this doctor.'),
    });
  }

  selectSlot(slot: any): void {
    this.selectedSlotId = slot.id;
    this.appointmentForm.patchValue({ date: slot.day, time: slot.time });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      alert(`Choose a specialty or describe your symptoms to find the right doctor.`);
    }, 1000);
  }

  submitAppointment(): void {
    if (this.appointmentForm.invalid) return;
    const formValue = this.appointmentForm.value;
    const appointmentData = {
      ...formValue,
      patientId: this._AuthService.tokenDecode?.id || '101',
      slotId: this.selectedSlotId,
    };
    const selectedDoc = this.allDoctors.find((d) => d.id === formValue.selectedDoctorId);

    this._Router.navigate(['/patient-layout/payment'], {
      queryParams: {
        fee: selectedDoc?.fee,
        doctorName: selectedDoc?.name,
        department: selectedDoc?.specialty,
        appointment: JSON.stringify(appointmentData),
      },
    });
  }
}
