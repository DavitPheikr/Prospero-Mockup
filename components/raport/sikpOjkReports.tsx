"use client";

import React, { useState, useMemo } from "react";
import styles from "@/scss/components/raport/sikpOjkReports.module.scss";
import Button from "@/components/ui/Button";
import FilterPanel from "@/components/ui/FilterPanel";

// Mock data for cooperatives
const cooperatives = [
  { value: "coop-001", label: "Koperasi Pertanian Jakarta" },
  { value: "coop-002", label: "Koperasi Susu Bandung" },
  { value: "coop-003", label: "Koperasi Padi Surabaya" },
  { value: "coop-004", label: "Koperasi Buah Medan" },
  { value: "coop-005", label: "Koperasi Sayuran Yogyakarta" },
];

// Report types
const reportTypes = [
  { value: "all", label: "Semua Laporan" },
  { value: "sikp", label: "SIKP (Sistem Informasi Koperasi Primer)" },
  { value: "ojk", label: "OJK (Otoritas Jasa Keuangan)" },
];

// Mock regulatory reports data
const mockRegulatoryData = [
  {
    id: 1,
    cooperativeId: "coop-001",
    reportType: "SIKP",
    reportCode: "SIKP-2024-001",
    title: "Laporan Keuangan Tahunan",
    period: "2024-12",
    status: "submitted",
    submissionDate: "2024-01-15",
    dueDate: "2024-01-31",
    description: "Laporan keuangan lengkap untuk periode tahun 2024",
    dataSource: ["balance-sheet", "profit-loss", "shu-report"],
    fileSize: "2.5 MB",
    format: "PDF"
  },
  {
    id: 2,
    cooperativeId: "coop-001",
    reportType: "OJK",
    reportCode: "OJK-2024-001",
    title: "Laporan Pengelolaan Simpan Pinjam",
    period: "2024-01",
    status: "draft",
    submissionDate: null,
    dueDate: "2024-02-15",
    description: "Laporan kegiatan simpan pinjam anggota",
    dataSource: ["transaction-journal", "shu-distribution"],
    fileSize: "1.8 MB",
    format: "XML"
  },
  {
    id: 3,
    cooperativeId: "coop-001",
    reportType: "SIKP",
    reportCode: "SIKP-2024-002",
    title: "Laporan Keanggotaan",
    period: "2024-01",
    status: "pending",
    submissionDate: null,
    dueDate: "2024-02-10",
    description: "Data keanggotaan dan aktivitas anggota",
    dataSource: ["shu-distribution"],
    fileSize: "0.9 MB",
    format: "PDF"
  },
  {
    id: 4,
    cooperativeId: "coop-002", 
    reportType: "OJK",
    reportCode: "OJK-2024-002",
    title: "Laporan Risk Assessment",
    period: "2024-01",
    status: "overdue",
    submissionDate: null,
    dueDate: "2024-01-25",
    description: "Penilaian risiko operasional koperasi",
    dataSource: ["balance-sheet", "profit-loss"],
    fileSize: "3.2 MB",
    format: "PDF"
  }
];

