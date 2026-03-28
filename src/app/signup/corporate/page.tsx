import { AuthGuard } from '@/app/guards/AuthGuard'
import CorporateSignupPage from '../../components/signup/CorporateSignup'

export default function Page() {
  return (<AuthGuard>< CorporateSignupPage /></AuthGuard>)
}