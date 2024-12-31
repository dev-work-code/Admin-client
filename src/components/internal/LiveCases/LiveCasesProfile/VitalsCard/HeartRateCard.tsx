import { FC } from 'react';
import HeartIcon from '@/assets/HeartRate.svg'; // Ensure the path is correct
import { Card } from '@/components/ui/card';

interface HeartRateCardProps {
  heartRate: string | null;
}

const HeartRateCard: FC<HeartRateCardProps> = ({ heartRate }) => (
  <Card className="relative w-[138px] h-[138px] p-2 border-[#FDCDCB] shadow-[0px_4px_10px_1px_#1846551A]">
    <div className="flex flex-col">
      <span className="text-[#A9A9A9] font-normal text-sm">Heart</span>
      <span className="text-[#A9A9A9] font-normal text-sm">Rate</span>
    </div>
    {heartRate ? (
      <p className="text-base font-normal">{heartRate}</p>
    ) : (
      <p className="text-sm text-[#013DC0]">Not available</p>
    )}

    {/* Dot at top-right corner */}
    <div className="absolute top-2 right-2 w-3 h-3 bg-[#DE3730] rounded-full"></div>

    {/* Heart Icon at bottom-right corner */}
    <div className="absolute bottom-0 right-0 mb-2 mr-2">
      <img src={HeartIcon} alt="Heart Icon" />
    </div>
  </Card>
);

export default HeartRateCard;
