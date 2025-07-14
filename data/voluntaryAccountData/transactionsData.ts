export interface Transaction {
  refId: string;
  transactionDate: string;
  from: string;
  type: 'Voluntary Deposit' | 'Monthly Interest' | 'SHU Profit' | 'Withdrawal';
  amount: number;
  category: 'deposits' | 'interest' | 'shu' | 'withdrawals';
}

export const voluntaryTransactionsData: Transaction[] = [
  // Most recent transactions first
  {
    refId: 'VOL456789356',
    transactionDate: 'Jan 12, 2025, 04:30pm',
    from: 'Davit Pheikrishvili',
    type: 'Voluntary Deposit',
    amount: 8000000.00,
    category: 'deposits'
  },
  {
    refId: 'VOL456789357',
    transactionDate: 'Jan 1, 2025, 02:00pm',
    from: 'Cooperative',
    type: 'Monthly Interest',
    amount: 380000.00,
    category: 'interest'
  },
  {
    refId: 'VOL456789358',
    transactionDate: 'Dec 30, 2024, 1:00pm',
    from: 'Davit Pheikrishvili',
    type: 'Voluntary Deposit',
    amount: 2000000.00,
    category: 'deposits'
  },
  {
    refId: 'VOL456789359',
    transactionDate: 'Dec 25, 2024, 07:00am',
    from: 'Cooperative',
    type: 'SHU Profit',
    amount: 2200000.00,
    category: 'shu'
  },
  {
    refId: 'VOL456789360',
    transactionDate: 'Dec 15, 2024, 03:13pm',
    from: 'Davit Pheikrishvili',
    type: 'Voluntary Deposit',
    amount: 5500000.00,
    category: 'deposits'
  },
  {
    refId: 'VOL456789361',
    transactionDate: 'Dec 1, 2024, 02:00pm',
    from: 'Cooperative',
    type: 'Monthly Interest',
    amount: 350000.00,
    category: 'interest'
  },
  {
    refId: 'VOL456789362',
    transactionDate: 'Nov 20, 2024, 10:30am',
    from: 'Davit Pheikrishvili',
    type: 'Withdrawal',
    amount: -1500000.00,
    category: 'withdrawals'
  },
  {
    refId: 'VOL456789363',
    transactionDate: 'Nov 10, 2024, 02:15pm',
    from: 'Davit Pheikrishvili',
    type: 'Voluntary Deposit',
    amount: 3200000.00,
    category: 'deposits'
  },
  {
    refId: 'VOL456789364',
    transactionDate: 'Jun 25, 2024, 10:00am',
    from: 'Cooperative',
    type: 'SHU Profit',
    amount: 1800000.00,
    category: 'shu'
  },
  // First transaction
  {
    refId: 'VOL456789365',
    transactionDate: 'Aug 15, 2024, 09:00am',
    from: 'Davit Pheikrishvili',
    type: 'Voluntary Deposit',
    amount: 5000000.00,
    category: 'deposits'
  }
];
