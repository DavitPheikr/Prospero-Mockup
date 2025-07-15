"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/scss/components/layout/navbar.module.scss";

interface NavItem {
  id: string;
  label: string;
  code: string;
  href: string;
  icon?: string;
}

const navigationItems: NavItem[] = [
  {
    id: "transaction-journal",
    label: "Transaction Journal",
    code: "TJ",
    href: "/raport/transaction-journal",
  },
  {
    id: "balance-sheet",
    label: "Balance Sheet",
    code: "BS",
    href: "/raport/balance-sheet",
  },
  {
    id: "profit-loss",
    label: "Profit & Loss",
    code: "PL",
    href: "/raport/profit-loss",
  },
  {
    id: "shu-report",
    label: "SHU Report",
    code: "SR",
    href: "/raport/shu-report",
  },
  {
    id: "shu-distribution",
    label: "SHU Distribution",
    code: "SD",
    href: "/raport/shu-distribution",
  },
  {
    id: "sikp-ojk-reports",
    label: "SIKP / OJK Reports",
    code: "SO",
    href: "/raport/sikp-ojk-reports",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActiveRoute = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div className={styles.navbarWrapper}>
      {/* Top Header */}
      <div className={styles.topHeader}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <span className={styles.logo}>
              pro<strong>ERMS</strong>
            </span>
            <span className={styles.subtitle}>
              Powered by Prospero Solutions
            </span>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.languageToggle}>
              <span className={styles.langActive}>ID</span>
              <span className={styles.langSeparator}>|</span>
              <span className={styles.langInactive}>EN</span>
            </div>
            <div className={styles.notifications}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
              </svg>
              <span className={styles.notificationBadge}>1</span>
            </div>
            <div className={styles.userProfile}>
              <div className={styles.userAvatar}>KL</div>
              <div className={styles.userInfo}>
                <span className={styles.userName}>Kalina Levin</span>
                <span className={styles.userRole}>Checker - HCT</span>
              </div>
              <svg
                className={styles.dropdownIcon}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className={styles.sidebar}>
        <nav className={styles.navigation}>
          {navigationItems.map((item) => (
            <div key={item.id} className={styles.navItemWrapper}>
              <Link
                href={item.href}
                className={`${styles.navItem} ${
                  isActiveRoute(item.href) ? styles.active : ""
                }`}
              >
                <div className={styles.navItemContent}>
                  <span className={styles.navCode}>{item.code}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                </div>
              </Link>
            </div>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <span>Financial Reports</span>
        </div>
      </div>
    </div>
  );
}
