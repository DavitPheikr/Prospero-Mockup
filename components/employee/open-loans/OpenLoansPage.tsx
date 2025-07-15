"use client";

import { openLoansData, OpenLoan } from "@/data/openLoansData";
import pageStyles from "./OpenLoansPage.module.scss";
import Table from "@/components/ui/Table";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
};

const columns: { key: keyof OpenLoan; header: string; render?: (item: OpenLoan) => React.ReactNode }[] = [
  { key: "memberName", header: "Member Name" },
  {
    key: "loanAmount",
    header: "Loan Amount",
    render: (item: OpenLoan) => formatCurrency(item.loanAmount),
  },
  {
    key: "monthlyPayment",
    header: "Monthly Payment",
    render: (item: OpenLoan) => formatCurrency(item.monthlyPayment),
  },
  { key: "dueDate", header: "Due Date" },
  { key: "latePayments", header: "Late Payments" },
  {
    key: "remainingBalance",
    header: "Remaining Balance",
    render: (item: OpenLoan) => formatCurrency(item.remainingBalance),
  },
];

export default function OpenLoansPage() {
  return (
    <div className={pageStyles.page}>
      <h1>Open Loans</h1>
      <Table columns={columns} data={openLoansData} />
    </div>
  );
} 