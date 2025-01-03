// HospitalOverview.tsx
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Hospital } from "../HospitalProflie";

interface HospitalOverviewProps {
    hospital: Hospital;
}

const HospitalOverview: React.FC<HospitalOverviewProps> = ({ hospital }) => {
    return (
        <div className="space-y-4 mt-4">
            <p><span>Phone Number:</span> <span className="text-[#013DC0] font-medium">{hospital.hospitalPhoneNumber}</span></p>
            <p><span>Working Hours:</span> <span className="text-[#013DC0] font-medium">{hospital.hospitalWorkingHours}</span></p>
            <p><span>Specialist Services:</span> <span className="text-[#013DC0] font-medium">{hospital.hospitalSpecialistServices}</span></p>
            <p><span>Services Offered:</span> <span className="text-[#013DC0] font-medium">{hospital.hospitalServicesOffered}</span></p>
            <p><span>Total Beds:</span> <span className="text-[#013DC0] font-medium">{hospital.hospitalNumberOfBeds}</span></p>
            <p><span>Hospital Incorporating Certificate</span>   {hospital.incorporatingCertificate || "N/A"}</p>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-[#E9F4FF] border-none  py-4 w-96 text-[#013DC0]" variant="primary">View Certificate</Button>
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
        </div>
    );
};

export default HospitalOverview;
