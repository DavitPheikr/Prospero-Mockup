import React from "react";
import styles from "@/scss/components/layout/navbar.module.scss";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarContent}>
        <span className={styles.logo}>Coorporative X</span>
        <span className={styles.welcomeMessage}>Welcome, Andrei Darius</span>
      </div>
    </div>
  );
} 