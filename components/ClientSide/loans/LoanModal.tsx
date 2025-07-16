import { useState, useRef } from "react";
import Button from "@/components/ui/Button";
import styles from "@/scss/components/createAccount/accountModal.module.scss";
import loanModalStyles from "@/scss/components/loans/loanModal.module.scss";
import { Zap, Check } from "lucide-react";

type LoanData = {
  amount: string;
  purpose: string;
  tenure: string;
  monthlyInstallment: number | null;
};

interface LoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoanCreated: (loanData: LoanData) => void;
}

export default function LoanModal({
  isOpen,
  onClose,
  onLoanCreated,
}: LoanModalProps) {
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [tenure, setTenure] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  // Dummy interest rate for mockup
  const interestRate = 5; // 5% per year

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onLoanCreated({
        amount,
        purpose,
        tenure,
        monthlyInstallment,
      });
    }, 500);
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

  // Simple monthly installment calculation (mockup)
  const canCalculate =
    amount && tenure && !isNaN(Number(amount)) && !isNaN(Number(tenure));
  const principal = Number(amount);
  const months = Number(tenure);
  const totalInterest = canCalculate
    ? Math.ceil(principal * (interestRate / 100))
    : 0;
  const totalRepayment = canCalculate ? principal + totalInterest : 0;
  const monthlyInstallment = calculateMonthlyInstallment(amount, tenure);

  if (!isOpen) return null;

  // Loan info for right half
  const loanInfo = {
    title: "Ajukan Pinjaman Pertama Anda",
    features: [
      {
        title: "Isi Data Pinjaman",
        description:
          "Masukkan jumlah, tujuan, dan tenor pinjaman sesuai kebutuhan Anda.",
      },
      {
        title: "Tinjauan Koperasi",
        description:
          "Pengajuan Anda akan diperiksa dan dikonfirmasi oleh tim koperasi.",
      },
      {
        title: "Pencairan Dana",
        description:
          "Jika disetujui, dana akan segera dicairkan ke rekening Anda.",
      },
      {
        title: "Angsuran Mudah",
        description:
          "Bayar angsuran bulanan sesuai jadwal yang telah disepakati.",
      },
    ],
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={onClose}>
            ←
          </button>
          <div className={styles.titleSection}>
            <h2 className={styles.title}>Pengajuan Pinjaman</h2>
            <p className={styles.subtitle}>Ajukan pinjaman baru</p>
          </div>
          <div className={styles.cardIcon}>
            <Zap size="20" />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.formSection}>
            {!submitted ? (
              <>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Jumlah Pinjaman <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="input"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Masukkan jumlah"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: 8,
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Tujuan <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="Tujuan pinjaman"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: 8,
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Tenor (bulan) <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="input"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    placeholder="misal: 12"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: 8,
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
                {canCalculate && (
                  <div className={loanModalStyles.installmentCard}>
                    <div className={loanModalStyles.installmentTitle}>
                      Estimasi Angsuran Bulanan
                    </div>
                    <div className={loanModalStyles.installmentAmount}>
                      Rp {monthlyInstallment?.toLocaleString()}
                    </div>
                    <div className={loanModalStyles.installmentRow}>
                      <span>Suku Bunga:</span>
                      <span>{interestRate}% per tahun</span>
                    </div>
                    <div className={loanModalStyles.installmentRow}>
                      <span>Total Pembayaran:</span>
                      <span>Rp {totalRepayment.toLocaleString()}</span>
                    </div>
                    <div className={loanModalStyles.installmentDetailsRow}>
                      <div className={loanModalStyles.installmentDetailsCol}>
                        <span
                          className={loanModalStyles.installmentDetailsLabel}
                        >
                          Pokok
                        </span>
                        <span>Rp {principal.toLocaleString()}</span>
                      </div>
                      <div className={loanModalStyles.installmentDivider} />
                      <div className={loanModalStyles.installmentDetailsCol}>
                        <span
                          className={loanModalStyles.installmentDetailsLabel}
                        >
                          Bunga
                        </span>
                        <span>Rp {totalInterest.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div
                style={{
                  margin: "2rem 0",
                  padding: "2rem",
                  border: "1px solid #e0e7ef",
                  borderRadius: 12,
                  background: "#f7fafc",
                  color: "#1e293b",
                  fontFamily: "inherit",
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    marginBottom: 12,
                  }}
                >
                  Data dikirim ke koperasi
                </div>
                <div style={{ fontSize: "1.1rem", color: "#64748b" }}>
                  Permintaan pinjaman Anda telah diajukan.
                  <br />
                  Menunggu persetujuan dari koperasi...
                </div>
              </div>
            )}
          </div>
          <div className={styles.infoSection}>
            <div className={styles.infoHeader}>
              <h3 className={styles.infoTitle}>{loanInfo.title}</h3>
            </div>
            <div className={styles.featuresGrid}>
              {loanInfo.features.map((feature, idx) => (
                <div key={idx} className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <Check />
                  </div>
                  <div className={styles.featureContent}>
                    <h4 className={styles.featureTitle}>{feature.title}</h4>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          {!submitted && (
            <Button
              onClick={handleSubmit}
              className={styles.createButton}
              disabled={
                isSubmitting ||
                !amount ||
                !purpose ||
                !tenure ||
                Number(amount) <= 0 ||
                Number(tenure) <= 0
              }
            >
              {isSubmitting ? "MEMBUAT..." : "BUAT PINJAMAN"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
