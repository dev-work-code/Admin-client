import { useLocation, useNavigate } from "react-router-dom";
import { EllipsisVertical } from "lucide-react";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Patient {
    patientId: string;
    patientName: string;
    patientAge: number;
    patientGender: string;
    patientEmail: string;
    patientPhoneNumber: string;
    patientBloodGroup?: string;
    patientChiefComplaints?: string;
}

interface Doctor {
    doctorId: string;
    doctorName: string;
    doctorEmail: string | null;
    doctorMobileNumber: string;
    doctorGender: string | null;
    doctorPhoto: string;
    patients: Patient[];
}

const SingleDoctorPage = () => {
    const { state } = useLocation();
    const doctor = state?.data as Doctor;

    const navigate = useNavigate();

    // Initialize states for search and filter
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredPatients, setFilteredPatients] = useState<Patient[]>(doctor?.patients || []);

    // Handle search input
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        filterPatients(event.target.value);
    };

    // Filter patients by search term
    const filterPatients = (term: string) => {
        const filtered = doctor?.patients.filter((patient) =>
            patient.patientName.toLowerCase().includes(term.toLowerCase())
        ) || [];
        setFilteredPatients(filtered);
    };

    // Navigate to doctor details page
    const goToDoctorDetails = () => {
        navigate("/doctor-details", { state: { data: doctor } });
    };

    useEffect(() => {
        setFilteredPatients(doctor?.patients || []);
    }, [doctor]);

    return (
        <Card className="p-4 border-none shadow-none relative -mt-4">
            {/* Dropdown in top-right corner */}
            <div className="absolute top-10 right-4 z-10">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <EllipsisVertical className="cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="text-[#013DC0] border border-[#013DC0]">
                        <DropdownMenuItem onClick={goToDoctorDetails}>
                            View Details
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Doctor Profile */}
            <CardHeader className="text-2xl text-[#013DC0] font-medium">Doctor Profile</CardHeader>
            <Card className="w-full md:w-96 shadow-md mb-8 p-4">
                <div className="flex items-center gap-4">
                    <img
                        src={doctor?.doctorPhoto}
                        alt={doctor?.doctorName}
                        className="w-24 h-24 rounded-full"
                    />
                    <CardDescription>
                        <h1 className="text-xl font-semibold">{doctor?.doctorName}</h1>
                        <p className="text-sm">
                            <strong>Email:</strong> {doctor?.doctorEmail || 'N/A'}
                        </p>
                        <p className="text-sm">
                            <strong>Mobile:</strong> {doctor?.doctorMobileNumber}
                        </p>
                        <p className="text-sm">
                            <strong>Gender:</strong> {doctor?.doctorGender || 'N/A'}
                        </p>
                    </CardDescription>
                </div>
            </Card>
            <div className="bg-[#E9F4FF] rounded-md mb-4 p-2">
                <h2 className="text-xl font-medium text-[#013DC0]">Appointments and Patients</h2>
            </div>
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                <div className="relative w-full md:w-72">
                    <Input
                        type="text"
                        placeholder="Search Patients"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full border px-4 py-2 rounded-full pr-10"
                    />
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#003CBF] p-2 rounded-full">
                        <Search className="text-white w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Patient Table */}
            <div className="border rounded-md overflow-auto">
                <Table className="w-full">
                    <TableHeader className="bg-[#E8F1FD]">
                        <TableRow>
                            <TableHead className="px-4 py-2">S.No.</TableHead>
                            <TableHead className="px-4 py-2">Patient Name</TableHead>
                            <TableHead className="px-4 py-2">Age</TableHead>
                            <TableHead className="px-4 py-2">Gender</TableHead>
                            <TableHead className="px-4 py-2">Email</TableHead>
                            <TableHead className="px-4 py-2"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPatients.length > 0 ? (
                            filteredPatients.map((patient, index) => (
                                <TableRow key={patient.patientId}>
                                    <TableCell className="px-4 py-2">{index + 1}</TableCell>
                                    <TableCell className="px-4 py-2">{patient.patientName}</TableCell>
                                    <TableCell className="px-4 py-2">{patient.patientAge}</TableCell>
                                    <TableCell className="px-4 py-2">{patient.patientGender}</TableCell>
                                    <TableCell className="px-4 py-2">{patient.patientEmail}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <EllipsisVertical className="cursor-pointer" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem

                                                >
                                                    View Profile
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8">
                                    No patients found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
};

export default SingleDoctorPage;
