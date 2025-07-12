"use client";

import { useState, useRef } from "react";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/input-field"; // Fix: Import InputField instead of TextInput
import Dropdown from "@/components/ui/Dropdown"; // Import new Dropdown
import styles from "@/scss/components/accountModal.module.scss"; // Import styles for the modal

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountType: "v1" | "v2";
}

export default function AccountModal({
  isOpen,
  onClose,
  accountType,
}: AccountModalProps) {
  const [formData, setFormData] = useState({
    accountName: "",
    principalDeposit: "",
    currency: "",
  });

  const modalRef = useRef<HTMLDivElement>(null); // ADDED: Ref for the modal content

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission logic here
    onClose();
  };

  if (!isOpen) return null;

  const isVoluntary = accountType === "v2";
  const modalTitle = isVoluntary
    ? "Voluntary Savings Account"
    : "Mandatory Savings Account";

  const currencyOptions = [
    { value: "", label: "Select currency" },
    { value: "USD", label: "USD - US Dollar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "IDR", label: "IDR - Indonesian Rupiah" },
  ];

  const accountFeatures = isVoluntary
    ? {
        title: "Flexible Savings Features",
        subtitle: "Save at your own pace",
        features: [
          {
            icon: "💰",
            title: "Flexible Deposits",
            description: "Add money whenever you want, no minimum requirements",
          },
          {
            icon: "📈",
            title: "Competitive Interest",
            description: "Earn attractive interest rates on your savings",
          },
        ],
      }
    : {
        title: "Structured Savings Features",
        subtitle: "Build disciplined saving habits",
        features: [
          {
            icon: "📅",
            title: "Monthly Commitment",
            description:
              "Minimum 1 mandatory payment per month builds consistency",
          },
          {
            icon: "🏆",
            title: "Higher Interest Returns",
            description: "Earn premium interest rates for your commitment",
          },
          {
            icon: "🎁",
            title: "More SHU Profits",
            description: "Earn more bonuses for consistent payments",
          },
          {
            icon: "💪",
            title: "Discipline Building",
            description:
              "Develop strong financial habits through regular savings",
          },
        ],
      };
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={onClose}>
            ←
          </button>
          <div className={styles.titleSection}>
            <h2 className={styles.title}>{modalTitle}</h2>
            <p className={styles.subtitle}>{accountFeatures.subtitle}</p>
          </div>
          <div className={styles.stepIndicator}>
            <span className={styles.stepActive}>1</span>
            <span className={styles.stepInactive}>2</span>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.formSection}>
            {!isVoluntary && (
              <div className={styles.mandatoryNotice}>
                <div className={styles.noticeIcon}>⚠️</div>
                <div>
                  <p>
                    <strong>Important:</strong> Monthly minimum 1 mandatory
                    payment is required to the savings account
                  </p>
                </div>
              </div>
            )}

            <div className={styles.formGroup}>
              <InputField
                label="Account name"
                value={formData.accountName}
                onChange={(value) => handleInputChange("accountName", value)}
                placeholder="Enter account name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <InputField
                label="Principal core deposit"
                value={formData.principalDeposit}
                onChange={(value) =>
                  handleInputChange("principalDeposit", value)
                }
                placeholder="Amount"
                type="number"
                optional
                helperText="Minimal amount 10"
                isHighlighted
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Pick Currency <span className={styles.required}>*</span>
              </label>
              <Dropdown
                value={formData.currency}
                onChange={(value) => handleInputChange("currency", value)}
                options={currencyOptions}
              />
            </div>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.infoHeader}>
              <h3 className={styles.infoTitle}>{accountFeatures.title}</h3>
              <div className={styles.decorativeIcon}>✨</div>
            </div>

            <div className={styles.featuresGrid}>
              {accountFeatures.features.map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <div className={styles.featureContent}>
                    <h4 className={styles.featureTitle}>{feature.title}</h4>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <Button onClick={handleSubmit} className={styles.createButton}>
            CREATE ACCOUNT
          </Button>
        </div>
      </div>
    </div>
  );
}
