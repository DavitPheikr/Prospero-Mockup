"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { CalendarArrowDown } from "lucide-react";
import styles from "@/scss/components/hasAccount/transactions/TransactionsPage.module.scss";
import TransactionsTable from "./TransactionsTable";
import TransactionFilters from "./TransactionFilters";
import { voluntaryTransactionsData } from "@/data/voluntaryAccountData/transactionsData";
import { mandatoryTransactionsData } from "@/data/mandatoryAccountData/transactionsData";
import { principalTransactionsData } from "@/data/principalAccountData/transactionsData";

interface TransactionsCardProps {
  accountType: "voluntary" | "mandatory" | "principal";
}

export default function TransactionsCard({
  accountType,
}: TransactionsCardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeFilter, setActiveFilter] = useState<
    "all" | "deposits" | "interest" | "shu" | "withdrawals"
  >("all");

  const transactionsData =
    accountType === "voluntary"
      ? voluntaryTransactionsData
      : accountType === "principal"
      ? principalTransactionsData
      : mandatoryTransactionsData;

  // Filter transactions by category
  const filteredTransactions = transactionsData.filter((transaction) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "withdrawals") {
      return transaction.category === "withdrawals";
    }
    return transaction.category === activeFilter;
  });

  // Add error handling for missing data
  if (!transactionsData) {
    return <div>Loading...</div>;
  }

  const handleViewAllTransactions = () => {
    if (accountType === "mandatory") {
      router.push("/account/mandatory/transactions");
    } else if (accountType === "voluntary") {
      router.push("/account/voluntary/transactions");
    } else if (accountType === "principal") {
      router.push("/account/principal/transactions");
    }
  };

  return (
    <div className={styles.transactionsPage}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Transactions History</h1>
          <div className={styles.dateRange}>
            <span className={styles.dateText}>Recent Transactions</span>
            <CalendarArrowDown className={styles.calendarIcon} size={18} />
          </div>
        </div>

        <div className={styles.balanceSection}>
          <div className={styles.balanceCard}>
            <div className={styles.balanceIcon}>Rp</div>
            <div className={styles.balanceContent}>
              <span className={styles.balanceLabel}>Balance</span>
              <span className={styles.balanceAmount}>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <TransactionFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        accountType={accountType}
      />

      <div style={{ flex: 1, overflow: "hidden" }}>
        <TransactionsTable transactions={filteredTransactions.slice(0, 10)} />
      </div>

      <button
        onClick={handleViewAllTransactions}
        className={styles.viewAllButton}
      >
        View All Transactions
      </button>
    </div>
  );
}
