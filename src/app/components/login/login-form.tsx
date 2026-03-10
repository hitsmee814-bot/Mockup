import { PremiumButton } from "@/app/utils/PremiumButton"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, CircleAlert } from "lucide-react"

interface LoginFormProps {
    email: string
    password: string
    emailError: string
    gradient: string
    onEmailChange: (value: string) => void
    onPasswordChange: (value: string) => void
    onSubmit: () => void
    onModeChange: () => void
}

export function LoginForm({
    email,
    password,
    emailError,
    gradient,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    onModeChange,
}: LoginFormProps) {
    return (
        <div className="space-y-5">

            <div>
                <Label htmlFor="email" className="text-slate-700">
                    Email Address
                </Label>

                <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    autoFocus
                    className="mt-2 h-12 bg-white border-slate-300 text-slate-900 
          placeholder:text-slate-400
          focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]"
                />

                {emailError && (
                    <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-red-600">
                        <CircleAlert className="h-3.5 w-3.5" />
                        {emailError}
                    </p>)}
            </div>

            <div>
                <Label htmlFor="password" className="text-slate-700">
                    Password
                </Label>

                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !(!!emailError || !email || !password)) {
                            onSubmit()
                        }
                    }}
                    className="mt-2 h-12 bg-white border-slate-300 text-slate-900
          placeholder:text-slate-400
          focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]"
                />
            </div>

            <div className="flex items-center justify-between text-sm">

                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                    <Checkbox
                        className="border-slate-300 data-[state=checked]:bg-[#3FB8FF] data-[state=checked]:border-[#3FB8FF]"
                    />
                    <span>Remember me</span>
                </label>

                <PremiumButton
                    variant="ghost"
                    className="p-2 h-auto text-[#3FB8FF] hover:text-[#2da4e6]"
                >
                    Forgot password?
                </PremiumButton>

            </div>

            <PremiumButton
                variant="primary"
                size="lg"
                className="w-full h-12 text-base font-semibold shadow-md hover:shadow-lg"
                onClick={onSubmit}
                disabled={!!emailError || !email || !password}
            >
                Sign In
                <ArrowRight className="ml-2 h-5 w-5" />
            </PremiumButton>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                </div>

                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-400">Or</span>
                </div>
            </div>

            <p className="text-center text-sm text-slate-600">
                Don't have an account?{" "}
                <PremiumButton
                    variant="ghost"
                    className="p-2 h-auto text-[#3FB8FF] hover:text-[#2da4e6]"
                    onClick={onModeChange}
                >
                    Sign up
                </PremiumButton>
            </p>

        </div>
    )
}