import { Suspense } from "react";
import { Flight } from "@/app/components/flight-booking/flight";
import { Spinner } from "@/components/ui/spinner";

export default function FlightsPage() {
  return (

    <Suspense fallback={
                <div className="flex justify-center items-center h-64">
                    <Spinner className="w-12 h-12 text-primary" />
                </div>
            }>
      <Flight />
    </Suspense>
  );
}