import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDoctorComponent } from './nav-doctor-component';

describe('NavDoctorComponent', () => {
  let component: NavDoctorComponent;
  let fixture: ComponentFixture<NavDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
