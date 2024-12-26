import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


// Define the Zod schema for validation
const adminSchema = z.object({
    adminName: z.string().nonempty("Admin name is required"),
    adminEmail: z.string().email("Invalid email address"),
    adminPassword: z
        .string()
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
    adminMobileNumber: z
        .string()
        .regex(/^\+\d{11,14}$/, "Invalid mobile number format. Example: +919191919191"),
});

type AdminFormData = z.infer<typeof adminSchema>;

const AdminRegisterForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AdminFormData>({
        resolver: zodResolver(adminSchema),
    });

    const onSubmit = async (data: AdminFormData) => {
        try {
            const response = await axios.post(
                "https://livapp.elitceler.com/api/v1/admin/register",
                data
            );

            toast({
                title: "Success",
                description: response.data.message || "Registration successful!",
                variant: "default",
                className: "bg-green-500 text-white",
            });

            console.log("Registration successful", response.data);
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            const errorMessage =
                axiosError.response?.data?.message || "An error occurred during registration.";

            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });

            console.error("Registration failed", axiosError);
        }
    };

    return (
        <div className="max-w-xl mx-auto mb-8">
            <Card >
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-medium text-[#013DC0]">Admin Registration</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
                        <div className="grid gap-2 w-full sm:w-96">
                            <Label htmlFor="adminName">Admin Name</Label>
                            <Input
                                type="text"
                                id="adminName"
                                {...register("adminName")}
                                className="bg-[#E9F4FF]"
                            />
                            {errors.adminName && (
                                <p className="text-red-500 text-sm">{errors.adminName.message}</p>
                            )}
                        </div>

                        <div className="grid gap-2 w-full sm:w-96">
                            <Label htmlFor="adminEmail">Admin Email</Label>
                            <Input
                                type="email"
                                id="adminEmail"
                                {...register("adminEmail")}
                                className="bg-[#E9F4FF]"
                            />
                            {errors.adminEmail && (
                                <p className="text-red-500 text-sm">{errors.adminEmail.message}</p>
                            )}
                        </div>

                        <div className="grid gap-2 w-full sm:w-96">
                            <Label htmlFor="adminPassword">Admin Password</Label>
                            <Input
                                type="password"
                                id="adminPassword"
                                {...register("adminPassword")}
                                className="bg-[#E9F4FF]"
                            />
                            {errors.adminPassword && (
                                <p className="text-red-500 text-sm">{errors.adminPassword.message}</p>
                            )}
                        </div>

                        <div className="grid gap-2 w-full sm:w-96">
                            <Label htmlFor="adminMobileNumber">Admin Mobile Number</Label>
                            <Input
                                type="text"
                                id="adminMobileNumber"
                                {...register("adminMobileNumber")}
                                className="bg-[#E9F4FF]"
                            />
                            {errors.adminMobileNumber && (
                                <p className="text-red-500 text-sm">{errors.adminMobileNumber.message}</p>
                            )}
                        </div>

                        <div className="mt-4 w-full sm:w-96">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#013DC0] text-white py-6 px-4 rounded-md hover:bg-blue-700"
                            >
                                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin text-white" /> : "Register"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminRegisterForm;
