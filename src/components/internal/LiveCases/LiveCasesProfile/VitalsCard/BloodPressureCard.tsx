import { FC } from 'react';
import BloodIcon from '@/assets/BloodIcon.svg'; // Ensure the path is correct
import { Card } from '@/components/ui/card';

interface BloodPressureCardProps {
  bp: { vitals: { sp: number | string, dp: number | string }[] } | null;
}

const BloodPressureCard: FC<BloodPressureCardProps> = ({ bp }) => (
  <Card className="relative w-[138px] h-[138px] p-2 border-[#DECAFF] shadow-[0px_4px_10px_1px_#1846551A]">
    <div className='flex flex-col'>
      <span className='text-[#A9A9A9] font-normal text-sm'>Blood </span>
      <span className='text-[#A9A9A9] font-normal text-sm'>Pressure</span>
    </div>
    {bp ? (
      <p className="text-base font-normal">
        {bp.vitals[0]?.sp || 'N/A'}/ {bp.vitals[0]?.dp || 'N/A'}
      </p>
    ) : (
      <p className="text-sm text-[#013DC0]">Not available</p>
    )}

    {/* Dot at top-right corner */}
    <div className="absolute top-2 right-2 w-3 h-3 bg-[#FFE03A] rounded-full"></div>

    {/* Blood icon at bottom-right corner */}
    <div className="absolute bottom-0 right-0 mb-2 mr-2">
      <img src={BloodIcon} alt="bloodIcon" />
    </div>
  </Card>
);

export default BloodPressureCard;
