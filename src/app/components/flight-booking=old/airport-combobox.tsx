import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { airports } from "./constants"

interface AirportComboboxProps {
  value: string
  onChange: (value: string) => void
  open: boolean
  onOpenChange: (open: boolean) => void
  placeholder?: string
  className?: string
}

export function AirportCombobox({ value, onChange, open, onOpenChange, placeholder = "Select airport", className }: AirportComboboxProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-full justify-between text-left font-normal", className)}>
          {value ? airports.find((a) => a.value === value)?.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search airport..." />
          <CommandList>
            <CommandEmpty>No airport found.</CommandEmpty>
            <CommandGroup>
              {airports.map((a) => (
                <CommandItem
                  key={a.value}
                  value={a.value}
                  onSelect={(val) => {
                    onChange(val)
                    onOpenChange(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === a.value ? "opacity-100" : "opacity-0")} />
                  {a.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
