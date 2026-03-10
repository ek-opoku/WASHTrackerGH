"use client";

import { useState } from 'react';
import { geography as regions, Region, District } from '@/lib/geography';
import { InteractiveMap } from '@/components/InteractiveMap';
import JMPServiceLadder, { JMPChartData } from '@/components/charts/JMPServiceLadder';
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
  waterData: any;
};

export default function WaterDashboardClient({ computedData }: { computedData: LiveData[] }) {
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

  const ladderData: JMPChartData[] = dataScope.map((entity) => {
    const computed = getComputedSource(entity.name);
    const wd = computed?.waterData;
    if (wd && wd.urban) {
      return {
        name: entity.name,
        SafelyManaged: (wd.urban.safely_managed + wd.rural.safely_managed) / 2,
        Basic: (wd.urban.basic + wd.rural.basic) / 2,
        Limited: (wd.urban.limited + wd.rural.limited) / 2,
        Unimproved: (wd.urban.unimproved + wd.rural.unimproved) / 2,
        NoService: (wd.urban.surface_water + wd.rural.surface_water) / 2,
      };
    }
    return { name: entity.name, SafelyManaged: 0, Basic: 0, Limited: 0, Unimproved: 0, NoService: 0 };
  });

  const sortedLadderData = [...ladderData].sort(
    (a, b) => (b.SafelyManaged + b.Basic) - (a.SafelyManaged + a.Basic)
  );

  const demographicData: DemographicSplitData[] = dataScope.map((entity) => {
    const computed = getComputedSource(entity.name);
    const wd = computed?.waterData;
    if (wd && wd.urban) {
      return {
        name: entity.name,
        Urban: wd.urban.safely_managed + wd.urban.basic,
        Rural: wd.rural.safely_managed + wd.rural.basic,
      };
    }
    return { name: entity.name, Urban: 0, Rural: 0 };
  });

  const pieData: PieChartData[] = [];
  if (activeEntity) {
    const computed = getComputedSource(activeEntity.name);
    const wd = computed?.waterData;
    if (wd && wd.urban) {
      pieData.push({ name: 'Safely Managed (Piped/Borehole)', value: (wd.urban.safely_managed + wd.rural.safely_managed) / 2 });
      pieData.push({ name: 'Basic Access', value: (wd.urban.basic + wd.rural.basic) / 2 });
      pieData.push({ name: 'Surface / Unimproved', value: (wd.urban.surface_water + wd.rural.surface_water) / 2 + (wd.urban.limited + wd.rural.limited) / 2 + (wd.urban.unimproved + wd.rural.unimproved) / 2 });
    }
  } else {
    const national = getComputedSource("Ghana_National");
    const wd = national?.waterData;
    if (wd && wd.urban) {
      pieData.push({ name: 'Safely Managed (Piped/Borehole)', value: (wd.urban.safely_managed + wd.rural.safely_managed) / 2 });
      pieData.push({ name: 'Basic Access', value: (wd.urban.basic + wd.rural.basic) / 2 });
      pieData.push({ name: 'Surface / Unimproved', value: (wd.urban.surface_water + wd.rural.surface_water) / 2 + (wd.urban.limited + wd.rural.limited) / 2 + (wd.urban.unimproved + wd.rural.unimproved) / 2 });
    }
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#0B192C] tracking-tight mb-2">SDG 6.1: Drinking Water</h1>
          <p className="text-slate-600">Target: Universal and equitable access to safe and affordable drinking water.</p>
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
            Regional Water Service Index
          </h3>
          <p className="text-sm text-slate-500 px-2 mb-3">Map colors reflect the calculated Water Sub-Index.</p>
          <div className="flex-grow rounded overflow-hidden">
            <InteractiveMap
              computedData={computedData}
              metricKey="waterScore"
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
                <div className="bg-white rounded-xl border border-[#1A365D]/10 p-4 shadow-sm">
                  <Rankings scope="region" selectedRegion={selectedRegion} metricType="water" variant="all" computedData={computedData} />
                </div>
              ) : (
                <>
                  <div className="bg-white rounded-xl border border-[#1A365D]/10 p-4 shadow-sm">
                    <Rankings scope="nation" selectedRegion={null} metricType="water" variant="top" limit={3} computedData={computedData} />
                  </div>
                  <div className="bg-white rounded-xl border border-[#1A365D]/10 p-4 shadow-sm">
                    <Rankings scope="nation" selectedRegion={null} metricType="water" variant="bottom" limit={3} computedData={computedData} />
                  </div>
                </>
              )}
            </div>
          )}

          {selectedDistrictId && (
            <div className="bg-white rounded-xl border border-[#1A365D]/10 p-4 shadow-sm">
              <DistrictDetail districtName={selectedDistrictId} computedData={computedData} variant="water" />
            </div>
          )}

          {!selectedDistrict && (
            <JMPServiceLadder
              data={sortedLadderData}
              title="Drinking Water Service Levels"
              noServiceLabel="Surface Water"
            />
          )}

          <DemographicSplit
            data={demographicData}
            title="Urban vs Rural Disparities (% At least Basic)"
          />

          <MetricPieChart
            data={pieData}
            title={`Source Breakdown - ${scopeLabel}`}
            theme="water"
          />
        </div>
      </div>
    </div>
  );
}
