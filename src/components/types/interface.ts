// Interfaces for type safety
export interface Patient {
  patientId: string;
  doctorId: string;
  patientName: string;
  patientGender: string;
  patientAge: string;
  patientBloodGroup: string;
}

export interface Doctor {
  doctorId: string;
  doctorName: string;
  doctorPhoto: string;
  areaOfSpecialization: string;
  doctorRating: number;
  patients?: Patient[];
}

export interface Department {
  serviceId: string;
  serviceName: string;
}

export interface Hospital {
  hospitalId: any;
  hospitalLocation: string;
  hospitalPhoneNumber: string;
  hospitalWorkingHours: string;
  hospitalSpecialistServices: string;
  hospitalServicesOffered: string;
  hospitalNumberOfBeds: string;
  hospitalOwnerDetails: string;
  hospitalName: string;
  hospitalPhoto: string;
  doctors?: Doctor[];
  departments?: Department[];
}
