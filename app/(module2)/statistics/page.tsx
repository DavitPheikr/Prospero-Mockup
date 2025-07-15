import Navbar from "@/components/layout/Navbar";
import SideNavbar from "@/components/layout/SideNavbar";
import StatsPage from "@/components/account/statistics/statsPage";

export default function StatisticsPage() {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <SideNavbar />
        <main style={{ flex: 1 }}>
          <StatsPage accountType="all" />
        </main>
      </div>
    </>
  );
}
