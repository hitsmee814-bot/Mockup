import { HotelBooking } from "@/app/components/hotel-booking";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

export default function HotelPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-64">
          <Spinner className="w-12 h-12 text-primary" />
        </div>
      }
    >
      <HotelBooking />
    </Suspense>
  );
}