// PatientCaseCard.tsx
import { useState, useCallback } from 'react';
import usePatientCases from '@/hooks/usePatientCases';
import useAvailableAmbulances from '@/hooks/useAvailableAmbulances';
import useAssignAmbulance from '@/hooks/useAssignAmbulance';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogContent, AlertDialogHeader } from '@/components/ui/alert-dialog';
import DepartmentDialog from './Dept&Assign-Hospital/DepartmentDialog';
import PatientCaseList from './liveCases/PatientCaseList';
import AmbulanceCard from './liveCases/AmbulanceCard';
import { Card } from '@/components/ui/card';

const PatientCaseCard = () => {
    const { data: patientCases, error, isLoading } = usePatientCases();
    const { data: ambulances, isLoading: ambulancesLoading } = useAvailableAmbulances();
    const { mutate: assignAmbulance, isPending: assigning } = useAssignAmbulance();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDepartmentDialogOpen, setIsDepartmentDialogOpen] = useState(false);
    const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
    const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);

    const handleOpenDialog = useCallback((caseId: string) => {
        setSelectedCaseId(caseId);
        setIsDialogOpen(true);
    }, []);

    const handleAssignAmbulance = useCallback(() => {
        if (!selectedCaseId || !selectedDriverId) return;
        assignAmbulance(
            { caseId: selectedCaseId, driverId: selectedDriverId },
            {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    setSelectedDriverId(null);
                    setIsDepartmentDialogOpen(true);
                },
            }
        );
    }, [assignAmbulance, selectedCaseId, selectedDriverId]);

    if (isLoading) return <div className="text-center">Loading patient cases...</div>;
    if (error instanceof Error) return <div className="text-center text-red-500">Error: {error.message}</div>;

    return (
        <Card className="p-8 rounded-[38px]">
            {/* Use the PatientCaseList component */}
            <PatientCaseList patientCases={patientCases || []} onOpenDialog={handleOpenDialog} />
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent className="max-w-4xl h-[600px] overflow-y-auto rounded-sm">
                    <AlertDialogHeader>
                        <h2 className="text-2xl font-normal mb-6 ml-6 text-[#003CBF]">Ambulance Services</h2>
                    </AlertDialogHeader>
                    <div className="space-y-4">
                        {ambulancesLoading ? (
                            <p>Loading ambulances...</p>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                {ambulances?.map((ambulance) => (
                                    <AmbulanceCard
                                        key={ambulance.driverId}
                                        ambulance={ambulance}
                                        selectedDriverId={selectedDriverId}
                                        onClick={setSelectedDriverId}
                                    />
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

            <DepartmentDialog
                isOpen={isDepartmentDialogOpen}
                onClose={() => setIsDepartmentDialogOpen(false)}
                caseId={selectedCaseId}
            />
        </Card>
    );
};

export default PatientCaseCard;
