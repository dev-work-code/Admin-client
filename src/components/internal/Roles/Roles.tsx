import React, { useState } from "react";
import { useRoles } from "@/hooks/useRoles";
import { EllipsisVertical, Search } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import SkeletonLoader from "@/pages/common/SkeletonLoader";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const RolesTable: React.FC = () => {
    const { data, isLoading, isError } = useRoles();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    if (isLoading) return <SkeletonLoader fullPage />;
    if (isError) return <p className="text-center text-red-500">Error loading roles.</p>;

    // Filtered roles based on search term
    const filteredRoles = (data || []).filter(
        (role) =>
            role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            role.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            role.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalItems = filteredRoles.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedRoles = filteredRoles.slice(startIndex, startIndex + itemsPerPage);
    const handleViewProfile = (hospitalId: string, role: string) => {
        try {
            // Filter the profile data from the existing dataset
            const selectedProfile = data?.find(
                (profile: any) => profile.adminId === hospitalId && profile.role === role
            );

            if (selectedProfile) {
                // Navigate to the profile page with the selected data
                navigate(`/profile/${hospitalId}`, { state: { profile: selectedProfile } });
            } else {
                alert("Profile data not found.");
            }
        } catch (error) {
            console.error("Error navigating to profile page:", error);
            alert("Failed to view profile.");
        }
    };


    return (
        <Card className="p-6 space-y-4 max-w-5xl mx-auto shadow-[2px_4px_5px_0px_#E9EBFFB2] rounded-[38px] border">
            <CardTitle className="text-2xl font-medium mb-6 ml-6 text-[#003CBF]">Admin Roles</CardTitle>
            <CardContent>
                {/* Search Bar */}
                <div className="flex items-center justify-end gap-2 mb-4">
                    <div className="relative w-full md:w-72 shadow-[5px_5px_20px_0px_#61ABEB33] rounded-full md:ml-10">
                        <Input
                            type="text"
                            placeholder="Search by role, name, or email"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border px-4 py-5 rounded-full pr-12 bg-white"
                        />
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#003CBF] p-2 rounded-full">
                            <Search className="text-white" />
                        </div>
                    </div>
                    <Link to="/add-role"> <Button className=" bg-[#013DC0] text-white" variant="primary" >Add Role</Button></Link>
                </div>
                {/* Roles Table */}
                <div className="border rounded-md overflow-auto">
                    <Table className="w-full">
                        <TableHeader className="bg-[#E8F1FD]">
                            <TableRow>
                                <TableHead className="text-left">S.No.</TableHead>
                                <TableHead className="text-left">Name</TableHead>
                                <TableHead className="text-left">Email</TableHead>
                                <TableHead className="text-left">Gender</TableHead>
                                <TableHead className="text-left">Phone Number</TableHead>
                                <TableHead className="text-left">Role</TableHead>
                                <TableHead className="text-left"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedRoles.length > 0 ? (
                                paginatedRoles.map((role, index) => (
                                    <TableRow key={role.adminId} className="hover:bg-gray-50">
                                        <TableCell>{startIndex + index + 1}.</TableCell>
                                        <TableCell>{role.name}</TableCell>
                                        <TableCell>{role.email || "N/A"}</TableCell>
                                        <TableCell>{role.phoneNumber}</TableCell>
                                        <TableCell>{role.gender}</TableCell>
                                        <TableCell><Badge variant="nursing"> {role.role}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <EllipsisVertical className="cursor-pointer" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem onClick={() => handleViewProfile(role.adminId, role.role)}>
                                                        View Profile
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-gray-500">
                                        No roles found.
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
        </Card>
    );
};

export default RolesTable;
