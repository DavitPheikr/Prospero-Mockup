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
  const pathname = usePathname();

  // Always show these three nav items
  const navItems: NavItem[] = [
    { label: "Account", href: "/account" },
    { label: "Statistics", href: "/statistics?type=all" },
    { label: "Transactions", href: "/transactions?type=all" },
  ];

  // Determine which nav item is active
  const isActive = (label: string) => {
    if (label === "Account") {
      // /account or /account/{accountType}
      return pathname === "/account" || /^\/account\/[^/]+$/.test(pathname);
    }
    if (label === "Statistics") {
      // Any /statistics page
      return pathname.startsWith("/statistics");
    }
    if (label === "Transactions") {
      // Any /transactions page
      return pathname.startsWith("/transactions");
    }
    return false;
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.leftSection}>
          <img src="/logo.png" alt="Logo" className={styles.logo} />
          <div className={styles.centerSection}>
            {navItems.map(({ label, href }) => (
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
            ))}
          </div>
        </div>
        <div className={styles.rightSection}>
          <Link href="/account/voluntary-data">
            <button className={styles.navButton}>Voluntary Data</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
