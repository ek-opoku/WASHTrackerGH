export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import SanitationDashboardClient from './SanitationDashboardClient';

export default async function SanitationPage() {
  // Fetch live pre-calculated data from PostgreSQL
  const computedData = await prisma.computedIndex.findMany();

  // Stringify and parse complex JSON arrays to avoid React hydration mismatches on Server Component boundaries
  return <SanitationDashboardClient computedData={JSON.parse(JSON.stringify(computedData))} />;
}
