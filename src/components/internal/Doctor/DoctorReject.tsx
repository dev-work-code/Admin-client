import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { useState } from "react";
import { toast } from "@/hooks/use-toast"; // Corrected import
import api from "@/utils/api";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";

const DoctorProfileStatusComponent = () => {
    // Get the doctor data passed via state
    const { state } = useLocation();
    const doctor = state?.data;

    const [status, setStatus] = useState<'PENDING' | 'APPROVED' | 'REJECTED'>(doctor?.status || "PENDING");
    const [isLoading, setIsLoading] = useState(false);

    // Ensure doctor data is available
    if (!doctor) {
        return <div>No doctor data found.</div>;
    }

    const buttonStyles: { [key in 'PENDING' | 'APPROVED' | 'REJECTED']: string } = {
        PENDING: "bg-red-500 text-white hover:bg-red-600",
        REJECTED: "bg-red-500 text-white hover:bg-red-600",
        APPROVED: "bg-green-500 text-white hover:bg-green-600",
    };

    const handleStatusChange = async () => {
        if (!doctor?.doctorId) return;
        try {
            setIsLoading(true);
            const response = await api.patch(
                `/admin/doctorStatus/${doctor.doctorId}`,
                { status }
            );

            toast({
                description: response.data.message || "Doctor status updated successfully!",
                className: "bg-green-500 text-white",
            });
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || "Failed to update doctor status.";
            toast({
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base text-center cursor-pointer">
                                View Medical License
                            </Card>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-[#E9F4FF] rounded-xl">
                            <DialogHeader>
                                <DialogDescription className="flex items-center justify-center">
                                    Medical License
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <img src={doctor.medicalLicense} alt="" />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                <div>
                    <Label>Pan Card</Label>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base text-center cursor-pointer">
                                View Pan Card
                            </Card>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-[#E9F4FF] rounded-xl">
                            <DialogHeader>
                                <DialogDescription className="flex items-center justify-center">
                                    Pan Card
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <img src={doctor.panCard} alt="" />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                <div>
                    <Label>Practice Location</Label>
                    <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {doctor.practiceLocation || "N/A"}
                    </Card>
                </div>
            </div>

            {/* Status Update Button */}
            <div className="flex justify-end items-center gap-6">
                <div>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as 'PENDING' | 'APPROVED' | 'REJECTED')}
                        className="border rounded-md p-2 bg-white w-52 mt-2"
                    >
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                    </select>
                </div>
                <Button
                    onClick={handleStatusChange}
                    disabled={isLoading}
                    className={`mt-2 px-4 py-5 w-72 rounded-md ${buttonStyles[status]} ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}
                >
                    {isLoading ? "Updating..." : "Update Status"}
                </Button>
            </div>
        </Card>
    );
};

export default DoctorProfileStatusComponent;
