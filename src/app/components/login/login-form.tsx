import { PremiumButton } from "@/app/utils/PremiumButton"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

interface LoginFormProps {
    username: string
    password: string
    emailError: string
    gradient: string
    onUsernameChange: (value: string) => void
    onPasswordChange: (value: string) => void
    onSubmit: () => void
    onModeChange: () => void
}

export function LoginForm({
    username,
    password,
    emailError,
    gradient,
    onUsernameChange,
    onPasswordChange,
    onSubmit,
    onModeChange,
}: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="space-y-5">
            <div>
                <Label htmlFor="username" className="text-[#04257E]">Username</Label>
                <Input
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => onUsernameChange(e.target.value)}
                    className="mt-2 bg-white border-[#CAD8FF] text-[#04257E] placeholder:text-[#7B9FFF] focus:border-[#3FB8FF] h-12"
                    autoFocus
                />
            </div>
            <div>
                <Label htmlFor="password" className="text-[#04257E]">Password</Label>
                <div className="relative">
                <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    onKeyDown={(e) => {
                    if (e.key === "Enter" && !(!!emailError || !username || !password)) {
                        onSubmit()
                    }
                    }}
                    className="mt-2 bg-white border-[#CAD8FF] text-[#04257E] placeholder:text-[#7B9FFF] focus:border-[#3FB8FF] h-12 pr-10"
                />

                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-8 -translate-y-1/2 text-gray-400 hover:text-[#00AFEF]"
                >
                    {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                    ) : (
                    <Eye className="h-5 w-5" />
                    )}
                </button>
                </div>
            </div>
            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                    <Checkbox
                        className="border-slate-300 data-[state=checked]:bg-[#3FB8FF] data-[state=checked]:border-[#3FB8FF]"
                    />
                    <span>Remember me</span>
                </label>
                <PremiumButton variant="ghost" className="p-2 h-auto text-[#0E40C7] hover:text-[#04257E]">
                    Forgot password?
                </PremiumButton>
            </div>
            <PremiumButton
                variant="primary"
                size="lg"
                className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl"
                onClick={onSubmit}
                disabled={!!emailError || !username || !password}
            >
                Sign In
                <ArrowRight className="ml-2 h-5 w-5" />
            </PremiumButton>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#CAD8FF]" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-[#7B9FFF]">Or</span>
                </div>
            </div>
            <p className="text-center text-sm text-[#0E40C7]">
                Don't have an account?{" "}
                <PremiumButton
                    variant="ghost"
                    className="p-2 h-auto text-[#0E40C7] hover:text-[#04257E]"
                    onClick={onModeChange}
                >
                    Sign up
                </PremiumButton>
            </p>
        </div>
    )
}
