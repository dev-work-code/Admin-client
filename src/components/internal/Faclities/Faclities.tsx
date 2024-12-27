import React, { useState } from "react";
import { useFacilities } from "@/hooks/useFacilities"; // Custom hook for fetching facilities
import { EllipsisVertical, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import SkeletonLoader from "@/pages/common/SkeletonLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import BloodBankDialog from "./BloodBankDialog";
import DiagnosticCenterDialog from "./DiagnosticCenterDialog";
import PharmacyDialog from "./PharmacyDialog";

const FacilitiesTable: React.FC = () => {
    const { data, isLoading, error } = useFacilities();

    const [filter, setFilter] = useState<"all" | "bloodBanks" | "diagnosticCenters" | "pharmacies">("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [bloodBankDialogOpen, setBloodBankDialogOpen] = useState(false);
    const [diagnosticCenterDialogOpen, setDiagnosticCenterDialogOpen] = useState(false);
    const [pharmacyDialogOpen, setPharmacyDialogOpen] = useState(false);


    if (isLoading) return <SkeletonLoader fullPage />;
    if (error) return <p className="text-center text-red-500">Error loading facilities: {String(error)}</p>;

    // Combine all facility data
    const allFacilities = [
        ...(data?.bloodBanks || []),
        ...(data?.diagnosticCenters || []),
        ...(data?.pharmacies || []),
    ];

    // Filter facilities based on the selected filter
    const filteredFacilities =
        filter === "all"
            ? allFacilities
            : data?.[filter as keyof typeof data] || [];

    // Apply search filter
    const searchedFacilities = filteredFacilities.filter((facility: any) =>
        (facility.bloodBankName ||
            facility.diagnosticCenterName ||
            facility.pharmacyName)?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalItems = searchedFacilities.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedFacilities = searchedFacilities.slice(startIndex, startIndex + itemsPerPage);
    const bloodBanksCount = data?.bloodBanks?.length || 0;
    const diagnosticCentersCount = data?.diagnosticCenters?.length || 0;
    const pharmaciesCount = data?.pharmacies?.length || 0;
    const allCount = bloodBanksCount + diagnosticCentersCount + pharmaciesCount;

    return (
        <Card className="p-6 space-y-4 max-w-7xl mx-auto shadow-[2px_4px_5px_0px_#E9EBFFB2] rounded-[38px] border">
            <CardTitle className="text-2xl font-medium mb-6 ml-6 text-[#003CBF]">Facilities</CardTitle>
            <CardContent>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 mb-8">
                    {/* Filter Buttons */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <Button
                            variant="primary"
                            className={`px-4 py-2 rounded-full font-medium ${filter === "all" ? "bg-[#003CBF] text-white border-none" : ""}`}
                            onClick={() => setFilter("all")}
                        >
                            All {allCount}
                        </Button>
                        <Button
                            variant="primary"
                            className={`px-4 py-2 rounded-full font-medium ${filter === "bloodBanks" ? "bg-[#003CBF] text-white border-none" : ""}`}
                            onClick={() => setFilter("bloodBanks")}
                        >
                            Blood Banks {bloodBanksCount}
                        </Button>
                        <Button
                            variant="primary"
                            className={`px-4 py-2 rounded-full font-medium ${filter === "diagnosticCenters" ? "bg-[#003CBF] text-white border-none" : ""}`}
                            onClick={() => setFilter("diagnosticCenters")}
                        >
                            Diagnostic Centers {diagnosticCentersCount}
                        </Button>
                        <Button
                            variant="primary"
                            className={`px-4 py-2 rounded-full font-medium ${filter === "pharmacies" ? "bg-[#003CBF] text-white border-none" : ""}`}
                            onClick={() => setFilter("pharmacies")}
                        >
                            Pharmacies {pharmaciesCount}
                        </Button>
                    </div>
                    <div className="flex items-center">
                        {/* Search Bar */}
                        <div className="relative w-full md:w-72 shadow-[5px_5px_20px_0px_#61ABEB33] rounded-full md:mr-6">
                            <input
                                type="text"
                                placeholder="Search facilities"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full border px-4 py-2 rounded-full pr-12"
                            />
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#003CBF] p-2 rounded-full">
                                <Search className="text-white" />
                            </div>
                        </div>
                        {/* Conditional Button Rendering */}
                        {filter !== "all" && (
                            <Button
                                variant="primary"
                                className=" bg-[#013DC0] text-white"
                                onClick={() => {
                                    if (filter === "bloodBanks") setBloodBankDialogOpen(true);
                                    if (filter === "diagnosticCenters") setDiagnosticCenterDialogOpen(true);
                                    if (filter === "pharmacies") setPharmacyDialogOpen(true);
                                }}
                            >
                                Add {filter.charAt(0).toUpperCase() + filter.slice(1)}
                            </Button>
                        )}
                    </div>
                </div>
                {/* Facilities Table */}
                <div className="border rounded-md overflow-auto mt-6">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>S.No.</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedFacilities.length > 0 ? (
                                paginatedFacilities.map((facility: any, index: number) => (
                                    <TableRow key={facility.id}>
                                        <TableCell>{startIndex + index + 1}.</TableCell>
                                        <TableCell>
                                            {facility.bloodBankName || facility.diagnosticCenterName || facility.pharmacyName || "N/A"}
                                        </TableCell>
                                        <TableCell>{facility.location || "N/A"}</TableCell>
                                        <TableCell>
                                            {facility.bloodBankName
                                                ? "Blood Bank"
                                                : facility.diagnosticCenterName
                                                    ? "Diagnostic Center"
                                                    : "Pharmacy"}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu >
                                                <DropdownMenuTrigger>
                                                    <EllipsisVertical className="cursor-pointer" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent >
                                                    <DropdownMenuItem
                                                    >
                                                        View Maps
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                    >
                                                        Remove
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        No facilities found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                {/* Pagination */}
                <div className="mt-4 flex justify-center">
                    <Pagination>
                        {currentPage > 1 ? (
                            <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                                Previous
                            </PaginationPrevious>
                        ) : (
                            <PaginationPrevious className="text-gray-400 cursor-not-allowed">
                                Previous
                            </PaginationPrevious>
                        )}
                        <PaginationContent>
                            {Array.from({ length: totalPages }).map((_, idx) => (
                                <PaginationItem key={idx}>
                                    <PaginationLink
                                        isActive={currentPage === idx + 1}
                                        onClick={() => setCurrentPage(idx + 1)}
                                    >
                                        {idx + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                        </PaginationContent>
                        {currentPage < totalPages ? (
                            <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                                Next
                            </PaginationNext>
                        ) : (
                            <PaginationNext className="text-gray-400 cursor-not-allowed">
                                Next
                            </PaginationNext>
                        )}
                    </Pagination>
                </div>
            </CardContent>
            <BloodBankDialog isOpen={bloodBankDialogOpen} onClose={() => setBloodBankDialogOpen(false)} />
            <DiagnosticCenterDialog isOpen={diagnosticCenterDialogOpen} onClose={() => setDiagnosticCenterDialogOpen(false)} />
            <PharmacyDialog isOpen={pharmacyDialogOpen} onClose={() => setPharmacyDialogOpen(false)} />
        </Card>
    );
};

export default FacilitiesTable;
