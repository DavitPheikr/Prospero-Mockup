import Styles from "@/scss/components/hasAccount/main.module.scss";
import AccountChooser from "@/components/account/dashboard/AccountChooser";
import AccountStatisticsCard from "@/components/account/dashboard/AccountStatisticsCard";
import RecentTransactionsCard from "@/components/account/dashboard/RecentTransactionsCard";
import PaymentAlertCard from "./PaymentAlertCard";
import MandatoryAccountDetailsCard from "./save/mandatory";
import PrincipalAccountDetailsCard from "./save/principal";
import VoluntaryAccountDetailsCard from "./save/voluntary";
interface MainProps {
  type: string;
}

export default function Main({ type }: MainProps) {
  return (
    <div className={Styles.dashboardContainer}>
      <div className={Styles.leftColumn}>
        {type === "mandatory" ? (
          <MandatoryAccountDetailsCard />
        ) : type === "principal" ? (
          <PrincipalAccountDetailsCard />
        ) : (
          <VoluntaryAccountDetailsCard type={type} />
        )}
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
