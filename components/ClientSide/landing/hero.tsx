"use client";
import { useState } from "react";
import AccountModal from "@/components/ClientSide/landing/accountModal";
import AccountCard from "./accountCard";
import styles from "@/scss/components/createAccount/hero.module.scss";
import MandatoryAccountCard from "@/components/ClientSide/landing/MandatoryAccountCard";
import PrincipalAccountCard from "@/components/ClientSide/landing/PrincipalAccountCard";
import VoluntaryAccountCard from "@/components/ClientSide/landing/VoluntaryAccountCard";
import PaymentAlertCard from "@/components/ClientSide/dashboard/PaymentAlertCard";
import RecentTransactionsCard from "../dashboard/RecentTransactionsCard";
import AccountStatisticsCard from "../dashboard/AccountStatisticsCard";
import LoanRequestsCard from "../dashboard/LoanRequestsCard";
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
              <h3 className={styles.sumLabel}>JUMLAH TOTAL</h3>
              <h1 className={styles.sumAmount}>Rp 5.158,88</h1>
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
            <div className={styles.rightColumnLeftPart}>
              <AccountStatisticsCard type="all" />
              <LoanRequestsCard />
            </div>

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
