import { mandatoryTransactionsData } from './transactionsData';

export const accountData = {
  balance: 138.38,
  accountType: "Mandatory",
  accountNumber: "1748951657",
  accountTypeFull: "Mandatory Savings Account",
  dateOfCreation: "01.09.2024",
};

export const statisticsData = {
  "3 months": {
    totalProfit: 8500000,
    profitFromInterest: 5100000,
    profitFromSHU: 3400000,
    interestProgress: 60,
    shuProgress: 40,
  },
  "6 months": {
    totalProfit: 18200000,
    profitFromInterest: 11500000,
    profitFromSHU: 6700000,
    interestProgress: 63,
    shuProgress: 37,
  },
  "1y": {
    totalProfit: 30000000,
    profitFromInterest: 18000000,
    profitFromSHU: 12000000,
    interestProgress: 60,
    shuProgress: 40,
  },
  all: {
    totalProfit: 45600000,
    profitFromInterest: 28400000,
    profitFromSHU: 17200000,
    interestProgress: 62,
    shuProgress: 38,
  },
};

export const periods = ["3 months", "6 months", "1y", "all"];

export const paymentData = {
  amount: 500000,
  dueDate: "January 15, 2025",
  daysRemaining: 6,
  isPrincipalPayment: false,
};

export const transactionsData = mandatoryTransactionsData.slice(0, 5).map(transaction => ({
  id: parseInt(transaction.refId.replace(/\D/g, '')),
  type: "incoming" as const,
  category: transaction.category as "deposit" | "interest" | "shu",
  title: transaction.type === "Mandatory Contribution" ? "Mandatory Contribution" : 
         transaction.type === "Monthly Interest" ? "Monthly Interest Profit" : 
         "SHU Profit Distribution",
  subtitle: transaction.type === "Mandatory Contribution" ? "Monthly mandatory deposit" :
            transaction.type === "Monthly Interest" ? "Interest earned on account balance" :
            "Quarterly profit sharing",
  date: transaction.transactionDate.split(',')[0],
  amount: transaction.amount,
}));
