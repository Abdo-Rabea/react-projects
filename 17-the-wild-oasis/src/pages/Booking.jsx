import BookingDetail from "../features/bookings/BookingDetail";

/**
 * pages : have the pages that is mapped to main navigation (make it as simple as possible so no state used here ) move all of the logic to the components
 * page should not fetch data or use any side effect
 * this makes it more cleaner and leave the dev work in the features folder
 *
 */
function Booking() {
  return <BookingDetail />;
}

export default Booking;
