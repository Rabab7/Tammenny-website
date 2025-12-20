import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth-component/auth-component';
import { LoginComponent } from './components/authComponents/login-component/login-component';
import { RegisterComponent } from './components/authComponents/register-component/register-component';
import { Home } from './components/mainComponents/home/home';
import { ForgetPasswordComponent } from './components/authComponents/forget-password-component/forget-password-component';
import { ResetPasswordComponent } from './components/authComponents/reset-password-component/reset-password-component';
import { DoctorComponent } from './components/mainComponents/doctor-component/doctor-component';
import { PatientComponent } from './components/mainComponents/patient-component/patient-component';
import { AppointmentFormComponent } from './components/mainComponents/appointment-form-component/appointment-form-component';
import { AboutComponent } from './components/mainComponents/about-component/about-component';
import { DepartementsComponent } from './components/mainComponents/departements-component/departements-component';
import { ServicesComponent } from './components/mainComponents/services-component/services-component';
import { MainComponent } from './layouts/main-component/main-component';
import { PaymentComponent } from './components/mainComponents/payment-component/payment-component';
import { DoctorsComponent } from './components/mainComponents/doctors-component/doctors-component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'login' },
      { path: 'register', component: RegisterComponent, title: 'register' },
      { path: 'forgotPassword', component: ForgetPasswordComponent },
      { path: 'resetPassword', component: ResetPasswordComponent },
    ],
  },
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home', component: Home, title: 'Home' },
      { path: 'about', component: AboutComponent, title: 'About' },
      { path: 'departements', component: DepartementsComponent, title: 'Departements' },
      { path: 'services', component: ServicesComponent, title: 'Services' },
      { path: 'doctors', component: DoctorsComponent, title: 'Doctors' },
      { path: 'patient', component: PatientComponent },
      { path: 'appointment', component: AppointmentFormComponent , title: 'Appointment' },
      { path: 'payment', component: PaymentComponent , title :'Payment' },

    ],
  },

  { path: 'doctor', component: DoctorComponent, title: 'Doctor' },
];
