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
  let navbarTitle = "";

  if (isAccountPage) {
    displayedLinks = navLinks.filter((link) =>
      accountPages.includes(link.href) || link.href.startsWith("http")
    );
    navbarTitle = "Member Portal";
  } else if (pathname.startsWith("/employee")) {
    displayedLinks = employeeNavLinks;
    navbarTitle = "Cooperative Employee";
  } else if (pathname.startsWith("/ministry")) {
    displayedLinks = navLinks
      .filter((link) => link.href.startsWith("/raport"))
      .map((link) => ({ ...link, href: `/ministry${link.href}` }));
    navbarTitle = "Ministry Portal";
  } else {
    // Fallback for other pages like homepage
    displayedLinks = navLinks.filter(
      (link) => !accountPages.includes(link.href)
    );
    navbarTitle = "Navigation";
  }

  const handleExternalLink = (href: string) => {
    // Open Risk Management in new window, others in same window
    if (href.includes('208.87.132.115:32771')) {
      window.open(href, '_blank');
    } else {
      window.location.href = href;
    }
  };

  return (
    <nav className={styles.sideNavbar}>
      <div className={styles.navbarHeader}>
        <h3 className={styles.navbarTitle}>{navbarTitle}</h3>
      </div>
      {displayedLinks.map((item) => {
        const isAccountSelected =
          item.href === "/account" &&
          (pathname.startsWith("/account") ||
            pathname.startsWith("/account/voluntary") ||
            pathname.startsWith("/account/voluntary-data") ||
            pathname.startsWith("/account/principal"));
        
        const isExternalLink = item.href.startsWith("http");
        
        if (isExternalLink) {
          return (
            <button
              key={item.label}
              onClick={() => handleExternalLink(item.href)}
              className={clsx(styles.navItem, styles.externalLink)}
            >
              <div className={styles.iconContainer}>
                <item.icon className={styles.icon} />
              </div>
              <span className={styles.label}>{item.label}</span>
            </button>
          );
        }

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
