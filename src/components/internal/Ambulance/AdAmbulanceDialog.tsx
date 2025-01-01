import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import api from "@/utils/api";
import { toast } from "@/hooks/use-toast";
import { Loader2, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Zod schema for form validation
const registerDriverSchema = z.object({
    driverName: z.string().min(1, "Driver name is required"),
    driverMobileNumber: z
        .string()
        .regex(/^\d{10}$/, "Mobile number must be 10 digits"),
    typeOfAmbulance: z.string().min(1, "Type of ambulance is required"),
    equipment: z.string().optional(),
    registeredHospital: z.string().min(1, "Registered hospital is required"),
    rcCopy: z.instanceof(FileList).refine((fileList) => fileList.length > 0, "Blood bank image is required"),
});

type RegisterDriverFormData = z.infer<typeof registerDriverSchema>;

interface AlertDialogComponentProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const AlertDialogComponent: React.FC<AlertDialogComponentProps> = ({
    open,
    onOpenChange,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RegisterDriverFormData>({
        resolver: zodResolver(registerDriverSchema),
    });

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: RegisterDriverFormData) => {
        setLoading(true);
        try {
            const formData = new FormData();

            // Append other fields
            Object.entries(data).forEach(([key, value]) => {
                if (key === "rcCopy") {
                    const fileList = value as unknown as FileList;
                    if (fileList.length > 0) {
                        formData.append(key, fileList[0]); // Append the first file
                    }
                } else {
                    formData.append(key, value as string | Blob);
                }
            });

            const response = await api.post("/admin/registerDriver", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast({
                description: response.data.message || "Driver registered successfully!",
                variant: "default",
                className: "bg-green-500 text-white",
            });
            reset()
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message || error.response?.data?.error || "Something went wrong!";

            toast({
                description: errorMessage,
                variant: "destructive",
                className: "bg-red-500 text-white",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-5xl rounded-[38px]">
                <button
                    className="absolute top-4 right-4 bg-[#E9F4FF] rounded-full text-[#013DC0] p-2"
                    onClick={() => onOpenChange(false)}
                >
                    <X className="h-6 w-6" />
                </button>
                <AlertDialogHeader>
                    <h2 className="text-xl font-medium mb-2 text-[#003CBF] ml-4">Register Driver</h2>
                </AlertDialogHeader>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 gap-4 md:grid-cols-2"
                    encType="multipart/form-data"
                >
                    <div>
                        <Label className="block text-sm font-medium">Driver Name</Label>
                        <Input
                            type="text"
                            {...register("driverName")}
                            className="mt-1 block w-full border-none bg-[#E9F4FF] "
                        />
                        {errors.driverName && (
                            <p className="text-sm text-red-500">{errors.driverName.message}</p>
                        )}
                    </div>

                    <div>
                        <Label className="block text-sm font-medium">Mobile Number</Label>
                        <Input
                            type="text"
                            {...register("driverMobileNumber")}
                            className="mt-1 block w-full border-none bg-[#E9F4FF] "
                        />
                        {errors.driverMobileNumber && (
                            <p className="text-sm text-red-500">
                                {errors.driverMobileNumber.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label className="block text-sm font-medium">Type of Ambulance</Label>
                        <Input
                            type="text"
                            {...register("typeOfAmbulance")}
                            className="mt-1 block w-full border-none bg-[#E9F4FF] "
                        />
                        {errors.typeOfAmbulance && (
                            <p className="text-sm text-red-500">
                                {errors.typeOfAmbulance.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label className="block text-sm font-medium">Equipment</Label>
                        <Input
                            type="text"
                            {...register("equipment")}
                            className="mt-1 block w-full border-none bg-[#E9F4FF] "
                        />
                        {errors.equipment && (
                            <p className="text-sm text-red-500">{errors.equipment.message}</p>
                        )}
                    </div>

                    <div>
                        <Label className="block text-sm font-medium">Registered Hospital</Label>
                        <Input
                            type="text"
                            {...register("registeredHospital")}
                            className="mt-1 block w-full border-none bg-[#E9F4FF] "
                        />
                        {errors.registeredHospital && (
                            <p className="text-sm text-red-500">
                                {errors.registeredHospital.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label className="block text-sm font-medium">RC Copy Image</Label>
                        <input
                            type="file"
                            {...register("rcCopy")}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {errors.rcCopy && (
                            <p className="text-sm text-red-500">{errors.rcCopy.message}</p>
                        )}
                    </div>
                    <AlertDialogFooter className="flex justify-end items-end">
                        <Button
                            variant="primary"
                            type="submit"
                            className={`w-full rounded px-4 py-5 text-white ${loading ? "bg-gray-400" : "bg-[#003CBF]"
                                }`}
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin text-white" /> : "Register Driver"}
                        </Button>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertDialogComponent;
