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

  // Extract account type from pathname (voluntary, mandatory, dynamic)
  const accountTypeMatch = pathname.match(/\/my-account\/([^\/]+)/);
  const accountType = accountTypeMatch ? accountTypeMatch[1] : "voluntary";

  const navItems: NavItem[] =
    pathname === "/create-account"
      ? [{ label: "Account", href: "/create-account" }]
      : pathname.startsWith("/my-account")
      ? [
          { label: "Dashboard", href: `/my-account/${accountType}` },
          { label: "Statistics", href: "/my-account/statistics" },
          { label: "Transactions", href: "/my-account/transactions" },
        ]
      : [];

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
                    pathname === href && styles.active
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
