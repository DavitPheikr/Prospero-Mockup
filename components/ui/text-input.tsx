"use client";
import styles from "@/scss/components/ui/text-input.module.scss"; // Import styles for the TextInput

interface TextInputProps {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number" | "email" | "password";
  className?: string; // For applying additional styles like 'highlighted'
}

export default function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}: TextInputProps) {
  return (
    <input
      type={type}
      className={`${styles.input} ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
