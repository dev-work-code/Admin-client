import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Hospital } from "../HospitalProflie";
import api from "@/utils/api"; // Import the API instance
import { toast } from "@/hooks/use-toast"; // Correct import for toast
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router DOM

interface HospitalOverviewProps {
    hospital: Hospital;
}

const HospitalOverview: React.FC<HospitalOverviewProps> = ({ hospital }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const navigate = useNavigate(); // Instantiate the navigate function

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await api.delete(`/admin/deleteHospital?id=${hospital.hospitalId}`);

            if (response.status === 200) {
                // Show success toast notification
                toast({
                    description: "Hospital has been successfully deleted.",
                    variant: "default",
                    className: "bg-green-500 text-white"
                });

                setIsDeleted(true);
                setError(null); // Reset error if successful

                // Navigate back to the previous page after successful deletion
                setTimeout(() => {
                    navigate(-1); // Go back to the previous page
                }, 1000); // Optional delay for a better user experience
            } else {
                setError("Failed to delete hospital.");
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || "Network error occurred!";
            // Show error toast notification
            toast({
                description: errorMessage,
                variant: "destructive",
                className: "bg-red-500 text-white"
            });

            setError(errorMessage);
        } finally {
            setIsDeleting(false);
        }
    };

    if (isDeleted) {
        return <p>Hospital has been successfully deleted.</p>;
    }

    return (
        <div className="space-y-4 mt-4">
            <p><span>Phone Number:</span> <span className="text-[#013DC0] font-medium">{hospital.hospitalPhoneNumber}</span></p>
            <p><span>Working Hours:</span> <span className="text-[#013DC0] font-medium">{hospital.hospitalWorkingHours}</span></p>
            <p><span>Specialist Services:</span> <span className="text-[#013DC0] font-medium">{hospital.hospitalSpecialistServices}</span></p>
            <p><span>Services Offered:</span> <span className="text-[#013DC0] font-medium">{hospital.hospitalServicesOffered}</span></p>
            <p><span>Total Beds:</span> <span className="text-[#013DC0] font-medium">{hospital.hospitalNumberOfBeds}</span></p>
            <p><span>Hospital Incorporating Certificate</span> {hospital.incorporatingCertificate || "N/A"}</p>

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-[#E9F4FF] border-none py-4 w-96 text-[#013DC0]" variant="primary">View Certificate</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-[#E9F4FF] rounded-xl">
                    <DialogHeader>
                        <DialogDescription className="flex items-center justify-center">
                            Download Prescription and Bill
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Button className="bg-[#013DC0] py-6 w-full text-white" variant="primary">
                            <a
                                href={hospital.incorporatingCertificate}
                                rel="noopener noreferrer"
                                className='flex gap-2 items-center justify-center'
                            >
                                <span>
                                    <Download />
                                </span>
                                View Certificate
                            </a>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="mt-4">
                {error && <p className="text-red-500">{error}</p>}
                <Button
                    className="bg-red-500 text-white py-2 px-4"
                    onClick={handleDelete}
                    disabled={isDeleting}
                >
                    {isDeleting ? "Deleting..." : "Delete Hospital"}
                </Button>
            </div>
        </div>
    );
};

export default HospitalOverview;
