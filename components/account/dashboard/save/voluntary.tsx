"use client";
import { useRouter } from "next/navigation";
import styles from "@/scss/components/hasAccount/save/voluntary.module.scss";
import { accountData } from "@/data/voluntaryAccountData/data";
import { newAccountData } from "@/data/newVoluntaryAccountData/data";

interface VoluntaryAccountDetailsCardProps {
  type: string;
}
export default function VoluntaryAccountDetailsCard({
  type,
}: VoluntaryAccountDetailsCardProps) {
  const router = useRouter();
  const displayData = type === "voluntary" ? newAccountData : accountData;

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
            {formatCurrency(displayData.balance)}
          </div>
          <div className={styles.accountTypeBadge}>
            {displayData.accountType}
          </div>
        </div>
      </div>

      <div className={styles.accountDetails}>
        <h3 className={styles.sectionTitle}>ACCOUNT DETAILS</h3>

        <div className={styles.detailRow}>
          <span className={styles.label}>Account Number</span>
          <span className={styles.value}>{displayData.accountNumber}</span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.label}>Date Of Creation</span>
          <span className={styles.value}>{displayData.dateOfCreation}</span>
        </div>
      </div>
    </div>
  );
}
