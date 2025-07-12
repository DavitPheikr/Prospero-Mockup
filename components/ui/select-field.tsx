"use client";
import Dropdown from "@/components/ui/Dropdown"; // Import the new atomic Dropdown
import styles from "./form-elements.module.scss"; // Keep shared form group styles

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  required?: boolean;
}

export default function SelectField({
  label,
  value,
  onChange,
  options,
  required = false,
}: SelectFieldProps) {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <Dropdown value={value} onChange={onChange} options={options} />
    </div>
  );
}
