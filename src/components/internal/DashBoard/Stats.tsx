import React, { useEffect, useState } from 'react';
import api from '@/utils/api';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface DashboardStats {
    hospitals: { total: number };
    ambulances: { total: number };
    diagnosticCenters: { total: number };
    bloodBanks: { total: number };
    pharmacies: { total: number };
    patients: { total: number };
}

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [previousStats, setPreviousStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/admin/get-dashboard-stats');
                if (response.data.success) {
                    // Update previous stats before setting new stats
                    setPreviousStats(stats);
                    setStats(response.data.data.stats);
                } else {
                    setError('Failed to fetch stats.');
                }
            } catch (err) {
                setError('An error occurred while fetching stats.');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    // Helper function to calculate the trend
    const getTrend = (current: number, previous?: number) => {
        if (previous === undefined) return 'up'; // Default to 'up' if no previous data
        return current > previous ? 'up' : 'down';
    };

    return (
        <div className="p-6">
            <div className="flex flex-wrap gap-4 justify-center">
                {stats && (
                    <>
                        <StatCard
                            title="Total Registered Hospitals"
                            count={stats.hospitals.total}
                            trend={getTrend(stats.hospitals.total, previousStats?.hospitals.total)}
                        />
                        <StatCard
                            title="Total Registered Ambulance"
                            count={stats.ambulances.total}
                            trend={getTrend(stats.ambulances.total, previousStats?.ambulances.total)}
                        />
                        <StatCard
                            title="Total Registered Diagnostic center"
                            count={stats.diagnosticCenters.total}
                            trend={getTrend(
                                stats.diagnosticCenters.total,
                                previousStats?.diagnosticCenters.total
                            )}
                        />
                        <StatCard
                            title="Total Registered Blood Bank"
                            count={stats.bloodBanks.total}
                            trend={getTrend(stats.bloodBanks.total, previousStats?.bloodBanks.total)}
                        />
                        <StatCard
                            title="Total Registered Pharmacy"
                            count={stats.pharmacies.total}
                            trend={getTrend(stats.pharmacies.total, previousStats?.pharmacies.total)}
                        />
                        <StatCard
                            title="Total Registered Patients"
                            count={stats.patients.total}
                            trend={getTrend(stats.patients.total, previousStats?.patients.total)}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

interface StatCardProps {
    title: string;
    count: number;
    trend: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ title, count, trend }) => {
    const arrowBackground = trend === 'up' ? '#EAFFDF' : '#FFE8E7';

    return (
        <Card className="relative border border-[#E9F4FF] shadow-[_0px_4px_10px_1px)_#1846551A] rounded-[12px] p-4 w-40 h-40">
            <h2 className=" absolute top-2 left-2 text-sm font-semibold mb-2 text-[#A9A9A9]">{title}</h2>
            <p className="absolute bottom-2 right-2 text-2xl font-medium text-[#013DC0]">{count}</p>
            <div
                className="absolute bottom-2 left-2 rounded-full p-2"
                style={{ backgroundColor: arrowBackground }}
            >
                {trend === 'up' ? (
                    <TrendingUp className="text-green-500" />
                ) : (
                    <TrendingDown className="text-red-500" />
                )}
            </div>
        </Card>
    );
};

export default Dashboard;
