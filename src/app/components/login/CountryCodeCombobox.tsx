"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Country {
  code: string
  name: string
  dialCode: string
  flag: string
}

interface CountryCodeComboboxProps {
  countries: Country[]
  value?: Country
  onChange: (country: Country) => void
  open: boolean
  onOpenChange: (open: boolean) => void
  placeholder?: string
  className?: string
}

export function CountryCodeCombobox({
  countries,
  value,
  onChange,
  open,
  onOpenChange,
  placeholder = "Select country",
  className,
}: CountryCodeComboboxProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-[140px] h-12 justify-between font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          {value ? (
            <span className="flex items-center gap-2">
              <span>{value.flag}</span>
              <span>{value.dialCode}</span>
            </span>
          ) : (
            placeholder
          )}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[250px] p-0"
        align="start"
        side="bottom"
      >
        <Command>
          <CommandInput placeholder="Search country..." />

          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>

            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.code}
                  value={`${country.name} ${country.dialCode}`}
                  onSelect={() => {
                    onChange(country)
                    onOpenChange(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value?.code === country.code
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />

                  <div className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    <span>{country.dialCode}</span>
                    <span className="text-muted-foreground text-sm">
                      {country.name}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}