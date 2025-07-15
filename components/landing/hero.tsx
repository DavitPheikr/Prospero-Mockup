"use client";
import { useState } from "react";
import AccountModal from "@/components/landing/accountModal";
import AccountCard from "./accountCard";
import styles from "@/scss/components/createAccount/hero.module.scss";
import MandatoryAccountCard from "@/components/landing/MandatoryAccountCard";
import PrincipalAccountCard from "@/components/landing/PrincipalAccountCard";
import VoluntaryAccountCard from "@/components/landing/VoluntaryAccountCard";
import PaymentAlertCard from "@/components/account/dashboard/PaymentAlertCard";
import RecentTransactionsCard from "../account/dashboard/RecentTransactionsCard";
import AccountStatisticsCard from "../account/dashboard/AccountStatisticsCard";
export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasVoluntaryAccount, setHasVoluntaryAccount] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAccountCreated = () => {
    setHasVoluntaryAccount(true);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.heroContainer}>
        <div className={styles.leftColumn}>
          <div className={styles.pageContainer}>
            <div className={styles.sumSection}>
              <h3 className={styles.sumLabel}>SUM AMOUNT</h3>
              <h1 className={styles.sumAmount}>Rp 5,158.88</h1>
            </div>

            <div className={styles.accountsGrid}>
              <PrincipalAccountCard />
              <MandatoryAccountCard />
              {hasVoluntaryAccount && <VoluntaryAccountCard type="voluntary" />}

              {!hasVoluntaryAccount && (
                <AccountCard onButtonClick={handleCardClick} />
              )}
            </div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <PaymentAlertCard type="mandatory" />
          <div className={styles.rightContainer}>
            <AccountStatisticsCard type="all" href="/statistics?type=all" />

            <RecentTransactionsCard type={"all"} />
          </div>
        </div>
      </div>

      <AccountModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAccountCreated={handleAccountCreated}
      />
    </>
  );
}
