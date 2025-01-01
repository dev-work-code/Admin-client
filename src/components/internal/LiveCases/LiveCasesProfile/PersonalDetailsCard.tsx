// components/PersonalDetailsCard.tsx
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface PersonalDetailsProps {
  patientName: string;
  patientAge: string;
  patientGender: string;
  phoneNumber1: string;
}

const PersonalDetailsCard = ({
  patientName,
  patientAge,
  patientGender,
  phoneNumber1,
}: PersonalDetailsProps) => (
  <Card className="p-6 border border-gray-200 shadow-md flex flex-col">
    <div className="flex items-center gap-4">
      <div className="flex flex-col space-y-2">
        <div>
          <Label>Patient Name</Label>
          <p className="text-sm text-[#013DC0]">{patientName || 'N/A'}</p>
        </div>
        <div>
          <Label>Age</Label>
          <p className="text-sm text-[#013DC0]">{patientAge || 'N/A'}</p>
        </div>
        <div>
          <Label>Gender</Label>
          <p className="text-sm text-[#013DC0]">{patientGender || 'N/A'}</p>
        </div>
        <div>
          <Label>Phone Number</Label>
          <p className="text-sm text-[#013DC0]">{phoneNumber1 || 'N/A'}</p>
        </div>
      </div>
    </div>
  </Card>
);

export default PersonalDetailsCard;
