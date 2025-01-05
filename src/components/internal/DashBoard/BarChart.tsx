import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Card, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import SkeletonLoader from "@/pages/common/SkeletonLoader";

type AmbulanceStats = {
    day: string;
    activeAmbulances: number;
    inactiveAmbulances: number;
    repairAmbulances: number;
};

type ApiResponse = {
    success: boolean;
    data: {
        weeklyData: AmbulanceStats[];
        totalAmbulances: number;
    };
};

const chartConfig = {
    activeAmbulances: {
        label: "Active Ambulances",
        color: "#013DC0",
    },
    inactiveAmbulances: {
        label: "Inactive Ambulances",
        color: "#E9F4FF",
    },
    repairAmbulances: {
        label: "Repair Ambulances",
        color: "#E9ECEF",
    },
} satisfies ChartConfig;

const AmbulanceStatsChart: React.FC = () => {
    const [chartData, setChartData] = useState<AmbulanceStats[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [highlightedKey, setHighlightedKey] = useState<string | null>(null);

    useEffect(() => {
        api
            .get<ApiResponse>("/admin/get-ambulance-stats")
            .then((response) => {
                if (response.data.success) {
                    setChartData(response.data.data.weeklyData);
                } else {
                    setError("Failed to fetch data.");
                }
            })
            .catch(() => setError("An error occurred while fetching data."))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <SkeletonLoader />;
    }

    if (error) {
        return <div className="text-center text-red-500 py-10">{error}</div>;
    }

    if (!chartData) {
        return null;
    }

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHighlightedKey(event.target.value);
    };

    return (
        <Card className="shadow-[-8px_12px_18px_0px_#DADEE8]">
            <CardTitle className="text-[#013DC0] text-xl py-2 ml-8">Ambulances</CardTitle>
            <ChartContainer config={chartConfig} className="w-[769px] h-[265px] -ml-6 ">
                <BarChart
                    data={chartData}
                    width={600}
                    height={200}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="day" />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar
                        dataKey="activeAmbulances"
                        fill={highlightedKey === "activeAmbulances" ? "#012C8C" : "#013DC0"}
                        radius={4}
                    />
                    <Bar
                        dataKey="inactiveAmbulances"
                        fill={highlightedKey === "inactiveAmbulances" ? "#D0E8FF" : "#E9F4FF"}
                        radius={4}
                    />
                    <Bar
                        dataKey="repairAmbulances"
                        fill={highlightedKey === "repairAmbulances" ? "#C6C9CC" : "#E9ECEF"}
                        radius={4}
                    />
                </BarChart>
            </ChartContainer>
            <div className="text-center flex gap-4 justify-center -mt-2 mb-4">
                <div className="flex items-center">
                    <input
                        type="radio"
                        id="activeAmbulances"
                        name="ambulanceType"
                        value="activeAmbulances"
                        checked={highlightedKey === "activeAmbulances"}
                        onChange={handleRadioChange}
                        className="mr-2"
                    />
                    <Label htmlFor="activeAmbulances" className="mr-4 text-[#013DC0]">
                        Active Ambulances
                    </Label>
                </div>
                <div className="flex items-center">
                    <input
                        type="radio"
                        id="inactiveAmbulances"
                        name="ambulanceType"
                        value="inactiveAmbulances"
                        checked={highlightedKey === "inactiveAmbulances"}
                        onChange={handleRadioChange}
                        className="mr-2"
                    />
                    <Label htmlFor="inactiveAmbulances" className="mr-4 text-[#013DC0]">
                        Inactive Ambulances
                    </Label>
                </div>
                <div className="flex items-center">
                    <input
                        type="radio"
                        id="repairAmbulances"
                        name="ambulanceType"
                        value="repairAmbulances"
                        checked={highlightedKey === "repairAmbulances"}
                        onChange={handleRadioChange}
                        className="mr-2"
                    />
                    <Label htmlFor="repairAmbulances" className="mr-4 text-[#013DC0]">
                        Repair Ambulances
                    </Label>
                </div>
            </div>
        </Card>
    );
};

export default AmbulanceStatsChart;
