"use client";

import React, { useState, useMemo } from "react";
import styles from "@/scss/components/raport/balanceSheet.module.scss";
import FilterPanel from "@/components/ui/FilterPanel";
import Button from "@/components/ui/Button";

// Mock data for cooperatives
const cooperatives = [
  { value: "coop-001", label: "Koperasi Pertanian Jakarta" },
  { value: "coop-002", label: "Koperasi Susu Bandung" },
  { value: "coop-003", label: "Koperasi Padi Surabaya" },
  { value: "coop-004", label: "Koperasi Buah Medan" },
  { value: "coop-005", label: "Koperasi Sayuran Yogyakarta" },
];

// Mock balance sheet data
const mockBalanceSheetData = [
  {
    id: 1,
    cooperativeId: "coop-001",
    date: "2024-01-31",
    assets: {
      current: [
        { name: "Kas", amount: 150000000 },
        { name: "Rekening Bank", amount: 750000000 },
        { name: "Piutang Anggota", amount: 200000000 },
        { name: "Persediaan", amount: 450000000 },
      ],
      fixed: [
        { name: "Tanah", amount: 2500000000 },
        { name: "Bangunan", amount: 1800000000 },
        { name: "Kendaraan", amount: 300000000 },
        { name: "Peralatan", amount: 150000000 },
      ],
    },
    liabilities: {
      current: [
        { name: "Hutang Dagang", amount: 180000000 },
        { name: "Hutang Gaji", amount: 25000000 },
        { name: "Hutang Pajak", amount: 15000000 },
      ],
      longTerm: [
        { name: "Hutang Bank", amount: 800000000 },
        { name: "Hutang Jangka Panjang", amount: 300000000 },
      ],
    },
    equity: [
      { name: "Modal Anggota", amount: 2000000000 },
      { name: "Cadangan Umum", amount: 1500000000 },
      { name: "Laba Ditahan", amount: 1325000000 },
    ],
  },
  {
    id: 2,
    cooperativeId: "coop-002",
    date: "2024-01-31",
    assets: {
      current: [
        { name: "Kas", amount: 85000000 },
        { name: "Rekening Bank", amount: 420000000 },
        { name: "Piutang Anggota", amount: 125000000 },
        { name: "Persediaan", amount: 380000000 },
      ],
      fixed: [
        { name: "Tanah", amount: 1200000000 },
        { name: "Bangunan", amount: 900000000 },
        { name: "Kendaraan", amount: 180000000 },
        { name: "Peralatan", amount: 90000000 },
      ],
    },
    liabilities: {
      current: [
        { name: "Hutang Dagang", amount: 95000000 },
        { name: "Hutang Gaji", amount: 18000000 },
        { name: "Hutang Pajak", amount: 8000000 },
      ],
      longTerm: [
        { name: "Hutang Bank", amount: 450000000 },
        { name: "Hutang Jangka Panjang", amount: 150000000 },
      ],
    },
    equity: [
      { name: "Modal Anggota", amount: 1200000000 },
      { name: "Cadangan Umum", amount: 800000000 },
      { name: "Laba Ditahan", amount: 859000000 },
    ],
  },
];

