import { FC } from 'react';
import RespiratoryIcon from '@/assets/lungs.svg'; // Ensure the path is correct
import { Card } from '@/components/ui/card';

interface RespiratoryRateCardProps {
  respiratoryRate: string | null;
}

const RespiratoryRateCard: FC<RespiratoryRateCardProps> = ({ respiratoryRate }) => (
  <Card className="relative w-[138px] h-[138px] p-2 border-[#D5FFD0] shadow-[0px_4px_10px_1px_#1846551A]">
    <div className="flex flex-col">
      <span className="text-[#A9A9A9] font-normal text-sm">Respiratory</span>
      <span className="text-[#A9A9A9] font-normal text-sm">Rate</span>
    </div>
    {respiratoryRate ? (
      <p className="text-base font-normal">{respiratoryRate} breaths/min</p>
    ) : (
      <p className="text-sm text-[#013DC0]">Not available</p>
    )}

    {/* Dot at top-right corner */}
    <div className="absolute top-2 right-2 w-3 h-3 bg-[#DE3730] rounded-full"></div>

    {/* Respiratory Icon at bottom-right corner */}
    <div className="absolute bottom-0 right-0 mb-2 mr-2">
      <img src={RespiratoryIcon} alt="Respiratory Icon" />
    </div>
  </Card>
);

export default RespiratoryRateCard;
