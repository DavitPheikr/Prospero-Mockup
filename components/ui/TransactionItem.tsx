import styles from "@/scss/components/ui/TransactionItem.module.scss";
import { ArrowDownLeft, TrendingUp, PiggyBank } from "lucide-react";

interface TransactionItemProps {
  id: number;
  type: "incoming" | "outgoing";
  category: "deposit" | "interest" | "shu";
  title: string;
  subtitle: string;
  date: string;
  amount: number;
  onClick?: () => void;
}

export default function TransactionItem({
  type,
  category,
  title,
  subtitle,
  date,
  amount,
  onClick,
}: TransactionItemProps) {
  // Translation maps
  const typeToIndo: Record<string, string> = {
    "Initial Principal Deposit": "Setoran Pokok Awal",
    "Mandatory Contribution": "Simpanan Wajib",
    "Monthly Interest": "Bunga Bulanan",
    "SHU Profit": "SHU",
    "Voluntary Deposit": "Simpanan Sukarela",
    Withdrawal: "Penarikan",
  };
  const categoryToIndo: Record<string, string> = {
    deposit: "Simpanan",
    interest: "Bunga",
    shu: "SHU",
    withdrawals: "Penarikan",
  };
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getTransactionIcon = (category: string) => {
    switch (category) {
      case "deposit":
        return <ArrowDownLeft size={20} />;
      case "interest":
        return <TrendingUp size={20} />;
      case "shu":
        return <PiggyBank size={20} />;
      default:
        return <ArrowDownLeft size={20} />;
    }
  };

  return (
    <div className={styles.transactionItem} onClick={onClick}>
      <div className={styles.iconSection}>
        <div className={`${styles.transactionIcon} ${styles[type]}`}>
          {getTransactionIcon(category)}
        </div>
      </div>

      <div className={styles.transactionDetails}>
        <div className={styles.transactionTitle}>
          {typeToIndo[title] || title}
        </div>
        <div className={styles.transactionSubtitle}>
          {categoryToIndo[subtitle] || subtitle}
        </div>
        <div className={styles.transactionDate}>{date}</div>
      </div>

      <div className={styles.amountSection}>
        <div className={`${styles.amount} ${styles[type]}`}>
          {type === "incoming" ? "+" : "-"} {formatCurrency(amount)}
        </div>
      </div>
    </div>
  );
}
