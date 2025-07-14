export interface Transaction {
  refId: string;
  transactionDate: string;
  from: string;
  type: 'Voluntary Deposit' | 'Monthly Interest' | 'SHU Profit' | 'Withdrawal';
  amount: number;
  category: 'deposits' | 'interest' | 'shu' | 'withdrawals';
}

export const newVoluntaryTransactionsData: Transaction[] = [
];

