// import {Idoctor} from '/src/app/core/interfaces/IDoctor/idoctor';
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


getDoctorAppointments(doctorId: number): Observable<any> {
    
    return this._HttpClient.get(`${environment.baseUrl}_appointments?doctorId=${doctorId}`); 
}


getPatientRecords(patientId: number): Observable<any> {
    
    return this._HttpClient.get(`${environment.baseUrl}_medicalRecords?patientId=${patientId}`);
}


makeAppointment(appointmentData: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}_appointments`, appointmentData); 
}


updateMedicalRecord(recordId: number, updateData: object): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}_medicalRecords/${recordId}`, updateData); 
}
}
