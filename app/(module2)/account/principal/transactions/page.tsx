import Navbar from "@/components/navbar";
import TransactionsPage from "@/components/account/transactions/TransactionsPage";

export default function PrincipalTransactions() {
  return (
    <div>
      <Navbar />
      <TransactionsPage accountType="principal" />
    </div>
  );
}
