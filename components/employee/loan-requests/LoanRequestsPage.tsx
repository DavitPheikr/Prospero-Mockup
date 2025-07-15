"use client";

import React, { useState } from "react";
import { loanRequestsData as initialData, LoanRequest } from "@/data/loanRequestsData";
import pageStyles from "./LoanRequestsPage.module.scss";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import LoanRequestModal from "./LoanRequestModal";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
};

const columns: { key: keyof LoanRequest; header: string; render?: (item: LoanRequest) => React.ReactNode }[] = [
  { key: "memberName", header: "Member Name" },
  { key: "requestDate", header: "Request Date" },
  {
    key: "amount",
    header: "Amount",
    render: (item: LoanRequest) => formatCurrency(item.amount),
  },
  { key: "purpose", header: "Purpose" },
  { key: "term", header: "Term (Months)" },
  {
    key: "status",
    header: "Status",
    render: (item: LoanRequest) => (
      <span
        className={`${pageStyles.status} ${
          pageStyles[item.status.toLowerCase()]
        }`}
      >
        {item.status}
      </span>
    ),
  },
];

export default function LoanRequestsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanRequests, setLoanRequests] = useState(initialData);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmitRequest = (newRequest: Omit<LoanRequest, "id">) => {
    const requestWithId = {
      ...newRequest,
      id: `req-${Math.random().toString(36).substr(2, 9)}`,
    };
    setLoanRequests((prevRequests) => [...prevRequests, requestWithId]);
  };

  return (
    <div className={pageStyles.page}>
      <div className={pageStyles.header}>
        <h1>Loan Requests</h1>
        <Button onClick={handleOpenModal}>
          Make a Loan Request
        </Button>
      </div>
      <Table columns={columns} data={loanRequests} />
      <LoanRequestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitRequest}
      />
    </div>
  );
} 