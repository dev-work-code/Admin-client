import React, { useState } from 'react';
import useSOSCases from '@/hooks/useSOSCases';
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
import SkeletonLoader from '@/pages/common/SkeletonLoader';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { EllipsisVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import api from '@/utils/api';

const SOSCasesTable: React.FC = () => {
  const { data, isLoading, isError } = useSOSCases();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();
  const [sosDetails, setSosDetails] = useState<Record<string, any>>({});
  const [loadingSosDetails, setLoadingSosDetails] = useState<string | null>(null);

  // Define handleViewSosDetails before any conditional returns
  const handleViewSosDetails = async (soscallbackId: string) => {
    try {
      setLoadingSosDetails(soscallbackId);
      const response = await api.get(`/admin/get-complete-call-details?sosCallbackId=${soscallbackId}`);
      console.log('API Response:', response.data);
      setSosDetails((prev) => ({
        ...prev,
        [soscallbackId]: response.data
      }));
    } catch (error) {
      console.error('Error fetching SOS details:', error);
    } finally {
      setLoadingSosDetails(null);
    }
  };

  // Then handle loading and error states
  if (isLoading) return <SkeletonLoader fullPage />;
  if (isError) return <p className='text-center text-red-500'>Error loading SOS cases.</p>;

  const connectWebSocket = (url: string, message: object) => {
    const socket = new WebSocket(url);

    // Handle WebSocket open event
    socket.onopen = () => {
      console.log('WebSocket connection established.');
      socket.send(JSON.stringify(message));
    };

    // Handle incoming messages
    socket.onmessage = (event) => {
      console.log('Message from server:', event.data);
    };

    // Handle WebSocket error
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Handle WebSocket close
    socket.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    return socket;
  };

  const handleJoinCall = (sosCase: any) => {
    const {
      appId,
      token,
      channel,
      sosCallbackId,
      userId,
      latitude,
      longitude,
    } = sosCase;
    // console.log(token + "sosCasePage");

    connectWebSocket('wss://livapp.elitceler.com/ws/sos-callback', {
      userType: 'user',
      appId: appId,
      token: token,
      channel: channel,
      sosCallbackId: sosCallbackId,
    });
    console.log(token + 'token for last session');

    // startCall(appId, token, channel , userId);
    navigate(
      `/call-page?appId=${appId}&token=${token}&channel=${channel}&userId=${userId}&sosCallbackId=${sosCallbackId}&latitude=${latitude}&longitude=${longitude}`
    );
  };

  // Filtered SOS cases based on search term
  const filteredCases = (data || []).filter(
    (sosCase) =>
      sosCase.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sosCase.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sosCase.user.mobileNumber.includes(searchTerm)
  );

  // Pagination logic
  const totalItems = filteredCases.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCases = filteredCases.slice(
    startIndex,
    startIndex + itemsPerPage
  );



  return (
    <Card className='p-6 space-y-4 max-w-5xl mx-auto shadow-[2px_4px_5px_0px_#E9EBFFB2] rounded-[38px] border'>
      <CardTitle className='text-2xl font-medium mb-6 ml-6 text-[#003CBF]'>
        SOS Cases
      </CardTitle>
      <CardContent>
        {/* Search Bar */}
        <div className='flex items-center justify-end gap-2 mb-4'>
          <div className='relative w-full md:w-72 shadow-[5px_5px_20px_0px_#61ABEB33] rounded-full md:ml-10'>
            <Input
              type='text'
              placeholder='Search by name, email, or mobile number'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full border px-4 py-5 rounded-full pr-12 bg-white'
            />
          </div>
        </div>
        {/* SOS Cases Table */}
        <div className='border rounded-md overflow-auto'>
          <Table className='w-full'>
            <TableHeader className='bg-[#E8F1FD]'>
              <TableRow>
                <TableHead className='text-left'>S.No.</TableHead>
                <TableHead className='text-left'>Name</TableHead>
                <TableHead className='text-left'>Email</TableHead>
                <TableHead className='text-left'>Mobile Number</TableHead>
                <TableHead className='text-left'>Latitude</TableHead>
                <TableHead className='text-left'>Longitude</TableHead>
                <TableHead className='text-left'>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCases.length > 0 ? (
                paginatedCases.map((sosCase, index) => (
                  <TableRow
                    key={sosCase.sosCallbackId}
                    className='hover:bg-gray-50'
                  >
                    <TableCell>{startIndex + index + 1}.</TableCell>
                    <TableCell>{sosCase.user.name}</TableCell>
                    <TableCell>{sosCase.user.email}</TableCell>
                    <TableCell>{sosCase.user.mobileNumber}</TableCell>
                    <TableCell>{sosCase.latitude}</TableCell>
                    <TableCell>{sosCase.longitude}</TableCell>
                    <TableCell>
                      {new Date(sosCase.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {sosCase.callCompleted === false ?
                        <button
                          className='bg-[#E8F1FD] p-4 rounded-md'
                          onClick={() => handleJoinCall(sosCase)}
                        >
                          Join Call
                        </button>
                        :
                        <button
                          className='bg-[#E8F1FD] p-4 rounded-md cursor-not-allowed'
                          disabled
                        >
                          Call Completed
                        </button>}
                    </TableCell>

                    <TableCell>
                      <DropdownMenu 
                        onOpenChange={(open) => {
                          if (open) {
                            handleViewSosDetails(sosCase.sosCallbackId);
                          }
                        }}
                      >
                        <DropdownMenuTrigger>
                          <button 
                            type="button"
                            className="p-2 hover:bg-gray-100 rounded-full"
                          >
                            <EllipsisVertical className="w-5 h-5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                          side="bottom" 
                          align="center" 
                          className="bg-white p-2 rounded-md shadow-md min-w-[200px] z-50"
                        >
                          {loadingSosDetails === sosCase.sosCallbackId ? (
                            <DropdownMenuItem disabled>
                              Loading...
                            </DropdownMenuItem>
                          ) : sosDetails[sosCase.sosCallbackId] ? (
                            <>
                              <DropdownMenuItem className="flex justify-between py-2 px-4 hover:bg-gray-100">
                                Driver Status
                                <span className="text-red-500">
                                  {sosDetails[sosCase.sosCallbackId].driver === null ? "Not Assigned" : "Assigned"}
                                </span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex justify-between py-2 px-4 hover:bg-gray-100">
                                Doctor Status
                                <span className="text-red-500">
                                  {sosDetails[sosCase.sosCallbackId].doctor === null ? "Not Assigned" : "Assigned"}
                                </span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex justify-between py-2 px-4 hover:bg-gray-100">
                                Hospital Status
                                <span className="text-red-500">
                                  {sosDetails[sosCase.sosCallbackId].hospital === null ? "Not Assigned" : "Assigned"}
                                </span>
                              </DropdownMenuItem>
                            </>
                          ) : (
                            <DropdownMenuItem disabled>
                              No data available
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>

                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className='text-center text-gray-500'>
                    No SOS cases found.
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
    </Card>
  );
};

export default SOSCasesTable;
