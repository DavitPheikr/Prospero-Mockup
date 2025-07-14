export interface Transaction {
  refId: string;
  transactionDate: string;
  from: string;
  type: 'Mandatory Contribution' | 'Monthly Interest' | 'SHU Profit';
  amount: number;
  category: 'deposits' | 'interest' | 'shu';
}

export const mandatoryTransactionsData: Transaction[] = [
  // Most recent transactions first
  {
    refId: 'MAN123456789',
    transactionDate: 'Jan 5, 2025, 10:00am',
    from: 'Davit Pheikrishvili',
    type: 'Mandatory Contribution',
    amount: 500000.00,
    category: 'deposits'
  },
  {
    refId: 'MAN123456790',
    transactionDate: 'Jan 1, 2025, 02:00pm',
    from: 'Cooperative',
    type: 'Monthly Interest',
    amount: 425000.00,
    category: 'interest'
  },
  {
    refId: 'MAN123456791',
    transactionDate: 'Dec 5, 2024, 10:00am',
    from: 'Davit Pheikrishvili',
    type: 'Mandatory Contribution',
    amount: 500000.00,
    category: 'deposits'
  },
  {
    refId: 'MAN123456792',
    transactionDate: 'Dec 1, 2024, 02:00pm',
    from: 'Cooperative',
    type: 'Monthly Interest',
    amount: 420000.00,
    category: 'interest'
  },
  {
    refId: 'MAN123456793',
    transactionDate: 'Dec 1, 2024, 10:00am',
    from: 'Cooperative',
    type: 'SHU Profit',
    amount: 2500000.00,
    category: 'shu'
  },
  {
    refId: 'MAN123456794',
    transactionDate: 'Nov 5, 2024, 10:00am',
    from: 'Davit Pheikrishvili',
    type: 'Mandatory Contribution',
    amount: 500000.00,
    category: 'deposits'
  },
  {
    refId: 'MAN123456795',
    transactionDate: 'Nov 1, 2024, 02:00pm',
    from: 'Cooperative',
    type: 'Monthly Interest',
    amount: 415000.00,
    category: 'interest'
  },
  {
    refId: 'MAN123456796',
    transactionDate: 'Oct 5, 2024, 10:00am',
    from: 'Davit Pheikrishvili',
    type: 'Mandatory Contribution',
    amount: 500000.00,
    category: 'deposits'
  },
  {
    refId: 'MAN123456797',
    transactionDate: 'Jun 1, 2024, 10:00am',
    from: 'Cooperative',
    type: 'SHU Profit',
    amount: 2200000.00,
    category: 'shu'
  },
  // First transaction
  {
    refId: 'MAN123456798',
    transactionDate: 'Feb 26, 2024, 10:00am',
    from: 'Davit Pheikrishvili',
    type: 'Mandatory Contribution',
    amount: 500000.00,
    category: 'deposits'
  }
];