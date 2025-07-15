import { newVoluntaryTransactionsData } from './transactionsData';

// Static voluntary account data (existing account)
// Dynamic account data that can be modified
export let newAccountData = {
  balance: 0,
  accountType: "Voluntary",
  accountNumber: "2891043728",
  accountTypeFull: "Voluntary Savings Account",
  dateOfCreation: "14.07.2025",
  initialDeposit: "None",
  accountName: "",
  isCreated: false,
};

export interface StatisticsPeriod {
  totalProfit: number;
  profitFromInterest: number;
  profitFromSHU: number;
  profitFromDeposits: number;
  interestProgress: number;
  shuProgress: number;
}

export const statisticsData = {
  "1 month": {
    totalProfit: 300.00,
    profitFromInterest: 180.00,
    profitFromSHU: 120.00,
    profitFromDeposits: 500.00,
    interestProgress: 60,
    shuProgress: 40,
  },
  "3 months": {
    totalProfit: 900.00,
    profitFromInterest: 540.00,
    profitFromSHU: 360.00,
    profitFromDeposits: 1500.00,
    interestProgress: 60,
    shuProgress: 40,
  },
  "6 months": {
    totalProfit: 1800.00,
    profitFromInterest: 1080.00,
    profitFromSHU: 720.00,
    profitFromDeposits: 3000.00,
    interestProgress: 60,
    shuProgress: 40,
  },
  "1y": {
    totalProfit: 3600.00,
    profitFromInterest: 2160.00,
    profitFromSHU: 1440.00,
    profitFromDeposits: 6000.00,
    interestProgress: 60,
    shuProgress: 40,
  },
  all: {
    totalProfit: 4000.00,
    profitFromInterest: 2400.00,
    profitFromSHU: 1600.00,
    profitFromDeposits: 7000.00,
    interestProgress: 60,
    shuProgress: 40,
  },
};

export const periods = ["1 month", "3 months", "6 months", "1y", "all"];

export const transactionsData = newVoluntaryTransactionsData.slice(0, 5).map(transaction => ({
  id: parseInt(transaction.refId.replace(/\D/g, '')),
  type: "incoming" as const,
  category: transaction.category === "withdrawals" ? "deposit" : transaction.category as "deposit" | "interest" | "shu",
  title: transaction.type === "Voluntary Deposit" ? "Voluntary Deposit" :
         transaction.type === "Withdrawal" ? "Withdrawal" :
         transaction.type === "Monthly Interest" ? "Monthly Interest Profit" : 
         "SHU Profit Distribution",
  subtitle: transaction.type === "Voluntary Deposit" ? "Manual deposit by user" :
            transaction.type === "Withdrawal" ? "Account withdrawal" :
            transaction.type === "Monthly Interest" ? "Interest earned on account balance" :
            "Quarterly profit sharing",
  date: transaction.transactionDate.split(',')[0],
  amount: transaction.amount,
}));

export const createVoluntaryAccount = (
  name: string, 
  principalDeposit?: number
) => {
  const accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
  const currentDate = new Date().toLocaleDateString("en-GB");
  
  newAccountData.balance = 0;
  newAccountData.accountNumber = "2891043728";
  newAccountData.dateOfCreation = currentDate;
  newAccountData.initialDeposit = "None";
  newAccountData.isCreated = true;
};
