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
import SkeletonLoader from '@/pages/common/SkeletonLoader';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface PatientCaseCardProps {
    withCard?: boolean;
}

const PatientCaseCard: React.FC<PatientCaseCardProps> = ({ withCard = true }) => {
    const { data: patientCases, error, isLoading } = usePatientCases();
    const { data: ambulances, isLoading: ambulancesLoading } = useAvailableAmbulances();
    const { mutate: assignAmbulance, isPending: assigning } = useAssignAmbulance();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDepartmentDialogOpen, setIsDepartmentDialogOpen] = useState(false);
    const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
    const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    if (isLoading) return <SkeletonLoader fullPage />;
    if (error instanceof Error) return <div className="text-center text-red-500">Error: {error.message}</div>;

    const filteredAmbulances = ambulances?.filter((ambulance) =>
        (ambulance.driverName?.toLowerCase() || '').includes(searchQuery) ||
        (ambulance.registrationNumber?.toLowerCase() || '').includes(searchQuery) ||
        (ambulance.typeOfAmbulance?.toLowerCase() || '').includes(searchQuery)
    );

    const content = (
        <>
            <PatientCaseList patientCases={patientCases || []} onOpenDialog={handleOpenDialog} />
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent className="max-w-5xl h-[700px] overflow-y-auto rounded-md">
                    <div className='flex items-center justify-between'>
                        <AlertDialogHeader>
                            <h2 className="text-2xl font-normal  ml-6 text-[#003CBF]">Ambulance Services</h2>
                        </AlertDialogHeader>
                        <div className='relative w-full md:w-96 shadow-[5px_5px_20px_0px_#61ABEB33] rounded-full md:ml-10'>
                            <Input
                                type="text"
                                placeholder="Search ambulances..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full border py-6  rounded-full pr-12 bg-white"
                            />
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#003CBF] p-3 rounded-full">
                                <Search className="text-white" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {ambulancesLoading ? (
                            <p>Loading ambulances...</p>
                        ) : (
                            <div className="grid grid-cols-3 gap-4">
                                {filteredAmbulances && filteredAmbulances.length > 0 ? (
                                    filteredAmbulances.map((ambulance) => (
                                        <AmbulanceCard
                                            key={ambulance.driverId}
                                            ambulance={ambulance}
                                            selectedDriverId={selectedDriverId}
                                            onClick={setSelectedDriverId}
                                        />
                                    ))
                                ) : (
                                    <p className="text-gray-600 col-span-full">No ambulances found.</p>
                                )}
                            </div>

                        )}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <Button onClick={() => setIsDialogOpen(false)} variant="primary" className=" w-52 py-5">
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            className="bg-[#013DBF] text-white w-52 py-5"
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
        </>
    );

    const cardPadding = withCard ? 'p-10' : 'px-14';

    return withCard ? (
        <Card className={`rounded-[38px] ${cardPadding}`}>{content}</Card>
    ) : (
        <div className={cardPadding}>{content}</div>
    );
};

export default PatientCaseCard;
