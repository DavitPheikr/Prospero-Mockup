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
    totalProfit: 0, // 1 month interest
    profitFromInterest: 0,
    profitFromSHU: 0,
    profitFromDeposits: 0,
    interestProgress: 0,
    shuProgress: 0,
    totalDeposits: 0, // 1 month contribution
    totalGrowth: 0,
    growthFromDeposits: 0,
    growthFromInterest: 0,
    growthFromSHU: 0,
    depositsProgress: 0,
    interestGrowthProgress: 0,
    shuGrowthProgress: 0
  },
  "3 months": {
    totalProfit: 0, // 1 month interest
    profitFromInterest: 0,
    profitFromSHU: 0,
    profitFromDeposits: 0,
    interestProgress: 0,
    shuProgress: 0,
    totalDeposits: 0, // 1 month contribution
    totalGrowth: 0,
    growthFromDeposits: 0,
    growthFromInterest: 0,
    growthFromSHU: 0,
    depositsProgress: 0,
    interestGrowthProgress: 0,
    shuGrowthProgress: 0
  },
  "6 months": {
    totalProfit: 0, // 1 month interest
    profitFromInterest: 0,
    profitFromSHU: 0,
    profitFromDeposits: 0,
    interestProgress: 0,
    shuProgress: 0,
    totalDeposits: 0, // 1 month contribution
    totalGrowth: 0,
    growthFromDeposits: 0,
    growthFromInterest: 0,
    growthFromSHU: 0,
    depositsProgress: 0,
    interestGrowthProgress: 0,
    shuGrowthProgress: 0
  },
  "1 year": {
    totalProfit: 0, // 1 month interest
    profitFromInterest: 0,
    profitFromSHU: 0,
    profitFromDeposits: 0,
    interestProgress: 0,
    shuProgress: 0,
    totalDeposits: 0, // 1 month contribution
    totalGrowth: 0,
    growthFromDeposits: 0,
    growthFromInterest: 0,
    growthFromSHU: 0,
    depositsProgress: 0,
    interestGrowthProgress: 0,
    shuGrowthProgress: 0
  },
  "all time": {
    totalProfit: 0, // 1 month interest
    profitFromInterest: 0,
    profitFromSHU: 0,
    profitFromDeposits: 0,
    interestProgress: 0,
    shuProgress: 0,
    totalDeposits: 0, // 1 month contribution
    totalGrowth: 0,
    growthFromDeposits: 0,
    growthFromInterest: 0,
    growthFromSHU: 0,
    depositsProgress: 0,
    interestGrowthProgress: 0,
    shuGrowthProgress: 0
  }
};

export const periods = ["1 month", "3 months", "6 months", "1 year", "all time"];

export type StatisticCategory = 'all' | 'deposits' | 'interest' | 'shu' | 'profit';
export type TimePeriod = "1 month" | "3 months" | "6 months" | "1 year" | "all time";

export function getNewVoluntarystistics(
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

export function getNewVoluntaryGrowthBreakdown(period: TimePeriod) {
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
