import React, { useEffect, useState } from 'react';
import api from '@/utils/api';

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
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/admin/get-dashboard-stats');
                if (response.data.success) {
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

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Dashboard Stats</h1>
            <div className="flex flex-wrap gap-4 justify-center">
                {stats && (
                    <>
                        <StatCard title="Hospitals" count={stats.hospitals.total} />
                        <StatCard title="Ambulances" count={stats.ambulances.total} />
                        <StatCard title="Diagnostic Centers" count={stats.diagnosticCenters.total} />
                        <StatCard title="Blood Banks" count={stats.bloodBanks.total} />
                        <StatCard title="Pharmacies" count={stats.pharmacies.total} />
                        <StatCard title="Patients" count={stats.patients.total} />
                    </>
                )}
            </div>
        </div>
    );
};

interface StatCardProps {
    title: string;
    count: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, count }) => (
    <div className="relative bg-white shadow rounded-lg p-4 w-40 h-40">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="absolute bottom-2 right-2 text-3xl font-bold text-blue-500">{count}</p>
    </div>
);


export default Dashboard;
