"use client";

import { useMemo, useState } from "react";
import { InteractiveMap, MetricKey } from "@/components/InteractiveMap";
import { SummaryCards } from "@/components/SummaryCards";
import { Rankings } from "@/components/Rankings";
import { DistrictDetail } from "@/components/DistrictDetail";
import { geography as allRegions, Region, District } from "@/lib/geography";

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

export function MapContainer({ computedData, metricType = "composite" }: { computedData: LiveData[], metricType?: "composite" | "water" | "sanitation" | "hygiene" }) {
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(null);

  const selectedRegion: Region | null = useMemo(
    () =>
      selectedRegionId
        ? allRegions.find((r) => r.name === selectedRegionId) ?? null // InteractiveMap gives us 'name', not ID!
        : null,
    [selectedRegionId]
  );

  const selectedDistrict: District | null = useMemo(() => {
    if (!selectedRegion || !selectedDistrictId) return null;
    // Try static geography first, then synthesize from computedData
    const fromGeo = selectedRegion.districts.find((d) => d.name === selectedDistrictId) ?? null;
    if (fromGeo) return fromGeo;
    // Synthesize from DB data so that all districts are recognized
    const fromDb = computedData.find(d => d.name === selectedDistrictId && d.level === 'district');
    if (fromDb) return { id: fromDb.spatialId, name: fromDb.name, population: 0 };
    return null;
  }, [selectedRegion, selectedDistrictId, computedData]);

  const scopeLevel: "nation" | "region" | "district" = selectedDistrictId
    ? "district"
    : selectedRegion
      ? "region"
      : "nation";

  const scopeLabel =
    scopeLevel === "nation"
      ? "Nationwide (Ghana)"
      : scopeLevel === "region"
        ? selectedRegion?.name ?? ""
        : selectedDistrict?.name ?? selectedDistrictId ?? "";

  const handleReset = () => {
    setSelectedDistrictId(null);
    setSelectedRegionId(null);
  };

  const mapMetricKey: MetricKey = metricType === "composite" ? "compositeScore"
    : metricType === "water" ? "waterScore"
      : metricType === "sanitation" ? "sanitationScore"
        : "hygieneScore";

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
            Map scope
          </p>
          <p className="text-sm font-semibold text-[#0B192C]">{scopeLabel}</p>
        </div>
        {(selectedRegion || selectedDistrict) && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-md border border-cyan-500/30 bg-white px-3 py-1.5 text-xs font-medium text-cyan-700 shadow-sm shadow-cyan-500/10 transition-colors hover:bg-slate-50"
          >
            Reset map
          </button>
        )}
      </div>

      <SummaryCards
        scopeLevel={scopeLevel}
        region={selectedRegion}
        district={selectedDistrict}
        allRegions={allRegions}
        computedData={computedData}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.3fr)] items-start">
        <div className="rounded-xl border border-[#1A365D]/10 bg-white p-3 shadow-sm sm:p-4 sticky top-8">
          <InteractiveMap
            computedData={computedData}
            metricKey={mapMetricKey}
            activeRegionName={selectedRegionId}
            activeDistrictName={selectedDistrictId}
            onRegionClick={(name) => {
              setSelectedDistrictId(null);
              setSelectedRegionId(name);
            }}
            onDistrictClick={(name) => {
              setSelectedDistrictId(name);
            }}
            onResetMap={handleReset}
            onReturnToRegion={() => {
              setSelectedDistrictId(null);
            }}
          />
        </div>
        <div className="rounded-xl border border-[#1A365D]/10 bg-white p-3 shadow-sm sm:p-4">
          {scopeLevel === "district" && selectedDistrictId ? (
            <DistrictDetail districtName={selectedDistrictId} computedData={computedData} variant={metricType} />
          ) : (
            <Rankings scope={scopeLevel === "nation" ? "nation" : "region"} selectedRegion={selectedRegion} computedData={computedData} metricType={metricType} />
          )}
        </div>
      </div>
    </section>
  );
}

