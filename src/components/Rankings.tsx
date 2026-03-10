"use client";

import { useMemo } from "react";
import type { Region } from "@/lib/geography";

type LiveData = {
  spatialId: string;
  name: string;
  level: string;
  parentId: string | null;
  compositeScore: number;
  waterScore: number;
  sanitationScore: number;
  hygieneScore: number;
};

type RankingsProps = {
  scope: "nation" | "region";
  selectedRegion: Region | null;
  computedData: LiveData[];
  metricType?: "composite" | "water" | "sanitation" | "hygiene";
  variant?: "all" | "top" | "bottom";
  limit?: number;
};

type Item = {
  id: string;
  name: string;
  value: number;
};

export function Rankings({
  scope,
  selectedRegion,
  computedData,
  metricType = "composite",
  variant = "all",
  limit
}: RankingsProps) {
  const items: Item[] = useMemo(() => {
    let dataset = [];

    if (scope === "region" && selectedRegion) {
      dataset = computedData.filter(d => d.level === "district" && d.parentId === selectedRegion.name);
    } else {
      dataset = computedData.filter(d => d.level === "region");
    }

    const metricKey = metricType === "water" ? "waterScore"
      : metricType === "sanitation" ? "sanitationScore"
        : metricType === "hygiene" ? "hygieneScore"
          : "compositeScore";

    let mappedDataset = dataset.map(d => ({
      id: d.spatialId,
      name: d.name,
      value: d[metricKey]
    }));

    mappedDataset.sort((a, b) => b.value - a.value);

    if (variant === "top") {
      return limit ? mappedDataset.slice(0, limit) : mappedDataset;
    } else if (variant === "bottom") {
      return limit ? mappedDataset.slice(-limit) : mappedDataset;
    }
    return mappedDataset;

  }, [scope, selectedRegion, computedData, metricType, variant, limit]);

  if (!items.length) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-slate-500">
        No data available.
      </div>
    );
  }

  const title =
    scope === "region" && selectedRegion
      ? `District rankings in ${selectedRegion.name}`
      : variant === "top"
        ? `Top ${limit || ""} Regions Nationwide`
        : variant === "bottom"
          ? `Bottom ${limit || ""} Regions Nationwide`
          : "Regional rankings (nationwide)";

  const getMetricColor = (val: number) => {
    if (metricType === "water") {
      if (val >= 85) return "bg-blue-700";
      if (val >= 70) return "bg-blue-600";
      if (val >= 55) return "bg-blue-500";
      if (val >= 40) return "bg-blue-400";
      if (val >= 25) return "bg-blue-300";
      return "bg-blue-200";
    }
    if (metricType === "sanitation") {
      if (val >= 85) return "bg-emerald-700";
      if (val >= 70) return "bg-emerald-600";
      if (val >= 55) return "bg-emerald-500";
      if (val >= 40) return "bg-emerald-400";
      if (val >= 25) return "bg-emerald-300";
      return "bg-emerald-200";
    }
    if (metricType === "hygiene") {
      if (val >= 85) return "bg-indigo-700";
      if (val >= 70) return "bg-indigo-600";
      if (val >= 55) return "bg-indigo-500";
      if (val >= 40) return "bg-indigo-400";
      if (val >= 25) return "bg-indigo-300";
      return "bg-indigo-200";
    }
    // Default Composite
    if (val >= 85) return "bg-sky-500";
    if (val >= 70) return "bg-cyan-500";
    if (val >= 55) return "bg-teal-500";
    if (val >= 40) return "bg-amber-400";
    if (val >= 25) return "bg-orange-400";
    return "bg-orange-500";
  };

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
            Rankings
          </p>
          <p className="text-sm font-semibold text-[#0B192C]">{title}</p>
        </div>
      </div>
      <div className="mt-1 flex-1 space-y-2 overflow-y-auto pr-1">
        {items.map((item, index) => {
          // Normalize ratio between 0 and 100 for the bar width
          const width = `${Math.max(8, item.value)}%`;

          let colorClass = getMetricColor(item.value);

          return (
            <div
              key={item.id}
              className="space-y-1 rounded-lg bg-slate-50 p-2 border border-slate-100/50"
            >
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="truncate text-slate-800 font-medium">
                  {variant === "bottom" && limit ? 16 - limit + index + 1 : index + 1}. {item.name}
                </span>
                <span className="font-semibold text-slate-700">
                  {Math.round(item.value)}
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <div
                  className={`h-2 rounded-full ${colorClass}`}
                  style={{ width }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


