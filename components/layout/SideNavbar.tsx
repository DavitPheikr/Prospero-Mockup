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

  const filteredNavLinks = isAccountPage
    ? navLinks.filter((link) => accountPages.includes(link.href))
    : navLinks;

  return (
    <nav className={styles.sideNavbar}>
      {filteredNavLinks.map((item) => (
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