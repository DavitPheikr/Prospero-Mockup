import Navbar from "@/components/navbar";
import TransactionsPage from "@/components/account/transactions/TransactionsPage";

export default function VoluntaryTransactions() {
  return (
    <div>
      <Navbar />
      <TransactionsPage accountType="voluntary" />
    </div>
  );
}
