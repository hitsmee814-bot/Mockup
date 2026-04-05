export type BookingStatus = "Confirmed" | "Pending" | "Cancelled" | "Completed"
export type PaymentStatus = "Paid" | "Partial" | "Pending" | "Refunded" | "Failed"

export interface PaymentStep {
  label: string
  amount: number
  dueDate: string
  status: PaymentStatus
  paidDate?: string
  method?: string
  transactionId?: string
}

export interface Booking {
  id: string
  packageName: string
  destination: string
  image: string
  travellers: number
  travelDate: string
  returnDate: string
  status: BookingStatus
  totalAmount: number
  paidAmount: number
  bookedOn: string
  invoiceId: string
  paymentSteps: PaymentStep[]
}

export const bookings: Booking[] = [
  {
    id: "BK-2025-001",
    packageName: "Romantic Bali Escape",
    destination: "Bali, Indonesia",
    image: "https://picsum.photos/seed/bali-bk/400/200",
    travellers: 2,
    travelDate: "2025-03-15",
    returnDate: "2025-03-19",
    status: "Confirmed",
    totalAmount: 130000,
    paidAmount: 130000,
    bookedOn: "2025-01-10",
    invoiceId: "INV-2025-001",
    paymentSteps: [
      { label: "Booking Advance (25%)", amount: 32500, dueDate: "2025-01-10", status: "Paid", paidDate: "2025-01-10", method: "Credit Card", transactionId: "TXN-8A3F21" },
      { label: "Second Installment (50%)", amount: 65000, dueDate: "2025-02-01", status: "Paid", paidDate: "2025-01-28", method: "UPI", transactionId: "TXN-9B4G32" },
      { label: "Final Payment (25%)", amount: 32500, dueDate: "2025-02-15", status: "Paid", paidDate: "2025-02-14", method: "Net Banking", transactionId: "TXN-0C5H43" },
    ],
  },
  {
    id: "BK-2025-002",
    packageName: "Swiss Alps Adventure",
    destination: "Interlaken, Switzerland",
    image: "https://picsum.photos/seed/swiss-bk/400/200",
    travellers: 4,
    travelDate: "2025-06-20",
    returnDate: "2025-06-26",
    status: "Pending",
    totalAmount: 720000,
    paidAmount: 180000,
    bookedOn: "2025-02-05",
    invoiceId: "INV-2025-002",
    paymentSteps: [
      { label: "Booking Advance (25%)", amount: 180000, dueDate: "2025-02-05", status: "Paid", paidDate: "2025-02-05", method: "Credit Card", transactionId: "TXN-1D6I54" },
      { label: "Second Installment (50%)", amount: 360000, dueDate: "2025-04-01", status: "Pending" },
      { label: "Final Payment (25%)", amount: 180000, dueDate: "2025-05-20", status: "Pending" },
    ],
  },
  {
    id: "BK-2025-003",
    packageName: "Goa Beach Weekend",
    destination: "Goa, India",
    image: "https://picsum.photos/seed/goa-bk/400/200",
    travellers: 3,
    travelDate: "2025-01-25",
    returnDate: "2025-01-27",
    status: "Completed",
    totalAmount: 36000,
    paidAmount: 36000,
    bookedOn: "2024-12-20",
    invoiceId: "INV-2024-012",
    paymentSteps: [
      { label: "Full Payment", amount: 36000, dueDate: "2024-12-20", status: "Paid", paidDate: "2024-12-20", method: "UPI", transactionId: "TXN-2E7J65" },
    ],
  },
  {
    id: "BK-2025-004",
    packageName: "Dubai Luxury Holiday",
    destination: "Dubai, UAE",
    image: "https://picsum.photos/seed/dubai-bk/400/200",
    travellers: 2,
    travelDate: "2025-04-10",
    returnDate: "2025-04-14",
    status: "Confirmed",
    totalAmount: 180000,
    paidAmount: 90000,
    bookedOn: "2025-01-25",
    invoiceId: "INV-2025-003",
    paymentSteps: [
      { label: "Booking Advance (50%)", amount: 90000, dueDate: "2025-01-25", status: "Paid", paidDate: "2025-01-25", method: "Credit Card", transactionId: "TXN-3F8K76" },
      { label: "Final Payment (50%)", amount: 90000, dueDate: "2025-03-10", status: "Pending" },
    ],
  },
  {
    id: "BK-2025-005",
    packageName: "Kerala Backwaters",
    destination: "Alleppey, India",
    image: "https://picsum.photos/seed/kerala-bk/400/200",
    travellers: 2,
    travelDate: "2024-11-15",
    returnDate: "2024-11-18",
    status: "Cancelled",
    totalAmount: 60000,
    paidAmount: 15000,
    bookedOn: "2024-10-01",
    invoiceId: "INV-2024-009",
    paymentSteps: [
      { label: "Booking Advance (25%)", amount: 15000, dueDate: "2024-10-01", status: "Refunded", paidDate: "2024-10-01", method: "UPI", transactionId: "TXN-4G9L87" },
    ],
  },
]
