import { FC } from 'react';
import TemperatureIcon from '@/assets/TempratureIcon.svg'; // Ensure the path is correct
import { Card } from '@/components/ui/card';

interface BodyTemperatureCardProps {
  bodyTemp: string | null;
}

const BodyTemperatureCard: FC<BodyTemperatureCardProps> = ({ bodyTemp }) => (
  <Card className="relative w-[138px] h-[138px] p-2 border-[#FBE2B5] shadow-[0px_4px_10px_1px_#1846551A]">
    <div className="flex flex-col">
      <span className="text-[#A9A9A9] font-normal text-sm">Body</span>
      <span className="text-[#A9A9A9] font-normal text-sm">Temperature</span>
    </div>
    {bodyTemp ? (
      <p className="text-base font-normal">{bodyTemp}°C</p>
    ) : (
      <p className="text-sm text-[#013DC0]">Not available</p>
    )}

    {/* Dot at top-right corner */}
    <div className="absolute top-2 right-2 w-3 h-3 bg-[#FFE03A] rounded-full"></div>

    {/* Temperature Icon at bottom-right corner */}
    <div className="absolute bottom-0 right-0 mb-2 mr-2">
      <img src={TemperatureIcon} alt="Temperature Icon" />
    </div>
  </Card>
);

export default BodyTemperatureCard;
