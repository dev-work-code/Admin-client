// components/ChiefComplaintsCard.tsx
import { Card } from '@/components/ui/card';

interface ChiefComplaintsProps {
  caseHistoryChiefComplaints: string;
}

const ChiefComplaintsCard = ({ caseHistoryChiefComplaints }: ChiefComplaintsProps) => (
  <Card className="p-6 border border-gray-200 shadow-md lg:col-span-2">
    <h2 className="text-lg font-semibold mb-4">Chief Complaints</h2>
    <p className="text-sm text-[#979797] leading-6">
      {caseHistoryChiefComplaints || 'No complaints specified'}
    </p>
  </Card>
);

export default ChiefComplaintsCard;
