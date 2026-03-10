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
  sanitationData: any;
};

export default function SanitationDashboardClient({ computedData }: { computedData: LiveData[] }) {
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
    const sd = computed?.sanitationData;
    if (sd && sd.ladder) {
      return {
        name: entity.name,
        SafelyManaged: sd.ladder.safely_managed,
        Basic: sd.ladder.basic,
        Limited: sd.ladder.limited,
        Unimproved: sd.ladder.unimproved,
        NoService: sd.ladder.open_defecation,
      };
    }
    return { name: entity.name, SafelyManaged: 0, Basic: 0, Limited: 0, Unimproved: 0, NoService: 0 };
  });

  const odfRegions = regions.filter(r => {
    const cmp = getComputedSource(r.name);
    return cmp?.sanitationData?.odf_status;
  }).map(r => r.name);

  const accessData: DemographicSplitData[] = dataScope.map((entity) => {
    const computed = getComputedSource(entity.name);
    const sd = computed?.sanitationData;
    if (sd && sd.ladder) {
      const safeAndBasic = sd.ladder.safely_managed + sd.ladder.basic;
      const unimprovedAndODF = sd.ladder.unimproved + sd.ladder.open_defecation;
      return {
        name: entity.name,
        Urban: safeAndBasic,
        Rural: unimprovedAndODF, // Conceptual remapping since the chart expects "Urban" / "Rural" keys despite "Access" / "Critical" values
      };
    }
    return { name: entity.name, Urban: 0, Rural: 0 };
  });

  const sortedLadderData = [...ladderData].sort(
    (a, b) => b.SafelyManaged - a.SafelyManaged
  );

  const pieData: PieChartData[] = [];
  if (activeEntity) {
    const computed = getComputedSource(activeEntity.name);
    const sd = computed?.sanitationData;
    if (sd && sd.ladder) {
      pieData.push({ name: 'Safely Managed (Sewer/Septic)', value: sd.ladder.safely_managed });
      pieData.push({ name: 'Basic (VIP Latrine)', value: sd.ladder.basic });
      pieData.push({ name: 'Limited (Shared)', value: sd.ladder.limited });
      pieData.push({ name: 'Unimproved (Pit No Slab)', value: sd.ladder.unimproved });
      pieData.push({ name: 'Open Defecation', value: sd.ladder.open_defecation });
    }
  } else {
    const national = getComputedSource("Ghana_National");
    const sd = national?.sanitationData;
    if (sd && sd.ladder) {
      pieData.push({ name: 'Safely Managed (Sewer/Septic)', value: sd.ladder.safely_managed });
      pieData.push({ name: 'Basic (VIP Latrine)', value: sd.ladder.basic });
      pieData.push({ name: 'Limited (Shared)', value: sd.ladder.limited });
      pieData.push({ name: 'Unimproved (Pit No Slab)', value: sd.ladder.unimproved });
      pieData.push({ name: 'Open Defecation', value: sd.ladder.open_defecation });
    }
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#0B192C] tracking-tight mb-2">SDG 6.2: Sanitation</h1>
          <p className="text-slate-600">Target: Access to adequate and equitable sanitation and hygiene for all.</p>
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
            Regional Sanitation Service Index
          </h3>
          <p className="text-sm text-slate-500 px-2 mb-3">Map colors reflect the calculated Sanitation Sub-Index.</p>
          <div className="flex-grow rounded overflow-hidden">
            <InteractiveMap
              computedData={computedData}
              metricKey="sanitationScore"
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
                  <Rankings scope="region" selectedRegion={selectedRegion} metricType="sanitation" variant="all" computedData={computedData} />
                </div>
              ) : (
                <>
                  <div className="bg-white rounded-xl border border-[#1A365D]/10 p-4 shadow-sm">
                    <Rankings scope="nation" selectedRegion={null} metricType="sanitation" variant="top" limit={3} computedData={computedData} />
                  </div>
                  <div className="bg-white rounded-xl border border-[#1A365D]/10 p-4 shadow-sm">
                    <Rankings scope="nation" selectedRegion={null} metricType="sanitation" variant="bottom" limit={3} computedData={computedData} />
                  </div>
                </>
              )}
            </div>
          )}

          {selectedDistrictId && (
            <div className="bg-white rounded-xl border border-[#1A365D]/10 p-4 shadow-sm">
              <DistrictDetail districtName={selectedDistrictId} computedData={computedData} variant="sanitation" />
            </div>
          )}

          {!selectedDistrict && (
            <JMPServiceLadder
              data={sortedLadderData}
              title="Sanitation Service Levels"
              noServiceLabel="Open Defecation"
            />
          )}

          <DemographicSplit
            data={accessData}
            title="Disparities (% Access vs % Critical Failure)"
            dataKey1="At least Basic"
            dataKey2="Unimproved & OD"
          />

          <MetricPieChart
            data={pieData}
            title={`Facilities Breakdown - ${scopeLabel}`}
            theme="sanitation"
          />

          {!selectedRegion && (
            <div className="w-full bg-[#0B192C] border border-[#1A365D]/20 rounded-xl p-6 shrink-0">
              <h3 className="text-lg font-semibold text-white mb-2">ODF Declaration Status</h3>
              {odfRegions.length > 0 ? (
                <div className="flex gap-2 flex-wrap">
                  {odfRegions.map(name => (
                    <span key={name} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-500/30 text-sm">
                      {name} (ODF Free)
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm italic">No regions currently hold Open Defecation Free (ODF) status.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
