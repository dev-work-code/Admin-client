// components/AmbulanceDetailsCard.tsx
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface AmbulanceDetailsProps {
  ambulancePhoto: string | null;
  typeOfAmbulance: string;
  driverName: string;
  driverMobileNumber: string;
  registrationNumber: string;
}

const AmbulanceDetailsCard = ({
  ambulancePhoto,
  typeOfAmbulance,
  driverName,
  driverMobileNumber,
  registrationNumber,
}: AmbulanceDetailsProps) => (
  <Card className="p-6 border border-gray-200 shadow-md lg:col-span-2 flex flex-col">
    <div className="flex items-center gap-4">
      <div className="w-24 h-24 bg-gray-200 border border-[#668EDB] flex-shrink-0 rounded-md overflow-hidden">
        {ambulancePhoto ? (
          <img
            src={ambulancePhoto}
            alt="Ambulance"
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
          <Label>Ambulance Type</Label>
          <p className="text-sm text-[#013DC0]">{typeOfAmbulance || 'N/A'}</p>
        </div>
        <div>
          <Label>Driver Name</Label>
          <p className="text-sm text-[#013DC0]">{driverName || 'Unknown'}</p>
        </div>
        <div>
          <Label>Driver Contact</Label>
          <p className="text-sm text-[#013DC0]">{driverMobileNumber || 'N/A'}</p>
        </div>
        <div>
          <Label>Ambulance Registration No.</Label>
          <p className="text-sm text-[#013DC0]">{registrationNumber || 'N/A'}</p>
        </div>
      </div>
    </div>
  </Card>
);

export default AmbulanceDetailsCard;
