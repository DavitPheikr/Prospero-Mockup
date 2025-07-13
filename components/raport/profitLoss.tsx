"use client";

import React, { useState, useMemo } from "react";
import styles from "@/scss/components/raport/profitLoss.module.scss";
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

// Business segments for P&L
const businessSegments = [
  { id: "logistics", name: "Logistik & Transportasi" },
  { id: "cleaning", name: "Kebersihan & Sanitasi" },
  { id: "production", name: "Produksi & Pengolahan" },
  { id: "marketing", name: "Pemasaran & Penjualan" },
  { id: "administration", name: "Administrasi & Umum" },
  { id: "technology", name: "Teknologi & IT" },
];

// Mock P&L data
const mockPLData = [
  {
    id: 1,
    cooperativeId: "coop-001",
    period: "2024-01",
    segments: {
      logistics: {
        revenue: 450000000,
        costs: {
          fuel: 85000000,
          maintenance: 25000000,
          salary: 120000000,
          insurance: 15000000,
          depreciation: 35000000,
        }
      },
      cleaning: {
        revenue: 180000000,
        costs: {
          supplies: 35000000,
          equipment: 20000000,
          salary: 65000000,
          training: 8000000,
          disposal: 12000000,
        }
      },
      production: {
        revenue: 850000000,
        costs: {
          materials: 280000000,
          labor: 180000000,
          utilities: 65000000,
          quality: 25000000,
          packaging: 45000000,
        }
      },
      marketing: {
        revenue: 320000000,
        costs: {
          advertising: 45000000,
          promotions: 28000000,
          commissions: 55000000,
          events: 18000000,
          research: 12000000,
        }
      },
      administration: {
        revenue: 120000000,
        costs: {
          office: 35000000,
          communication: 15000000,
          legal: 18000000,
          accounting: 22000000,
          insurance: 8000000,
        }
      },
      technology: {
        revenue: 95000000,
        costs: {
          software: 25000000,
          hardware: 18000000,
          support: 12000000,
          training: 8000000,
          upgrades: 15000000,
        }
      }
    }
  }
];

