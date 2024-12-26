import { AlertDialog, AlertDialogContent, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Loader2, X } from 'lucide-react';
import { useState } from "react";
import { hospitalSchema } from "@/components/types/schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type HospitalFormData = z.infer<typeof hospitalSchema>;

interface AlertDialogComponentProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const AlertDialogComponent: React.FC<AlertDialogComponentProps> = ({
    open,
    onOpenChange,
}) => {
    const [loading, setLoading] = useState(false); // State to track loading status
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<HospitalFormData>({
        resolver: zodResolver(hospitalSchema),
    });
    const onSubmit = async (data: HospitalFormData) => {
        console.log("Form submitted with data:", data); 
        setLoading(true); // Set loading to true when submitting
        const formData = new FormData();

        // Ensure the phone number has the +91 prefix
        if (data.hospitalPhoneNumber) {
            // Check if the phone number starts with +91, if not, add it
            const formattedPhoneNumber = data.hospitalPhoneNumber.startsWith('+91')
                ? data.hospitalPhoneNumber
                : `+91${data.hospitalPhoneNumber}`;

            // Update the phone number in the data
            data.hospitalPhoneNumber = formattedPhoneNumber;
        }

        Object.entries(data).forEach(([key, value]) => {
            if (key === 'images' && value instanceof FileList) {
                Array.from(value).forEach((file) => formData.append('images', file));
            } else {
                formData.append(key, value as string);
            }
        });

        try {
            const response = await axios.post(
                'https://livapp.elitceler.com/api/v1/hospital/register',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            toast({
                title: 'Success',
                description: response.data.message || 'Operation successful!',
                variant: 'default',
                className: "bg-green-500 text-white",
            });

            console.log('Success:', response.data);
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || 'Something went wrong!';
            toast({
                title: 'Error',
                description: errorMessage,
                variant: 'destructive',
            });

            console.error('Error:', error);
        } finally {
            setLoading(false); // Reset loading state after submission
        }
    };
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-5xl">
                <button
                    className="absolute top-4 right-4 bg-[#E9F4FF] rounded-full text-[#013DC0] p-2"
                    onClick={() => onOpenChange(false)}
                >
                    <X className="h-6 w-6" />
                </button>
                <AlertDialogHeader className="text-2xl font-medium mb-6 ml-6 text-[#003CBF]">Add Hospital</AlertDialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700">Hospital Name</Label>
                            <Input
                                {...register('hospitalName')}
                                type="text"
                                id="hospitalName"
                                className="mt-1 block w-full bg-[#E9F1FF] border-none"
                            />
                            {errors.hospitalName && (
                                <p className="text-red-500 text-sm">{errors.hospitalName.message}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="hospitalOwnerDetails" className="block text-sm font-medium text-gray-700">Owner Details</Label>
                            <Input
                                {...register('hospitalOwnerDetails')}
                                id="hospitalOwnerDetails"
                                className="mt-1 block w-full bg-[#E9F1FF] border-none"
                            />
                            {errors.hospitalOwnerDetails && (
                                <p className="text-red-500 text-sm">{errors.hospitalOwnerDetails.message}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="hospitalLocation" className="block text-sm font-medium text-gray-700">Hospital Location</Label>
                            <Input
                                {...register('hospitalLocation')}
                                type="text"
                                id="hospitalLocation"
                                className="mt-1 block w-full bg-[#E9F1FF] border-none"
                            />
                            {errors.hospitalLocation && (
                                <p className="text-red-500 text-sm">{errors.hospitalLocation.message}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="hospitalPhoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</Label>
                            <div className="relative">
                                <Input
                                    {...register('hospitalPhoneNumber')}
                                    type="tel"
                                    id="hospitalPhoneNumber"
                                    className="mt-1 block w-full pl-12 bg-[#E9F1FF] border-none"
                                    placeholder="Enter phone number"
                                />
                                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">+91</span>
                            </div>
                            {errors.hospitalPhoneNumber && (
                                <p className="text-red-500 text-sm">{errors.hospitalPhoneNumber.message}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="hospitalDateOfRegistration" className="block text-sm font-medium text-gray-700">Date of Registration</Label>
                            <Input
                                {...register('hospitalDateOfRegistration')}
                                type="date"
                                id="hospitalDateOfRegistration"
                                className="mt-1 block w-full bg-[#E9F1FF] border-none"
                            />
                            {errors.hospitalDateOfRegistration && (
                                <p className="text-red-500 text-sm">{errors.hospitalDateOfRegistration.message}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="hospitalDMHORegistration" className="block text-sm font-medium text-gray-700">DMHO Registration</Label>
                            <Input
                                {...register('hospitalDMHORegistration')}
                                type="text"
                                id="hospitalDMHORegistration"
                                className="mt-1 block w-full bg-[#E9F1FF] border-none"
                            />
                            {errors.hospitalDMHORegistration && (
                                <p className="text-red-500 text-sm">{errors.hospitalDMHORegistration.message}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="hospitalServicesOffered" className="block text-sm font-medium text-gray-700">Services Offered</Label>
                            <textarea
                                {...register('hospitalServicesOffered')}
                                id="hospitalServicesOffered"
                                className="mt-1 block w-full bg-[#E9F1FF] border-none p-2"
                            ></textarea>
                            {errors.hospitalServicesOffered && (
                                <p className="text-red-500 text-sm">{errors.hospitalServicesOffered.message}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="hospitalNumberOfBeds" className="block text-sm font-medium text-gray-700">Number of Beds</Label>
                            <Input
                                {...register('hospitalNumberOfBeds')}
                                type="number"
                                id="hospitalNumberOfBeds"
                                className="mt-1 block w-full bg-[#E9F1FF] border-none"
                            />
                            {errors.hospitalNumberOfBeds && (
                                <p className="text-red-500 text-sm">{errors.hospitalNumberOfBeds.message}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="hospitalAreasOfInterest" className="block text-sm font-medium text-gray-700">Areas of Interest</Label>
                            <textarea
                                {...register('hospitalAreasOfInterest')}
                                id="hospitalAreasOfInterest"
                                className="mt-1 block w-full bg-[#E9F1FF] border-none p-2"
                            ></textarea>
                            {errors.hospitalAreasOfInterest && (
                                <p className="text-red-500 text-sm">{errors.hospitalAreasOfInterest.message}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="hospitalCompanyPAN" className="block text-sm font-medium text-gray-700">Company PAN</Label>
                            <Input
                                {...register('hospitalCompanyPAN')}
                                type="text"
                                id="hospitalCompanyPAN"
                                className="mt-1 block w-full bg-[#E9F1FF] border-none"
                            />
                            {errors.hospitalCompanyPAN && (
                                <p className="text-red-500 text-sm">{errors.hospitalCompanyPAN.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Upload Images</label>
                            <input
                                {...register('images')}
                                type="file"
                                multiple
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {errors.images && (
                                <p className="text-red-500 text-sm">{errors.images.message}</p>
                            )}
                        </div>
                        <div className="mt-6 ml-4">
                            <Button
                                type="submit"
                                className="sm:w-96 bg-[#013DC0] text-white py-6 px-4 rounded-md hover:bg-blue-700"
                                disabled={loading} // Disable button when loading
                            >
                                {loading ? (
                                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                                ) : (
                                    'Add Hospital'
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertDialogComponent;