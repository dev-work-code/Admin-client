import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import api from "@/utils/api";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";

const HospitalProfile = () => {
    const { state } = useLocation();
    const hospital = state?.data;
    const [status, setStatus] = useState<'PENDING' | 'APPROVED' | 'REJECTED'>(hospital?.hospitalApprovalStatus || "PENDING");
    const [isLoading, setIsLoading] = useState(false);

    const handleStatusChange = async () => {
        if (!hospital?.hospitalId) return;
        try {
            setIsLoading(true);
            const response = await api.patch(
                `/admin/hospitalStatus/${hospital.hospitalId}`,
                { status }
            );

            toast({
                description: response.data.message || "Hospital status updated successfully!",
                className: "bg-green-500 text-white",
            });
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || "Failed to update hospital status.";
            toast({
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const safeValue = (value: any) => value || "N/A"; // Utility function for fallback

    if (!hospital) {
        return <div>No hospital data found.</div>;
    }

    const buttonStyles: { [key in 'PENDING' | 'APPROVED' | 'REJECTED']: string } = {
        PENDING: "bg-red-500 text-white hover:bg-red-600",
        REJECTED: "bg-red-500 text-white hover:bg-red-600",
        APPROVED: "bg-green-500 text-white hover:bg-green-600",
    };

    return (
        <div className="p-6 space-y-4 max-w-5xl mx-auto shadow-[2px_4px_5px_0px_#E9EBFFB2] rounded-[38px] border border-gray-300 relative">
            <div className="flex items-center space-x-4">
                <img
                    src={safeValue(hospital.hospitalPhoto)}
                    alt="Image"
                    className="w-24 h-24 object-cover border rounded-full"
                />
                <div>
                    <h1 className="text-2xl font-semibold">{safeValue(hospital.hospitalName)}</h1>
                    <p className="text-gray-500">{safeValue(hospital.hospitalLocation)}</p>
                    <p className="text-sm text-gray-400">{safeValue(hospital.hospitalPhoneNumber)}</p>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label>Hospital ID</Label>
                    <Card className="border p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {safeValue(hospital.hospitalId)}
                    </Card>
                </div>
                <div>
                    <Label>Owner</Label>
                    <Card className="border p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {safeValue(hospital.hospitalOwnerDetails)}
                    </Card>
                </div>
                <div>
                    <Label>Services Offered</Label>
                    <Card className="border p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {safeValue(hospital.hospitalServicesOffered)}
                    </Card>
                </div>
                <div>
                    <Label>Specialist Services</Label>
                    <Card className="border p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {safeValue(hospital.hospitalSpecialistServices)}
                    </Card>
                </div>
                <div>
                    <Label>Areas of Interest</Label>
                    <Card className="border p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {safeValue(hospital.hospitalAreasOfInterest)}
                    </Card>
                </div>
                <div>
                    <Label>Date of Registration</Label>
                    <Card className="border p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {safeValue(new Date(hospital.hospitalDateOfRegistration).toLocaleDateString())}
                    </Card>
                </div>
                <div>
                    <Label>Number of Beds</Label>
                    <Card className="border p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {safeValue(hospital.hospitalNumberOfBeds)}
                    </Card>
                </div>
                <div>
                    <Label>Company Details</Label>
                    <Card className="border p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {safeValue(hospital.hospitalCompanyDetails)}
                    </Card>
                </div>
                <div>
                    <Label>DMHO Registration</Label>
                    <Card className="border p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {safeValue(hospital.hospitalDMHORegistration)}
                    </Card>
                </div>
                <div>
                    <Label>PAN</Label>
                    <Card className="border p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                        {safeValue(hospital.hospitalCompanyPAN)}
                    </Card>
                </div>
                <div>
                    <Label>Incorporating Certificate</Label>
                    {safeValue(hospital.hospitalIncorporatingCertificate) === "N/A" ? (
                        <Card className="border p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
                            N/A
                        </Card>
                    ) : (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base text-center cursor-pointer">
                                    View Incorporating Certificate
                                </Card>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-[#E9F4FF] rounded-xl">
                                <DialogHeader>
                                    <DialogDescription className="flex items-center justify-center">
                                        Incorporating Certificate
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <img src={safeValue(hospital.hospitalIncorporatingCertificate)} alt="Incorporating Certificate" />
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>
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
                    className={`mt-2 px-4 py-5 w-72 rounded-md ${buttonStyles[status]} ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
                        }`}
                >
                    {isLoading ? "Updating..." : "Update Status"}
                </Button>
            </div>
        </div>
    );
};

export default HospitalProfile;
