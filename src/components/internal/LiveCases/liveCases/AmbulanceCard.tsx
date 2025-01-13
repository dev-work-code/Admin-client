// AmbulanceCard.tsx
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface AmbulanceCardProps {
    ambulance: any;
    selectedDriverId: string | null;
    onClick: (driverId: string) => void;
}

const AmbulanceCard = ({ ambulance, selectedDriverId, onClick }: AmbulanceCardProps) => {
    return (
        <Card
            key={ambulance.driverId}
            className={`flex items-center p-3 mx-auto rounded-md w-80 h-[136px] border border-[#668EDB] cursor-pointer ${selectedDriverId === ambulance.driverId
                ? 'bg-white border-blue-500'
                : 'border-gray-200'
                }`}
            style={{ boxShadow: '5px 5px 20px 0px #013DC014' }}
            onClick={() => onClick(ambulance.driverId)}
        >
            <div className="w-24 h-24  border border-[#668EDB] flex-shrink-0 rounded-md overflow-hidden">
                {ambulance.ambulancePhoto ? (
                    <img
                        src={ambulance.ambulancePhoto}
                        alt="Ambulance"
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                        No Image
                    </div>
                )}
            </div>
            <div className="ml-4 flex flex-col gap-2">
                <div className='flex items-center gap-1'>
                    <Label className='text-[10px] text-[#95A0B8]'>
                        Driver Name-
                    </Label>
                    <p className="text-xs font-semibold text-gray-800">
                        {ambulance.driverName}
                    </p>
                </div>
                <div className='flex items-center gap-1'>
                    <Label className='text-[10px] text-[#95A0B8]'>
                        Ambulance no-
                    </Label>
                    <p className="text-xs font-semibold text-gray-800">
                        {ambulance.registrationNumber
                            ? (ambulance.registrationNumber.length > 10
                                ? `${ambulance.registrationNumber.slice(0, 10)}...`
                                : ambulance.registrationNumber)
                            : 'N/A'}
                    </p>
                </div>
                <div className='flex items-center gap-1'>
                    <Label className='text-[10px] text-[#95A0B8]'>
                        Ambulance Type -
                    </Label>
                    <p className="text-xs font-semibold text-gray-800">
                        {ambulance.typeOfAmbulance || 'N/A'}
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default AmbulanceCard;
