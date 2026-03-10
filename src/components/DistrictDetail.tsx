"use client";

type LiveData = {
    spatialId: string;
    name: string;
    level: string;
    parentId: string | null;
    compositeScore: number;
    waterScore: number;
    sanitationScore: number;
    hygieneScore: number;
    waterData?: any;
    sanitationData?: any;
    hygieneData?: any;
};

type DistrictDetailProps = {
    districtName: string;
    computedData: LiveData[];
    variant?: "composite" | "water" | "sanitation" | "hygiene";
};

function colorScale(score: number): string {
    if (score <= 25) return "#ef4444";
    if (score <= 50) return "#f97316";
    if (score <= 70) return "#eab308";
    if (score <= 89) return "#3b82f6";
    return "#10b981";
}

function label(score: number): string {
    if (score <= 25) return "Critical";
    if (score <= 50) return "At Risk";
    if (score <= 70) return "Basic";
    if (score <= 89) return "Good";
    return "Safely Managed";
}

export function DistrictDetail({ districtName, computedData, variant = "composite" }: DistrictDetailProps) {
    const data = computedData.find(d => d.name === districtName && d.level === "district");
    if (!data) {
        return (
            <div className="flex h-full items-center justify-center text-sm text-slate-500">
                No data available for this district.
            </div>
        );
    }

    const scores = [
        { key: "composite", label: "Composite WASH Index", value: data.compositeScore, icon: "🏠" },
        { key: "water", label: "Water Sub-Index", value: data.waterScore, icon: "💧" },
        { key: "sanitation", label: "Sanitation Sub-Index", value: data.sanitationScore, icon: "🚽" },
        { key: "hygiene", label: "Hygiene Sub-Index", value: data.hygieneScore, icon: "🧼" },
    ];

    // Determine the primary metric to highlight
    const primaryKey = variant;

    return (
        <div className="flex flex-col gap-4">
            <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">District Profile</p>
                <p className="text-sm font-semibold text-[#0B192C] mt-0.5">{districtName}</p>
                {data.parentId && (
                    <p className="text-xs text-slate-400 mt-0.5">{data.parentId} Region</p>
                )}
            </div>

            {/* Score Cards */}
            <div className="grid grid-cols-2 gap-2">
                {scores.map(s => {
                    const isPrimary = s.key === primaryKey;
                    const color = colorScale(s.value);
                    return (
                        <div
                            key={s.key}
                            className={`rounded-lg p-3 border ${isPrimary ? 'border-[#1A365D]/20 bg-[#0B192C] text-white' : 'border-slate-100 bg-slate-50'}`}
                        >
                            <p className={`text-xs font-medium ${isPrimary ? 'text-slate-300' : 'text-slate-500'}`}>
                                {s.icon} {s.label}
                            </p>
                            <div className="flex items-baseline gap-2 mt-1">
                                <span className={`text-xl font-bold ${isPrimary ? 'text-white' : ''}`} style={!isPrimary ? { color } : {}}>
                                    {Math.round(s.value)}
                                </span>
                                <span
                                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${isPrimary ? 'bg-white/15 text-white/80' : ''}`}
                                    style={!isPrimary ? { backgroundColor: `${color}20`, color } : {}}
                                >
                                    {label(s.value)}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Score Bars */}
            <div className="space-y-2.5 mt-1">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Score Breakdown</p>
                {scores.map(s => {
                    const color = colorScale(s.value);
                    return (
                        <div key={s.key} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-700 font-medium">{s.label}</span>
                                <span className="font-semibold" style={{ color }}>{Math.round(s.value)}</span>
                            </div>
                            <div className="h-2.5 rounded-full bg-slate-200 overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{ width: `${Math.max(3, s.value)}%`, backgroundColor: color }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Sub-metric details based on variant */}
            {variant === "water" && data.waterData?.urban && (
                <div className="space-y-2 mt-1">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Water Service Ladder</p>
                    {[
                        { label: "Safely Managed", value: (data.waterData.urban.safely_managed + data.waterData.rural.safely_managed) / 2 },
                        { label: "Basic", value: (data.waterData.urban.basic + data.waterData.rural.basic) / 2 },
                        { label: "Limited", value: (data.waterData.urban.limited + data.waterData.rural.limited) / 2 },
                        { label: "Unimproved", value: (data.waterData.urban.unimproved + data.waterData.rural.unimproved) / 2 },
                        { label: "Surface Water", value: (data.waterData.urban.surface_water + data.waterData.rural.surface_water) / 2 },
                    ].map(item => (
                        <div key={item.label} className="flex items-center justify-between text-xs">
                            <span className="text-slate-600">{item.label}</span>
                            <span className="font-semibold text-slate-800">{Math.round(item.value)}%</span>
                        </div>
                    ))}
                </div>
            )}

            {variant === "sanitation" && data.sanitationData?.ladder && (
                <div className="space-y-2 mt-1">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Sanitation Service Ladder</p>
                    {[
                        { label: "Safely Managed", value: data.sanitationData.ladder.safely_managed },
                        { label: "Basic", value: data.sanitationData.ladder.basic },
                        { label: "Limited", value: data.sanitationData.ladder.limited },
                        { label: "Unimproved", value: data.sanitationData.ladder.unimproved },
                        { label: "Open Defecation", value: data.sanitationData.ladder.open_defecation },
                    ].map(item => (
                        <div key={item.label} className="flex items-center justify-between text-xs">
                            <span className="text-slate-600">{item.label}</span>
                            <span className="font-semibold text-slate-800">{Math.round(item.value)}%</span>
                        </div>
                    ))}
                    <div className="flex items-center gap-2 mt-1 text-xs">
                        <span className="text-slate-500">ODF Status:</span>
                        <span className={`font-semibold ${data.sanitationData.odf_status ? 'text-green-600' : 'text-red-500'}`}>
                            {data.sanitationData.odf_status ? "✅ ODF Free" : "❌ Not ODF"}
                        </span>
                    </div>
                </div>
            )}

            {variant === "hygiene" && data.hygieneData && (
                <div className="space-y-2 mt-1">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Hygiene Indicators</p>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">Soap & Water Access</span>
                        <span className="font-semibold text-slate-800">{Math.round(data.hygieneData.soap_and_water_access_percentage)}%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">MHM Adequacy Score</span>
                        <span className="font-semibold text-slate-800">{Math.round(data.hygieneData.mhm_score)}%</span>
                    </div>
                </div>
            )}
        </div>
    );
}
