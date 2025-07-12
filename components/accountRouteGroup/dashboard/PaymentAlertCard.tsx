import styles from "@/scss/components/hasAccount/PaymentAlertCard.module.scss";
import Button from "@/components/ui/Button";
import { paymentData as mandatoryPaymentData } from "@/data/mandatoryAccountData/data";
import {
  paymentData as dynamicPaymentData,
  accountData as dynamicAccountData,
} from "@/data/dynamicAccountData/data";

interface PaymentAlertCardProps {
  type?: string;
}

export default function PaymentAlertCard({ type }: PaymentAlertCardProps) {
  const paymentData =
    type === "dynamic" ? dynamicPaymentData : mandatoryPaymentData;

  // Determine payment type and content based on account status
  const isDynamic = type === "dynamic";
  const hasPrincipal = isDynamic && dynamicAccountData.hasPrincipalDeposit;
  const isPrincipalPayment =
    isDynamic && (paymentData.isPrincipalPayment || false);

  const getPaymentTitle = () => {
    if (isPrincipalPayment) {
      return "Principal Core Deposit Required";
    }
    return "Upcoming Mandatory Payment";
  };

  const getPaymentDescription = () => {
    if (isPrincipalPayment) {
      return "Complete your account setup with a principal deposit of ";
    }
    return "Savings Account requires a payment of ";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Don't render if no payment is required
  if (paymentData.amount === 0) {
    return null;
  }

  return (
    <div className={styles.paymentAlertCard}>
      <div className={styles.header}>
        <div className={styles.iconSection}>
          <div className={styles.clockIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <polyline
                points="12,6 12,12 16,14"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className={styles.titleSection}>
            <h3 className={styles.title}>{getPaymentTitle()}</h3>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.dueBadge}>
            <span className={styles.dueText}>
              Due in {paymentData.daysRemaining} days
            </span>
          </div>
          <Button>Pay Now</Button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.paymentInfo}>
          <span className={styles.description}>
            {getPaymentDescription()}
            <span className={styles.amount}>
              {formatCurrency(paymentData.amount)}
            </span>
          </span>
        </div>

        <div className={styles.dueDate}>Due date: {paymentData.dueDate}</div>
      </div>
    </div>
  );
}
