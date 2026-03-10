"use client";

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export interface PieChartData {
    name: string;
    value: number;
}

interface MetricPieChartProps {
    data: PieChartData[];
    title?: string;
    theme?: "water" | "sanitation" | "hygiene";
}

const WATER_COLORS = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#E0F2FE']; // Blue
const SANITATION_COLORS = ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0', '#D1FAE5']; // Emerald
const HYGIENE_COLORS = ['#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE', '#E0E7FF']; // Indigo

export default function MetricPieChart({ data, title, theme = "water" }: MetricPieChartProps) {

    let colors = WATER_COLORS;
    if (theme === "sanitation") colors = SANITATION_COLORS;
    if (theme === "hygiene") colors = HYGIENE_COLORS;

    return (
        <div className="w-full h-[380px] bg-[#0B192C] border border-[#1A365D]/20 rounded-xl p-4 flex flex-col shrink-0">
            {title && <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>}
            <div className="flex-grow w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="none"
                            labelLine={false}
                            label={(props: any) => {
                                const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
                                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                                const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

                                return percent > 0.05 ? (
                                    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold shadow-sm">
                                        {`${(percent * 100).toFixed(0)}%`}
                                    </text>
                                ) : null;
                            }}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6', borderRadius: '8px' }}
                            itemStyle={{ color: '#E5E7EB' }}
                            formatter={(value: any) => `${Number(value).toFixed(1)}%`}
                        />
                        <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: "14px", color: "#9CA3AF" }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
