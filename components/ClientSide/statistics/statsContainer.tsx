import React from "react";
import StatsCard from "./statsCard";
import styles from "@/scss/components/statistics/statsContainer.module.scss";
import { getMandatoryStatistics } from "@/data/mandatoryAccountData/statisticsData";
import { getPrincipalStatistics } from "@/data/principalAccountData/statisticsData";
import { getVoluntaryStatistics } from "@/data/voluntaryAccountData/statisticsData";
import { getAllAccountsStatistics } from "@/data/allData/statisticsData";

interface StatsContainerProps {
  accountType?:
    | "principal"
    | "voluntary-data"
    | "voluntary"
    | "mandatory"
    | "all";
  selectedPeriod?: "1 month" | "3 months" | "6 months" | "1 year" | "all";
  accountData?: any;
}

export const StatsContainer: React.FC<StatsContainerProps> = ({
  accountType = "voluntary",
  selectedPeriod = "all",
  accountData,
}) => {
  // Map "all" to "all time" for the data helper
  const period = selectedPeriod === "all" ? "all time" : selectedPeriod;

  let stats: any = {};
  if (accountType === "mandatory") {
    stats = getMandatoryStatistics(period as any, "all");
  } else if (accountType === "principal") {
    stats = getPrincipalStatistics(period as any, "all");
  } else if (accountType === "voluntary-data") {
    stats = getVoluntaryStatistics(period as any, "all");
  } else if (accountType === "all") {
    stats = getAllAccountsStatistics(period as any, "all");
  }

  // Helper to determine trend: "positive", "negative", "none"
  const getTrend = (value: number | undefined) => {
    if (value === undefined) return "none";
    if (value > 0) return "positive";
    if (value < 0) return "negative";
    return "none";
  };

  // Helper to get amount string
  const getAmount = (value: number | undefined) =>
    `Rp ${value?.toLocaleString("id-ID") || "0"}`;

  // Only render voluntary deposit/withdrawal cards for voluntary accounts
  const showVoluntaryCards =
    accountType !== "mandatory" && accountType !== "principal";

  return (
    <div className={styles.statsContainer}>
      {/* Total Keuntungan Akun */}
      <StatsCard
        title="TOTAL KEUNTUNGAN AKUN"
        amount={
          accountType === "mandatory" ||
          accountType === "principal" ||
          accountType === "voluntary-data" ||
          accountType === "all"
            ? getAmount(stats.totalProfit)
            : "Rp 735.000"
        }
        percentage={
          accountType === "mandatory" ||
          accountType === "principal" ||
          accountType === "voluntary-data" ||
          accountType === "all"
            ? "+12.5%" // mock value
            : "+15.2%"
        }
        description="sejak pembuatan akun"
        trend={
          accountType === "mandatory" ||
          accountType === "principal" ||
          accountType === "voluntary-data" ||
          accountType === "all"
            ? getTrend(stats.totalProfit)
            : "positive"
        }
      />
      {/* Keuntungan Bunga Bulanan */}
      <StatsCard
        title="KEUNTUNGAN BUNGA BULANAN"
        amount={
          accountType === "mandatory" ||
          accountType === "principal" ||
          accountType === "voluntary-data" ||
          accountType === "all"
            ? getAmount(stats.profitFromInterest)
            : "Rp 735.000"
        }
        percentage={
          accountType === "mandatory" ||
          accountType === "principal" ||
          accountType === "voluntary-data" ||
          accountType === "all"
            ? "+8.0%" // mock value
            : "+15.0%"
        }
        description="vs periode sebelumnya"
        trend={
          accountType === "mandatory" ||
          accountType === "principal" ||
          accountType === "voluntary-data" ||
          accountType === "all"
            ? getTrend(stats.profitFromInterest)
            : "positive"
        }
      />
      {/* Keuntungan Distribusi SHU */}
      <StatsCard
        title="KEUNTUNGAN DISTRIBUSI SHU"
        amount={
          accountType === "mandatory" ||
          accountType === "principal" ||
          accountType === "voluntary-data" ||
          accountType === "all"
            ? getAmount(stats.profitFromSHU)
            : "Rp 0"
        }
        percentage={
          accountType === "mandatory" ||
          accountType === "principal" ||
          accountType === "voluntary-data" ||
          accountType === "all"
            ? "+2.0%" // mock value
            : "+0.0%"
        }
        description={
          accountType === "mandatory" ||
          accountType === "principal" ||
          accountType === "voluntary-data" ||
          accountType === "all"
            ? (stats.profitFromSHU ?? 0) > 0
              ? "pertumbuhan periode ini"
              : "tidak ada distribusi periode ini"
            : "tidak ada distribusi periode ini"
        }
        trend={
          accountType === "mandatory" ||
          accountType === "principal" ||
          accountType === "voluntary-data" ||
          accountType === "all"
            ? getTrend(stats.profitFromSHU)
            : "none"
        }
      />
      {/* Keuntungan Setoran Wajib */}
      {accountType === "mandatory" && (
        <StatsCard
          title="KEUNTUNGAN SETORAN WAJIB"
          amount={getAmount(stats.growthFromDeposits)}
          percentage="+4.0%" // mock value
          description="pertumbuhan dari setoran"
          trend={getTrend(stats.growthFromDeposits)}
        />
      )}
      {/* Keuntungan Setoran Sukarela dan Penarikan untuk akun sukarela dan voluntary-data */}
      {showVoluntaryCards && (
        <>
          <StatsCard
            title="KEUNTUNGAN SETORAN SUKARELA"
            amount={
              accountType === "voluntary-data"
                ? getAmount(stats.growthFromDeposits)
                : "Rp 600.000"
            }
            percentage="+5.0%" // mock value
            description="pertumbuhan periode ini"
            trend={
              accountType === "voluntary-data"
                ? getTrend(stats.growthFromDeposits)
                : "positive"
            }
          />
          <StatsCard
            title="PENARIKAN AKUN"
            amount={
              accountType === "voluntary-data"
                ? `-Rp ${
                    Math.abs(stats.totalWithdrawals)?.toLocaleString("id-ID") ||
                    "0"
                  }`
                : "-Rp 200.000"
            }
            percentage="+3.2%" // mock value
            description="dari total saldo"
            trend={
              accountType === "voluntary-data"
                ? getTrend(
                    stats.totalWithdrawals && -Math.abs(stats.totalWithdrawals)
                  )
                : "negative"
            }
          />
        </>
      )}
    </div>
  );
};

export default StatsContainer;
