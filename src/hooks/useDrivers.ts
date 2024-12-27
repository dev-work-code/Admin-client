import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api'; // Import your custom axios instance

// Define the Driver interface
interface Driver {
    driverId: string;
    driverName: string;
    driverMobileNumber: string;
    registrationNumber: string;
    rcCopy: string;
    typeOfAmbulance: string;
    ambulancePhoto: string | null;
    equipment: string;
    registeredHospital: string;
    driverApprovalStatus: string;
    latitude: number | null;
    longitude: number | null;
    fcmToken: string | null;
    isAvailable: boolean;
    lastLocationUpdate: string | null;
    createdAt: string;
    updatedAt: string;
    status: string;
}

// Define the structure of the response data
interface DriverData {
    approved: Driver[];
    pending: Driver[];
    rejected: Driver[];
}

// Fetch all driver data from the API
const fetchDrivers = async (): Promise<DriverData> => {
    const response = await api.get('/admin/getAllDrivers'); // Use custom axios instance
    return response.data.data; // Return the entire "data" object
};

// Custom hook to fetch driver data
export const useDrivers = () => {
    return useQuery<DriverData>({
        queryKey: ['drivers'], // Unique key for caching and refetching
        queryFn: fetchDrivers, // Function to fetch data
    });
};
