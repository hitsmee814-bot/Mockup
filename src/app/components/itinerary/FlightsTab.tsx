"use client"

import * as React from "react"
import { addDays } from "date-fns"
import {
  ArrowRight,
  ArrowLeftRight,
  Route,
  Plus,
  Trash,
  ChevronsUpDown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { DatePickerSingle, DatePickerRange } from "../../ext/date-pickers"
import { DateRange } from "react-day-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"


type TripType = "One-way" | "Return" | "Multicity"

type FlightRow = {
  date?: Date
}

type MultiCityLeg = {
  from?: string
  to?: string
  date?: Date
}

type AirportBoxProps = {
  placeholder: string
  value?: string
  onChange: (v: string) => void
}

const AIRPORTS = [
  "CCU – Kolkata",
  "DEL – Delhi",
  "BOM – Mumbai",
  "BLR – Bengaluru",
  "DXB – Dubai",
  "SIN – Singapore",
]

const TRIP_TYPES = [
  { label: "One-way", icon: <ArrowRight className="h-4 w-4" /> },
  { label: "Return", icon: <ArrowLeftRight className="h-4 w-4" /> },
  { label: "Multicity", icon: <Route className="h-4 w-4" /> },
] as const


export default function FlightsTab() {
  const [tripType, setTripType] = React.useState<TripType>("One-way")

  const [date, setDate] = React.useState<Date>()
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  })
  const [rows, setRows] = React.useState<MultiCityLeg[]>([
    { from: "", to: "", date: new Date() },
  ])


  const [nearby, setNearby] = React.useState(false)
  const [direct, setDirect] = React.useState(false)

  const [adults, setAdults] = React.useState(1)
  const [children, setChildren] = React.useState<number[]>([])
  const [infants, setInfants] = React.useState(0)

  const [from, setFrom] = React.useState<string>("")
  const [to, setTo] = React.useState<string>("")

  return (
    <div className="space-y-4 rounded-xl p-4">

      <div className="flex gap-3">
        {TRIP_TYPES.map((t) => (
          <Button
            key={t.label}
            variant={tripType === t.label ? "default" : "outline"}
            onClick={() => setTripType(t.label)}
            className="flex gap-2"
          >
            {t.icon}
            {t.label}
          </Button>
        ))}
      </div>
      {tripType !== "Multicity" && (
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div className="flex-1">
            <AirportBox
              placeholder="From"
              value={from}
              onChange={setFrom}
            />
          </div>

          <div className="flex-1">
            <AirportBox
              placeholder="To"
              value={to}
              onChange={setTo}
            />
          </div>

          <div className="flex-1">
            {tripType === "Return" ? (
              <DatePickerRange value={range} onChange={setRange} />
            ) : (
              <DatePickerSingle date={date} onChange={setDate} />
            )}
          </div>

          <div className="flex-1">
            <TravellersPopover
              adults={adults}
              setAdults={setAdults}
              children={children}
              setChildren={setChildren}
              infants={infants}
              setInfants={setInfants}
            />
          </div>
        </div>
      )}

      {tripType === "Multicity" && (
        <div className="space-y-3">
          {rows.map((row, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row gap-3 items-center"
            >
              <div className="flex-1">
                <AirportBox
                  placeholder="From"
                  value={row.from}
                  onChange={(v) => {
                    const copy = [...rows]
                    copy[i] = { ...copy[i], from: v }
                    setRows(copy)
                  }}
                />
              </div>

              <div className="flex-1">
                <AirportBox
                  placeholder="To"
                  value={row.to}
                  onChange={(v) => {
                    const copy = [...rows]
                    copy[i] = { ...copy[i], to: v }
                    setRows(copy)
                  }}
                />
              </div>

              <div className="flex-1">
                <DatePickerSingle
                  date={row.date}
                  onChange={(d) => {
                    const copy = [...rows]
                    copy[i] = { ...copy[i], date: d }
                    setRows(copy)
                  }}
                />
              </div>

              {rows.length > 1 && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="shrink-0"
                  onClick={() =>
                    setRows(rows.filter((_, idx) => idx !== i))
                  }
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>

          ))}

          <Button
            variant="outline"
            onClick={() =>
              setRows([...rows, { from: "", to: "", date: new Date() }])
            }
            className="w-fit"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add City
          </Button>
        </div>
      )}


      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={nearby} onCheckedChange={() => setNearby(!nearby)} />
          Nearby airports
        </label>

        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={direct} onCheckedChange={() => setDirect(!direct)} />
          Direct flights only
        </label>
      </div>

      <Button className="w-full">Search Flights</Button>
    </div>
  )
}


function AirportBox({ placeholder, value, onChange }: AirportBoxProps) {
  return (
    <Combobox
      items={AIRPORTS}
      value={value ?? ""}
      onValueChange={(val: any) => onChange(val)}
    >
      <ComboboxInput placeholder={placeholder} />
      <ComboboxContent>
        <ComboboxEmpty>No airport found</ComboboxEmpty>
        <ComboboxList>
          {(a) => (
            <ComboboxItem key={a} value={a}>
              {a}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}


function TravellersPopover({
  adults,
  setAdults,
  children,
  setChildren,
  infants,
  setInfants,
}: any) {
  const summary = `${adults} Adult${adults > 1 ? "s" : ""}${children.length ? `, ${children.length} Child` : ""
    }${infants ? `, ${infants} Infant` : ""}`

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between font-normal"
        >
          <span>{summary}</span>
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] p-4 space-y-4"
      >
        <Counter
          label="Adults"
          hint="18+ years"
          value={adults}
          min={1}
          setValue={(v: number) => {
            setAdults(v)
            if (infants > v) setInfants(v)
          }}
        />

        <Counter
          label="Children"
          hint="Ages 3–17"
          value={children.length}
          setValue={(v: number) =>
            setChildren(
              v > children.length
                ? [...children, 5]
                : children.slice(0, v)
            )
          }
        />

        {children.length > 0 && (
          <div className="space-y-3 pt-2">
            <p className="text-sm font-medium">Child ages</p>

            {children.map((age: number, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between gap-3"
              >
                <span className="text-sm text-muted-foreground">
                  Child {index + 1}
                </span>

                <Input
                  type="number"
                  min={3}
                  max={17}
                  value={age}
                  onChange={(e) => {
                    let v = Number(e.target.value)

                    if (Number.isNaN(v)) return

                    v = Math.max(3, Math.min(17, v))

                    const updated = [...children]
                    updated[index] = v
                    setChildren(updated)
                  }}
                  className="w-[80px]"
                />

              </div>
            ))}
          </div>
        )}

        <Counter
          label="Infants"
          hint="Under 2 years"
          value={infants}
          max={adults}
          setValue={setInfants}
        />
      </PopoverContent>
    </Popover>
  )
}

function Counter({
  label,
  hint,
  value,
  setValue,
  min = 0,
  max = 9,
}: any) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm font-medium">{label}</span>
          {hint && (
            <p className="text-xs text-muted-foreground">
              {hint}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            disabled={value <= min}
            onClick={() => setValue(value - 1)}
          >
            -
          </Button>

          <Badge>{value}</Badge>

          <Button
            size="icon"
            variant="outline"
            disabled={value >= max}
            onClick={() => setValue(value + 1)}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  )
}
