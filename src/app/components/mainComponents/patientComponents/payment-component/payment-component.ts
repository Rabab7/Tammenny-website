import { Component } from '@angular/core';
import { Appointment } from '../../../core/interfaces/models/medical';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MainDataService } from '../../../core/services/main/main-data-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-component',
  imports: [ ReactiveFormsModule],
  templateUrl: './payment-component.html',
  styleUrl: './payment-component.css',
})
export class PaymentComponent {

  fee: number = 0;
  doctorName: string = 'N/A';
  appointmentData!: Appointment;
  
  
  loading: boolean = false;
  paymentStatus: 'pending' | 'processing' | 'success' | 'failed' = 'pending';

 
  paymentForm!: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _DataService: MainDataService
  ) {}

  ngOnInit(): void {
   
    this.initPaymentForm();

   
    this._route.queryParams.subscribe(params => {
      this.fee = parseFloat(params['fee']) || 0;
      this.doctorName = params['doctorName'] || 'N/A';
      if (params['appointment']) {
        this.appointmentData = JSON.parse(params['appointment']);
      }
    });
  }

  
  initPaymentForm(): void {
    this.paymentForm = new FormGroup({
      cardName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      cardNumber: new FormControl(null, [Validators.required, Validators.pattern(/^\d{16}$/)]),
      expiry: new FormControl(null, [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]),
      cvv: new FormControl(null, [Validators.required, Validators.pattern(/^\d{3}$/)])
    });
  }

  processPayment(): void {
    if (this.paymentForm.invalid) return; 

    this.loading = true;
    this.paymentStatus = 'processing';
    
    
    setTimeout(() => {
      const paymentSuccessful = true; 
      
      if (paymentSuccessful) {
        this.saveAppointment();
      } else {
        this.paymentStatus = 'failed';
        this.loading = false;
      }
    }, 2000);
  }

  saveAppointment(): void {
    this.paymentStatus = 'success';
    
    
    this._DataService.makeAppointment(this.appointmentData).subscribe({
      next: (newAppointment) => {
        console.log('Appointment saved:', newAppointment);
        this.loading = false;
        alert('Payment successful and appointment booked!');
        this._router.navigate(['/home']);
      },
      error: (err) => {
        this.paymentStatus = 'failed';
        this.loading = false;
        console.error('Error saving appointment:', err);
      }
    });
  }

}
