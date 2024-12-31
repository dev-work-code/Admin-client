import { Card } from '@/components/ui/card';
import React from 'react';

interface Hospital {
    hospitalPhoto: string;
    hospitalId: string;
    hospitalName: string;
    hospitalLocation: string;
    hospitalPhoneNumber: string;
}

interface HospitalListProps {
    hospitals: Hospital[];
    selectedHospital: Hospital | null;
    handleSelectHospital: (hospital: Hospital) => void;
    searchQuery: string;
    loading: boolean;
}

const HospitalList: React.FC<HospitalListProps> = ({
    hospitals,
    selectedHospital,
    handleSelectHospital,
    searchQuery,
    loading,
}) => {
    return (
        <div className="mt-2">
            {loading ? (
                <p>Loading...</p>
            ) : hospitals.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                    {hospitals
                        .filter((hospital) =>
                            hospital.hospitalName.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((hospital) => (
                            <Card
                                key={hospital.hospitalId}
                                onClick={() => handleSelectHospital(hospital)}
                                className={`cursor-pointer p-2 shadow-xl rounded-lg ${selectedHospital?.hospitalId === hospital.hospitalId
                                    ? 'border border-[#003CBF]'
                                    : 'border'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <img
                                        src={hospital.hospitalPhoto}
                                        alt={`${hospital.hospitalName} photo`}
                                        className="w-24 h-24 object-cover rounded-md mr-4"
                                    />
                                    <div className="flex flex-col">
                                        <p className="font-semibold">{hospital.hospitalName}</p>
                                        <p className='text-xs'>{hospital.hospitalLocation}</p>
                                        <p>{hospital.hospitalPhoneNumber}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                </div>
            ) : (
                <p>No hospitals available for the selected departments.</p>
            )}
        </div>
    );
};

export default HospitalList;
