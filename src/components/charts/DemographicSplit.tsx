"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

export interface DemographicSplitData {
    name: string;
    Urban: number;
    Rural: number;
}

interface DemographicSplitProps {
    data: DemographicSplitData[];
    title?: string;
    dataKey1?: string;
    dataKey2?: string;
}

export default function DemographicSplit({
    data,
    title,
    dataKey1 = "Urban",
    dataKey2 = "Rural"
}: DemographicSplitProps) {
    return (
        <div className="w-full h-[380px] bg-[#0B192C] border border-[#1A365D]/20 rounded-xl p-4 flex flex-col shrink-0">
            {title && <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>}
            <div className="flex-grow w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 10,
                            left: -20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                        <XAxis
                            dataKey="name"
                            tick={{ fill: '#9CA3AF', fontSize: 13 }}
                            axisLine={{ stroke: '#374151' }}
                            tickLine={false}
                        />
                        <YAxis
                            domain={[0, 100]}
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
                        <Legend wrapperStyle={{ paddingTop: "20px", fontSize: "14px" }} />
                        <Bar dataKey={dataKey1} fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={30}>
                            <LabelList dataKey={dataKey1} position="top" formatter={(val: any) => `${Math.round(val)}%`} style={{ fill: '#E5E7EB', fontSize: '11px' }} />
                        </Bar>
                        <Bar dataKey={dataKey2} fill="#F43F5E" radius={[4, 4, 0, 0]} barSize={30}>
                            <LabelList dataKey={dataKey2} position="top" formatter={(val: any) => `${Math.round(val)}%`} style={{ fill: '#E5E7EB', fontSize: '11px' }} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
