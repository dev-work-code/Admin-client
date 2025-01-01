// components/AmbulanceDetailsCard.tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface AmbulanceDetailsProps {
  ambulancePhoto: string | null;
  typeOfAmbulance: string;
  driverName: string;
  driverMobileNumber: string;
  registrationNumber: string;
  meetLinks: {
    patientView?: string;
    emtView?: string;
  };
}

const AmbulanceDetailsCard = ({
  ambulancePhoto,
  typeOfAmbulance,
  driverName,
  driverMobileNumber,
  registrationNumber,
  meetLinks,
}: AmbulanceDetailsProps) => (
  <Card className="p-2 border border-gray-200 shadow-md lg:col-span-2 flex flex-row items-center gap-8">
    <div className="flex items-center gap-4">
      <div className="w-24 h-24 bg-gray-200 border border-[#668EDB] flex-shrink-0 rounded-md overflow-hidden">
        {ambulancePhoto ? (
          <img
            src={ambulancePhoto}
            alt="Ambulance"
            className="w-full h-full object-contain bg-white"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            No Image
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <Label className='mb-1 font-normal'>Ambulance Services</Label>
        <div className='flex flex-row  gap-2'>
          <Label className='text-xs text-[#95A0B8]'>Ambulance Type</Label>
          <p className="text-sm ">{typeOfAmbulance || 'N/A'}</p>
        </div>
        <div className='flex flex-row  gap-2'>
          <Label className='text-xs text-[#95A0B8]'>Driver Name</Label>
          <p className="text-sm ">{driverName || 'Unknown'}</p>
        </div>
        <div className='flex flex-row  gap-2'>
          <Label className='text-xs text-[#95A0B8]'>Driver Contact</Label>
          <p className="text-sm ">{driverMobileNumber || 'N/A'}</p>
        </div>
        <div className='flex flex-col gap-2'>
          <Label className='text-xs text-[#95A0B8]'>Ambulance Number.</Label>
          <p className="text-sm ">{registrationNumber || 'N/A'}</p>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-4">
      <Label className='mb-2 font-normal'>Ambulance Status </Label>
      <Button variant="primary" className='bg-[#E9F4FF] text-[#013DC0] border-none'>View in Maps</Button>
      <div className='flex  gap-4'>
        {meetLinks?.patientView && (
          <Button
            variant="primary"
            onClick={() => window.open(meetLinks.patientView, "_blank")}
            className='bg-[#CF1020] text-white border-none'
          >
            Patient Call Gmeet
          </Button>
        )}
        {meetLinks?.emtView && (
          <Button
            variant="primary"
            className='bg-[#CF1020] text-white border-none'
            onClick={() => window.open(meetLinks.emtView, "_blank")}
          >
            EMT Call Gmeet
          </Button>
        )}
      </div>
    </div>
  </Card>
);

export default AmbulanceDetailsCard;