export default function SIKPOJKReports() {
  const [selectedCooperative, setSelectedCooperative] = useState("");
  const [selectedReportType, setSelectedReportType] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("2024-01");

  const filteredReports = useMemo(() => {
    let filtered = mockRegulatoryData;

    if (selectedCooperative) {
      filtered = filtered.filter(
        (report) => report.cooperativeId === selectedCooperative
      );
    }

    if (selectedReportType !== "all") {
      filtered = filtered.filter(
        (report) => report.reportType.toLowerCase() === selectedReportType
      );
    }

    return filtered.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
  }, [selectedCooperative, selectedReportType]);

  const statusStats = useMemo(() => {
    const stats = {
      total: filteredReports.length,
      submitted: 0,
      draft: 0,
      pending: 0,
      overdue: 0
    };

    filteredReports.forEach(report => {
      stats[report.status as keyof typeof stats]++;
    });

    return stats;
  }, [filteredReports]);

  const getStatusBadge = (status: string) => {
    const statusMap = {
      submitted: { label: "Terkirim", className: styles.statusSubmitted },
      draft: { label: "Draft", className: styles.statusDraft },
      pending: { label: "Menunggu", className: styles.statusPending },
      overdue: { label: "Terlambat", className: styles.statusOverdue },
    };
    
    const statusConfig = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    
    return (
      <span className={`${styles.statusBadge} ${statusConfig.className}`}>
        {statusConfig.label}
      </span>
    );
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID");
  };

  const clearFilters = () => {
    setSelectedCooperative("");
    setSelectedReportType("all");
    setSelectedPeriod("2024-01");
  };

  const generateReport = (reportId: number) => {
    alert(`Menghasilkan laporan ID: ${reportId}`);
  };

  const submitReport = (reportId: number) => {
    alert(`Mengirim laporan ID: ${reportId}`);
  };

  const downloadReport = (reportId: number) => {
    alert(`Mengunduh laporan ID: ${reportId}`);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1>Integrasi SIKP / OJK</h1>
          <div className={styles.headerActions}>
            <Button className={styles.generateButton}>
              Generate Semua Laporan
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
              label: "Jenis Laporan",
              value: selectedReportType,
              onChange: setSelectedReportType,
              options: reportTypes,
            },
          ]}
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

        {/* Status Summary */}
        <div className={styles.summary}>
          <div className={styles.summaryCard}>
            <h3>Total Laporan</h3>
            <p className={styles.totalReports}>{statusStats.total}</p>
          </div>
          <div className={styles.summaryCard}>
            <h3>Terkirim</h3>
            <p className={styles.submitted}>{statusStats.submitted}</p>
          </div>
          <div className={styles.summaryCard}>
            <h3>Draft</h3>
            <p className={styles.draft}>{statusStats.draft}</p>
          </div>
          <div className={styles.summaryCard}>
            <h3>Menunggu</h3>
            <p className={styles.pending}>{statusStats.pending}</p>
          </div>
          <div className={styles.summaryCard}>
            <h3>Terlambat</h3>
            <p className={styles.overdue}>{statusStats.overdue}</p>
          </div>
        </div>

        {/* Reports Table */}
        <div className={styles.tableSection}>
          <h2 className={styles.sectionTitle}>Daftar Laporan Regulasi</h2>
          
          <div className={styles.tableContainer}>
            <table className={styles.reportsTable}>
              <thead>
                <tr>
                  <th>Kode Laporan</th>
                  <th>Judul</th>
                  <th>Jenis</th>
                  <th>Periode</th>
                  <th>Tenggat</th>
                  <th>Status</th>
                  <th>Ukuran File</th>
                  <th>Sumber Data</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id}>
                    <td className={styles.reportCode}>{report.reportCode}</td>
                    <td className={styles.reportTitle}>{report.title}</td>
                    <td className={styles.reportType}>
                      <span className={`${styles.typeBadge} ${styles[`type${report.reportType}`]}`}>
                        {report.reportType}
                      </span>
                    </td>
                    <td>{report.period}</td>
                    <td className={new Date(report.dueDate) < new Date() ? styles.overdueDue : ""}>
                      {formatDate(report.dueDate)}
                    </td>
                    <td>{getStatusBadge(report.status)}</td>
                    <td className={styles.fileSize}>{report.fileSize}</td>
                    <td className={styles.dataSources}>
                      {report.dataSource.map((source, index) => (
                        <span key={index} className={styles.dataSourceTag}>
                          {source}
                        </span>
                      ))}
                    </td>
                    <td className={styles.actionButtons}>
                      {report.status === "draft" && (
                        <button 
                          className={`${styles.actionBtn} ${styles.generateBtn}`} 
                          title="Generate Report"
                          onClick={() => generateReport(report.id)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                          </svg>
                        </button>
                      )}
                      {(report.status === "pending" || report.status === "draft") && (
                        <button 
                          className={`${styles.actionBtn} ${styles.submitBtn}`} 
                          title="Submit Report"
                          onClick={() => submitReport(report.id)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                          </svg>
                        </button>
                      )}
                      <button 
                        className={`${styles.actionBtn} ${styles.downloadBtn}`} 
                        title="Download Report"
                        onClick={() => downloadReport(report.id)}
                      >
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

        {/* Integration Info */}
        <div className={styles.integrationInfo}>
          <div className={styles.infoSection}>
            <h3>SIKP (Sistem Informasi Koperasi Primer)</h3>
            <p>Sistem pelaporan resmi untuk koperasi primer yang dikelola oleh Kementerian Koperasi dan UKM. Laporan ini mencakup data keuangan, keanggotaan, dan operasional koperasi.</p>
            <ul>
              <li>Laporan Keuangan Tahunan</li>
              <li>Data Keanggotaan</li>
              <li>Aktivitas Usaha Koperasi</li>
            </ul>
          </div>
          
          <div className={styles.infoSection}>
            <h3>OJK (Otoritas Jasa Keuangan)</h3>
            <p>Pelaporan untuk koperasi yang menjalankan kegiatan simpan pinjam sesuai regulasi OJK. Fokus pada penilaian risiko dan kesehatan keuangan.</p>
            <ul>
              <li>Laporan Pengelolaan Simpan Pinjam</li>
              <li>Risk Assessment</li>
              <li>Laporan Kesehatan Keuangan</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 