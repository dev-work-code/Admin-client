import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/utils/api";
import { Card } from "@/components/ui/card";
import { CalendarDays, Download } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; // Assuming Label component exists in your UI library
import SkeletonLoader from "@/pages/common/SkeletonLoader";

const PatientProfile: React.FC = () => {
    const { patientId } = useParams(); // Get patientId from URL
    const [patientDetails, setPatientDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            setLoading(true);
            try {
                const response = await api.get(
                    `/admin/getPatientDetailsByID?patientId=${patientId}`
                );
                if (response.data.success) {
                    setPatientDetails(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching patient details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (patientId) {
            fetchPatientDetails();
        }
    }, [patientId]);

    if (loading) {
        return <SkeletonLoader />;
    }

    if (!patientDetails) {
        return <p>Patient details not found.</p>;
    }

    return (
        <div className="p-8">
            {/* Flex Container for Personal Info and Chief Complaints Cards */}
            <div className="flex space-x-6 mb-6">
                {/* Personal Info Card */}
                <Card className="p-6 border border-gray-200 shadow-md flex flex-col w-1/2">
                    <div className="flex items-center gap-4">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div>
                                <Label>Patient Name</Label>
                                <p className="text-sm text-[#013DC0]">{patientDetails.patientName || 'N/A'}</p>
                            </div>
                            <div>
                                <Label>Age</Label>
                                <p className="text-sm text-[#013DC0]">{patientDetails.patientAge || 'N/A'}</p>
                            </div>
                            <div>
                                <Label>Gender</Label>
                                <p className="text-sm text-[#013DC0]">{patientDetails.patientGender || 'N/A'}</p>
                            </div>
                            <div>
                                <Label>Phone Number</Label>
                                <p className="text-sm text-[#013DC0]">{patientDetails.patientPhoneNumber || 'N/A'}</p>
                            </div>
                            <div>
                                <Label>Email</Label>
                                <p className="text-sm text-[#013DC0]">{patientDetails.patientEmail || 'N/A'}</p>
                            </div>
                            <div>
                                <Label>Blood Group</Label>
                                <p className="text-sm text-[#013DC0]">{patientDetails.patientBloodGroup || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </Card>
                {/* Chief Complaints Card */}
                <Card className="p-6 border border-gray-200 shadow-md lg:col-span-2 w-1/2">
                    <h2 className="text-lg font-semibold mb-4">Chief Complaints</h2>
                    <p className="text-sm text-[#979797] leading-6">
                        {patientDetails.patientChiefComplaints || 'No complaints specified'}
                    </p>
                </Card>
            </div>

            {/* Appointment History Card */}
            <div className="mt-6">
                <Card className="w-full border border-gray-200 shadow-md">
                    <div className="bg-[#E9F4FF] h-12 rounded-t-lg flex items-center justify-start">
                        <span className="text-[#013DC0] font-semibold ml-2">Previous Records</span>
                    </div>
                    <div className="p-4">
                        {patientDetails.previousAppointments && patientDetails.previousAppointments.length > 0 ? (
                            patientDetails.previousAppointments.map((appointment: any, index: number) => (
                                <div
                                    key={index}
                                    className="border-b border-gray-200 py-4 flex items-center justify-between"
                                >
                                    <div>
                                        <span className="text-lg font-semibold flex items-center justify-center gap-2 p-4">
                                            <CalendarDays className="text-[#013DC0]" size={18} />
                                            <span className="text-sm font-normal">
                                                {new Date(appointment.appointmentDate).toLocaleDateString("en-US", {
                                                    weekday: "long",
                                                    month: "short",
                                                    day: "2-digit",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </span>
                                    </div>

                                    {/* Dialog for appointment details */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="bg-[#013DC0] py-4 w-72 text-white" variant="primary">
                                                Details
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px] bg-[#E9F4FF] rounded-xl">
                                            <DialogHeader>
                                                <DialogDescription className="flex items-center justify-center">
                                                    Download Prescription and Bill
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                {/* Prescription Button */}
                                                <Button className="bg-[#013DC0] py-6 w-full text-white" variant="primary">
                                                    <a
                                                        href={appointment.prescription}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex gap-2 items-center justify-center"
                                                    >
                                                        <Download />
                                                        Prescription
                                                    </a>
                                                </Button>
                                                {/* Bill Button */}
                                                <Button className="bg-[#013DC0] py-6 w-full text-white" variant="primary">
                                                    Bill
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            ))
                        ) : (
                            <p>No previous appointments available.</p>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PatientProfile;
