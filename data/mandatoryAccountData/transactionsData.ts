export interface Transaction {
  refId: string;
  transactionDate: string;
  from: string;
  type: 'Monthly Deposit' | 'Monthly Interest' | 'Voluntary Deposit' | 'SHU Profit' | 'Savings';
  amount: number;
  category: 'deposits' | 'interest' | 'shu';
}

export const mandatoryTransactionsData: Transaction[] = [
    {
      refId: '123456789',
      transactionDate: 'Sep 9, 2024, 04:30pm',
      from: 'Davit Pheikrishvili',
      type: 'Monthly Deposit',
      amount: 3000.00,
      category: 'deposits'
    },
    {
      refId: '123456790',
      transactionDate: 'Sep 8, 2024, 03:13pm',
      from: 'Cooperative',
      type: 'Monthly Interest',
      amount: 8500.00,
      category: 'interest'
    },
    {
      refId: '123456791',
      transactionDate: 'Sep 6, 2024, 07:00am',
      from: 'Cooperative',
      type: 'SHU Profit',
      amount: 18000.00,
      category: 'shu'
    },
    {
      refId: '123456792',
      transactionDate: 'Aug 15, 2024, 10:30am',
      from: 'Cooperative',
      type: 'Monthly Interest',
      amount: 8200.00,
      category: 'interest'
    },
    {
      refId: '123456793',
      transactionDate: 'Aug 10, 2024, 02:15pm',
      from: 'Davit Pheikrishvili',
      type: 'Monthly Deposit',
      amount: 3000.00,
      category: 'deposits'
    },
    {
      refId: '123456794',
      transactionDate: 'Aug 5, 2024, 09:45am',
      from: 'Cooperative',
      type: 'SHU Profit',
      amount: 15000.00,
      category: 'shu'
    },
    {
      refId: '123456795',
      transactionDate: 'Jul 20, 2024, 02:20pm',
      from: 'Davit Pheikrishvili',
      type: 'Monthly Deposit',
      amount: 3000.00,
      category: 'deposits'
    },
    {
      refId: '123456796',
      transactionDate: 'Jul 15, 2024, 11:00am',
      from: 'Cooperative',
      type: 'Monthly Interest',
      amount: 8100.00,
      category: 'interest'
    },
    {
      refId: '123456797',
      transactionDate: 'Jul 10, 2024, 01:45pm',
      from: 'Cooperative',
      type: 'SHU Profit',
      amount: 17000.00,
      category: 'shu'
    },
    {
      refId: '123456798',
      transactionDate: 'Jun 30, 2024, 10:15am',
      from: 'Davit Pheikrishvili',
      type: 'Monthly Deposit',
      amount: 3000.00,
      category: 'deposits'
    },
    {
      refId: '123456799',
      transactionDate: 'Jun 25, 2024, 09:40am',
      from: 'Cooperative',
      type: 'Monthly Interest',
      amount: 7900.00,
      category: 'interest'
    },
    {
      refId: '123456800',
      transactionDate: 'Jun 18, 2024, 04:20pm',
      from: 'Cooperative',
      type: 'SHU Profit',
      amount: 16000.00,
      category: 'shu'
    },
    {
      refId: '123456801',
      transactionDate: 'Jun 10, 2024, 03:10pm',
      from: 'Davit Pheikrishvili',
      type: 'Monthly Deposit',
      amount: 3000.00,
      category: 'deposits'
    },
    {
      refId: '123456802',
      transactionDate: 'May 28, 2024, 08:50am',
      from: 'Cooperative',
      type: 'Monthly Interest',
      amount: 8000.00,
      category: 'interest'
    },
    {
      refId: '123456803',
      transactionDate: 'May 20, 2024, 05:35pm',
      from: 'Cooperative',
      type: 'SHU Profit',
      amount: 15500.00,
      category: 'shu'
    },
    {
      refId: '123456804',
      transactionDate: 'May 15, 2024, 02:00pm',
      from: 'Davit Pheikrishvili',
      type: 'Monthly Deposit',
      amount: 3000.00,
      category: 'deposits'
    }
  ];