import { BookingForm } from "@/app/components/packages/BookingForm";
import { Spinner } from "@/components/ui/spinner";
import { tourService } from "@/services/ItineraryService";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

// Required when next.config.js has: output: "export"
export async function generateStaticParams() {
  const data = await tourService.getAll();

  return data.map((pkg) => ({
    id: pkg.tour.id.toString(),
  }));
}

async function getPackage(id: string) {
  return await tourService.getById(id);
}

export default async function BookingPage({ params }: Props) {
  const { id } = await params;
  const pkg = await getPackage(id);

  if (!pkg) notFound();

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-64">
          <Spinner className="w-12 h-12 text-primary" />
        </div>
      }
    >
      <BookingForm pkg={pkg} />
    </Suspense>
  );
}