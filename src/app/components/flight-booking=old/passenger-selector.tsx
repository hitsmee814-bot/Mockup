import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Users, Minus, Plus } from "lucide-react"

interface PassengerSelectorProps {
  adults: number
  children: number
  infants: number
  onAdultsChange: (value: number) => void
  onChildrenChange: (value: number) => void
  onInfantsChange: (value: number) => void
  open: boolean
  onOpenChange: (open: boolean) => void
  className?: string
}

export function PassengerSelector({
  adults,
  children,
  infants,
  onAdultsChange,
  onChildrenChange,
  onInfantsChange,
  open,
  onOpenChange,
  className
}: PassengerSelectorProps) {
  const total = adults + children + infants

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={className}>
          <Users className="mr-2 h-4 w-4" />
          {total}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Adults</div>
              <div className="text-sm text-muted-foreground">12+ years</div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onAdultsChange(Math.max(1, adults - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{adults}</span>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onAdultsChange(adults + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Children</div>
              <div className="text-sm text-muted-foreground">2-11 years</div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onChildrenChange(Math.max(0, children - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{children}</span>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onChildrenChange(children + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Infants</div>
              <div className="text-sm text-muted-foreground">Under 2 years</div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onInfantsChange(Math.max(0, infants - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{infants}</span>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onInfantsChange(infants + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button className="w-full" onClick={() => onOpenChange(false)}>Done</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
