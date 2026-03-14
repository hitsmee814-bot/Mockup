import { Suspense } from "react";
import { Flight } from "@/app/components/flight-booking/flight";

export default function FlightsPage() {
  return (

    <Suspense fallback={<div>Loading flights...</div>}>
      <Flight />
    </Suspense>
  );
}