export interface AgentUpcomingTravel {
  bookingId: string;
  customerName: string;
  contact: string;
  destination: string;
  travelDate: string;
  returnDate: string;
  packageType: string;
  pax: number;
  status: "Confirmed" | "Pending" | "Partial Payment" | "On Hold";
  paymentProgress: number;
  totalAmount: number;
  paidAmount: number;
  commission: number;
}

export interface AgentCommissionData {
  category: string;
  bookings: number;
  revenue: number;
  commission: number;
  rate: string;
}

export interface AgentRecentActivity {
  id: string;
  action: string;
  customer: string;
  time: string;
  type: "booking" | "payment" | "enquiry" | "commission";
}

export interface AgentPerformanceMetric {
  month: string;
  bookings: number;
  commission: number;
}