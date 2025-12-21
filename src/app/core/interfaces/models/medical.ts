// * These interfaces define the shape of medical data 👇👇

// * Doctor → doctor profile

// * Department → medical department

// * Appointment → booking data

// * ? means optional

// * Union type ('Pending' | 'Booked') ensures valid status only


export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  fee: number;
  about: string;
  image?: string;
}

export interface Department {
  id: number;
  name: string;
  image?: string;
}

export interface Appointment {
  id?: number; 
  doctorId: number;
  patientId: number;
  date: string;
  time: string;
  status: 'Pending' | 'Booked' | 'Completed' | 'Canceled';
  symptoms?: string; // * Link to text symptoms
  tests?: string; //* Link to analysis 
}

export interface MedicalRecord {
  id?: number;
  patientId: number;
  doctorId: number;
  date: string;
  diagnosis?: string; 
  tests?: string[]; 
  doctorNotes?: string;
  isNew?: boolean; 
}