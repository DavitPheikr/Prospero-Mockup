import { principalTransactionsData } from './transactionsData';

export let accountData = {
  balance: 2720.50,
  accountType: "Principal" as "Mandatory" | "Voluntary" | "Principal",
  accountNumber: "3456789012",
  accountTypeFull: "Principal Savings Account",
  dateOfCreation: "01.09.2024",
  initialDeposit: "Rp 50.000.000",
  accountName: "Principal Core Account",
  isDynamic: false,
  hasPrincipalDeposit: true,
};

export let statisticsData = {
  "3 months": { totalProfit: 25000000, profitFromInterest: 15000000, profitFromSHU: 10000000, interestProgress: 60, shuProgress: 40 },
  "6 months": { totalProfit: 48000000, profitFromInterest: 28800000, profitFromSHU: 19200000, interestProgress: 60, shuProgress: 40 },
  "1y": { totalProfit: 96000000, profitFromInterest: 57600000, profitFromSHU: 38400000, interestProgress: 60, shuProgress: 40 },
  all: { totalProfit: 120000000, profitFromInterest: 72000000, profitFromSHU: 48000000, interestProgress: 60, shuProgress: 40 },
};

export const periods = ["3 months", "6 months", "1y", "all"];

export let paymentData = {
  amount: 0,
  dueDate: "",
  daysRemaining: 0,
  isPrincipalPayment: false,
};

export let transactionsData = principalTransactionsData.slice(0, 5).map(transaction => ({
  id: parseInt(transaction.refId.replace(/\D/g, '')),
  type: "incoming" as const,
  category: transaction.category as "deposit" | "interest" | "shu",
  title: transaction.type === "Initial Principal Deposit" ? "Setoran Rekening Pokok" : 
         transaction.type === "Monthly Interest" ? "Keuntungan Bunga Bulanan" : 
         "Distribusi Keuntungan SHU",
  subtitle: transaction.type === "Initial Principal Deposit" ? "Setoran awal rekening pokok" :
            transaction.type === "Monthly Interest" ? "Bunga yang diperoleh dari saldo akun" :
            "Pembagian keuntungan triwulanan",
  date: transaction.transactionDate.split(',')[0],
  amount: transaction.amount,
}));

