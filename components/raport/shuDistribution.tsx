"use client";

import React, { useState, useMemo } from "react";
import styles from "@/scss/components/raport/shuDistribution.module.scss";
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

// Mock member data
const mockMemberData = [
  {
    id: 1,
    cooperativeId: "coop-001",
    year: "2024",
    totalSHUForDistribution: 234500000,
    distributionRules: {
      savingsPercentage: 40,
      transactionPercentage: 60,
    },
    members: [
      {
        id: "M001",
        name: "Ahmad Suharto",
        memberSince: "2019-01-15",
        savings: 12500000,
        transactions: 18750000,
        yearsActive: 5,
        status: "aktif"
      },
      {
        id: "M002", 
        name: "Siti Rahayu",
        memberSince: "2020-03-20",
        savings: 8500000,
        transactions: 15200000,
        yearsActive: 4,
        status: "aktif"
      },
      {
        id: "M003",
        name: "Budi Santoso",
        memberSince: "2018-06-10", 
        savings: 15750000,
        transactions: 22100000,
        yearsActive: 6,
        status: "aktif"
      },
      {
        id: "M004",
        name: "Dewi Lestari",
        memberSince: "2021-01-05",
        savings: 6200000,
        transactions: 9800000,
        yearsActive: 3,
        status: "aktif"
      },
      {
        id: "M005",
        name: "Joko Widodo",
        memberSince: "2017-09-12",
        savings: 20100000,
        transactions: 31500000,
        yearsActive: 7,
        status: "aktif"
      },
      {
        id: "M006",
        name: "Rina Susanti",
        memberSince: "2019-11-25",
        savings: 9750000,
        transactions: 13400000,
        yearsActive: 5,
        status: "aktif"
      },
      {
        id: "M007",
        name: "Agus Prasetyo",
        memberSince: "2020-07-18",
        savings: 11200000,
        transactions: 16800000,
        yearsActive: 4,
        status: "aktif"
      },
      {
        id: "M008",
        name: "Indira Sari",
        memberSince: "2022-02-14",
        savings: 4850000,
        transactions: 7200000,
        yearsActive: 2,
        status: "aktif"
      }
    ]
  }
];

