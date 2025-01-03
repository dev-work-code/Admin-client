import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { useState } from "react";
import axios from "@/utils/api"; // Adjust path if needed
import { toast } from "@/hooks/use-toast"; // Corrected import

const DriverDetailsComponent = () => {
  // Get the driver data passed via state
  const { state } = useLocation();
  const driver = state?.data;

  const [status, setStatus] = useState<'PENDING' | 'APPROVED' | 'REJECTED'>(driver?.status || "PENDING");
  const [isLoading, setIsLoading] = useState(false);

  // Ensure driver data is available
  if (!driver) {
    return <div>No driver data found.</div>;
  }

  const buttonStyles: { [key in 'PENDING' | 'APPROVED' | 'REJECTED']: string } = {
    PENDING: "bg-red-500 text-white hover:bg-red-600",
    REJECTED: "bg-red-500 text-white hover:bg-red-600",
    APPROVED: "bg-green-500 text-white hover:bg-green-600",
  };

  const handleStatusChange = async () => {
    if (!driver?.driverId) return;
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/admin/driverStatus/${driver.driverId}`,
        { status }
      );

      toast({
        description: response.data.message || "Driver status updated successfully!",
        className: "bg-green-500 text-white",
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Failed to update driver status.";
      toast({
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 space-y-4 max-w-5xl mx-auto shadow-[2px_4px_5px_0px_#E9EBFFB2] rounded-[38px] border border-gray-300">
      <div className="flex items-center space-x-4">
        {/* Driver Photo */}
        {driver.ambulancePhoto ? (
          <img
            src={driver.ambulancePhoto}
            alt={driver.driverName}
            className="w-24 h-24 object-cover rounded-full"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-lg text-gray-600">
            No Photo
          </div>
        )}
        <div>
          <h1 className="text-2xl font-semibold">{driver.driverName}</h1>
          <p className="text-gray-500">{driver.driverQualification || "N/A"}</p>
          <p className="text-sm text-gray-400">{driver.driverMobileNumber}</p>
        </div>
      </div>

      {/* Driver's details */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Driver Name</Label>
          <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
            {driver.driverName}
          </Card>
        </div>

        <div>
          <Label>Driver Phone no.</Label>
          <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
            {driver.driverMobileNumber || "N/A"}
          </Card>
        </div>

        <div>
          <Label>Registration Number</Label>
          <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
            {driver.registrationNumber || "N/A"}
          </Card>
        </div>

        <div>
          <Label>Registered Hospital</Label>
          <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
            {driver.registeredHospital || "N/A"}
          </Card>
        </div>

        <div>
          <Label>Type of Ambulance</Label>
          <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
            {driver.typeOfAmbulance || "N/A"}
          </Card>
        </div>

        <div>
          <Label>RC Copy</Label>
          <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
            {driver.rcCopy || "N/A"}
          </Card>
        </div>

        <div>
          <Label>Address</Label>
          <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
            {driver.driverAddress || "N/A"}
          </Card>
        </div>

        <div>
          <Label>Qualifications</Label>
          <Card className="border-none p-2 shadow-none rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
            {driver.driverAdditionalQualification || "N/A"}
          </Card>
        </div>

        <div>
          <Label>Medical License</Label>
          <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
            {driver.medicalLicense || "N/A"}
          </Card>
        </div>

        <div>
          <Label>Pan Card</Label>
          <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
            {driver.panCard || "N/A"}
          </Card>
        </div>

        <div>
          <Label>Practice Location</Label>
          <Card className="border-none shadow-none p-2 rounded-md bg-[#E9F4FF] text-[#013DC0] font-medium text-base">
            {driver.practiceLocation || "N/A"}
          </Card>
        </div>
      </div>

      {/* Status Update Button */}
      <div className="flex justify-end items-center gap-6">
        <div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'PENDING' | 'APPROVED' | 'REJECTED')}
            className="border rounded-md p-2 bg-white w-52 mt-2"
          >
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
        <Button
          onClick={handleStatusChange}
          disabled={isLoading}
          className={`mt-2 px-4 py-5 w-72 rounded-md ${buttonStyles[status]} ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}
        >
          {isLoading ? "Updating..." : "Update Status"}
        </Button>
      </div>
    </Card>
  );
};

export default DriverDetailsComponent;
