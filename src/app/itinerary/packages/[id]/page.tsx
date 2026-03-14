import { travelPackages } from "@/app/components/packages/data"
import { PackageDetailPage } from "@/app/components/packages/PackageDetailPage"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ tripType?: string }>
}

export default async function PackagePage({ params, searchParams }: Props) {
  const { id } = await params
  const { tripType } = await searchParams

  const pkg = travelPackages.find((p) => p.id === id)

  if (!pkg) notFound()

  return <PackageDetailPage pkg={pkg} tripType={tripType} />
}
