import { travelPackages } from "@/app/components/packages/data"
import { PackageDetailPage } from "@/app/components/packages/PackageDetailPage"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export function generateStaticParams() {
  return travelPackages.map(pkg => ({ id: pkg.id }))
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function PackagePage({ params }: Props) {
  const { id } = await params
  const pkg = travelPackages.find(p => p.id === id)

  if (!pkg) notFound()

  return (
    <Suspense fallback={<div>Loading package details...</div>}>
      <PackageDetailPage pkg={pkg} />
    </Suspense>
  )
}