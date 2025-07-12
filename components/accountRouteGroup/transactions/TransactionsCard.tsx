"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { CalendarArrowDown } from "lucide-react";
import styles from "@/scss/components/hasAccount/transactions/TransactionsPage.module.scss";
import TransactionsTable from "./TransactionsTable";
import TransactionFilters from "./TransactionFilters";
import { voluntaryTransactionsData } from "@/data/voluntaryAccountData/transactionsData";
import { mandatoryTransactionsData } from "@/data/mandatoryAccountData/transactionsData";

interface TransactionsPageProps {
  accountType: "voluntary" | "mandatory";
}

export default function TransactionsPage({
  accountType,
}: TransactionsPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeFilter, setActiveFilter] = useState<
    "all" | "deposits" | "interest" | "shu"
  >("all");

  const transactionsData =
    accountType === "voluntary"
      ? voluntaryTransactionsData
      : mandatoryTransactionsData;

  // Create mock account data since the imports aren't working
  const mockAccountData = {
    balance: accountType === "voluntary" ? 125000 : 85000,
  };

  const filteredTransactions = transactionsData.filter((transaction) => {
    if (activeFilter === "all") return true;
    return transaction.category === activeFilter;
  });

  // Add error handling for missing data
  if (!transactionsData) {
    return <div>Loading...</div>;
  }

  // Extract account type from current path
  const accountTypeMatch = pathname.match(/\/my-account\/([^\/]+)/);
  const accountTypeFromPath = accountTypeMatch
    ? accountTypeMatch[1]
    : "voluntary";

  const handleViewAllTransactions = () => {
    router.push(`/my-account/${accountTypeFromPath}/transactions`);
  };

  return (
    <div className={styles.transactionsPage}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Transactions History</h1>
          <div className={styles.dateRange}>
            <span className={styles.dateText}>Sep 9, 2024 - Sep 15, 2024</span>
            <CalendarArrowDown className={styles.calendarIcon} size={18} />
          </div>
        </div>

        <div className={styles.balanceSection}>
          <div className={styles.balanceCard}>
            <div className={styles.balanceIcon}>$</div>
            <div className={styles.balanceContent}>
              <span className={styles.balanceLabel}>Balance</span>
              <span className={styles.balanceAmount}>
                ${mockAccountData.balance.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <TransactionFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <TransactionsTable transactions={filteredTransactions} />

      <button
        onClick={handleViewAllTransactions}
        className={styles.viewAllButton}
      >
        View All Transactions
      </button>
    </div>
  );
}
