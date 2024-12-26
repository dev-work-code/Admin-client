import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api'; // Import your custom axios instance

// Define the Hospital interface
interface Hospital {
    hospitalId: string;
    hospitalName: string;
    hospitalLocation: string;
    hospitalPhoneNumber: string;
    hospitalPhoto: string;
    hospitalWorkingHours: string;
    hospitalDateOfRegistration: string;
    hospitalDMHORegistration: string;
    hospitalCompanyDetails: string;
    hospitalCompanyPAN: string;
    hospitalIncorporatingCertificate: string;
    hospitalOwnerDetails: string;
    hospitalServicesOffered: string;
    hospitalSpecialistServices: string;
    hospitalNumberOfBeds: number;
    hospitalAreasOfInterest: string;
    latitude: number;
    longitude: number;
    hospitalApprovalStatus: string;
    hospitalAddedBy: string;
    createdAt: string;
    updatedAt: string;
    status: string;
}

// Define the structure of the response data
interface HospitalData {
    approved: Hospital[];
    pending: Hospital[];
    rejected: Hospital[];
}

// Fetch all hospital data from the API
const fetchHospitals = async (): Promise<HospitalData> => {
    const response = await api.get('/admin/getAllHospitals'); // Use custom axios instance
    return response.data.data; // Return the entire "data" object
};

// Custom hook to fetch hospital data
export const useHospitals = () => {
    return useQuery<HospitalData>({
        queryKey: ['hospitals'], // Unique key for caching and refetching
        queryFn: fetchHospitals, // Function to fetch data
    });
};
