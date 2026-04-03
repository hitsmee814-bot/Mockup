"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import parsePhoneNumberFromString, { isValidPhoneNumber } from "libphonenumber-js"
import { userTypes } from "./constants"
import { UserTypeCard } from "./user-type-card"
import { OTPVerification } from "./otp-verification"
import { LoginForm } from "./login-form"
import { PremiumButton } from "@/app/utils/PremiumButton"
import { otpService } from "@/services/otpService"
import { toast } from "sonner"
import logoPrimary from "../../assets/images/final logo Bonhomiee white without.png"
import Image from "next/image"
import { HiOutlineBriefcase } from "react-icons/hi"
import { Spinner } from "@/components/ui/spinner"
import { LogIn, Menu, X } from "lucide-react"
import { lookupService } from "@/services/countriesService"
import { useAuth } from "@/app/context/AuthContext"

type Country = {
    code: string
    name: string
    dialCode: string
    flag: string
}

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
    const [loading, setLoading] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const emailRegex = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/;

    const [countries, setCountries] = useState<Country[]>([])
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
    const validateEmail = (value: string) => {
        if (value && !emailRegex.test(value)) {
            return "Please enter a valid email address"
        }
        return ""
    }

    const { login } = useAuth()

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await lookupService.getPhoneCodes()

                const formatted = res.map((c: any) => ({
                    code: c.iso2,
                    name: c.iso2,
                    dialCode: c.phone_code,
                    flag: getFlagEmoji(c.iso2),
                }))

                setCountries(formatted)

                const india = formatted.find((c: any) => c.code === "IN") || formatted[0]
                setSelectedCountry(india)

            } catch (e) {
                console.error(e)
            }
        }

        fetchCountries()
    }, [])
    const getFlagEmoji = (code: string) =>
        code.toUpperCase().replace(/./g, c =>
            String.fromCodePoint(127397 + c.charCodeAt(0))
        )

const validatePhone = (value: string, countryCode: string) => {
    if (!value) return ""

    try {
        const country = countries.find(c => c.code === countryCode)
        if (!country) return "Invalid country"

        const fullNumber = `${country.dialCode}${value}`

        const phoneNumber = parsePhoneNumberFromString(fullNumber)

        if (!phoneNumber || !phoneNumber.isValid()) {
            return "Please enter a valid phone number"
        }

        if (phoneNumber.country !== countryCode) {
            return "Phone number does not match selected country"
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
            const fullMobile = `${selectedCountry?.dialCode}${mobile}`
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
            response = await otpService.sendEmailOtp(verificationEmail)
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

            const fullMobile = `${selectedCountry?.dialCode}${mobile}`
            const response = await otpService.verifyMobileOtp(fullMobile, mobileOtp)

            if (response?.status) {
                toast.success(response.detail || "Mobile OTP verified successfully", {
                    position: "top-right",
                })

                setMobileVerified(true)
                setMobileOtpSent(false)
                setMobileOtp("")

                // save full country code format
                localStorage.setItem(
                "userCountryCode",
                `${selectedCountry?.code}-${selectedCountry?.dialCode}`//local storage
                );
                 localStorage.setItem("userPhoneNumber", mobile) // local storage

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

                 localStorage.setItem("userEmail", verificationEmail)  // local storage 


                const token = btoa(JSON.stringify({
                email: verificationEmail,
                verified: true,
                ts: Date.now()
                }))

                document.cookie = `verifyToken_${selectedType}=${token}; path=/`

                router.push(`/signup/${selectedType}`)

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
    if (!selectedType) return
    const token = btoa(JSON.stringify({
        mobile: mobile,
        verified: true,
        ts: Date.now()
    }))

    document.cookie = `verifyToken_${selectedType}=${token}; path=/`

    router.push(`/signup/${selectedType}`)
}

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            toast.success("Welcome Back", { position: "top-right" })
            console.log("Login", { type: selectedType, email, password })
            login()
            router.push('/itinerary/packages')
        }, 3000);
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

                    {/* <button
                        onClick={() => setMenuOpen(true)}
                        className="md:hidden text-white"
                    >
                        <Menu size={28} />
                    </button> */}

                </div>
            </header>
            {/* <AnimatePresence>
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
            </AnimatePresence> */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-7xl relative z-10 mt-[5rem] sm:mt-0"
            ><div className="text-center mb-12">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-[#3FB8FF]"
                >
                    Welcome Back
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm sm:text-base md:text-lg text-[#0E40C7]"
                >

                    <span className="hidden sm:block">
                        {selectedType
                            ? `Continue as ${selectedUserType?.label}`
                            : "Select your account type to continue"}
                    </span>
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
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-xl"
                                    >
                                        <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.25 }}
                                        className="flex flex-col items-center gap-4"
                                        >
                                        <motion.div
                                            animate={{ y: [0, -8, 0] }}
                                            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <div className="relative">
                                            <motion.div
                                                className="absolute inset-0 rounded-full bg-[#3FB8FF]/20 blur-xl"
                                                animate={{ scale: [1, 1.4, 1] }}
                                                transition={{ duration: 1.4, repeat: Infinity }}
                                            />
                                            <div className="h-8 w-8 rounded-full bg-[#3FB8FF]" />
                                            </div>
                                        </motion.div>

                                        <div className="text-center">
                                            <p className="text-sm font-semibold text-[#0E40C7]">
                                            Please wait...
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                            Processing your request
                                            </p>
                                        </div>

                                        <div className="flex gap-1">
                                            {[0, 1, 2].map((i) => (
                                            <motion.div
                                                key={i}
                                                className="h-1.5 w-1.5 rounded-full bg-[#3FB8FF]"
                                                animate={{ opacity: [0.3, 1, 0.3] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                            />
                                            ))}
                                        </div>
                                        </motion.div>
                                    </motion.div>
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

                                    {isSignup && selectedCountry ? (
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
                                            countries={countries}
                                            selectedCountry={selectedCountry!}
                                            onCountryChange={(country) => {
                                                setSelectedCountry(country)
                                                setPhoneError(validatePhone(mobile, country.code))
                                            }}
                                            verificationEmailError={verificationEmailError}
                                            phoneError={phoneError}
                                            gradient="from-[#3FB8FF] to-[#FBAB18]"
                                            onMobileChange={(value) => {
                                                setMobile(value)
                                                setPhoneError(validatePhone(value, selectedCountry!.code))
                                            }}
                                            onEmailChange={(value) => {
                                                setVerificationEmail(value)
                                                setVerificationEmailError(validateEmail(value))
                                            }}
                                            onMobileOtpChange={setMobileOtp}
                                            onEmailOtpChange={setEmailOtp}
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
