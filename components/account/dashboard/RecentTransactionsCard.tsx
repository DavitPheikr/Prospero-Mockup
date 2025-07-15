"use client";
import { useRouter } from "next/navigation";
import styles from "@/scss/components/hasAccount/RecentTransactionsCard.module.scss";
import Button from "@/components/ui/Button";
import TransactionItem from "@/components/ui/TransactionItem";
import { transactionsData as mandatoryTransactionsData } from "@/data/mandatoryAccountData/data";
import { transactionsData as voluntaryTransactionsData } from "@/data/voluntaryAccountData/data";
import { transactionsData as principalTransactionsData } from "@/data/principalAccountData/data";
import { transactionsData as newVoluntaryTransactionsData } from "@/data/newVoluntaryAccountData/data";

interface RecentTransactionsCardProps {
  type: string;
}

export default function RecentTransactionsCard({
  type,
}: RecentTransactionsCardProps) {
  const router = useRouter();

  const transactionsData =
    type === "voluntary"
      ? newVoluntaryTransactionsData
      : type === "principal"
      ? principalTransactionsData
      : type === "voluntary-data"
      ? voluntaryTransactionsData
      : mandatoryTransactionsData;

  const handleTransactionClick = (id: number) => {
    console.log(`Transaction ${id} clicked`);
  };

  const handleViewAllTransactions = () => {
    if (type === "mandatory") {
      router.push("/transactions?type=mandatory");
    } else if (type === "voluntary") {
      router.push("/transactions?type=voluntary");
    } else if (type === "voluntary-data") {
      router.push("/transactions?type=voluntary-data");
    } else if (type === "principal") {
      router.push("/transactions?type=principal");
    } else {
      router.push("/transactions?type=all");
    }
  };

  return (
    <div className={styles.transactionsCard}>
      <div className={styles.header}>
        <h3 className={styles.title}>Recent Transactions</h3>
      </div>

      <div className={styles.transactionsList}>
        {transactionsData.length > 0 ? (
          transactionsData.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              {...transaction}
              onClick={() => handleTransactionClick(transaction.id)}
            />
          ))
        ) : (
          <div
            style={{
              padding: "2rem",
              textAlign: "center",
              color: "#666",
            }}
          >
            No transactions yet
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <Button
          className={styles.viewAllButton}
          onClick={handleViewAllTransactions}
        >
          View All Transactions
        </Button>
      </div>
    </div>
  );
}
