"use client";
import { useState } from "react";
import StatsContainer from "./statsContainer";
import style from "@/scss/components/statistics/statsPage.module.scss";
import PeriodSelector from "./periodSelector";
import AccountSelector from "./accountSelector";
import { TrendingUp } from "lucide-react";
import BackTo from "../../ui/BackTo";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
// Import account data files
import { accountData as principalAccountData } from "@/data/principalAccountData/data";
import { accountData as mandatoryAccountData } from "@/data/mandatoryAccountData/data";
import { accountData as voluntaryAccountData } from "@/data/voluntaryAccountData/data";
import { newAccountData as newVoluntaryAccountData } from "@/data/newVoluntaryAccountData/data";
interface StatsPageProps {
  accountType: "all" | "mandatory" | "voluntary" | "voluntary-data";
  accountData?: any;
}

export default function StatsPage({ accountData }: StatsPageProps) {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  useEffect(() => {
    if (typeParam) {
      setSelectedAccountType(typeParam as typeof selectedAccountType);
    }
  }, [typeParam]);
  const [selectedPeriod, setSelectedPeriod] = useState<
    "1 month" | "3 months" | "6 months" | "1 year" | "all"
  >("all");
  const [selectedAccountType, setSelectedAccountType] = useState<
    "principal" | "voluntary-data" | "voluntary" | "mandatory" | "all"
  >("all");
  // Helper to get balance based on selected account type
  const accountBalance = useMemo(() => {
    switch (selectedAccountType) {
      case "principal":
        return principalAccountData?.balance ?? 0;
      case "mandatory":
        return mandatoryAccountData?.balance ?? 0;
      case "voluntary":
        return voluntaryAccountData?.balance ?? 0;
      case "voluntary-data":
        return newVoluntaryAccountData?.balance ?? 0;
      case "all":
      default:
        // Sum all balances
        return (
          (principalAccountData?.balance ?? 0) +
          (mandatoryAccountData?.balance ?? 0) +
          (voluntaryAccountData?.balance ?? 0) +
          (newVoluntaryAccountData?.balance ?? 0)
        );
    }
  }, [selectedAccountType]);

  // Format balance as currency
  const formatRupiah = (amount: number) =>
    amount.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  return (
    <div className={style.pageWrapper}>
      <div className={style.header}>
        <BackTo href={"/account"} text=""></BackTo>
        <h1 className={style.title}>Halaman Statistik</h1>
      </div>
      <AccountSelector
        accountType={selectedAccountType}
        onAccountTypeChange={setSelectedAccountType}
      />

      <div className={style.accountBalance}>
        <h2 className={style.accountHeader}>Saldo Saat Ini</h2>
        <div className={style.balanceContainer}>
          <div className={style.balanceLeft}>
            <h2 className={style.accountBalanceAmount}>
              {formatRupiah(accountBalance)}
            </h2>
          </div>
        </div>
      </div>

      <div className={style.lowerContainer}>
        <PeriodSelector
          period={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />

        <StatsContainer
          accountType={selectedAccountType}
          selectedPeriod={selectedPeriod}
          accountData={accountData}
        />
      </div>
    </div>
  );
}
