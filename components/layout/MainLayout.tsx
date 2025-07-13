import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "@/scss/components/layout/navbar.module.scss";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={styles.layoutWrapper}>
      <Navbar />
      <div className={styles.mainContent}>
        {children}
      </div>
      <Footer />
    </div>
  );
} 