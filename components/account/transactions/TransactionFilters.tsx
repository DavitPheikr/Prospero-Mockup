import styles from "@/scss/components/hasAccount/transactions/TransactionFilters.module.scss";

interface TransactionFiltersProps {
  activeFilter: "all" | "deposits" | "interest" | "shu" | "withdrawals";
  onFilterChange: (
    filter: "all" | "deposits" | "interest" | "shu" | "withdrawals"
  ) => void;
  accountType?: "voluntary" | "mandatory" | "principal" | "voluntary-data";
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
    <div className={styles.filtersContainer}>
      <div className={styles.filterTabs}>
        {filters.map((filter) => (
          <button
            key={filter.key}
            className={`${styles.filterButton} ${
              activeFilter === filter.key ? styles.active : ""
            }`}
            onClick={() => onFilterChange(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
