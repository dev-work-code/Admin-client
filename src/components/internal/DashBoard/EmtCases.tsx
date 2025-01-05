import React from 'react';
import { useQuery } from '@tanstack/react-query';
import SkeletonLoader from '@/pages/common/SkeletonLoader';
import { Card, CardTitle } from '@/components/ui/card';
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

  const { active, inactive } = data.data;

  const chartData = {
    labels: ['Total No. EMT Active', 'No. of  EMT Inactive'],
    datasets: [
      {
        data: [active.count, inactive.count],
        backgroundColor: ['#013DC0', '#E4ECF5'],
        hoverBackgroundColor: ['#45A049', '#E53935'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <Card className="p-4 md:p-8 w-[264px] h-[336px] shadow-[-8px_12px_18px_0px_#DADEE8]">
      <CardTitle className='-mx-4 -mt-4 text-[#013DC0]'>EMT</CardTitle>
      <div>
        <div className='h-64' >
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>
    </Card>
  );
};

export default Dashboard;
