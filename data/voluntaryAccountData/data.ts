import { voluntaryTransactionsData } from './transactionsData';

// Static voluntary account data (existing account)
export const accountData = {
  balance: 2635.00,
  accountType: "Voluntary",
  accountNumber: "9876543210",
  accountTypeFull: "Voluntary Savings Account",
  dateOfCreation: "15.08.2024",
};


export const statisticsData = {
  "3 months": {
    totalProfit: 1200.00,
    profitFromInterest: 700.00,
    profitFromSHU: 500.00,
    interestProgress: 58,
    shuProgress: 42,
  },
  "6 months": {
    totalProfit: 2100.00,
    profitFromInterest: 1300.00,
    profitFromSHU: 800.00,
    interestProgress: 62,
    shuProgress: 38,
  },
  "1y": {
    totalProfit: 4100.00,
    profitFromInterest: 2500.00,
    profitFromSHU: 1600.00,
    interestProgress: 61,
    shuProgress: 39,
  },
  all: {
    totalProfit: 5000.00,
    profitFromInterest: 3000.00,
    profitFromSHU: 2000.00,
    interestProgress: 60,
    shuProgress: 40,
  },
};

export const periods = ["3 months", "6 months", "1y", "all"];

// Types for period and statistics
export type VoluntaryPeriod = "3 months" | "6 months" | "1y" | "all";
export interface VoluntaryStatistics {
  totalProfit: number;
  profitFromInterest: number;
  profitFromSHU: number;
  interestProgress: number;
  shuProgress: number;
}

// Helper to get statistics for a given period
export const getStatisticsForPeriod = (period: VoluntaryPeriod): VoluntaryStatistics => {
  return statisticsData[period] || statisticsData["all"];
};

export const transactionsData = voluntaryTransactionsData.slice(0, 5).map(transaction => ({
  id: parseInt(transaction.refId.replace(/\D/g, '')),
  type: "incoming" as const,
  category: transaction.category === "withdrawals" ? "deposit" : transaction.category as "deposit" | "interest" | "shu",
  title: transaction.type === "Voluntary Deposit" ? "Setoran Sukarela" :
         transaction.type === "Withdrawal" ? "Penarikan" :
         transaction.type === "Monthly Interest" ? "Keuntungan Bunga Bulanan" : 
         "Distribusi Keuntungan SHU",
  subtitle: transaction.type === "Voluntary Deposit" ? "Setoran manual oleh pengguna" :
            transaction.type === "Withdrawal" ? "Penarikan akun" :
            transaction.type === "Monthly Interest" ? "Bunga yang diperoleh dari saldo akun" :
            "Pembagian keuntungan triwulanan",
  date: transaction.transactionDate.split(',')[0],
  amount: transaction.amount,
}));

export const createVoluntaryAccount = (
  name: string, 
  principalDeposit?: number
) => {
  const accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
  const currentDate = new Date().toLocaleDateString("en-GB");
  
  accountData.balance = 0;
  accountData.accountNumber = accountNumber.toString();
  accountData.dateOfCreation = currentDate;
  
};