"use client";

import styles from "@/scss/components/navbar.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type NavItem = {
  label: string;
  href: string;
};

export default function Navbar() {
  console.log("logging navbar");
  const pathname = usePathname();

  // Always show these three nav items
  const navItems: NavItem[] = [
    { label: "Akun", href: "/account" },
    { label: "Statistik", href: "/statistics?type=all" },
    { label: "Transaksi", href: "/transactions?type=all" },
  ];

  // Determine which nav item is active
  const isActive = (label: string) => {
    if (label === "Akun") {
      // /account or /account/{accountType}
      return pathname === "/account" || /^\/account\/[^/]+$/.test(pathname);
    }
    if (label === "Statistik") {
      // Any /statistics page
      return pathname.startsWith("/statistics");
    }
    if (label === "Transaksi") {
      // Any /transactions page
      return pathname.startsWith("/transactions");
    }
    return false;
  };

  const isCooperative = pathname === "/cooperative";

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.leftSection}>
          <img src="/logo.png" alt="Logo" className={styles.logo} />
          <div className={styles.centerSection}>
            {isCooperative ? (
              <Link href="/cooperative">
                <button className={clsx(styles.navButton, styles.active)}>
                  Dashboard
                </button>
              </Link>
            ) : (
              navItems.map(({ label, href }) => (
                <Link key={label} href={href}>
                  <button
                    className={clsx(
                      styles.navButton,
                      isActive(label) && styles.active
                    )}
                  >
                    {label}
                  </button>
                </Link>
              ))
            )}
          </div>
        </div>
        <div className={styles.rightSection}>
          {!isCooperative && (
            <Link href="/account/voluntary-data">
              <button className={styles.navButton}>Data Sukarela</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
