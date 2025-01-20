// src/hooks/useSOSCases.ts
import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

// Define the SOSCase interface based on the expected API response
interface User {
  userId: string;
  name: string;
  email: string;
  mobileNumber: string;
  gender: string;
  userPhoto: string | null;
}

interface SOSCase {
  sosCallbackId: string;
  userId: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  user: User;
}

// Fetch SOS cases from the API
const fetchSOSCases = async (): Promise<SOSCase[]> => {
  const response = await api.get('/admin/get-sos-cases');
  return response.data; // Adjust based on the actual API response structure
};

// Custom hook to fetch SOS cases
const useSOSCases = () => {
  return useQuery<SOSCase[]>({
    queryKey: ['sosCases'],
    queryFn: fetchSOSCases,
  });
};

export default useSOSCases;
