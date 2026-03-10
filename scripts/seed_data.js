const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const ROOT = path.join(__dirname, '..');

// Helper to clean "Not in source" and remove citations (like " 1," or " 2")
function cleanString(val) {
    if (val === null || val === undefined) return null;
    let s = String(val).trim();
    if (s.toLowerCase() === 'not in source') return null;
    if (s.match(/(\d+(?:\.\d+)?)%?\s+\d+/)) {
        s = s.split(',')[0].replace(/\s+\d+$/, '').trim();
    }
    if (s.toLowerCase() === 'not in source') return null;
    if (s.includes(';')) {
        s = s.split(';')[0].trim();
    }
    return s;
}

// Convert numeric strings with commas to actual numbers
function parseNumber(val) {
    const cleaned = cleanString(val);
    if (!cleaned) return null;
    const numStr = cleaned.replace(/,/g, '');
    const num = Number(numStr);
    return isNaN(num) ? cleaned : num;
}

// Helper: Given a row and a list of keys, return the key with the max numeric value
function getDominantTrait(row, keys) {
    let maxVal = -1;
    let dominant = keys[0];
    for (const k of keys) {
        const val = parseNumber(row[k]) || 0;
        if (val > maxVal) {
            maxVal = val;
            dominant = k;
        }
    }
    return dominant;
}

