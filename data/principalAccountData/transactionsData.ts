export interface Transaction {
  refId: string;
  transactionDate: string;
  from: string;
  type: 'Initial Principal Deposit' | 'Monthly Interest' | 'SHU Profit';
  amount: number;
  category: 'deposits' | 'interest' | 'shu';
}

export const principalTransactionsData: Transaction[] = [
  // Most recent transactions first
  {
    refId: 'PRI789123457',
    transactionDate: 'Jan 15, 2025, 02:00pm',
    from: 'Cooperative',
    type: 'Monthly Interest',
    amount: 145.00,
    category: 'interest'
  },
  {
    refId: 'PRI789123458',
    transactionDate: 'Dec 15, 2024, 02:00pm',
    from: 'Cooperative',
    type: 'Monthly Interest',
    amount: 145.00,
    category: 'interest'
  },
  {
    refId: 'PRI789123459',
    transactionDate: 'Dec 1, 2024, 10:00am',
    from: 'Cooperative',
    type: 'SHU Profit',
    amount: 250.00,
    category: 'shu'
  },
  {
    refId: 'PRI789123460',
    transactionDate: 'Nov 15, 2024, 02:00pm',
    from: 'Cooperative',
    type: 'Monthly Interest',
    amount: 145.00,
    category: 'interest'
  },
  {
    refId: 'PRI789123461',
    transactionDate: 'Oct 15, 2024, 02:00pm',
    from: 'Cooperative',
    type: 'Monthly Interest',
    amount: 145.00,
    category: 'interest'
  },
  {
    refId: 'PRI789123462',
    transactionDate: 'Sep 15, 2024, 02:00pm',
    from: 'Cooperative',
    type: 'Monthly Interest',
    amount: 145.00,
    category: 'interest'
  },
  {
    refId: 'PRI789123463',
    transactionDate: 'Aug 15, 2024, 02:00pm',
    from: 'Cooperative',
    type: 'Monthly Interest',
    amount: 145.00,
    category: 'interest'
  },
  {
    refId: 'PRI789123464',
    transactionDate: 'Jun 1, 2024, 10:00am',
    from: 'Cooperative',
    type: 'SHU Profit',
    amount: 320.00,
    category: 'shu'
  },
  // Initial deposit - oldest transaction
  {
    refId: 'PRI789123456',
    transactionDate: 'Aug 1, 2024, 09:00am',
    from: 'Principal Account Holder',
    type: 'Initial Principal Deposit',
    amount: 700.00,
    category: 'deposits'
  }
];
