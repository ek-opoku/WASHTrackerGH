"use client";

import { useState } from 'react';
import { geography as regions, Region, District } from '@/lib/geography';
import { InteractiveMap } from '@/components/InteractiveMap';
import DemographicSplit, { DemographicSplitData } from '@/components/charts/DemographicSplit';
import MetricPieChart, { PieChartData } from '@/components/charts/MetricPieChart';
import { Rankings } from '@/components/Rankings';
import { DistrictDetail } from '@/components/DistrictDetail';

type LiveData = {
  spatialId: string;
  name: string;
  level: string;
  parentId: string | null;
  compositeScore: number;
  waterScore: number;
  sanitationScore: number;
  hygieneScore: number;
  hygieneData: any;
};

export default function HygieneDashboardClient({ computedData }: { computedData: LiveData[] }) {
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(null);

  const selectedRegion = selectedRegionId
    ? regions.find((r) => r.name === selectedRegionId) || null
    : null;

  const selectedDistrict = selectedRegion && selectedDistrictId
    ? selectedRegion.districts.find(d => d.name === selectedDistrictId) || null
    : null;

  const activeEntity = selectedDistrict || selectedRegion;

  const dataScope = selectedDistrict
    ? computedData.filter(d => d.name === selectedDistrictId)
    : selectedRegion
      ? computedData.filter(d => d.level === 'district' && d.parentId === selectedRegion.name)
      : computedData.filter(d => d.level === 'region');

  const scopeLabel = activeEntity ? activeEntity.name : "National Averages";

  const getComputedSource = (name: string) => computedData.find(d => d.name === name);

  const hygieneData: DemographicSplitData[] = dataScope.map((entity) => {
    const computed = getComputedSource(entity.name);
    const hd = computed?.hygieneData;
    if (hd) {
      return {
        name: entity.name,
        Urban: hd.soap_and_water_access_percentage, // Using 'Urban'/'Rural' keys specifically for DemographicSplit mapping
        Rural: hd.mhm_score,
      };
    }
    return { name: entity.name, Urban: 0, Rural: 0 };
  });

  const sortedData = [...hygieneData].sort(
    (a, b) => b.Urban - a.Urban
  );

  const pieData: PieChartData[] = [];
  if (activeEntity) {
    const computed = getComputedSource(activeEntity.name);
    const hd = computed?.hygieneData;
    if (hd) {
      pieData.push({ name: 'MHM Adequate', value: hd.mhm_score });
      pieData.push({ name: 'MHM Inadequate', value: Math.max(0, 100 - hd.mhm_score) });
    }
  } else {
    const national = getComputedSource("Ghana_National");
    const hd = national?.hygieneData;
    if (hd) {
      pieData.push({ name: 'MHM Adequate', value: hd.mhm_score });
      pieData.push({ name: 'MHM Inadequate', value: Math.max(0, 100 - hd.mhm_score) });
    }
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#0B192C] tracking-tight mb-2">SDG 6.2: Hygiene & MHM</h1>
          <p className="text-slate-600">Target: End open defecation, paying special attention to the needs of women and girls.</p>
        </div>
        {activeEntity && (
          <button
            onClick={() => {
              setSelectedDistrictId(null);
              setSelectedRegionId(null);
            }}
            className="px-4 py-2 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition"
          >
            Clear Selection
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 items-start">
        <div className="rounded-xl border border-[#1A365D]/10 bg-white p-3 shadow-sm sm:p-4 min-h-[500px] flex flex-col sticky top-8">
          <h3 className="text-lg font-semibold text-[#0B192C] px-2 pt-2 pb-1">
            Regional Hygiene Service Index
          </h3>
          <p className="text-sm text-slate-500 px-2 mb-3">Map colors reflect the calculated Hygiene Sub-Index.</p>
          <div className="flex-grow rounded overflow-hidden">
            <InteractiveMap
              computedData={computedData}
              metricKey="hygieneScore"
              activeRegionName={selectedRegionId}
              activeDistrictName={selectedDistrictId}
              onRegionClick={(name) => {
                setSelectedDistrictId(null);
                setSelectedRegionId(name);
              }}
              onDistrictClick={(name) => {
                setSelectedDistrictId(name);
              }}
              onResetMap={() => {
                setSelectedDistrictId(null);
                setSelectedRegionId(null);
              }}
              onReturnToRegion={() => {
                setSelectedDistrictId(null);
              }}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          <div className="mb-2">
            <h2 className="text-xl font-bold text-[#0B192C]">{scopeLabel} Metrics</h2>
            <p className="text-sm text-slate-500 mt-1">Select a region on the map to filter these models.</p>
          </div>

          {!selectedDistrict && (
            <div className="flex flex-col gap-4 shrink-0">
              {selectedRegion ? (
                <div className="bg-white rounded-xl border border-[#1A365D]/10 p-4 shadow-sm min-h-[160px]">
                  <Rankings scope="region" selectedRegion={selectedRegion} metricType="hygiene" variant="all" computedData={computedData} />
                </div>
              ) : (
                <>
                  <div className="bg-white rounded-xl border border-[#1A365D]/10 p-4 shadow-sm min-h-[160px]">
                    <Rankings scope="nation" selectedRegion={null} metricType="hygiene" variant="top" limit={3} computedData={computedData} />
                  </div>
                  <div className="bg-white rounded-xl border border-[#1A365D]/10 p-4 shadow-sm min-h-[160px]">
                    <Rankings scope="nation" selectedRegion={null} metricType="hygiene" variant="bottom" limit={3} computedData={computedData} />
                  </div>
                </>
              )}
            </div>
          )}

          {selectedDistrictId && (
            <div className="bg-white rounded-xl border border-[#1A365D]/10 p-4 shadow-sm">
              <DistrictDetail districtName={selectedDistrictId} computedData={computedData} variant="hygiene" />
            </div>
          )}

          <DemographicSplit
            data={sortedData}
            title="Hygiene Indicators by Region"
            dataKey1="Basic Soap & Water Access (%)"
            dataKey2="MHM Adequacy Score"
          />

          <MetricPieChart
            data={pieData}
            title={`MHM Adequacy - ${scopeLabel}`}
            theme="hygiene"
          />
        </div>
      </div>
    </div>
  );
}
