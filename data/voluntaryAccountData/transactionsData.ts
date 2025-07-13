export interface Transaction {
  refId: string;
  transactionDate: string;
  from: string;
  type: 'Monthly Deposit' | 'Monthly Interest' | 'Voluntary Deposit' | 'SHU Profit' | 'Savings';
  amount: number;
  category: 'deposits' | 'interest' | 'shu';
}

export const voluntaryTransactionsData: Transaction[] = [
    {
      refId: '456789356',
      transactionDate: 'Sep 9, 2024, 04:30pm',
      from: 'Davit Pheikrishvili',
      type: 'Monthly Deposit',
      amount: 5670.00,
      category: 'deposits'
    },
    {
      refId: '456789356',
      transactionDate: 'Sep 8, 2024, 03:13pm',
      from: 'Cooperative',
      type: 'Monthly Interest',
      amount: 15000.00,
      category: 'interest'
    },
    {
      refId: '456789356',
      transactionDate: 'Sep 7, 2024, 1:00pm',
      from: 'Davit Pheikrishvili',
      type: 'Voluntary Deposit',
      amount: 12.50,
      category: 'deposits'
    },
    {
      refId: '456789356',
      transactionDate: 'Sep 6, 2024, 07:00am',
      from: 'Cooperative',
      type: 'SHU Profit',
      amount: 30000.00,
      category: 'shu'
    },
    {
      refId: '456789356',
      transactionDate: 'Sep 8, 2024, 03:13pm',
      from: 'Davit Pheikrishvili',
      type: 'Savings',
      amount: 8000.00,
      category: 'deposits'
    },
    {
      refId: '456789357',
      transactionDate: 'Aug 15, 2024, 10:30am',
      from: 'Cooperative',
      type: 'Monthly Interest',
      amount: 14500.00,
      category: 'interest'
    },
    {
      refId: '456789358',
      transactionDate: 'Aug 10, 2024, 02:15pm',
      from: 'Davit Pheikrishvili',
      type: 'Monthly Deposit',
      amount: 5670.00,
      category: 'deposits'
    },
    {
      refId: '456789359',
      transactionDate: 'Aug 5, 2024, 09:45am',
      from: 'Cooperative',
      type: 'SHU Profit',
      amount: 25000.00,
      category: 'shu'
    },
    {
      refId: '456789360',
      transactionDate: 'Jul 28, 2024, 05:30pm',
      from: 'Davit Pheikrishvili',
      type: 'Voluntary Deposit',
      amount: 100.00,
      category: 'deposits'
    },
    {
      refId: '456789361',
      transactionDate: 'Jul 25, 2024, 11:10am',
      from: 'Cooperative',
      type: 'Monthly Interest',
      amount: 14000.00,
      category: 'interest'
    },
    {
      refId: '456789362',
      transactionDate: 'Jul 18, 2024, 04:05pm',
      from: 'Davit Pheikrishvili',
      type: 'Savings',
      amount: 6500.00,
      category: 'deposits'
    },
    {
      refId: '456789363',
      transactionDate: 'Jul 12, 2024, 08:30am',
      from: 'Cooperative',
      type: 'SHU Profit',
      amount: 27000.00,
      category: 'shu'
    },
    {
      refId: '456789364',
      transactionDate: 'Jul 9, 2024, 09:00am',
      from: 'Davit Pheikrishvili',
      type: 'Monthly Deposit',
      amount: 5670.00,
      category: 'deposits'
    },
    {
      refId: '456789365',
      transactionDate: 'Jun 29, 2024, 03:45pm',
      from: 'Davit Pheikrishvili',
      type: 'Voluntary Deposit',
      amount: 20.00,
      category: 'deposits'
    },
    {
      refId: '456789366',
      transactionDate: 'Jun 26, 2024, 10:00am',
      from: 'Cooperative',
      type: 'Monthly Interest',
      amount: 15500.00,
      category: 'interest'
    },
    {
      refId: '456789367',
      transactionDate: 'Jun 22, 2024, 06:45pm',
      from: 'Davit Pheikrishvili',
      type: 'Savings',
      amount: 7100.00,
      category: 'deposits'
    },
    {
      refId: '456789368',
      transactionDate: 'Jun 19, 2024, 07:30am',
      from: 'Cooperative',
      type: 'SHU Profit',
      amount: 29500.00,
      category: 'shu'
    }
  
];
