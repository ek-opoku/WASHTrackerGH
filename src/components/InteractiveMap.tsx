"use client";

import { useMemo, useState, useEffect } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,
    Marker,
} from "react-simple-maps";
import bbox from "@turf/bbox";
import { featureCollection } from "@turf/helpers";

// @ts-ignore
import regionsArc from "../../public/data/gha_regions.geojson";
// @ts-ignore
import districtsArc from "../../public/data/gha_districts.geojson";
// @ts-ignore
import townsArc from "../../public/data/gha_towns.geojson";

export type MetricKey = "compositeScore" | "waterScore" | "sanitationScore" | "hygieneScore";

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

type InteractiveMapProps = {
    metricKey: MetricKey;
    computedData: LiveData[];
    activeRegionName: string | null;
    activeDistrictName: string | null;
    onRegionClick: (name: string) => void;
    onDistrictClick: (name: string) => void;
    onResetMap: () => void;
    onReturnToRegion?: () => void;
};

type Feature = {
    type: "Feature";
    properties: any;
    geometry: any;
};

// Convert ArcGIS JSON to GeoJSON
const regionFeatures: Feature[] = (regionsArc as any).features.map((f: any) => ({
    type: "Feature",
    properties: f.attributes,
    geometry: { type: "Polygon", coordinates: f.geometry.rings },
}));

const districtFeatures: Feature[] = (districtsArc as any).features.map((f: any) => ({
    type: "Feature",
    properties: f.attributes,
    geometry: { type: "Polygon", coordinates: f.geometry.rings },
}));

const townFeatures: Feature[] = (townsArc as any).features.map((f: any) => ({
    type: "Feature",
    properties: {
        name: f.attributes["gh_towns.name"] || f.attributes.name,
        district_name: f.attributes["gha_towns_AddSpatialJoin.adm2_name"] || f.attributes.adm2_name || f.attributes.district,
        region_name: f.attributes["gha_towns_AddSpatialJoin.adm1_name"] || f.attributes.adm1_name || f.attributes.region,
    },
    geometry: { type: "Point", coordinates: [f.geometry.x, f.geometry.y] },
}));

const regionCenters = new Map<string, [number, number]>();
(regionsArc as any).features.forEach((f: any) => {
    if (f.attributes.adm1_name && typeof f.attributes.center_lon === "number") {
        regionCenters.set(f.attributes.adm1_name, [f.attributes.center_lon, f.attributes.center_lat]);
    }
});

const districtCenters = new Map<string, [number, number]>();
(districtsArc as any).features.forEach((f: any) => {
    if (f.attributes.adm2_name && typeof f.attributes.center_lon === "number") {
        districtCenters.set(f.attributes.adm2_name, [f.attributes.center_lon, f.attributes.center_lat]);
    }
});

const DEFAULT_CENTER: [number, number] = [-1.2, 7.9];

