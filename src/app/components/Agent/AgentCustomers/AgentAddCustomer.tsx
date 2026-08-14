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
import { AlertCircle, Plus } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function AgentAddCustomer() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

    if (!isValid) {
      setError("Please fill all the required details");
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    setError(null);
    toast.success("Customer added successfully!");
    setOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value) {
      e.target.classList.remove("border-red-500");
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setError(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" /> Add Customer
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-lg max-h-[90vh] p-0 flex flex-col"
        onInteractOutside={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <div className="px-6 pt-6 pb-2 flex-shrink-0">
          <DialogTitle>Add New Customer</DialogTitle>
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
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email@example.com"
                        required
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Company name"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Street address, city, state, pincode"
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="notes">Notes</Label>
                    <textarea
                      id="notes"
                      name="notes"
                      placeholder="Any additional notes about the customer..."
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
              Add Customer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}