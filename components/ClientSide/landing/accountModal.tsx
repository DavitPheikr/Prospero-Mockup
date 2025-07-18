"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import styles from "@/scss/components/createAccount/accountModal.module.scss";
import { Check, Zap } from "lucide-react";
import { createVoluntaryAccount } from "@/data/voluntaryAccountData/data";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccountCreated?: () => void;
}

export default function AccountModal({
  isOpen,
  onClose,
  onAccountCreated,
}: AccountModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSubmit = () => {
    setIsSubmitting(true);

    try {
      // Create the voluntary account with default name
      createVoluntaryAccount("Voluntary Savings");

      // Call the account created callback
      if (onAccountCreated) {
        onAccountCreated();
      } else {
        // Navigate to voluntary dashboard (fallback)
        router.push("/account/voluntary/dashboard");
        onClose();
      }
    } catch (error) {
      console.error("Error creating account:", error);
      alert("Terjadi kesalahan saat membuat akun. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const accountFeatures = {
    title: "Fitur Tabungan Fleksibel",
    subtitle: "Menabung sesuai keinginan Anda",
    features: [
      {
        title: "Setoran Fleksibel",
        description: "Tambah dana kapan saja, tanpa syarat minimum",
      },
      {
        title: "Bunga Kompetitif",
        description: "Dapatkan suku bunga menarik untuk tabungan Anda",
      },
      {
        title: "Akses Mudah",
        description: "Kelola akun dengan mudah dan nyaman",
      },
      {
        title: "Bebas Penarikan",
        description: "Akses dana Anda kapan pun dibutuhkan",
      },
    ],
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={onClose}>
            ←
          </button>
          <div className={styles.titleSection}>
            <h2 className={styles.title}>Rekening Tabungan Sukarela</h2>
            <p className={styles.subtitle}>{accountFeatures.subtitle}</p>
          </div>
          <div className={styles.cardIcon}>
            <Zap size="20" />
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
        <div className={styles.footer}>
          <Button
            onClick={handleSubmit}
            className={styles.createButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "MEMBUAT..." : "BUAT AKUN"}
          </Button>
        </div>
      </div>
    </div>
  );
}
