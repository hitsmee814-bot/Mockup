"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Plus } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export function AgentNewBooking() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [travelDate, setTravelDate] = useState<Date | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const requiredFields = form.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      const input = field as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement;
      if (!input.value || input.value === "") {
        isValid = false;
        input.classList.add("border-red-500");
      } else {
        input.classList.remove("border-red-500");
      }
    });

    if (!travelDate) {
      isValid = false;
    }

    if (!isValid) {
      setError("Please fill all the required details");
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    setError(null);
    toast.success("Booking created successfully!");
    setOpen(false);
    setTravelDate(undefined);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (e.target.value) {
      e.target.classList.remove("border-red-500");
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setError(null);
    setTravelDate(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" /> New Booking
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-lg max-h-[90vh] p-0 flex flex-col"
        onInteractOutside={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <div className="px-6 pt-6 pb-2 flex-shrink-0">
          <DialogTitle>Create New Booking</DialogTitle>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-6 py-2"
        >
          <AnimatePresence>
            {open && (
              <>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4"
                  >
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="grid gap-4"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="customerName">
                        Customer Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="customerName"
                        name="customerName"
                        placeholder="Full name"
                        required
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">
                        Phone <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+91 XXXXX XXXXX"
                        required
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>
                        Booking Type <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        required
                        onValueChange={() => {
                          const trigger = document.querySelector(
                            '[name="bookingType"]'
                          ) as HTMLButtonElement;
                          if (trigger) {
                            trigger.classList.remove("border-red-500");
                          }
                        }}
                      >
                        <SelectTrigger className="w-full" name="bookingType">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HOTEL">Hotel</SelectItem>
                          <SelectItem value="FLIGHT">Flight</SelectItem>
                          <SelectItem value="PACKAGE">Package</SelectItem>
                          <SelectItem value="TRANSFER">Transfer</SelectItem>
                          <SelectItem value="SIGHTSEEING">
                            Sightseeing
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="destination">
                        Destination <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="destination"
                        name="destination"
                        placeholder="e.g. Bali, Goa"
                        required
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="travelDate">
                        Travel Date <span className="text-red-500">*</span>
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            {travelDate ? (
                              format(travelDate, "yyyy-MM-dd")
                            ) : (
                              <span>Select date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 max-w-[280px]" side="bottom" align="start">
                          <Calendar
                            mode="single"
                            selected={travelDate}
                            onSelect={setTravelDate}
                            initialFocus
                            className="max-w-[280px]"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="pax">
                        No. of Travellers <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="pax"
                        name="pax"
                        type="number"
                        min={1}
                        placeholder="1"
                        required
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="totalAmount">
                        Total Amount <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="totalAmount"
                        name="totalAmount"
                        type="number"
                        min={0}
                        step={0.01}
                        placeholder="0.00"
                        required
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>
                        Status <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        required
                        onValueChange={() => {
                          const trigger = document.querySelector(
                            '[name="bookingStatus"]'
                          ) as HTMLButtonElement;
                          if (trigger) {
                            trigger.classList.remove("border-red-500");
                          }
                        }}
                      >
                        <SelectTrigger className="w-full" name="bookingStatus">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="CANCELLED">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Additional details about the booking..."
                      rows={3}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px] max-h-[150px]"
                      style={{
                        resize: "vertical",
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                        overflowY: "auto",
                      }}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="px-6 pb-6 pt-2 flex-shrink-0 border-t">
          <div className="flex gap-3">
            <Button
              className="flex-1 bg-red-500 text-white hover:bg-red-600"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              onClick={(e) => {
                if (formRef.current) {
                  formRef.current.dispatchEvent(
                    new Event("submit", { cancelable: true, bubbles: true })
                  );
                }
              }}
            >
              Submit Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}