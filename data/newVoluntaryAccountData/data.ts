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

export const statisticsData = {
  "3 months": {
    totalProfit: 0,
    profitFromInterest: 0,
    profitFromSHU: 0,
    interestProgress: 0,
    shuProgress: 0,
  },
  "6 months": {
    totalProfit: 0,
    profitFromInterest: 0,
    profitFromSHU: 0,
    interestProgress: 0,
    shuProgress: 0,
  },
  "1y": {
    totalProfit: 0,
    profitFromInterest: 0,
    profitFromSHU: 0,
    interestProgress: 0,
    shuProgress: 0,
  },
  all: {
    totalProfit: 0,
    profitFromInterest: 0,
    profitFromSHU: 0,
    interestProgress: 0,
    shuProgress: 0,
  },
};

export const periods = ["3 months", "6 months", "1y", "all"];

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
