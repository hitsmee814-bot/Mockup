import { User, Briefcase, Building2, Users } from "lucide-react"

export const userTypes = [
  { id: "customer", label: "Customer", icon: User, color: "from-blue-600 via-blue-500 to-cyan-500", desc: "Book and manage your trips" },
  { id: "agent", label: "Agent", icon: Briefcase, color: "from-purple-600 via-purple-500 to-pink-500", desc: "Manage client bookings" },
  { id: "supplier", label: "Supplier", icon: Building2, color: "from-orange-600 via-orange-500 to-red-500", desc: "List your services" },
  { id: "corporate", label: "Corporate", icon: Users, color: "from-green-600 via-green-500 to-emerald-500", desc: "Enterprise travel solutions" },
]
