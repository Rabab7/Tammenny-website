import { Component, inject } from '@angular/core';
import { MainDataService } from '../../../../core/services/main/main-data-service';
import { AuthService } from '../../../../core/services/auth/auth-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctor-slots-component',
  imports: [ReactiveFormsModule],
  templateUrl: './doctor-slots-component.html',
  styleUrl: './doctor-slots-component.css',
})
export class DoctorSlotsComponent {
  private _dataService = inject(MainDataService);
  private _authService = inject(AuthService);
  private _fb = inject(FormBuilder);

  slotForm: FormGroup = this._fb.group({
    day: ['', Validators.required],
    time: ['', Validators.required],
    maxPatients: [1, [Validators.required, Validators.min(1)]],
  });

  mySlots: any[] = [];
 
  doctorId = this._authService.tokenDecode?.id || '1';

  ngOnInit() {
    this.loadSlots();
  }

  loadSlots() {
    this._dataService.getDoctorOwnSlots(this.doctorId).subscribe((res) => (this.mySlots = res));
  }

  addSlot() {
    if (this.slotForm.invalid) return;

    const newSlot = {
      ...this.slotForm.value,
      doctorId: this.doctorId,
      bookedCount: 0,
    };

    this._dataService.addSlot(newSlot).subscribe(() => {
      this.loadSlots();
      this.slotForm.reset({ maxPatients: 1 });
    });
  }

  deleteSlot(id: string) {
    this._dataService.deleteSlot(id).subscribe(() => this.loadSlots());
  }
}
