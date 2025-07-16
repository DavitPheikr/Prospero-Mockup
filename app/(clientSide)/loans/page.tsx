import Navbar from "@/components/layout/Navbar";
import SideNavbar from "@/components/layout/SideNavbar";
import LoansPage from "@/components/ClientSide/loans/LoansPage";
export default function Loans() {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <SideNavbar />
        <main></main>
        <LoansPage />
      </div>
    </>
  );
}
