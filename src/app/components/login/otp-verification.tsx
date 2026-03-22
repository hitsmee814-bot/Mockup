import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { CheckCircle2, Circle, CircleAlert } from "lucide-react"
import { PremiumButton } from "@/app/utils/PremiumButton"
import { useEffect, useState } from "react"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
import { CountryCodeCombobox } from "./CountryCodeCombobox"

type Country = {
    code: string
    name: string
    dialCode: string
    flag: string
}

interface OTPVerificationProps {
    userType: string
    mobile: string
    verificationEmail: string
    mobileOtp: string
    emailOtp: string
    mobileOtpSent: boolean
    emailOtpSent: boolean
    mobileVerified: boolean
    emailVerified: boolean
    countries: Country[]
    selectedCountry: Country
    onCountryChange: (country: Country) => void
    verificationEmailError: string
    phoneError: string
    gradient: string
    onMobileChange: (value: string) => void
    onEmailChange: (value: string) => void
    onMobileOtpChange: (value: string) => void
    onEmailOtpChange: (value: string) => void
    onSendMobileOtp: () => void
    onSendEmailOtp: () => void
    onReSendMobileOtp: () => void
    onReSendEmailOtp: () => void
    onVerifyMobileOtp: () => void
    onVerifyEmailOtp: () => void
    onComplete: () => void
    onModeChange: () => void
}

