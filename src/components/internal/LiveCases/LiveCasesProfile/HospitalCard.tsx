// components/HospitalDetailsCard.tsx
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface HospitalDetailsProps {
  hospitalPhoto: string | null;
  hospitalName: string;
  hospitalLocation: string;
  hospitalWorkingHours: string;
}

const HospitalDetailsCard = ({
  hospitalPhoto,
  hospitalName,
  hospitalLocation,
  hospitalWorkingHours,
}: HospitalDetailsProps) => (
  <Card className="p-6 border border-gray-200 shadow-md flex flex-col">
    <div className="flex items-center gap-4">
      <div className="w-24 h-24 bg-gray-200 border border-[#668EDB] flex-shrink-0 rounded-md overflow-hidden">
        {hospitalPhoto ? (
          <img
            src={hospitalPhoto}
            alt="Hospital"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            No Image
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <div>
          <Label>Hospital Name</Label>
          <p className="text-sm text-[#013DC0]">{hospitalName || 'N/A'}</p>
        </div>
        <div>
          <Label>Location</Label>
          <p className="text-sm text-[#013DC0]">{hospitalLocation || 'N/A'}</p>
        </div>
        <div>
          <Label>Working Hours</Label>
          <p className="text-sm text-[#013DC0]">{hospitalWorkingHours || 'N/A'}</p>
        </div>
      </div>
    </div>
  </Card>
);

export default HospitalDetailsCard;
