export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import HygieneDashboardClient from './HygieneDashboardClient';

export default async function HygienePage() {
  // Fetch live pre-calculated data from PostgreSQL
  const computedData = await prisma.computedIndex.findMany();

  // Stringify and parse complex JSON arrays to avoid React hydration mismatches on Server Component boundaries
  return <HygieneDashboardClient computedData={JSON.parse(JSON.stringify(computedData))} />;
}
