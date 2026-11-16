import { useState } from "react";
import { useRestaurant } from "../../context/RestaurantContext";

const DAYS = 7;

// Local date as YYYY-MM-DD
const dayKey = (date) => date.toLocaleDateString("en-CA");

// Old orders may lack createdAt; the order number is a timestamp.
const orderDate = (order) => new Date(order.createdAt ?? order.orderNumber);

const orderTotal = (order) =>
  order.items.reduce((sum, i) => sum + i.price * i.quantity, 0) * 1.05;

// A simple horizontal bar sized relative to the largest value
function Bar({ value, max }) {
  const width = max > 0 ? (value / max) * 100 : 0;
  return (
    <span
      style={{
        display: "inline-block",
        height: "12px",
        width: `${width}%`,
        maxWidth: "250px",
        minWidth: value > 0 ? "4px" : 0,
        background: "#b5451b",
        verticalAlign: "middle",
      }}
    />
  );
}

function AdminAnalytics() {
  const { orders, feedback } = useRestaurant();
  const [now] = useState(() => new Date()); // fixed when the tab is opened

  // ---- Orders per day (last 7 days, oldest first) ----
  const days = Array.from({ length: DAYS }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - (DAYS - 1 - i));
    return { key: dayKey(date), label: date.toDateString().slice(0, 10), count: 0 };
  });
  orders.forEach((order) => {
    const day = days.find((d) => d.key === dayKey(orderDate(order)));
    if (day) day.count += 1;
  });
  const weekOrders = days.reduce((sum, d) => sum + d.count, 0);
  const maxDay = Math.max(...days.map((d) => d.count));

  const revenue = orders.reduce((sum, o) => sum + orderTotal(o), 0);

  // ---- Popular items (by quantity ordered) ----
  const itemTotals = {};
  orders.forEach((order) =>
    order.items.forEach((item) => {
      itemTotals[item.name] = (itemTotals[item.name] || 0) + item.quantity;
    })
  );
  const popular = Object.entries(itemTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const maxItem = popular.length ? popular[0][1] : 0;

  // ---- Feedback summary ----
  const average = feedback.length
    ? feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length
    : 0;
  const positive = feedback.filter((f) => f.rating >= 4).length;
  const neutral = feedback.filter((f) => f.rating === 3).length;
  const negative = feedback.filter((f) => f.rating <= 2).length;
  const recent = [...feedback].reverse().slice(0, 5);

  return (
    <div>
      <h2>Analytics</h2>

      <p>
        Total orders: <strong>{orders.length}</strong> · Last 7 days:{" "}
        <strong>{weekOrders}</strong> · Revenue (incl. GST):{" "}
        <strong>${revenue.toFixed(2)}</strong>
      </p>

      <h3>Orders per Day (last 7 days)</h3>
      {days.map((day) => (
        <div key={day.key}>
          {day.label}: <Bar value={day.count} max={maxDay} /> {day.count}
        </div>
      ))}

      <h3>Most Popular Items</h3>
      {popular.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        popular.map(([name, quantity]) => (
          <div key={name}>
            {name}: <Bar value={quantity} max={maxItem} /> {quantity} ordered
          </div>
        ))
      )}

      <h3>Customer Feedback</h3>
      {feedback.length === 0 ? (
        <p>No feedback yet. Customers can rate an order from its tracking page.</p>
      ) : (
        <>
          <p>
            Average rating: <strong>{average.toFixed(1)} / 5</strong> from{" "}
            {feedback.length} review{feedback.length === 1 ? "" : "s"}
          </p>
          <p>
            Positive (4-5): {positive} · Neutral (3): {neutral} · Negative
            (1-2): {negative}
          </p>

          <h4>Recent comments</h4>
          {recent.map((f) => (
            <p key={f.id}>
              {"★".repeat(f.rating)}
              {"☆".repeat(5 - f.rating)} {f.customerName}
              {f.comment ? `: "${f.comment}"` : ""}
            </p>
          ))}
        </>
      )}
    </div>
  );
}

export default AdminAnalytics;