export function OTPVerification({
    userType,
    mobile,
    verificationEmail,
    mobileOtp,
    emailOtp,
    mobileOtpSent,
    emailOtpSent,
    mobileVerified,
    emailVerified,
    selectedCountry,
    countries,
    verificationEmailError,
    phoneError,
    gradient,
    onMobileChange,
    onEmailChange,
    onMobileOtpChange,
    onEmailOtpChange,
    onCountryChange,
    onSendMobileOtp,
    onSendEmailOtp,
    onReSendMobileOtp,
    onReSendEmailOtp,
    onVerifyMobileOtp,
    onVerifyEmailOtp,
    onComplete,
    onModeChange,
}: OTPVerificationProps) {

    useEffect(() => {
        if (emailOtp.length === 6) {
            onVerifyEmailOtp()
        }
    }, [emailOtp])

    useEffect(() => {
        if (mobileOtp.length === 6) {
            onVerifyMobileOtp()
        }
    }, [mobileOtp])

    const isCustomer = userType === "customer"
    const emailRequired = !isCustomer
    const canComplete = mobileVerified && (isCustomer ? (!verificationEmail || emailVerified) : emailVerified)
    const [mobileResendTimer, setMobileResendTimer] = useState(30)
    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (mobileResendTimer === 0) return

        const timer = setInterval(() => {
            setMobileResendTimer((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [mobileResendTimer])

    return (
        <div className="space-y-5">
            <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                    {mobileVerified ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                        <Circle className="h-5 w-5 text-[#7B9FFF]" />
                    )}
                    <span className={mobileVerified ? "text-green-600 font-medium" : "text-[#04257E]"}>
                        Mobile OTP {mobileVerified ? "Verified" : "Pending"}
                    </span>
                </div>
                {(emailRequired || verificationEmail) && (
                    <div className="flex items-center gap-2 text-sm">
                        {emailVerified ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                            <Circle className="h-5 w-5 text-[#7B9FFF]" />
                        )}
                        <span className={emailVerified ? "text-green-600 font-medium" : "text-[#04257E]"}>
                            Email OTP {emailVerified ? "Verified" : "Pending"}
                        </span>
                    </div>
                )}
            </div>

            {!mobileVerified && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    {!mobileOtpSent ? (
                        <>
                            <div>
                                <Label htmlFor="mobile" className="text-[#04257E]">Mobile Number</Label>
                                <div className="flex gap-2 mt-2">
                                    <CountryCodeCombobox
                                        countries={countries}
                                        value={selectedCountry}
                                        onChange={onCountryChange}
                                        open={open}
                                        onOpenChange={setOpen}
                                        className="w-30 h-12"
                                    />
                                    <Input
                                        id="mobile"
                                        type="tel"
                                        placeholder="1234567890"
                                        value={mobile}
                                        onChange={(e) => onMobileChange(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && !phoneError && mobile) {
                                                onSendMobileOtp()
                                            }
                                        }}
                                        className="flex-1 bg-white border-[#CAD8FF] text-[#04257E] placeholder:text-[#7B9FFF] focus:border-[#3FB8FF] h-12"
                                        autoFocus
                                    />
                                </div>
                                {phoneError && <p className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-red-600">
                                    <CircleAlert className="h-3.5 w-3.5" />
                                    {phoneError}
                                </p>}
                            </div>
                            <PremiumButton
                                variant="primary"
                                size="lg"
                                className="w-full h-12 text-base font-semibold"
                                onClick={onSendMobileOtp}
                                disabled={!!phoneError || !mobile}
                            >
                                Send OTP
                            </PremiumButton>
                        </>
                    ) : (
                        <>
                            <div>
                                <Label htmlFor="mobileOtp" className="text-[#04257E] mb-3 block text-center">Enter Mobile OTP</Label>
                                <div className="flex justify-center">
                                    <InputOTP maxLength={6} value={mobileOtp} onChange={onMobileOtpChange} autoFocus >
                                        <InputOTPGroup>
                                            {[0, 1, 2, 3, 4, 5].map((i) => (
                                                <InputOTPSlot key={i} index={i} className="bg-white border-[#CAD8FF] text-[#04257E] h-14 w-14 text-xl" />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                            </div>
                            <p className="text-sm text-[#0E40C7] text-center">OTP sent to {mobile}</p>
                            <PremiumButton
                                variant="primary"
                                size="lg"
                                className="w-full h-12 text-base font-semibold"
                                onClick={onVerifyMobileOtp}
                                disabled={mobileOtp.length !== 6}
                            >
                                Verify Mobile OTP
                            </PremiumButton>
                            {mobileResendTimer > 0 ? (
                                <p className="text-sm text-center text-[#7B9FFF]">
                                    You can resend OTP in <span className="font-semibold">{mobileResendTimer}s</span>
                                </p>
                            ) : (
                                <PremiumButton
                                    variant="ghost"
                                    className="w-full text-[#0E40C7] hover:text-[#04257E]"
                                    onClick={() => {
                                        onReSendMobileOtp()
                                        setMobileResendTimer(30)
                                    }}
                                >
                                    Resend OTP
                                </PremiumButton>
                            )}
                        </>
                    )}
                </motion.div>
            )}

            {mobileVerified && !emailVerified && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    {!emailOtpSent ? (
                        <>
                            <div>
                                <Label htmlFor="email" className="text-[#04257E]">
                                    Email Address {!emailRequired && "(Optional)"}
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={verificationEmail}
                                    onChange={(e) => onEmailChange(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !verificationEmailError && verificationEmail) {
                                            onSendEmailOtp()
                                        }
                                    }}
                                    className="mt-2 bg-white border-[#CAD8FF] text-[#04257E] placeholder:text-[#7B9FFF] focus:border-[#3FB8FF] h-12"
                                    autoFocus
                                />

                                {verificationEmailError && (
                                    <p className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-red-600">
                                        <CircleAlert className="h-3.5 w-3.5" />
                                        {verificationEmailError}
                                    </p>
                                )}
                            </div>
                            <PremiumButton
                                variant="primary"
                                size="lg"
                                className="w-full h-12 text-base font-semibold"
                                onClick={onSendEmailOtp}
                                disabled={!!verificationEmailError || !verificationEmail}
                            >
                                Send Email OTP
                            </PremiumButton>
                            {isCustomer && (
                                <PremiumButton
                                    variant="secondary"
                                    className="w-full h-12 text-base font-semibold"
                                    onClick={onComplete}
                                >
                                    Skip Email Verification
                                </PremiumButton>
                            )}
                        </>
                    ) : (
                        <>
                            <div>
                                <Label htmlFor="emailOtp" className="text-[#04257E] mb-3 block text-center">Enter Email OTP</Label>
                                <div className="flex justify-center">
                                    <InputOTP maxLength={6} value={emailOtp} onChange={onEmailOtpChange} autoFocus>
                                        <InputOTPGroup>
                                            {[0, 1, 2, 3, 4, 5].map((i) => (
                                                <InputOTPSlot
                                                    key={i}
                                                    index={i}
                                                    className="bg-white border-[#CAD8FF] text-[#04257E] h-14 w-14 text-xl"
                                                />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                            </div>
                            <p className="text-sm text-[#0E40C7] text-center">OTP sent to {verificationEmail}</p>
                            <PremiumButton
                                variant="primary"
                                size="lg"
                                className="w-full h-12 text-base font-semibold"
                                onClick={onVerifyEmailOtp}
                                disabled={emailOtp.length !== 6}
                            >
                                Verify Email OTP
                            </PremiumButton>
                            {mobileResendTimer > 0 ? (
                                <p className="text-sm text-center text-[#7B9FFF]">
                                    You can resend OTP in <span className="font-semibold">{mobileResendTimer}s</span>
                                </p>
                            ) : (
                                <PremiumButton
                                    variant="ghost"
                                    className="w-full text-[#0E40C7] hover:text-[#04257E]"
                                    onClick={() => {
                                        onReSendEmailOtp()
                                        setMobileResendTimer(30)
                                    }}
                                >
                                    Resend OTP
                                </PremiumButton>
                            )}
                        </>
                    )}
                </motion.div>
            )}


            {/* {isCustomer && mobileVerified && !verificationEmail && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <PremiumButton
                        variant="primary"
                        size="lg"
                        className="w-full h-12 text-base font-semibold"
                        onClick={onComplete}
                    >
                        Complete Verification
                    </PremiumButton>
                </motion.div>
            )} */}

            {!mobileVerified && !mobileOtpSent && (
                <>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#CAD8FF]" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-[#7B9FFF]">Or</span>
                        </div>
                    </div>
                    <p className="text-center text-sm text-[#0E40C7]">
                        Already have an account?{" "}
                        <PremiumButton
                            variant="ghost"
                            className="p-2 h-auto text-[#0E40C7] hover:text-[#04257E]"
                            onClick={onModeChange}
                        >
                            Sign in
                        </PremiumButton>
                    </p>
                </>
            )}
        </div>
    )
}
