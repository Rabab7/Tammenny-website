export interface IAppointment {
    id: number;
    doctorId: number;
    patientId: number;
    date: string;
    time: string;
    status: string;
    symptoms: string;
   // patientDetails?: Patient; // ستضاف لاحقاً عند الحاجة
}
