import styles from "@/scss/components/hasAccount/transactions/TransactionFilters.module.scss";
import Button from "@/components/ui/Button";
interface TransactionFiltersProps {
  activeFilter: "all" | "deposits" | "interest" | "shu" | "withdrawals";
  onFilterChange: (
    filter: "all" | "deposits" | "interest" | "shu" | "withdrawals"
  ) => void;
  accountType?:
    | "all"
    | "voluntary"
    | "mandatory"
    | "principal"
    | "voluntary-data";
}

export default function TransactionFilters({
  activeFilter,
  onFilterChange,
  accountType,
}: TransactionFiltersProps) {
  const baseFilters = [
    { key: "all" as const, label: "All" },
    { key: "deposits" as const, label: "Deposits" },
    { key: "interest" as const, label: "Interest" },
    { key: "shu" as const, label: "SHU Profits" },
  ];

  const filters =
    accountType === "voluntary" || accountType === "voluntary-data"
      ? [...baseFilters, { key: "withdrawals" as const, label: "Withdrawals" }]
      : baseFilters;

  return (
    <div className={styles.filterSelector}>
      {filters.map((filter) => (
        <Button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          variant={activeFilter === filter.key ? "primary" : "secondary"}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
