import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { PremiumButton } from "@/app/utils/PremiumButton"
import { CircleAlert } from "lucide-react"
import { useEffect } from "react"

const countries = [
    { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
    { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
    { code: "US", name: "America", dialCode: "+1", flag: "🇺🇸" },
]

interface OTPVerificationProps {
    verificationMethod: "email" | "mobile" | null
    verificationValue: string
    otp: string
    otpSent: boolean
    selectedCountry: typeof countries[0]
    verificationEmailError: string
    phoneError: string
    gradient: string
    onMethodSelect: (method: "email" | "mobile") => void
    onValueChange: (value: string) => void
    onOtpChange: (value: string) => void
    onCountryChange: (country: typeof countries[0]) => void
    onSendOtp: () => void
    onVerifyOtp: () => void
    onBack: () => void
    onModeChange: () => void
    validateEmail: (value: string) => string
    validatePhone: (value: string, code: string) => string
}

export function OTPVerification({
    verificationMethod,
    verificationValue,
    otp,
    otpSent,
    selectedCountry,
    verificationEmailError,
    phoneError,
    gradient,
    onMethodSelect,
    onValueChange,
    onOtpChange,
    onCountryChange,
    onSendOtp,
    onVerifyOtp,
    onBack,
    onModeChange,
    validateEmail,
    validatePhone,
}: OTPVerificationProps) {

    useEffect(() => {
        onValueChange("")
        onOtpChange("")
    }, [verificationMethod])

    const switchMethod = () => {
        const next = verificationMethod === "email" ? "mobile" : "email"
        onMethodSelect(next)
    }
    return (
        <div className="space-y-5">
            {!verificationMethod ? (
                <>
                    <p className="text-black-300 text-center mb-6">Choose verification method</p>
                    <div className="grid grid-cols-2 gap-4">
                        <PremiumButton
                            variant="primary"

                            onClick={() => onMethodSelect("email")}
                        >
                            <span className="text-xl">📧</span>
                            <span>Email OTP</span>
                        </PremiumButton>

                        <PremiumButton
                            variant="secondary"

                            onClick={() => onMethodSelect("mobile")}
                        >
                            <span className="text-xl">📱</span>
                            <span>Mobile OTP</span>
                        </PremiumButton>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200" />
                        </div>

                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-slate-400">Or</span>
                        </div>
                    </div>
                    <p className="text-center text-sm text-slate-600">
                        Already have an account?{" "}
                        <PremiumButton
                            variant="ghost"
                            className="p-2 h-auto text-[#3FB8FF] hover:text-[#2da4e6]"
                            onClick={onModeChange}
                        >
                            Sign in
                        </PremiumButton>
                    </p>
                </>
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    {!otpSent ? (
                        <>
                            <div>
                                <Label htmlFor="verification" className="text-slate-300">
                                    {verificationMethod === "email" ? "Email Address" : "Mobile Number"}
                                </Label>
                                <div className="flex gap-2 mt-2">
                                    {verificationMethod === "mobile" && (
                                        <Select
                                            value={selectedCountry.code}
                                            onValueChange={(code) => {
                                                const country = countries.find(c => c.code === code)!
                                                onCountryChange(country)
                                            }}
                                        >
                                            <SelectTrigger
                                                className="w-24 !h-12 bg-white border-slate-300 text-slate-900 
        focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]"
                                            >
                                                <SelectValue />
                                            </SelectTrigger>

                                            <SelectContent className="bg-white border-slate-200">
                                                {countries.map((country) => (
                                                    <SelectItem key={country.code} value={country.code}>
                                                        {country.flag} {country.dialCode}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}

                                    <Input
                                        id="verification"
                                        type={verificationMethod === "email" ? "email" : "tel"}
                                        placeholder={
                                            verificationMethod === "email"
                                                ? "you@example.com"
                                                : "1234567890"
                                        }
                                        value={verificationValue}
                                        onChange={(e) => onValueChange(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === "Enter" &&
                                                !(
                                                    (verificationMethod === "email" &&
                                                        (!!verificationEmailError || !verificationValue)) ||
                                                    (verificationMethod === "mobile" &&
                                                        (!!phoneError || !verificationValue))
                                                )
                                            ) {
                                                onSendOtp()
                                            }
                                        }}
                                        autoFocus
                                        className="flex-1 h-12 bg-white border-slate-300 text-slate-900
    placeholder:text-slate-400
    focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]"
                                    />

                                </div>
                                <div className="text-xs text-slate-500 mt-2 text-right">
                                    {verificationMethod === "email" ? (
                                        <>
                                            Prefer using mobile?{" "}
                                            <button
                                                type="button"
                                                onClick={switchMethod}
                                                className="text-[#3FB8FF] font-medium hover:underline"
                                            >
                                                Use mobile OTP
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            Prefer using email?{" "}
                                            <button
                                                type="button"
                                                onClick={switchMethod}
                                                className="text-[#3FB8FF] font-medium hover:underline"
                                            >
                                                Use email OTP
                                            </button>
                                        </>
                                    )}
                                </div>
                                {verificationMethod === "email" && verificationEmailError && (
                                    <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-red-600">
                                        <CircleAlert className="h-3.5 w-3.5" />
                                        {verificationEmailError}
                                    </p>
                                )}

                                {verificationMethod === "mobile" && phoneError && (
                                    <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-red-600">
                                        <CircleAlert className="h-3.5 w-3.5" />
                                        {phoneError}
                                    </p>
                                )}
                            </div>
                            <PremiumButton

                                size="lg"
                                className="w-full h-12 text-base font-semibold"
                                onClick={onSendOtp}
                                disabled={
                                    (verificationMethod === "email" && (!!verificationEmailError || !verificationValue)) ||
                                    (verificationMethod === "mobile" && (!!phoneError || !verificationValue))
                                }
                            >
                                Send OTP
                            </PremiumButton>
                            <PremiumButton
                                variant="secondary"
                                className="w-full"
                                onClick={onBack}
                            >
                                Back
                            </PremiumButton>
                        </>
                    ) : (
                        <>
                            <div>
                                <Label htmlFor="otp" className="text-slate-600 mb-3 block text-center">Enter OTP</Label>
                                <div className="flex justify-center">
                                    <InputOTP
                                        maxLength={6}
                                        value={otp}
                                        autoFocus
                                        onChange={(value) => {
                                            onOtpChange(value)

                                            if (value.length === 6) {
                                                onVerifyOtp()
                                            }
                                        }}
                                    >
                                        <InputOTPGroup>
                                            <InputOTPSlot
                                                index={0}
                                                className="bg-white border-slate-300 text-slate-900 h-14 w-14 text-xl
      focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]"
                                            />
                                            <InputOTPSlot
                                                index={1}
                                                className="bg-white border-slate-300 text-slate-900 h-14 w-14 text-xl
      focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]"
                                            />
                                            <InputOTPSlot
                                                index={2}
                                                className="bg-white border-slate-300 text-slate-900 h-14 w-14 text-xl
      focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]"
                                            />
                                            <InputOTPSlot
                                                index={3}
                                                className="bg-white border-slate-300 text-slate-900 h-14 w-14 text-xl
      focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]"
                                            />
                                            <InputOTPSlot
                                                index={4}
                                                className="bg-white border-slate-300 text-slate-900 h-14 w-14 text-xl
      focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]"
                                            />
                                            <InputOTPSlot
                                                index={5}
                                                className="bg-white border-slate-300 text-slate-900 h-14 w-14 text-xl
      focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]"
                                            />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                            </div>
                            <p className="text-sm text-slate-800 text-center">
                                OTP sent to {verificationValue}
                            </p>
                            <PremiumButton
                                size="lg"
                                className="w-full h-12 text-base font-semibold"
                                onClick={onVerifyOtp}
                            >
                                Verify OTP
                            </PremiumButton>
                            <PremiumButton
                                variant="secondary"
                                className="w-full"
                                onClick={onSendOtp}
                            >
                                Resend OTP
                            </PremiumButton>
                        </>
                    )}
                </motion.div>
            )}
        </div>
    )
}

export { countries }
