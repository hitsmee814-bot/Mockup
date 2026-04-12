export interface SummaryCard {
  title: string
  value: string
  change: string
  changeType: "up" | "down" | "neutral"
  icon: string
}

export interface UpcomingTrip {
  bookingId: string
  customerName: string
  contact: string
  destination: string
  travelDate: string
  returnDate: string
  packageType: string
  pax: number
  status: "Confirmed" | "Pending" | "Partial Payment" | "On Hold"
  paymentProgress: number
  totalAmount: number
  paidAmount: number
  agent: string
}

export interface CommissionData {
  category: string
  bookings: number
  revenue: number
  commission: number
  rate: string
}

export interface RecentActivity {
  id: string
  action: string
  customer: string
  time: string
  type: "booking" | "payment" | "enquiry" | "cancellation"
}

export interface PerformanceMetric {
  month: string
  bookings: number
  revenue: number
}
