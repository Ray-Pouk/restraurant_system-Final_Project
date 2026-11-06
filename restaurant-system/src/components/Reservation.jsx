import { useState } from "react";

function Reservation() {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState(1);
    const [eventType, setEventType] = useState("Regular");
    const [reservation, setReservation] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();

        setReservation({
            name,
            date,
            time,
            guests,
            eventType,
        });
    }

    return (
        <div>
            <h2>Book a Table</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />

                <input
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    required
                />

                <input
                    type="time"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    required
                />

                <input
                    type="number"
                    min="1"
                    value={guests}
                    onChange={(event) => setGuests(Number(event.target.value))}
                    required
                />


                <label>Reservation Type:</label>

                <select
                    value={eventType}
                    onChange={(event) => setEventType(event.target.value)}
                >
                    <option value="Regular">Regular Table</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Business">Business Event</option>
                    <option value="Other">Other Special Event</option>
                </select>


                <button type="submit">
                    Reserve Table
                </button>
            </form>

            {reservation && (
                <div>
                    <h3>Reservation Confirmed!</h3>

                    <p>Name: {reservation.name}</p>
                    <p>Date: {reservation.date}</p>
                    <p>Time: {reservation.time}</p>
                    <p>Guests: {reservation.guests}</p>
                    <p>Reservation Type: {reservation.eventType}</p>
                </div>
            )}

        </div>
    );
}

export default Reservation;