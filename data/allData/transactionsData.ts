export interface Transaction {
  refId: string;
  transactionDate: string;
  from: string;
  type: 'Initial Principal Deposit' | 'Mandatory Contribution' | 'Monthly Interest' | 'SHU Profit';
  amount: number;
  category: 'deposits' | 'interest' | 'shu';
  accountType: 'mandatory' | 'principal';
}

export const allTransactionsData: Transaction[] = [
  // Most recent transactions first
  {
    refId: 'PRI789123457',
    transactionDate: 'Jan 15, 2025, 02:00pm',
    from: 'Cooperative',
    type: 'Monthly Interest',
    amount: 145.00,
    category: 'interest',
    accountType: 'principal'
  },
  {
    refId: 'MAN123456789',
    transactionDate: 'Jan 5, 2025, 10:00am',
   from: 'John Doe',
    type: 'Mandatory Contribution',
    amount: 200.00,
    category: 'deposits',
    accountType: 'mandatory'
  },
  {
    refId: 'MAN123456790',
    transactionDate: 'Jan 1, 2025, 02:00pm',
    from: 'Cooperative',
    type: 'Monthly Interest',
    amount: 100.00,
    category: 'interest',
    accountType: 'mandatory'
  },
  {
    refId: 'PRI789123458',
    transactionDate: 'Dec 15, 2024, 02:00pm',
    from: 'Cooperative',
    type: 'Monthly Interest',
    amount: 145.00,
    category: 'interest',
    accountType: 'principal'
  },
  {
    refId: 'MAN123456791',
    transactionDate: 'Dec 5, 2024, 10:00am',
   from: 'John Doe',
    type: 'Mandatory Contribution',
    amount: 200.00,
    category: 'deposits',
    accountType: 'mandatory'
  },
  {
    refId: 'MAN123456792',
    transactionDate: 'Dec 1, 2024, 02:00pm',
    from: 'Cooperative',
    type: 'Monthly Interest',
    amount: 100.00,
    category: 'interest',
    accountType: 'mandatory'
  },
  {
    refId: 'PRI789123459',
    transactionDate: 'Dec 1, 2024, 10:00am',
    from: 'Cooperative',
    type: 'SHU Profit',
    amount: 250.00,
    category: 'shu',
    accountType: 'principal'
  },
  {
    refId: 'MAN123456793',
    transactionDate: 'Dec 1, 2024, 10:00am',
    from: 'Cooperative',
    type: 'SHU Profit',
    amount: 400.00,
    category: 'shu',
    accountType: 'mandatory'
  },
  {
    refId: 'PRI789123460',
    transactionDate: 'Nov 15, 2024, 02:00pm',
    from: 'Cooperative',
    type: 'Monthly Interest',
    amount: 145.00,
    category: 'interest',
    accountType: 'principal'
  },
  {
    refId: 'MAN123456794',
    transactionDate: 'Nov 5, 2024, 10:00am',
    from: 'Davit Pheikrishvili',
    type: 'Mandatory Contribution',
    amount: 200.00,
    category: 'deposits',
    accountType: 'mandatory'
  },
  {
    refId: 'MAN123456795',
    transactionDate: 'Nov 1, 2024, 02:00pm',
    from: 'Cooperative',
    type: 'Monthly Interest',
    amount: 100.00,
    category: 'interest',
    accountType: 'mandatory'
  },
  {
    refId: 'PRI789123461',
    transactionDate: 'Oct 15, 2024, 02:00pm',
    from: 'Cooperative',
    type: 'Monthly Interest',
    amount: 145.00,
    category: 'interest',
    accountType: 'principal'
  },
  {
    refId: 'MAN123456796',
    transactionDate: 'Oct 5, 2024, 10:00am',
    from: 'Davit Pheikrishvili',
    type: 'Mandatory Contribution',
    amount: 200.00,
    category: 'deposits',
    accountType: 'mandatory'
  },
  {
    refId: 'PRI789123462',
    transactionDate: 'Sep 15, 2024, 02:00pm',
    from: 'Cooperative',
    type: 'Monthly Interest',
    amount: 145.00,
    category: 'interest',
    accountType: 'principal'
  },
  {
    refId: 'PRI789123463',
    transactionDate: 'Aug 15, 2024, 02:00pm',
    from: 'Cooperative',
    type: 'Monthly Interest',
    amount: 145.00,
    category: 'interest',
    accountType: 'principal'
  },
  {
    refId: 'PRI789123456',
    transactionDate: 'Aug 1, 2024, 09:00am',
    from: 'Principal Account Holder',
    type: 'Initial Principal Deposit',
    amount: 700.00,
    category: 'deposits',
    accountType: 'principal'
  },
  {
    refId: 'PRI789123464',
    transactionDate: 'Jun 1, 2024, 10:00am',
    from: 'Cooperative',
    type: 'SHU Profit',
    amount: 320.00,
    category: 'shu',
    accountType: 'principal'
  },
  {
    refId: 'MAN123456797',
    transactionDate: 'Jun 1, 2024, 10:00am',
    from: 'Cooperative',
    type: 'SHU Profit',
    amount: 400.00,
    category: 'shu',
    accountType: 'mandatory'
  },
  {
    refId: 'MAN123456798',
    transactionDate: 'Feb 26, 2024, 10:00am',
    from: 'Davit Pheikrishvili',
    type: 'Mandatory Contribution',
    amount: 200.00,
    category: 'deposits',
    accountType: 'mandatory'
  }
];
