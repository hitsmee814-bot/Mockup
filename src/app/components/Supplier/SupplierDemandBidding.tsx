"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  MapPin,
  Calendar,
  Users,
  TrendingDown,
  Hash,
  Gavel,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type DemandStatus = "Active" | "Won" | "Outbid"

type DemandRequest = {
  id: string
  destination: string
  travelDates: string
  pax: number
  services: string[]
  lowestBid: number
  totalBidders: number
  myBid?: number
  myRank?: number
  status: DemandStatus
}

const mockDemands: DemandRequest[] = [
  {
    id: "D-001",
    destination: "Bali, Indonesia",
    travelDates: "May 15 – May 21, 2025",
    pax: 4,
    services: ["Package", "Transfer"],
    lowestBid: 820,
    totalBidders: 7,
    myBid: 850,
    myRank: 2,
    status: "Active",
  },
  {
    id: "D-002",
    destination: "Dubai, UAE",
    travelDates: "Jun 1 – Jun 5, 2025",
    pax: 2,
    services: ["Sightseeing", "Transfer", "Visa"],
    lowestBid: 340,
    totalBidders: 12,
    status: "Active",
  },
  {
  id: "D-003",
  destination: "Bangkok, Thailand",
  travelDates: "Jul 10 – Jul 16, 2025",
  pax: 6,
  services: ["Package", "Insurance"],
  lowestBid: 1050,
  totalBidders: 5,
  myBid: 1050,
  myRank: 1,
  status: "Won",
},
  {
    id: "D-004",
    destination: "Singapore",
    travelDates: "Aug 5 – Aug 9, 2025",
    pax: 3,
    services: ["Transfer", "Sightseeing"],
    lowestBid: 280,
    totalBidders: 9,
    myBid: 310,
    myRank: 4,
    status: "Outbid",
  },
]

/* 🎨 Service badge colors (same as your service page) */
const serviceStyles: Record<string, string> = {
  Package: "bg-emerald-100 text-emerald-700",
  Transfer: "bg-violet-100 text-violet-700",
  Sightseeing: "bg-orange-100 text-orange-700",
  Visa: "bg-blue-100 text-blue-700",
  Insurance: "bg-pink-100 text-pink-700",
}

/* 🎨 Status badge colors */
const statusStyles: Record<DemandStatus, string> = {
  Active: "bg-blue-100 text-blue-700",
  Won: "bg-emerald-100 text-emerald-700",
  Outbid: "bg-red-100 text-red-700",
}

export default function SupplierDemandBidding() {
  const [demands, setDemands] = useState(mockDemands)
  const [activeTab, setActiveTab] = useState("all")
  const [dialogId, setDialogId] = useState<string | null>(null)

  const filtered =
    activeTab === "all"
      ? demands
      : demands.filter((d) => d.status.toLowerCase() === activeTab)

  const handleBid = (id: string, amount: number) => {
  setDemands((prev) =>
    prev.map((d) => {
      if (d.id !== id) return d

      const isWinningBid = amount <= d.lowestBid

      return {
        ...d,
        myBid: amount,
        lowestBid: isWinningBid ? amount : d.lowestBid,
        myRank: isWinningBid ? 1 : 2,
        status: isWinningBid ? "Won" : "Outbid",
      }
    })
  )
  setDialogId(null)
}

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold">Demand & Bidding</h1>
        <p className="text-sm text-muted-foreground">
          View live demand and place competitive bids
        </p>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/60 p-1 rounded-xl">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="won">Won</TabsTrigger>
          <TabsTrigger value="outbid">Outbid</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Demand Cards */}
      <div className="grid gap-4">
        {filtered.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="p-5">
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                {/* Left */}
                <div className="space-y-3 flex-1">
                  <div className="flex gap-2 items-center">
                    <span className="text-xs text-muted-foreground">
                      {d.id}
                    </span>

                    <Badge
                      className={`text-xs px-2 py-0.5 ${statusStyles[d.status]}`}
                    >
                      {d.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{d.destination}</span>
                  </div>

                  <div className="flex gap-4 text-sm text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {d.travelDates}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {d.pax} pax
                    </span>
                    <span className="flex items-center gap-1">
                      <Hash className="h-3.5 w-3.5" />
                      {d.totalBidders} bidders
                    </span>
                  </div>

                  {/* Service badges */}
                  <div className="flex flex-wrap gap-2">
                    {d.services.map((s) => (
                      <Badge
                        key={s}
                        className={`text-xs px-2 py-0.5 ${
                          serviceStyles[s] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Right */}
                <div className="flex flex-col items-end gap-2 min-w-[180px]">
                  <div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                      <TrendingDown className="h-3 w-3" />
                      Lowest bid
                    </p>
                    <p className="text-lg font-bold">${d.lowestBid}</p>
                  </div>

                  {d.myBid && (
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        Your bid
                      </p>
                      <p className="font-semibold">
                        ${d.myBid}{" "}
                        <span className="text-xs text-muted-foreground">
                          (Rank #{d.myRank})
                        </span>
                      </p>
                    </div>
                  )}

                  {/* Dialog */}
                  <Dialog
                    open={dialogId === d.id}
                    onOpenChange={(open) =>
                      setDialogId(open ? d.id : null)
                    }
                  >
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Gavel className="h-4 w-4 mr-1" />
                        {d.myBid ? "Update Bid" : "Place Bid"}
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Bid for {d.destination}
                        </DialogTitle>
                      </DialogHeader>

                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          const fd = new FormData(e.currentTarget)
                          handleBid(d.id, Number(fd.get("amount")))
                        }}
                        className="space-y-4"
                      >
                        <div>
                          <Label>Bid Amount</Label>
                          <Input
                            name="amount"
                            type="number"
                            defaultValue={d.myBid || ""}
                            required
                          />
                          <p className="text-xs text-muted-foreground">
                            Current lowest: ${d.lowestBid}
                          </p>
                        </div>

                        <div className="flex justify-end">
                          <Button type="submit">Submit</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}