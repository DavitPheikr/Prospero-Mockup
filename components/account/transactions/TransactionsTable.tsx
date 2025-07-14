import styles from "@/scss/components/hasAccount/transactions/TransactionsTable.module.scss";

// Unified transaction interface that can handle all account types
interface UnifiedTransaction {
  refId: string;
  transactionDate: string;
  from: string;
  type: string;
  amount: number;
  category: "deposits" | "interest" | "shu" | "withdrawals";
}

interface TransactionsTableProps {
  transactions: UnifiedTransaction[];
}

export default function TransactionsTable({
  transactions,
}: TransactionsTableProps) {
  const formatAmount = (amount: number) => {
    const isNegative = amount < 0;
    const absoluteAmount = Math.abs(amount);
    const formatted = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(absoluteAmount);

    return isNegative ? `-${formatted}` : formatted;
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No transactions found for the selected filter.</p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <div className={styles.headerCell}>Ref ID</div>
        <div className={styles.headerCell}>Transaction Date</div>
        <div className={styles.headerCell}>From</div>
        <div className={styles.headerCell}>Type</div>
        <div className={styles.headerCell}>Amount</div>
      </div>

      <div className={styles.tableBody}>
        {transactions.map((transaction, index) => (
          <div
            key={`${transaction.refId}-${index}`}
            className={styles.tableRow}
          >
            <div className={styles.tableCell} data-label="Ref ID:">
              {transaction.refId}
            </div>
            <div className={styles.tableCell} data-label="Date:">
              {transaction.transactionDate}
            </div>
            <div className={styles.tableCell} data-label="From:">
              {transaction.from}
            </div>
            <div className={styles.tableCell} data-label="Type:">
              {transaction.type}
            </div>
            <div
              className={`${styles.tableCell} ${styles.amountCell} ${
                transaction.amount < 0 ? styles.negativeAmount : ""
              }`}
              data-label="Amount:"
            >
              {formatAmount(transaction.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
