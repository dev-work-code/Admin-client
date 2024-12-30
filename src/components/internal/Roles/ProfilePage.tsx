import React from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const ProfilePage: React.FC = () => {
    const location = useLocation();
    const { profile } = location.state || {};

    if (!profile) {
        return <p className="text-center text-red-500">Profile data not available.</p>;
    }

    return (
        <Card className="p-6 space-y-4 max-w-5xl mx-auto shadow-[2px_4px_5px_0px_#E9EBFFB2] rounded-[38px] border border-gray-300 bg-white">
            <CardHeader className="text-2xl font-medium mb-6 ml-6 text-[#003CBF]">Role</CardHeader>
            <CardContent
                className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label>Name</Label>
                    <Card className="border-none shadow-none rounded-lg p-2  bg-[#E9F4FF] text-[#013DC0] font-normal text-base">
                        {profile.name || "N/A"}
                    </Card>
                </div>
                <div>
                    <Label>Role</Label>
                    <Card className="border-none shadow-none rounded-lg p-2  bg-[#E9F4FF] text-[#013DC0] font-normal text-base">
                        {profile.role || "N/A"}
                    </Card>
                </div>
                <div>
                    <Label>Phone Number</Label>
                    <Card className="border-none shadow-none rounded-lg p-2  bg-[#E9F4FF] text-[#013DC0] font-normal text-base">
                        {profile.phoneNumber || "N/A"}
                    </Card>
                </div>
                <div>
                    <Label>Admin ID</Label>
                    <Card className="border-none shadow-none rounded-lg p-2  bg-[#E9F4FF] text-[#013DC0] font-normal text-base">
                        {profile.adminId || "N/A"}
                    </Card>
                </div>
                <div>
                    <Label>Email</Label>
                    <Card className="border-none shadow-none rounded-lg p-2  bg-[#E9F4FF] text-[#013DC0] font-normal text-base">
                        {profile.adminEmail || "N/A"}
                    </Card>
                </div>
                <div>
                    <Label>Phone Number</Label>
                    <Card className="border-none shadow-none rounded-lg p-2  bg-[#E9F4FF] text-[#013DC0] font-normal text-base">
                        {profile.phoneNumber || "N/A"}
                    </Card>
                </div>
                <div>
                    <Label>Date of Birth</Label>
                    <Card className="border-none shadow-none rounded-lg p-2  bg-[#E9F4FF] text-[#013DC0] font-normal text-base">
                        {profile.dob ? new Date(profile.dob).toLocaleDateString() : "N/A"}
                    </Card>
                </div>
                <div>
                    <Label>PAN Card</Label>
                    <Card className="border-none shadow-none rounded-lg p-2  bg-[#E9F4FF] text-[#013DC0] font-normal text-base">
                        {profile.panCard || "N/A"}
                    </Card>
                </div>
                <div>
                    <Label>Aadhar Card</Label>
                    <Card className="border-none shadow-none rounded-lg p-2  bg-[#E9F4FF] text-[#013DC0] font-normal text-base">
                        {profile.aadharCard || "N/A"}
                    </Card>
                </div>
                <div>
                    <Label>Gender</Label>
                    <Card className="border-none shadow-none rounded-lg p-2  bg-[#E9F4FF] text-[#013DC0] font-normal text-base">
                        {profile.gender || "N/A"}
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProfilePage;