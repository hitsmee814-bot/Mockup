"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { enquiries } from "./data"
import type { Enquiry } from "./types"
import { MessageSquare, Filter } from "lucide-react"

const statusColor: Record<string, string> = {
  New: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  "In Progress": "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  Quoted: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  "Follow Up": "bg-orange-500/15 text-orange-600 dark:text-orange-400",
  Converted: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  Closed: "bg-red-500/15 text-red-600 dark:text-red-400",
}

const priorityColor: Record<string, string> = {
  High: "bg-red-500/15 text-red-600 dark:text-red-400",
  Medium: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  Low: "bg-slate-500/15 text-slate-600 dark:text-slate-400",
}

type FilterStatus = "All" | Enquiry["status"]
const filterOptions: FilterStatus[] = ["All", "New", "In Progress", "Quoted", "Follow Up", "Converted", "Closed"]

export function EnquiryTable() {
  const [filter, setFilter] = useState<FilterStatus>("All")
  const filtered = filter === "All" ? enquiries : enquiries.filter(e => e.status === filter)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-base sm:text-lg">Customer Enquiries</CardTitle>
              <Badge variant="outline" className="text-[10px]">{filtered.length} results</Badge>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter className="h-3.5 w-3.5 text-muted-foreground" />
            {filterOptions.map(f => (
              <Button
                key={f}
                variant={filter === f ? "default" : "ghost"}
                size="sm"
                className="h-7 text-xs px-2.5"
                onClick={() => setFilter(f)}
              >
                {f}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:px-6 sm:pb-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Enquiry ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden lg:table-cell">Contact</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead className="hidden md:table-cell">Travel Date</TableHead>
                  <TableHead className="text-center hidden sm:table-cell">Pax</TableHead>
                  <TableHead className="hidden md:table-cell">Budget</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden xl:table-cell">Source</TableHead>
                  <TableHead className="hidden lg:table-cell">Created</TableHead>
                  <TableHead className="hidden xl:table-cell">Updated</TableHead>
                  <TableHead className="max-w-[200px] hidden xl:table-cell">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="popLayout">
                  {filtered.map((enq, i) => (
                    <motion.tr
                      key={enq.id}
                      layout
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.03 }}
                      className="border-b hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="font-mono text-xs font-semibold text-primary">{enq.id}</TableCell>
                      <TableCell className="font-medium text-sm">{enq.customerName}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="text-xs">
                          <p>{enq.phone}</p>
                          <p className="text-muted-foreground">{enq.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[150px] truncate text-sm">{enq.destination}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline" className="text-[10px]">{enq.travelType}</Badge>
                      </TableCell>
                      <TableCell className="text-xs hidden md:table-cell">{new Date(enq.travelDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</TableCell>
                      <TableCell className="text-center hidden sm:table-cell">{enq.pax}</TableCell>
                      <TableCell className="text-sm font-medium hidden md:table-cell">{enq.budget}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${priorityColor[enq.priority]}`}>
                          {enq.priority}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColor[enq.status]}`}>
                          {enq.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground hidden xl:table-cell">{enq.source}</TableCell>
                      <TableCell className="text-xs text-muted-foreground hidden lg:table-cell">{new Date(enq.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</TableCell>
                      <TableCell className="text-xs text-muted-foreground hidden xl:table-cell">{new Date(enq.lastUpdated).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</TableCell>
                      <TableCell className="max-w-[200px] text-xs text-muted-foreground truncate hidden xl:table-cell">{enq.notes}</TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
