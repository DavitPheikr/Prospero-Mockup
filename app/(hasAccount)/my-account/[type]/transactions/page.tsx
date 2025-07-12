"use client";

import Navbar from "@/components/navbar";
import TransactionsPage from "@/components/accountRouteGroup/transactions/TransactionsPage";
import { use } from "react";

export default function Transactions({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = use(params);
  const accountType = type === "voluntary" ? "voluntary" : "mandatory";

  return (
    <div>
      <Navbar />
      <TransactionsPage accountType={accountType} />
    </div>
  );
}
