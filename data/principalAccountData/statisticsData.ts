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
}

export interface PrincipalStatistics {
  "1 month": StatisticsPeriod;
  "3 months": StatisticsPeriod;
  "6 months": StatisticsPeriod;
  "1 year": StatisticsPeriod;
  "all time": StatisticsPeriod;
}

// Based on transactions: 145.00 monthly interest, 250-320 SHU profits, 700.00 initial deposit
export const principalStatisticsData: PrincipalStatistics = {
  "1 month": {
    totalProfit: 145.00, // 1 month interest
    profitFromInterest: 145.00,
    profitFromSHU: 0,
    profitFromDeposits: 0,
    interestProgress: 100,
    shuProgress: 0,
    totalDeposits: 0, // No new deposits in recent months
    totalGrowth: 145.00,
    growthFromDeposits: 0,
    growthFromInterest: 145.00,
    growthFromSHU: 0,
    depositsProgress: 0,
    interestGrowthProgress: 100,
    shuGrowthProgress: 0
  },
  "3 months": {
    totalProfit: 435.00, // 3 months interest
    profitFromInterest: 435.00,
    profitFromSHU: 0,
    profitFromDeposits: 0,
    interestProgress: 100,
    shuProgress: 0,
    totalDeposits: 0,
    totalGrowth: 435.00,
    growthFromDeposits: 0,
    growthFromInterest: 435.00,
    growthFromSHU: 0,
    depositsProgress: 0,
    interestGrowthProgress: 100,
    shuGrowthProgress: 0
  },
  "6 months": {
    totalProfit: 1120.00, // 6 months interest + 1 SHU profit
    profitFromInterest: 870.00,
    profitFromSHU: 250.00,
    profitFromDeposits: 0,
    interestProgress: 78,
    shuProgress: 22,
    totalDeposits: 0,
    totalGrowth: 1120.00,
    growthFromDeposits: 0,
    growthFromInterest: 870.00,
    growthFromSHU: 250.00,
    depositsProgress: 0,
    interestGrowthProgress: 78,
    shuGrowthProgress: 22
  },
  "1 year": {
    totalProfit: 2315.00, // From Aug 2024: 6 months interest + 2 SHU profits
    profitFromInterest: 1450.00,
    profitFromSHU: 570.00,
    profitFromDeposits: 295.00,
    interestProgress: 72,
    shuProgress: 28,
    totalDeposits: 700.00, // Initial deposit within the year
    totalGrowth: 3015.00,
    growthFromDeposits: 700.00,
    growthFromInterest: 1450.00,
    growthFromSHU: 570.00,
    depositsProgress: 23,
    interestGrowthProgress: 48,
    shuGrowthProgress: 19
  },
  "all time": {
    totalProfit: 2315.00, // Same as 1 year since account created in Aug 2024
    profitFromInterest: 1450.00,
    profitFromSHU: 570.00,
    profitFromDeposits: 295.00,
    interestProgress: 72,
    shuProgress: 28,
    totalDeposits: 700.00,
    totalGrowth: 3015.00,
    growthFromDeposits: 700.00,
    growthFromInterest: 1450.00,
    growthFromSHU: 570.00,
    depositsProgress: 23,
    interestGrowthProgress: 48,
    shuGrowthProgress: 19
  }
};

export const periods = ["1 month", "3 months", "6 months", "1 year", "all time"];

export type StatisticCategory = 'all' | 'deposits' | 'interest' | 'shu' | 'profit';
export type TimePeriod = "1 month" | "3 months" | "6 months" | "1 year" | "all time";

export function getPrincipalStatistics(
  period: TimePeriod,
  category: StatisticCategory = 'all'
): Partial<StatisticsPeriod> {
  const data = principalStatisticsData[period];
  
  switch (category) {
    case 'all':
      return data;
    case 'deposits':
      return {
        totalDeposits: data.totalDeposits,
        growthFromDeposits: data.growthFromDeposits,
        depositsProgress: data.depositsProgress
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
    default:
      return data;
  }
}

export function getPrincipalGrowthBreakdown(period: TimePeriod) {
  const data = principalStatisticsData[period];
  return {
    total: data.totalGrowth,
    deposits: data.growthFromDeposits,
    interest: data.growthFromInterest,
    shu: data.growthFromSHU,
    percentages: {
      deposits: data.depositsProgress,
      interest: data.interestGrowthProgress,
      shu: data.shuGrowthProgress
    }
  };
}
