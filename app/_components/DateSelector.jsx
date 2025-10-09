"use client";

import "react-day-picker/dist/style.css";
import { differenceInDays, isPast, isSameDay, isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import { useReservation } from "@/app/context/ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from && range.to && datesArr.some((date) => isWithinInterval(date, { start: range.from, end: range.to }))
  );
}

function DateSelector({ cabin, settings, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();
  const { minBookingLength, maxBookingLength } = settings;

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(displayRange.to, displayRange.from);
  const cabinPrice = numNights * (regularPrice - discount);

  return (
    <div className="flex min-h-[480px] flex-col justify-between">
      <DayPicker
        style={{
          "--rdp-accent-color": "orange",
          "--rdp-range_middle-background-color": "#1b263b",
        }}
        className="place-self-center pt-12"
        mode="range"
        selected={displayRange}
        onSelect={setRange}
        min={minBookingLength}
        max={maxBookingLength}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear() + 5, new Date().getMonth())}
        captionLayout="dropdown"
        numberOfMonths={1}
        disabled={(curDate) => isPast(curDate) || bookedDates.some((date) => isSameDay(date, curDate))}
      />

      <div className="bg-accent-500 text-primary-800 flex h-[72px] items-center justify-between px-8">
        <div className="flex items-baseline gap-6">
          <p className="flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="text-primary-700 font-semibold line-through">${regularPrice}</span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button className="border-primary-800 border px-4 py-2 text-sm font-semibold" onClick={resetRange}>
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
