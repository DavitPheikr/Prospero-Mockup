"use client";
import { useRouter, usePathname } from "next/navigation";
import styles from "@/scss/components/hasAccount/RecentTransactionsCard.module.scss";
import Button from "@/components/ui/Button";
import TransactionItem from "@/components/ui/TransactionItem";
import { transactionsData as mandatoryTransactionsData } from "@/data/mandatoryAccountData/data";
import { transactionsData as voluntaryTransactionsData } from "@/data/voluntaryAccountData/data";
import { transactionsData as principalTransactionsData } from "@/data/principalAccountData/data";
import { transactionsData as newVoluntaryTransactionsData } from "@/data/newVoluntaryAccountData/data";
import MakeTransactions from "./makeTransactions";
interface RecentTransactionsCardProps {
  type: string;
}

export default function RecentTransactionsCard({
  type,
}: RecentTransactionsCardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const transactionsData =
    type === "voluntary"
      ? newVoluntaryTransactionsData
      : type === "principal"
      ? principalTransactionsData
      : type === "voluntary-data"
      ? voluntaryTransactionsData
      : mandatoryTransactionsData;

  // Show 4 transactions if on /account, otherwise show 5
  const displayedTransactions =
    pathname === "/account"
      ? transactionsData.slice(0, 4)
      : transactionsData.slice(0, 5);

  const handleTransactionClick = (id: number) => {
    console.log(`Transaction ${id} clicked`);
  };

  const handleViewAllTransactions = () => {
    if (type === "mandatory") {
      router.push("/transactions?type=mandatory");
    } else if (type === "voluntary") {
      router.push("/transactions?type=voluntary");
    } else if (type === "voluntary-data") {
      router.push("/transactions?type=voluntary-data");
    } else if (type === "principal") {
      router.push("/transactions?type=principal");
    } else {
      router.push("/transactions?type=all");
    }
  };

  return (
    <div>
      <div className={styles.transactionsCard} key={pathname}>
        <div className={styles.transactionsList}>
          {displayedTransactions.length > 0 ? (
            displayedTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                {...transaction}
                onClick={() => handleTransactionClick(transaction.id)}
              />
            ))
          ) : (
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                color: "#666",
              }}
            >
              Belum ada transaksi
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <Button
            className={styles.viewAllButton}
            onClick={handleViewAllTransactions}
          >
            Lihat Semua Transaksi
          </Button>
        </div>
      </div>
    </div>
  );
}
