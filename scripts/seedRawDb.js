const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const fileContent = fs.readFileSync('domestic_seed.csv', 'utf8');
    const lines = fileContent.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(h => h.trim());

    const records = [];
    for (let i = 1; i < lines.length; i++) {
        // Basic CSV splitting (assuming no commas inside quotes in this specific dataset based on its preview)
        const values = lines[i].split(',');

        const getVal = (colName) => {
            const idx = headers.indexOf(colName);
            if (idx === -1) return null;
            const val = values[idx]?.trim();
            return val === '' ? null : val;
        };

        const getFloat = (colName) => {
            const val = getVal(colName);
            return val ? parseFloat(val) : null;
        };

        const getInt = (colName) => {
            const val = getVal(colName);
            return val ? parseInt(val, 10) : null;
        };

        const getBoolean = (colName) => {
            const val = getVal(colName);
            if (!val) return null;
            if (val.toLowerCase() === 'yes' || val.toLowerCase() === 'true' || val === '1') return true;
            if (val.toLowerCase() === 'no' || val.toLowerCase() === 'false' || val === '0') return false;
            return null;
        };

        records.push({
            spatial_id: getVal('spatial_id'),
            domain_tag: getVal('domain_tag'),
            timestamp: getVal('timestamp') ? new Date(getVal('timestamp')) : null,
            source_reliability: getInt('source_reliability'),
            urban_rural: getVal('urban_rural'),
            income_level: getVal('income_level'),
            gender_hh_head: getVal('gender_hh_head'),
            age_hh_head: getInt('age_hh_head'),
            disability_present: getBoolean('disability_present'),
            migratory_status: getVal('migratory_status'),

            water_source_type: getVal('water_source_type'),
            water_secondary_source_type: getVal('water_secondary_source_type'),
            water_on_premises: getBoolean('water_on_premises'),
            water_availability_hours: getFloat('water_availability_hours'),
            water_collection_time_mins: getFloat('water_collection_time_mins'),
            water_ecoli_cfu: getFloat('water_ecoli_cfu'),
            water_arsenic_mg: getFloat('water_arsenic_mg'),
            water_fluoride_mg: getFloat('water_fluoride_mg'),
            water_mercury_mg: getFloat('water_mercury_mg'),
            water_other_heavy_metals_mg: getFloat('water_other_heavy_metals_mg'),
            water_ph: getFloat('water_ph'),

            san_facility_type: getVal('san_facility_type'),
            san_shared: getVal('san_shared'),
            fsm_contained_safely: getBoolean('fsm_contained_safely'),
            fsm_emptied_safely: getBoolean('fsm_emptied_safely'),
            fsm_treated_at_plant: getBoolean('fsm_treated_at_plant'),

            hyg_facility_type: getVal('hyg_facility_type'),
            hyg_water_present: getVal('hyg_water_present'),
            hyg_soap_present: getVal('hyg_soap_present'),

            mhm_privacy: getVal('mhm_privacy'),
            mhm_materials: getVal('mhm_materials'),
            mhm_participation_exclusion: getVal('mhm_participation_exclusion'),
        });
    }

    console.log(`Parsed ${records.length} records. Uploading to Prisma...`);

    // Clear existing
    await prisma.rawDomesticData.deleteMany({});

    for (const record of records) {
        if (!record.spatial_id) continue;
        await prisma.rawDomesticData.create({ data: record });
    }

    console.log('Seed Done!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
