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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, X } from "lucide-react";

// Zod validation schema
const pharmacySchema = z.object({
  pharmacyName: z.string().min(1, "Pharmacy name is required"),
  pharmacyLocation: z.string().min(1, "Pharmacy location is required"),
  pharmacyPhoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number cannot be more than 15 characters"),
  latitude: z.string().min(1, "Latitude is required"),
  longitude: z.string().min(1, "Longitude is required"),
  pharmacyImage: z
    .instanceof(FileList)
    .refine((fileList) => fileList.length > 0, "Pharmacy image is required"),
});

type FormData = z.infer<typeof pharmacySchema>;

const PharmacyDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(pharmacySchema),
  });
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setLoading(true); // Set loading to true when submitting
    try {
      // Prepare the form data
      const formData = new FormData();
      formData.append("pharmacyName", data.pharmacyName);
      formData.append("pharmacyLocation", data.pharmacyLocation);
      formData.append("pharmacyPhoneNumber", data.pharmacyPhoneNumber);
      formData.append("latitude", data.latitude);
      formData.append("longitude", data.longitude);
      formData.append("pharmacyImage", data.pharmacyImage[0]);

      // Make the API call
      const response = await api.post(
        "/admin/registerPharmacy", // Use the API endpoint directly
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure the correct content type
          },
        }
      );

      // Show a success toast
      toast({
        description: response.data.message || "Pharmacy added successfully!",
        variant: "default",
        className: "bg-green-500 text-white", // Success variant styling
      });

      console.log("Success:", response.data);
      onClose(); // Close the dialog after successful submission
      reset();
    } catch (error: any) {
      // Handle error more explicitly
      let errorMessage = "Something went wrong!";

      // Check if the error response contains a message
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message; // Use the message from the API response
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-medium mb-6 ml-6 text-[#003CBF]">
            Add Pharmacy
          </AlertDialogTitle>
        </AlertDialogHeader>
        <button
          className="absolute top-4 right-4 bg-[#E9F4FF] rounded-full text-[#013DC0] p-2"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </button>
        {/* Pharmacy Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 md:grid-cols-1"
        >
          <div>
            <Label
              htmlFor="pharmacyName"
              className="block text-sm font-medium text-gray-700"
            >
              Pharmacy Name
            </Label>
            <Input
              {...register("pharmacyName")}
              id="pharmacyName"
              className="mt-1 block w-full border-none bg-[#E9F4FF] "
            />
            {errors.pharmacyName && (
              <span className="text-red-500">
                {errors.pharmacyName.message}
              </span>
            )}
          </div>

          <div>
            <Label
              htmlFor="pharmacyLocation"
              className="block text-sm font-medium text-gray-700"
            >
              Pharmacy Location
            </Label>
            <Input
              {...register("pharmacyLocation")}
              id="pharmacyLocation"
              className="mt-1 block w-full border-none bg-[#E9F4FF] "
            />
            {errors.pharmacyLocation && (
              <span className="text-red-500">
                {errors.pharmacyLocation.message}
              </span>
            )}
          </div>

          <div>
            <Label
              htmlFor="pharmacyPhoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Pharmacy Phone Number
            </Label>
            <Input
              {...register("pharmacyPhoneNumber")}
              id="pharmacyPhoneNumber"
              className="mt-1 block w-full border-none bg-[#E9F4FF] "
            />
            {errors.pharmacyPhoneNumber && (
              <span className="text-red-500">
                {errors.pharmacyPhoneNumber.message}
              </span>
            )}
          </div>

          <div>
            <Label
              htmlFor="latitude"
              className="block text-sm font-medium text-gray-700"
            >
              Latitude
            </Label>
            <Input
              {...register("latitude")}
              id="latitude"
              className="mt-1 block w-full border-none bg-[#E9F4FF] "
            />
            {errors.latitude && (
              <span className="text-red-500">{errors.latitude.message}</span>
            )}
          </div>

          <div>
            <Label
              htmlFor="longitude"
              className="block text-sm font-medium text-gray-700"
            >
              Longitude
            </Label>
            <Input
              {...register("longitude")}
              id="longitude"
              className="mt-1 block w-full border-none bg-[#E9F4FF] "
            />
            {errors.longitude && (
              <span className="text-red-500">{errors.longitude.message}</span>
            )}
          </div>

          <div>
            <Label
              htmlFor="pharmacyImage"
              className="block text-sm font-medium text-gray-700"
            >
              Pharmacy Image
            </Label>
            <input
              {...register("pharmacyImage")}
              id="pharmacyImage"
              type="file"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {errors.pharmacyImage && (
              <span className="text-red-500">
                {errors.pharmacyImage.message}
              </span>
            )}
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

export default PharmacyDialog;
