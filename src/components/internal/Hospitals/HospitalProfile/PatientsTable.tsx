// PatientList.tsx
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Patient } from "../HospitalProflie";

interface PatientListProps {
    patients: Patient[];
    searchQuery: string;
    onSearchQueryChange: (query: string) => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, searchQuery, onSearchQueryChange }) => {
    const filteredPatients = patients.filter((patient) =>
        patient.patientName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-4">
            {/* Search Input for Patients */}
            <div className="flex items-center justify-between p-4">
                <p className="font-semibold text-base">Patients Available: {filteredPatients.length}</p>
                <div className="relative w-full md:w-80 shadow-[5px_5px_20px_0px_#61ABEB33] rounded-full md:ml-10">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchQueryChange(e.target.value)}
                        placeholder="Search for patients"
                        className="w-full border px-4 py-3 rounded-full pr-12 bg-white"
                    />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#003CBF] p-3 rounded-full">
                        <EllipsisVertical className="text-white" />
                    </div>
                </div>
            </div>

            {/* Patient List */}
            <div className="border rounded-md overflow-auto">
                <Table className="w-full">
                    <TableHeader className="bg-[#E8F1FD]">
                        <TableRow>
                            <TableHead className="text-left">S.No.</TableHead>
                            <TableHead className="text-left">Name</TableHead>
                            <TableHead className="text-left">Gender</TableHead>
                            <TableHead className="text-left">Age</TableHead>
                            <TableHead className="text-left">Blood Group</TableHead>
                            <TableHead className="text-left"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPatients.length ? (
                            filteredPatients.map((patient, index) => (
                                <TableRow key={patient.patientId} className="hover:bg-gray-50">
                                    <TableCell>{index + 1}.</TableCell>
                                    <TableCell>{patient.patientName || "N/A"}</TableCell>
                                    <TableCell>{patient.patientGender || "N/A"}</TableCell>
                                    <TableCell>{patient.patientAge || "N/A"}</TableCell>
                                    <TableCell>{patient.patientBloodGroup || "N/A"}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <EllipsisVertical className="cursor-pointer" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem>
                                                    View Profile
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-gray-500">
                                    No patients found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default PatientList;
