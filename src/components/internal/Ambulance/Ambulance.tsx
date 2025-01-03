import React, { useState } from "react";
import { useDrivers } from "@/hooks/useDrivers";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";
import api from "@/utils/api";
import SkeletonLoader from "@/pages/common/SkeletonLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import AlertDialogComponent from "./AdAmbulanceDialog";

const DriversTable: React.FC = () => {
  const { data, isLoading, error } = useDrivers();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddDriver = () => {
    setOpenDialog(true);
  };
  const handleViewProfile = async (driverId: string, ApprovalStatus: string) => {
    try {
      const response = await api.get(`/admin/getDriverbyID`, {
        params: { driverId },
      });
      if (ApprovalStatus === "APPROVED") {
        navigate(`/driver/${driverId}`, { state: response.data });
      }
      else if (ApprovalStatus == "PENDING") {
        navigate(`/ambulance-driver-status/${driverId}`, { state: response.data });
      }
      else if (ApprovalStatus == "REJECTED") {
        navigate(`/ambulance-driver-status/${driverId}`, { state: response.data });
      }

    } catch (error) {
      console.error("Error fetching doctor profile:", error);
      alert("Failed to fetch doctor details.");
    }
  };

  // State for filtering, search, and pagination
  const [filter, setFilter] = useState<"all" | "approved" | "pending" | "rejected">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  if (isLoading) return <SkeletonLoader fullPage />;
  if (error) return <p className="text-center text-red-500">Error loading drivers: {String(error)}</p>;

  // Calculate counts for each category
  const approvedCount = data?.approved?.length || 0;
  const pendingCount = data?.pending?.length || 0;
  const rejectedCount = data?.rejected?.length || 0;
  const allCount = approvedCount + pendingCount + rejectedCount;

  // Combine all driver data
  const allDrivers = [
    ...(data?.approved || []),
    ...(data?.pending || []),
    ...(data?.rejected || []),
  ];

  // Filtered data based on the selected filter and search term
  const filteredDrivers = (filter === "all" ? allDrivers : data?.[filter] || []).filter(
    (driver) =>
      (driver.driverName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.registrationNumber?.toLowerCase().includes(searchTerm.toLowerCase())) ?? false
  );

  // Pagination logic
  const totalItems = filteredDrivers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDrivers = filteredDrivers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Card className="p-6 space-y-4 max-w-5xl mx-auto shadow-[2px_4px_5px_0px_#E9EBFFB2] rounded-[38px] border">
      <CardTitle className="text-2xl font-medium mb-6 ml-6 text-[#003CBF]">Drivers</CardTitle>
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
              className={`px-4 py-2 rounded-full font-medium ${filter === "approved" ? "bg-[#003CBF] text-white border-none" : ""}`}
              onClick={() => setFilter("approved")}
            >
              Approved {approvedCount}
            </Button>
            <Button
              variant="primary"
              className={`px-4 py-2 rounded-full font-medium ${filter === "pending" ? "bg-[#003CBF] text-white border-none" : ""}`}
              onClick={() => setFilter("pending")}
            >
              Pending {pendingCount}
            </Button>
            <Button
              variant="primary"
              className={`px-4 py-2 rounded-full font-medium ${filter === "rejected" ? "bg-[#003CBF] text-white border-none" : ""}`}
              onClick={() => setFilter("rejected")}
            >
              Rejected {rejectedCount}
            </Button>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative w-full md:w-72 shadow-[5px_5px_20px_0px_#61ABEB33] rounded-full md:ml-10">
              <input
                type="text"
                placeholder="Search by driver"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border px-4 py-2 rounded-full pr-12 bg-white"
              />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#003CBF] p-2 rounded-full">
                <Search className="text-white" />
              </div>
            </div>
            <Button className=" bg-[#013DC0] text-white" variant="primary" onClick={handleAddDriver}>
              Add Driver
            </Button>
          </div>
        </div>
        {/* Driver Table */}
        <div className="border rounded-md overflow-auto">
          <Table className="w-full">
            <TableHeader className="bg-[#E8F1FD]">
              <TableRow>
                <TableHead className="text-left">S.No.</TableHead>
                <TableHead className="text-left">Driver Name</TableHead>
                <TableHead className="text-left">Mobile No.</TableHead>
                <TableHead className="text-left">Registration No.</TableHead>
                <TableHead className="text-left">Type of Ambulance</TableHead>
                <TableHead className="text-left"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDrivers.length > 0 ? (
                paginatedDrivers.map((driver, index) => (
                  <TableRow key={driver.driverId} className="hover:bg-gray-50">
                    <TableCell>{startIndex + index + 1}.</TableCell>
                    <TableCell>{driver.driverName || "N/A"}</TableCell>
                    <TableCell>{driver.driverMobileNumber || "N/A"}</TableCell>
                    <TableCell>{driver.registrationNumber || "N/A"}</TableCell>
                    <TableCell>{driver.typeOfAmbulance || "N/A"}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <EllipsisVertical className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => handleViewProfile(driver.driverId, driver.driverApprovalStatus)}
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
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    No drivers found.
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

      <AlertDialogComponent open={openDialog} onOpenChange={setOpenDialog} />
    </Card>
  );
};

export default DriversTable;
