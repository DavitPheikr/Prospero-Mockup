import { mandatoryStatisticsData } from '../mandatoryAccountData/statisticsData';
import { principalStatisticsData } from '../principalAccountData/statisticsData';

export interface StatisticsPeriod {
  totalProfit: number;
  profitFromInterest: number;
  profitFromSHU: number;
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
  profitFromDeposits: number;

}

export interface AllAccountsStatistics {
  "1 month": StatisticsPeriod;
  "3 months": StatisticsPeriod;
  "6 months": StatisticsPeriod;
  "1 year": StatisticsPeriod;
  "all time": StatisticsPeriod;
}

// Realistic standalone data for "all accounts" view - based on actual individual account ranges
export const allAccountsStatisticsData: AllAccountsStatistics = {
  "1 month": {
    totalProfit: 245.00, // 145 (principal) + 100 (mandatory)
    profitFromInterest: 245.00,
    profitFromSHU: 0,
    profitFromDeposits: 200.00, // Combined deposits from mandatory contributions
    interestProgress: 100,
    shuProgress: 0,
    totalDeposits: 200.00, // Only mandatory contributions
    totalGrowth: 445.00,
    growthFromDeposits: 200.00,
    growthFromInterest: 245.00,
    growthFromSHU: 0,
    depositsProgress: 45,
    interestGrowthProgress: 55,
    shuGrowthProgress: 0
  },
  "3 months": {
    totalProfit: 735.00, // 435 (principal) + 300 (mandatory)
    profitFromInterest: 735.00,
    profitFromSHU: 0,
    profitFromDeposits: 600.00, // Combined deposits from 3 months mandatory contributions
    interestProgress: 100,
    shuProgress: 0,
    totalDeposits: 600.00, // 3 months mandatory contributions
    totalGrowth: 1335.00,
    growthFromDeposits: 600.00,
    growthFromInterest: 735.00,
    growthFromSHU: 0,
    depositsProgress: 45,
    interestGrowthProgress: 55,
    shuGrowthProgress: 0
  },
  "6 months": {
    totalProfit: 2120.00, // 1120 (principal) + 1000 (mandatory)
    profitFromInterest: 1470.00, // 870 + 600
    profitFromSHU: 650.00, // 250 + 400
    profitFromDeposits: 1200.00, // Combined deposits from 6 months mandatory contributions
    interestProgress: 69,
    shuProgress: 31,
    totalDeposits: 1200.00, // 6 months mandatory contributions
    totalGrowth: 3320.00,
    growthFromDeposits: 1200.00,
    growthFromInterest: 1470.00,
    growthFromSHU: 650.00,
    depositsProgress: 36,
    interestGrowthProgress: 44,
    shuGrowthProgress: 20
  },
  "1 year": {
    totalProfit: 4515.00, // 2315 (principal) + 2200 (mandatory)
    profitFromInterest: 2650.00, // 1450 + 1200
    profitFromSHU: 1370.00, // 570 + 800
    profitFromDeposits: 3100.00, // Combined deposits: 700 (principal) + 2400 (mandatory)
    interestProgress: 64,
    shuProgress: 36,
    totalDeposits: 3100.00, // 700 (principal) + 2400 (mandatory)
    totalGrowth: 7615.00,
    growthFromDeposits: 3100.00,
    growthFromInterest: 2650.00,
    growthFromSHU: 1370.00,
    depositsProgress: 41,
    interestGrowthProgress: 35,
    shuGrowthProgress: 18
  },
  "all time": {
    totalProfit: 5315.00, // 2315 (principal) + 3000 (mandatory)
    profitFromInterest: 2550.00, // 1450 + 1100
    profitFromSHU: 1370.00, // 570 + 800
    profitFromDeposits: 2900.00, // Combined deposits: 700 (principal) + 2200 (mandatory)
    interestProgress: 65,
    shuProgress: 35,
    totalDeposits: 2900.00, // 700 (principal) + 2200 (mandatory)
    totalGrowth: 8215.00,
    growthFromDeposits: 2900.00,
    growthFromInterest: 2550.00,
    growthFromSHU: 1370.00,
    depositsProgress: 35,
    interestGrowthProgress: 31,
    shuGrowthProgress: 17
  }
};

export const periods = ["1 month", "3 months", "6 months", "1 year", "all time"];

export type StatisticCategory = 'all' | 'deposits' | 'interest' | 'shu' | 'profit';
export type TimePeriod = "1 month" | "3 months" | "6 months" | "1 year" | "all time";

export function getAllAccountsStatistics(
  period: TimePeriod,
  category: StatisticCategory = 'all'
): Partial<StatisticsPeriod> {
  const data = allAccountsStatisticsData[period];
  
  switch (category) {
    case 'all':
      return data;
    case 'deposits':
      return {
        totalDeposits: data.totalDeposits,
        profitFromDeposits: data.profitFromDeposits,
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

export function getAllAccountsGrowthBreakdown(period: TimePeriod) {
  const data = allAccountsStatisticsData[period];
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
