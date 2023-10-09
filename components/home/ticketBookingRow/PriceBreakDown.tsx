import { TICKETS, TTICKETS } from "@/data/data";
import { useFormContext } from "react-hook-form";

function PriceBreakDown() {
  const { getValues, watch } = useFormContext();

  watch("numberOfAttendees");
  watch("dates");

  const numberOfAttendees = getValues("numberOfAttendees");
  const pass = getValues("pass") as TTICKETS;
  const dates = getValues("dates");

  let numberOfDays;
  if (pass == "KHELIA_SEASON_PASS" || pass == "NON_TRADITIONAL_SEASON_PASS") {
    numberOfDays = 10;
  } else {
    numberOfDays = Array.isArray(dates) ? dates.length : 0;
  }

  const passPrice = TICKETS[pass]?.price;

  if (!numberOfAttendees || !numberOfDays || !passPrice) return null;

  return (
    <div className="border border-dashed border-gray-500 rounded-lg p-4">
      <p className="font-semibold">Price Breakdown</p>
      {
        <p>
          {`${numberOfAttendees} Attendees x ${numberOfDays} Days x ₹${passPrice} = 
        ₹${numberOfAttendees * passPrice * numberOfDays}`}
        </p>
      }
    </div>
  );
}

export default PriceBreakDown;
