"use client";
import { useRouter } from "next/navigation";
import styles from "@/scss/components/hasAccount/save/mandatory.module.scss";
import { accountData } from "@/data/mandatoryAccountData/data";

export default function MandatoryAccountDetailsCard() {
  const router = useRouter();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className={styles.accountDetailsCard}>
      <div className={styles.balanceHeader}>
        <div className={styles.balanceContent}>
          <div className={styles.mainBalance}>
            {formatCurrency(accountData.balance)}
          </div>
          <div className={styles.accountTypeBadge}>
            {accountData.accountType}
          </div>
        </div>
      </div>

      <div className={styles.accountDetails}>
        <h3 className={styles.sectionTitle}>DETAIL AKUN</h3>

        <div className={styles.detailRow}>
          <span className={styles.label}>Nomor Rekening</span>
          <span className={styles.value}>{accountData.accountNumber}</span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.label}>Tanggal Dibuat</span>
          <span className={styles.value}>{accountData.dateOfCreation}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Setoran / Interval </span>
          <span className={styles.value}>200 Rp / Bulan</span>
        </div>
      </div>
    </div>
  );
}
