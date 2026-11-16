import { useState } from "react";
import { useRestaurant } from "../../context/RestaurantContext";

function AdminReservations() {
  const { reservations, updateReservation, cancelReservation } =
    useRestaurant();
  const [filter, setFilter] = useState("All");

  const visible = [...reservations]
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))
    .filter((r) => filter === "All" || r.status === filter);

  return (
    <div>
      <h2>Manage Reservations & Events</h2>

      <label>Show: </label>
      <select value={filter} onChange={(event) => setFilter(event.target.value)}>
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      {visible.length === 0 ? (
        <p>No reservations to show.</p>
      ) : (
        visible.map((r) => (
          <div key={r.id}>
            <h3>
              {r.eventType} - {r.date} at {r.time}
            </h3>
            <p>
              {r.name} - {r.guests} guest{r.guests === 1 ? "" : "s"}
            </p>
            {r.requirements && <p>Special requirements: {r.requirements}</p>}
            <p>
              Status: <strong>{r.status}</strong>
            </p>

            {r.status === "Pending" && (
              <button
                onClick={() => updateReservation(r.id, { status: "Approved" })}
              >
                Approve
              </button>
            )}
            {r.status !== "Cancelled" && (
              <button
                onClick={() => {
                  if (window.confirm("Cancel this booking?")) {
                    cancelReservation(r.id);
                  }
                }}
              >
                Cancel Booking
              </button>
            )}
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default AdminReservations;
