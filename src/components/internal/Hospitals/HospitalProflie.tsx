import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";

// Interfaces for type safety
interface Patient {
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

interface Hospital {
    hospitalLocation: string;
    hospitalPhoneNumber: string;
    hospitalWorkingHours: string;
    hospitalSpecialistServices: string;
    hospitalServicesOffered: string;
    hospitalNumberOfBeds: string;
    hospitalOwnerDetails: string;
    hospitalName: string;
    hospitalPhoto: string;
    doctors?: Doctor[];
    departments?: Department[];
}

const HospitalInfo: React.FC<{ hospital: Hospital }> = ({ hospital }) => (
    <div className="sticky top-0 z-10 bg-white p-4 border-b border-gray-300">
        <div className="flex items-center space-x-4">
            <img
                src={hospital.hospitalPhoto}
                alt={hospital.hospitalName}
                className="w-16 h-16 object-cover rounded-full"
            />
            <div>
                <p className="font-semibold">{hospital.hospitalName}</p>
                <p>{hospital.hospitalLocation}</p>
                <p>{hospital.hospitalPhoneNumber}</p>
            </div>
        </div>
    </div>
);

const HospitalProfile: React.FC = () => {
    const { state } = useLocation();
    const hospital: Hospital | null = state?.data || null;
    const [selectedCategory, setSelectedCategory] = useState<string>("overview");
    const [doctorSearchQuery, setDoctorSearchQuery] = useState<string>("");
    const [patientSearchQuery, setPatientSearchQuery] = useState<string>("");

    if (!hospital) {
        return <div>No hospital data found.</div>;
    }
    // Filtering doctors based on search query
    const filteredDoctors = hospital.doctors?.filter((doctor) =>
        doctor.doctorName.toLowerCase().includes(doctorSearchQuery.toLowerCase())
    );

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
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">Hospital Overview</h2>
                        <p><strong>Location:</strong> {hospital.hospitalLocation}</p>
                        <p><strong>Phone Number:</strong> {hospital.hospitalPhoneNumber}</p>
                        <p><strong>Working Hours:</strong> {hospital.hospitalWorkingHours}</p>
                        <p><strong>Specialist Services:</strong> {hospital.hospitalSpecialistServices}</p>
                        <p><strong>Services Offered:</strong> {hospital.hospitalServicesOffered}</p>
                        <p><strong>Total Beds:</strong> {hospital.hospitalNumberOfBeds}</p>
                    </div>
                );
            case "doctors":
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">Doctors</h2>

                        {/* Search Input for Doctors */}
                        <div className="mb-4">
                            <input
                                type="text"
                                value={doctorSearchQuery}
                                onChange={(e) => setDoctorSearchQuery(e.target.value)}
                                placeholder="Search for doctors"
                                className="p-2 border rounded-md w-full"
                            />
                        </div>

                        {/* Doctor count */}
                        <p><strong>Total Doctors Available:</strong> {filteredDoctors?.length || 0}</p>

                        {/* Doctor List */}
                        {filteredDoctors?.map((doctor) => (
                            <Card key={doctor.doctorId} className="p-4 space-y-2">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={doctor.doctorPhoto}
                                        alt={doctor.doctorName}
                                        className="w-16 h-16 object-cover rounded-full"
                                    />
                                    <div>
                                        <p className="font-semibold">{doctor.doctorName}</p>
                                        <p className="text-sm text-gray-500">{doctor.areaOfSpecialization}</p>
                                        <p className="text-sm text-gray-400">Rating: {doctor.doctorRating}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                );
            case "patients":
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">Patients</h2>

                        {/* Search Input for Patients */}
                        <div className="mb-4">
                            <input
                                type="text"
                                value={patientSearchQuery}
                                onChange={(e) => setPatientSearchQuery(e.target.value)}
                                placeholder="Search for patients"
                                className="p-2 border rounded-md w-full"
                            />
                        </div>

                        {/* Patient count */}
                        <p><strong>Total Patients Available:</strong> {filteredPatients?.length || 0}</p>

                        {/* Patient List */}
                        {filteredPatients?.map((patient) => (
                            <Card key={patient.patientId} className="p-4 space-y-2">
                                <p><strong>Name:</strong> {patient.patientName}</p>
                                <p><strong>Gender:</strong> {patient.patientGender}</p>
                                <p><strong>Age:</strong> {patient.patientAge}</p>
                                <p><strong>Blood Group:</strong> {patient.patientBloodGroup}</p>
                            </Card>
                        ))}
                    </div>
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
        <div className="flex">
            <aside className="w-1/4 p-4 border-r border-gray-300">
                <nav className="space-y-4">
                    {[
                        { key: "overview", label: "Hospital Overview" },
                        { key: "doctors", label: "Doctors" },
                        { key: "patients", label: "Patients" },
                        { key: "departments", label: "Departments" },
                        { key: "ownerDetails", label: "Owner Details" },
                    ].map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => setSelectedCategory(key)}
                            className={`block w-full text-left p-2 rounded-md ${selectedCategory === key ? "bg-blue-100 text-blue-600" : "text-gray-700"
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </nav>
            </aside>
            <main className="w-3/4 p-6">
                <HospitalInfo hospital={hospital} />
                {renderContent()}
            </main>
        </div>
    );
};

export default HospitalProfile;
