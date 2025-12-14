import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth-component/auth-component';
import { LoginComponent } from './components/authComponents/login-component/login-component';
import { RegisterComponent } from './components/authComponents/register-component/register-component';
import { Home } from './components/mainComponents/home/home';
import { ForgetPasswordComponent } from './components/authComponents/forget-password-component/forget-password-component';
import { ResetPasswordComponent } from './components/authComponents/reset-password-component/reset-password-component';
import { DoctorComponent } from './components/mainComponents/doctor-component/doctor-component';
import { PatientComponent } from './components/mainComponents/patient-component/patient-component';

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
  { path: 'home', component: Home, title: 'home' },
  { path: 'doctor', component: DoctorComponent },
  { path: 'patient', component: PatientComponent },
];
