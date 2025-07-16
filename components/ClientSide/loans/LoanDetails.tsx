import styles from "@/scss/components/loans/loanDetails.module.scss";
type LoanData = {
  amount: string;
  purpose: string;
  tenure: string;
  monthlyInstallment: number | null;
  paidAmount?: number;
  creationDate?: string;
  interestRate?: number;
  totalRepayment?: number;
  remainingTenure?: number;
};

type LoanStatus = "pending" | "approved" | "rejected";

interface LoanDetailsProps {
  loan: LoanData;
  status: LoanStatus;
}

const formatRupiah = (amount: number | string | undefined) => {
  if (typeof amount === "string") {
    const num = Number(amount.replace(/[^0-9]/g, ""));
    return isNaN(num)
      ? amount
      : num.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  }
  if (typeof amount === "number") {
    return amount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  }
  return "-";
};

export default function LoanDetails({ loan, status }: LoanDetailsProps) {
  if (!loan) return null;

  const totalLoanAmount = loan.amount;
  const paidLoanAmount = loan.paidAmount ?? 0;
  const loanAmountLeft = Math.max(Number(totalLoanAmount) - paidLoanAmount, 0);
  // Always use today's date for loan creation date
  const creationDate = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const interestRate = loan.interestRate ?? 5;
  const totalRepayment =
    loan.totalRepayment ??
    (loan.monthlyInstallment && loan.tenure
      ? loan.monthlyInstallment * Number(loan.tenure)
      : undefined);
  const remainingTenure =
    loan.remainingTenure ??
    (loan.tenure
      ? Number(loan.tenure) -
        Math.floor(paidLoanAmount / (loan.monthlyInstallment || 1))
      : undefined);

  return (
    <div className={styles.accountDetailsCard}>
      <div className={styles.balanceHeader}>
        <div className={styles.balanceContent}>
          <div className={styles.accountTypeBadge}>Sisa Pinjaman</div>
          <div className={styles.mainBalance}>
            {formatRupiah(loanAmountLeft)}
          </div>
        </div>
      </div>
      <div className={styles.accountDetails}>
        <h3 className={styles.sectionTitle}>DETAIL PINJAMAN</h3>
        <div className={styles.detailRow}>
          <span className={styles.label}>Total Pinjaman</span>
          <span className={styles.value}>{formatRupiah(totalLoanAmount)}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Pinjaman Terbayar</span>
          <span className={styles.value}>{formatRupiah(paidLoanAmount)}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Tanggal Pembuatan Pinjaman</span>
          <span className={styles.value}>{creationDate}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Tujuan Pinjaman</span>
          <span className={styles.value}>{loan.purpose}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Total Tenor</span>
          <span className={styles.value}>{loan.tenure} bulan</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Sisa Tenor</span>
          <span className={styles.value}>{remainingTenure ?? "-"} bulan</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Suku Bunga</span>
          <span className={styles.value}>{interestRate}%</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Angsuran Bulanan</span>
          <span className={styles.value}>
            {loan.monthlyInstallment
              ? formatRupiah(loan.monthlyInstallment)
              : "-"}
          </span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Total Pembayaran</span>
          <span className={styles.value}>
            {totalRepayment ? formatRupiah(totalRepayment) : "-"}
          </span>
        </div>
      </div>
    </div>
  );
}
