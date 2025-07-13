export let accountData = {
  balance: 0,
  accountType: "Mandatory" as "Mandatory" | "Voluntary",
  accountNumber: "0000000000",
  accountTypeFull: "Mandatory Savings Account",
  dateOfCreation: "",
  initialDeposit: "None",
  accountName: "",
  isDynamic: true,
  hasPrincipalDeposit: false,
};

export let statisticsData = {
  "3 months": { totalProfit: 0, profitFromInterest: 0, profitFromSHU: 0, interestProgress: 0, shuProgress: 0 },
  "6 months": { totalProfit: 0, profitFromInterest: 0, profitFromSHU: 0, interestProgress: 0, shuProgress: 0 },
  "1y": { totalProfit: 0, profitFromInterest: 0, profitFromSHU: 0, interestProgress: 0, shuProgress: 0 },
  all: { totalProfit: 0, profitFromInterest: 0, profitFromSHU: 0, interestProgress: 0, shuProgress: 0 },
};

export const periods = ["3 months", "6 months", "1y", "all"];

export let paymentData = {
  amount: 0,
  dueDate: "",
  daysRemaining: 7,
  isPrincipalPayment: false,
};

export let transactionsData: any[] = [];

export const createAccount = (
  name: string, 
  type: "Mandatory" | "Voluntary", 
  principalDeposit?: number
) => {
  const accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
  const currentDate = new Date().toLocaleDateString("en-GB");
  const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  accountData.accountName = name;
  accountData.balance = 0;
  accountData.accountType = type;
  accountData.accountNumber = accountNumber.toString();
  accountData.accountTypeFull = `${type} Savings Account`;
  accountData.dateOfCreation = currentDate;
  accountData.initialDeposit = principalDeposit ? "Pending" : "None";
  accountData.isDynamic = true;
  accountData.hasPrincipalDeposit = !!principalDeposit;
  
  if (principalDeposit) {
    // Principal deposit payment
    paymentData.amount = principalDeposit;
    paymentData.dueDate = dueDate;
    paymentData.daysRemaining = 7;
    paymentData.isPrincipalPayment = true;
  } else if (type === "Mandatory") {
    // Regular mandatory payment for accounts without principal deposit
    paymentData.amount = 500000; // Default mandatory payment
    paymentData.dueDate = dueDate;
    paymentData.daysRemaining = 7;
    paymentData.isPrincipalPayment = false;
  } else {
    // Voluntary without principal - no payment needed
    paymentData.amount = 0;
    paymentData.dueDate = "";
    paymentData.daysRemaining = 0;
    paymentData.isPrincipalPayment = false;
  }
  
  transactionsData = [];
};
