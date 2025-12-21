
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MainDataService {
  constructor(private _HttpClient: HttpClient) { }

  getDoctors(query?: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}_doctors${query || ''}`); 
  }

  getDepartments(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}_departments`); 
  }

  // get doctor appoinments
  getDoctorAppointments(doctorId: any): Observable<any> {
    // use _appointments?doctorId=id
    return this._HttpClient.get(`${environment.baseUrl}_appointments?doctorId=${doctorId}`); 
  }

  getPatientRecords(patientId: any): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}_medicalRecords?patientId=${patientId}`);
  }

  makeAppointment(appointmentData: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}_appointments`, appointmentData); 
  }

  updateMedicalRecord(recordId: any, updateData: object): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}_medicalRecords/${recordId}`, updateData); 
  }

  getPatientById(id: any): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}_patients/${id}`);
  }
}
