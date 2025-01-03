import React from "react";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/utils/api";

interface Doctor {
    doctorId: string;
    doctorName: string;
    doctorPhoto: string;
    areaOfSpecialization: string;
    doctorRating: number;
}

interface DoctorListProps {
    doctors: Doctor[];
    doctorSearchQuery: string;
    setDoctorSearchQuery: (query: string) => void;
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors, doctorSearchQuery, setDoctorSearchQuery }) => {
    const filteredDoctors = doctors.filter((doctor) =>
        doctor.doctorName.toLowerCase().includes(doctorSearchQuery.toLowerCase())
    );
    const navigate = useNavigate();
    const handleViewProfile = async (doctorId: string) => {
        try {
            const response = await api.get(`/admin/getDoctorsbyID`, {
                params: { doctorId },
            });
            navigate(`/doctor/${doctorId}`, { state: response.data });
        } catch (error) {
            console.error("Error fetching doctor profile:", error);
            alert("Failed to fetch doctor details.");
        }
    };

    return (
        <div className="space-y-4">
            {/* Search Input for Doctors */}
            <div className="flex items-center justify-between p-4">
                <p className="font-semibold text-base">Doctors Available - {filteredDoctors?.length || 0}</p>
                <div className="relative w-full md:w-80 shadow-[5px_5px_20px_0px_#61ABEB33] rounded-full md:ml-10">
                    <input
                        type="text"
                        value={doctorSearchQuery}
                        onChange={(e) => setDoctorSearchQuery(e.target.value)}
                        placeholder="Search for doctors"
                        className="w-full border px-4 py-3 rounded-full pr-12 bg-white"
                    />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#003CBF] p-3 rounded-full">
                        <Search className="text-white" />
                    </div>
                </div>
            </div>

            {/* Doctor List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredDoctors?.map((doctor) => (
                    <Card key={doctor.doctorId} className="p-4 space-y-2 border border-[#6298FF33] h-40 cursor-pointer" onClick={() => handleViewProfile(doctor.doctorId)}>
                        <div className="flex flex-col items-center justify-center space-x-4">
                            <img
                                src={doctor.doctorPhoto}
                                alt={doctor.doctorName}
                                className="w-16 h-16 object-cover rounded-full"
                            />
                            <div>
                                <p className="font-medium text-sm">{doctor.doctorName}</p>
                                <p className="text-sm text-gray-500">{doctor.areaOfSpecialization}</p>
                                <p className="text-sm text-gray-400">Rating: {doctor.doctorRating}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default DoctorList;
