"use client"

import { useEffect, useRef, useState } from "react"
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
    SelectLabel,
    SelectGroup,
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
    AlertCircle,
} from "lucide-react"
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js"
import { otpService } from "@/services/otpService"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"

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

    const [phoneError, setPhoneError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [phoneTouched, setPhoneTouched] = useState(false)
    const [emailTouched, setEmailTouched] = useState(false)

    const [country, setCountry] = useState(countries[0])
    const [otp, setOtp] = useState("")

    const [loading, setLoading] = useState(false)

    const otpRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const RESEND_SECONDS = 30

    const [timer, setTimer] = useState(RESEND_SECONDS)
    const [canResend, setCanResend] = useState(false)

    useEffect(() => {
        if (step === 3) {
            setTimeout(() => {
                if (method === "phone") phoneRef.current?.focus()
                if (method === "email") emailRef.current?.focus()
            }, 50)
        }

        if (step === 4) {
            setTimeout(() => {
                otpRef.current?.focus()
            }, 50)
        }
    }, [step, method])

    useEffect(() => {
        if (step === 4) {
            setTimer(RESEND_SECONDS)
            setCanResend(false)

            setTimeout(() => {
                otpRef.current?.focus()
            }, 50)
        }
    }, [step])

    useEffect(() => {
        if (step !== 4) return

        if (timer === 0) {
            setCanResend(true)
            return
        }

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [timer, step])


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

    const handleVerifyOtp = async () => {
        if (otp.length !== 6) return

        setLoading(true)

        try {
            let response

            if (method === "phone") {
                response = await otpService.verifyMobileOtp(phone, otp)
            } else {
                response = await otpService.verifyEmailOtp(email, otp)
            }

            toast.success(response?.status || "Verification successful", {position: 'top-right'})

            if (roleRoute) router.push(roleRoute)

        } catch (error: any) {
            console.error(error)
            toast.error(error?.detail || "Invalid OTP", {position: 'top-right'})
        } finally {
            setLoading(false)
        }
    }

    const handleSendOtp = async () => {
        setLoading(true)

        try {
            let response

            if (method === "phone") {
                response = await otpService.sendMobileOtp(phone)
            } else {
                response = await otpService.sendEmailOtp(email)
            }

            toast.success(response?.message || "OTP sent successfully", {position: 'top-right'})
            setStep(4)

        } catch (error: any) {
            console.error(error)
            toast.error(error?.message || "Failed to send OTP", {position: 'top-right'})
        } finally {
            setLoading(false)
        }
    }

    const handleResendOtp = async () => {
        if (!canResend) return

        setLoading(true)

        try {
            let response

            if (method === "phone") {
                response = await otpService.sendMobileOtp(phone)
            } else {
                response = await otpService.sendEmailOtp(email)
            }

            toast.success(response?.message || "OTP resent", {position: 'top-right'})

            setTimer(RESEND_SECONDS)
            setCanResend(false)

        } catch (error: any) {
            toast.error(error?.message || "Failed to resend OTP", {position: 'top-right'})
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(v) => {
                onOpenChange(v)
                if (!v) reset()
            }}
        >
            <DialogContent className="sm:max-w-lg rounded-2xl p-6 pt-3" onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
                {loading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-2xl">
                        <Spinner className="size-5" />
                    </div>
                )}
                <DialogHeader className="relative">

                    {step > 1 && (
                        <button
                            onClick={goBack}
                            className="absolute left-0 top-0 p-2 pl-0 text-muted-foreground hover:text-foreground"
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
                    <form
                        className="space-y-5 mt-6"
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSendOtp()
                        }}
                    >

                        {method === "phone" && (
                            <>
                                <Label>Mobile Number</Label>

                                <div className="flex items-center gap-2">
                                    <Select
                                        value={country.code}
                                        onValueChange={(val) =>
                                            setCountry(countries.find((c) => c.code === val)!)
                                        }
                                    >
                                        <SelectTrigger className="w-[120px]">
                                            <SelectValue placeholder="Country" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Country</SelectLabel>

                                                {countries.map((c) => (
                                                    <SelectItem key={c.code} value={c.code}>
                                                        {c.label} {c.dial}
                                                    </SelectItem>
                                                ))}

                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    <Input
                                        type="tel"
                                        ref={phoneRef}
                                        inputMode="numeric"
                                        placeholder="9876543210"
                                        value={phone}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            setPhone(value)
                                            setPhoneTouched(true)

                                            const number = parsePhoneNumberFromString(
                                                `${country.dial}${value}`,
                                                country.code as CountryCode
                                            )

                                            if (!value) {
                                                setPhoneError("Mobile number is required")
                                            } else if (!number?.isValid()) {
                                                setPhoneError("Enter a valid mobile number")
                                            } else {
                                                setPhoneError("")
                                            }
                                        }}
                                        className={`flex-1  ${phoneTouched && phoneError ? "border-red-500 focus:ring-red-500" : ""
                                            }`}
                                    />
                                </div>
                                {phoneTouched && phoneError && (
                                    <p className="flex items-center gap-1 text-red-500 text-sm">
                                        <AlertCircle size={14} />
                                        {phoneError}
                                    </p>
                                )}

                                <button
                                    type="button"
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
                                    ref={emailRef}
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        setEmail(value)
                                        setEmailTouched(true)

                                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

                                        if (!value) {
                                            setEmailError("Email is required")
                                        } else if (!emailRegex.test(value)) {
                                            setEmailError("Enter a valid email address")
                                        } else {
                                            setEmailError("")
                                        }
                                    }}
                                    className={`w-full text-sm outline-none transition-all focus:ring-1 mt-1 ${emailTouched && emailError
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-[#00AFEF] focus:ring-[#00AFEF]"
                                        }`}
                                />

                                {emailTouched && emailError && (
                                    <p className="flex items-center gap-1 text-red-500 text-sm mt-0">
                                        <AlertCircle size={14} />
                                        {emailError}
                                    </p>
                                )}

                                <button
                                    type="button"
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
                            type="submit"
                            className="w-full"
                            disabled={
                                method === "phone"
                                    ? !!phoneError || !phone
                                    : !!emailError || !email
                            }
                        >
                            Send OTP
                        </PremiumButton>

                    </form>
                )}

                {step === 4 && (
                    <div className="flex flex-col items-center gap-6 mt-6" onKeyDown={(e) => {
                        if (e.key === "Enter" && otp.length === 6) {
                            handleVerifyOtp()
                        }
                    }}>
                        <InputOTP
                            disabled={loading}
                            ref={otpRef}
                            maxLength={6}
                            value={otp}
                            onChange={(value) => setOtp(value)}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} ref={otpRef} />
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
                        <p className="text-sm text-muted-foreground text-center">
                            {canResend ? (
                                <button
                                    onClick={handleResendOtp}
                                    className="text-primary font-medium hover:underline"
                                >
                                    Resend OTP
                                </button>
                            ) : (
                                <>Resend OTP in {timer}s</>
                            )}
                        </p>
                        <PremiumButton
                            className="w-full"
                            disabled={otp.length !== 6 || loading}
                            onClick={handleVerifyOtp}
                        >
                            Verify & Continue
                        </PremiumButton>

                    </div>
                )}

            </DialogContent>
        </Dialog>
    )
}