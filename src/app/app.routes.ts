import { DoctorSlotsComponent } from './components/mainComponents/doctorComponents/doctor-slots-component/doctor-slots-component';
import { PatientDashboard } from './components/mainComponents/patientComponents/patient-dashboard/patient-dashboard';
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
import { DoctorDashboard } from './components/mainComponents/doctorComponents/doctor-dashboard/doctor-dashboard';
import { NavDoctorComponent } from './components/mainComponents/doctorComponents/nav-doctor-component/nav-doctor-component';
import { PatientLayout } from './layouts/main-component/patientLayout/patient-layout/patient-layout';
import { DoctorLayout } from './layouts/main-component/doctorLayout/doctor-layout/doctor-layout';



export const routes: Routes = [
 // * 1. auth path
  {
    path: 'auth', 
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
      { path: 'forgotPassword', component: ForgetPasswordComponent },
      { path: 'resetPassword', component: ResetPasswordComponent },
    ],
  },

  // * 2. patient flow
  {
    path: 'patient-layout', 
    component: PatientLayout,
    children: [
      { path: 'home', component: Home, title: 'Home' },
      { path: 'about', component: AboutComponent, title: 'About' },
      { path: 'departements', component: DepartementsComponent, title: 'Departements' },
      { path: 'services', component: ServicesComponent, title: 'Services' },
      { path: 'doctors', component: DoctorsComponent, title: 'Doctors' },
      { path: 'appointment', component: AppointmentFormComponent , title: 'Appointment' },
      { path: 'payment', component: PaymentComponent , title :'Payment' },
      { path: 'dashboard', component: PatientDashboard , title :'Patient Dashboard' },
    ],
  },

  // * 3. doctor flow 
  {
    path: 'doctor-layout', 
    component: DoctorLayout,
    children: [
      { path: 'dashboard', component: DoctorDashboard, title: 'Doctor Dashboard' },
      { path: 'slots', component: DoctorSlotsComponent, title: 'Doctor Dashboard' },
    ],
  },

  // * 4. default route
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
];