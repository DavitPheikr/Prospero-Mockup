import Navbar from "@/components/layout/Navbar";
import SideNavbar from "@/components/layout/SideNavbar";
import TransactionsPage from "@/components/ClientSide/transactions/TransactionsPage";

export default function MandatoryTransactions() {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <SideNavbar />
        <main style={{ flex: 1 }}>
          <TransactionsPage />
        </main>
      </div>
    </>
  );
}
