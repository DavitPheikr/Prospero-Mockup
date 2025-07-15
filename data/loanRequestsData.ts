export interface LoanRequest {
  id: string;
  memberId: string;
  memberName: string;
  requestDate: string;
  amount: number;
  purpose: string;
  term: number; // in months
  monthlyIncome: number;
  monthlyExpenses: number;
  status: "Pending" | "Approved" | "Rejected";
  memberData: {
    creditScore: number;
    savings: number;
  };
}

export const loanRequestsData: LoanRequest[] = [
  {
    id: "req-001",
    memberId: "mem-789",
    memberName: "Peter Jones",
    requestDate: "2024-07-20",
    amount: 25000000,
    purpose: "Home Improvement",
    term: 24,
    monthlyIncome: 15000000,
    monthlyExpenses: 8000000,
    status: "Pending",
    memberData: {
      creditScore: 650,
      savings: 15000000,
    },
  },
  {
    id: "req-002",
    memberId: "mem-101",
    memberName: "Mary Poppins",
    requestDate: "2024-07-22",
    amount: 75000000,
    purpose: "Car Purchase",
    term: 36,
    monthlyIncome: 25000000,
    monthlyExpenses: 12000000,
    status: "Approved",
    memberData: {
      creditScore: 780,
      savings: 50000000,
    },
  },
]; 