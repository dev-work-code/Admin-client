import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import api from "@/utils/api"; // Importing the api instance

const HospitalProfile = () => {
    const { state } = useLocation();
    const hospital = state?.data;

    const [isLoading, setIsLoading] = useState(false);

    const handleStatusUpdate = async (status: "APPROVED" | "REJECTED") => {
        setIsLoading(true);
        try {
            const response = await api.patch(`/admin/hospitalStatus/${hospital.hospitalId}`, { status });

            if (response.status === 200) {
                alert(`Hospital status updated to ${status}`);
            } else {
                throw new Error("Unexpected response status");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while updating the status.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!hospital) {
        return <div>No hospital data found.</div>;
    }

    return (
        <div className="p-6 space-y-4 max-w-5xl mx-auto shadow-[2px_4px_5px_0px_#E9EBFFB2] rounded-[38px] border border-gray-300">
            <div className="flex items-center space-x-4">
                <img
                    src={hospital.hospitalPhoto}
                    alt={hospital.hospitalName}
                    className="w-24 h-24 object-cover rounded-full"
                />
                <div>
                    <h1 className="text-2xl font-semibold">{hospital.hospitalName}</h1>
                    <p className="text-gray-500">{hospital.hospitalLocation}</p>
                    <p className="text-sm text-gray-400">{hospital.hospitalPhoneNumber}</p>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label>Hospital ID</Label>
                    <Card className="border p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {hospital.hospitalId}
                    </Card>
                </div>
                <div>
                    <Label>Owner</Label>
                    <Card className="border p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {hospital.hospitalOwnerDetails}
                    </Card>
                </div>
                <div>
                    <Label>Services Offered</Label>
                    <Card className="border p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {hospital.hospitalServicesOffered}
                    </Card>
                </div>
                <div>
                    <Label>Specialist Services</Label>
                    <Card className="border p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {hospital.hospitalSpecialistServices}
                    </Card>
                </div>
                <div>
                    <Label>Areas of Interest</Label>
                    <Card className="border p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {hospital.hospitalAreasOfInterest}
                    </Card>
                </div>
                <div>
                    <Label>Date of Registration</Label>
                    <Card className="border p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {new Date(hospital.hospitalDateOfRegistration).toLocaleDateString()}
                    </Card>
                </div>
                <div>
                    <Label>Number of Beds</Label>
                    <Card className="border p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {hospital.hospitalNumberOfBeds}
                    </Card>
                </div>
                <div>
                    <Label>Company Details</Label>
                    <Card className="border p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {hospital.hospitalCompanyDetails}
                    </Card>
                </div>
                <div>
                    <Label>DMHO Registration</Label>
                    <Card className="border p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {hospital.hospitalDMHORegistration}
                    </Card>
                </div>
                <div>
                    <Label>PAN</Label>
                    <Card className="border p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {hospital.hospitalCompanyPAN}
                    </Card>
                </div>
                <div>
                    <Label>Incorporating Certificate</Label>
                    <Card className="border p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {hospital.hospitalIncorporatingCertificate}
                    </Card>
                </div>
            </div>

            <div className="mt-6 flex space-x-4">
                <button
                    onClick={() => handleStatusUpdate("APPROVED")}
                    disabled={isLoading}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                    {isLoading ? "Processing..." : "Accept"}
                </button>
                <button
                    onClick={() => handleStatusUpdate("REJECTED")}
                    disabled={isLoading}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                    {isLoading ? "Processing..." : "Reject"}
                </button>
            </div>
        </div>
    );
};

export default HospitalProfile;