export default function SHUDistribution() {
  const [selectedCooperative, setSelectedCooperative] = useState("");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [sortBy, setSortBy] = useState("shuAmount");
  const [searchTerm, setSearchTerm] = useState("");

  const currentData = useMemo(() => {
    if (!selectedCooperative) return mockMemberData[0];
    return mockMemberData.find(
      (data) => data.cooperativeId === selectedCooperative
    ) || mockMemberData[0];
  }, [selectedCooperative]);

  const calculatedMembers = useMemo(() => {
    const { totalSHUForDistribution, distributionRules, members } = currentData;
    
    // Calculate totals
    const totalSavings = members.reduce((sum, member) => sum + member.savings, 0);
    const totalTransactions = members.reduce((sum, member) => sum + member.transactions, 0);
    
    // Calculate distribution amounts
    const savingsBasedSHU = (totalSHUForDistribution * distributionRules.savingsPercentage) / 100;
    const transactionBasedSHU = (totalSHUForDistribution * distributionRules.transactionPercentage) / 100;
    
    // Calculate individual member distributions
    const membersWithSHU = members.map(member => {
      // SHU from savings (proportional to individual savings)
      const shuFromSavings = totalSavings > 0 ? (member.savings / totalSavings) * savingsBasedSHU : 0;
      
      // SHU from transactions (proportional to individual transactions)
      const shuFromTransactions = totalTransactions > 0 ? (member.transactions / totalTransactions) * transactionBasedSHU : 0;
      
      // Total SHU for this member
      const totalSHU = shuFromSavings + shuFromTransactions;
      
      // Calculate ratios
      const savingsRatio = totalSavings > 0 ? (member.savings / totalSavings) * 100 : 0;
      const transactionRatio = totalTransactions > 0 ? (member.transactions / totalTransactions) * 100 : 0;
      
      return {
        ...member,
        shuFromSavings,
        shuFromTransactions,
        totalSHU,
        savingsRatio,
        transactionRatio,
      };
    });
    
    // Filter by search term
    const filteredMembers = membersWithSHU.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Sort members
    const sortedMembers = [...filteredMembers].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "shuAmount":
          return b.totalSHU - a.totalSHU;
        case "savings":
          return b.savings - a.savings;
        case "transactions":
          return b.transactions - a.transactions;
        case "yearsActive":
          return b.yearsActive - a.yearsActive;
        default:
          return 0;
      }
    });
    
    return {
      members: sortedMembers,
      totalSavings,
      totalTransactions,
      savingsBasedSHU,
      transactionBasedSHU,
      totalDistributed: sortedMembers.reduce((sum, member) => sum + member.totalSHU, 0),
    };
  }, [currentData, sortBy, searchTerm]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(2)}%`;
  };

  const clearFilters = () => {
    setSelectedCooperative("");
    setSelectedYear("2024");
    setSortBy("shuAmount");
    setSearchTerm("");
  };

  const exportToCSV = () => {
    const headers = ["ID Anggota", "Nama", "Simpanan", "Transaksi", "SHU dari Simpanan", "SHU dari Transaksi", "Total SHU"];
    const rows = calculatedMembers.members.map(member => [
      member.id,
      member.name,
      member.savings,
      member.transactions,
      member.shuFromSavings,
      member.shuFromTransactions,
      member.totalSHU
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shu-distribution-${selectedYear}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1>Perhitungan Pembagian SHU ke Anggota</h1>
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
          additionalFields={[
            {
              label: "Urutkan Berdasarkan",
              value: sortBy,
              onChange: setSortBy,
              options: [
                { value: "shuAmount", label: "Jumlah SHU" },
                { value: "name", label: "Nama" },
                { value: "savings", label: "Simpanan" },
                { value: "transactions", label: "Transaksi" },
                { value: "yearsActive", label: "Lama Keanggotaan" },
              ],
            },
          ]}
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
            {
              type: "search",
              label: "Cari Anggota:",
              value: searchTerm,
              onChange: setSearchTerm,
              placeholder: "Nama atau ID...",
            },
          ]}
          onReset={clearFilters}
        />

        {/* Summary Cards */}
        <div className={styles.summary}>
          <div className={styles.summaryCard}>
            <h3>Total SHU untuk Anggota</h3>
            <p className={styles.totalSHU}>{formatCurrency(currentData.totalSHUForDistribution)}</p>
          </div>
          <div className={styles.summaryCard}>
            <h3>Jumlah Anggota</h3>
            <p className={styles.memberCount}>{calculatedMembers.members.length}</p>
          </div>
          <div className={styles.summaryCard}>
            <h3>Rata-rata SHU</h3>
            <p className={styles.avgSHU}>
              {formatCurrency(calculatedMembers.members.length > 0 ? calculatedMembers.totalDistributed / calculatedMembers.members.length : 0)}
            </p>
          </div>
          <div className={styles.summaryCard}>
            <h3>Total Terdistribusi</h3>
            <p className={styles.distributed}>{formatCurrency(calculatedMembers.totalDistributed)}</p>
          </div>
        </div>

        {/* Member Distribution Table */}
        <div className={styles.tableSection}>
          <h2 className={styles.sectionTitle}>Daftar Pembagian SHU per Anggota</h2>
          
          <div className={styles.tableContainer}>
            <table className={styles.distributionTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Anggota</th>
                  <th>Simpanan</th>
                  <th>% Simpanan</th>
                  <th>Transaksi</th>
                  <th>% Transaksi</th>
                  <th>SHU dari Simpanan</th>
                  <th>SHU dari Transaksi</th>
                  <th>Total SHU</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {calculatedMembers.members.map((member, index) => (
                  <tr key={member.id}>
                    <td className={styles.memberId}>{member.id}</td>
                    <td className={styles.memberName}>{member.name}</td>
                    <td className={styles.savings}>{formatCurrency(member.savings)}</td>
                    <td className={styles.percentage}>{formatPercentage(member.savingsRatio)}</td>
                    <td className={styles.transactions}>{formatCurrency(member.transactions)}</td>
                    <td className={styles.percentage}>{formatPercentage(member.transactionRatio)}</td>
                    <td className={styles.shuSavings}>{formatCurrency(member.shuFromSavings)}</td>
                    <td className={styles.shuTransactions}>{formatCurrency(member.shuFromTransactions)}</td>
                    <td className={styles.totalShu}>{formatCurrency(member.totalSHU)}</td>
                    <td className={styles.actionButtons}>
                      <button className={`${styles.actionBtn} ${styles.viewBtn}`} title="View Details">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                        </svg>
                      </button>
                      <button className={`${styles.actionBtn} ${styles.downloadBtn}`} title="Download Receipt">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 