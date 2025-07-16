import style from "@/scss/components/loans/loanCard.module.scss";
import LoanDetails from "./LoanDetails";
import LoanRepaymentSchedule from "./LoanRepaymentSchedule";
type LoanData = {
  amount: string;
  purpose: string;
  tenure: string;
  monthlyInstallment: number | null;
  paidAmount?: number;
  creationDate?: string;
  interestRate?: number;
  totalRepayment?: number;
  remainingTenure?: number;
};

type LoanStatus = "pending" | "approved" | "rejected";

interface LoanCardProps {
  loan: LoanData;
  status: LoanStatus;
}

export default function LoanCard({ loan, status }: LoanCardProps) {
  if (!loan) return null;
  return (
    <div className={style.pageWrapper}>
      <div className={style.leftColumn}>
        <LoanDetails loan={loan} status={status} />
      </div>
      <div className={style.rightColumn}>
        <LoanRepaymentSchedule
          tenure={loan.tenure}
          monthlyInstallment={loan.monthlyInstallment}
          amount={loan.amount}
        />
      </div>
    </div>
  );
}
