"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Pencil,
  Trash2,
  CalendarDays,
  Gift,
  Car,
  Camera,
  BadgeCheck,
  Shield,
  Coins,
  Headphones,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner";


const serviceTypes = [
  "Package",
  "Transfer",
  "Sightseeing",
  "Visa",
  "Insurance",
  "Forex",
  "Local Assistance",
] as const

type ServiceType = (typeof serviceTypes)[number]
type FilterType = "all" | ServiceType

type ServiceRate = {
  id: string
  name: string
  type: ServiceType
  destination: string
  netRate: number
  markupRate: number
  currency: string
  seasonStart: string
  seasonEnd: string
}

const mockRates: ServiceRate[] = [
  {
    id: "1",
    name: "Bali Honeymoon 5N/6D",
    type: "Package",
    destination: "Bali",
    netRate: 850,
    markupRate: 1050,
    currency: "USD",
    seasonStart: "2025-04-01",
    seasonEnd: "2025-09-30",
  },
  {
    id: "2",
    name: "Airport Pickup - Bangkok",
    type: "Transfer",
    destination: "Bangkok",
    netRate: 25,
    markupRate: 40,
    currency: "USD",
    seasonStart: "2025-01-01",
    seasonEnd: "2025-12-31",
  },
  {
    id: "3",
    name: "Dubai City Tour",
    type: "Sightseeing",
    destination: "Dubai",
    netRate: 60,
    markupRate: 85,
    currency: "USD",
    seasonStart: "2025-01-01",
    seasonEnd: "2025-12-31",
  },
  {
    id: "4",
    name: "Thailand Tourist Visa",
    type: "Visa",
    destination: "Thailand",
    netRate: 30,
    markupRate: 50,
    currency: "USD",
    seasonStart: "2025-01-01",
    seasonEnd: "2025-12-31",
  },
  {
    id: "5",
    name: "Travel Insurance - Asia",
    type: "Insurance",
    destination: "Asia",
    netRate: 15,
    markupRate: 25,
    currency: "USD",
    seasonStart: "2025-01-01",
    seasonEnd: "2025-12-31",
  },
]

type AddRateForm = {
  name: string
  type: ServiceType
  destination: string
  currency: string
  netRate: string
  markupRate: string
  seasonStart: string
  seasonEnd: string
}

const initialForm: AddRateForm = {
  name: "",
  type: "Package",
  destination: "",
  currency: "USD",
  netRate: "",
  markupRate: "",
  seasonStart: "",
  seasonEnd: "",
}

