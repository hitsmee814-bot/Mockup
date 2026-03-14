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
import { HiOutlineBriefcase } from "react-icons/hi"
import { Spinner } from "@/components/ui/spinner"
import { LogIn, Menu, X } from "lucide-react"

export function Login() {
    const router = useRouter()
    const [selectedType, setSelectedType] = useState<string | null>(null)
    const [isSignup, setIsSignup] = useState(false)
    const [mobile, setMobile] = useState("")
    const [verificationEmail, setVerificationEmail] = useState("")
    const [mobileOtp, setMobileOtp] = useState("")
    const [emailOtp, setEmailOtp] = useState("")
    const [mobileOtpSent, setMobileOtpSent] = useState(false)
    const [emailOtpSent, setEmailOtpSent] = useState(false)
    const [mobileVerified, setMobileVerified] = useState(false)
    const [emailVerified, setEmailVerified] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [verificationEmailError, setVerificationEmailError] = useState("")
    const [phoneError, setPhoneError] = useState("")
    const [selectedCountry, setSelectedCountry] = useState(countries[0])
    const [loading, setLoading] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const emailRegex = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/;

    const validateEmail = (value: string) => {
        if (value && !emailRegex.test(value)) {
            return "Please enter a valid email address"
        }
        return ""
    }

    const validatePhone = (value: string, countryCode: string) => {
        if (!value) return ""

        try {
            const country = countries.find(c => c.code === countryCode)
            if (!country) return "Invalid country"

            const fullNumber = `${country.dialCode}${value}`

            console.log(fullNumber)
            console.log(countryCode)

            if (!isValidPhoneNumber(fullNumber, countryCode as "IN" | "FR" | "US")) {
                return "Please enter a valid phone number"
            }

            return ""
        } catch {
            return "Please enter a valid phone number"
        }
    }

    const handleSendMobileOtp = async () => {
        try {

            setLoading(true)

            let response
            const fullMobile = `${selectedCountry.dialCode}${mobile}`
            response = await otpService.sendMobileOtp(fullMobile)


            if (response?.message) {
                setMobileOtpSent(true)
                toast.success(response?.message || "OTP sent successfully", { position: "top-right" })
            }
        } catch (error: any) {
            toast.error(error?.detail || "Failed to send OTP", { position: "top-right" })
        } finally {
            setLoading(false)
        }
    }

    const handleResendMobileOtp = async () => {
        try {
            let response
            response = await otpService.sendEmailOtp(email)
            if (response?.message) {
                toast.success(response?.message || "OTP sent successfully", { position: "top-right" })
            }
        } catch (error: any) {
            toast.error(error?.detail || "Failed to send OTP", { position: "top-right" })
        } finally {
        }
    }

    const handleResendEmailOtp = async () => {
        try {
            let response
            response = await otpService.sendEmailOtp(email)
            if (response?.message) {
                toast.success(response?.message || "OTP sent successfully", { position: "top-right" })
            }
        } catch (error: any) {
            toast.error(error?.detail || "Failed to send OTP", { position: "top-right" })
        } finally {
        }
    }
    const handleSendEmailOtp = async () => {
        try {
            setLoading(true)

            let response
            response = await otpService.sendEmailOtp(email)
            if (response?.message) {
                setEmailOtpSent(true)
                toast.success(response?.message || "OTP sent successfully", { position: "top-right" })
            }
        } catch (error: any) {
            toast.error(error?.detail || "Failed to send OTP", { position: "top-right" })
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyMobileOtp = async () => {
        try {

            setLoading(true)

            const fullMobile = `${selectedCountry.dialCode}${mobile}`
            const response = await otpService.verifyMobileOtp(fullMobile, mobileOtp)

            if (response?.status) {
                toast.success(response.detail || "Mobile OTP verified successfully", {
                    position: "top-right",
                })

                setMobileVerified(true)
                setMobileOtpSent(false)
                setMobileOtp("")

            } else {
                toast.error(response?.detail || "Invalid OTP", {
                    position: "top-right",
                })
            }

        } catch (error: any) {
            toast.error(error?.detail || "Mobile OTP verification failed", {
                position: "top-right",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyEmailOtp = async () => {
        try {
            if (!verificationEmail || !emailOtp) return
            setLoading(true)
            const response = await otpService.verifyEmailOtp(verificationEmail, emailOtp)

            if (response?.status) {
                toast.success(response.detail || "Email OTP verified successfully", {
                    position: "top-right",
                })

                setEmailVerified(true)
                setEmailOtpSent(false)
                setEmailOtp("")

                if (selectedType) {
                    router.push(`/signup/${selectedType}`)
                }

            } else {
                toast.error(response?.detail || "Invalid OTP", {
                    position: "top-right",
                })
            }

        } catch (error: any) {
            toast.error(error?.detail || "Email OTP verification failed", {
                position: "top-right",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleComplete = () => {
        if (selectedType) {
            router.push(`/signup/${selectedType}`)
        }
    }

    const handleSubmit = () => {
        console.log("Login", { type: selectedType, email, password })
    }

    const handleModeChange = () => {
        setIsSignup(!isSignup)
        setMobile("")
        setVerificationEmail("")
        setMobileOtp("")
        setEmailOtp("")
        setMobileOtpSent(false)
        setEmailOtpSent(false)
        setMobileVerified(false)
        setEmailVerified(false)
    }

    const selectedUserType = userTypes.find(t => t.id === selectedType)

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-white">

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

                    <button
                        onClick={() => setMenuOpen(true)}
                        className="md:hidden text-white"
                    >
                        <Menu size={28} />
                    </button>

                </div>
            </header>
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#3FB8FF] z-[9999] flex flex-col pt-28 px-8"
                    >
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="absolute top-6 right-6 text-white"
                        >
                            <X size={28} />
                        </button>

                        <div className="flex flex-col gap-6">

                            <button
                                onClick={() => setMenuOpen(false)}
                                className="text-center py-4 rounded-lg bg-[#FBAB18] text-white font-semibold"
                            >
                                Login
                            </button>

                            <button
                                onClick={() => setMenuOpen(false)}
                                className="text-center py-4 rounded-lg bg-[#FBAB18] text-white font-semibold"
                            >
                                Book Demo
                            </button>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
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
                        className="text-5xl md:text-6xl font-bold mb-4 text-[#3FB8FF]"
                    >
                        Welcome Back
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg text-[#0E40C7]"
                    >
                        {selectedType ? `Continue as ${selectedUserType?.label}` : "Select your account type to continue"}
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
                                <UserTypeCard key={type.id} type={type} index={i} onSelect={setSelectedType} />
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
                            <Card className="p-10 border-[#CAD8FF] bg-white shadow-xl relative overflow-hidden">
                                {loading && (
                                    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
                                        <Spinner />
                                    </div>
                                )}

                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#3FB8FF] to-[#FBAB18]" />
                                <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-[#3FB8FF] to-[#FBAB18] opacity-5 rounded-full blur-3xl" />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            {selectedUserType && (
                                                <div className="p-3 rounded-xl bg-gradient-to-br from-[#3FB8FF] to-[#FBAB18]">
                                                    <selectedUserType.icon className="h-6 w-6 text-white" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-sm text-[#0E40C7] mt-1">{selectedUserType?.label}</p>
                                            </div>
                                        </div>
                                        <PremiumButton
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedType(null)
                                                setMobile("")
                                                setMobileOtp("")
                                                setEmailOtp("")
                                                setVerificationEmail("")
                                                setMobileOtpSent(false)
                                                setEmailOtpSent(false)
                                                setMobileVerified(false)
                                                setEmailVerified(false)
                                            }}
                                            className="text-[#0E40C7] hover:text-[#04257E]"
                                        >
                                            Change
                                        </PremiumButton>
                                    </div>

                                    {isSignup ? (
                                        <OTPVerification
                                            userType={selectedType!}
                                            mobile={mobile}
                                            verificationEmail={verificationEmail}
                                            mobileOtp={mobileOtp}
                                            emailOtp={emailOtp}
                                            mobileOtpSent={mobileOtpSent}
                                            emailOtpSent={emailOtpSent}
                                            mobileVerified={mobileVerified}
                                            emailVerified={emailVerified}
                                            selectedCountry={selectedCountry}
                                            verificationEmailError={verificationEmailError}
                                            phoneError={phoneError}
                                            gradient="from-[#3FB8FF] to-[#FBAB18]"
                                            onMobileChange={(value) => {
                                                setMobile(value)
                                                setPhoneError(validatePhone(value, selectedCountry.code))
                                            }}
                                            onEmailChange={(value) => {
                                                setVerificationEmail(value)
                                                setVerificationEmailError(validateEmail(value))
                                            }}
                                            onMobileOtpChange={setMobileOtp}
                                            onEmailOtpChange={setEmailOtp}
                                            onCountryChange={(country) => {
                                                setSelectedCountry(country)
                                                setPhoneError(validatePhone(mobile, country.code))
                                            }}
                                            onSendMobileOtp={handleSendMobileOtp}
                                            onSendEmailOtp={handleSendEmailOtp}
                                            onReSendMobileOtp={handleResendMobileOtp}
                                            onReSendEmailOtp={handleResendEmailOtp}
                                            onVerifyMobileOtp={handleVerifyMobileOtp}
                                            onVerifyEmailOtp={handleVerifyEmailOtp}
                                            onComplete={handleComplete}
                                            onModeChange={handleModeChange}
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
