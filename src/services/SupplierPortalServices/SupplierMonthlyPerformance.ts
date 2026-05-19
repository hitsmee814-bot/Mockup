import { apiClient } from "@/lib/apiClient"

export type MonthlyPerformanceItem = {
  month: string
  revenue: number
  orders: number
}

export type MonthlyPerformanceResponse = {
  year: number
  data: MonthlyPerformanceItem[]
}

export const monthlyPerformanceService = {
  getMonthlyPerformance: (
    year: number,
    token: string
  ): Promise<MonthlyPerformanceResponse> => {
    return apiClient(
      `/supplier/dashboard/monthly-performance?year=${year}&token=${encodeURIComponent(token)}`,
      {
        method: "GET",
      }
    )
  },
}