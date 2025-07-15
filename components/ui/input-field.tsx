"use client";
import TextInput from "./text-input"; // Fix: should import from text-input, not input-field
import styles from "@/scss/components/ui/form-element.module.scss";

interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number" | "email" | "password";
  required?: boolean;
  optional?: boolean;
  helperText?: string;
  isHighlighted?: boolean;
}

export default function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  optional = false,
  helperText,
  isHighlighted = false,
}: InputFieldProps) {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
        {optional && <span className={styles.optional}>(Opsional)</span>}
      </label>
      <div className={isHighlighted ? styles.highlightedField : ""}>
        <TextInput
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          className={isHighlighted ? styles.highlighted : ""} // Apply highlighted class to TextInput
        />
        {helperText && <p className={styles.helperText}>{helperText}</p>}
      </div>
    </div>
  );
}
