import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { setAuthCookies } from "@/utils/cookies";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react";

// Define the Zod schema for validation
const loginSchema = z.object({
    adminEmail: z.string().email("Invalid email address"),
    adminPassword: z.string().nonempty("Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;


const AdminLoginForm: React.FC = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await axios.post(
                "https://livapp.elitceler.com/api/v1/admin/login",
                data
            );

            const { token } = response.data.data;
            console.log(token);

            // Store token in cookies
            setAuthCookies({ token });

            toast({
                description: "Login successful!",
                variant: "default",
                className: "bg-green-500 text-white",
            });

            console.log("Login successful", response.data);
            reset();
            navigate("/");
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            const errorMessage =
                axiosError.response?.data?.message || "An error occurred during login.";

            toast({
                description: errorMessage,
                variant: "destructive",
            });

            console.error("Login failed", axiosError);
        }
    };

    return (
        <div className="max-w-xl mx-auto mb-8">
            <Card className="shadow-none border-none">
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
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

                        <div className="mt-4 w-full sm:w-96">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#013DC0] text-white py-6 px-4 rounded-md hover:bg-blue-700 font-bold"
                            >
                                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin text-white" /> : "Login"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminLoginForm;
