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
      <span className={style.periodLabel}>Period:</span>
      {periods.map((p) => (
        <button
          key={p}
          onClick={() => onPeriodChange(p)}
          className={`${style.periodOption} ${
            period === p ? style.active : ""
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
