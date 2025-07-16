import styles from "@/scss/components/loans/loanRepaymentSchedule.module.scss";

type LoanRepaymentScheduleProps = {
  tenure: string;
  monthlyInstallment: number | null; // not used for calculation now
  startDate?: Date;
  amount?: string; // add amount for calculation
};

const formatRupiah = (amount: number | string | undefined) => {
  if (typeof amount === "string") {
    const num = Number(amount.replace(/[^0-9]/g, ""));
    return isNaN(num) ? amount : "Rp " + num.toLocaleString("id-ID");
  }
  if (typeof amount === "number") {
    return "Rp " + amount.toLocaleString("id-ID");
  }
  return "-";
};

const getInstallmentDates = (tenure: number, startDate: Date) => {
  const dates: string[] = [];
  let date = new Date(startDate);
  for (let i = 0; i < tenure; i++) {
    date.setMonth(date.getMonth() + (i === 0 ? 0 : 1));
    date.setDate(15);
    dates.push(
      date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      })
    );
  }
  return dates;
};

function calculateRepayments(amount: string, tenure: string) {
  const principal = Number(amount.replace(/[^0-9]/g, ""));
  const months = Number(tenure);
  if (!principal || !months) return [];
  let repayments: number[] = [];
  let currentAmount = principal;
  for (let i = 0; i < months; i++) {
    const left = months - i;
    const installment = Math.round((currentAmount * 1.05) / left);
    repayments.push(installment);
    currentAmount -= installment;
  }
  return repayments;
}

export default function LoanRepaymentSchedule({
  tenure,
  monthlyInstallment,
  startDate,
  amount,
}: LoanRepaymentScheduleProps) {
  const numTenure = Number(tenure) || 0;
  const dates = getInstallmentDates(numTenure, startDate || new Date());
  const repayments = amount ? calculateRepayments(amount, tenure) : [];

  return (
    <div className={styles.scheduleCard}>
      <h2 className={styles.title}>Jadwal Pembayaran</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Angsuran</th>
            <th>Tanggal Jatuh Tempo</th>
            <th>Jumlah</th>
          </tr>
        </thead>
      </table>
      <div className={styles.scrollBody}>
        <table className={styles.table}>
          <tbody>
            {dates.map((date, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{date}</td>
                <td>
                  {repayments[idx] !== undefined
                    ? formatRupiah(repayments[idx])
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
