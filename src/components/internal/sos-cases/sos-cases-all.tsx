import React, { useState, useEffect } from 'react';
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
<<<<<<< HEAD
import { EllipsisVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import api from '@/utils/api';
=======
import { EllipsisVertical, MapPin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
>>>>>>> db52837 (new change)

const SOSCasesTable: React.FC = () => {
  const { data: initialData, isLoading, isError } = useSOSCases();
  const { toast } = useToast()
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();
<<<<<<< HEAD
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
=======
  const [filter, setFilter] = useState<"all" | "pending" | "completed" | "ongoing">("all");

  useEffect(() => {
    // Set initial data when it loads
    if (initialData) {
      // Sort initial data by creation date, newest first
      const sortedData = [...initialData].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setData(sortedData);
    }
  }, [initialData]);

  useEffect(() => {
    // Connect to WebSocket for real-time updates
    const wsUrl = 'wss://livapp.elitceler.com/ws/sos-callback-get-cases';
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log('Connected to SOS cases WebSocket');
    };

    socket.onmessage = (event) => {
      try {
        const wsResponse = JSON.parse(event.data);
        
        // Only process if it's a new SOS case event
        if (wsResponse.eventType === "new_sos_cases" && wsResponse.status === "success") {
          const newCases = wsResponse.data;
          
          toast({
            title: "New SOS Case",
            description: `${newCases.length} new SOS ${newCases.length === 1 ? 'case has' : 'cases have'} been received`,
            variant: "destructive",
          });

          setData(prevData => {
            let updatedData = [...prevData];
            
            // Process each new case
            newCases.forEach((newCase: { sosCallbackId: any; }) => {
              const existingCaseIndex = updatedData.findIndex(item => 
                item.sosCallbackId === newCase.sosCallbackId
              );
              
              if (existingCaseIndex !== -1) {
                // Update existing case
                updatedData[existingCaseIndex] = newCase;
              } else {
                // Add new case
                updatedData.unshift(newCase);
              }
            });
            
            // Sort the data again to ensure proper ordering
            return updatedData.sort((a, b) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };

    // Add reconnection logic
    socket.onclose = () => {
      console.log('WebSocket connection closed, attempting to reconnect...');
      setTimeout(() => {
        new WebSocket(wsUrl);
      }, 3000);
    };

    // Cleanup on unmount
    return () => {
      socket.close();
    };
  }, []);
>>>>>>> db52837 (new change)

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

  // Calculate counts for each category
  const allCases = (data || []);
  const pendingCalls = allCases.filter(call => call.callCompleted === false);
  const completedCalls = allCases.filter(call => call.callCompleted === true);
  
  const counts = {
    all: pendingCalls.length + completedCalls.length,
    pending: pendingCalls.length,
    completed: completedCalls.length,
  };

  // Filter cases based on selected filter
  const getFilteredCases = () => {
    let filtered = allCases;
    
    switch (filter) {
      case "pending":
        filtered = pendingCalls;
        break;
      case "completed":
        filtered = completedCalls;
        break;
      // case "ongoing":
      //   filtered = ongoingCalls;
        // break;
      default:
        filtered = allCases;
    }

    return filtered.filter(
      (sosCase) =>
        sosCase.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sosCase.user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sosCase.user?.mobileNumber.includes(searchTerm)
    );
  };

  const filteredCases = getFilteredCases();

  // Pagination logic
  const totalItems = filteredCases.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCases = filteredCases.slice(
    startIndex,
    startIndex + itemsPerPage
  );

<<<<<<< HEAD

=======
  const openGoogleMaps = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, '_blank');
  };

  const handleViewDetails = (sosCase: any) => {
    navigate(`/sos-details?id=${sosCase.sosCallbackId}`);
  };
>>>>>>> db52837 (new change)

  return (
    <Card className='p-6 space-y-4 max-w-5xl mx-auto shadow-[2px_4px_5px_0px_#E9EBFFB2] rounded-[38px] border'>
      <CardTitle className='text-2xl font-medium mb-6 ml-6 text-[#003CBF]'>
        SOS Cases
      </CardTitle>
      <CardContent>
        {/* Filter Buttons and Search Bar */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 mb-8'>
          <div className='flex flex-col md:flex-row gap-4'>
            <button
              className={`px-4 py-2 rounded-full font-medium ${
                filter === "all" ? "bg-[#003CBF] text-white border-none" : "bg-white text-[#003CBF] border border-[#003CBF]"
              }`}
              onClick={() => setFilter("all")}
            >
              All {counts.all}
            </button>
            <button
              className={`px-4 rounded-full font-medium ${
                filter === "pending" ? "bg-[#003CBF] text-white border-none" : "bg-white text-[#003CBF] border border-[#003CBF]"
              }`}
              onClick={() => setFilter("pending")}
            >
              Pending Calls {counts.pending}
            </button>
            {/* <button
              className={`px-4 py-2 rounded-full font-medium ${
                filter === "ongoing" ? "bg-[#003CBF] text-white" : "bg-white border border-gray-200"
              }`}
              onClick={() => setFilter("ongoing")}
            >
              Ongoing Calls {counts.ongoing}
            </button> */}
            <button
              className={`px-4 py-2 rounded-full font-medium ${
                filter === "completed" ? "bg-[#003CBF] text-white border-none" : "bg-white text-[#003CBF] border border-[#003CBF]"
              }`}
              onClick={() => setFilter("completed")}
            >
              Completed Calls {counts.completed}
            </button>
          </div>
          
          {/* Search Bar */}
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
                <TableHead className='text-left'>Location</TableHead>
                <TableHead className='text-left'>Call Status</TableHead>
                <TableHead className='text-left'>View Details</TableHead>
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
                    <TableCell>
                      <button
                        onClick={() => openGoogleMaps(sosCase.latitude, sosCase.longitude)}
                        className="flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                        title="View Location"
                      >
                        <MapPin className="w-5 h-5" />
                      </button>
                    </TableCell>
                    <TableCell>
                      {sosCase.callCompleted === false ?
                        <button
                          className='bg-[#E8F1FD] p-4 rounded-md w-[7.7rem]'
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
                      <button 
                        type="button"
                        onClick={() => handleViewDetails(sosCase)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        title="View Details"
                      >
                        <EllipsisVertical className="w-5 h-5" />
                      </button>
                    </TableCell>
                    <TableCell>
                      {new Date(sosCase.createdAt).toLocaleDateString()}
                    </TableCell>
<<<<<<< HEAD
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
=======
>>>>>>> db52837 (new change)

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
