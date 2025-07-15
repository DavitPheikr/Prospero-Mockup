import React from "react";
import styles from "@/scss/components/ui/button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  variant = "primary",
}: ButtonProps) {
  const buttonClass =
    variant === "secondary" ? styles.buttonSecondary : styles.button;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${buttonClass} ${className}`}
    >
      {children}
    </button>
  );
}
