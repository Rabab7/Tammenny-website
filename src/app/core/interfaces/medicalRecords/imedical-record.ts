export interface IMedicalRecord {
  id: number;
  patientId: number;
  doctorId: number;
  date: string;
  diagnosis: string;
  tests: string[];
  doctorNotes: string;
  isNew: boolean;
}
