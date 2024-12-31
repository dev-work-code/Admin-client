import React from 'react';
import { Button } from '@/components/ui/button';

interface AssignHospitalButtonProps {
    handleAssignHospital: () => void;
    selectedHospital: any;
}

const AssignHospitalButton: React.FC<AssignHospitalButtonProps> = ({ handleAssignHospital, selectedHospital }) => {
    return (
        <Button
            variant="primary"
            onClick={handleAssignHospital}
            disabled={!selectedHospital}
            className="bg-[#013DBF] text-white font-normal w-40"
        >
            Assign Hospital
        </Button>
    );
};

export default AssignHospitalButton;
