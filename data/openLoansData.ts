export interface OpenLoan {
  id: string;
  memberId: string;
  memberName: string;
  loanAmount: number;
  monthlyPayment: number;
  dueDate: string;
  latePayments: number;
  remainingBalance: number;
}

export const openLoansData: OpenLoan[] = [
  {
    id: "loan-001",
    memberId: "mem-123",
    memberName: "John Doe",
    loanAmount: 50000000,
    monthlyPayment: 2500000,
    dueDate: "2024-08-15",
    latePayments: 1,
    remainingBalance: 47500000,
  },
  {
    id: "loan-002",
    memberId: "mem-456",
    memberName: "Jane Smith",
    loanAmount: 100000000,
    monthlyPayment: 5000000,
    dueDate: "2024-08-20",
    latePayments: 0,
    remainingBalance: 95000000,
  },
]; 