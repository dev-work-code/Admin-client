import React, { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import api from '@/utils/api';
import DepartmentSearch from './DepartmentSearch';
import SelectedDepartments from './SelectedDepartments';
import HospitalList from './HospitalList';
import AssignHospitalButton from './AssignHospitalButton';
import { departments } from '@/components/types/types';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DepartmentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    caseId: string | null;
}

const DepartmentDialog: React.FC<DepartmentDialogProps> = ({ isOpen, onClose, caseId }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [hospitals, setHospitals] = useState<any[]>([]); // State for fetched hospital data
    const [loading, setLoading] = useState(false);
    const [showHospitals, setShowHospitals] = useState(false); // State to toggle grid/hospital view
    const [selectedHospital, setSelectedHospital] = useState<any | null>(null); // Track selected hospital

    const filteredDepartments = departments.filter(department =>
        department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Fetch hospitals based on the selected departments
    const fetchHospitals = async () => {
        if (selectedDepartments.length === 0) return; // If no departments are selected, don't fetch hospitals
        setLoading(true);
        try {
            const response = await api.get('/admin/get-available-hospitals', {
                params: {
                    requiredServices: selectedDepartments.join(','),
                },
            });
            setHospitals(response.data.data.hospitals || []);
        } catch (error) {
            console.error('Error fetching hospitals:', error);
        } finally {
            setLoading(false);
        }
    };

    // Trigger the API call when selectedDepartments change
    useEffect(() => {
        if (selectedDepartments.length > 0) {
            fetchHospitals(); // Call the API when the departments change
        } else {
            setHospitals([]); // Clear hospitals if no departments are selected
        }
    }, [selectedDepartments]);

    // Assign selected hospital to the case
    const handleAssignHospital = async () => {
        if (!selectedHospital || !caseId) {
            toast({
                description: 'Please select a hospital before assigning.',
                variant: 'destructive',
                className: 'bg-red-500 text-white',
            });
            return;
        }
        setLoading(true); // Set loading state
        try {
            const response = await api.post('/admin/assign-hospital', {
                hospitalId: selectedHospital.hospitalId,
                caseId,
            });

            toast({
                description: response.data.message || 'Hospital assigned successfully!',
                variant: 'default',
                className: 'bg-green-500 text-white',
            });

            console.log('Success:', response.data);
            onClose(); // Close the dialog after assigning the hospital
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || 'Something went wrong!';
            toast({
                description: errorMessage,
                variant: 'destructive',
                className: 'bg-red-500 text-white',
            });

            console.error('Error:', error);
        } finally {
            setLoading(false); // Reset loading state after submission
        }
    };

    const handleDepartmentSelect = (department: string) => {
        setSelectedDepartments((prev) => {
            if (prev.includes(department)) {
                return prev.filter((dep) => dep !== department); // Remove if already selected
            }
            return [...prev, department]; // Add if not selected
        });
    };

    const handleRemoveDepartment = (department: string) => {
        setSelectedDepartments((prev) => prev.filter((dep) => dep !== department)); // Remove selected department
    };

    const handleSelectHospital = (hospital: any) => {
        setSelectedHospital(hospital); // Set the selected hospital
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className='rounded-xl max-w-2xl'>
                {!showHospitals ? (
                    <>
                        <DepartmentSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                        <SelectedDepartments
                            selectedDepartments={selectedDepartments}
                            handleRemoveDepartment={handleRemoveDepartment}
                        />
                        <span className="font-semibold text-[#013DC0] text-base ml-2">Departments </span>
                        <div className="flex flex-wrap gap-1">
                            {filteredDepartments.length > 0 ? (
                                filteredDepartments.map((department, index) => (
                                    <div
                                        key={index}
                                        className={`cursor-pointer ${selectedDepartments.includes(department) ? 'bg-blue-10' : ''
                                            }`}
                                        onClick={() => handleDepartmentSelect(department)}
                                    >
                                        <Badge className="mb-2" variant="primary">
                                            {department} <span className='ml-1'>+</span>
                                        </Badge>
                                    </div>
                                ))
                            ) : (
                                <p>No departments found.</p>
                            )}
                        </div>

                        <div className="mt-4 flex justify-end">
                            <Button
                                variant="primary"
                                onClick={() => setShowHospitals(true)} // Switch to hospital view
                                disabled={selectedDepartments.length === 0}
                                className="bg-[#013DBF] text-white w-40 py-5"
                            >
                                View Doctor
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <DepartmentSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                        <SelectedDepartments
                            selectedDepartments={selectedDepartments}
                            handleRemoveDepartment={handleRemoveDepartment}
                        />
                        <HospitalList
                            hospitals={hospitals}
                            selectedHospital={selectedHospital}
                            handleSelectHospital={handleSelectHospital}
                            searchQuery={searchQuery}
                            loading={loading}
                        />

                        <div className="mt-4 flex justify-between">
                            <Button variant="primary" onClick={() => setShowHospitals(false)} className='px-4 w-40'>
                                Back
                            </Button>
                            <AssignHospitalButton
                                handleAssignHospital={handleAssignHospital}
                                selectedHospital={selectedHospital}
                            />
                        </div>
                    </>
                )}
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DepartmentDialog;
