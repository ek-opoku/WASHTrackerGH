const fs = require('fs');

let fileContent = fs.readFileSync('src/lib/mockData.ts', 'utf-8');

const header = `import { RawWashParameters, calculateWASHIndex, ComputedIndex, WaterSourceType, SanitationFacilityType, HygieneFacilityType } from './engine';
import { aggregateIndexScores } from './aggregation';

export interface WaterLadder {
  safely_managed: number;
  basic: number;
  limited: number;
  unimproved: number;
  surface_water: number;
}
export interface WaterData {
  urban: WaterLadder;
  rural: WaterLadder;
}
export interface SanitationLadder {
  safely_managed: number;
  basic: number;
  limited: number;
  unimproved: number;
  open_defecation: number;
}
export interface SanitationData {
  ladder: SanitationLadder;
  odf_status: boolean;
}
export interface HygieneData {
  soap_and_water_access_percentage: number;
  mhm_score: number;
}
export interface GeographyMetrics {
  id: string;
  name: string;
  population: number;
  rawParams: RawWashParameters;
  computed: ComputedIndex;
  
  // Legacy fields
  compositeIndex: number; 
  water: WaterData;
  sanitation: SanitationData;
  hygiene: HygieneData;
}
export interface District extends GeographyMetrics {}
export interface Region extends GeographyMetrics {
  districts: District[];
}

function generateRawParamsFromScore(score: number): RawWashParameters {
  let waterSource: WaterSourceType = 'unprotected_well';
  let ecoli = 150;
  if (score > 80) { waterSource = 'piped_dwelling'; ecoli = 0; }
  else if (score > 60) { waterSource = 'piped_yard'; ecoli = 5; }
  else if (score > 40) { waterSource = 'public_tap'; ecoli = 50; }

  let sanFac: SanitationFacilityType = 'open_defecation';
  if (score > 80) sanFac = 'flush_septic';
  else if (score > 60) sanFac = 'vip_latrine';
  else if (score > 40) sanFac = 'pit_no_slab';

  let hygFac: HygieneFacilityType = 'none';
  if (score > 70) hygFac = 'fixed_sink';
  else if (score > 40) hygFac = 'mobile_device';

  return {
    waterSource,
    secondaryWaterSource: null,
    collectionTimeMinutes: score > 50 ? 15 : 45,
    waterAvailableHours: score > 70 ? 24 : 12,
    waterAvailabilityYesNo: true,
    ecoliCount: ecoli,
    hasPriorityChemicalContamination: false,
    sanitationFacility: sanFac,
    sanitationShared: score < 60,
    fsmChain: score > 70 ? 'safely_managed' : (score > 40 ? 'contained' : 'dumped'),
    hygieneFacility: hygFac,
    hasSoapAndWater: score > 50,
    mhmPrivacy: score > 50,
    mhmMaterials: score > 50,
    mhmNoExclusion: score > 50
  };
}
`;

fileContent = fileContent.replace(/\/\*\*[\s\S]*?export type GeographyLevel = "nation" \| "region" \| "district";/m, header);

fileContent = fileContent.replace(/compositeIndex: (\d+),/g, (match, p1) => {
    const score = parseInt(p1);
    const pop = Math.floor(Math.random() * 500000) + 100000;
    return `population: ${pop},
    rawParams: generateRawParamsFromScore(${score}),
    computed: { water: 0, sanitation: 0, hygiene: 0, composite: 0, isCapped: false },
    compositeIndex: ${score},`;
});

const footer = `
for (const region of nation) {
  for (const district of region.districts) {
    district.computed = calculateWASHIndex(district.rawParams);
    district.compositeIndex = district.computed.composite;
    district.water.urban.safely_managed = district.computed.water;
    district.sanitation.ladder.safely_managed = district.computed.sanitation;
    district.hygiene.soap_and_water_access_percentage = district.computed.hygiene;
  }
  
  region.computed = aggregateIndexScores(
    region.districts.map(d => ({
      id: d.id,
      population: d.population,
      scores: d.computed
    }))
  );

  region.compositeIndex = region.computed.composite;
  region.water.urban.safely_managed = region.computed.water;
  region.sanitation.ladder.safely_managed = region.computed.sanitation;
  region.hygiene.soap_and_water_access_percentage = region.computed.hygiene;
}

export type GeographyLevel = "nation" | "region" | "district";
export const regions = nation;
`;

fileContent = fileContent.replace('export const regions = nation;', footer);

fs.writeFileSync('src/lib/mockData.ts', fileContent);
console.log('Success!');
