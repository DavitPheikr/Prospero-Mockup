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

export interface MandatoryStatistics {
  "1 month": StatisticsPeriod;
  "3 months": StatisticsPeriod;
  "6 months": StatisticsPeriod;
  "1 year": StatisticsPeriod;
  "all time": StatisticsPeriod;
}

// Based on transactions: 100.00 monthly interest, 400.00 SHU profits, 200.00 monthly contributions
export const mandatoryStatisticsData: MandatoryStatistics = {
  "1 month": {
    totalProfit: 100.00, // 1 month interest
    profitFromInterest: 100.00,
    profitFromSHU: 0,
    profitFromDeposits: 0,
    interestProgress: 100,
    shuProgress: 0,
    totalDeposits: 200.00, // 1 month contribution
    totalGrowth: 300.00,
    growthFromDeposits: 200.00,
    growthFromInterest: 100.00,
    growthFromSHU: 0,
    depositsProgress: 67,
    interestGrowthProgress: 33,
    shuGrowthProgress: 0
  },
  "3 months": {
    totalProfit: 300.00, // 3 months interest
    profitFromInterest: 300.00,
    profitFromSHU: 0,
    profitFromDeposits: 0,
    interestProgress: 100,
    shuProgress: 0,
    totalDeposits: 600.00, // 3 months contributions
    totalGrowth: 900.00,
    growthFromDeposits: 600.00,
    growthFromInterest: 300.00,
    growthFromSHU: 0,
    depositsProgress: 67,
    interestGrowthProgress: 33,
    shuGrowthProgress: 0
  },
  "6 months": {
    totalProfit: 1000.00, // 6 months interest + 1 SHU profit
    profitFromInterest: 600.00,
    profitFromSHU: 400.00,
    profitFromDeposits: 0,
    interestProgress: 60,
    shuProgress: 40,
    totalDeposits: 1200.00, // 6 months contributions
    totalGrowth: 2200.00,
    growthFromDeposits: 1200.00,
    growthFromInterest: 600.00,
    growthFromSHU: 400.00,
    depositsProgress: 55,
    interestGrowthProgress: 27,
    shuGrowthProgress: 18
  },
  "1 year": {
    totalProfit: 2200.00, // 12 months interest + 2 SHU profits
    profitFromInterest: 1200.00,
    profitFromSHU: 800.00,
    profitFromDeposits: 200.00,
    interestProgress: 60,
    shuProgress: 40,
    totalDeposits: 2400.00, // 12 months contributions
    totalGrowth: 4600.00,
    growthFromDeposits: 2400.00,
    growthFromInterest: 1200.00,
    growthFromSHU: 800.00,
    depositsProgress: 52,
    interestGrowthProgress: 26,
    shuGrowthProgress: 22
  },
  "all time": {
    totalProfit: 3000.00, // Since Feb 2024: ~11 months interest + 2 SHU profits
    profitFromInterest: 1100.00,
    profitFromSHU: 800.00,
    profitFromDeposits: 1100.00,
    interestProgress: 62,
    shuProgress: 38,
    totalDeposits: 2200.00, // 11 months contributions
    totalGrowth: 5200.00,
    growthFromDeposits: 2200.00,
    growthFromInterest: 1100.00,
    growthFromSHU: 800.00,
    depositsProgress: 42,
    interestGrowthProgress: 21,
    shuGrowthProgress: 15
  }
};

export const periods = ["1 month", "3 months", "6 months", "1 year", "all time"];

export type StatisticCategory = 'all' | 'deposits' | 'interest' | 'shu' | 'profit';
export type TimePeriod = "1 month" | "3 months" | "6 months" | "1 year" | "all time";

export function getMandatoryStatistics(
  period: TimePeriod,
  category: StatisticCategory = 'all'
): Partial<StatisticsPeriod> {
  const data = mandatoryStatisticsData[period];
  
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

export function getMandatoryGrowthBreakdown(period: TimePeriod) {
  const data = mandatoryStatisticsData[period];
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
