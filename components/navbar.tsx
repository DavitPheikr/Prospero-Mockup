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

  const navItems: NavItem[] =
    pathname === "/create-account"
      ? [{ label: "Account", href: "/create-account" }]
      : pathname.startsWith("/account/voluntary-data")
      ? [
          { label: "Dashboard", href: "/account/voluntary-data/dashboard" },
          { label: "Statistics", href: "/account/statistics" },
          {
            label: "Transactions",
            href: "/account/voluntary-data/transactions",
          },
        ]
      : pathname.startsWith("/voluntary-data")
      ? [
          { label: "Dashboard", href: "/voluntary-data/dashboard" },
          { label: "Statistics", href: "/account/statistics" },
          { label: "Transactions", href: "/voluntary-data/transactions" },
        ]
      : pathname.startsWith("/account/voluntary")
      ? [
          { label: "Dashboard", href: "/account/voluntary/dashboard" },
          { label: "Statistics", href: "/account/statistics" },
          { label: "Transactions", href: "/account/voluntary/transactions" },
        ]
      : pathname.startsWith("/voluntary")
      ? [
          { label: "Dashboard", href: "/voluntary/dashboard" },
          { label: "Statistics", href: "/account/statistics" },
          { label: "Transactions", href: "/voluntary/transactions" },
        ]
      : pathname.startsWith("/account/mandatory")
      ? [
          { label: "Dashboard", href: "/account/mandatory/dashboard" },
          { label: "Statistics", href: "/account/statistics" },
          { label: "Transactions", href: "/account/mandatory/transactions" },
        ]
      : pathname.startsWith("/account/principal")
      ? [
          { label: "Dashboard", href: "/account/principal/dashboard" },
          { label: "Statistics", href: "/account/statistics" },
          { label: "Transactions", href: "/account/principal/transactions" },
        ]
      : pathname.startsWith("/account")
      ? [
          {
            label: "Dashboard",
            href: `/account/${pathname.split("/")[2]}/dashboard`,
          },
          { label: "Statistics", href: "/account/statistics" },
          {
            label: "Transactions",
            href: `/account/${pathname.split("/")[2]}/transactions`,
          },
        ]
      : [];

  // Function to check if a nav item should be active
  const isActive = (href: string, label: string) => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];

    if (label === "Dashboard") {
      return (
        lastSegment === "dashboard" ||
        (pathname.startsWith("/account/mandatory") &&
          lastSegment === "mandatory") ||
        (pathname.startsWith("/account/voluntary-data") &&
          lastSegment === "voluntary-data") ||
        (pathname.startsWith("/account/voluntary") &&
          lastSegment === "voluntary") ||
        (pathname.startsWith("/account/principal") &&
          lastSegment === "principal") ||
        (pathname.startsWith("/voluntary-data") &&
          lastSegment === "voluntary-data") ||
        (pathname.startsWith("/voluntary") && lastSegment === "voluntary")
      );
    }
    if (label === "Transactions") {
      return lastSegment === "transactions";
    }
    if (label === "Statistics") {
      return lastSegment === "statistics";
    }
    return pathname === href;
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.leftSection}>
          <img src="/logo.png" alt="Logo" className={styles.logo} />
          <div className={styles.centerSection}>
            {navItems.map(({ label, href }) => (
              <Link key={href} href={href}>
                <button
                  className={clsx(
                    styles.navButton,
                    isActive(href, label) && styles.active
                  )}
                >
                  {label}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
