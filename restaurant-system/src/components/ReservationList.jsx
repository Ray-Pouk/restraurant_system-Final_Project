import { useState } from "react";
import ReservationForm from "./ReservationForm";
import { Link } from "react-router-dom";
import { useRestaurant } from "../context/RestaurantContext";
import { useAuth } from "../context/AuthContext";

function ReservationList() {
  const { reservations, updateReservation, cancelReservation } =
    useRestaurant();
  const { user } = useAuth();
  const [editingId, setEditingId] = useState(null);

  // Soonest first
  const sorted = reservations
    .filter((r) => r.userId === user?.id)
    .sort((a, b) =>
    `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)
  );

  if (!user) {
    return (
      <div>
        <h2>My Reservations</h2>
        <p>
          <Link to="/login">Log in</Link> to view, edit or cancel your
          reservations.
        </p>
      </div>
    );
  }

  function handleSave(id, changes) {
    // An edited booking needs to be approved again
    updateReservation(id, { ...changes, status: "Pending" });
    setEditingId(null);
  }

  function handleCancel(id) {
    if (window.confirm("Cancel this reservation?")) {
      cancelReservation(id);
    }
  }

  return (
    <div>
      <h2>My Reservations</h2>

      {sorted.length === 0 ? (
        <p>You don't have any reservations yet.</p>
      ) : (
        sorted.map((reservation) => (
          <div key={reservation.id}>
            {editingId === reservation.id ? (
              <ReservationForm
                initialValues={reservation}
                submitLabel="Save Changes"
                onSubmit={(changes) => handleSave(reservation.id, changes)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <h3>
                  {reservation.eventType} - {reservation.date} at{" "}
                  {reservation.time}
                </h3>
                <p>Name: {reservation.name}</p>
                <p>Guests: {reservation.guests}</p>
                {reservation.requirements && (
                  <p>Special requirements: {reservation.requirements}</p>
                )}
                <p>Status: {reservation.status}</p>

                {reservation.status !== "Cancelled" && (
                  <>
                    <button onClick={() => setEditingId(reservation.id)}>
                      Edit
                    </button>
                    <button onClick={() => handleCancel(reservation.id)}>
                      Cancel Reservation
                    </button>
                  </>
                )}
              </>
            )}
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default ReservationList;
