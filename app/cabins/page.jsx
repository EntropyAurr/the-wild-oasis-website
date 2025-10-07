/* eslint-disable react/no-unescaped-entities */
import { Suspense } from "react";
import CabinList from "@/app/_components/CabinList";
import Spinner from "@/app/_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "@/app/_components/ReservationReminder";

// export const revalidate = 15;

export const metadata = {
  title: "Cabins",
};

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const filter = params?.capacity ?? "all";
  // if params?.capacity = null or undefined, filter set to "all"

  return (
    <div>
      <h1 className="text-accent-400 mb-5 text-4xl font-medium">Our Luxury Cabins</h1>
      <p className="text-primary-200 mb-10 text-lg">
        Cozy yet luxurious cabins, located right in the heart of the Italian Dolomites. Imagine waking up to beautiful
        mountain views, spending your days exploring the dark forests around, or just relaxing in your private hot tub
        under the stars. Enjoy nature's beauty in your own little home away from home. The perfect spot for a peaceful,
        calm vacation. Welcome to paradise.
      </p>
      <div className="mb-8 flex justify-end">
        <Filter />
      </div>

      {/* Suspense: display a fallback (in this case is the Spinner) until the children component (CabinList) have finished loading */}

      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
