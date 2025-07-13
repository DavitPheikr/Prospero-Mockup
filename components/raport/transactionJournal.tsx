"use client";

import React, { useState, useMemo } from "react";
import styles from "@/scss/components/raport/transactionJournal.module.scss";
import FilterPanel from "@/components/ui/FilterPanel";

// Mock data for cooperatives
const cooperatives = [
  { value: "coop-001", label: "Koperasi Pertanian Jakarta" },
  { value: "coop-002", label: "Koperasi Susu Bandung" },
  { value: "coop-003", label: "Koperasi Padi Surabaya" },
  { value: "coop-004", label: "Koperasi Buah Medan" },
  { value: "coop-005", label: "Koperasi Sayuran Yogyakarta" },
];

// Mock transaction data with status and action buttons
const mockTransactions = [
  {
    id: 1,
    date: "2024-01-15",
    description: "Penjualan hasil panen",
    cashIn: 25000000,
    cashOut: 0,
    balance: 25000000,
    type: "income",
    category: "Penjualan",
    cooperativeId: "coop-001",
    status: "approved",
  },
  {
    id: 2,
    date: "2024-01-16",
    description: "Pembelian bibit",
    cashIn: 0,
    cashOut: 5000000,
    balance: 20000000,
    type: "expense",
    category: "Pembelian",
    cooperativeId: "coop-001",
    status: "pending",
  },
  {
    id: 3,
    date: "2024-01-17",
    description: "Penjualan susu segar",
    cashIn: 15000000,
    cashOut: 0,
    balance: 35000000,
    type: "income",
    category: "Penjualan",
    cooperativeId: "coop-002",
    status: "approved",
  },
  {
    id: 4,
    date: "2024-01-18",
    description: "Biaya transportasi",
    cashIn: 0,
    cashOut: 3000000,
    balance: 17000000,
    type: "expense",
    category: "Transportasi",
    cooperativeId: "coop-001",
    status: "rejected",
  },
  {
    id: 5,
    date: "2024-01-19",
    description: "Penjualan buah-buahan",
    cashIn: 12000000,
    cashOut: 0,
    balance: 12000000,
    type: "income",
    category: "Penjualan",
    cooperativeId: "coop-004",
    status: "pending",
  },
  {
    id: 6,
    date: "2024-01-20",
    description: "Gaji karyawan",
    cashIn: 0,
    cashOut: 8000000,
    balance: 9000000,
    type: "expense",
    category: "Gaji",
    cooperativeId: "coop-001",
    status: "approved",
  },
  {
    id: 7,
    date: "2024-01-21",
    description: "Penjualan sayuran",
    cashIn: 18000000,
    cashOut: 0,
    balance: 18000000,
    type: "income",
    category: "Penjualan",
    cooperativeId: "coop-005",
    status: "approved",
  },
  {
    id: 8,
    date: "2024-01-22",
    description: "Perawatan alat",
    cashIn: 0,
    cashOut: 4500000,
    balance: 13500000,
    type: "expense",
    category: "Perawatan",
    cooperativeId: "coop-003",
    status: "pending",
  },
];

const transactionTypes = [
  { value: "all", label: "Semua Transaksi" },
  { value: "income", label: "Hanya Pemasukan" },
  { value: "expense", label: "Hanya Pengeluaran" },
];

const categories = [
  { value: "all", label: "Semua Kategori" },
  { value: "Penjualan", label: "Penjualan" },
  { value: "Pembelian", label: "Pembelian" },
  { value: "Transportasi", label: "Transportasi" },
  { value: "Gaji", label: "Gaji" },
  { value: "Perawatan", label: "Perawatan" },
];

