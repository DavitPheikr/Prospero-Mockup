"use client";
import styles from "@/scss/components/createAccount/accountCard.module.scss";
import { Wallet, Zap } from "lucide-react";
import Button from "../ui/Button";
interface AccountCardProps {
  cardType: "v1" | "v2"; // 'v1' for mandatory payments, 'v2' for no mandatory payments
  onButtonClick?: () => void;
}

const cardData = {
  v1: {
    icon: Wallet,
    title: "Mandatory Account",
    subtitle: "Structured savings with required monthly contributions",
    features: [
      "Required monthly payment commitment",
      "Enhanced interest rates for deposits",
      "Quarterly SHU profit distributions",
      "Disciplined savings framework",
    ],
  },
  v2: {
    icon: Zap,
    title: "Voluntary Account",
    subtitle: "Flexible savings without payment obligations",
    features: [
      "No required monthly payments",
      "Deposit at your own convenience",
      "Standard interest rate structure",
      "Maximum savings flexibility",
    ],
  },
};

export default function AccountCard({
  cardType,
  onButtonClick,
}: AccountCardProps) {
  const card = cardData[cardType];
  const IconComponent = card.icon;

  return (
    <div className={`${styles.depositCard} ${styles[cardType]}`}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>
          <IconComponent size={35} />
        </div>
        <h3 className={styles.cardTitle}>{card.title}</h3>
        <p className={styles.cardSubtitle}>{card.subtitle}</p>
      </div>

      <div className={styles.cardBody}>
        <ul className={styles.featuresList}>
          {card.features.map((feature, index) => (
            <li key={index} className={styles.featureItem}>
              <span className={styles.featureText}>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.cardFooter}>
        <Button className={styles.cardButton} onClick={onButtonClick}>
          Create {card.title}
        </Button>
      </div>
    </div>
  );
}
