import styles from "@/scss/components/hasAccount/AccountDetailsCard.module.scss";
import { accountData as mandatoryAccountData } from "@/data/mandatoryAccountData/data";
import { accountData as voluntaryAccountData } from "@/data/voluntaryAccountData/data";
import { accountData as dynamicAccountData } from "@/data/dynamicAccountData/data";

interface AccountDetailsCardProps {
  type: string;
}

export default function AccountDetailsCard({ type }: AccountDetailsCardProps) {
  const accountData =
    type === "voluntary"
      ? voluntaryAccountData
      : type === "dynamic"
      ? dynamicAccountData
      : mandatoryAccountData;

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
        <h3 className={styles.sectionTitle}>ACCOUNT DETAILS</h3>

        <div className={styles.detailRow}>
          <span className={styles.label}>Account Number</span>
          <span className={styles.value}>{accountData.accountNumber}</span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.label}>Account Type</span>
          <span className={styles.value}>{accountData.accountTypeFull}</span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.label}>Date Of Creation</span>
          <span className={styles.value}>{accountData.dateOfCreation}</span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.label}>Initial Deposit</span>
          <span className={styles.value}>{accountData.initialDeposit}</span>
        </div>
      </div>
    </div>
  );
}
