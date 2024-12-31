// components/PersonalDetailsCard.tsx
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface PersonalDetailsProps {
  patientName: string;
  patientAge: string;
  patientGender: string;
  phoneNumber1: string;
  meetLinks: {
    patientView?: string;
    emtView?: string;
  };
}

const PersonalDetailsCard = ({
  patientName,
  patientAge,
  patientGender,
  phoneNumber1,
  meetLinks,
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
        <div className="flex gap-4 mt-4">
          {meetLinks?.patientView && (
            <Button
              variant="secondary"
              onClick={() => window.open(meetLinks.patientView, "_blank")}
            >
              Patient Meet Link
            </Button>
          )}
          {meetLinks?.emtView && (
            <Button
              variant="secondary"
              onClick={() => window.open(meetLinks.emtView, "_blank")}
            >
              EMT Meet Link
            </Button>
          )}
        </div>
      </div>
    </div>
  </Card>
);

export default PersonalDetailsCard;
