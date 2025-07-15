export interface StatisticsPeriod {
  totalProfit: number;
  profitFromInterest: number;
  profitFromSHU: number;
  profitFromDeposits: number;
  interestProgress: number;
  shuProgress: number;
  totalDeposits: number;
  totalGrowth: number;
  growthFromDeposits: number;
  growthFromInterest: number;
  growthFromSHU: number;
  depositsProgress: number;
  interestGrowthProgress: number;
  shuGrowthProgress: number;
  totalWithdrawals: number;
  netDeposits: number;
}

export interface VoluntaryStatistics {
  "1 month": StatisticsPeriod;
  "3 months": StatisticsPeriod;
  "6 months": StatisticsPeriod;
  "1 year": StatisticsPeriod;
  "all time": StatisticsPeriod;
}

// Based on voluntary transactions: Variable deposits, ~200-350 monthly interest, 455-560 SHU profits, withdrawals allowed
export const voluntaryStatisticsData: VoluntaryStatistics = {
  "1 month": {
    totalProfit: 200.00, // 1 month interest
    profitFromInterest: 200.00,
    profitFromSHU: 0,
    profitFromDeposits: 0,
    interestProgress: 100,
    shuProgress: 0,
    totalDeposits: 430.00, // Recent deposit
    totalGrowth: 630.00,
    growthFromDeposits: 430.00,
    growthFromInterest: 200.00,
    growthFromSHU: 0,
    depositsProgress: 68,
    interestGrowthProgress: 32,
    shuGrowthProgress: 0,
    totalWithdrawals: 0,
    netDeposits: 430.00
  },
  "3 months": {
    totalProfit: 760.00, // 2 months interest + 1 SHU profit
    profitFromInterest: 550.00, // 200 + 350
    profitFromSHU: 560.00,
    profitFromDeposits: 150.00,
    interestProgress: 50,
    shuProgress: 50,
    totalDeposits: 850.00, // 430 + 120 + 300
    totalGrowth: 1160.00, // 850 - 450 (withdrawal) + 760
    growthFromDeposits: 400.00, // Net after withdrawal
    growthFromInterest: 550.00,
    growthFromSHU: 560.00,
    depositsProgress: 26,
    interestGrowthProgress: 35,
    shuGrowthProgress: 36,
    totalWithdrawals: 450.00,
    netDeposits: 400.00
  },
  "6 months": {
    totalProfit: 1215.00, // 6 months interest + 1 SHU profit
    profitFromInterest: 1000.00,
    profitFromSHU: 560.00,
    profitFromDeposits: 215.00,
    interestProgress: 64,
    shuProgress: 36,
    totalDeposits: 1120.00, // 430 + 120 + 300 + 270
    totalGrowth: 1765.00,
    growthFromDeposits: 670.00, // Net after withdrawal
    growthFromInterest: 1000.00,
    growthFromSHU: 560.00,
    depositsProgress: 30,
    interestGrowthProgress: 43,
    shuGrowthProgress: 24,
    totalWithdrawals: 450.00,
    netDeposits: 670.00
  },
  "1 year": {
    totalProfit: 2670.00, // 12 months interest + 2 SHU profits
    profitFromInterest: 2200.00,
    profitFromSHU: 1015.00, // 560 + 455
    profitFromDeposits: 455.00,
    interestProgress: 68,
    shuProgress: 32,
    totalDeposits: 1920.00, // All deposits including initial
    totalGrowth: 4140.00,
    growthFromDeposits: 1470.00, // Net after withdrawal
    growthFromInterest: 2200.00,
    growthFromSHU: 1015.00,
    depositsProgress: 32,
    interestGrowthProgress: 47,
    shuGrowthProgress: 22,
    totalWithdrawals: 450.00,
    netDeposits: 1470.00
  },
  "all time": {
    totalProfit: 2670.00, // Same as 1 year since account created Aug 2024
    profitFromInterest: 2200.00,
    profitFromSHU: 1015.00,
    profitFromDeposits: 455.00,
    interestProgress: 68,
    shuProgress: 32,
    totalDeposits: 1920.00,
    totalGrowth: 4140.00,
    growthFromDeposits: 1470.00,
    growthFromInterest: 2200.00,
    growthFromSHU: 1015.00,
    depositsProgress: 32,
    interestGrowthProgress: 47,
    shuGrowthProgress: 22,
    totalWithdrawals: 450.00,
    netDeposits: 1470.00
  }
};

export const periods = ["1 month", "3 months", "6 months", "1 year", "all time"];

export type StatisticCategory = 'all' | 'deposits' | 'interest' | 'shu' | 'profit' | 'withdrawals';
export type TimePeriod = "1 month" | "3 months" | "6 months" | "1 year" | "all time";

export function getVoluntaryStatistics(
  period: TimePeriod,
  category: StatisticCategory = 'all'
): Partial<StatisticsPeriod> {
  const data = voluntaryStatisticsData[period];
  
  switch (category) {
    case 'all':
      return data;
    case 'deposits':
      return {
        totalDeposits: data.totalDeposits,
        growthFromDeposits: data.growthFromDeposits,
        depositsProgress: data.depositsProgress,
        totalWithdrawals: data.totalWithdrawals,
        netDeposits: data.netDeposits
      };
    case 'interest':
      return {
        profitFromInterest: data.profitFromInterest,
        growthFromInterest: data.growthFromInterest,
        interestProgress: data.interestProgress,
        interestGrowthProgress: data.interestGrowthProgress
      };
    case 'shu':
      return {
        profitFromSHU: data.profitFromSHU,
        growthFromSHU: data.growthFromSHU,
        shuProgress: data.shuProgress,
        shuGrowthProgress: data.shuGrowthProgress
      };
    case 'profit':
      return {
        totalProfit: data.totalProfit,
        profitFromInterest: data.profitFromInterest,
        profitFromSHU: data.profitFromSHU,
        profitFromDeposits: data.profitFromDeposits,
        interestProgress: data.interestProgress,
        shuProgress: data.shuProgress
      };
    case 'withdrawals':
      return {
        totalWithdrawals: data.totalWithdrawals,
        netDeposits: data.netDeposits
      };
    default:
      return data;
  }
}

export function getVoluntaryGrowthBreakdown(period: TimePeriod) {
  const data = voluntaryStatisticsData[period];
  return {
    total: data.totalGrowth,
    deposits: data.growthFromDeposits,
    interest: data.growthFromInterest,
    shu: data.growthFromSHU,
    withdrawals: data.totalWithdrawals,
    netDeposits: data.netDeposits,
    percentages: {
      deposits: data.depositsProgress,
      interest: data.interestGrowthProgress,
      shu: data.shuGrowthProgress
    }
  };
}
