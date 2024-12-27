import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const DoctorDetailsPage = () => {
    // Get the doctor data passed via state
    const { state } = useLocation();
    const doctor = state?.data;

    // Ensure doctor data is available
    if (!doctor) {
        return <div>No doctor data found.</div>;
    }

    return (
        <Card className="p-6 space-y-4 max-w-5xl mx-auto shadow-[2px_4px_5px_0px_#E9EBFFB2] rounded-[38px] border border-gray-300">
            <div className="flex items-center space-x-4">
                {/* Doctor Photo */}
                {doctor.doctorPhoto ? (
                    <img
                        src={doctor.doctorPhoto}
                        alt={doctor.doctorName}
                        className="w-24 h-24 object-cover rounded-full"
                    />
                ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-lg text-gray-600">
                        No Photo
                    </div>
                )}
                <div>
                    <h1 className="text-2xl font-semibold">{doctor.doctorName}</h1>
                    <p className="text-gray-500">{doctor.doctorQualification || "N/A"}</p>
                    <p className="text-sm text-gray-400">{doctor.doctorMobileNumber}</p>
                </div>
            </div>

            {/* Doctor's details */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label>Doctor ID</Label>
                    <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {doctor.doctorId}
                    </Card>
                </div>
                <div>
                    <Label>Email</Label>
                    <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {doctor.doctorEmail || "N/A"}
                    </Card>
                </div>
                <div>
                    <Label>Specialization</Label>
                    <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {doctor.areaOfSpecialization || "N/A"}
                    </Card>
                </div>
                <div>
                    <Label>Experience</Label>
                    <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {doctor.experience || "N/A"}
                    </Card>
                </div>
                <div>
                    <Label>Blood Group</Label>
                    <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {doctor.doctorBloodGroup || "N/A"}
                    </Card>
                </div>
                <div>
                    <Label>Rating</Label>
                    <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {doctor.doctorRating || "N/A"}
                    </Card>
                </div>
                <div>
                    <Label>Address</Label>
                    <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {doctor.doctorAddress || "N/A"}
                    </Card>
                </div>
                <div>
                    <Label>Qualifications</Label>
                    <Card className="border-none p-2 shadow-none rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {doctor.doctorAdditionalQualification || "N/A"}
                    </Card>
                </div>
                <div>
                    <Label>Medical License</Label>
                    <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {doctor.medicalLicense || "N/A"}
                    </Card>
                </div>
                <div>
                    <Label>Pan Card</Label>
                    <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {doctor.panCard || "N/A"}
                    </Card>
                </div>
                <div>
                    <Label>Practice Location</Label>
                    <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {doctor.practiceLocation || "N/A"}
                    </Card>
                </div>
            </div>
        </Card>
    );
};

export default DoctorDetailsPage;
