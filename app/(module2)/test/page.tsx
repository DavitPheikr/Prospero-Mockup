"use client";
import AccountCard from "@/components/landing/accountCard";
import styles from "./page.module.scss";

export default function AccountsPage() {
  const handleLearnMore = () => {
    console.log("Learn more clicked");
  };

  return (
    <div className={styles.pageContainer}>
      {/* Sum Amount Section */}
      <div className={styles.sumSection}>
        <h3 className={styles.sumLabel}>SUM AMOUNT</h3>
        <h1 className={styles.sumAmount}>Rp 85.003.098,68</h1>
      </div>

      {/* Accounts Grid */}
      <div className={styles.accountsGrid}>
        {/* Initial Account */}
        <div className={styles.accountCard}>
          <div className={styles.accountLeft}>
            <div className={styles.accountTitle}>
              <h3>Initial Account</h3>
            </div>
          </div>
          <div className={styles.accountRight}>
            <div className={styles.accountAmount}>Rp 85,000,000.50</div>
            <div className={styles.accountDetails}>
              <div className={styles.accountDetail}>
                <span className={styles.detailLabel}>Account Number</span>
                <span className={styles.detailValue}>3456789012</span>
              </div>
              <div className={styles.accountDetail}>
                <span className={styles.detailLabel}>Date Created</span>
                <span className={styles.detailValue}>01.09.2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Account */}
        <div className={styles.accountCard}>
          <div className={styles.accountLeft}>
            <div className={styles.accountTitle}>
              <h3>Mandatory Account</h3>
            </div>
          </div>
          <div className={styles.accountRight}>
            <div className={styles.accountAmount}>Rp 138.38</div>
            <div className={styles.accountDetails}>
              <div className={styles.accountDetail}>
                <span className={styles.detailLabel}>Account Number</span>
                <span className={styles.detailValue}>1748951657</span>
              </div>
              <div className={styles.accountDetail}>
                <span className={styles.detailLabel}>Date Created</span>
                <span className={styles.detailValue}>01.09.2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Voluntary Account */}
        <div className={styles.accountCard}>
          <div className={styles.accountLeft}>
            <div className={styles.accountTitle}>
              <h3>Voluntary Account</h3>
            </div>
          </div>
          <div className={styles.accountRight}>
            <div className={styles.accountAmount}>Rp 2,959.80</div>
            <div className={styles.accountDetails}>
              <div className={styles.accountDetail}>
                <span className={styles.detailLabel}>Account Number</span>
                <span className={styles.detailValue}>9876543210</span>
              </div>
              <div className={styles.accountDetail}>
                <span className={styles.detailLabel}>Date Created</span>
                <span className={styles.detailValue}>15.08.2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Card at bottom */}
      <div className={styles.bottomCard}>
        <AccountCard onButtonClick={handleLearnMore} />
      </div>
    </div>
  );
}
