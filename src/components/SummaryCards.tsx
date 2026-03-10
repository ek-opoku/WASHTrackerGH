"use client";

import type { District, Region } from "@/lib/geography";

type ScopeLevel = "nation" | "region" | "district";

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

type SummaryCardsProps = {
  scopeLevel: ScopeLevel;
  region: Region | null;
  district: District | null;
  allRegions: Region[];
  computedData: LiveData[];
};

function round(value: number): number {
  return Math.round(value);
}

export function SummaryCards({
  scopeLevel,
  region,
  district,
  computedData,
}: SummaryCardsProps) {
  let targetName = "Ghana_National";
  if (scopeLevel === "district" && district) targetName = district.name;
  if (scopeLevel === "region" && region) targetName = region.name;

  const metrics = computedData.find(d => d.name === targetName) || {
    compositeScore: 0,
    waterScore: 0,
    sanitationScore: 0,
    hygieneScore: 0
  };

  const scopeLabel =
    scopeLevel === "nation"
      ? "Nationwide composite (Ghana)"
      : scopeLevel === "region"
        ? `Regional averages (${region?.name ?? ""})`
        : `District averages (${district?.name ?? ""})`;

  const cards = [
    {
      key: "composite",
      title: "Composite WASH Index",
      value: `${round(metrics.compositeScore)}`,
      subtitle: scopeLabel,
      colorClass: "text-[#0B192C]", // Deep Navy
    },
    {
      key: "water",
      title: "Water Index",
      value: `${round(metrics.waterScore)}`,
      subtitle: "Water sub-index score",
      colorClass: "text-cyan-600", // Cyan
    },
    {
      key: "sanitation",
      title: "Sanitation Index",
      value: `${round(metrics.sanitationScore)}`,
      subtitle: "Sanitation sub-index score",
      colorClass: "text-teal-600", // Teal
    },
    {
      key: "hygiene",
      title: "Hygiene Index",
      value: `${round(metrics.hygieneScore)}`,
      subtitle: "Hygiene sub-index score",
      colorClass: "text-orange-500", // Orange
    },
  ] as const;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.key}
          className="rounded-xl border border-[#1A365D]/10 bg-white p-3 shadow-sm sm:p-4"
        >
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            {card.title}
          </p>
          <p className={`mt-2 text-xl font-semibold ${card.colorClass}`}>
            {card.value}
          </p>
          <p className="mt-1 text-xs text-slate-500">{card.subtitle}</p>
        </div>
      ))}
    </div>
  );
}


