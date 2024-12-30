import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { clearAuthCookies } from "@/utils/cookies";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface AdminProfile {
    adminId: string;
    adminName: string;
    adminEmail: string;
    adminMobileNumber: string;
    createdAt: string;
    updatedAt: string;
}

const Profile: React.FC = () => {
    const [profile, setProfile] = useState<AdminProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        adminName: "",
        adminEmail: "",
        adminMobileNumber: "",
        newPassword: "",
        confirmPassword: "", // New confirm password field
    });

    const [passwordError, setPasswordError] = useState(""); // To store password error
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get("/admin/profile");
                const data = response.data.data;
                setProfile(data);
                setFormData({
                    adminName: data.adminName,
                    adminEmail: data.adminEmail,
                    adminMobileNumber: data.adminMobileNumber,
                    newPassword: "", // Initialize new password field
                    confirmPassword: "", // Initialize confirm password field
                });
            } catch (err: any) {
                setError(
                    err.response?.data?.message || "An error occurred while fetching profile data."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        // Check if passwords match before submitting
        if (formData.newPassword !== formData.confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        try {
            const response = await api.patch("/admin/profile", {
                adminName: formData.adminName,
                adminEmail: formData.adminEmail,
                adminMobileNumber: formData.adminMobileNumber,
                adminPassword: formData.newPassword, // Include new password in the update request
            });

            // Use the message from the API response
            const successMessage = response.data.message || "Profile updated successfully!";

            // Display a success toast notification with dynamic message
            toast({
                description: successMessage,
                variant: "default",
                className: "bg-green-500 text-white",
            });

            setProfile((prev) => (prev ? { ...prev, ...formData } : null));
            setIsEditing(false);
            setPasswordError(""); // Clear password error if update is successful
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to update profile.");

            // Display an error toast notification
            toast({
                description: "Failed to update profile.",
                variant: "destructive",
            });
        }
    };

    const handleLogout = () => {
        clearAuthCookies();
        navigate("/login");
    };

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center mt-10">{error}</div>;
    }

    return (
        <div className="max-w-sm mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200 relative">
            <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setIsEditing(!isEditing)}>
                <Edit className="w-5 h-5 text-gray-500 hover:text-gray-800" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800 mb-4">Admin Profile</h1>
            {profile && (
                <div className="space-y-4">
                    <div>
                        <h2 className="text-gray-500 text-sm">Name</h2>
                        {isEditing ? (
                            <input
                                type="text"
                                name="adminName"
                                value={formData.adminName}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-800">{profile.adminName}</p>
                        )}
                    </div>
                    <div>
                        <h2 className="text-gray-500 text-sm">Email</h2>
                        {isEditing ? (
                            <input
                                type="email"
                                name="adminEmail"
                                value={formData.adminEmail}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-800">{profile.adminEmail}</p>
                        )}
                    </div>
                    <div>
                        <h2 className="text-gray-500 text-sm">Mobile Number</h2>
                        {isEditing ? (
                            <input
                                type="text"
                                name="adminMobileNumber"
                                value={formData.adminMobileNumber}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-800">{profile.adminMobileNumber}</p>
                        )}
                    </div>

                    {/* Show password fields only when editing */}
                    {isEditing && (
                        <>
                            <div>
                                <h2 className="text-gray-500 text-sm">New Password</h2>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <h2 className="text-gray-500 text-sm">Confirm Password</h2>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                />
                            </div>
                        </>
                    )}

                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                    <div className="mt-4 flex justify-end space-x-2">
                        {isEditing ? (
                            <>
                                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                                <Button variant="primary" onClick={handleSave}>
                                    Save
                                </Button>
                            </>
                        ) : (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive">Logout</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            You will be logged out of your account. This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
