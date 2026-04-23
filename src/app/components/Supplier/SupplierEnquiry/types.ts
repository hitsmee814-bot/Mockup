export interface Enquiry {
  id: string
  customerName: string
  email: string
  phone: string
  destination: string
  travelType: "Domestic" | "International"
  travelDate: string
  pax: number
  budget: string
  status: "New" | "In Progress" | "Quoted" | "Follow Up" | "Converted" | "Closed"
  priority: "High" | "Medium" | "Low"
  source: "Website" | "Phone" | "Walk-in" | "Referral" | "Social Media"
  assignedTo: string
  createdAt: string
  lastUpdated: string
  notes: string
}
