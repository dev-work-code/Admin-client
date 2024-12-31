import { FC } from 'react';
import OxygenIcon from '@/assets/Spo2.svg'; // Ensure the path is correct
import { Card } from '@/components/ui/card';

interface SPO2CardProps {
    spo2: string | null;
}

const SPO2Card: FC<SPO2CardProps> = ({ spo2 }) => (
    <Card className="relative w-[138px] h-[138px] p-2 border-[#C6E3FB] shadow-[0px_4px_10px_1px_#1846551A]">
        <div className="flex flex-col">
            <span className="text-[#A9A9A9] font-normal text-sm">SPO2</span>
        </div>
        {spo2 ? (
            <p className="text-base font-normal">{spo2}</p>
        ) : (
            <p className="text-sm text-[#013DC0]">Not available</p>
        )}

        {/* Dot at top-right corner */}
        <div className="absolute top-2 right-2 w-3 h-3 bg-[#41CB68] rounded-full"></div>

        {/* Oxygen Icon at bottom-right corner */}
        <div className="absolute bottom-0 right-0 mb-2 mr-2">
            <img src={OxygenIcon} alt="Oxygen Icon" />
        </div>
    </Card>
);

export default SPO2Card;
