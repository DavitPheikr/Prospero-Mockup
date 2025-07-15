"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/scss/components/layout/sideNavbar.module.scss";
import clsx from "clsx";
import { navLinks } from "@/data/navLinks";

const accountPages = [
  "/account",
  "/statistics",
  "/transactions",
  "/account/mandatory",
  "/account/voluntary",
  "/account/principal",
  "/account/voluntary-data",
];

export default function SideNavbar() {
  const pathname = usePathname();
  console.log("Current path:", pathname);

  const isAccountPage = accountPages.some((page) => pathname.startsWith(page));

  let displayedLinks = navLinks;

  if (isAccountPage) {
    displayedLinks = navLinks.filter((link) =>
      accountPages.includes(link.href)
    );
  } else {
    // For non-account pages, filter out account links
    displayedLinks = navLinks.filter(
      (link) => !accountPages.includes(link.href)
    );

    // If it's an employee or ministry path, update report links
    if (pathname.startsWith("/employee") || pathname.startsWith("/ministry")) {
      const prefix = pathname.startsWith("/employee")
        ? "/employee"
        : "/ministry";
      displayedLinks = displayedLinks.map((link) => {
        if (link.href.startsWith("/raport")) {
          return { ...link, href: `${prefix}${link.href}` };
        }
        return link;
      });
    }
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
