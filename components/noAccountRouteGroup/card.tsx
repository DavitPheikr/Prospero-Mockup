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
        { label: "", value: "No Initial Deposit Required" },
        { label: "Add funds:", value: "Monthly Mandatory Payments" },
        { label: "", value: "High Interest Rates" },
        { label: "", value: "Competitive SHU Profits" },
      ],
      buttonText: "OPEN MANDATORY DEPOSIT",
    },
    v2: {
      title: "Voluntary Savings Account",
      description: "Save at your own pace with no fixed payment schedule.",
      rateInfo: "Interest Rate up to 6.0% APR",
      details: [
        { label: "", value: "No Initial Deposit Required" },
        { label: "Add funds:", value: "Whenever desired" },
        { label: "", value: "Competitive Interest Rates" },
        { label: "", value: "High SHU Profits" },
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
