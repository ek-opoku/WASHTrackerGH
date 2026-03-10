export type WaterSourceType =
    | "piped_dwelling"
    | "piped_yard"
    | "borehole_premises"
    | "sachet_bottled"
    | "public_tap"
    | "protected_well"
    | "limited"
    | "surface_water"
    | "unprotected_well"
    | "tanker_truck";

export type SanitationFacilityType =
    | "flush_sewer"
    | "flush_septic"
    | "vip_latrine"
    | "pit_no_slab"
    | "bucket"
    | "hanging"
    | "open_defecation";

export type FSMChainStatus = "safely_managed" | "contained" | "dumped" | null;

export type HygieneFacilityType =
    | "fixed_sink"
    | "mobile_device"
    | "limited"
    | "none";

// Represents the raw payload conforming to the Module 1 parameters
export interface RawWashParameters {
    // Target 6.1
    waterSource: WaterSourceType | null;
    secondaryWaterSource: WaterSourceType | null; // Needed for Sachet check
    collectionTimeMinutes: number | null;
    waterAvailableHours: number | null;
    waterAvailabilityYesNo: boolean | null;
    ecoliCount: number | null;
    hasPriorityChemicalContamination: boolean | null; // e.g. Arsenic, Fluoride, Mercury above limit

    // Target 6.2 (Sanitation)
    sanitationFacility: SanitationFacilityType | null;
    sanitationShared: boolean | null;
    fsmChain: FSMChainStatus;

    // Target 6.2 (Hygiene)
    hygieneFacility: HygieneFacilityType | null;
    hasSoapAndWater: boolean | null;
    mhmPrivacy: boolean | null;
    mhmMaterials: boolean | null;
    mhmNoExclusion: boolean | null;
}

export interface ComputedIndex {
    water: number;
    sanitation: number;
    hygiene: number;
    composite: number;
    isCapped: boolean;
}

// ============================================
// MODULE 2: Categorical Normalization (Strict Ideal Ladders)
// ============================================

function getWaterSourceScore(p: RawWashParameters): number {
    if (!p.waterSource) return NaN;

    switch (p.waterSource) {
        case "piped_dwelling":
            return 100;
        case "piped_yard":
        case "borehole_premises":
            return 85;
        case "sachet_bottled":
            // Condition: Secondary improved source MUST exist for hygiene
            const validSecondary =
                p.secondaryWaterSource &&
                [
                    "piped_dwelling",
                    "piped_yard",
                    "borehole_premises",
                    "public_tap",
                    "protected_well",
                ].includes(p.secondaryWaterSource);
            return validSecondary ? 80 : 50;
        case "public_tap":
        case "protected_well":
            return p.collectionTimeMinutes != null && p.collectionTimeMinutes > 30
                ? 50
                : 75;
        case "limited":
            return 50;
        case "surface_water":
        case "unprotected_well":
        case "tanker_truck":
            return 0;
        default:
            return NaN;
    }
}

function getSanitationFacilityScore(p: RawWashParameters): number {
    if (!p.sanitationFacility) return NaN;

    if (p.sanitationShared) {
        if (
            ["flush_sewer", "flush_septic", "vip_latrine"].includes(
                p.sanitationFacility
            )
        ) {
            return 50; // Basic shared -> Limited
        }
    }

    switch (p.sanitationFacility) {
        case "flush_sewer":
            return 100;
        case "flush_septic":
            return 100; // Malus applied later in Module 4
        case "vip_latrine":
            return 75;
        case "pit_no_slab":
        case "bucket":
        case "hanging":
            return 25;
        case "open_defecation":
            return 0;
        default:
            return NaN;
    }
}

function getHygieneScore(p: RawWashParameters): number {
    if (!p.hygieneFacility) return NaN;

    if (p.hygieneFacility === "fixed_sink") {
        return p.hasSoapAndWater ? 100 : 50;
    }
    if (p.hygieneFacility === "mobile_device") {
        return p.hasSoapAndWater ? 75 : 50;
    }
    return 0; // "none" or "limited" without facility
}

// ============================================
// MODULE 3: Continuous Normalization
// ============================================

function getEcoliScore(ecoliCount: number | null): number {
    // Rule of Optimistic Fallback (Module 8)
    if (ecoliCount === null) return 100;

    if (ecoliCount === 0) return 100;
    if (ecoliCount >= 1 && ecoliCount <= 10) return 75;
    if (ecoliCount >= 11 && ecoliCount <= 100) return 50;
    return 0;
}

function getChemicalScore(hasPriorityContamination: boolean | null): number {
    if (hasPriorityContamination === null) return 100;
    return hasPriorityContamination ? 0 : 100;
}

