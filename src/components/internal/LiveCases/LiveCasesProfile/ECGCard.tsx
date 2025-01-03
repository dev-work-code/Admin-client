import { Card } from '@/components/ui/card';
import { LineChart, Line, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ECGCardProps {
    ecgData: { e: number; t: number }[];
}

const ECGCard = ({ ecgData }: ECGCardProps) => {
    const chartData = ecgData.map(({ t, e }) => ({
        time: new Date(t * 1000).toLocaleTimeString(),
        value: e,
    }));

    return (
        <Card className="p-6 border-none shadow-none border-gray-200 lg:col-span-2">
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#1D4ED8"
                        fill="rgba(29, 78, 216, 0.2)"
                        dot={false}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default ECGCard;
