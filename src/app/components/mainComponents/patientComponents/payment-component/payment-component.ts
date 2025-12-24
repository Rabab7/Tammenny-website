import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Appointment } from '../../../../core/interfaces/models/medical';
import { MainDataService } from '../../../../core/services/main/main-data-service';

@Component({
  selector: 'app-payment-component',
  imports: [ ReactiveFormsModule],
  templateUrl: './payment-component.html',
  styleUrl: './payment-component.css',
})
export class PaymentComponent {
private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _DataService = inject(MainDataService);

  fee: number = 0;
  doctorName: string = 'N/A';
  departmentName: string = 'N/A';
  appointmentData!: any;
  
  loading: boolean = false;
  paymentStatus: 'pending' | 'processing' | 'success' | 'failed' = 'pending';
  paymentForm!: FormGroup;

  ngOnInit(): void {
    this.initPaymentForm();

    this._route.queryParams.subscribe(params => {
      this.fee = Number(params['fee']) || 0;
      this.doctorName = params['doctorName'] || 'N/A';
    
      this.departmentName = params['department'] || 'General';

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
    
    // * Payment process simulation
    setTimeout(() => {
       this.saveAppointment();
    }, 900);
  }

  saveAppointment(): void {
    // * 1. Save the reservation in the schedule 
    this._DataService.makeAppointment(this.appointmentData).subscribe({
      next: () => {
        if (this.appointmentData.slotId) {
          this.updateSlotCount(this.appointmentData.slotId);
        } else {
          this.finalizeSuccess();
        }
      },
      error: (err) => {
        this.paymentStatus = 'failed';
        this.loading = false;
        console.error('Error saving appointment:', err);
      }
    });
  }

  updateSlotCount(slotId: string): void {
  this._DataService.getSlotById(slotId).subscribe({
    next: (currentSlot) => {
      if (currentSlot) {
        const updatedCount = (currentSlot.bookedCount || 0) + 1;

        this._DataService.updateSlot(slotId, { bookedCount: updatedCount }).subscribe({
          next: () => this.finalizeSuccess(),
          error: (err) => {
            console.error("Update Slot Error:", err);
            this.finalizeSuccess(); 
          }
        });
      } else {
        this.finalizeSuccess();
      }
    },
    error: (err) => {
      console.error("Get Slot Error:", err);
      this.finalizeSuccess(); 
    }
  });
}

  finalizeSuccess(): void {
    this.paymentStatus = 'success';
    this.loading = false;
    alert('Payment successful and appointment booked!');
    this._router.navigate(['/patient-layout/home']);
  }

}
