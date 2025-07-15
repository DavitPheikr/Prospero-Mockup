import React from "react";
import styles from "@/scss/components/statistics/statsCard.module.scss";
import {
  TrendingUp,
  PiggyBank,
  CalendarArrowDown,
  ArrowDownCircle,
  Trophy,
} from "lucide-react";

interface StatsCardProps {
  title?: string;
  amount?: string;
  percentage?: string;
  description?: string;
  trend?: "positive" | "negative" | "none";
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title = "OVERALL ACCOUNT PROFIT",
  amount = "Rp 735.000",
  percentage = "+15.2%",
  description = "since account creation",
  trend = "positive",
}) => {
  // Check if amount is zero (for black color)
  const isZero =
    amount.replace(/[^\d]/g, "") === "0" ||
    amount === "Rp 0" ||
    amount === "-Rp 0";

  // Check if amount is negative (for red color)
  const isNegative = amount.trim().startsWith("-");

  // Determine which icon to show based on the title or props
  let IconComponent: React.ElementType = TrendingUp;
  let iconColor: string | undefined = undefined;
  if (title?.toLowerCase().includes("shu")) {
    IconComponent = PiggyBank;
  } else if (title?.toLowerCase().includes("voluntary deposit")) {
    IconComponent = CalendarArrowDown;
  } else if (title?.toLowerCase().includes("withdraw")) {
    IconComponent = ArrowDownCircle;
    iconColor = "#dc2626"; // Tailwind's red-600
  } else if (title?.toLowerCase().includes("overall account profit")) {
    IconComponent = Trophy;
  } else if (title?.toLowerCase().includes("monthly interest")) {
    IconComponent = TrendingUp;
  }

  // If there is no profit (amount is zero or negative), show icon in black
  if (isZero || isNegative) {
    iconColor = "#222";
  }

  // For withdrawals, always show percentage as negative (with minus sign)
  let displayPercentage = percentage;
  if (title?.toLowerCase().includes("withdraw")) {
    displayPercentage = percentage.replace(/^\+/, "");
    if (!displayPercentage.startsWith("-")) {
      displayPercentage = "-" + displayPercentage;
    }
  }

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statsHeader}>
        <h3 className={styles.statsTitle}>{title}</h3>
        <div className={styles.statsTrendIcon}>
          <IconComponent size={20} color={iconColor} />
        </div>
      </div>

      <div
        className={styles.statsAmount}
        style={
          isZero
            ? { color: "var(--brand-dark-gray, #455A64)" }
            : isNegative
            ? { color: "var(--ui-error, #dc2626)" }
            : undefined
        }
      >
        {amount}
      </div>

      <div className={styles.statsFooter}>
        {trend !== "none" && (
          <span
            className={`${styles.statsPercentage} ${
              trend === "positive"
                ? styles.positive
                : trend === "negative"
                ? styles.negative
                : ""
            }`}
          >
            {displayPercentage}
          </span>
        )}
        <span className={styles.statsDescription}>{description}</span>
      </div>
    </div>
  );
};

export default StatsCard;
