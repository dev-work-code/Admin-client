// AmbulanceCard.tsx
import { Card } from '@/components/ui/card';

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
            <div className="w-24 h-24 bg-gray-200 border border-[#668EDB] flex-shrink-0 rounded-md overflow-hidden">
                {ambulance.ambulancePhoto ? (
                    <img
                        src={ambulance.ambulancePhoto}
                        alt="Ambulance"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                        No Image
                    </div>
                )}
            </div>
            <div className="ml-4 flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-800">
                    {ambulance.driverName}
                </span>
                <span className="text-sm text-gray-600 text-wrap">
                    Ambulance No: {ambulance.registrationNumber || 'N/A'}
                </span>
                <span className="text-sm text-gray-600">
                    Type: {ambulance.typeOfAmbulance || 'N/A'}
                </span>
            </div>
        </Card>
    );
};

export default AmbulanceCard;