// 1. Domestic
async function processDomestic() {
    console.log("Processing Domestic...");

    const outputSchema = [
        'spatial_id', 'domain_tag', 'timestamp', 'source_reliability', 'urban_rural', 'income_level',
        'gender_hh_head', 'age_hh_head', 'disability_present', 'migratory_status',
        'water_source_type', 'water_secondary_source_type', 'water_on_premises', 'water_availability_hours',
        'water_collection_time_mins', 'water_ecoli_cfu', 'water_arsenic_mg', 'water_fluoride_mg',
        'water_mercury_mg', 'water_other_heavy_metals_mg', 'water_ph',
        'san_facility_type', 'san_shared', 'fsm_contained_safely', 'fsm_emptied_safely', 'fsm_treated_at_plant',
        'hyg_facility_type', 'hyg_water_present', 'hyg_soap_present', 'mhm_privacy', 'mhm_materials', 'mhm_participation_exclusion'
    ];

    const records = [];
    const timestamp_now = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');

    // --- 1A. DISTRICT DATA ---
    const distData = xlsx.utils.sheet_to_json(xlsx.readFile(path.join(ROOT, 'Household Water and Sanitation Service Counts by District.xlsx')).Sheets['Table 1']);
    for (const row of distData) {
        if (!row['Region']) continue;
        const total = parseNumber(row['Total_Households']);
        const basicW = parseNumber(row['Basic_Water_Households']);
        const basicS = parseNumber(row['Basic_Sanitation_Households']);

        const basic_water_pct = basicW / total;
        const basic_san_pct = basicS / total;

        const spatial_id = row['Region'].replace(/\s/g, '') + '_' + row['District'].replace(/\s/g, '_');

        const outRow = {};
        for (const col of outputSchema) outRow[col] = '';

        outRow['spatial_id'] = spatial_id;
        outRow['domain_tag'] = 'domestic';
        outRow['timestamp'] = timestamp_now;
        outRow['source_reliability'] = 3;
        outRow['water_source_type'] = basic_water_pct >= 0.50 ? 'Borehole' : 'Surface water';
        outRow['water_collection_time_mins'] = basic_water_pct >= 0.50 ? 15 : 45;
        outRow['san_facility_type'] = basic_san_pct >= 0.50 ? 'VIP latrine' : 'Open defecation';
        outRow['san_shared'] = basic_san_pct >= 0.50 ? 'No' : 'Yes';

        records.push(outRow);
    }

    // --- 1B. REGIONAL DATA ---
    const regWaterData = xlsx.utils.sheet_to_json(xlsx.readFile(path.join(ROOT, 'Main Drinking Water Source and Collection Time by Region.xlsx')).Sheets['Table 1']);
    const regSanData = xlsx.utils.sheet_to_json(xlsx.readFile(path.join(ROOT, 'Toilet Facility and Sanitation Service Levels by Region.xlsx')).Sheets['Table 1']);

    const regSanMap = {};
    for (const r of regSanData) {
        if (r['Region']) regSanMap[r['Region']] = r;
    }

    const waterKeys = ["Pipe_borne_inside_dwelling", "Pipe_borne_outside_compound", "Public_tap_Standpipe", "Borehole_Tube_well", "Protected_well", "Rain_water", "Protected_spring", "Bottled_water", "Sachet_water", "Tanker_supplied", "Unprotected_well", "Unprotected_spring", "Surface_water"];
    const sanKeys = ["No_toilet_facility_Open_Defecation", "Septic_tank", "KVIP_VIP", "Pit_latrine", "Bio_digester", "Sewer", "Public_toilet"];

    // Water mapping dict
    const waterMapToType = {
        "Pipe_borne_inside_dwelling": "Piped into dwelling",
        "Pipe_borne_outside_compound": "Piped to yard/plot",
        "Public_tap_Standpipe": "Public tap/standpipe",
        "Borehole_Tube_well": "Borehole",
        "Protected_well": "Protected well",
        "Rain_water": "Rainwater",
        "Protected_spring": "Protected spring",
        "Bottled_water": "Bottled water",
        "Sachet_water": "Sachet water",
        "Tanker_supplied": "Tanker truck",
        "Unprotected_well": "Unprotected well",
        "Unprotected_spring": "Unprotected spring",
        "Surface_water": "Surface water"
    };

    const sanMapToType = {
        "No_toilet_facility_Open_Defecation": "Open defecation",
        "Septic_tank": "Septic tank",
        "KVIP_VIP": "VIP latrine",
        "Pit_latrine": "Pit latrine without slab",
        "Bio_digester": "Composting toilet",
        "Sewer": "Piped sewer system",
        "Public_toilet": "Public toilet"
    };

    for (const wRow of regWaterData) {
        const region = wRow['Region'];
        if (!region || cleanString(region) === 'Region') continue;
        const sRow = regSanMap[region] || {};

        const spatial_id = region.replace(/\s/g, '') + '_Region';

        const outRow = {};
        for (const col of outputSchema) outRow[col] = '';

        outRow['spatial_id'] = spatial_id;
        outRow['domain_tag'] = 'domestic';
        outRow['timestamp'] = timestamp_now;
        outRow['source_reliability'] = 3;

        // Determine dominant water
        const domW = getDominantTrait(wRow, waterKeys);
        outRow['water_source_type'] = waterMapToType[domW] || 'Borehole';

        // Times
        const onPrem = parseNumber(wRow['Water_on_premises']) || 0;
        const close = parseNumber(wRow['Within_30_minutes']) || 0;
        const far = (parseNumber(wRow['31_to_60_minutes']) || 0) + (parseNumber(wRow['61_minutes_and_above']) || 0);

        outRow['water_collection_time_mins'] = (onPrem + close) >= far ? 15 : 45;

        // Determine dominant sanitation
        const domS = getDominantTrait(sRow, sanKeys);
        outRow['san_facility_type'] = sanMapToType[domS] || 'Open defecation';

        const excl = parseNumber(sRow['Basic_service_exclusive_use']) || 0;
        const shared = parseNumber(sRow['Limited_service_shared']) || 0;
        outRow['san_shared'] = shared > excl ? 'Yes' : 'No';

        records.push(outRow);
    }

    // --- 1C. NATIONAL / CITY DATA FIXES ---
    // National Hygiene
    const hygData = xlsx.utils.sheet_to_json(xlsx.readFile(path.join(ROOT, 'Ghana 2024 National and Regional Hygiene Data Aggregates.xlsx')).Sheets['Table 1']);
    // Just add one national row
    const natRow = {};
    for (const col of outputSchema) natRow[col] = '';
    natRow['spatial_id'] = 'Ghana_National';
    natRow['domain_tag'] = 'domestic';
    natRow['timestamp'] = timestamp_now;
    natRow['source_reliability'] = 3;

    // Find basic hygiene coverage
    let hasSoap = 'No';
    for (const row of hygData) {
        if (row['Country'] === 'Ghana' && row['Service_level'] === 'Basic service') {
            const covStr = cleanString(row['Coverage_Percentage']);
            if (covStr && parseFloat(covStr) >= 50) {
                hasSoap = 'Yes';
            }
        }
    }
    natRow['hyg_facility_type'] = 'Fixed sink'; // Assuming standard
    natRow['hyg_soap_present'] = hasSoap;
    natRow['hyg_water_present'] = hasSoap;
    records.push(natRow);

    // City Water Quality
    const wqData = xlsx.utils.sheet_to_json(xlsx.readFile(path.join(ROOT, 'Water Quality Testing Results for Kumasi and Tamale.xlsx')).Sheets['Table 1']);
    // Find Kumasi and Tamale records and update if they exist, else append.
    // They should already exist in the distData as Ashanti_Kumasi_Metropolitan_Area and Northern_Tamale_Metropolitan_Area
    const wqMap = {
        'Kumasi': 'Ashanti_Kumasi_Metropolitan_Area',
        'Tamale': 'Northern_Tamale_Metropolitan_Area'
    };

    for (const cw of Object.keys(wqMap)) {
        // Look through wqData to find >0 CFU. For simplicity we'll just check if the 0 CFU rate is less than 50%
        let zeroCfuCount = 0;
        let totalCount = 0;
        for (const row of wqData) {
            if (row['City'] === cw && String(row['Test_Parameter']).includes('E. coli')) {
                const val = parseFloat(cleanString(row['Value_or_Percentage']) || '0');
                totalCount += val;
                if (String(row['Test_Parameter']).includes('0 CFU')) {
                    zeroCfuCount += val;
                }
            }
        }

        let ecoli = 0;
        if (totalCount > 0 && (zeroCfuCount / totalCount) < 0.50) {
            ecoli = 5; // Representative failure level
        }

        const spatialId = wqMap[cw];
        let existingRec = records.find(r => r.spatial_id === spatialId);
        if (!existingRec) {
            existingRec = {};
            for (const col of outputSchema) existingRec[col] = '';
            existingRec['spatial_id'] = spatialId;
            existingRec['domain_tag'] = 'domestic';
            existingRec['timestamp'] = timestamp_now;
            existingRec['source_reliability'] = 3;
            records.push(existingRec);
        }

        existingRec['water_ecoli_cfu'] = ecoli;
    }

    const cw = createCsvWriter({
        path: path.join(ROOT, 'domestic_seed.csv'),
        header: outputSchema.map(h => ({ id: h, title: h }))
    });

    await cw.writeRecords(records);
    console.log(`Saved domestic_seed.csv with ${records.length} records.`);
}

