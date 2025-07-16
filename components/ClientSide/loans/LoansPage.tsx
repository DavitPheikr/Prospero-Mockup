"use client";
import styles from "@/scss/components/loans/loansPage.module.scss";
import Button from "@/components/ui/Button";
import LoanCard from "@/components/ClientSide/loans/LoanCard";
import LoanModal from "@/components/ClientSide/loans/LoanModal";
import { useState } from "react";
import {
  Percent,
  CalendarClock,
  Timer,
  FileText,
  CheckCircle,
} from "lucide-react";
import { format } from "date-fns";

type LoanData = {
  amount: string;
  purpose: string;
  tenure: string;
  monthlyInstallment: number | null;
};

type LoanStatus = "pending" | "approved" | "rejected";

export default function LoansPage() {
  const [hasLoan, setHasLoan] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanData, setLoanData] = useState<LoanData | null>(null);
  const [loanStatus, setLoanStatus] = useState<LoanStatus>("pending");
  const [submissionDate, setSubmissionDate] = useState<Date | null>(null);

  const handleOpenLoanButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLoanCreated = (data: LoanData) => {
    setLoanData(data);
    setHasLoan(true);
    setIsModalOpen(false);
    setLoanStatus("pending");
    setSubmissionDate(new Date());
    setTimeout(() => {
      setLoanStatus("approved");
    }, 5000);
  };

  const features = [
    {
      icon: <Percent size={22} strokeWidth={2} />,
      title: "Suku Bunga Rendah",
      description: "Suku bunga tetap 5% per tahun.",
    },
    {
      icon: <CalendarClock size={22} strokeWidth={2} />,
      title: "Tenor Fleksibel",
      description: "Pilih periode pembayaran sesuai kebutuhan.",
    },
    {
      icon: <Timer size={22} strokeWidth={2} />,
      title: "Persetujuan Cepat",
      description: "Permintaan yang memenuhi syarat akan segera disetujui.",
    },
    {
      icon: <FileText size={22} strokeWidth={2} />,
      title: "Persyaratan Mudah",
      description: "Cukup isi detail pinjaman Anda.",
    },
  ];

  // Helper for status color
  const statusColor =
    loanStatus === "pending" ? styles.statusPending : styles.statusApproved;

  // Helper for amount formatting (Rupiah)
  const formatRupiah = (amount: string) => {
    // Remove non-numeric, parse, format
    const num = Number(amount.replace(/[^0-9]/g, ""));
    return isNaN(num)
      ? amount
      : num.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  };

  // Add this helper function:
  function calculateMonthlyInstallment(
    amount: string,
    tenure: string,
    interestRate = 5
  ) {
    const principal = Number(amount.replace(/[^0-9]/g, ""));
    const months = Number(tenure);
    if (!principal || !months) return null;
    const totalWithInterest = principal * (1 + interestRate / 100);
    return Math.round(totalWithInterest / months);
  }

  return (
    <div className={styles.pageWrapper}>
      {hasLoan && loanStatus === "pending" && (
        <h1 className={styles.pageTitle}>Permintaan Pinjaman</h1>
      )}
      {hasLoan && loanStatus === "approved" && (
        <h1 className={styles.pageTitle}>Pinjaman Saya</h1>
      )}
      {/* No title if user has not created a loan */}
      {!hasLoan && (
        <div className={styles.introSection}>
          <div className={styles.introHero}>
            <div className={styles.introHeroTitle}>
              Ajukan Pinjaman Pertama Anda
            </div>
            <div className={styles.introHeroDescription}>
              Mulai dengan pinjaman fleksibel yang sesuai untuk Anda.
              <br />
              Nikmati proses sederhana, suku bunga kompetitif, dan persetujuan
              cepat.
            </div>
            <Button
              onClick={handleOpenLoanButtonClick}
              className={styles.introHeroButton}
            >
              Mulai
            </Button>
          </div>
          <div className={styles.introFeaturesGrid}>
            {features.map((feature, idx) => (
              <div key={idx} className={styles.introFeatureCard}>
                <div className={styles.introFeatureIcon}>{feature.icon}</div>
                <div className={styles.introFeatureTitle}>{feature.title}</div>
                <div className={styles.introFeatureDescription}>
                  {feature.description}
                </div>
              </div>
            ))}
          </div>
          {isModalOpen && (
            <LoanModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onLoanCreated={handleLoanCreated}
            />
          )}
        </div>
      )}
      {hasLoan && loanData && loanStatus === "pending" && (
        <div className={styles.submittedLoanWrapper}>
          <div className={styles.submittedLoanTitle}>
            Permintaan Pinjaman Telah Diajukan!
          </div>
          <div className={styles.submittedLoanSubtitle}>
            Permintaan pinjaman Anda telah berhasil diajukan
            <br />
            dan sedang dalam proses peninjauan.
          </div>
          <div className={styles.submittedLoanDetails}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Tanggal Pengajuan:</span>
              <span className={styles.detailValue}>
                {submissionDate
                  ? submissionDate.toLocaleString("id-ID", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  : "-"}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Jumlah Pinjaman:</span>
              <span className={styles.detailValue}>
                {formatRupiah(loanData.amount)}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Tenor:</span>
              <span className={styles.detailValue}>{loanData.tenure}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Tujuan:</span>
              <span className={styles.detailValue}>{loanData.purpose}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Status:</span>
              <span className={statusColor}>
                {loanStatus === "pending"
                  ? "Menunggu"
                  : loanStatus === "approved"
                  ? "Disetujui"
                  : "Ditolak"}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Angsuran Bulanan:</span>
              <span className={styles.detailValue}>
                {loanData.monthlyInstallment !== null
                  ? formatRupiah(loanData.monthlyInstallment.toString())
                  : "-"}
              </span>
            </div>
          </div>
          <div className={styles.submittedLoanRedirect}>
            Anda akan diarahkan sebentar lagi...
          </div>
        </div>
      )}
      {hasLoan &&
        loanData &&
        (loanStatus === "approved" || loanStatus === "rejected") && (
          <div>
            <LoanCard loan={loanData} status={loanStatus} />
          </div>
        )}
    </div>
  );
}
