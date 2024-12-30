import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import api from '@/utils/api';  // Import your custom API instance

// Define the types for the response data
type Driver = {
  driverId: string;
  driverName: string;
  driverMobileNumber: string;
  registrationNumber: string;
  typeOfAmbulance: string | null;
  registeredHospital: string | null;
  equipment: string | null;
  latitude: number | null;
  longitude: number | null;
  lastLocationUpdate: string | null;
  ambulancePhoto: string | null;
};

// Define the API response type
type FetchDriversResponse = {
  success: boolean;
  message: string;
  data: {
    drivers: Driver[];
  };
};

// Create the custom hook to fetch available ambulance drivers
const useAvailableAmbulances = () => {
  return useQuery<Driver[], Error>({
    queryKey: ['ambulances'],
    queryFn: async () => {
      const response = await api.get<FetchDriversResponse>('/admin/get-available-drivers'); // Make API call
      if (response.data.success) {
        return response.data.data.drivers; // Return the list of drivers
      } else {
        throw new Error('Failed to fetch available drivers');
      }
    },
    // Pass lifecycle hooks in the options object
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('Error fetching available ambulances:', error.message);
      } else {
        console.error('An unknown error occurred');
      }
    },
    onSuccess: (data: Driver[]) => {
      console.log('Fetched available ambulances successfully:', data);
    },
  } as UseQueryOptions<Driver[], Error>); // Explicitly type the options
};

export default useAvailableAmbulances;
