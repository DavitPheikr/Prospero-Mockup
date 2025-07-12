"use client";

import Navbar from "@/components/navbar";
import Main from "@/components/accountRouteGroup/dashboard/Main";
import { use } from "react";

export default function Dashboard({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = use(params);
  return (
    <div>
      <Navbar />
      <Main type={type} />
    </div>
  );
}
