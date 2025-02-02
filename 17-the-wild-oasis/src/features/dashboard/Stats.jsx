import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ recentBooking, confirmedStays, numDays, cabinsCount }) {
  // 1.
  const numBookings = recentBooking?.length;

  // 2.
  const totalSales = confirmedStays?.reduce(
    (acc, stay) => acc + stay?.totalPrice,
    0
  );

  // 3.  (means every one that has checked in (checkouts included)) it is just user requirement
  const checkins = confirmedStays.length;

  // 4.
  const occupiedNights = confirmedStays.reduce(
    (acc, stays) => acc + stays.numNights,
    0
  );

  return (
    <>
      <Stat
        title="bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={
          Math.round((occupiedNights / (numDays * cabinsCount)) * 100) + "%"
        }
      />
    </>
  );
}

export default Stats;
