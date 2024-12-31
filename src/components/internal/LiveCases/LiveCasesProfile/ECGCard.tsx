// components/ECGCard.tsx
import { Card } from '@/components/ui/card';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

interface ECGCardProps {
    ecgData: { e: number; t: number }[];
}

const ECGCard = ({ ecgData }: ECGCardProps) => {
    const ecgLabels = ecgData?.map((point) => new Date(point.t * 1000).toLocaleTimeString());
    const ecgValues = ecgData?.map((point) => point.e);

    // Chart.js Data Configuration
    const ecgChartData: ChartData<'line'> = {
        labels: ecgLabels,
        datasets: [
            {
                label: 'ECG Signal',
                data: ecgValues,
                borderColor: '#E9F4FF',
                backgroundColor: 'rgba(1, 61, 192, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    // Chart.js Options Configuration
    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: { display: true },
            tooltip: { mode: 'index' },
        },
        scales: {
            x: {
                type: 'category', // Make sure to use 'category' for time-based or categorical data
            },
            y: {
                type: 'linear', // Use linear scale for the y-axis in line charts
                beginAtZero: true,
            },
        },
    };

    return (
        <Card className="p-6 border-none shadow-none border-gray-200  lg:col-span-2">
            <Line data={ecgChartData} options={options} />
        </Card>
    );
};

export default ECGCard;
