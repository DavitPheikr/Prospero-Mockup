"use client";
import { useRouter } from "next/navigation";
import styles from "@/scss/components/hasAccount/principalAccountCard.module.scss";
import { accountData } from "@/data/principalAccountData/data";

export default function PrincipalAccountCard() {
  const router = useRouter();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleCardClick = () => {
    router.push("/account/principal");
  };

  return (
    <div className={styles.accountCard} onClick={handleCardClick}>
      <div className={styles.accountLeft}>
        <div className={styles.accountTitle}>
          <h3>Simpanan Pokok</h3>
        </div>
      </div>
      <div className={styles.accountRight}>
        <div className={styles.accountAmount}>
          {formatCurrency(accountData.balance)}
        </div>
        <div className={styles.accountDetails}>
          <div className={styles.accountDetail}>
            <span className={styles.detailLabel}>Nomor Rekening</span>
            <span className={styles.detailValue}>
              {accountData.accountNumber}
            </span>
          </div>
          <div className={styles.accountDetail}>
            <span className={styles.detailLabel}>Tanggal Dibuat</span>
            <span className={styles.detailValue}>
              {accountData.dateOfCreation}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