function getWaterQualityScore(p: RawWashParameters): number {
    return Math.min(
        getEcoliScore(p.ecoliCount),
        getChemicalScore(p.hasPriorityChemicalContamination)
    );
}

// ============================================
// MODULE 4: Reality Checks (Penalties)
// ============================================

function getSepticRiskMalus(p: RawWashParameters): number {
    return p.sanitationFacility === "flush_septic" ? 5 : 0;
}

function getAffordabilityMalus(p: RawWashParameters): number {
    if (p.waterSource === "borehole_premises") return 0.95;
    if (p.waterSource === "sachet_bottled") return 0.85;
    return 1.0;
}

function getEnvironmentalMalus(p: RawWashParameters): number {
    if (p.waterSource === "sachet_bottled") return 0.9;
    return 1.0;
}

function getContinuityMalus(p: RawWashParameters): number {
    if (p.waterAvailableHours != null) {
        return Math.min(1.0, Math.max(0, p.waterAvailableHours / 24));
    }
    return 1.0; // Optimistic Fallback
}

// ============================================
// MODULE 5 & 6: Sub-Indices & Composite Calculation
// ============================================

/**
 * Executes the entire Computation Engine pipeline (Modules 1-6 and 8).
 * Converts a raw payload into a final, standardized SDG 6 WASH Array of Sub-Indices and a capped Composite Index.
 */
export function calculateWASHIndex(p: RawWashParameters): ComputedIndex {
    // --- 5.1 Water Index ---
    const sSrc = getWaterSourceScore(p);
    const sQual = getWaterQualityScore(p);

    // Exclude entire index calculation if base source is totally unknown (Module 8: Complete Exclusion)
    let iWater = NaN;
    if (!Number.isNaN(sSrc)) {
        const cAfford = getAffordabilityMalus(p);
        const cEnv = getEnvironmentalMalus(p);
        const cCont = getContinuityMalus(p);
        const sSrcAdj = sSrc * cAfford * cEnv * cCont;
        iWater = 0.6 * sSrcAdj + 0.4 * sQual;
    }

    // --- 5.2 Sanitation Index ---
    const sFac = getSanitationFacilityScore(p);

    let iSan = NaN;
    if (!Number.isNaN(sFac)) {
        const pRisk = getSepticRiskMalus(p);
        let sChain = NaN;

        if (p.fsmChain === "safely_managed") sChain = 100;
        if (p.fsmChain === "contained") sChain = 50;
        if (p.fsmChain === "dumped") sChain = 0;

        // Rule of Dynamic Reweighting
        if (Number.isNaN(sChain) || p.fsmChain === null) {
            iSan = sFac - pRisk;
        } else {
            iSan = 0.5 * sFac + 0.5 * sChain - pRisk;
        }
    }

    // --- 5.3 Hygiene Index ---
    const sHyg = getHygieneScore(p);

    let iHyg = NaN;
    if (!Number.isNaN(sHyg)) {
        // MHM Scoring
        let sMhm = NaN;
        if (p.mhmPrivacy !== null && p.mhmMaterials !== null && p.mhmNoExclusion !== null) {
            sMhm = p.mhmPrivacy && p.mhmMaterials && p.mhmNoExclusion ? 100 : 0;
        }

        // Rule of Dynamic Reweighting
        if (Number.isNaN(sMhm)) {
            iHyg = sHyg; // 100% weight to basic hygiene facility
        } else {
            iHyg = 0.5 * sHyg + 0.5 * sMhm;
        }
    }

    // --- 6.1 Composite Index (Weighted: 0.35 Water, 0.35 Sanitation, 0.3 Hygiene) ---
    const weights: [number, number][] = [];
    if (!Number.isNaN(iWater)) weights.push([iWater, 0.35]);
    if (!Number.isNaN(iSan)) weights.push([iSan, 0.35]);
    if (!Number.isNaN(iHyg)) weights.push([iHyg, 0.30]);

    let composite = 0;
    if (weights.length > 0) {
        const totalWeight = weights.reduce((s, [, w]) => s + w, 0);
        composite = weights.reduce((s, [v, w]) => s + v * w, 0) / totalWeight;
    }

    // 🚨 The Critical Failure Cap (Module 6.1)
    let isCapped = false;
    if (
        p.sanitationFacility === "open_defecation" || // OD
        (p.ecoliCount !== null && p.ecoliCount > 100) || // Highly Contaminated
        p.hasPriorityChemicalContamination === true // Toxicity
    ) {
        if (composite > 50) {
            composite = 50;
            isCapped = true;
        }
    }

    return {
        water: Number.isNaN(iWater) ? 0 : iWater,
        sanitation: Number.isNaN(iSan) ? 0 : iSan,
        hygiene: Number.isNaN(iHyg) ? 0 : iHyg,
        composite,
        isCapped,
    };
}
