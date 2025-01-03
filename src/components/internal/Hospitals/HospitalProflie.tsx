import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import HospitalInfo from "./HospitalProfile/HospitalInfo";
import LiveCasesTable from "./HospitalProfile/LiveCasesTable";
import DoctorList from "./HospitalProfile/DoctorList";
import HospitalOverview from "./HospitalProfile/HospitalOverview";
import PatientTable from "./HospitalProfile/PatientTable";

// Interfaces for type safety

interface EMT {
    emtId: string;
    emtName: string;
    emtMobileNumber: string;
}

interface Case {
    emtCaseId: string;
    emtId: string;
    emt: EMT;
    patientName: string;
    patientAddress: string;
    condition: string;
    createdAt: string;
    patientPhoneNumber?: string;
    patientLatitude?: number;
    patientLongitude?: number;
}
export interface Patient {
    patientId: string;
    doctorId: string;
    patientName: string;
    patientGender: string;
    patientAge: string;
    patientBloodGroup: string;
}

interface Doctor {
    doctorId: string;
    doctorName: string;
    doctorPhoto: string;
    areaOfSpecialization: string;
    doctorRating: number;
    patients?: Patient[];
}

interface Department {
    serviceId: string;
    serviceName: string;
}

export interface Hospital {
    hospitalLocation: string;
    hospitalPhoneNumber: string;
    hospitalWorkingHours: string;
    incorporatingCertificate: string;
    hospitalSpecialistServices: string;
    hospitalServicesOffered: string;
    hospitalNumberOfBeds: string;
    hospitalOwnerDetails: string;
    hospitalName: string;
    hospitalPhoto: string;
    doctors?: Doctor[];
    departments?: Department[];
    emtCases?: {
        total: number;
        cases: Case[];
    };
}

const HospitalProfile: React.FC = () => {
    const { state } = useLocation();
    const hospital: Hospital | null = state?.data || null;
    const [selectedCategory, setSelectedCategory] = useState<string>("overview");
    const [doctorSearchQuery, setDoctorSearchQuery] = useState<string>("");
    const [patientSearchQuery, setPatientSearchQuery] = useState<string>("");
    const [liveCaseSearchQuery, setLiveCaseSearchQuery] = useState<string>("");

    if (!hospital) {
        return <div>No hospital data found.</div>;
    }

    // Filtering patients based on search query
    const filteredPatients = hospital.doctors
        ?.flatMap((doctor) => doctor.patients || []) // Flatten the list of patients from all doctors
        .filter((patient) =>
            patient.patientName.toLowerCase().includes(patientSearchQuery.toLowerCase())
        );
    const renderContent = () => {
        switch (selectedCategory) {
            case "overview":
                return (
                    <HospitalOverview hospital={hospital} />
                );
            case "doctors":
                return (
                    <DoctorList
                        doctors={hospital.doctors || []}
                        doctorSearchQuery={doctorSearchQuery}
                        setDoctorSearchQuery={setDoctorSearchQuery}
                    />
                );
            case "patients":
                return (
                    <PatientTable
                        patients={filteredPatients || []}
                        searchQuery={patientSearchQuery}
                        onSearchQueryChange={setPatientSearchQuery}
                    />
                );
            case "departments":
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">Departments</h2>

                        {/* Department count */}
                        <p><strong>Total Departments Available:</strong> {hospital.departments?.length || 0}</p>

                        {/* Department List */}
                        {hospital.departments?.map((department) => (
                            <Card key={department.serviceId} className="p-4 space-y-2">
                                <p>{department.serviceName}</p>
                            </Card>
                        ))}
                    </div>
                );
            case "LiveCases":
                return (
                    <LiveCasesTable
                        cases={hospital.emtCases?.cases || []}
                        searchQuery={liveCaseSearchQuery}
                        onSearchQueryChange={setLiveCaseSearchQuery}
                    />

                );
            case "ownerDetails":
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">Owner Details</h2>
                        <p>{hospital.hospitalOwnerDetails}</p>
                    </div>
                );
            default:
                return <div>Select a category to view details.</div>;
        }
    };

    return (
        <div className="flex gap-4">
            <Card className="w-64 h-[600px] p-4 border-r border-gray-300 border rounded-[38px]">
                <nav className="space-y-4">
                    {[
                        { key: "overview", label: "Hospital Overview" },
                        { key: "doctors", label: "Doctors" },
                        { key: "patients", label: "Patients" },
                        { key: "departments", label: "Departments" },
                        { key: "ownerDetails", label: "Owner Details" },
                        { key: "LiveCases", label: "Live Cases" },
                    ].map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => setSelectedCategory(key)}
                            className={`block w-full text-left p-2 rounded-md ${selectedCategory === key ? "bg-blue-100 text-black" : "text-gray-700"
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </nav>
            </Card>
            <Card className="w-3/4 p-6 rounded-[38px]">
                <HospitalInfo hospital={hospital} />
                {renderContent()}
            </Card>
        </div>
    );
};

export default HospitalProfile;
