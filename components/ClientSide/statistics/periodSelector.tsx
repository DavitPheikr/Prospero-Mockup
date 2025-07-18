import style from "@/scss/components/ui/periodSelector.module.scss";
import { Calendar } from "lucide-react";

interface PeriodSelectorProps {
  period: "1 month" | "3 months" | "6 months" | "1 year" | "all";
  onPeriodChange: (
    period: "1 month" | "3 months" | "6 months" | "1 year" | "all"
  ) => void;
}

export default function PeriodSelector({
  period,
  onPeriodChange,
}: PeriodSelectorProps) {
  const periods: ("1 month" | "3 months" | "6 months" | "1 year" | "all")[] = [
    "all",

    "1 year",
    "6 months",
    "3 months",
    "1 month",
  ];

  return (
    <div className={style.periodSelector}>
      <Calendar size={16} />
      <span className={style.periodLabel}>Periode:</span>
      {periods.map((p) => {
        let label: string = p;
        if (p === "all") label = "Semua";
        else if (p === "1 year") label = "1 Tahun";
        else if (p === "6 months") label = "6 Bulan";
        else if (p === "3 months") label = "3 Bulan";
        else if (p === "1 month") label = "1 Bulan";
        return (
          <button
            key={p}
            onClick={() => onPeriodChange(p)}
            className={`${style.periodOption} ${
              period === p ? style.active : ""
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
