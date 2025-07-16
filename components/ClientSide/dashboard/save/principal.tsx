"use client";
import { useRouter } from "next/navigation";
import styles from "@/scss/components/hasAccount/save/principal.module.scss";
import { accountData } from "@/data/principalAccountData/data";

export default function PrincipalAccountDetailsCard() {
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
          <div className={styles.accountTypeBadge}>Pokok</div>
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
          <span className={styles.label}>Setoran Pokok</span>
          <span className={styles.value}>{accountData.initialDeposit}</span>
        </div>
      </div>
    </div>
  );
}
