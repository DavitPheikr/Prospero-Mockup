"use client";
import { useRouter } from "next/navigation";
import styles from "@/scss/components/createAccount/LoanRequestsCard.module.scss";
import Button from "@/components/ui/Button";

export default function LoanRequestsCard() {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/loans");
  };
  return (
    <div>
      <div className={styles.loansCard}>
        <div className={styles.header}>
          <h3 className={styles.title}>Buat Permintaan Pinjaman</h3>
        </div>

        <div className={styles.footer}>
          <Button className={styles.viewAllButton} onClick={handleButtonClick}>
            Lihat Lebih Banyak
          </Button>
        </div>
      </div>
    </div>
  );
}