export default function TransactionJournal() {
  const [selectedCooperative, setSelectedCooperative] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filteredTransactions = useMemo(() => {
    let filtered = mockTransactions;

    if (selectedCooperative) {
      filtered = filtered.filter(
        (transaction) => transaction.cooperativeId === selectedCooperative
      );
    }

    if (selectedType !== "all") {
      filtered = filtered.filter(
        (transaction) => transaction.type === selectedType
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (transaction) => transaction.category === selectedCategory
      );
    }

    if (dateFrom) {
      filtered = filtered.filter(
        (transaction) => transaction.date >= dateFrom
      );
    }

    if (dateTo) {
      filtered = filtered.filter((transaction) => transaction.date <= dateTo);
    }

    return filtered;
  }, [selectedCooperative, selectedType, selectedCategory, dateFrom, dateTo]);

  const totals = useMemo(() => {
    const totalCashIn = filteredTransactions.reduce(
      (sum, transaction) => sum + transaction.cashIn,
      0
    );
    const totalCashOut = filteredTransactions.reduce(
      (sum, transaction) => sum + transaction.cashOut,
      0
    );
    const netBalance = totalCashIn - totalCashOut;

    return { totalCashIn, totalCashOut, netBalance };
  }, [filteredTransactions]);

  const clearFilters = () => {
    setSelectedCooperative("");
    setSelectedType("all");
    setSelectedCategory("all");
    setDateFrom("");
    setDateTo("");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      approved: { label: "Disetujui", className: styles.statusApproved },
      pending: { label: "Menunggu", className: styles.statusPending },
      rejected: { label: "Ditolak", className: styles.statusRejected },
    };
    
    const statusConfig = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    
    return (
      <span className={`${styles.statusBadge} ${statusConfig.className}`}>
        {statusConfig.label}
      </span>
    );
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1>Jurnal Transaksi</h1>
          <div className={styles.searchContainer}>
            <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search" 
              className={styles.searchInput}
            />
          </div>
        </div>

        <FilterPanel
          cooperativeField={{
            label: "Pilih Koperasi",
            value: selectedCooperative,
            onChange: setSelectedCooperative,
            options: [
              { value: "", label: "Semua Koperasi" },
              ...cooperatives,
            ],
          }}
          additionalFields={[
            {
              label: "Jenis Transaksi",
              value: selectedType,
              onChange: setSelectedType,
              options: transactionTypes,
            },
            {
              label: "Kategori",
              value: selectedCategory,
              onChange: setSelectedCategory,
              options: categories,
            },
          ]}
          dateFields={[
            {
              type: "date",
              label: "Tanggal Mulai:",
              value: dateFrom,
              onChange: setDateFrom,
            },
            {
              type: "date",
              label: "Tanggal Selesai:",
              value: dateTo,
              onChange: setDateTo,
            },
          ]}
          onReset={clearFilters}
        />

        <div className={styles.tableSection}>
          <div className={styles.tableSectionHeader}>
            <h2>Daftar Transaksi Koperasi</h2>
          </div>
          
          <div className={styles.tableContainer}>
            <table className={styles.transactionTable}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Tanggal</th>
                  <th>Keterangan</th>
                  <th>Kategori</th>
                  <th>Pemasukan</th>
                  <th>Pengeluaran</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={8} className={styles.noData}>
                      Tidak ada transaksi untuk kriteria yang dipilih
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((transaction, index) => (
                    <tr key={transaction.id}>
                      <td>{index + 1}</td>
                      <td>{transaction.date}</td>
                      <td>{transaction.description}</td>
                      <td>{transaction.category}</td>
                      <td className={styles.cashIn}>
                        {transaction.cashIn > 0 ? formatCurrency(transaction.cashIn) : "-"}
                      </td>
                      <td className={styles.cashOut}>
                        {transaction.cashOut > 0 ? formatCurrency(transaction.cashOut) : "-"}
                      </td>
                      <td>{getStatusBadge(transaction.status)}</td>
                      <td className={styles.actionButtons}>
                        <button className={`${styles.actionBtn} ${styles.viewBtn}`} title="View">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                          </svg>
                        </button>
                        <button className={`${styles.actionBtn} ${styles.editBtn}`} title="Edit">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                          </svg>
                        </button>
                        <button className={`${styles.actionBtn} ${styles.downloadBtn}`} title="Download">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <span>Showing 1 to {filteredTransactions.length} of {filteredTransactions.length} results</span>
            <div className={styles.paginationButtons}>
              <button className={styles.paginationBtn}>Previous</button>
              <button className={styles.paginationBtn}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 