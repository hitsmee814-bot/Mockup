import React, { useState } from "react"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"

import { Label } from "@/components/ui/label"

type Props = {
  value: string[]
  onChange: (values: string[]) => void
  error?: boolean
}

const SERVICE_OPTIONS = [
  "Hotel",
  "Flight",
  "Transport",
  "Tour",
  "Visa",
  "Cruise",
]

export default function ServiceTypeSelect({
  value,
  onChange,
  error,
}: Props) {
  const [open, setOpen] = useState(false)
  const anchorRef = useComboboxAnchor()

  return (
    <div className="flex flex-col gap-1">
      <Label>
        Service Type <span className="text-red-500">*</span>
      </Label>

      <Combobox
        multiple
        items={SERVICE_OPTIONS}
        value={value}
        onValueChange={onChange}
        open={open}
        onOpenChange={setOpen}
      >
      <ComboboxChips
  ref={anchorRef}
  onClick={(e) => {
    setOpen(true)
    const input = e.currentTarget.querySelector("input")
    input?.focus()
  }}
  className={`
    min-h-12 max-h-[80px]   
    overflow-y-auto touch-pan-y       
    flex flex-wrap gap-1    

    bg-white border text-slate-900
    ${error ? "border-red-500" : "border-slate-300"}

    scrollbar-thin
    scrollbar-thumb-[#00AFEF]
    scrollbar-track-transparent
  `}
>
          <ComboboxValue>
            {(values) => (
              <>
                {values.length === 0 && (
                  <span className="text-slate-400 text-sm">
                    Select service types
                  </span>
                )}

                {values.map((v: string) => (
                  <ComboboxChip key={v}  className="
                text-sm                
                h-6 px-2
                bg-transparent
                text-slate-900        /* match input text */
              ">
                    
                    {v}</ComboboxChip>
                ))}

                <ComboboxChipsInput
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      setOpen(true)
                    }
                  }}
                  className="h-6 bg-transparent outline-none text-sm"
                />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>

        <ComboboxContent anchor={anchorRef}>
          <ComboboxEmpty>No items found.</ComboboxEmpty>

          <ComboboxList
  className="
    max-h-40 overflow-y-auto

    scrollbar-thin
    scrollbar-thumb-[#00AFEF]
    scrollbar-track-transparent

    [&::-webkit-scrollbar]:w-1.5
    [&::-webkit-scrollbar-track]:bg-transparent
    [&::-webkit-scrollbar-thumb]:bg-[#00AFEF]
    [&::-webkit-scrollbar-thumb]:rounded-full
  "
>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}