import Styles from "@/scss/components/hasAccount/main.module.scss";
import AccountDetailsCard from "@/components/accountRouteGroup/dashboard/AccountDetailsCard";
import AccountStatisticsCard from "@/components/accountRouteGroup/dashboard/AccountStatisticsCard";
import RecentTransactionsCard from "@/components/accountRouteGroup/dashboard/RecentTransactionsCard";
import PaymentAlertCard from "./PaymentAlertCard";

interface MainProps {
  type: string;
}

export default function Main({ type }: MainProps) {
  return (
    <div className={Styles.dashboardContainer}>
      <div className={Styles.leftColumn}>
        <AccountDetailsCard type={type} />
        <AccountStatisticsCard type={type} />
      </div>

      <div className={Styles.rightColumn}>
        {(type === "mandatory" || type === "dynamic") && (
          <PaymentAlertCard type={type} />
        )}
        <RecentTransactionsCard type={type} />
      </div>
    </div>
  );
}
