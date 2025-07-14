import { voluntaryTransactionsData } from './transactionsData';

// Static voluntary account data (existing account)
export const accountData = {
  balance: 25750000.50,
  accountType: "Voluntary",
  accountNumber: "3413023722",
  accountTypeFull: "Voluntary Savings Account",
  dateOfCreation: "15.08.2024",
};


export const statisticsData = {
  "3 months": {
    totalProfit: 12800000,
    profitFromInterest: 7200000,
    profitFromSHU: 5600000,
    interestProgress: 56,
    shuProgress: 44,
  },
  "6 months": {
    totalProfit: 24500000,
    profitFromInterest: 14700000,
    profitFromSHU: 9800000,
    interestProgress: 60,
    shuProgress: 40,
  },
  "1y": {
    totalProfit: 42000000,
    profitFromInterest: 23800000,
    profitFromSHU: 18200000,
    interestProgress: 57,
    shuProgress: 43,
  },
  all: {
    totalProfit: 58900000,
    profitFromInterest: 32100000,
    profitFromSHU: 26800000,
    interestProgress: 54,
    shuProgress: 46,
  },
};

export const periods = ["3 months", "6 months", "1y", "all"];

export const transactionsData = voluntaryTransactionsData.slice(0, 5).map(transaction => ({
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
  
  accountData.balance = 0;
  accountData.accountNumber = accountNumber.toString();
  accountData.dateOfCreation = currentDate;
  
};
