import { useState } from 'react';
import usePatientCases from '@/hooks/usePatientCases';
import useAvailableAmbulances from '@/hooks/useAvailableAmbulances';
import useAssignAmbulance from '@/hooks/useAssignAmbulance';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DepartmentDialog from './DepartmentDialog'; // Import the new component

const PatientCaseCard = () => {
    const { data: patientCases, error, isLoading } = usePatientCases();
    const { data: ambulances, isLoading: ambulancesLoading } = useAvailableAmbulances();
    const { mutate: assignAmbulance, isPending: assigning } = useAssignAmbulance();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDepartmentDialogOpen, setIsDepartmentDialogOpen] = useState(false);
    const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
    const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);

    const handleOpenDialog = (caseId: string) => {
        setSelectedCaseId(caseId);
        setIsDialogOpen(true);
    };

    const handleAssignAmbulance = () => {
        if (!selectedCaseId || !selectedDriverId) return;

        assignAmbulance(
            { caseId: selectedCaseId, driverId: selectedDriverId },
            {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    setSelectedCaseId(null);
                    setSelectedDriverId(null);
                    setIsDepartmentDialogOpen(true);
                },
            }
        );
    };

    if (isLoading) {
        return <div className="text-center">Loading patient cases...</div>;
    }

    if (error instanceof Error) {
        return <div className="text-center text-red-500">Error: {error.message}</div>;
    }

    return (
        <div className="space-y-4">
            {patientCases?.map((caseData) => (
                <div
                    key={caseData.emtCaseId}
                    className="p-4 border border-gray-200 rounded-lg shadow-lg relative"
                >
                    <h3 className="text-lg font-semibold text-gray-800">{caseData.patientName}</h3>
                    <p className="text-sm text-gray-600">Condition: {caseData.condition}</p>
                    <p className="text-sm text-gray-600">Address: {caseData.patientAddress}</p>
                    <p className="text-sm text-gray-600">Case Created At: {new Date(caseData.createdAt).toLocaleString()}</p>

                    {caseData.user && (
                        <div className="mt-4">
                            <h4 className="text-md font-semibold text-gray-700">Patient Details</h4>
                            <ul className="text-sm text-gray-600">
                                <li>Email: {caseData.user.email}</li>
                                <li>Phone: {caseData.user.mobileNumber}</li>
                                <li>Blood Group: {caseData.user.bloodGroup}</li>
                            </ul>
                        </div>
                    )}

                    <div className="mt-4">
                        <h4 className="text-md font-semibold text-gray-700">EMT Details</h4>
                        <ul className="text-sm text-gray-600">
                            <li>Name: {caseData.emt.emtName}</li>
                            <li>Mobile: {caseData.emt.emtMobileNumber}</li>
                            <li>Location: {caseData.emt.emtLocation || 'Not available'}</li>
                        </ul>
                    </div>

                    <Button
                        className="absolute bottom-4 right-4"
                        onClick={() => handleOpenDialog(caseData.emtCaseId)}
                    >
                        Assign Ambulance
                    </Button>
                </div>
            ))}

            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent className="max-w-4xl">
                    <AlertDialogHeader>
                        <h2 className="text-2xl font-normal mb-6 ml-6 text-[#003CBF]">Ambulance Services</h2>
                    </AlertDialogHeader>
                    <div className="space-y-4">
                        {ambulancesLoading ? (
                            <p>Loading ambulances...</p>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 overflow-y-auto">
                                {ambulances?.map((ambulance) => (
                                    <Card
                                        key={ambulance.driverId}
                                        className={`flex items-center p-3 mx-auto rounded-md w-80 h-[136px] border border-[#668EDB] cursor-pointer ${selectedDriverId === ambulance.driverId
                                            ? 'bg-white border-blue-500'
                                            : 'border-gray-200'
                                            }`}
                                        style={{ boxShadow: '5px 5px 20px 0px #013DC014' }}
                                        onClick={() => setSelectedDriverId(ambulance.driverId)}
                                    >
                                        <div className="w-24 h-24 bg-gray-200 border border-[#668EDB] flex-shrink-0 rounded-md overflow-hidden">
                                            {ambulance.ambulancePhoto ? (
                                                <img
                                                    src={ambulance.ambulancePhoto}
                                                    alt="Ambulance"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-4 flex flex-col gap-2">
                                            <span className="text-sm font-semibold text-gray-800">
                                                {ambulance.driverName}
                                            </span>
                                            <span className="text-sm text-gray-600">
                                                Ambulance No: {ambulance.registrationNumber || 'N/A'}
                                            </span>
                                            <span className="text-sm text-gray-600">
                                                Type: {ambulance.typeOfAmbulance || 'N/A'}
                                            </span>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <Button onClick={() => setIsDialogOpen(false)} variant="primary" className="w-44">
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            className="bg-[#013DBF] text-white w-44"
                            onClick={handleAssignAmbulance}
                            disabled={assigning || !selectedDriverId}
                        >
                            {assigning ? 'Assigning...' : 'Assign Ambulance'}
                        </Button>
                    </div>
                </AlertDialogContent>
            </AlertDialog>

            {/* Use the DepartmentDialog */}
            <DepartmentDialog
                isOpen={isDepartmentDialogOpen}
                onClose={() => setIsDepartmentDialogOpen(false)}
            />
        </div>
    );
};

export default PatientCaseCard;