export default function ProfitLoss() {
  const [selectedCooperative, setSelectedCooperative] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("2024-01");

  const currentPLData = useMemo(() => {
    if (!selectedCooperative) return mockPLData[0];
    return mockPLData.find(
      (data) => data.cooperativeId === selectedCooperative
    ) || mockPLData[0];
  }, [selectedCooperative]);

  const calculations = useMemo(() => {
    const segmentTotals = businessSegments.map(segment => {
      const segmentData = currentPLData.segments[segment.id as keyof typeof currentPLData.segments];
      const totalCosts = Object.values(segmentData.costs).reduce((sum, cost) => sum + cost, 0);
      const profit = segmentData.revenue - totalCosts;
      
      return {
        id: segment.id,
        name: segment.name,
        revenue: segmentData.revenue,
        totalCosts,
        profit,
        margin: segmentData.revenue > 0 ? (profit / segmentData.revenue) * 100 : 0
      };
    });

    const totalRevenue = segmentTotals.reduce((sum, segment) => sum + segment.revenue, 0);
    const totalCosts = segmentTotals.reduce((sum, segment) => sum + segment.totalCosts, 0);
    const totalProfit = totalRevenue - totalCosts;
    const overallMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

    return {
      segmentTotals,
      totalRevenue,
      totalCosts,
      totalProfit,
      overallMargin
    };
  }, [currentPLData]);

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
    setSelectedPeriod("2024-01");
  };

  const exportToCSV = () => {
    const headers = ["Segmen Bisnis", "Pendapatan", "Total Biaya", "Laba/Rugi", "Margin (%)"];
    const rows = calculations.segmentTotals.map(segment => [
      segment.name,
      segment.revenue,
      segment.totalCosts,
      segment.profit,
      segment.margin.toFixed(1)
    ]);
    
    rows.push([]);
    rows.push(["TOTAL", calculations.totalRevenue, calculations.totalCosts, calculations.totalProfit, calculations.overallMargin.toFixed(1)]);
    
    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `laba-rugi-${selectedPeriod}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1>Laporan Laba Rugi</h1>
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
              type: "month",
              label: "Periode:",
              value: selectedPeriod,
              onChange: setSelectedPeriod,
            },
          ]}
          onReset={clearFilters}
        />

        {/* Summary Cards */}
        <div className={styles.summary}>
          <div className={styles.summaryCard}>
            <h3>Total Pendapatan</h3>
            <p className={styles.totalRevenue}>{formatCurrency(calculations.totalRevenue)}</p>
          </div>
          <div className={styles.summaryCard}>
            <h3>Total Biaya</h3>
            <p className={styles.totalExpenses}>{formatCurrency(calculations.totalCosts)}</p>
          </div>
          <div className={styles.summaryCard}>
            <h3>Laba Bersih</h3>
            <p className={styles.netProfit}>{formatCurrency(calculations.totalProfit)}</p>
          </div>
          <div className={styles.summaryCard}>
            <h3>Margin Keuntungan</h3>
            <p className={styles.profitMargin}>{formatPercentage(calculations.overallMargin)}</p>
          </div>
        </div>

        {/* P&L by Segments */}
        <div className={styles.tableSection}>
          <h2 className={styles.sectionTitle}>Laba Rugi per Segmen Bisnis</h2>
          <div className={styles.tableContainer}>
            <table className={styles.profitLossTable}>
              <thead>
                <tr>
                  <th>Segmen Bisnis</th>
                  <th>Pendapatan</th>
                  <th>Total Biaya</th>
                  <th>Laba/Rugi</th>
                  <th>Margin (%)</th>
                </tr>
              </thead>
              <tbody>
                {calculations.segmentTotals.map((segment) => (
                  <tr key={segment.id}>
                    <td className={styles.accountName}>{segment.name}</td>
                    <td className={`${styles.amount} ${styles.revenue}`}>{formatCurrency(segment.revenue)}</td>
                    <td className={`${styles.amount} ${styles.expense}`}>{formatCurrency(segment.totalCosts)}</td>
                    <td className={`${styles.amount} ${styles.profit}`}>{formatCurrency(segment.profit)}</td>
                    <td className={`${styles.amount} ${styles.profit}`}>{formatPercentage(segment.margin)}</td>
                  </tr>
                ))}
                <tr className={styles.total}>
                  <td><strong>TOTAL</strong></td>
                  <td className={`${styles.amount} ${styles.revenue}`}><strong>{formatCurrency(calculations.totalRevenue)}</strong></td>
                  <td className={`${styles.amount} ${styles.expense}`}><strong>{formatCurrency(calculations.totalCosts)}</strong></td>
                  <td className={`${styles.amount} ${styles.profit}`}><strong>{formatCurrency(calculations.totalProfit)}</strong></td>
                  <td className={`${styles.amount} ${styles.profit}`}><strong>{formatPercentage(calculations.overallMargin)}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Cost Breakdown */}
        <div className={styles.businessSegmentCards}>
          {businessSegments.map(segment => {
            const segmentData = currentPLData.segments[segment.id as keyof typeof currentPLData.segments];
            const segmentCalcs = calculations.segmentTotals.find(s => s.id === segment.id);
            return (
              <div key={segment.id} className={styles.businessSegmentCard}>
                <h3>{segment.name}</h3>
                <div>
                  <strong>Pendapatan:</strong> <span className={styles.segmentRevenue}>{formatCurrency(segmentData.revenue)}</span>
                </div>
                <div>
                  <strong>Total Biaya:</strong> <span className={styles.segmentExpenses}>{formatCurrency(segmentCalcs?.totalCosts || 0)}</span>
                </div>
                <div>
                  <strong>Laba/Rugi:</strong> <span className={styles.segmentProfit}>{formatCurrency(segmentCalcs?.profit || 0)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 