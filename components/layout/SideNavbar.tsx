"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/scss/components/layout/sideNavbar.module.scss";
import clsx from "clsx";
import { navLinks } from "@/data/navLinks";

const accountPages = ["/account", "/statistics", "/transactions"];

export default function SideNavbar() {
  const pathname = usePathname();

  const isAccountPage = accountPages.some((page) => pathname.startsWith(page));

  let displayedLinks = navLinks;

  if (isAccountPage) {
    displayedLinks = navLinks.filter((link) => accountPages.includes(link.href));
  } else {
    // For non-account pages, filter out account links
    displayedLinks = navLinks.filter((link) => !accountPages.includes(link.href));

    // If it's an employee or ministry path, update report links
    if (pathname.startsWith("/employee") || pathname.startsWith("/ministry")) {
      const prefix = pathname.startsWith("/employee") ? "/employee" : "/ministry";
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
      {displayedLinks.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className={clsx(styles.navItem, {
            [styles.selected]: pathname === item.href,
          })}
        >
          <div className={styles.iconContainer}>
            <item.icon className={styles.icon} />
          </div>
          <span className={styles.label}>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
} 