"use client";
import styles from "@/scss/components/card.module.scss";
import Button from "@/components/ui/Button";

interface DepositCardProps {
  cardType: "v1" | "v2"; // 'v1' for mandatory payments, 'v2' for no mandatory payments
  onButtonClick?: () => void;
}

export default function DepositCard({
  cardType,
  onButtonClick,
}: DepositCardProps) {
  const cardData = {
    v1: {
      title: "Mandatory Savings Account",
      description:
        "Achieve your financial goals with regular, disciplined savings and higher interest.",
      rateInfo: "Interest Rate up to 8.5% APR",
      details: [
        { label: "Initial deposit:", value: "500 GEL" },
        { label: "Add funds:", value: "Monthly Mandatory Payments" },
        { label: "Withdraw:", value: "At maturity (e.g., 12 months)" },
        { label: "Receive interest:", value: "Quarterly" },
      ],
      buttonText: "OPEN MANDATORY DEPOSIT",
    },
    v2: {
      title: "Flexible Savings Account",
      description:
        "Save at your own pace with no fixed payment schedule and easy access to funds.",
      rateInfo: "Interest Rate up to 6.0% APR",
      details: [
        { label: "Initial deposit:", value: "10 GEL" },
        { label: "Add funds:", value: "Whenever desired" },
        { label: "Withdraw:", value: "Anytime" },
        { label: "Receive interest:", value: "Annually" },
      ],
      buttonText: "OPEN FLEXIBLE DEPOSIT",
    },
  };

  const currentCard = cardData[cardType];

  const handleButtonClick = () => {
    if (onButtonClick) onButtonClick();
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.headerSection}>
        <h2 className={styles.title}>{currentCard.title}</h2>
        <p className={styles.description}>{currentCard.description}</p>
        <p className={styles.rateInfo}>{currentCard.rateInfo}</p>
      </div>

      <div className={styles.detailsSection}>
        {currentCard.details.map((item, index) => (
          <div key={index} className={styles.detailItem}>
            <span className={styles.detailLabel}>{item.label}</span>
            <span className={styles.detailValue}>{item.value}</span>
          </div>
        ))}
      </div>

      <div className={styles.footerSection}>
        <Button
          onClick={handleButtonClick}
          className={styles.openDepositButton}
        >
          {currentCard.buttonText}
        </Button>
      </div>
    </div>
  );
}
