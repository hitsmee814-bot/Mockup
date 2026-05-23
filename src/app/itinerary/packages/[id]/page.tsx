// import { PackageDetailPage } from "@/app/components/packages/PackageDetailPage";
// import { Spinner } from "@/components/ui/spinner";
// import { tourService } from "@/services/ItineraryService";
// import { notFound } from "next/navigation";
// import { Suspense } from "react";

// interface Props {
//   params: Promise<{
//     id: string;
//   }>;
// }

// export async function generateStaticParams() {
//   const data = await tourService.getAll();

//   return data.map((pkg: any) => ({
//     id: pkg.tour.id.toString(),
//   }));
// }

// async function getPackage(id: string) {
//   return await tourService.getById(id);
// }

// export default async function PackagePage({ params }: Props) {
//   const { id } = await params;
//   const pkg = await getPackage(id);

//   if (!pkg) notFound();

//   return (
//     <Suspense
//       fallback={
//         <div className="flex justify-center items-center h-64">
//           <Spinner className="w-12 h-12 text-primary" />
//         </div>
//       }
//     >
//       <PackageDetailPage pkg={pkg} />
//     </Suspense>
//   );
// }

import { PackageDetailPage } from "@/app/components/packages/PackageDetailPage";
import { Spinner } from "@/components/ui/spinner";
import { tourService } from "@/services/ItineraryService";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

// Required for output: "export"
export async function generateStaticParams() {
  try {
    const data = await tourService.getAll();

    // Prevent static export failure when API returns empty
    if (!data || data.length === 0) {
      return [{ id: "placeholder" }];
    }

    return data.map((pkg: any) => ({
      id: String(pkg.tour.id),
    }));
  } catch (error) {
    console.error("generateStaticParams error:", error);

    // Fallback for CI/build safety
    return [{ id: "placeholder" }];
  }
}

async function getPackage(id: string) {
  return await tourService.getById(id);
}

export default async function PackagePage({ params }: Props) {
  const { id } = await params;

  // Ignore fake fallback route
  if (id === "placeholder") {
    notFound();
  }

  const pkg = await getPackage(id);

  if (!pkg) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-64">
          <Spinner className="w-12 h-12 text-primary" />
        </div>
      }
    >
      <PackageDetailPage pkg={pkg} />
    </Suspense>
  );
}