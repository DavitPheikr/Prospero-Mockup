"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/input-field";
import Dropdown from "@/components/ui/Dropdown";
import styles from "@/scss/components/createAccount/accountModal.module.scss";
import { Check } from "lucide-react";
import { createAccount } from "@/data/dynamicAccountData/data";
import { Wallet, Zap } from "lucide-react";

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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.accountName.trim()) {
      alert("Please enter an account name");
      return;
    }

    setIsSubmitting(true);

    try {
      // Map modal accountType to data layer type
      const accountTypeForData =
        accountType === "v2" ? "Voluntary" : "Mandatory";

      // Parse principal deposit (optional)
      const principalDeposit = formData.principalDeposit
        ? parseInt(formData.principalDeposit.replace(/\D/g, ""))
        : undefined;

      // Create the account
      createAccount(
        formData.accountName.trim(),
        accountTypeForData,
        principalDeposit
      );

      // Navigate to dynamic dashboard
      router.push("/my-account/dynamic");

      // Close modal
      onClose();
    } catch (error) {
      console.error("Error creating account:", error);
      alert("Error creating account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const isVoluntary = accountType === "v2";
  const modalTitle = isVoluntary
    ? "Voluntary Savings Account"
    : "Mandatory Savings Account";

  const accountFeatures = isVoluntary
    ? {
        title: "Flexible Savings Features",
        subtitle: "Save at your own pace",
        features: [
          {
            title: "Flexible Deposits",
            description: "Add money whenever you want, no minimum requirements",
          },
          {
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
            title: "Monthly Commitment",
            description:
              "Minimum 1 mandatory payment per month builds consistency",
          },
          {
            title: "Higher Interest Returns",
            description: "Earn premium interest rates for your commitment",
          },
          {
            title: "More SHU Profits",
            description: "Earn more bonuses for consistent payments",
          },
          {
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
          <div className={styles.cardIcon}>
            {accountType === "v1" && <Wallet />}
            {accountType === "v2" && <Zap />}
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.formSection}>
            {!isVoluntary && (
              <div className={styles.mandatoryNotice}>
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
          </div>

          <div className={styles.infoSection}>
            <div className={styles.infoHeader}>
              <h3 className={styles.infoTitle}>{accountFeatures.title}</h3>
            </div>

            <div className={styles.featuresGrid}>
              {accountFeatures.features.map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <Check />
                  </div>
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
          <Button
            onClick={handleSubmit}
            className={styles.createButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "CREATING..." : "CREATE ACCOUNT"}
          </Button>
        </div>
      </div>
    </div>
  );
}
