import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import api from "@/utils/api"; // Import your custom API instance

// Define the types for the response data
type User = {
  name: string;
  email: string;
  mobileNumber: string;
  bloodGroup: string;
};

type EMT = {
  emtName: string;
  emtMobileNumber: string;
  emtLocation: string | null;
};

export type PatientCase = {
  phoneNumber1: string;
  caseHistoryChiefComplaints: string;
  patientAge: any;
  patientGender: string;
  caseStatus: string;
  emtCaseId: string;
  patientName: string;
  condition: string;
  patientAddress: string;
  createdAt: string;
  user: User | null;
  emt: EMT;
};

// Create the custom hook to fetch patient cases
const usePatientCases = () => {
  return useQuery<PatientCase[], Error>({
    queryKey: ["patientCases"],
    queryFn: async () => {
      const response = await api.get("/admin/get-cases"); // Make API call
      return response.data.data.cases;
    },
    // Pass lifecycle hooks in the options object
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error("Error fetching patient cases:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    },
    onSuccess: (data: PatientCase[]) => {
      console.log("Fetched patient cases successfully:", data);
    },
  } as UseQueryOptions<PatientCase[], Error>); // Explicitly type the options
};

export default usePatientCases;
