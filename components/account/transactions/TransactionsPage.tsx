"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import styles from "@/scss/components/hasAccount/transactions/TransactionsPage.module.scss";
import TransactionsTable from "./TransactionsTable";
import TransactionFilters from "./TransactionFilters";
import DateRangePicker from "./DateRangePicker";
import { voluntaryTransactionsData } from "@/data/voluntaryAccountData/transactionsData";
import { mandatoryTransactionsData } from "@/data/mandatoryAccountData/transactionsData";
import { principalTransactionsData } from "@/data/principalAccountData/transactionsData";
import { newVoluntaryTransactionsData } from "@/data/newVoluntaryAccountData/transactionsData";
import { allTransactionsData } from "@/data/allData/transactionsData";
import BackTo from "@/components/ui/BackTo";
import AccountSelector from "@/components/account/statistics/accountSelector";
import { a } from "motion/react-client";

export default function TransactionsPage() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const [accountType, setAccountType] = useState<
    "mandatory" | "principal" | "voluntary" | "voluntary-data" | "all" | null
  >(null);

  useEffect(() => {
    const validTypes = [
      "mandatory",
      "principal",
      "voluntary",
      "voluntary-data",
      "all",
    ] as const;

    if (typeParam) {
      if (validTypes.includes(typeParam as (typeof validTypes)[number])) {
        setAccountType(typeParam as (typeof validTypes)[number]);
      } else {
        setAccountType(null);
      }
    } else {
      // If no type param, default to 'all'
      setAccountType("all");
    }
  }, [typeParam]);

  const [activeFilter, setActiveFilter] = useState<
    "all" | "deposits" | "interest" | "shu" | "withdrawals"
  >("all");

  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);

  const [dateInterval, setDateInterval] = useState({
    startDate: weekAgo,
    endDate: today,
  });

  const [isDateFilterActive, setIsDateFilterActive] = useState(false);

  if (!accountType) {
    return (
      <div>Tipe akun tidak ditemukan atau tidak valid di URL (?type=...)</div>
    );
  }

  const transactionsData =
    accountType === "all"
      ? allTransactionsData
      : accountType === "voluntary"
      ? newVoluntaryTransactionsData
      : accountType === "principal"
      ? principalTransactionsData
      : accountType === "voluntary-data"
      ? voluntaryTransactionsData
      : mandatoryTransactionsData;

  const parseTransactionDate = (dateString: string): Date => {
    const cleanDateString = dateString.replace(/,\s*\d{1,2}:\d{2}[ap]m$/i, "");
    return new Date(cleanDateString);
  };

  const filteredTransactions = transactionsData.filter((transaction) => {
    const categoryMatch =
      activeFilter === "all"
        ? true
        : transaction.category === activeFilter ||
          (activeFilter === "withdrawals" &&
            transaction.category === "withdrawals");

    if (!categoryMatch) return false;

    if (!isDateFilterActive) return true;

    const transactionDate = parseTransactionDate(transaction.transactionDate);
    const startOfDay = new Date(dateInterval.startDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(dateInterval.endDate);
    endOfDay.setHours(23, 59, 59, 999);

    return transactionDate >= startOfDay && transactionDate <= endOfDay;
  });

  const handleDateIntervalChange = (interval: {
    startDate: Date;
    endDate: Date;
  }) => {
    setDateInterval(interval);
    setIsDateFilterActive(true);
  };

  const handleLoadTransactions = (
    startDate: Date | null,
    endDate: Date | null
  ) => {
    if (!startDate || !endDate) {
      setIsDateFilterActive(false);
    } else {
      setDateInterval({ startDate, endDate });
      setIsDateFilterActive(true);
    }
  };

  const backHref =
    accountType === "all" ? `/account` : `/account/${accountType}`;

  return (
    <div className={styles.transactionsPage}>
      <div className={styles.header}>
        <div
          className={styles.titleSection}
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          <BackTo href={backHref} text="" />
          <h1 className={styles.title} style={{ margin: 0 }}>
            Riwayat Transaksi
          </h1>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <AccountSelector
            accountType={accountType}
            onAccountTypeChange={(type) => {
              const validTypes = [
                "mandatory",
                "principal",
                "voluntary",
                "voluntary-data",
                "all",
              ] as const;
              if (validTypes.includes(type as (typeof validTypes)[number])) {
                setAccountType(type as (typeof validTypes)[number]);
              }
            }}
          />
        </div>

        <div className={styles.dateRange} style={{ marginTop: "1rem" }}>
          <DateRangePicker
            dateInterval={dateInterval}
            onDateIntervalChange={handleDateIntervalChange}
            onLoadTransactions={handleLoadTransactions}
            isDateFilterActive={isDateFilterActive}
            className={styles.dateText}
          />
        </div>
      </div>

      <TransactionFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        accountType={accountType}
      />

      <div style={{ flex: 1, overflow: "hidden" }}>
        <TransactionsTable transactions={filteredTransactions} />
      </div>
    </div>
  );
}
