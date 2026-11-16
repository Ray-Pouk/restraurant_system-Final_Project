import { useState } from "react";

const OPEN_TIME = "11:00";
const CLOSE_TIME = "22:00";
const MAX_GUESTS = 20;

// Today's date as YYYY-MM-DD in local time (matches <input type="date">)
function todayString() {
  return new Date().toLocaleDateString("en-CA");
}

function validate({ date, time, guests }) {
  const errors = {};

  if (date < todayString()) {
    errors.date = "Please choose today or a future date.";
  }

  if (time < OPEN_TIME || time > CLOSE_TIME) {
    errors.time = `We take reservations between ${OPEN_TIME} and ${CLOSE_TIME}.`;
  } else if (date === todayString()) {
    const now = new Date();
    const nowTime = now.toTimeString().slice(0, 5);
    if (time <= nowTime) {
      errors.time = "That time has already passed today.";
    }
  }

  if (!Number.isInteger(guests) || guests < 1 || guests > MAX_GUESTS) {
    errors.guests = `Number of guests must be between 1 and ${MAX_GUESTS}.`;
  }

  return errors;
}

// Used for both new bookings and editing an existing one.
function ReservationForm({ initialValues, submitLabel, onSubmit, onCancel }) {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [date, setDate] = useState(initialValues?.date ?? "");
  const [time, setTime] = useState(initialValues?.time ?? "");
  const [guests, setGuests] = useState(initialValues?.guests ?? 1);
  const [eventType, setEventType] = useState(
    initialValues?.eventType ?? "Regular"
  );
  const [requirements, setRequirements] = useState(
    initialValues?.requirements ?? ""
  );
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = validate({ date, time, guests });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit({
      name: name.trim(),
      date,
      time,
      guests,
      eventType,
      requirements: requirements.trim(),
    });

    // Clear the form after a new booking (not when editing)
    if (!initialValues) {
      setName("");
      setDate("");
      setTime("");
      setGuests(1);
      setEventType("Regular");
      setRequirements("");
    }
  }

  return (
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
        min={todayString()}
        value={date}
        onChange={(event) => setDate(event.target.value)}
        required
      />
      {errors.date && <p role="alert">{errors.date}</p>}

      <input
        type="time"
        min={OPEN_TIME}
        max={CLOSE_TIME}
        value={time}
        onChange={(event) => setTime(event.target.value)}
        required
      />
      {errors.time && <p role="alert">{errors.time}</p>}

      <label>Number of Guests:</label>
      <input
        type="number"
        min="1"
        max={MAX_GUESTS}
        value={guests}
        onChange={(event) => setGuests(Number(event.target.value))}
        required
      />
      {errors.guests && <p role="alert">{errors.guests}</p>}

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

      {eventType !== "Regular" && (
        <textarea
          placeholder="Special requirements (decorations, cake, seating, dietary needs...)"
          value={requirements}
          onChange={(event) => setRequirements(event.target.value)}
          rows={3}
        />
      )}

      <button type="submit">{submitLabel}</button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          Cancel Edit
        </button>
      )}
    </form>
  );
}

export default ReservationForm;