export default function BalanceSheet() {
  const [selectedCooperative, setSelectedCooperative] = useState("");
  const [selectedDate, setSelectedDate] = useState("2024-01-31");

  const currentBalanceSheet = useMemo(() => {
    if (!selectedCooperative) return mockBalanceSheetData[0];
    return mockBalanceSheetData.find(
      (sheet) => sheet.cooperativeId === selectedCooperative
    ) || mockBalanceSheetData[0];
  }, [selectedCooperative]);

  const calculations = useMemo(() => {
    const currentAssets = currentBalanceSheet.assets.current.reduce((sum, item) => sum + item.amount, 0);
    const fixedAssets = currentBalanceSheet.assets.fixed.reduce((sum, item) => sum + item.amount, 0);
    const totalAssets = currentAssets + fixedAssets;

    const currentLiabilities = currentBalanceSheet.liabilities.current.reduce((sum, item) => sum + item.amount, 0);
    const longTermLiabilities = currentBalanceSheet.liabilities.longTerm.reduce((sum, item) => sum + item.amount, 0);
    const totalLiabilities = currentLiabilities + longTermLiabilities;

    const totalEquity = currentBalanceSheet.equity.reduce((sum, item) => sum + item.amount, 0);
    const totalLiabilitiesAndEquity = totalLiabilities + totalEquity;
    const netWorth = totalAssets - totalLiabilities;

    return {
      currentAssets,
      fixedAssets,
      totalAssets,
      currentLiabilities,
      longTermLiabilities,
      totalLiabilities,
      totalEquity,
      totalLiabilitiesAndEquity,
      netWorth,
    };
  }, [currentBalanceSheet]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const clearFilters = () => {
    setSelectedCooperative("");
    setSelectedDate("2024-01-31");
  };

  const exportToCSV = () => {
    const headers = ["Kategori", "Akun", "Jumlah"];
    const rows = [];
    
    // Add Assets
    rows.push(["ASET", "", ""]);
    rows.push(["Aset Lancar", "", ""]);
    currentBalanceSheet.assets.current.forEach(item => {
      rows.push(["", item.name, item.amount]);
    });
    rows.push(["", "Total Aset Lancar", calculations.currentAssets]);
    
    rows.push(["Aset Tetap", "", ""]);
    currentBalanceSheet.assets.fixed.forEach(item => {
      rows.push(["", item.name, item.amount]);
    });
    rows.push(["", "Total Aset Tetap", calculations.fixedAssets]);
    rows.push(["", "TOTAL ASET", calculations.totalAssets]);
    
    // Add Liabilities
    rows.push(["KEWAJIBAN & EKUITAS", "", ""]);
    rows.push(["Kewajiban Lancar", "", ""]);
    currentBalanceSheet.liabilities.current.forEach(item => {
      rows.push(["", item.name, item.amount]);
    });
    rows.push(["", "Total Kewajiban Lancar", calculations.currentLiabilities]);
    
    rows.push(["Kewajiban Jangka Panjang", "", ""]);
    currentBalanceSheet.liabilities.longTerm.forEach(item => {
      rows.push(["", item.name, item.amount]);
    });
    rows.push(["", "Total Kewajiban Jangka Panjang", calculations.longTermLiabilities]);
    
    // Add Equity
    rows.push(["Ekuitas", "", ""]);
    currentBalanceSheet.equity.forEach(item => {
      rows.push(["", item.name, item.amount]);
    });
    rows.push(["", "Total Ekuitas", calculations.totalEquity]);
    rows.push(["", "TOTAL KEWAJIBAN & EKUITAS", calculations.totalLiabilitiesAndEquity]);
    
    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `neraca-${selectedDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1>Neraca Koperasi</h1>
          <div className={styles.headerActions}>
            <Button onClick={exportToCSV} className={styles.exportButton}>
              Export CSV
            </Button>
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
          dateFields={[
            {
              type: "date",
              label: "Tanggal Neraca:",
              value: selectedDate,
              onChange: setSelectedDate,
            },
          ]}
          onReset={clearFilters}
        />

        {/* Summary Cards */}
        <div className={styles.summary}>
          <div className={styles.summaryCard}>
            <h3>Total Aset</h3>
            <p className={styles.totalAssets}>{formatCurrency(calculations.totalAssets)}</p>
          </div>
          <div className={styles.summaryCard}>
            <h3>Total Kewajiban</h3>
            <p className={styles.totalLiabilities}>{formatCurrency(calculations.totalLiabilities)}</p>
          </div>
          <div className={styles.summaryCard}>
            <h3>Total Ekuitas</h3>
            <p className={styles.totalEquity}>{formatCurrency(calculations.totalEquity)}</p>
          </div>
          <div className={styles.summaryCard}>
            <h3>Kekayaan Bersih</h3>
            <p className={styles.netWorth}>{formatCurrency(calculations.netWorth)}</p>
          </div>
        </div>

        {/* Balance Sheet Table */}
        <div className={styles.tableContainer}>
          <table className={styles.balanceTable}>
            <thead>
              <tr>
                <th>Akun</th>
                <th>Kategori</th>
                <th>Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {/* ASSETS SECTION */}
              <tr className={styles.sectionHeader}>
                <td colSpan={3}><strong>ASET</strong></td>
              </tr>
              
              {/* Current Assets */}
              <tr className={styles.subSectionHeader}>
                <td colSpan={3}><strong>Aset Lancar</strong></td>
              </tr>
              {currentBalanceSheet.assets.current.map((item, index) => (
                <tr key={`current-${index}`}>
                  <td className={styles.accountName}>{item.name}</td>
                  <td className={styles.accountType}>Lancar</td>
                  <td className={styles.balanceAmount}>{formatCurrency(item.amount)}</td>
                </tr>
              ))}
              <tr className={styles.subtotal}>
                <td><strong>Total Aset Lancar</strong></td>
                <td></td>
                <td className={styles.balanceAmount}><strong>{formatCurrency(calculations.currentAssets)}</strong></td>
              </tr>
              
              {/* Fixed Assets */}
              <tr className={styles.subSectionHeader}>
                <td colSpan={3}><strong>Aset Tetap</strong></td>
              </tr>
              {currentBalanceSheet.assets.fixed.map((item, index) => (
                <tr key={`fixed-${index}`}>
                  <td className={styles.accountName}>{item.name}</td>
                  <td className={styles.accountType}>Tetap</td>
                  <td className={styles.balanceAmount}>{formatCurrency(item.amount)}</td>
                </tr>
              ))}
              <tr className={styles.subtotal}>
                <td><strong>Total Aset Tetap</strong></td>
                <td></td>
                <td className={styles.balanceAmount}><strong>{formatCurrency(calculations.fixedAssets)}</strong></td>
              </tr>
              
              {/* Total Assets */}
              <tr className={styles.total}>
                <td><strong>TOTAL ASET</strong></td>
                <td></td>
                <td className={styles.balanceAmount}><strong>{formatCurrency(calculations.totalAssets)}</strong></td>
              </tr>
              
              {/* LIABILITIES & EQUITY SECTION */}
              <tr className={styles.sectionHeader}>
                <td colSpan={3}><strong>KEWAJIBAN & EKUITAS</strong></td>
              </tr>
              
              {/* Current Liabilities */}
              <tr className={styles.subSectionHeader}>
                <td colSpan={3}><strong>Kewajiban Lancar</strong></td>
              </tr>
              {currentBalanceSheet.liabilities.current.map((item, index) => (
                <tr key={`current-liab-${index}`}>
                  <td className={styles.accountName}>{item.name}</td>
                  <td className={styles.accountType}>Lancar</td>
                  <td className={styles.balanceAmount}>{formatCurrency(item.amount)}</td>
                </tr>
              ))}
              <tr className={styles.subtotal}>
                <td><strong>Total Kewajiban Lancar</strong></td>
                <td></td>
                <td className={styles.balanceAmount}><strong>{formatCurrency(calculations.currentLiabilities)}</strong></td>
              </tr>
              
              {/* Long-term Liabilities */}
              <tr className={styles.subSectionHeader}>
                <td colSpan={3}><strong>Kewajiban Jangka Panjang</strong></td>
              </tr>
              {currentBalanceSheet.liabilities.longTerm.map((item, index) => (
                <tr key={`longterm-liab-${index}`}>
                  <td className={styles.accountName}>{item.name}</td>
                  <td className={styles.accountType}>Jangka Panjang</td>
                  <td className={styles.balanceAmount}>{formatCurrency(item.amount)}</td>
                </tr>
              ))}
              <tr className={styles.subtotal}>
                <td><strong>Total Kewajiban Jangka Panjang</strong></td>
                <td></td>
                <td className={styles.balanceAmount}><strong>{formatCurrency(calculations.longTermLiabilities)}</strong></td>
              </tr>
              
              {/* Equity */}
              <tr className={styles.subSectionHeader}>
                <td colSpan={3}><strong>Ekuitas</strong></td>
              </tr>
              {currentBalanceSheet.equity.map((item, index) => (
                <tr key={`equity-${index}`}>
                  <td className={styles.accountName}>{item.name}</td>
                  <td className={styles.accountType}>Ekuitas</td>
                  <td className={styles.balanceAmount}>{formatCurrency(item.amount)}</td>
                </tr>
              ))}
              <tr className={styles.subtotal}>
                <td><strong>Total Ekuitas</strong></td>
                <td></td>
                <td className={styles.balanceAmount}><strong>{formatCurrency(calculations.totalEquity)}</strong></td>
              </tr>
              
              {/* Total Liabilities & Equity */}
              <tr className={styles.total}>
                <td><strong>TOTAL KEWAJIBAN & EKUITAS</strong></td>
                <td></td>
                <td className={styles.balanceAmount}><strong>{formatCurrency(calculations.totalLiabilitiesAndEquity)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 