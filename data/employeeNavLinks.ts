import {
  ListChecks,
  FileSignature,
  Book,
  FileText,
  Users,
  PieChart,
  FileCheck,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const employeeNavLinks: NavLink[] = [
  {
    label: "Open Loans",
    href: "/employee/open-loans",
    icon: ListChecks,
  },
  {
    label: "Loan Requests",
    href: "/employee/loan-requests",
    icon: FileSignature,
  },
  {
    label: "Balance Sheet",
    href: "/employee/raport/balance-sheet",
    icon: Book,
  },
  {
    label: "Profit & Loss",
    href: "/employee/raport/profit-loss",
    icon: FileText,
  },
  {
    label: "SHU Distribution",
    href: "/employee/raport/shu-distribution",
    icon: Users,
  },
  {
    label: "SHU Report",
    href: "/employee/raport/shu-report",
    icon: PieChart,
  },
  {
    label: "SIKP OJK Reports",
    href: "/employee/raport/sikp-ojk-reports",
    icon: FileCheck,
  },
  {
    label: "Transaction Journal",
    href: "/employee/raport/transaction-journal",
    icon: ClipboardList,
  },
]; 