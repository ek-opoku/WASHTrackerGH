export interface Dataset {
    id: string;
    title: string;
    source: string;
    year: number;
    spatialCoverage: string;
    domain: string;
    format: string;
    sizeMB: number;
    isPremium: boolean;
}

export const mockDatasets: Dataset[] = [
    {
        id: "ds-001",
        title: "National Drinking Water Quality Survey",
        source: "Ghana Statistical Service",
        year: 2023,
        spatialCoverage: "National",
        domain: "Water",
        format: "CSV",
        sizeMB: 24.5,
        isPremium: false,
    },
    {
        id: "ds-002",
        title: "Household Sanitation Access Tracker",
        source: "WHO/JMP",
        year: 2024,
        spatialCoverage: "National",
        domain: "Sanitation",
        format: "CSV",
        sizeMB: 18.2,
        isPremium: false,
    },
    {
        id: "ds-003",
        title: "District-Level WASH Investment Flows",
        source: "USAID",
        year: 2023,
        spatialCoverage: "Regional",
        domain: "Finance",
        format: "JSON/CSV",
        sizeMB: 5.1,
        isPremium: true,
    },
    {
        id: "ds-004",
        title: "High-Resolution Groundwater Depth Analysis",
        source: "Water Resources Commission",
        year: 2024,
        spatialCoverage: "National",
        domain: "Water Resources",
        format: "GeoJSON",
        sizeMB: 145.0,
        isPremium: true,
    },
    {
        id: "ds-005",
        title: "Schools & Healthcare Facilities Hygiene Monitor",
        source: "Ministry of Sanitation and Water Resources",
        year: 2022,
        spatialCoverage: "National",
        domain: "Hygiene",
        format: "CSV",
        sizeMB: 12.8,
        isPremium: false,
    }
];

export interface DataSubmission {
    id: string;
    submittedBy: string;
    timestamp: string;
    region: string;
    district: string;
    status: "Pending" | "Approved" | "Rejected";
    recordCount: number;
}

export const mockSubmissions: DataSubmission[] = [
    {
        id: "sub-101",
        submittedBy: "WaterAid Field Agent",
        timestamp: "2024-10-24T14:32:00Z",
        region: "Ashanti",
        district: "Kumasi",
        status: "Pending",
        recordCount: 450,
    },
    {
        id: "sub-102",
        submittedBy: "Global Communities Monitor",
        timestamp: "2024-10-25T09:15:00Z",
        region: "Northern",
        district: "Tamale",
        status: "Pending",
        recordCount: 820,
    },
    {
        id: "sub-103",
        submittedBy: "Local Gov Survey Team",
        timestamp: "2024-10-26T11:45:00Z",
        region: "Greater Accra",
        district: "Accra",
        status: "Pending",
        recordCount: 1205,
    },
    {
        id: "sub-104",
        submittedBy: "WASH Impact NGO",
        timestamp: "2024-10-20T16:20:00Z",
        region: "Volta",
        district: "Ho",
        status: "Approved",
        recordCount: 310,
    },
    {
        id: "sub-105",
        submittedBy: "Independent Researcher",
        timestamp: "2024-10-18T10:05:00Z",
        region: "Central",
        district: "Cape Coast",
        status: "Rejected",
        recordCount: 55,
    }
];
