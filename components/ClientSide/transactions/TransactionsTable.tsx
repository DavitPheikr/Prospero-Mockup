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
  // Translation map for transaction type
  const typeToIndo: Record<string, string> = {
    "Initial Principal Deposit": "Setoran Pokok Awal",
    "Mandatory Contribution": "Simpanan Wajib",
    "Monthly Interest": "Bunga Bulanan",
    "SHU Profit": "SHU",
    "Voluntary Deposit": "Simpanan Sukarela",
    Withdrawal: "Penarikan",
  };
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
        <p>Tidak ada transaksi untuk filter yang dipilih.</p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <div className={styles.headerCell}>Ref ID</div>
        <div className={styles.headerCell}>Tanggal Transaksi</div>
        <div className={styles.headerCell}>Dari</div>
        <div className={styles.headerCell}>Tipe</div>
        <div className={styles.headerCell}>Jumlah</div>
      </div>

      {/* Make the table body scrollable with a fixed max height */}
      <div
        className={styles.tableBody}
        style={{ maxHeight: "350px", overflowY: "auto" }}
      >
        {transactions.map((transaction, index) => (
          <div
            key={`${transaction.refId}-${index}`}
            className={styles.tableRow}
          >
            <div className={styles.tableCell} data-label="Ref ID:">
              {transaction.refId}
            </div>
            <div className={styles.tableCell} data-label="Tanggal:">
              {transaction.transactionDate}
            </div>
            <div className={styles.tableCell} data-label="Dari:">
              {transaction.from}
            </div>
            <div className={styles.tableCell} data-label="Tipe:">
              {typeToIndo[transaction.type] || transaction.type}
            </div>
            <div
              className={`${styles.tableCell} ${styles.amountCell} ${
                transaction.amount < 0 ? styles.negativeAmount : ""
              }`}
              data-label="Jumlah:"
            >
              {formatAmount(transaction.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
