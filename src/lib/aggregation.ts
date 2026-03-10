import { ComputedIndex } from "./engine";

export interface AggregationEntity {
    id: string;
    population: number;
    scores: ComputedIndex;
}

/**
 * Executes a Population-Weighted Mean upward aggregation (Module 6.2)
 *
 * It aggregates the three sub-indices independently, then re-computes the composite.
 * Note: If a child entity is entirely missing data (scores sum to 0), it is
 * excluded from the weight calculation to prevent artificially dragging down the mean.
 */
export function aggregateIndexScores(
    entities: AggregationEntity[]
): ComputedIndex {
    let totalPopWater = 0;
    let totalPopSan = 0;
    let totalPopHyg = 0;

    let sumWater = 0;
    let sumSan = 0;
    let sumHyg = 0;

    for (const entity of entities) {
        const pop = entity.population;

        // Only aggregate if the data was actually collected (not exactly 0 due to Missing Data Exclusions)
        if (entity.scores.water > 0) {
            sumWater += entity.scores.water * pop;
            totalPopWater += pop;
        }
        if (entity.scores.sanitation > 0) {
            sumSan += entity.scores.sanitation * pop;
            totalPopSan += pop;
        }
        if (entity.scores.hygiene > 0) {
            sumHyg += entity.scores.hygiene * pop;
            totalPopHyg += pop;
        }
    }

    const finalWater = totalPopWater > 0 ? sumWater / totalPopWater : 0;
    const finalSan = totalPopSan > 0 ? sumSan / totalPopSan : 0;
    const finalHyg = totalPopHyg > 0 ? sumHyg / totalPopHyg : 0;

    // Composite: Weighted formula (0.35 Water, 0.35 Sanitation, 0.3 Hygiene)
    const weights: [number, number][] = [];
    if (finalWater > 0) weights.push([finalWater, 0.35]);
    if (finalSan > 0) weights.push([finalSan, 0.35]);
    if (finalHyg > 0) weights.push([finalHyg, 0.30]);

    let finalComposite = 0;
    if (weights.length > 0) {
        const totalWeight = weights.reduce((s, [, w]) => s + w, 0);
        finalComposite = weights.reduce((s, [v, w]) => s + v * w, 0) / totalWeight;
    }

    // If any child triggered the critical failure cap (e.g. Open Defecation in a district),
    // we do NOT currently bubble that cap up blindly to the region unless the Region's
    // *weighted average* falls below 50 anyway. The methodology states the cap applies to the Unit.
    // However, we track if it was capped at this aggregated level just in case.
    const isCapped = finalComposite > 50 && entities.some((e) => e.scores.isCapped);

    if (isCapped) {
        // Optionally: if we want a single OD instance to taint the entire country, we'd cap here.
        // Given population weighting, mathematical averages are safer for macro-scales.
    }

    return {
        water: finalWater,
        sanitation: finalSan,
        hygiene: finalHyg,
        composite: finalComposite,
        isCapped,
    };
}
