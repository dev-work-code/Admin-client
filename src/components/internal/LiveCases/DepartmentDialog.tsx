import React, { useState } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Assuming you have an Input component for the search bar

const departments = [
    'Internal Medicine',
    'Pediatrics',
    'Dermatology',
    'Cardiology',
    'Neurology',
    'Orthopaedics',
    'Neurosurgery',
    'General Surgery',
    'Gastroenterology',
    'Ophthalmology',
    'ENT',
    'Gynaecology',
    'Surgical Gastroenterology',
    'Pulmonology',
];

interface DepartmentDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const DepartmentDialog: React.FC<DepartmentDialogProps> = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

    const filteredDepartments = departments.filter(department =>
        department.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

    const handleApplySelection = () => {
        // Simply close the dialog without passing back the selected departments to the parent
        onClose();
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <h2 className="text-lg font-semibold">Select Departments</h2>
                </AlertDialogHeader>

                {/* Search Bar */}
                <div className="mb-4">
                    <Input
                        placeholder="Search Department"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Display selected departments */}
                {selectedDepartments.length > 0 && (
                    <div className="mb-4 text-gray-700">
                        <span className="font-semibold">Selected Departments: </span>
                        <div className="flex flex-wrap gap-2">
                            {selectedDepartments.map((department) => (
                                <span
                                    key={department}
                                    className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full flex items-center"
                                >
                                    {department}
                                    <button
                                        onClick={() => handleRemoveDepartment(department)}
                                        className="ml-2 text-red-500 text-sm"
                                    >
                                        ✕
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Grid of Departments */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {filteredDepartments.length > 0 ? (
                        filteredDepartments.map((department, index) => (
                            <div
                                key={index}
                                className={`w-full text-left ${selectedDepartments.includes(department) ? 'bg-blue-100' : ''}`}
                                onClick={() => handleDepartmentSelect(department)} // Handle department selection
                            >
                                <div className='border rounded-full'>
                                    {department}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No departments found.</p>
                    )}
                </div>

                <div className="mt-4 flex justify-between">
                    <Button onClick={onClose}>Close</Button>
                    <Button
                        onClick={handleApplySelection}
                        disabled={selectedDepartments.length === 0}
                        className="bg-blue-500 text-white"
                    >
                        Apply Selection
                    </Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DepartmentDialog;
