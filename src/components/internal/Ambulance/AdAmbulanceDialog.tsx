import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import api from "@/utils/api";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

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
        formState: { errors },
    } = useForm<RegisterDriverFormData>({
        resolver: zodResolver(registerDriverSchema),
    });

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: RegisterDriverFormData) => {
        console.log(data);

        setLoading(true);
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value as string | Blob);
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
            <AlertDialogContent className="max-w-5xl">
                <AlertDialogHeader>
                    <h2 className="text-lg font-semibold">Register Driver</h2>
                </AlertDialogHeader>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 p-4"
                    encType="multipart/form-data"
                >
                    <div>
                        <label className="block text-sm font-medium">Driver Name</label>
                        <input
                            type="text"
                            {...register("driverName")}
                            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.driverName && (
                            <p className="text-sm text-red-500">{errors.driverName.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Mobile Number</label>
                        <input
                            type="text"
                            {...register("driverMobileNumber")}
                            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.driverMobileNumber && (
                            <p className="text-sm text-red-500">
                                {errors.driverMobileNumber.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Type of Ambulance</label>
                        <input
                            type="text"
                            {...register("typeOfAmbulance")}
                            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.typeOfAmbulance && (
                            <p className="text-sm text-red-500">
                                {errors.typeOfAmbulance.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Equipment</label>
                        <input
                            type="text"
                            {...register("equipment")}
                            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.equipment && (
                            <p className="text-sm text-red-500">{errors.equipment.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Registered Hospital</label>
                        <input
                            type="text"
                            {...register("registeredHospital")}
                            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.registeredHospital && (
                            <p className="text-sm text-red-500">
                                {errors.registeredHospital.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">RC Copy Image</label>
                        <input
                            type="file"
                            {...register("rcCopy")}
                            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.rcCopy && (
                            <p className="text-sm text-red-500">{errors.rcCopy.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`w-full rounded px-4 py-2 text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="h-5 w-5 animate-spin text-white" /> : "Register Driver"}
                    </button>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertDialogComponent;
