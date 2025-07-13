"use client";

import React, { useState, useMemo } from "react";
import styles from "@/scss/components/raport/shuReport.module.scss";
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

// Mock SHU data
const mockSHUData = [
  {
    id: 1,
    cooperativeId: "coop-001",
    year: "2024",
    totalRevenue: 2015000000,
    totalExpenses: 1680000000,
    grossSurplus: 335000000,
    reserveFunds: 67000000, // 20% for reserves
    memberEducationFund: 16750000, // 5% for education
    socialFund: 16750000, // 5% for social activities
    netSurplusForDistribution: 234500000, // 70% for members
    totalMembers: 150,
    totalMemberSavings: 850000000,
    totalMemberTransactions: 1200000000,
    distributionRules: {
      savingsPercentage: 40, // 40% based on savings
      transactionPercentage: 60, // 60% based on transactions
    }
  },
  {
    id: 2,
    cooperativeId: "coop-002",
    year: "2024",
    totalRevenue: 1380000000,
    totalExpenses: 1159000000,
    grossSurplus: 221000000,
    reserveFunds: 44200000,
    memberEducationFund: 11050000,
    socialFund: 11050000,
    netSurplusForDistribution: 154700000,
    totalMembers: 95,
    totalMemberSavings: 620000000,
    totalMemberTransactions: 890000000,
    distributionRules: {
      savingsPercentage: 45,
      transactionPercentage: 55,
    }
  }
];

