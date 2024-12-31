import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SelectedDepartmentsProps {
    selectedDepartments: string[];
    handleRemoveDepartment: (department: string) => void;
}

const SelectedDepartments: React.FC<SelectedDepartmentsProps> = ({ selectedDepartments, handleRemoveDepartment }) => {
    return (
        <div className="mb-4 mt-2 ml-3 text-gray-700">
            <div className="flex flex-wrap gap-2">
                {selectedDepartments.map((department) => (
                    <Badge
                        variant="secondary"
                        key={department}
                        className="bg-[#003CBF] text-white font-normal text-sm py-1 px-3 rounded-full flex items-center"
                    >
                        {department}
                        <button
                            onClick={() => handleRemoveDepartment(department)}
                            className="ml-2 text-red-500 text-sm"
                        >
                            ✕
                        </button>
                    </Badge>
                ))}
            </div>
        </div>
    );
};

export default SelectedDepartments;
