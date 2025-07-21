import {
  User,
  BarChart,
  Repeat,
  Book,
  FileText,
  Users,
  PieChart,
  FileCheck,
  ClipboardList,
  Wallet,
  Calendar,
  type LucideIcon,
} from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navLinks: NavLink[] = [
  {
    label: "Account",
    href: "/account",
    icon: User,
  },
  {
    label: "Statistics",
    href: "/statistics",
    icon: BarChart,
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: Repeat,
  },
  {
    label: "Loans",
    href: "/loans",
    icon: Wallet,
  },
  {
    label: "Events",
    href: "http://localhost:9124",
    icon: Calendar,
  },
  {
    label: "Balance Sheet",
    href: "/raport/balance-sheet",
    icon: Book,
  },
  {
    label: "Profit & Loss",
    href: "/raport/profit-loss",
    icon: FileText,
  },
  {
    label: "SHU Distribution",
    href: "/raport/shu-distribution",
    icon: Users,
  },
  {
    label: "SHU Report",
    href: "/raport/shu-report",
    icon: PieChart,
  },
  {
    label: "SIKP OJK Reports",
    href: "/raport/sikp-ojk-reports",
    icon: FileCheck,
  },
  {
    label: "Transaction Journal",
    href: "/raport/transaction-journal",
    icon: ClipboardList,
  },
];