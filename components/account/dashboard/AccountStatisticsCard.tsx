"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/scss/components/hasAccount/AccountStatisticsCard.module.scss";
import Button from "@/components/ui/Button";
import {
  TrendingUp,
  Calendar,
  DollarSign,
  PiggyBank,
  Router,
} from "lucide-react";
import {
  getMandatoryStatistics,
  periods as mandatoryPeriods,
} from "@/data/mandatoryAccountData/statisticsData";
import {
  getVoluntaryStatistics,
  periods as voluntaryPeriods,
} from "@/data/voluntaryAccountData/statisticsData";
import {
  getPrincipalStatistics,
  periods as principalPeriods,
} from "@/data/principalAccountData/statisticsData";
import {
  getNewVoluntarystistics,
  periods as newVoluntaryPeriods,
} from "@/data/newVoluntaryAccountData/statisticsData";
import {
  getAllAccountsStatistics,
  periods as allAccountsPeriods,
} from "@/data/allData/statisticsData";

interface AccountStatisticsCardProps {
  type: string;
}

export default function AccountStatisticsCard({
  type,
}: AccountStatisticsCardProps) {
  const periods =
    type === "voluntary"
      ? newVoluntaryPeriods
      : type === "principal"
      ? principalPeriods
      : type === "voluntary-data"
      ? voluntaryPeriods
      : type === "all"
      ? allAccountsPeriods
      : mandatoryPeriods;
  console.log(type);
  const [activePeriod, setActivePeriod] = useState("3 months");

  const getCurrentData = () => {
    const period = activePeriod as any;
    switch (type) {
      case "voluntary":
        return getNewVoluntarystistics(period, "all");
      case "principal":
        return getPrincipalStatistics(period, "all");
      case "voluntary-data":
        return getVoluntaryStatistics(period, "all");
      case "account":
        return getAllAccountsStatistics(period, "all");
      default:
        return getMandatoryStatistics(period, "all");
    }
  };

  const currentData = getCurrentData();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };
  const router = useRouter();
  const handleButtonClick = () => {
    router.push(`/statistics?type=${type}`);
  };
  return (
    <div className={styles.statisticsCard}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <div className={styles.iconWrapper}>
            <TrendingUp size={24} />
          </div>
          <div>
            <h3 className={styles.title}>Account Statistics</h3>
            <div className={styles.periodSelector}>
              <Calendar size={16} />
              <span className={styles.periodLabel}>Period:</span>
              {periods.map((period, index) => (
                <button
                  key={period}
                  onClick={() => setActivePeriod(period)}
                  className={`${styles.periodOption} ${
                    activePeriod === period ? styles.active : ""
                  }`}
                >
                  {period}
                  {index < periods.length - 1 && (
                    <span className={styles.separator}>,</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.mainStat}>
          <div className={styles.mainStatHeader}>
            <DollarSign size={20} />
            <span className={styles.mainStatLabel}>Total Profit:</span>
          </div>
          <div className={styles.mainStatValue}>
            {formatCurrency(currentData.totalProfit || 0)}
          </div>
        </div>

        <div
          className={
            type === "account"
              ? styles.breakdownSectionAccount
              : styles.breakdownSection
          }
        >
          <div className={styles.breakdownItem}>
            <div className={styles.breakdownHeader}>
              <div className={styles.breakdownIcon}>
                <TrendingUp size={18} />
              </div>
              <span className={styles.breakdownLabel}>
                Profit From Interest
              </span>
            </div>
            <div className={styles.breakdownValue}>
              {formatCurrency(currentData.profitFromInterest || 0)}
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${currentData.interestProgress || 0}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.separator}></div>

          <div className={styles.breakdownItem}>
            <div className={styles.breakdownHeader}>
              <div className={styles.breakdownIcon}>
                <PiggyBank size={18} />
              </div>
              <span className={styles.breakdownLabel}>Profit From SHU</span>
            </div>
            <div className={styles.breakdownValue}>
              {formatCurrency(currentData.profitFromSHU || 0)}
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${currentData.shuProgress || 0}%` }}
              ></div>
            </div>
          </div>

          {(type === "voluntary-data" ||
            type === "voluntary" ||
            type === "mandatory" ||
            type === "account") && (
            <>
              <div className={styles.separator}></div>

              <div className={styles.breakdownItem}>
                <div className={styles.breakdownHeader}>
                  <div className={styles.breakdownIcon}>
                    <DollarSign size={18} />
                  </div>
                  <span className={styles.breakdownLabel}>
                    Profit From Deposits
                  </span>
                </div>
                <div className={styles.breakdownValue}>
                  {formatCurrency(currentData.profitFromDeposits || 0)}
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${currentData.depositsProgress || 0}%`,
                    }}
                  ></div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <Button
          className={styles.viewDetailedButton}
          onClick={handleButtonClick}
        >
          View Detailed Earnings
        </Button>
      </div>
    </div>
  );
}
