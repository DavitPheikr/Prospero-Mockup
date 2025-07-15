"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/scss/components/cooperative/navbar.module.scss";

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (route: string) => pathname === route;

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.topHeader}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <span className={styles.logo}>
              pro<strong>ERMS</strong>
            </span>
          </div>
        </div>
      </div>
      <div className={styles.sidebar}>
        <nav className={styles.navigation}>
          <Link
            href="/cooperative/members"
            className={`${styles.navItem} ${
              isActive("/cooperative/members") ? styles.active : ""
            }`}
          >
            Members
          </Link>
          <Link
            href="/cooperative/accounts"
            className={`${styles.navItem} ${
              isActive("/cooperative/accounts") ? styles.active : ""
            }`}
          >
            Accounts
          </Link>
        </nav>
      </div>
    </div>
  );
}
