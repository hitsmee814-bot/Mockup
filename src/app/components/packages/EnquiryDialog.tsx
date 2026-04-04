"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { User, Mail, Phone, MessageSquare, Send, CheckCircle2, Sparkles, AlertCircle, Calendar, Users } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PremiumButton } from "@/app/utils/PremiumButton"

interface EnquiryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  packageName: string
}

interface FormData {
  name: string
  email: string
  phone: string
  travellers: string
  message: string
}

const initial: FormData = { name: "", email: "", phone: "", travellers: "", message: "" }

export function EnquiryDialog({ open, onOpenChange, packageName }: EnquiryDialogProps) {
  const [form, setForm] = useState<FormData>(initial)
  const [travelDate, setTravelDate] = useState<Date | undefined>()
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^\+?[\d\s\-()]{10,15}$/

  function update(key: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
    if (key === "email") {
      if (!value.trim()) setErrors(prev => ({ ...prev, email: "Email is required" }))
      else if (!emailRegex.test(value)) setErrors(prev => ({ ...prev, email: "Enter a valid email address" }))
      else setErrors(prev => ({ ...prev, email: undefined }))
    } else if (key === "phone") {
      if (!value.trim()) setErrors(prev => ({ ...prev, phone: "Phone number is required" }))
      else if (!phoneRegex.test(value)) setErrors(prev => ({ ...prev, phone: "Enter a valid phone number (10-15 digits)" }))
      else setErrors(prev => ({ ...prev, phone: undefined }))
    } else {
      setErrors(prev => ({ ...prev, [key]: undefined }))
    }
  }

  function validate() {
    const e: typeof errors = {}
    if (!form.name.trim()) e.name = "Name is required"
    if (!form.email.trim()) e.email = "Email is required"
    else if (!emailRegex.test(form.email)) e.email = "Enter a valid email address"
    if (!form.phone.trim()) e.phone = "Phone number is required"
    else if (!phoneRegex.test(form.phone)) e.phone = "Enter a valid phone number (10-15 digits)"
    if (!form.message.trim()) e.message = "Please enter your question"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
  }

  function handleClose() {
    onOpenChange(false)
    setTimeout(() => { setForm(initial); setTravelDate(undefined); setCalendarOpen(false); setSubmitted(false); setErrors({}) }, 300)
  }

  const inputFields: { key: keyof FormData; label: string; icon: typeof User; type?: string; placeholder: string; required?: boolean; half?: boolean }[] = [
    { key: "name", label: "Full Name", icon: User, placeholder: "John Doe", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", placeholder: "john@example.com", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel", placeholder: "+91 98765 43210", required: true },
    { key: "travellers", label: "No. of Travellers", icon: Users, type: "number", placeholder: "2", half: true },
  ]

  return (
    <>
      {open && (
        <style>{`[data-slot="dialog-overlay"] { backdrop-filter: blur(6px) !important; -webkit-backdrop-filter: blur(6px) !important; }`}</style>
      )}

      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden border-border">
          {submitted ? (
            <motion.div
              className="flex flex-col items-center justify-center py-14 px-6 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                className="size-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
              >
                <CheckCircle2 className="size-8 text-green-500" />
              </motion.div>
              <h3 className="text-lg font-bold text-foreground">Enquiry Submitted!</h3>
              <p className="text-sm text-muted-foreground mt-1.5 max-w-xs">
                Thank you, {form.name.split(" ")[0]}! Our travel expert will reach out to you within 24 hours.
              </p>
              <motion.button
                onClick={handleClose}
                className="mt-6 px-6 py-2.5 rounded-md bg-primary text-white text-sm font-semibold cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Done
              </motion.button>
            </motion.div>
          ) : (
            <>
              <div className="px-6 pt-6 pb-4 border-b border-border /30">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-base">
                    <Sparkles className="size-5 text-primary" /> Enquire Now
                  </DialogTitle>
                  <DialogDescription className="text-xs mt-1">
                    Ask about <span className="font-semibold text-foreground">{packageName}</span> — our experts will get back to you shortly.
                  </DialogDescription>
                </DialogHeader>
              </div>

              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[65vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {inputFields.map((f, i) => {
                    const Icon = f.icon
                    return (
                      <motion.div
                        key={f.key}
                        className={f.half ? "" : "sm:col-span-2"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1">
                          {f.label}
                          {f.required && <span className="text-red-400">*</span>}
                        </label>
                        <div className="relative">
                          <Icon className={`absolute left-3 top-1/2 -translate-y-1/2 size-3.5 ${errors[f.key] ? "text-red-400" : "text-muted-foreground"}`} />
                          <input
                            type={f.type || "text"}
                            value={form[f.key]}
                            onChange={e => update(f.key, e.target.value)}
                            placeholder={f.placeholder}
                            className={`w-full pl-9 ${errors[f.key] ? "pr-9" : "pr-3"} py-2.5 rounded-md border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-all ${
                              errors[f.key] ? "border-red-400 focus:ring-red-400 focus:border-red-400" : "border-border focus:ring-primary focus:border-primary"
                            }`}
                          />
                          {errors[f.key] && (
                            <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-red-400" />
                          )}
                        </div>
                        <ErrorMessage message={errors[f.key]} />
                      </motion.div>
                    )
                  })}

                  {/* Date Picker */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: inputFields.length * 0.05 }}
                  >
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      Preferred Travel Date
                    </label>
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className={`w-full flex items-center gap-2 pl-3 pr-3 py-2.5 rounded-md border text-xs text-left cursor-pointer transition-all ${
                            calendarOpen ? "border-primary ring-1 ring-primary" : "border-border"
                          } `}
                        >
                          <Calendar className="size-3.5 text-muted-foreground shrink-0" />
                          <span className={travelDate ? "text-foreground" : "text-muted-foreground"}>
                            {travelDate ? travelDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Select a date"}
                          </span>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start" sideOffset={6}>
                        <CalendarComponent
                          mode="single"
                          selected={travelDate}
                          onSelect={(date) => { setTravelDate(date); setCalendarOpen(false) }}
                          disabled={{ before: new Date() }}
                        />
                      </PopoverContent>
                    </Popover>
                  </motion.div>
                </div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (inputFields.length + 1) * 0.05 }}
                >
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    Your Question <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className={`absolute left-3 top-3 size-3.5 ${errors.message ? "text-red-400" : "text-muted-foreground"}`} />
                    <textarea
                      value={form.message}
                      onChange={e => update("message", e.target.value)}
                      placeholder="I'd like to know more about..."
                      rows={3}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-md border text-xs text-foreground placeholder:text-muted-foreground  focus:outline-none focus:ring-1 transition-all resize-none ${
                        errors.message ? "border-red-400 focus:ring-red-400 focus:border-red-400" : "border-border focus:ring-primary focus:border-primary"
                      }`}
                    />
                  </div>
                  {errors.message && (
                    <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="size-2.5 shrink-0" /> {errors.message}
                    </p>
                  )}
                </motion.div>

                <PremiumButton
                  type="submit"
                  variant="primary"
                  className="w-100"
                >
                  <Send className="size-4" /> Submit Enquiry
                </PremiumButton>

                <p className="text-[10px] text-muted-foreground text-center">
                  We respect your privacy. Your details will not be shared.
                </p>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

const ErrorMessage: React.FC<{ message?: string }> = ({ message }) => {
  if (!message) return null;
  return (
    <p className="text-red-600 text-xs font-semibold mt-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-left-1 duration-300">
      <AlertCircle size={12} className="shrink-0" />
      {message}
    </p>
  );
};