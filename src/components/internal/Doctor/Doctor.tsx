import React, { useState } from 'react';
import { useDoctors } from '@/hooks/useDoctors';
import { EllipsisVertical, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useNavigate } from 'react-router-dom';
import api from '@/utils/api';
import SkeletonLoader from '@/pages/common/SkeletonLoader';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AddDoctorDialog from './AddDoctor/PorfileScreen/profileScreen';

const DoctorsTable: React.FC = () => {
  const { data, isLoading, error } = useDoctors();
  
  const [openDialog, setOpenDialog] = useState(false);
  const handleAddDotor = () => {
    setOpenDialog(true);
  };
  const navigate = useNavigate();
  const handleViewProfile = async (
    doctorId: string,
    doctorApprovalStatus: string
  ) => {
    try {
      const response = await api.get(`/admin/getDoctorsbyID`, {
        params: { doctorId },
      });
      if (doctorApprovalStatus === 'APPROVED') {
        navigate(`/doctor/${doctorId}`, { state: response.data });
      } else if (doctorApprovalStatus == 'PENDING') {
        navigate(`/doctor-details-status/${doctorId}`, {
          state: response.data,
        });
      } else if (doctorApprovalStatus == 'REJECTED') {
        navigate(`/doctor-details-status/${doctorId}`, {
          state: response.data,
        });
      }
    } catch (error) {
      console.error('Error fetching doctor profile:', error);
      alert('Failed to fetch doctor details.');
    }
  };

  // State for filtering, search, and pagination
  const [filter, setFilter] = useState<
    'all' | 'approved' | 'pending' | 'rejected'
  >('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  if (isLoading) return <SkeletonLoader fullPage />;
  if (error)
    return (
      <p className='text-center text-red-500'>
        Error loading doctors: {String(error)}
      </p>
    );

  // Calculate counts for each category
  const approvedCount = data?.approved?.length || 0;
  const pendingCount = data?.pending?.length || 0;
  const rejectedCount = data?.rejected?.length || 0;
  const allCount = approvedCount + pendingCount + rejectedCount;

  // Combine all doctor data
  const allDoctors = [
    ...(data?.approved || []),
    ...(data?.pending || []),
    ...(data?.rejected || []),
  ];

  // Filtered data based on the selected filter and search term
  const filteredDoctors = (
    filter === 'all' ? allDoctors : data?.[filter] || []
  ).filter(
    (doctor) =>
      (doctor.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.doctorMobileNumber?.includes(searchTerm) ||
        doctor.areaOfSpecialization
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())) ??
      false
  );

  // Pagination logic
  const totalItems = filteredDoctors.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDoctors = filteredDoctors.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Card className='p-6 space-y-4 max-w-5xl mx-auto shadow-[2px_4px_5px_0px_#E9EBFFB2] rounded-[38px] border'>
      <CardTitle className='text-2xl font-medium mb-6 ml-6 text-[#003CBF]'>
        Doctors
      </CardTitle>

      <CardContent>
        <div className='flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 mb-8'>
          {/* Filter Buttons */}
          <div className='flex flex-col md:flex-row gap-4'>
            <Button
              variant='primary'
              className={`px-4 py-2 rounded-full font-medium ${
                filter === 'all' ? 'bg-[#003CBF] text-white border-none' : ''
              }`}
              onClick={() => setFilter('all')}
            >
              All ({allCount})
            </Button>
            <Button
              variant='primary'
              className={`px-4 py-2 rounded-full font-medium ${
                filter === 'approved'
                  ? 'bg-[#003CBF] text-white border-none'
                  : ''
              }`}
              onClick={() => setFilter('approved')}
            >
              Approved ({approvedCount})
            </Button>
            <Button
              variant='primary'
              className={`px-4 py-2 rounded-full font-medium ${
                filter === 'pending'
                  ? 'bg-[#003CBF] text-white border-none'
                  : ''
              }`}
              onClick={() => setFilter('pending')}
            >
              Pending ({pendingCount})
            </Button>
            <Button
              variant='primary'
              className={`px-4 py-2 rounded-full font-medium ${
                filter === 'rejected'
                  ? 'bg-[#003CBF] text-white border-none'
                  : ''
              }`}
              onClick={() => setFilter('rejected')}
            >
              Rejected ({rejectedCount})
            </Button>
          </div>

          {/* Search Bar */}
          <div className='flex flex-col md:flex-row gap-4 items-center'>
            <div className='relative w-full md:w-72 shadow-[5px_5px_20px_0px_#61ABEB33] rounded-full md:ml-10'>
              <input
                type='text'
                placeholder='Search by doctor'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full border px-4 py-2 rounded-full pr-12 text-sm bg-white'
              />
              <div className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#003CBF] p-2 rounded-full'>
                <Search className='text-white' />
              </div>
            </div>
            <Button
              className='bg-[#013DC0] text-white'
              variant='primary'
              onClick={handleAddDotor}
            >
              Add Doctor
            </Button>
          </div>
        </div>
        {/* Doctor Table */}
        <div className='border rounded-md overflow-auto'>
          <Table className='w-full'>
            <TableHeader className='bg-[#E8F1FD]'>
              <TableRow>
                <TableHead className='text-left'>S.No.</TableHead>
                <TableHead className='text-left'>Doctor Name</TableHead>
                <TableHead className='text-left'>Mobile No.</TableHead>
                <TableHead className='text-left'>Specialization</TableHead>
                <TableHead className='text-left'></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDoctors.length > 0 ? (
                paginatedDoctors.map((doctor, index) => (
                  <TableRow key={doctor.doctorId} className='hover:bg-gray-50'>
                    <TableCell>{startIndex + index + 1}</TableCell>
                    <TableCell>{doctor.doctorName || 'N/A'}</TableCell>
                    <TableCell>{doctor.doctorMobileNumber || 'N/A'}</TableCell>
                    <TableCell>
                      {doctor.areaOfSpecialization || 'N/A'}
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <EllipsisVertical className='cursor-pointer' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() =>
                              handleViewProfile(
                                doctor.doctorId,
                                doctor.doctorApprovalStatus
                              )
                            }
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
                  <TableCell colSpan={5} className='text-center text-gray-500'>
                    No doctors found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className='mt-4 flex justify-center'>
          <Pagination>
            {currentPage > 1 ? (
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </PaginationPrevious>
            ) : (
              <PaginationPrevious className='text-gray-400 cursor-not-allowed'>
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
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Next
              </PaginationNext>
            ) : (
              <PaginationNext className='text-gray-400 cursor-not-allowed'>
                Next
              </PaginationNext>
            )}
          </Pagination>
        </div>
      </CardContent>
      <AddDoctorDialog open={openDialog} onOpenChange={setOpenDialog} />
    </Card>
  );
};

export default DoctorsTable;
