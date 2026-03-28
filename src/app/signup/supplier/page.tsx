// import SupplierSignupPage from '../../components/signup/SupplierSignup'

// export default function Page() {
//   return <SupplierSignupPage />
// }

'use client'

import SupplierSignup from '@/app/components/signup/supplier/SupplierSignup'
import { AuthGuard } from '@/app/guards/AuthGuard'

export default function SupplierSignupPage() {
  return (<AuthGuard>< SupplierSignup /></AuthGuard>)
}
