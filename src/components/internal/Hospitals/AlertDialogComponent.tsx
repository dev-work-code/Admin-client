import { AlertDialog, AlertDialogContent, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Loader2, X } from 'lucide-react';
import { useState } from "react";
import { hospitalSchema } from "@/components/types/schema";
import api from "@/utils/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type HospitalFormData = z.infer<typeof hospitalSchema>;

interface AlertDialogComponentProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const AlertDialogComponent: React.FC<AlertDialogComponentProps> = ({
    open,
    onOpenChange,
}) => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
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
            const response = await api.post(
                '/admin/registerHospital',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            toast({
                description: response.data.message || 'Operation successful!',
                variant: 'default',
                className: "bg-green-500 text-white",
            });
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || 'Something went wrong!';
            toast({
                description: errorMessage,
                variant: 'destructive',
            });

            console.error('Error:', error);
        } finally {
            setLoading(false); // Reset loading state after submission
            reset()
        }
    };
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-5xl rounded-3xl">
                <button
                    className="absolute top-4 right-4 bg-[#E9F4FF] rounded-full text-[#013DC0] p-2"
                    onClick={() => onOpenChange(false)}
                >
                    <X className="h-6 w-6" />
                </button>
                <AlertDialogHeader className="text-2xl font-medium mb-6 ml-6 text-[#003CBF]">Add Hospital</AlertDialogHeader>
                <form
                    className='p-4'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Hospital Name</Label>
                            <Input
                                {...register('hospitalName')}
                                type="text"
                                className="mt-1 block w-full border-none bg-[#E9F4FF]"
                            />
                            {errors.hospitalName && (
                                <p className="text-red-500 text-sm">{errors.hospitalName.message}</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Hospital Location</Label>
                            <Input
                                {...register('hospitalLocation')}
                                type="text"
                                className="mt-1 block w-full border-none bg-[#E9F4FF] "
                            />
                            {errors.hospitalLocation && (
                                <p className="text-red-500 text-sm">{errors.hospitalLocation.message}</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Phone Number</Label>
                            <div className="relative">
                                <Input
                                    {...register('hospitalPhoneNumber')}
                                    type="tel"
                                    className="mt-1 block w-full border-none bg-[#e9F4FF]  pl-12"
                                    placeholder="Enter phone number"
                                />
                                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">+91</span>
                            </div>
                            {errors.hospitalPhoneNumber && (
                                <p className="text-red-500 text-sm">{errors.hospitalPhoneNumber.message}</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Date of Registration</Label>
                            <Input
                                {...register('hospitalDateOfRegistration')}
                                type="date"
                                className="mt-1 block w-full border-none bg-[#E9F4FF] "
                            />
                            {errors.hospitalDateOfRegistration && (
                                <p className="text-red-500 text-sm">{errors.hospitalDateOfRegistration.message}</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700">DMHO Registration</Label>
                            <Input
                                {...register('hospitalDMHORegistration')}
                                type="text"
                                className="mt-1 block w-full border-none bg-[#E9F4FF] "
                            />
                            {errors.hospitalDMHORegistration && (
                                <p className="text-red-500 text-sm">{errors.hospitalDMHORegistration.message}</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Company Details</Label>
                            <Input
                                {...register('hospitalCompanyDetails')}
                                className="mt-1 block w-full border-none bg-[#E9F4FF]"
                            ></Input>
                            {errors.hospitalCompanyDetails && (
                                <p className="text-red-500 text-sm">{errors.hospitalCompanyDetails.message}</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Company PAN</Label>
                            <Input
                                {...register('hospitalCompanyPAN')}
                                type="text"
                                className="mt-1 block w-full border-none bg-[#E9F4FF]"
                            />
                            {errors.hospitalCompanyPAN && (
                                <p className="text-red-500 text-sm">{errors.hospitalCompanyPAN.message}</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Owner Details</Label>
                            <Input
                                {...register('hospitalOwnerDetails')}
                                className="mt-1 block w-full border-none bg-[#E9F4FF] "
                            ></Input>
                            {errors.hospitalOwnerDetails && (
                                <p className="text-red-500 text-sm">{errors.hospitalOwnerDetails.message}</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Services Offered</Label>
                            <Input
                                {...register('hospitalServicesOffered')}
                                className="mt-1 block w-full border-none bg-[#E9F4FF]"
                            ></Input>
                            {errors.hospitalServicesOffered && (
                                <p className="text-red-500 text-sm">{errors.hospitalServicesOffered.message}</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Specialist Services</Label>
                            <Input
                                {...register('hospitalSpecialistServices')}
                                className="mt-1 block w-full border-none bg-[#E9F4FF]"
                            ></Input>
                            {errors.hospitalSpecialistServices && (
                                <p className="text-red-500 text-sm">{errors.hospitalSpecialistServices.message}</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Number of Beds</Label>
                            <Input
                                {...register('hospitalNumberOfBeds')}
                                type="number"
                                className="mt-1 block w-full border-none bg-[#E9F4FF]"
                            />
                            {errors.hospitalNumberOfBeds && (
                                <p className="text-red-500 text-sm">{errors.hospitalNumberOfBeds.message}</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Areas of Interest</Label>
                            <Input
                                {...register('hospitalAreasOfInterest')}
                                className="mt-1 block w-full border-none bg-[#E9F4FF] "
                            ></Input>
                            {errors.hospitalAreasOfInterest && (
                                <p className="text-red-500 text-sm">{errors.hospitalAreasOfInterest.message}</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Address</Label>
                            <Input
                                {...register('address')}
                                className="mt-1 block w-full border-none bg-[#E9F4FF] "
                            ></Input>
                            {errors.address && (
                                <p className="text-red-500 text-sm">{errors.address.message}</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Latitude</Label>
                            <Input
                                {...register('latitude')}
                                type="text"
                                className="mt-1 block w-full border-none bg-[#E9F4FF]"
                            />
                            {errors.latitude && (
                                <p className="text-red-500 text-sm">{errors.latitude.message}</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Longitude</Label>
                            <Input
                                {...register('longitude')}
                                type="text"
                                className="mt-1 block w-full border-none bg-[#E9F4FF] "
                            />
                            {errors.longitude && (
                                <p className="text-red-500 text-sm">{errors.longitude.message}</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Upload Images</Label>
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
                    </div>
                    <div className="mt-4 mb-4">
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-6 px-4 rounded-md hover:bg-blue-700"
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin text-white" />
                            ) : (
                                'Submit'
                            )}
                        </Button>
                    </div>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertDialogComponent;