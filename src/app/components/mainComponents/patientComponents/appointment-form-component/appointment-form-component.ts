import { Component } from '@angular/core';
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
export class AppointmentFormComponent  {
  suggestedDoctors: Doctor[] = [];
  allDoctors: Doctor[] = [];
  suggestedSpecialty: string | null = null;
  loadingDoctors: boolean = true;
  error: string | null = null;

  appointmentForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    symptoms: new FormControl(''), 
    tests: new FormControl(''), 
    selectedDoctorId: new FormControl(null, Validators.required), 
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
  });

  constructor(
    private _DataService: MainDataService,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    
    this.loadAllDoctors();

   
    this.appointmentForm.get('symptoms')?.valueChanges.subscribe((value) => {
      this.suggest(value);
    });
  }

  ngAfterViewInit(){
     setTimeout(()=> {
       alert(
      `If you wish to write down your symptoms, we will refer you to a doctor who specializes in your condition.If you do not wish to do so,please consult a general practitioner or choose a doctor who specializes in your condition.`
    );
     } , 1000)
  }

  loadAllDoctors(): void {
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

  suggest(symptoms: string): void {
    this.suggestedSpecialty = suggestSpecialty(symptoms);

    if (this.suggestedSpecialty) {
      
      this.suggestedDoctors = this.allDoctors.filter(
        (doc) => doc.specialty === this.suggestedSpecialty
      );
    } else {
      
      this.suggestedDoctors = this.allDoctors;
    }
  }

  

  submitAppointment(): void {
    console.log('Form Status:', this.appointmentForm.status); 
  console.log('Form Errors:', this.appointmentForm.errors);
  console.log('Form Value:', this.appointmentForm.value);

 
    if (this.appointmentForm.invalid) return;

    const formValue = this.appointmentForm.value;
    
    const patientId = this._AuthService.tokenDecode?.id || 101;

    const appointmentData: Appointment = {
      doctorId: formValue.selectedDoctorId,
      patientId: patientId,
      date: formValue.date,
      time: formValue.time,
      status: 'Pending',
      symptoms: formValue.symptoms,
      tests: formValue.tests,
    };

    
    this._Router.navigate(['/payment'], {
      queryParams: {
        fee: this.allDoctors.find((d) => d.id === formValue.selectedDoctorId)?.fee,
        doctorName: this.allDoctors.find((d) => d.id === formValue.selectedDoctorId)?.name,
        appointment: JSON.stringify(appointmentData), 
      },
    });
  }
  
}
