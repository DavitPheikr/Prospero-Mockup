"use client";
import styles from "@/scss/components/ui/dropdown.module.scss";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  className?: string;
}

export default function Dropdown({
  value,
  onChange,
  options,
  className = "",
}: DropdownProps) {
  return (
    <select
      className={`${styles.select} ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
