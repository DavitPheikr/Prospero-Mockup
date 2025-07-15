import Navbar from "@/components/layout/Navbar";
import SideNavbar from "@/components/layout/SideNavbar";
import Main from "@/components/account/dashboard/Main";

export default function VoluntaryDashboard() {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <SideNavbar />
        <main style={{ flex: 1 }}>
          <Main type="voluntary" />
        </main>
      </div>
    </>
  );
}
