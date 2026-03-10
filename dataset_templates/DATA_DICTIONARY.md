# WASHTrackerGH - Data Ingestion Dictionary

To properly seed the application using the `/api/admin/compute-all/route.ts` engine, your CSV files **must** adhere to specific column headers and normalized string values.

## File Format
- Must be a comma-separated `.csv` file.
- The first row MUST be exactly the headers defined in the `WASH_Domestic_Template.csv`.

---

## Allowed Mathematical Values (The JMP Framework)
The Computation Engine strictly parses these specific string values (case-insensitive) to calculate the JMP Service Ladders (Safely Managed, Basic, Limited, Unimproved, Surface Water / Open Defecation). 

If you use strings outside of this list, the engine will likely fall back to default penalties.

### 1. Water Source (`water_source_type` & `water_secondary_source_type`)
- `Piped into dwelling` (Highest score)
- `Piped to yard`
- `Borehole`
- `Sachet` or `Bottled`
- `Public tap` or `Standpipe`
- `Protected well` or `Protected spring` or `Rainwater`
- `Unprotected well` or `Unprotected spring`
- `Tanker truck`
- `Surface water` (Lowest score)

### 2. Sanitation Facility (`san_facility_type`)
- `Piped sewer system` (Highest score)
- `Septic tank`
- `VIP` or `Composting toilet`
- `Pit latrine without slab`
- `Open defecation` or `No facility` (Lowest score)

### 3. Hygiene Facility (`hyg_facility_type`)
- `Fixed sink` (Highest score)
- `Mobile device` or `Handwashing station`
- `None` or `No facility` (Lowest score)

### 4. Boolean Flags
For any column expecting a Yes/No answer (e.g., `water_on_premises`, `san_shared`, `hyg_water_present`, `fsm_contained_safely`):
- **True Values:** `Yes`, `True`, `1`
- **False Values:** `No`, `False`, `0`

### 5. Numerical Fields
- `water_availability_hours`: Float (e.g., `24`, `12.5`)
- `water_collection_time_mins`: Float (e.g., `0`, `15`)
- `water_ecoli_cfu`: Float (e.g., `0`, `50`)
- `water_arsenic_mg`: Float (e.g., `0`, `0.05`)
- Other chemical fields: `water_fluoride_mg`, `water_mercury_mg`, `water_ph`

---

## Spatial Matching constraints (`spatial_id`)
To guarantee that your statistical rows map perfectly to the Interactive Map polygons, the `spatial_id` column should follow a generic naming scheme: `[RegionName]_[DistrictName]`. 

However, because district names on external censuses often differ slightly from geospatial system shapes (e.g. `Accra Metropolis` vs `Accra Metropolitan`), the system uses a **fuzzy matcher and alias map** internally, which will automatically strip all spaces/punctuation to map strings like `Greater_Accra_Accra_Metropolis` directly to the `Accra Metropolitan` GeoJSON polygon automatically.
