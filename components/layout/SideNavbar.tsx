"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/scss/components/layout/sideNavbar.module.scss";
import clsx from "clsx";
import { navLinks } from "@/data/navLinks";
import { employeeNavLinks } from "@/data/employeeNavLinks";

const accountPages = [
  "/account",
  "/statistics",
  "/transactions",
  "/account/mandatory",
  "/account/voluntary",
  "/account/principal",
  "/account/voluntary-data",
  "/loans",
];

export default function SideNavbar() {
  const pathname = usePathname();
  console.log("Current path:", pathname);

  const isAccountPage = accountPages.some((page) => pathname.startsWith(page));

  let displayedLinks: typeof navLinks = [];

  if (isAccountPage) {
    displayedLinks = navLinks.filter((link) =>
      accountPages.includes(link.href)
    );
  } else if (pathname.startsWith("/employee")) {
    displayedLinks = employeeNavLinks;
  } else if (pathname.startsWith("/ministry")) {
    displayedLinks = navLinks
      .filter((link) => link.href.startsWith("/raport"))
      .map((link) => ({ ...link, href: `/ministry${link.href}` }));
  } else {
    // Fallback for other pages like homepage
    displayedLinks = navLinks.filter(
      (link) => !accountPages.includes(link.href)
    );
  }

  return (
    <nav className={styles.sideNavbar}>
      {displayedLinks.map((item) => {
        const isAccountSelected =
          item.href === "/account" &&
          (pathname.startsWith("/account") ||
            pathname.startsWith("/account/voluntary") ||
            pathname.startsWith("/account/voluntary-data") ||
            pathname.startsWith("/account/principal"));
        return (
          <Link
            href={item.href}
            key={item.label}
            className={clsx(styles.navItem, {
              [styles.selected]: isAccountSelected || pathname === item.href,
            })}
          >
            <div className={styles.iconContainer}>
              <item.icon className={styles.icon} />
            </div>
            <span className={styles.label}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
