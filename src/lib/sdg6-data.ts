export interface SDGTarget {
    id: string;
    name: string;
    vBase: number;
    yBase: number;
    vCurr: number;
    yCurr: number;
    vTarget: number;
    yTarget: number;
}

export const mockSDGTargets: SDGTarget[] = [
    {
        id: "6.1.1",
        name: "Safely Managed Drinking Water",
        vBase: 70.0,
        yBase: 2015,
        vCurr: 90.0, // Progressed enough to be ON_TRACK
        yCurr: 2024,
        vTarget: 100,
        yTarget: 2030,
    },
    {
        id: "6.2.1a",
        name: "Safely Managed Sanitation",
        vBase: 40.0,
        yBase: 2015,
        vCurr: 60.0, // Progressed but needs acceleration: AT_RISK
        yCurr: 2024,
        vTarget: 100,
        yTarget: 2030,
    },
    {
        id: "6.2.1b",
        name: "Basic Handwashing Facilities",
        vBase: 41.4,
        yBase: 2015,
        vCurr: 45.5, // Following prompt exact values (mathematically AT_RISK if HRP > 0)
        yCurr: 2024,
        vTarget: 100,
        yTarget: 2030,
    },
    {
        id: "6.3.1",
        name: "Wastewater Safely Treated",
        vBase: 50.0,
        yBase: 2015,
        vCurr: 60.0, // AT_RISK
        yCurr: 2024,
        vTarget: 100,
        yTarget: 2030,
    },
    {
        id: "6.3.2",
        name: "Good Ambient Water Quality",
        vBase: 60.0,
        yBase: 2015,
        vCurr: 85.0, // ON_TRACK
        yCurr: 2024,
        vTarget: 100,
        yTarget: 2030,
    },
    {
        id: "6.4.1",
        name: "Water Use Efficiency",
        vBase: 50.0,
        yBase: 2015,
        vCurr: 80.0, // ON_TRACK
        yCurr: 2024,
        vTarget: 100,
        yTarget: 2030,
    },
    {
        id: "6.4.2",
        name: "Level of Water Stress",
        vBase: 60.0,
        yBase: 2015,
        vCurr: 55.0, // Regressed: OFF_TRACK
        yCurr: 2024,
        vTarget: 100,
        yTarget: 2030,
    },
    {
        id: "6.5.1",
        name: "IWRM Implementation",
        vBase: 30.0,
        yBase: 2015,
        vCurr: 50.0, // AT_RISK
        yCurr: 2024,
        vTarget: 100,
        yTarget: 2030,
    },
    {
        id: "6.5.2",
        name: "Transboundary Water Cooperation",
        vBase: 60.0,
        yBase: 2015,
        vCurr: 90.0, // ON_TRACK
        yCurr: 2024,
        vTarget: 100,
        yTarget: 2030,
    },
    {
        id: "6.6.1",
        name: "Water-Related Ecosystems",
        vBase: 70.0,
        yBase: 2015,
        vCurr: 65.0, // Regressed: OFF_TRACK
        yCurr: 2024,
        vTarget: 100,
        yTarget: 2030,
    },
    {
        id: "6.a.1",
        name: "International Cooperation / ODA",
        vBase: 40.0,
        yBase: 2015,
        vCurr: 55.0, // AT_RISK
        yCurr: 2024,
        vTarget: 100,
        yTarget: 2030,
    },
    {
        id: "6.b.1",
        name: "Community Participation",
        vBase: 60.0,
        yBase: 2015,
        vCurr: 85.0, // ON_TRACK
        yCurr: 2024,
        vTarget: 100,
        yTarget: 2030,
    }
];
