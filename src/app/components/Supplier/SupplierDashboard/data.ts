import type { SupplierUpcomingTrip, SupplierCommissionData, SupplierRecentActivity, SupplierPerformanceMetric } from "./types"

export const upcomingTrips: SupplierUpcomingTrip[] = [
  { bookingId: "BK-10234", customerName: "Rahul Sharma", contact: "+91 98765 43210", destination: "Bali, Indonesia", travelDate: "2025-07-15", returnDate: "2025-07-22", packageType: "International", pax: 4, status: "Confirmed", paymentProgress: 100, totalAmount: 245000, paidAmount: 245000, agent: "Self" },
  { bookingId: "BK-10235", customerName: "Priya Mehta", contact: "+91 87654 32109", destination: "Manali, HP", travelDate: "2025-07-18", returnDate: "2025-07-23", packageType: "Domestic", pax: 2, status: "Partial Payment", paymentProgress: 60, totalAmount: 35000, paidAmount: 21000, agent: "Self" },
  { bookingId: "BK-10236", customerName: "Amit Patel", contact: "+91 76543 21098", destination: "Dubai, UAE", travelDate: "2025-07-20", returnDate: "2025-07-26", packageType: "International", pax: 6, status: "Pending", paymentProgress: 30, totalAmount: 480000, paidAmount: 144000, agent: "Self" },
  { bookingId: "BK-10237", customerName: "Sneha Reddy", contact: "+91 65432 10987", destination: "Goa", travelDate: "2025-07-22", returnDate: "2025-07-25", packageType: "Domestic", pax: 3, status: "Confirmed", paymentProgress: 100, totalAmount: 28000, paidAmount: 28000, agent: "Self" },
  { bookingId: "BK-10238", customerName: "Vikram Singh", contact: "+91 54321 09876", destination: "Thailand", travelDate: "2025-07-25", returnDate: "2025-08-01", packageType: "International", pax: 2, status: "On Hold", paymentProgress: 0, totalAmount: 120000, paidAmount: 0, agent: "Self" },
  { bookingId: "BK-10239", customerName: "Neha Gupta", contact: "+91 43210 98765", destination: "Kerala", travelDate: "2025-07-28", returnDate: "2025-08-02", packageType: "Domestic", pax: 5, status: "Partial Payment", paymentProgress: 45, totalAmount: 62000, paidAmount: 27900, agent: "Self" },
  { bookingId: "BK-10240", customerName: "Arjun Nair", contact: "+91 32109 87654", destination: "Maldives", travelDate: "2025-08-01", returnDate: "2025-08-06", packageType: "International", pax: 2, status: "Confirmed", paymentProgress: 100, totalAmount: 310000, paidAmount: 310000, agent: "Self" },
]

export const commissionData: SupplierCommissionData[] = [
  { category: "Domestic Packages", bookings: 42, revenue: 1260000, commission: 88200, rate: "7%" },
  { category: "International Packages", bookings: 18, revenue: 3240000, commission: 291600, rate: "9%" },
  { category: "Flight Bookings", bookings: 67, revenue: 890000, commission: 26700, rate: "3%" },
  { category: "Hotel Bookings", bookings: 53, revenue: 720000, commission: 36000, rate: "5%" },
  { category: "Cab & Transfers", bookings: 31, revenue: 186000, commission: 9300, rate: "5%" },
  { category: "Visa Services", bookings: 12, revenue: 96000, commission: 14400, rate: "15%" },
]

export const recentActivity: SupplierRecentActivity[] = [
  { id: "1", action: "New booking confirmed", customer: "Rahul Sharma", time: "2 min ago", type: "booking" },
  { id: "2", action: "Payment received ₹21,000", customer: "Priya Mehta", time: "15 min ago", type: "payment" },
  { id: "3", action: "Enquiry raised for Europe trip", customer: "Karan Joshi", time: "1 hr ago", type: "enquiry" },
  { id: "4", action: "Booking cancelled", customer: "Ritu Verma", time: "2 hrs ago", type: "cancellation" },
  { id: "5", action: "Payment received ₹1,44,000", customer: "Amit Patel", time: "3 hrs ago", type: "payment" },
  { id: "6", action: "New booking for Goa", customer: "Sneha Reddy", time: "5 hrs ago", type: "booking" },
]

export const performanceData: SupplierPerformanceMetric[] = [
  { month: "Jan", bookings: 12, revenue: 340000 },
  { month: "Feb", bookings: 18, revenue: 520000 },
  { month: "Mar", bookings: 15, revenue: 410000 },
  { month: "Apr", bookings: 22, revenue: 680000 },
  { month: "May", bookings: 28, revenue: 890000 },
  { month: "Jun", bookings: 35, revenue: 1120000 },
]
