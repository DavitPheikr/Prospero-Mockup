"use client";
import { useRouter } from "next/navigation";
import styles from "@/scss/components/hasAccount/mandatoryAccountCard.module.scss";
import { accountData } from "@/data/mandatoryAccountData/data";

export default function MandatoryAccountCard() {
  const router = useRouter();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleCardClick = () => {
    router.push("/account/mandatory");
  };

  return (
    <div className={styles.accountCard} onClick={handleCardClick}>
      <div className={styles.accountLeft}>
        <div className={styles.accountTitle}>
          <h3>Mandatory Account</h3>
        </div>
      </div>
      <div className={styles.accountRight}>
        <div className={styles.accountAmount}>
          {formatCurrency(accountData.balance)}
        </div>
        <div className={styles.accountDetails}>
          <div className={styles.accountDetail}>
            <span className={styles.detailLabel}>Account Number</span>
            <span className={styles.detailValue}>
              {accountData.accountNumber}
            </span>
          </div>
          <div className={styles.accountDetail}>
            <span className={styles.detailLabel}>Date Created</span>
            <span className={styles.detailValue}>
              {accountData.dateOfCreation}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
