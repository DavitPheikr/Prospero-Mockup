"use client";
import styles from "@/scss/components/hasAccount/RecentTransactionsCard.module.scss";
import Button from "@/components/ui/Button";
import TransactionItem from "@/components/ui/TransactionItem";
import { transactionsData as mandatoryTransactionsData } from "@/data/mandatoryAccountData/data";
import { transactionsData as voluntaryTransactionsData } from "@/data/voluntaryAccountData/data";
import { transactionsData as dynamicTransactionsData } from "@/data/dynamicAccountData/data";

interface RecentTransactionsCardProps {
  type: string;
}

export default function RecentTransactionsCard({
  type,
}: RecentTransactionsCardProps) {
  const transactionsData =
    type === "voluntary"
      ? voluntaryTransactionsData
      : type === "dynamic"
      ? dynamicTransactionsData
      : mandatoryTransactionsData;

  const handleTransactionClick = (id: number) => {
    console.log(`Transaction ${id} clicked`);
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
        <Button className={styles.viewAllButton}>View All Transactions</Button>
      </div>
    </div>
  );
}
