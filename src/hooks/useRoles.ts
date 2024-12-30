import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";

interface Role {
  adminId: string;
  adminName: string | null;
  adminEmail: string | null;
  adminMobileNumber: string | null;
  name: string;
  email: string | null;
  role: string;
  gender: string;
  dob: string;
  phoneNumber: string;
  panCard: string;
  aadharCard: string;
  createdAt: string;
  updatedAt: string;
}

const fetchRoles = async (): Promise<Role[]> => {
  const { data } = await api.get("/admin/get-roles");
  return data.data;
};

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoles,
  });
};
