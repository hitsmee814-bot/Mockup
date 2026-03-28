import CustomerSignup from "@/app/components/signup/CustomerSignup";
import { AuthGuard } from "@/app/guards/AuthGuard";
import type { JSX } from "react";

export default function CustomerSignupPage(): JSX.Element {
  return (<AuthGuard>< CustomerSignup /></AuthGuard>)
}
