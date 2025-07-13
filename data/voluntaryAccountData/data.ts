export const accountData = {
  balance: 25750000.50,
  accountType: "Voluntary",
  accountNumber: "2891043728",
  accountTypeFull: "Voluntary Savings Account",
  dateOfCreation: "15.08.2024",
  initialDeposit: "Rp 5.000.000",
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

export const transactionsData = [
  {
    id: 1,
    type: "incoming" as const,
    category: "deposit" as const,
    title: "Voluntary Deposit",
    subtitle: "Manual deposit by user",
    date: "Jan 12, 2025",
    amount: 8000000,
  },
  {
    id: 2,
    type: "incoming" as const,
    category: "interest" as const,
    title: "Monthly Interest Profit",
    subtitle: "Interest earned on account balance",
    date: "Jan 1, 2025",
    amount: 380000,
  },
  {
    id: 3,
    type: "incoming" as const,
    category: "deposit" as const,
    title: "Voluntary Deposit",
    subtitle: "Manual deposit by user",
    date: "Dec 30, 2024",
    amount: 2000000,
  },
  {
    id: 4,
    type: "incoming" as const,
    category: "shu" as const,
    title: "SHU Profit Distribution",
    subtitle: "Quarterly profit sharing (3 months)",
    date: "Dec 25, 2024",
    amount: 2200000,
  },
  {
    id: 5,
    type: "incoming" as const,
    category: "deposit" as const,
    title: "Voluntary Deposit",
    subtitle: "Manual deposit by user",
    date: "Dec 15, 2024",
    amount: 5500000,
  },
  {
    id: 6,
    type: "incoming" as const,
    category: "interest" as const,
    title: "Monthly Interest Profit",
    subtitle: "Interest earned on account balance",
    date: "Dec 1, 2024",
    amount: 350000,
  },
];
