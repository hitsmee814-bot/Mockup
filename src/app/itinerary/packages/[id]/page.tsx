import { travelPackages } from "@/app/components/packages/data"
import { PackageDetailPage } from "@/app/components/packages/PackageDetailPage"
import { notFound } from "next/navigation"

interface Props {
  params: { id: string }
  searchParams: { tripType?: string }
}

export function generateStaticParams() {
  return travelPackages.map((pkg) => ({
    id: pkg.id,
  }))
}

export default function PackagePage({ params, searchParams }: Props) {
  const { id } = params
  const { tripType } = searchParams

  const pkg = travelPackages.find((p) => p.id === id)

  if (!pkg) notFound()

  return <PackageDetailPage pkg={pkg} tripType={tripType} />
}