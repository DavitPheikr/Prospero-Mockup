import StatsPage from "@/components/account/statistics/statsPage";
import MainLayout from "@/components/layout/MainLayout";

export default function StatisticsPage() {
  return (
    <MainLayout>
      <StatsPage accountType="all" />
    </MainLayout>
  );
}
