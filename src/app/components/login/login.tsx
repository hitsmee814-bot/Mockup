"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { isValidPhoneNumber } from "libphonenumber-js"
import { userTypes } from "./constants"
import { UserTypeCard } from "./user-type-card"
import { OTPVerification, countries } from "./otp-verification"
import { LoginForm } from "./login-form"
import { PremiumButton } from "@/app/utils/PremiumButton"
import { otpService } from "@/services/otpService"
import { toast } from "sonner"
import logoPrimary from "../../assets/images/final logo Bonhomiee white without.png"
import Image from "next/image"
import { Spinner } from "@/components/ui/spinner"
import { LogIn } from "lucide-react"
import { HiOutlineBriefcase } from "react-icons/hi"

export function Login() {
    const router = useRouter()
    const [selectedType, setSelectedType] = useState<string | null>(null)
    const [isSignup, setIsSignup] = useState(false)
    const [verificationMethod, setVerificationMethod] = useState<"email" | "mobile" | null>(null)
    const [verificationValue, setVerificationValue] = useState("")
    const [otp, setOtp] = useState("")
    const [otpSent, setOtpSent] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [verificationEmailError, setVerificationEmailError] = useState("")
    const [phoneError, setPhoneError] = useState("")
    const [selectedCountry, setSelectedCountry] = useState(countries[0])
    const [loading, setLoading] = useState(false)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const validateEmail = (value: string) => {
        if (value && !emailRegex.test(value)) {
            return "Please enter a valid email address"
        }
        return ""
    }

    const validatePhone = (value: string, countryCode: string) => {
        if (!value) return ""
        try {
            const fullNumber = `${selectedCountry.dialCode}${value}`
            if (!isValidPhoneNumber(fullNumber, countryCode as "IN" | "FR" | "US")) {
                return "Please enter a valid phone number"
            }
            return ""
        } catch {
            return "Please enter a valid phone number"
        }
    }

    const handleSendOtp = async () => {
        try {
            if (!verificationMethod) return

            setLoading(true)

            let response

            if (verificationMethod === "mobile") {
                const fullMobile = `${selectedCountry.dialCode}${verificationValue}`
                response = await otpService.sendMobileOtp(fullMobile)
            }

            if (verificationMethod === "email") {
                response = await otpService.sendEmailOtp(verificationValue)
            }

            if (response?.message) {
                setOtpSent(true)
                toast.success(response?.message || "OTP sent successfully", { position: "top-right" })
            }
        } catch (error: any) {
            toast.error(error?.message || "Failed to send OTP", { position: "top-right" })
        } finally {
            setLoading(false)
        }
    }
    const handleVerifyOtp = async () => {
        try {
            if (!verificationMethod) return

            setLoading(true)

            let response

            if (verificationMethod === "mobile") {
                const fullMobile = `${selectedCountry.dialCode}${verificationValue}`
                response = await otpService.verifyMobileOtp(fullMobile, otp)
            }

            if (verificationMethod === "email") {
                response = await otpService.verifyEmailOtp(verificationValue, otp)
            }

            if (response?.status) {
                toast.success(response.message || "OTP verified successfully", {
                    position: "top-right",
                })

                if (selectedType) {
                    router.push(`/signup/${selectedType}`)
                }
            }
        } catch (error: any) {
            toast.error(error?.message || "Invalid OTP", { position: "top-right" })
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = () => {
        console.log("Login", { type: selectedType, email, password })
    }

    const handleModeChange = () => {
        setIsSignup(!isSignup)
        setVerificationMethod(null)
        setVerificationValue("")
        setOtp("")
        setOtpSent(false)
    }

    const selectedUserType = userTypes.find(t => t.id === selectedType)

    return (
        <div className="min-h-screen pt-24 flex items-center justify-center p-4 relative overflow-y-auto">
            <header className="fixed top-0 left-0 right-0 h-20 bg-[#3FB8FF] backdrop-blur-md border-b border-slate-200 z-50">
                <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4">

                    <div
                        className="relative w-[160px] h-10 cursor-pointer"
                        onClick={() => router.push('/')}
                    >
                        <Image
                            src={logoPrimary}
                            alt="Logo"
                            fill
                            style={{ objectFit: "contain" }}
                        />
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <PremiumButton className="mb-0 flex items-center w-fit">
                            Login
                            <LogIn size={18} />
                        </PremiumButton>

                        <PremiumButton
                            variant="secondary"
                            className="mb-0 flex items-center w-fit"
                        >
                            Book Demo
                            <HiOutlineBriefcase size={18} />
                        </PremiumButton>
                    </div>

                </div>
            </header>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-7xl relative z-10"
            >

                <div className="text-center mb-12">

                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-6xl font-bold mb-4 
                bg-gradient-to-r from-white via-[#7B9FFF] to-[#CAD8FF] 
                bg-clip-text"
                    >
                        Welcome Back
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg text-slate-600"
                    >
                        {selectedType
                            ? `Continue as ${selectedUserType?.label}`
                            : "Select your account type to continue"}
                    </motion.p>
                </div>

                <AnimatePresence mode="wait">
                    {!selectedType ? (

                        <motion.div
                            key="selection"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {userTypes.map((type, i) => (
                                <UserTypeCard
                                    key={type.id}
                                    type={type}
                                    index={i}
                                    onSelect={setSelectedType}
                                />
                            ))}
                        </motion.div>

                    ) : (

                        <motion.div
                            key="form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="max-w-lg mx-auto"
                        >

                            <Card
                                className="p-10 border border-slate-200
    bg-white backdrop-blur-xl
    shadow-xl
    relative overflow-hidden"
                            >
                                {loading && (
                                    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
                                        <Spinner />
                                    </div>
                                )}

                                <div
                                    className="absolute top-0 left-0 right-0 h-1.5
        bg-gradient-to-r from-[#3FB8FF] to-[#FBAB18]"
                                />
                                <div
                                    className="absolute -top-32 -right-32 w-64 h-64
        bg-gradient-to-br from-[#3FB8FF] to-[#6060E9]
        opacity-10 rounded-full blur-3xl"
                                />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">

                                        <div className="flex items-center gap-4">

                                            {selectedUserType && (
                                                <div
                                                    className="p-3 rounded-xl
                        bg-gradient-to-br
                        from-[#3FB8FF] to-[#FBAB18]"
                                                >
                                                    <selectedUserType.icon className="h-6 w-6 text-white" />
                                                </div>
                                            )}

                                            <div>
                                                <h2 className="text-3xl font-bold text-slate-900">
                                                    {isSignup ? "Verify Identity" : "Welcome Back"}
                                                </h2>

                                                <p className="text-sm text-slate-600 mt-1">
                                                    {selectedUserType?.label}
                                                </p>
                                            </div>
                                        </div>

                                        <PremiumButton
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedType(null)
                                                setVerificationMethod(null)
                                                setOtpSent(false)
                                            }}
                                            className="text-slate-800 hover:text-slate-900"
                                        >
                                            Change
                                        </PremiumButton>

                                    </div>

                                    {isSignup ? (
                                        <OTPVerification
                                            verificationMethod={verificationMethod}
                                            verificationValue={verificationValue}
                                            otp={otp}
                                            otpSent={otpSent}
                                            selectedCountry={selectedCountry}
                                            verificationEmailError={verificationEmailError}
                                            phoneError={phoneError}
                                            gradient="from-[#3FB8FF] to-[#FBAB18]"
                                            onMethodSelect={setVerificationMethod}
                                            onValueChange={(value) => {
                                                setVerificationValue(value)

                                                if (verificationMethod === "email") {
                                                    setVerificationEmailError(validateEmail(value))
                                                } else {
                                                    setPhoneError(validatePhone(value, selectedCountry.code))
                                                }
                                            }}
                                            onOtpChange={setOtp}
                                            onCountryChange={(country) => {
                                                setSelectedCountry(country)
                                                setPhoneError(validatePhone(verificationValue, country.code))
                                            }}
                                            onSendOtp={handleSendOtp}
                                            onVerifyOtp={handleVerifyOtp}
                                            onBack={() => setVerificationMethod(null)}
                                            onModeChange={handleModeChange}
                                            validateEmail={validateEmail}
                                            validatePhone={validatePhone}
                                        />
                                    ) : (
                                        <LoginForm
                                            email={email}
                                            password={password}
                                            emailError={emailError}
                                            gradient="from-[#3FB8FF] to-[#FBAB18]"
                                            onEmailChange={(value) => {
                                                setEmail(value)
                                                setEmailError(validateEmail(value))
                                            }}
                                            onPasswordChange={setPassword}
                                            onSubmit={handleSubmit}
                                            onModeChange={handleModeChange}
                                        />
                                    )}

                                </div>

                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}
