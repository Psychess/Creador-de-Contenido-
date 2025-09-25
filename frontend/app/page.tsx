import { DashboardLayout } from '@/components/common/DashboardLayout';
import { TrendsDashboard } from '@/components/dashboard/TrendsDashboard';
import { CreateContentButton } from '@/components/common/CreateContentButton';

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">TrendCraft Studio</h1>
            <p className="text-muted-foreground">
              Create viral content with AI-powered trend analysis
            </p>
          </div>
          <CreateContentButton />
        </div>

        {/* Main Content */}
        <TrendsDashboard />
      </div>
    </DashboardLayout>
  );
}