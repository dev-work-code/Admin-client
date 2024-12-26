// src/hooks/useDoctors.ts
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api'; // Your custom axios instance

// Define the Doctor interface
interface Doctor {
  doctorId: string;
  hospitalId: string;
  doctorName: string;
  doctorMobileNumber: string;
  doctorEmail: string;
  doctorPhoto: string | null;
  doctorGender: string | null;
  doctorRating: number | null;
  doctorCharges: string | null;
  doctorBloodGroup: string | null;
  doctorHospital: string | null;
  doctorQualification: string | null;
  doctorAddress: string | null;
  areaOfSpecialization: string | null;
  doctorApprovalStatus: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  status: string;
}

// Define the structure of the response data
interface DoctorData {
  approved: Doctor[];
  pending: Doctor[];
  rejected: Doctor[];
}

// Fetch all doctor data from the API
const fetchDoctors = async (): Promise<DoctorData> => {
  const response = await api.get('/admin/getAllDoctors'); // Use custom axios instance
  return response.data.data; // Return the entire "data" object
};

// Custom hook to fetch doctor data
export const useDoctors = () => {
  return useQuery<DoctorData>({
    queryKey: ['doctors'], // Unique key for caching and refetching
    queryFn: fetchDoctors, // Function to fetch data
  });
};
