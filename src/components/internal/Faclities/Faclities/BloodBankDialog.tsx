import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/utils/api";
import { Button } from "@/components/ui/button"; // Adjust as well
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { Loader2, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Zod validation schema for Blood Bank
const bloodBankSchema = z.object({
  bloodBankName: z.string().min(1, "Blood bank name is required"),
  bloodBankLocation: z.string().min(1, "Location is required"),
  bloodBankPhoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number cannot be more than 15 characters"),
  latitude: z.string().min(1, "Latitude is required"),
  longitude: z.string().min(1, "Longitude is required"),
  bloodBankImage: z.instanceof(FileList).refine((fileList) => fileList.length > 0, "Blood bank image is required"),
});

type FormData = z.infer<typeof bloodBankSchema>;

const BloodBankDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(bloodBankSchema),
  });
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    console.log(data);

    setLoading(true); // Set loading to true when submitting
    try {
      // Prepare the form data
      const formData = new FormData();
      formData.append("bloodBankName", data.bloodBankName);
      formData.append("bloodBankLocation", data.bloodBankLocation);
      formData.append("bloodBankPhoneNumber", data.bloodBankPhoneNumber);
      formData.append("latitude", data.latitude);
      formData.append("longitude", data.longitude);
      formData.append("bloodBankImage", data.bloodBankImage[0]);

      // Make the API call
      const response = await api.post(
        "/admin/registerBloodBank",  // Use the API endpoint directly
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",  // Ensure the correct content type
          },
        }
      );

      // Show a success toast
      toast({
        description: response.data.message || "Blood bank added successfully!",
        variant: "default",
        className: "bg-green-500 text-white", // Success variant styling
      });

      console.log("Success:", response.data);
      onClose(); // Close the dialog after successful submission
      reset(); // Reset the form fields
    } catch (error: any) {
      // Handle error more explicitly
      let errorMessage = "Something went wrong!";

      // Check if the error response contains a message
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // Use the message from the API response
      } else if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error; // Use a generic error message from the API response
      }

      // Show an error toast
      toast({
        description: errorMessage,
        variant: "destructive", // Error variant styling
      });

      console.error("Error:", error);
    } finally {
      setLoading(false); // Reset loading state after submission
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-medium mb-6 ml-6 text-[#003CBF]">
            Add Blood-Bank
          </AlertDialogTitle>
        </AlertDialogHeader>
        <button
          className="absolute top-4 right-4 bg-[#E9F4FF] rounded-full text-[#013DC0] p-2"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </button>
        {/* Blood Bank Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="bloodBankName" className="block text-sm font-medium text-gray-700">Blood Bank Name</Label>
            <Input
              {...register("bloodBankName")}
              id="bloodBankName"
              className="mt-1 block w-full border-none bg-[#E9F4FF] "
            />
            {errors.bloodBankName && <span className="text-red-500">{errors.bloodBankName.message}</span>}
          </div>

          <div>
            <Label htmlFor="bloodBankLocation" className="block text-sm font-medium text-gray-700">Location</Label>
            <Input
              {...register("bloodBankLocation")}
              id="bloodBankLocation"
              className="mt-1 block w-full border-none bg-[#E9F4FF] "
            />
            {errors.bloodBankLocation && <span className="text-red-500">{errors.bloodBankLocation.message}</span>}
          </div>

          <div>
            <Label htmlFor="bloodBankPhoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</Label>
            <Input
              {...register("bloodBankPhoneNumber")}
              id="bloodBankPhoneNumber"
              className="mt-1 block w-full border-none bg-[#E9F4FF] "
            />
            {errors.bloodBankPhoneNumber && <span className="text-red-500">{errors.bloodBankPhoneNumber.message}</span>}
          </div>

          <div>
            <Label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude</Label>
            <Input
              {...register("latitude")}
              id="latitude"
              className="mt-1 block w-full border-none bg-[#E9F4FF] "
            />
            {errors.latitude && <span className="text-red-500">{errors.latitude.message}</span>}
          </div>

          <div>
            <Label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude</Label>
            <Input
              {...register("longitude")}
              id="longitude"
              className="mt-1 block w-full border-none bg-[#E9F4FF] "
            />
            {errors.longitude && <span className="text-red-500">{errors.longitude.message}</span>}
          </div>
          <div>
            <Label htmlFor="bloodBankImage" className="block text-sm font-medium text-gray-700">Blood Bank Image</Label>
            <input
              {...register("bloodBankImage")}
              id="bloodBankImage"
              type="file"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {errors.bloodBankImage && <span className="text-red-500">{errors.bloodBankImage.message}</span>}
          </div>
          <AlertDialogFooter>
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-5 px-4 rounded-md hover:bg-blue-700"
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-white" />
              ) : (
                "Submit"
              )}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BloodBankDialog;
