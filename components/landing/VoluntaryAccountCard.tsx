"use client";
import { useRouter } from "next/navigation";
import styles from "@/scss/components/hasAccount/voluntaryAccountCard.module.scss";
import { accountData } from "@/data/voluntaryAccountData/data";
import { newAccountData } from "@/data/newVoluntaryAccountData/data";

interface VoluntaryAccountCardProps {
  type: string;
}
export default function VoluntaryAccountCard({
  type,
}: VoluntaryAccountCardProps) {
  const router = useRouter();
  const displayData = type === "voluntary" ? newAccountData : accountData;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleCardClick = () => {
    router.push("/account/voluntary");
  };

  return (
    <div className={styles.accountCard} onClick={handleCardClick}>
      <div className={styles.accountLeft}>
        <div className={styles.accountTitle}>
          <h3>Voluntary Account</h3>
        </div>
      </div>
      <div className={styles.accountRight}>
        <div className={styles.accountAmount}>
          {formatCurrency(displayData.balance)}
        </div>
        <div className={styles.accountDetails}>
          <div className={styles.accountDetail}>
            <span className={styles.detailLabel}>Account Number</span>
            <span className={styles.detailValue}>
              {displayData.accountNumber}
            </span>
          </div>
          <div className={styles.accountDetail}>
            <span className={styles.detailLabel}>Date Created</span>
            <span className={styles.detailValue}>
              {displayData.dateOfCreation}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
