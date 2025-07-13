import React from "react";
import styles from "@/scss/components/layout/footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <span>Modul Operational Risk</span>
        <span>Copyright 2024 • Powered by Prospero Solutions</span>
      </div>
    </footer>
  );
} 