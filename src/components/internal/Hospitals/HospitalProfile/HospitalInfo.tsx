import React from "react";

interface Hospital {
    hospitalLocation: string;
    hospitalPhoneNumber: string;
    hospitalName: string;
    hospitalPhoto: string;
}

const HospitalInfo: React.FC<{ hospital: Hospital }> = ({ hospital }) => (
    <div className="top-0 z-10 bg-white p-4 border-b border-gray-300">
        <div className="flex gap-4">
            <img
                src={hospital.hospitalPhoto}
                alt={hospital.hospitalName}
                className="w-28 h-28 object-cover rounded-lg border border-[#6298FE]"
            />
            <div className="flex flex-col gap-2">
                <span className="font-medium text-base flex flex-row items-center gap-4">
                    Hospital Name: <p className="text-[#013DC0] font-medium">{hospital.hospitalName}</p>
                </span>
                <span className="font-medium text-base flex flex-row items-center gap-4">
                    Hospital Location: <p className="text-[#013DC0] font-medium">{hospital.hospitalLocation}</p>
                </span>
                <span className="font-medium text-base flex flex-row items-center gap-4">
                    Phone Number: <p className="text-[#013DC0] font-medium">{hospital.hospitalPhoneNumber}</p>
                </span>
            </div>
        </div>
    </div>
);

export default HospitalInfo;
