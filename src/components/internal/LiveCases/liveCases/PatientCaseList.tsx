import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { PatientCase } from '@/hooks/usePatientCases';
import { MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PatientCaseListProps {
    patientCases: PatientCase[];
    onOpenDialog: (caseId: string) => void;
}

const PatientCaseList = ({ patientCases, onOpenDialog }: PatientCaseListProps) => {
    return (
        <div className="space-y-10">
            {patientCases.map((caseData) => (
                <Card
                    key={caseData.emtCaseId}
                    className="p-4 border border-gray-200 rounded-xl shadow-xl relative"
                >
                    <div className='flex items-center justify-between'>
                        <div>
                            <div className="grid grid-cols-3 gap-4">
                                {/* First Row */}
                                <div>
                                    <Label>Name</Label>
                                    <p className="text-sm text-[#013DC0] font-normal">
                                        {caseData.patientName || 'Unknown'}
                                    </p>
                                </div>
                                <div>
                                    <Label>Gender</Label>
                                    <p className="text-sm text-[#013DC0] font-normal">
                                        {caseData.patientGender || 'Not specified'}
                                    </p>
                                </div>
                                <div>
                                    <Label>Age</Label>
                                    <p className="text-sm text-[#013DC0] font-normal">
                                        {caseData.patientAge ? `${caseData.patientAge} years` : 'Unknown'}
                                    </p>
                                </div>

                                {/* Second Row */}
                                <div className='mt-2'>
                                    <Label>Blood Type</Label>
                                    <p className="text-sm text-[#013DC0] font-normal">
                                        {caseData.user?.bloodGroup || 'Unknown'}
                                    </p>
                                </div>
                                <div className="mt-2">
                                    <Label>Condition</Label>
                                    <p className="text-sm text-[#013DC0] font-normal">
                                        {caseData.condition || 'Not specified'}
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 mt-2'>
                                <div className="mt-4 flex gap-6">
                                    <span className="relative inline-flex items-center justify-center">
                                        <span className="absolute w-9 h-9 bg-[#E9F4FF] rounded-full"></span>
                                        <MapPin className="text-[#023FC2] z-10" />
                                    </span>

                                    <p className="text-sm mt-2 font-normal">
                                        {caseData.patientAddress || 'Address not available'}
                                    </p>
                                </div>
                                <div className="mt-4 flex gap-6">
                                    <span className="relative inline-flex items-center justify-center">
                                        <span className="absolute w-9 h-9 bg-[#E9F4FF] rounded-full"></span>
                                        <Phone className="text-[#023FC2] z-10" />
                                    </span>
                                    <div>
                                        <Label>Contact no.</Label>
                                        <p className="text-sm text-[#013DC0] font-normal">
                                            {caseData.phoneNumber1 || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Separator */}
                        <div className="h-40 border border-[#E9F4FF] mx-4"></div>
                        <div className="max-w-xl mb-[50px] flex flex-col mt-6">
                            <Label className='font-normal text-sm mb-4'>Chief Complaints</Label>
                            <p className="text-[11px]  leading-4 text-[#979797]">
                                {caseData.caseHistoryChiefComplaints || 'Not specified'}
                            </p>
                        </div>
                    </div>
                    {caseData.caseStatus === 'PENDING' && (
                        <Button
                            variant="primary"
                            className="absolute bottom-4 right-4 bg-[#023FC2] text-white w-72"
                            onClick={() => onOpenDialog(caseData.emtCaseId)}
                        >
                            Assign Ambulance
                        </Button>
                    )}

                    {caseData.caseStatus === 'ASSIGNED' && (
                        <Link to="/live-case-profile">
                            <Button variant="primary" className="absolute bottom-4 right-4 bg-[#023FC2] text-white w-72">View Details</Button>
                        </Link>
                    )}
                </Card>
            ))}
        </div>
    );
};

export default PatientCaseList;
