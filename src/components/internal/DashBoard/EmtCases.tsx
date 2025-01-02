import React from 'react';
import { useQuery } from '@tanstack/react-query';
import SkeletonLoader from '@/pages/common/SkeletonLoader';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Doughnut } from 'react-chartjs-2';
import api from '@/utils/api';
import 'chart.js/auto';

const Dashboard: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['emtStats'],
    queryFn: async () => {
      const response = await api.get('/admin/get-emt-stats');
      return response.data;
    },
  });

  if (isLoading) return <SkeletonLoader />;

  if (isError || !data?.success) {
    toast({
      title: 'Error',
      description: 'Failed to fetch dashboard data.',
      variant: 'destructive',
    });
    return <div className="text-red-500">Error loading dashboard data.</div>;
  }

  const { total, active, inactive } = data.data;

  const chartData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        data: [active.count, inactive.count],
        backgroundColor: ['#4CAF50', '#F44336'],
        hoverBackgroundColor: ['#45A049', '#E53935'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Card className="p-6 shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <Label>Total EMTs</Label>
            <p className="text-xl font-semibold">{total}</p>
          </div>
          <div className="w-full h-64 md:w-1/2">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
