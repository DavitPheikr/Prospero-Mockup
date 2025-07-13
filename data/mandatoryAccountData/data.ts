export const accountData = {
  balance: 138.38,
  accountType: "Mandatory",
  accountNumber: "1748951657",
  accountTypeFull: "Mandatory Savings Account",
  dateOfCreation: "26.02.2025",
  initialDeposit: "None",
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

export const transactionsData = [
  {
    id: 1,
    type: "incoming" as const,
    category: "deposit" as const,
    title: "Account Deposit",
    subtitle: "Manual deposit by user",
    date: "Jan 9, 2025",
    amount: 5000000,
  },
  {
    id: 2,
    type: "incoming" as const,
    category: "interest" as const,
    title: "Monthly Interest Profit",
    subtitle: "Interest earned on account balance",
    date: "Jan 1, 2025",
    amount: 250000,
  },
  {
    id: 3,
    type: "incoming" as const,
    category: "deposit" as const,
    title: "Account Deposit",
    subtitle: "Manual deposit by user",
    date: "Dec 28, 2024",
    amount: 3000000,
  },
  {
    id: 4,
    type: "incoming" as const,
    category: "shu" as const,
    title: "SHU Profit Distribution",
    subtitle: "Quarterly profit sharing (3 months)",
    date: "Dec 25, 2024",
    amount: 1500000,
  },
  {
    id: 5,
    type: "incoming" as const,
    category: "interest" as const,
    title: "Monthly Interest Profit",
    subtitle: "Interest earned on account balance",
    date: "Dec 1, 2024",
    amount: 230000,
  },
];
