"use client";
import styles from "@/scss/components/createAccount/accountCard.module.scss";
import { Zap } from "lucide-react";
import Button from "../../ui/Button";

interface AccountCardProps {
  onButtonClick?: () => void;
}

export default function AccountCard({ onButtonClick }: AccountCardProps) {
  return (
    <div className={styles.simpleCard}>
      <div className={styles.cardContent}>
        <div className={styles.iconAndText}>
          <div className={styles.cardIcon}>
            <Zap size={24} />
          </div>
          <p className={styles.cardText}>Tertarik dengan rekening sukarela?</p>
        </div>
        <Button className={styles.cardButton} onClick={onButtonClick}>
          Pelajari Lebih Lanjut
        </Button>
      </div>
    </div>
  );
}
