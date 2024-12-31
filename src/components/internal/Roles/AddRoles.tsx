import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/utils/api"; // Import the configured axios instance
import { toast } from "@/hooks/use-toast";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Define Zod schema for validation
const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }).min(1, { message: "Email is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    phoneNumber: z.string().min(10, { message: "Phone number must be 10 digits" }),
    role: z.enum(["NURSING", "ACCOUNTANT", "CLEANER"], { message: "Invalid role" }),
    gender: z.enum(["MALE", "FEMALE", "OTHER"], { message: "Invalid gender" }),
    dob: z.string().min(1, { message: "Date of birth is required" }),
    panCard: z.string().min(1, { message: "Pan Card is required" }),
    aadharCard: z.string().min(1, { message: "Aadhar Card is required" })
});

type FormData = z.infer<typeof schema>;

const AdRoleForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const [loading, setLoading] = useState(false); // Loading state for the submit button

    const onSubmit = async (data: FormData) => {
        console.log("Form submitted with data:", data);
        setLoading(true); // Set loading to true when submitting

        try {
            const response = await api.post("/admin/add-roles", data); // API call with Bearer token

            // Show success toast notification
            toast({
                description: response.data.message || "Operation successful!",
                variant: "default",
                className: "bg-green-500 text-white"
            });

            console.log("Success:", response.data);
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || "Something went wrong!";
            // Show error toast notification
            toast({
                description: errorMessage,
                variant: "destructive"
            });

            console.error("Error:", error);
        } finally {
            setLoading(false); // Reset loading state after submission
            reset(); // Reset form fields
        }
    };

    return (
        <Card className="max-w-5xl mx-auto p-4 border border-gray-300 rounded-[38px] mt-20  shadow-[2px_4px_5px_0px_#E9EBFFB2]">
            <CardHeader className="text-2xl font-medium mb-2 text-[#003CBF]">Role</CardHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <Label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        {...register("name")}
                        className="mt-1 block w-full border-none bg-[#E9F4FF] "
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="mt-1 block w-full border-none bg-[#E9F4FF] "
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                    <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        {...register("password")}
                        className="mt-1 block w-full border-none bg-[#E9F4FF] "
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div>
                    <Label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</Label>
                    <Input
                        id="phoneNumber"
                        type="text"
                        {...register("phoneNumber")}
                        className="mt-1 block w-full border-none bg-[#E9F4FF] "
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                </div>

                <div>
                    <Label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</Label>
                    <select
                        id="role"
                        {...register("role")}
                        className="mt-1 block w-full p-2 border bg-[#E9F4FF] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="NURSING">NURSING</option>
                        <option value="ACCOUNTANT">ACCOUNTANT</option>
                        <option value="CLEANER">CLEANER</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                </div>

                <div>
                    <Label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</Label>
                    <select
                        id="gender"
                        {...register("gender")}
                        className="mt-1 block w-full p-2 border bg-[#E9F4FF] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>
                        <option value="OTHER">OTHER</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                </div>

                <div>
                    <Label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</Label>
                    <Input
                        id="dob"
                        type="date"
                        {...register("dob")}
                        className="mt-1 block w-full border-none bg-[#E9F4FF] "
                    />
                    {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
                </div>

                <div>
                    <Label htmlFor="panCard" className="block text-sm font-medium text-gray-700">Pan Card</Label>
                    <Input
                        id="panCard"
                        type="text"
                        {...register("panCard")}
                        className="mt-1 block w-full border-none bg-[#E9F4FF] "
                    />
                    {errors.panCard && <p className="text-red-500 text-sm">{errors.panCard.message}</p>}
                </div>

                <div>
                    <Label htmlFor="aadharCard" className="block text-sm font-medium text-gray-700">Aadhar Card</Label>
                    <Input
                        id="aadharCard"
                        type="text"
                        {...register("aadharCard")}
                        className="mt-1 block w-full border-none bg-[#E9F4FF] "
                    />
                    {errors.aadharCard && <p className="text-red-500 text-sm">{errors.aadharCard.message}</p>}
                </div>

                <div className="relative top-24 left-4">
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                        className={`w-full mt-4 py-6 px-4  rounded-md text-white ${loading ? 'bg-gray-500' : 'bg-[#003CBF]'}`}
                    >
                        {loading ? <Loader2 className="h-5 w-5 animate-spin text-white" /> : "Submit"}
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default AdRoleForm;

