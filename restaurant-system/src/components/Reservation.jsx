import { useState } from "react";
import ReservationForm from "./ReservationForm";
import ReservationList from "./ReservationList";
import { useRestaurant } from "../context/RestaurantContext";

function Reservation() {
  const { addReservation } = useRestaurant();
  const [confirmation, setConfirmation] = useState(null);

  function handleBook(data) {
    const saved = addReservation(data);
    setConfirmation(saved);
  }

  return (
    <div>
      <h2>Book a Table</h2>

      <ReservationForm submitLabel="Reserve Table" onSubmit={handleBook} />

      {confirmation && (
        <div role="status">
          <h3>Reservation Confirmed!</h3>
          <p>
            Thank you, {confirmation.name}. Your {confirmation.eventType}{" "}
            reservation for {confirmation.guests} on {confirmation.date} at{" "}
            {confirmation.time} has been received. A confirmation has been
            sent, and the restaurant will approve it shortly.
          </p>
          <button onClick={() => setConfirmation(null)}>Dismiss</button>
        </div>
      )}

      <ReservationList />
    </div>
  );
}

export default Reservation;