// 2. Macro
async function processMacro() {
    console.log("Processing Macro...");
    const filePath = path.join(ROOT, 'Ghana National SDG 6.3 - 6.b Macro Performance Indicators.xlsx');
    const wb = xlsx.readFile(filePath);
    const sheetData = xlsx.utils.sheet_to_json(wb.Sheets['Table 1'], { defval: '' });

    const rawKeys = Object.keys(sheetData[0] || {});
    const headerMap = {};
    const outputSchema = [];

    for (const k of rawKeys) {
        let normalized = k.toLowerCase().trim().replace(/[^a-z0-9_]+/g, '_');
        headerMap[k] = normalized;
        outputSchema.push(normalized);
    }

    const records = [];
    for (const row of sheetData) {
        const outRow = {};
        for (const k of rawKeys) {
            let val = row[k];
            val = cleanString(val);
            outRow[headerMap[k]] = val === null ? '' : val;
        }
        records.push(outRow);
    }

    const cw = createCsvWriter({
        path: path.join(ROOT, 'macro_seed.csv'),
        header: outputSchema.map(h => ({ id: h, title: h }))
    });

    await cw.writeRecords(records);
    console.log(`Saved macro_seed.csv with ${records.length} records.`);
}

// 3. Institutional (Dummy/Empty since user hasn't provided the exact schema)
async function processInstitutional() {
    console.log("Processing Institutional...");
    const outputSchema = [
        'spatial_id', 'domain_tag', 'institution_type', 'water_source_type', 'san_facility_type', 'hyg_facility_type'
    ];
    const cw = createCsvWriter({
        path: path.join(ROOT, 'institutional_seed.csv'),
        header: outputSchema.map(h => ({ id: h, title: h }))
    });
    await cw.writeRecords([]);
    console.log(`Saved institutional_seed.csv with 0 records (no raw file present).`);
}

async function run() {
    try {
        await processDomestic();
        await processMacro();
        await processInstitutional();
        console.log("Success! All seed files generated.");
    } catch (e) {
        console.error(e);
    }
}

run();
