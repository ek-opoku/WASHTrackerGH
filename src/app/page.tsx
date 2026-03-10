export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import { MapContainer } from "@/components/MapContainer";

// Revalidate to ensure fresh database pulls on hard navigation, caching per request.
export const revalidate = 60;

export default async function DashboardPage() {
  const computedData = await prisma.computedIndex.findMany();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-cyan-400">Dashboard</h2>
        <p className="max-w-2xl text-sm text-slate-400">
          Explore Ghana&apos;s WASH landscape. Click regions and districts on the
          map to drill into real-time composite, water, sanitation, and hygiene performance.
        </p>
      </div>
      <MapContainer computedData={computedData} metricType="composite" />
    </div>
  );
}
