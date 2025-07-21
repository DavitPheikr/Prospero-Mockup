import {
  ListChecks,
  FileSignature,
  Book,
  FileText,
  Users,
  PieChart,
  FileCheck,
  ClipboardList,
  Wallet,
  UserPlus,
  Calendar,
  Shield,
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
    label: "Tambah Member",
    href: "http://localhost:9123#members",
    icon: UserPlus,
  },
  {
    label: "Tambah Events",
    href: "http://localhost:9123#events",
    icon: Calendar,
  },
  {
    label: "Risk Management",
    href: "http://208.87.132.115:32771",
    icon: Shield,
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
  {
    label: "Member Details",
    href: "/employee/member-transactions",
    icon: Wallet,
  },
];