"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Briefcase, Calendar, Shield, Pencil, Check, X } from "lucide-react"

const initialData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  bio: "Passionate traveler and tech enthusiast. Love exploring hidden gems around the world.",
  address: "San Francisco, CA",
  company: "Acme Corp",
  role: "Senior Developer",
  memberSince: "January 2023",
  accountId: "USR-2023-00482",
  plan: "Premium",
}

interface FieldProps {
  label: string
  value: string
  icon: React.ReactNode
  editable?: boolean
  onSave?: (v: string) => void
  textarea?: boolean
}

function ProfileField({ label, value, icon, editable = false, onSave, textarea }: FieldProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  const save = () => { onSave?.(draft); setEditing(false) }
  const cancel = () => { setDraft(value); setEditing(false) }

  return (
    <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors">
      <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        {editing ? (
          <div className="flex items-center gap-2">
            {textarea ? (
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="flex-1 bg-muted rounded-lg px-3 py-1.5 text-sm text-foreground border border-border focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                rows={2}
              />
            ) : (
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="flex-1 bg-muted rounded-lg px-3 py-1.5 text-sm text-foreground border border-border focus:outline-none focus:ring-1 focus:ring-primary"
              />
            )}
            <button onClick={save} className="size-7 rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors cursor-pointer">
              <Check className="size-3.5" />
            </button>
            <button onClick={cancel} className="size-7 rounded-md bg-destructive/10 text-destructive hover:bg-destructive hover:text-white flex items-center justify-center transition-colors cursor-pointer">
              <X className="size-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-foreground truncate">{value}</p>
            {editable ? (
              <button onClick={() => setEditing(true)} className="size-7 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0">
                <Pencil className="size-3.5" />
              </button>
            ) : (
              <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                <Shield className="size-2.5" /> Read only
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function Profile() {
  const [data, setData] = useState(initialData)

  const update = (key: keyof typeof data) => (v: string) => setData((prev) => ({ ...prev, [key]: v }))

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-center gap-5 mb-10"
      >
        <div className="size-20 sm:size-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg shadow-primary/20">
          {data.firstName[0]}{data.lastName[0]}
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{data.firstName} {data.lastName}</h1>
          <p className="text-muted-foreground text-sm mt-1">{data.role} at {data.company}</p>
          <span className="inline-block mt-2 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            {data.plan} Member
          </span>
        </div>
      </motion.div>

      {/* Personal Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ProfileField label="First Name" value={data.firstName} icon={<Pencil className="size-4" />} editable onSave={update("firstName")} />
          <ProfileField label="Last Name" value={data.lastName} icon={<Pencil className="size-4" />} editable onSave={update("lastName")} />
          <ProfileField label="Phone" value={data.phone} icon={<Phone className="size-4" />} editable onSave={update("phone")} />
          <ProfileField label="Address" value={data.address} icon={<MapPin className="size-4" />} editable onSave={update("address")} />
          <div className="sm:col-span-2">
            <ProfileField label="Bio" value={data.bio} icon={<Pencil className="size-4" />} editable onSave={update("bio")} textarea />
          </div>
        </div>
      </motion.div>

      {/* Account Info (read-only) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-10"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Account Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ProfileField label="Email" value={data.email} icon={<Mail className="size-4" />} />
          <ProfileField label="Account ID" value={data.accountId} icon={<Shield className="size-4" />} />
          <ProfileField label="Company" value={data.company} icon={<Briefcase className="size-4" />} />
          <ProfileField label="Member Since" value={data.memberSince} icon={<Calendar className="size-4" />} />
        </div>
      </motion.div>
    </div>
  )
}
