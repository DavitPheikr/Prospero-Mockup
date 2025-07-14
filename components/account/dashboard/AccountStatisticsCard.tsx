"use client";
import { useState } from "react";
import styles from "@/scss/components/hasAccount/AccountStatisticsCard.module.scss";
import Button from "@/components/ui/Button";
import { TrendingUp, Calendar, DollarSign, PiggyBank } from "lucide-react";
import {
  statisticsData as mandatoryStatisticsData,
  periods as mandatoryPeriods,
} from "@/data/mandatoryAccountData/data";
import {
  statisticsData as voluntaryStatisticsData,
  periods as voluntaryPeriods,
} from "@/data/voluntaryAccountData/data";
import {
  statisticsData as principalStatisticsData,
  periods as principalPeriods,
} from "@/data/principalAccountData/data";
import {
  statisticsData as newVoluntaryStatisticsData,
  periods as newVoluntaryPeriods,
} from "@/data/newVoluntaryAccountData/data";

interface AccountStatisticsCardProps {
  type: string;
}

export default function AccountStatisticsCard({
  type,
}: AccountStatisticsCardProps) {
  const statisticsData =
    type === "voluntary"
      ? newVoluntaryStatisticsData
      : type === "principal"
      ? principalStatisticsData
      : type === "voluntary-data"
      ? voluntaryStatisticsData
      : mandatoryStatisticsData;
  const periods =
    type === "voluntary"
      ? newVoluntaryPeriods
      : type === "principal"
      ? principalPeriods
      : type === "voluntary-data"
      ? voluntaryPeriods
      : mandatoryPeriods;
  const [activePeriod, setActivePeriod] = useState("3 months");
  const currentData =
    statisticsData[activePeriod as keyof typeof statisticsData];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
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
            {formatCurrency(currentData.totalProfit)}
          </div>
        </div>

        <div className={styles.breakdown}>
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
              {formatCurrency(currentData.profitFromInterest)}
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${currentData.interestProgress}%` }}
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
              {formatCurrency(currentData.profitFromSHU)}
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${currentData.shuProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <Button className={styles.viewDetailedButton}>
          View Detailed Earnings
        </Button>
      </div>
    </div>
  );
}
