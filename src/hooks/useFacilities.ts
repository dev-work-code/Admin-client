import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api"; // Import your custom axios instance

// Define interfaces for each facility type
interface BloodBank {
    bloodBankId: string;
    bloodBankName: string;
    location: string;
    phoneNumber: string;
    workingHours: string;
    servicesOffered: string;
    approvalStatus: string;
    createdAt: string;
    updatedAt: string;
}

interface DiagnosticCenter {
    diagnosticCenterId: string;
    diagnosticCenterName: string;
    location: string;
    phoneNumber: string;
    workingHours: string;
    servicesOffered: string;
    approvalStatus: string;
    createdAt: string;
    updatedAt: string;
}

interface Pharmacy {
    pharmacyId: string;
    pharmacyName: string;
    location: string;
    phoneNumber: string;
    workingHours: string;
    servicesOffered: string;
    approvalStatus: string;
    createdAt: string;
    updatedAt: string;
}

// Define the structure of the API response
interface FacilityData {
    bloodBanks: BloodBank[];
    diagnosticCenters: DiagnosticCenter[];
    pharmacies: Pharmacy[];
}

// Fetch all facility data from the API
const fetchFacilities = async (): Promise<FacilityData> => {
    const response = await api.get("/admin/getAllFacilities");
    return response.data.data; // Return the "data" object directly
};

// Custom hook to fetch facility data
export const useFacilities = () => {
    return useQuery<FacilityData>({
        queryKey: ["facilities"], // Unique key for caching and refetching
        queryFn: fetchFacilities, // Function to fetch data
    });
};
