"use client";

import { useState } from "react";
import styles from "@/scss/components/hasAccount/transactions/TransactionsPage.module.scss";
import TransactionsTable from "./TransactionsTable";
import TransactionFilters from "./TransactionFilters";
import DateRangePicker from "./DateRangePicker";
import { voluntaryTransactionsData } from "@/data/voluntaryAccountData/transactionsData";
import { mandatoryTransactionsData } from "@/data/mandatoryAccountData/transactionsData";

interface TransactionsPageProps {
  accountType: "voluntary" | "mandatory";
}

export default function TransactionsPage({
  accountType,
}: TransactionsPageProps) {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "deposits" | "interest" | "shu"
  >("all");

  // Date interval state
  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);

  const [dateInterval, setDateInterval] = useState({
    startDate: weekAgo,
    endDate: today,
  });

  // State to track if date filtering is active (user has selected a specific range)
  const [isDateFilterActive, setIsDateFilterActive] = useState(false);

  const transactionsData =
    accountType === "voluntary"
      ? voluntaryTransactionsData
      : mandatoryTransactionsData;

  // Create mock account data
  const mockAccountData = {
    balance: accountType === "voluntary" ? 125000 : 85000,
  };

  // Helper function to parse transaction dates
  const parseTransactionDate = (dateString: string): Date => {
    // Handle formats like "Sep 9, 2024, 04:30pm" or "Sep 9, 2024"
    const cleanDateString = dateString.replace(/,\s*\d{1,2}:\d{2}[ap]m$/i, "");
    return new Date(cleanDateString);
  };

  // Filter transactions by date range and category
  const filteredTransactions = transactionsData.filter((transaction) => {
    // First filter by category
    const categoryMatch =
      activeFilter === "all" || transaction.category === activeFilter;

    if (!categoryMatch) return false;

    // If date filtering is not active, show all transactions
    if (!isDateFilterActive) return true;

    // Filter by date range when date filtering is active
    const transactionDate = parseTransactionDate(transaction.transactionDate);
    const startOfDay = new Date(dateInterval.startDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(dateInterval.endDate);
    endOfDay.setHours(23, 59, 59, 999);

    return transactionDate >= startOfDay && transactionDate <= endOfDay;
  });

  // Handle date range changes - this activates date filtering
  const handleDateIntervalChange = (interval: {
    startDate: Date;
    endDate: Date;
  }) => {
    setDateInterval(interval);
    setIsDateFilterActive(true);
  };

  // Handle loading transactions based on date range
  const handleLoadTransactions = (
    startDate: Date | null,
    endDate: Date | null
  ) => {
    if (startDate === null || endDate === null) {
      // Deactivate date filtering to show all transactions
      setIsDateFilterActive(false);
    } else {
      // Load transactions for specific date range
      setDateInterval({ startDate, endDate });
      setIsDateFilterActive(true);
    }
  };

  // Add error handling for missing data
  if (!transactionsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.transactionsPage}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Transactions History</h1>
          <div className={styles.dateRange}>
            <DateRangePicker
              dateInterval={dateInterval}
              onDateIntervalChange={handleDateIntervalChange}
              onLoadTransactions={handleLoadTransactions}
              isDateFilterActive={isDateFilterActive}
              className={styles.dateText}
            />
          </div>
        </div>
      </div>

      <TransactionFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div style={{ flex: 1, overflow: "hidden" }}>
        <TransactionsTable transactions={filteredTransactions} />
      </div>
    </div>
  );
}