export function InteractiveMap({ metricKey, computedData, activeRegionName, activeDistrictName, onRegionClick, onDistrictClick, onResetMap, onReturnToRegion }: InteractiveMapProps) {
    const [position, setPosition] = useState({ coordinates: DEFAULT_CENTER, zoom: 1.2 });
    const [tooltipContent, setTooltipContent] = useState("");

    const [hoveredTownIdx, setHoveredTownIdx] = useState<number | null>(null);

    const handleTownHover = (idx: number, name: string) => {
        setHoveredTownIdx(idx);
        setTooltipContent(`Community: ${name}`);
    };

    const handleTownLeave = () => {
        setHoveredTownIdx(null);
        setTooltipContent("");
    };

    const dataMap = useMemo(() => {
        const map = new Map<string, LiveData>();
        for (const d of computedData) {
            map.set(d.name, d);
        }
        return map;
    }, [computedData]);

    // 5-category classification matching the legend exactly
    const colorScale = (score: number): string => {
        if (score >= 90) return "#10b981"; // Safely Managed (90-100) — Green
        if (score >= 71) return "#3b82f6"; // Good (71-89) — Blue
        if (score >= 51) return "#eab308"; // Basic (51-70) — Yellow
        if (score >= 26) return "#f97316"; // At Risk (26-50) — Orange
        return "#ef4444";                  // Critical (0-25) — Red
    };

    const geographySource = useMemo(() => {
        if (activeDistrictName) {
            return {
                type: "FeatureCollection" as const,
                features: districtFeatures.filter(f => f.properties.adm2_name === activeDistrictName)
            };
        }
        if (activeRegionName) {
            return {
                type: "FeatureCollection" as const,
                features: districtFeatures.filter(f => f.properties.adm1_name === activeRegionName)
            };
        }
        return { type: "FeatureCollection" as const, features: regionFeatures };
    }, [activeRegionName, activeDistrictName]);

    useEffect(() => {
        if (!activeRegionName) {
            setPosition({ coordinates: DEFAULT_CENTER, zoom: 1.2 });
            return;
        }
        if (activeDistrictName && geographySource.features.length > 0) {
            // Calculate precise bounding box of the active district
            const [minLng, minLat, maxLng, maxLat] = bbox(geographySource as any);

            // Calculate center
            const centerLng = (minLng + maxLng) / 2;
            const centerLat = (minLat + maxLat) / 2;

            // Calculate a zoom level that fits the bbox
            // We use a rough heuristic here matching d3 projection scale math
            const lngDiff = maxLng - minLng;
            const latDiff = maxLat - minLat;
            const maxDiff = Math.max(lngDiff, latDiff);

            // 6.5 is a scalar that tends to fit the ghana map layout nicely for a single district
            let calculatedZoom = 6.5 / (maxDiff || 0.1);

            // Clamp zoom to prevent it going way too far in or being too far back
            calculatedZoom = Math.max(3, Math.min(calculatedZoom, 50));

            setPosition({ coordinates: [centerLng, centerLat], zoom: calculatedZoom });
            return;
        }

        // Regional View Default
        const rc = regionCenters.get(activeRegionName);
        if (rc) setPosition({ coordinates: rc, zoom: 3 });
    }, [activeRegionName, activeDistrictName, geographySource]);

    const visibleTowns = activeDistrictName
        ? townFeatures.filter((f) => {
            const dn = f.properties.district_name;
            return dn && (dn === activeDistrictName || dn.includes(activeDistrictName) || activeDistrictName.includes(dn));
        })
        : [];

    return (
        <div className="space-y-2 relative" data-tip="">
            {activeDistrictName ? (
                <button
                    onClick={() => {
                        if (onReturnToRegion) onReturnToRegion();
                    }}
                    className="absolute top-2 right-2 z-10 flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 backdrop-blur px-4 py-2 text-sm font-semibold text-slate-700 shadow-md transition hover:bg-slate-50"
                >
                    Return to Region view
                </button>
            ) : activeRegionName ? (
                <button
                    onClick={onResetMap}
                    className="absolute top-2 right-2 z-10 flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 backdrop-blur px-4 py-2 text-sm font-semibold text-slate-700 shadow-md transition hover:bg-slate-50"
                >
                    Return to National view
                </button>
            ) : null}

            {tooltipContent && (
                <div className="absolute top-2 left-2 z-10 pointer-events-none bg-slate-900/90 text-white px-3 py-1.5 rounded-lg shadow-lg text-sm font-medium z-50">
                    {tooltipContent}
                </div>
            )}

            <div className="h-[360px] w-full md:h-[420px] lg:h-[460px] overflow-hidden rounded-xl bg-white border border-slate-200">
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{ scale: 2500 }}
                    style={{ width: "100%", height: "100%" }}
                >
                    <ZoomableGroup
                        center={position.coordinates}
                        zoom={position.zoom}
                        onMoveEnd={(pos) => setPosition(pos)}
                        minZoom={1}
                        maxZoom={50}
                    >
                        <Geographies geography={geographySource as any}>
                            {({ geographies }: { geographies: any[] }) =>
                                geographies.map((geo: any) => {
                                    const props = geo.properties as any;
                                    const name = !activeRegionName ? props.adm1_name : props.adm2_name;
                                    const metricData = dataMap.get(name);
                                    const score = metricData ? metricData[metricKey] : 0;

                                    // Highlight logic
                                    const isActive = activeDistrictName === name;

                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onMouseEnter={() => {
                                                setTooltipContent(`${name}: ${score.toFixed(1)}`);
                                            }}
                                            onMouseLeave={() => {
                                                setTooltipContent("");
                                            }}
                                            onClick={() => {
                                                if (!activeRegionName) {
                                                    onRegionClick(name);
                                                } else {
                                                    onDistrictClick(name);
                                                }
                                            }}
                                            style={{
                                                default: {
                                                    fill: metricData ? colorScale(score) : "#f1f5f9",
                                                    stroke: activeDistrictName ? "#cbd5e1" : (isActive ? "#000000" : "#cbd5e1"),
                                                    strokeWidth: activeDistrictName ? 0.05 : (isActive ? 2 : (activeRegionName ? 1.5 / position.zoom : 0.6)),
                                                    outline: "none",
                                                },
                                                hover: {
                                                    fill: metricData ? colorScale(score) : "#e2e8f0",
                                                    stroke: activeDistrictName ? "#94a3b8" : (isActive ? "#000000" : "#94a3b8"),
                                                    strokeWidth: activeDistrictName ? 0.05 : (activeRegionName ? 2.5 / position.zoom : 1.5),
                                                    outline: "none",
                                                    cursor: activeDistrictName ? "default" : "pointer"
                                                },
                                                pressed: {
                                                    fill: metricData ? colorScale(score) : "#e2e8f0",
                                                    outline: "none",
                                                },
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>

                        {visibleTowns.map((town, idx) => {
                            const [lon, lat] = town.geometry.coordinates as [number, number];
                            const townName = town.properties.name || "Unknown Community";
                            const isHovered = hoveredTownIdx === idx;
                            return (
                                <Marker key={idx} coordinates={[lon, lat]}>
                                    <circle
                                        r={isHovered ? 0.45 : 0.075}
                                        fill={isHovered ? "#ea580c" : "#f97316"}
                                        stroke="#ffffff"
                                        strokeWidth={isHovered ? 0.075 : 0.03}
                                        onMouseEnter={() => handleTownHover(idx, townName)}
                                        onMouseLeave={handleTownLeave}
                                        onClick={() => {
                                            // TODO: Pull WASH info using townName or spatial ID
                                            console.log(`Clicked on ${townName} - Fetching WASH data`);
                                        }}
                                        style={{
                                            cursor: "pointer",
                                            pointerEvents: "all",
                                            transition: "all 0.2s ease-in-out"
                                        }}
                                    />
                                </Marker>
                            );
                        })}
                    </ZoomableGroup>
                </ComposableMap>
            </div>

            {/* Legend — 5 categories */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-2 text-xs font-medium text-slate-500">
                <div className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-[#ef4444]"></span> Critical (0-25)</div>
                <div className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-[#f97316]"></span> At Risk (26-50)</div>
                <div className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-[#eab308]"></span> Basic (51-70)</div>
                <div className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-[#3b82f6]"></span> Good (71-89)</div>
                <div className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-[#10b981]"></span> Safely Managed (90-100)</div>
            </div>
        </div>
    );
}
