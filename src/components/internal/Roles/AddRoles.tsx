import  { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/utils/api"; // Import the configured axios instance
import { toast } from "@/hooks/use-toast";

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
        <div className="max-w-lg mx-auto p-4 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Profile Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        id="name"
                        type="text"
                        {...register("name")}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        {...register("password")}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        id="phoneNumber"
                        type="text"
                        {...register("phoneNumber")}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                </div>

                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                        id="role"
                        {...register("role")}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="NURSING">NURSING</option>
                        <option value="ACCOUNTANT">ACCOUNTANT</option>
                        <option value="CLEANER">CLEANER</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                </div>

                <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                    <select
                        id="gender"
                        {...register("gender")}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>
                        <option value="OTHER">OTHER</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                </div>

                <div>
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                        id="dob"
                        type="date"
                        {...register("dob")}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
                </div>

                <div>
                    <label htmlFor="panCard" className="block text-sm font-medium text-gray-700">Pan Card</label>
                    <input
                        id="panCard"
                        type="text"
                        {...register("panCard")}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.panCard && <p className="text-red-500 text-sm">{errors.panCard.message}</p>}
                </div>

                <div>
                    <label htmlFor="aadharCard" className="block text-sm font-medium text-gray-700">Aadhar Card</label>
                    <input
                        id="aadharCard"
                        type="text"
                        {...register("aadharCard")}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.aadharCard && <p className="text-red-500 text-sm">{errors.aadharCard.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full mt-4 py-2 px-4 rounded-md text-white ${loading ? 'bg-gray-500' : 'bg-blue-500'} hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default AdRoleForm;

