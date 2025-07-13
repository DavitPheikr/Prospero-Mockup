import styles from "@/scss/components/hasAccount/transactions/TransactionFilters.module.scss";

interface TransactionFiltersProps {
  activeFilter: "all" | "deposits" | "interest" | "shu";
  onFilterChange: (filter: "all" | "deposits" | "interest" | "shu") => void;
}

export default function TransactionFilters({
  activeFilter,
  onFilterChange,
}: TransactionFiltersProps) {
  const filters = [
    { key: "all" as const, label: "All" },
    { key: "deposits" as const, label: "Deposits" },
    { key: "interest" as const, label: "Interest" },
    { key: "shu" as const, label: "SHU Profits" },
  ];

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
