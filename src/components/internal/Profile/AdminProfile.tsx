import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { clearAuthCookies } from "@/utils/cookies";
import { Edit, LogOut } from "lucide-react";
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
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
                    err.response?.data?.message ||
                    "An error occurred while fetching profile data."
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
            const successMessage =
                response.data.message || "Profile updated successfully!";

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
        <Card className="max-w-2xl  mx-auto  mt-28 p-6 bg-white shadow-[2px_4px_5px_0px_#E9EBFFB2] rounded-[24px] border border-gray-200 relative">
            <div
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => setIsEditing(!isEditing)}
            >
                <Edit className="w-5 h-5 text-gray-500 hover:text-gray-800" />
            </div>
            <h1 className="text-xl font-semibold text-[#013DC0] mb-4">
                Admin Profile
            </h1>
            {profile && (
                <div className="space-y-8">
                    <div>
                        <h2 className="text-gray-500 text-sm">Name</h2>
                        {isEditing ? (
                            <Input
                                type="text"
                                name="adminName"
                                value={formData.adminName}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-none bg-[#E9F4FF]"
                            />
                        ) : (
                            <p className="text-gray-800">{profile.adminName}</p>
                        )}
                    </div>
                    <div>
                        <h2 className="text-gray-500 text-sm">Email</h2>
                        {isEditing ? (
                            <Input
                                type="email"
                                name="adminEmail"
                                value={formData.adminEmail}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-none bg-[#E9F4FF]"
                            />
                        ) : (
                            <p className="text-gray-800">{profile.adminEmail}</p>
                        )}
                    </div>
                    <div>
                        <h2 className="text-gray-500 text-sm">Mobile Number</h2>
                        {isEditing ? (
                            <Input
                                type="text"
                                name="adminMobileNumber"
                                value={formData.adminMobileNumber}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-none bg-[#E9F4FF]"
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
                                <Input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-none bg-[#E9F4FF]"
                                />
                            </div>
                            <div>
                                <h2 className="text-gray-500 text-sm">Confirm Password</h2>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-none bg-[#E9F4FF]"
                                />
                            </div>
                        </>
                    )}

                    {passwordError && (
                        <p className="text-red-500 text-sm">{passwordError}</p>
                    )}
                    <div className="mt-4 flex justify-end space-x-2">
                        {isEditing ? (
                            <>
                                <Button
                                    variant="secondary"
                                    onClick={() => setIsEditing(false)}
                                    className="w-44"
                                >
                                    Cancel
                                </Button>
                                <Button variant="primary" onClick={handleSave} className="w-44">
                                    Save
                                </Button>
                            </>
                        ) : (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant="destructive"
                                        className="w-44"
                                    >
                                        {" "}
                                        <LogOut /> Logout
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you sure you want to logout?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            You will be logged out of your account. This action cannot
                                            be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleLogout}>
                                            Logout
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                </div>
            )}
        </Card>
    );
};

export default Profile;