type FilterCard = {
  key: FilterType
  label: string
  count: number
  icon: React.ElementType
  cardClass: string
  iconWrapClass: string
  iconClass: string
  activeClass: string
}
const typeStyles: Record<string, string> = {
  Package: "bg-emerald-100 text-emerald-700",
  Transfer: "bg-violet-100 text-violet-700",
  Sightseeing: "bg-orange-100 text-orange-600",
  Visa: "bg-blue-100 text-blue-700",
  Insurance: "bg-pink-100 text-pink-700",
  Forex: "bg-green-100 text-green-700",
  "Local Assistance": "bg-yellow-100 text-yellow-700",
}
export default function SupplierServiceRates() {
  const [rates, setRates] = useState<ServiceRate[]>(mockRates)
  const [activeTab, setActiveTab] = useState<FilterType>("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingRateId, setEditingRateId] = useState<string | null>(null)
  const [form, setForm] = useState<AddRateForm>(initialForm)

  const filterCards: FilterCard[] = [
    {
      key: "all",
      label: "All",
      count: rates.length,
      icon: CalendarDays,
      cardClass: "bg-sky-50/70 border-sky-100",
      iconWrapClass: "bg-sky-100",
      iconClass: "text-sky-600",
      activeClass: "border-sky-400 ring-2 ring-sky-200 bg-sky-50",
    },
    {
      key: "Package",
      label: "Package",
      count: rates.filter((r) => r.type === "Package").length,
      icon: Gift,
      cardClass: "bg-emerald-50/70 border-emerald-100",
      iconWrapClass: "bg-emerald-100",
      iconClass: "text-emerald-600",
      activeClass: "border-emerald-400 ring-2 ring-emerald-200 bg-emerald-50",
    },
    {
      key: "Transfer",
      label: "Transfer",
      count: rates.filter((r) => r.type === "Transfer").length,
      icon: Car,
      cardClass: "bg-violet-50/70 border-violet-100",
      iconWrapClass: "bg-violet-100",
      iconClass: "text-violet-600",
      activeClass: "border-violet-400 ring-2 ring-violet-200 bg-violet-50",
    },
    {
      key: "Sightseeing",
      label: "Sightseeing",
      count: rates.filter((r) => r.type === "Sightseeing").length,
      icon: Camera,
      cardClass: "bg-orange-50/70 border-orange-100",
      iconWrapClass: "bg-orange-100",
      iconClass: "text-orange-600",
      activeClass: "border-orange-400 ring-2 ring-orange-200 bg-orange-50",
    },
    {
      key: "Visa",
      label: "Visa",
      count: rates.filter((r) => r.type === "Visa").length,
      icon: BadgeCheck,
      cardClass: "bg-blue-50/70 border-blue-100",
      iconWrapClass: "bg-blue-100",
      iconClass: "text-blue-600",
      activeClass: "border-blue-400 ring-2 ring-blue-200 bg-blue-50",
    },
    {
      key: "Insurance",
      label: "Insurance",
      count: rates.filter((r) => r.type === "Insurance").length,
      icon: Shield,
      cardClass: "bg-pink-50/70 border-pink-100",
      iconWrapClass: "bg-pink-100",
      iconClass: "text-pink-600",
      activeClass: "border-pink-400 ring-2 ring-pink-200 bg-pink-50",
    },
    {
      key: "Forex",
      label: "Forex",
      count: rates.filter((r) => r.type === "Forex").length,
      icon: Coins,
      cardClass: "bg-green-50/70 border-green-100",
      iconWrapClass: "bg-green-100",
      iconClass: "text-green-600",
      activeClass: "border-green-400 ring-2 ring-green-200 bg-green-50",
    },
    {
      key: "Local Assistance",
      label: "Local Assistance",
      count: rates.filter((r) => r.type === "Local Assistance").length,
      icon: Headphones,
      cardClass: "bg-amber-50/70 border-amber-100",
      iconWrapClass: "bg-amber-100",
      iconClass: "text-amber-600",
      activeClass: "border-amber-400 ring-2 ring-amber-200 bg-amber-50",
    },
  ]

  const filteredRates =
    activeTab === "all"
      ? rates
      : rates.filter((rate) => rate.type === activeTab)

  const handleDelete = (id: string) => {
    const rateToDelete = rates.find((rate) => rate.id === id)

    setRates((prev) => prev.filter((rate) => rate.id !== id))
     toast.success("Service rate deleted successfully", {
                position: "top-right",
                duration: 3000,
              });
   }

  const handleEdit = (rate: ServiceRate) => {
    setIsEditMode(true)
    setEditingRateId(rate.id)
    setForm({
      name: rate.name,
      type: rate.type,
      destination: rate.destination,
      currency: rate.currency,
      netRate: String(rate.netRate),
      markupRate: String(rate.markupRate),
      seasonStart: rate.seasonStart,
      seasonEnd: rate.seasonEnd,
    })
    setDialogOpen(true)
  }

  const resetFormState = () => {
    setForm(initialForm)
    setIsEditMode(false)
    setEditingRateId(null)
  }

  const handleAddOrEditRate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isEditMode && editingRateId) {
      setRates((prev) =>
        prev.map((rate) =>
          rate.id === editingRateId
            ? {
                ...rate,
                name: form.name.trim(),
                type: form.type,
                destination: form.destination.trim(),
                netRate: Number(form.netRate),
                markupRate: Number(form.markupRate),
                currency: form.currency,
                seasonStart: form.seasonStart,
                seasonEnd: form.seasonEnd,
              }
            : rate
        )
      )

      setDialogOpen(false)
      resetFormState()
          toast.success(`${form.name.trim()} updated successfully`, {
                      position: "top-right",
                      duration: 3000,
                    });
    

      return
    }

    const newRate: ServiceRate = {
      id: Date.now().toString(),
      name: form.name.trim(),
      type: form.type,
      destination: form.destination.trim(),
      netRate: Number(form.netRate),
      markupRate: Number(form.markupRate),
      currency: form.currency,
      seasonStart: form.seasonStart,
      seasonEnd: form.seasonEnd,
    }

    setRates((prev) => [newRate, ...prev])
    setDialogOpen(false)
    resetFormState()

        toast.success( `${newRate.name} added successfully`, {
                    position: "top-right",
                    duration: 3000,
                  });
   
  }

  const formatDateRange = (start: string, end: string) => {
    return `${start} → ${end}`
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"
      >
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Services & Rates
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your service pricing and availability
          </p>
        </div>

        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open)
            if (!open) {
              resetFormState()
            }
          }}
        >
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add Rate
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? "Edit Service Rate" : "Add New Service Rate"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleAddOrEditRate} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="service-name">Service Name</Label>
                  <Input
                    id="service-name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter service name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Service Type</Label>
                  <Select
                    value={form.type}
                    onValueChange={(value: ServiceType) =>
                      setForm((prev) => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    value={form.destination}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        destination: e.target.value,
                      }))
                    }
                    placeholder="Enter destination"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select
                    value={form.currency}
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, currency: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="INR">INR</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="net-rate">Net Rate</Label>
                  <Input
                    id="net-rate"
                    type="number"
                    value={form.netRate}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, netRate: e.target.value }))
                    }
                    placeholder="Enter net rate"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="markup-rate">Markup Rate</Label>
                  <Input
                    id="markup-rate"
                    type="number"
                    value={form.markupRate}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        markupRate: e.target.value,
                      }))
                    }
                    placeholder="Enter markup rate"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="season-start">Season Start</Label>
                  <Input
                    id="season-start"
                    type="date"
                    value={form.seasonStart}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        seasonStart: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="season-end">Season End</Label>
                  <Input
                    id="season-end"
                    type="date"
                    value={form.seasonEnd}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        seasonEnd: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDialogOpen(false)
                    resetFormState()
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditMode ? "Update Rate" : "Save Rate"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, type: "spring", stiffness: 180, damping: 22 }}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-8"
      >
        {filterCards.map((card) => {
          const Icon = card.icon
          const isActive = activeTab === card.key

          return (
            <button
              key={card.key}
              type="button"
              onClick={() => setActiveTab(card.key)}
              className={`flex min-h-[88px] items-center justify-between rounded-2xl border px-4 py-3 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${card.cardClass} ${
                isActive ? card.activeClass : ""
              }`}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-700">
                  {card.label}
                </p>
                <p className="mt-1 text-2xl font-bold leading-none text-slate-900">
                  {card.count}
                </p>
              </div>

              <div
                className={`ml-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${card.iconWrapClass}`}
              >
                <Icon className={`h-6 w-6 ${card.iconClass}`} />
              </div>
            </button>
          )
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 180, damping: 22 }}
      >
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-hidden rounded-2xl border bg-white">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead className="text-right">Net Rate</TableHead>
                    <TableHead className="text-right">Markup Rate</TableHead>
                    <TableHead>Season</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredRates.map((rate) => (
                    <TableRow key={rate.id}>
                      <TableCell className="font-medium">{rate.name}</TableCell>

                      <TableCell>
                      <Badge
  className={`text-xs font-medium px-2.5 py-0.5 rounded-full border-0 ${
    typeStyles[rate.type] || "bg-gray-100 text-gray-700"
  }`}
>
  {rate.type}
</Badge>
                      </TableCell>

                      <TableCell>{rate.destination}</TableCell>

                      <TableCell className="text-right font-medium">
                        {rate.currency} {rate.netRate}
                      </TableCell>

                      <TableCell className="text-right font-medium text-primary">
                        {rate.currency} {rate.markupRate}
                      </TableCell>

                      <TableCell className="text-xs text-muted-foreground">
                        {formatDateRange(rate.seasonStart, rate.seasonEnd)}
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-xl bg-slate-100 hover:bg-slate-200"
                            type="button"
                            onClick={() => handleEdit(rate)}
                          >
                            <Pencil className="h-4 w-4 text-slate-600" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-xl bg-red-50 hover:bg-red-100"
                            type="button"
                            onClick={() => handleDelete(rate.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}

                  {filteredRates.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="py-10 text-center text-muted-foreground"
                      >
                        No rates found for this category.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}