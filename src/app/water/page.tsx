export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import WaterDashboardClient from './WaterDashboardClient';

export default async function WaterPage() {
    // Fetch live pre-calculated data from PostgreSQL
    const computedData = await prisma.computedIndex.findMany();

    // We intentionally stringify and parse complex JSON arrays to avoid React hydration mismatches on Server Component boundaries
    return <WaterDashboardClient computedData={JSON.parse(JSON.stringify(computedData))} />;
}