export default function SHUReport() {
  const [selectedCooperative, setSelectedCooperative] = useState("");
  const [selectedYear, setSelectedYear] = useState("2024");

  const currentSHUData = useMemo(() => {
    if (!selectedCooperative) return mockSHUData[0];
    return mockSHUData.find(
      (data) => data.cooperativeId === selectedCooperative
    ) || mockSHUData[0];
  }, [selectedCooperative]);

  const calculations = useMemo(() => {
    const {
      totalRevenue,
      grossSurplus,
      netSurplusForDistribution,
    } = currentSHUData;

    const surplusMargin = totalRevenue > 0 ? (grossSurplus / totalRevenue) * 100 : 0;
    
    return {
      surplusMargin,
    };
  }, [currentSHUData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(1)}%`;
  };

  const clearFilters = () => {
    setSelectedCooperative("");
    setSelectedYear("2024");
  };

  const exportToCSV = () => {
    const headers = ["Komponen", "Persentase", "Jumlah", "Keterangan"];
    const rows = [
      ["Total Pendapatan", "100%", currentSHUData.totalRevenue, "Pendapatan dari seluruh kegiatan usaha"],
      ["Total Biaya", "-", currentSHUData.totalExpenses, "Biaya operasional dan administrasi"],
      ["SHU Kotor", `${calculations.surplusMargin.toFixed(1)}%`, currentSHUData.grossSurplus, "Pendapatan - Biaya"],
      ["Dana Cadangan", "20%", currentSHUData.reserveFunds, "Untuk pengembangan koperasi"],
      ["Dana Pendidikan", "5%", currentSHUData.memberEducationFund, "Pendidikan dan pelatihan anggota"],
      ["Dana Sosial", "5%", currentSHUData.socialFund, "Kegiatan sosial kemasyarakatan"],
      ["SHU untuk Anggota", "70%", currentSHUData.netSurplusForDistribution, "Dibagikan kepada anggota"]
    ];
    
    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shu-report-${selectedYear}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1>Laporan Sisa Hasil Usaha (SHU)</h1>
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
              type: "select",
              label: "Tahun:",
              value: selectedYear,
              onChange: setSelectedYear,
              options: [
                { value: "2024", label: "2024" },
                { value: "2023", label: "2023" },
                { value: "2022", label: "2022" },
              ],
            },
          ]}
          onReset={clearFilters}
        />

        {/* Summary Cards */}
        <div className={styles.summary}>
          <div className={styles.summaryCard}>
            <h3>Total SHU</h3>
            <p className={styles.totalSHU}>{formatCurrency(currentSHUData.grossSurplus)}</p>
          </div>
          <div className={styles.summaryCard}>
            <h3>Dana Cadangan</h3>
            <p className={styles.reserveFund}>{formatCurrency(currentSHUData.reserveFunds)}</p>
          </div>
          <div className={styles.summaryCard}>
            <h3>Dana Pendidikan</h3>
            <p className={styles.educationFund}>{formatCurrency(currentSHUData.memberEducationFund)}</p>
          </div>
          <div className={styles.summaryCard}>
            <h3>Dana Sosial</h3>
            <p className={styles.socialFund}>{formatCurrency(currentSHUData.socialFund)}</p>
          </div>
          <div className={styles.summaryCard}>
            <h3>Distribusi Anggota</h3>
            <p className={styles.memberDistribution}>{formatCurrency(currentSHUData.netSurplusForDistribution)}</p>
          </div>
        </div>

        {/* SHU Breakdown Table */}
        <div className={styles.tableContainer}>
          <table className={styles.shuTable}>
            <thead>
              <tr>
                <th>Komponen</th>
                <th>Persentase</th>
                <th>Jumlah</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.categoryName}>Total Pendapatan</td>
                <td className={styles.percentage}>100%</td>
                <td className={`${styles.amount} ${styles.total}`}>{formatCurrency(currentSHUData.totalRevenue)}</td>
                <td className={styles.categoryDescription}>Pendapatan dari seluruh kegiatan usaha</td>
              </tr>
              <tr>
                <td className={styles.categoryName}>Total Biaya</td>
                <td className={styles.percentage}>-</td>
                <td className={`${styles.amount} ${styles.total}`}>{formatCurrency(currentSHUData.totalExpenses)}</td>
                <td className={styles.categoryDescription}>Biaya operasional dan administrasi</td>
              </tr>
              <tr className={styles.totalRow}>
                <td><strong>SHU Kotor</strong></td>
                <td className={styles.percentage}><strong>{formatPercentage(calculations.surplusMargin)}</strong></td>
                <td className={`${styles.amount} ${styles.total}`}><strong>{formatCurrency(currentSHUData.grossSurplus)}</strong></td>
                <td className={styles.categoryDescription}><strong>Pendapatan - Biaya</strong></td>
              </tr>
              <tr>
                <td className={styles.categoryName}>Dana Cadangan</td>
                <td className={styles.percentage}>20%</td>
                <td className={`${styles.amount} ${styles.reserve}`}>{formatCurrency(currentSHUData.reserveFunds)}</td>
                <td className={styles.categoryDescription}>Untuk pengembangan koperasi</td>
              </tr>
              <tr>
                <td className={styles.categoryName}>Dana Pendidikan</td>
                <td className={styles.percentage}>5%</td>
                <td className={`${styles.amount} ${styles.education}`}>{formatCurrency(currentSHUData.memberEducationFund)}</td>
                <td className={styles.categoryDescription}>Pendidikan dan pelatihan anggota</td>
              </tr>
              <tr>
                <td className={styles.categoryName}>Dana Sosial</td>
                <td className={styles.percentage}>5%</td>
                <td className={`${styles.amount} ${styles.social}`}>{formatCurrency(currentSHUData.socialFund)}</td>
                <td className={styles.categoryDescription}>Kegiatan sosial kemasyarakatan</td>
              </tr>
              <tr className={styles.totalRow}>
                <td><strong>SHU untuk Anggota</strong></td>
                <td className={styles.percentage}><strong>70%</strong></td>
                <td className={`${styles.amount} ${styles.member}`}><strong>{formatCurrency(currentSHUData.netSurplusForDistribution)}</strong></td>
                <td className={styles.categoryDescription}><strong>Dibagikan kepada anggota</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Allocation Rules */}
        <h2 className={styles.sectionTitle}>Aturan Alokasi SHU Anggota</h2>
        <div className={styles.allocationRules}>
          <div className={styles.rulesGrid}>
            <div className={styles.ruleCard}>
              <h4>Berdasarkan Simpanan</h4>
              <div className={styles.percentage}>{currentSHUData.distributionRules.savingsPercentage}%</div>
              <div className={styles.description}>Alokasi berdasarkan total simpanan anggota</div>
            </div>
            <div className={styles.ruleCard}>
              <h4>Berdasarkan Transaksi</h4>
              <div className={styles.percentage}>{currentSHUData.distributionRules.transactionPercentage}%</div>
              <div className={styles.description}>Alokasi berdasarkan total transaksi anggota</div>
            </div>
          </div>
        </div>

        {/* Member Statistics */}
        <h2 className={styles.sectionTitle}>Statistik Keanggotaan</h2>
        <div className={styles.detailBreakdown}>
          <div className={styles.breakdownCard}>
            <h3>Total Anggota</h3>
            <p>{currentSHUData.totalMembers}</p>
          </div>
          <div className={styles.breakdownCard}>
            <h3>Total Simpanan</h3>
            <p>{formatCurrency(currentSHUData.totalMemberSavings)}</p>
          </div>
          <div className={styles.breakdownCard}>
            <h3>Total Transaksi</h3>
            <p>{formatCurrency(currentSHUData.totalMemberTransactions)}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 