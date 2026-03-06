"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { PremiumButton } from "../utils/PremiumButton"
import {
    User,
    Briefcase,
    Building2,
    Truck,
    ArrowLeft,
} from "lucide-react"
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js"

const roles = [
    {
        label: "Customer",
        icon: User,
        route: "/signup/customer",
        description: "Book and manage trips",
    },
    {
        label: "Agent",
        icon: Briefcase,
        route: "/signup/agent",
        description: "Create and sell itineraries",
    },
    {
        label: "Supplier",
        icon: Truck,
        route: "/signup/supplier",
        description: "Hotels, transport & services",
    },
    {
        label: "Corporate",
        icon: Building2,
        route: "/signup/corporate",
        description: "Business travel solutions",
    },
]

const countries = [
    { label: "India", code: "IN", dial: "+91" },
    { label: "United States", code: "US", dial: "+1" },
    { label: "France", code: "FR", dial: "+33" },
]

type Step = 1 | 2 | 3 | 4
type Method = "phone" | "email"

export default function AuthRoleDialog({
    open,
    onOpenChange,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    const router = useRouter()

    const [step, setStep] = useState<Step>(1)
    const [roleRoute, setRoleRoute] = useState<string | null>(null)

    const [method, setMethod] = useState<Method>("phone")

    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const [country, setCountry] = useState(countries[0])
    const [otp, setOtp] = useState("")

    const validatePhone = () => {
        const number = parsePhoneNumberFromString(
            `${country.dial}${phone}`,
            country.code as CountryCode
        )
        return number?.isValid()
    }

    const goBack = () => {
        if (step === 1) return
        setStep((prev) => (prev - 1) as Step)
    }

    const reset = () => {
        setStep(1)
        setPhone("")
        setEmail("")
        setOtp("")
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(v) => {
                onOpenChange(v)
                if (!v) reset()
            }}
        >
            <DialogContent className="sm:max-w-lg rounded-2xl p-6">
                <DialogHeader className="relative">

                    {step > 1 && (
                        <button
                            onClick={goBack}
                            className="absolute left-0 top-0 p-2 text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft size={18} />
                        </button>
                    )}

                    <DialogTitle className="text-center text-xl font-semibold">
                        {step === 1 && "Choose your role"}
                        {step === 2 && "Choose verification"}
                        {step === 3 && "Enter your details"}
                        {step === 4 && "Verify OTP"}
                    </DialogTitle>

                </DialogHeader>

                {step === 1 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                        {roles.map(({ label, icon: Icon, description, route }) => (
                            <button
                                key={label}
                                onClick={() => {
                                    setRoleRoute(route)
                                    setStep(2)
                                }}
                                className="
                  group flex items-center gap-4 rounded-xl border p-4 text-left
                  hover:-translate-y-1 hover:shadow-lg transition
                "
                            >

                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted group-hover:bg-[#3FB8FF]">
                                    <Icon className="h-6 w-6 text-muted-foreground group-hover:text-white" />
                                </div>

                                <div>
                                    <p className="font-medium">{label}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {description}
                                    </p>
                                </div>

                            </button>
                        ))}

                    </div>
                )}

                {step === 2 && (
                    <div className="flex flex-col gap-4 mt-6">

                        <PremiumButton
                            className="w-full"
                            onClick={() => {
                                setMethod("phone")
                                setStep(3)
                            }}
                        >
                            Continue with Mobile OTP
                        </PremiumButton>

                        <PremiumButton
                            variant="secondary"
                            className="w-full"
                            onClick={() => {
                                setMethod("email")
                                setStep(3)
                            }}
                        >
                            Continue with Email
                        </PremiumButton>

                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-5 mt-6">

                        {method === "phone" && (
                            <>
                                <Label>Mobile Number</Label>

                                <div className="flex items-center gap-2">

                                    <Select
                                        value={country.code}
                                        onValueChange={(val) =>
                                            setCountry(
                                                countries.find((c) => c.code === val)!
                                            )
                                        }
                                    >
                                        <SelectTrigger className="w-[120px]">
                                            <SelectValue />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {countries.map((c) => (
                                                <SelectItem key={c.code} value={c.code}>
                                                    {c.label} {c.dial}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Input
                                        type="tel"
                                        inputMode="numeric"
                                        className="flex-1"
                                        placeholder="9876543210"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />

                                </div>

                                <button
                                    className="text-sm text-muted-foreground underline"
                                    onClick={() => {
                                        setMethod("email")
                                        setPhone("")
                                    }}
                                >
                                    Use email instead
                                </button>
                            </>
                        )}

                        {method === "email" && (
                            <>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button
                                    className="text-sm text-muted-foreground underline"
                                    onClick={() => {
                                        setMethod("phone")
                                        setEmail("")
                                    }}
                                >
                                    Use phone instead
                                </button>
                            </>
                        )}

                        <PremiumButton
                            className="w-full"
                            disabled={
                                method === "phone"
                                    ? !validatePhone()
                                    : !email
                            }
                            onClick={() => setStep(4)}
                        >
                            Send OTP
                        </PremiumButton>

                    </div>
                )}

                {step === 4 && (
                    <div className="flex flex-col items-center gap-6 mt-6">
                        <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        <PremiumButton
                            className="w-full"
                            disabled={otp.length !== 6}
                            onClick={() => {
                                if (roleRoute) router.push(roleRoute)
                            }}
                        >
                            Verify & Continue
                        </PremiumButton>

                    </div>
                )}

            </DialogContent>
        </Dialog>
    )
}