import { useMutation } from '@tanstack/react-query';
import api from '@/utils/api';
import { toast } from './use-toast';

// Define the types for the request and response
type AssignAmbulancePayload = {
  driverId: string;
  caseId: string;
};

type AssignAmbulanceResponse = {
  success: boolean;
  message: string;
};

// Create the custom hook
const useAssignAmbulance = () => {
  return useMutation<AssignAmbulanceResponse, Error, AssignAmbulancePayload>({
    mutationFn: async (payload: AssignAmbulancePayload) => {
      const response = await api.post('/admin/assign-ambulance', payload);
      return response.data;
    },
    onSuccess: (data) => {
      toast({
        description: data.message || 'Ambulance assigned successfully!',
        variant: 'default',
        className: "bg-green-500 text-white",
      });
    },
    onError: (error) => {
      const errorMessage =
        (error as any).response?.data?.error || 'Failed to assign ambulance. Please try again.';
      toast({
        description: errorMessage,
        variant: 'destructive',
      });
    },
  });
};

export default useAssignAmbulance;
