"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

export interface JMPChartData {
    name: string;
    SafelyManaged: number;
    Basic: number;
    Limited: number;
    Unimproved: number;
    NoService: number; // Open Defecation or Surface Water
}

interface JMPServiceLadderProps {
    data: JMPChartData[];
    title?: string;
    noServiceLabel?: "Open Defecation" | "Surface Water";
}

export default function JMPServiceLadder({ data, title, noServiceLabel = "Surface Water" }: JMPServiceLadderProps) {
    // Dynamic height based on data length so it doesn't squash when all 16 regions are shown.
    const chartHeight = Math.max(350, data.length * 35 + 80);

    return (
        <div
            className="w-full bg-[#0B192C] border border-[#1A365D]/20 rounded-xl p-4 flex flex-col shrink-0"
            style={{ height: `${chartHeight}px` }}
        >
            {title && <h3 className="text-lg font-semibold text-white mb-2 shrink-0">{title}</h3>}
            <div className="flex-grow h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={data}
                        margin={{
                            top: 5,
                            right: 20,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
                        <XAxis type="number" hide domain={[0, 100]} />
                        <YAxis
                            dataKey="name"
                            type="category"
                            width={120}
                            tick={{ fill: '#9CA3AF', fontSize: 13 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6' }}
                            itemStyle={{ color: '#E5E7EB' }}
                            cursor={{ fill: '#374151', opacity: 0.4 }}
                            formatter={(value: any) => `${Number(value).toFixed(1)}%`}
                        />
                        <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "14px" }} />
                        <Bar dataKey="SafelyManaged" name="Safely Managed" stackId="a" fill="#10B981">
                            <LabelList dataKey="SafelyManaged" position="insideRight" formatter={(val: any) => val > 5 ? `${Math.round(val)}%` : ''} style={{ fill: 'white', fontSize: '11px', fontWeight: 'bold' }} />
                        </Bar>
                        <Bar dataKey="Basic" name="Basic" stackId="a" fill="#3B82F6">
                            <LabelList dataKey="Basic" position="insideRight" formatter={(val: any) => val > 5 ? `${Math.round(val)}%` : ''} style={{ fill: 'white', fontSize: '11px', fontWeight: 'bold' }} />
                        </Bar>
                        <Bar dataKey="Limited" name="Limited" stackId="a" fill="#F59E0B">
                            <LabelList dataKey="Limited" position="insideRight" formatter={(val: any) => val > 5 ? `${Math.round(val)}%` : ''} style={{ fill: 'white', fontSize: '11px', fontWeight: 'bold' }} />
                        </Bar>
                        <Bar dataKey="Unimproved" name="Unimproved" stackId="a" fill="#EF4444">
                            <LabelList dataKey="Unimproved" position="insideRight" formatter={(val: any) => val > 5 ? `${Math.round(val)}%` : ''} style={{ fill: 'white', fontSize: '11px', fontWeight: 'bold' }} />
                        </Bar>
                        <Bar dataKey="NoService" name={noServiceLabel} stackId="a" fill="#6B7280">
                            <LabelList dataKey="NoService" position="insideRight" formatter={(val: any) => val > 5 ? `${Math.round(val)}%` : ''} style={{ fill: 'white', fontSize: '11px', fontWeight: 'bold' }} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
