import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

interface EMT {
    emtId: string;
    emtName: string;
    emtMobileNumber: string;
}

interface Case {
    emtCaseId: string;
    emt: EMT;
    patientName: string;
    condition: string;
    createdAt: string;
}

interface LiveCasesTableProps {
    cases: Case[];
    searchQuery: string;
    onSearchQueryChange: (query: string) => void;
}

const LiveCasesTable: React.FC<LiveCasesTableProps> = ({ cases, searchQuery, onSearchQueryChange }) => {
    const filteredLiveCases = cases.filter((emtCase) =>
        emtCase.patientName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-4">
            {/* Search Input and Case Count */}
            <div className="flex items-center justify-between p-4">
                <p className="font-semibold text-base">Total Live Cases Available: {filteredLiveCases.length}</p>
                <div className="relative w-full md:w-80 shadow-[5px_5px_20px_0px_#61ABEB33] rounded-full md:ml-10">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchQueryChange(e.target.value)}
                        placeholder="Search for live cases"
                        className="w-full border px-4 py-3 rounded-full pr-12 bg-white"
                    />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#003CBF] p-3 rounded-full">
                        <EllipsisVertical className="text-white" />
                    </div>
                </div>
            </div>

            {/* Live Case Table */}
            <div className="border rounded-md overflow-auto">
                <Table className="w-full">
                    <TableHeader className="bg-[#E8F1FD]">
                        <TableRow>
                            <TableHead className="text-left">S.No.</TableHead>
                            <TableHead className="text-left">Patient Name</TableHead>
                            <TableHead className="text-left">Condition</TableHead>
                            <TableHead className="text-left">Reported At</TableHead>
                            <TableHead className="text-left">EMT Name</TableHead>
                            <TableHead className="text-left">EMT Contact</TableHead>
                            <TableHead className="text-left"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredLiveCases.length ? (
                            filteredLiveCases.map((emtCase, index) => (
                                <TableRow key={emtCase.emtCaseId} className="hover:bg-gray-50">
                                    <TableCell>{index + 1}.</TableCell>
                                    <TableCell>{emtCase.patientName || "N/A"}</TableCell>
                                    <TableCell>{emtCase.condition || "N/A"}</TableCell>
                                    <TableCell>{new Date(emtCase.createdAt).toLocaleString()}</TableCell>
                                    <TableCell>{emtCase.emt.emtName || "N/A"}</TableCell>
                                    <TableCell>{emtCase.emt.emtMobileNumber || "N/A"}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <EllipsisVertical className="cursor-pointer" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-gray-500">
                                    No live cases available matching the search query.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default LiveCasesTable;
