import { PatientDashboard } from './components/mainComponents/patientComponents/patient-dashboard/patient-dashboard';
import { DoctorComponent } from './components/mainComponents/doctorComponents/doctor-component/doctor-component';
import { PaymentComponent } from './components/mainComponents/patientComponents/payment-component/payment-component';
import { AppointmentFormComponent } from './components/mainComponents/patientComponents/appointment-form-component/appointment-form-component';
import { DoctorsComponent } from './components/mainComponents/patientComponents/doctors-component/doctors-component';
import { ServicesComponent } from './components/mainComponents/patientComponents/services-component/services-component';
import { DepartementsComponent } from './components/mainComponents/patientComponents/departements-component/departements-component';
import { AboutComponent } from './components/mainComponents/patientComponents/about-component/about-component';
import { Home } from './components/mainComponents/patientComponents/home/home';
import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth-component/auth-component';
import { LoginComponent } from './components/authComponents/login-component/login-component';
import { RegisterComponent } from './components/authComponents/register-component/register-component';
import { ForgetPasswordComponent } from './components/authComponents/forget-password-component/forget-password-component';
import { ResetPasswordComponent } from './components/authComponents/reset-password-component/reset-password-component';
import { MainComponent } from './layouts/main-component/main-component';
import { DoctorDashboard } from './components/mainComponents/doctorComponents/doctor-dashboard/doctor-dashboard';


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
      { path: 'appointment', component: AppointmentFormComponent , title: 'Appointment' },
      { path: 'payment', component: PaymentComponent , title :'Payment' },
      { path: 'patientDashboard', component: PatientDashboard , title :'patient dashboard' },

    ],
  },

  { path: 'doctor', component: DoctorDashboard, title: 'Doctor' },
];
