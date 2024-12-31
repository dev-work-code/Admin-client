import { FC } from "react";
import HeartRateVariabilityIcon from "@/assets/Heartsign.svg"; // Ensure the path is correct
import { Card } from "@/components/ui/card";

interface HeartRateVariabilityCardProps {
  hrv: string | null;
}

const HeartRateVariabilityCard: FC<HeartRateVariabilityCardProps> = ({
  hrv,
}) => (
  <Card className="relative w-[138px] h-[138px] p-2 border-[#D5FFFF] shadow-[0px_4px_10px_1px_#1846551A]">
    <div className="flex flex-col">
      <span className="text-[#A9A9A9] font-normal text-sm">Heart Rate</span>
      <span className="text-[#A9A9A9] font-normal text-sm">Variability</span>
    </div>
    {hrv ? (
      <p className="text-base font-normal">{hrv} ms</p>
    ) : (
      <p className="text-sm text-[#013DC0]">Not available</p>
    )}

    {/* Dot at top-right corner */}
    <div className="absolute top-2 right-2 w-3 h-3 bg-[#41CB68] rounded-full"></div>

    {/* HRV Icon at bottom-right corner */}
    <div className="absolute bottom-0 right-0 mb-2 mr-2">
      <img src={HeartRateVariabilityIcon} alt="HRV Icon" />
    </div>
  </Card>
);

export default HeartRateVariabilityCard;
