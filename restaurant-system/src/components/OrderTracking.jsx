import FeedbackForm from "./FeedbackForm";
import { ORDER_STATUSES } from "../data/orderStatuses";

// Read-only for customers: only the restaurant (admin) changes the status.
function OrderTracking({ order }) {
  const currentStatusIndex = ORDER_STATUSES.indexOf(order.status);

  return (
    <div>
      <h2>Order Tracking</h2>

      <p>
        <strong>Order Number:</strong> {order.orderNumber}
      </p>

      <p>
        <strong>Current Status:</strong> {order.status}
      </p>

      <h3>Order Progress</h3>

      <ul>
        {ORDER_STATUSES.map((status, index) => (
          <li key={status}>
            {index <= currentStatusIndex ? "✓" : "○"} {status}
          </li>
        ))}
      </ul>

      <p>
        {order.status === "Delivered"
          ? "Your order has been delivered. Enjoy your meal!"
          : "This page updates automatically as the restaurant prepares your order."}
      </p>

      <FeedbackForm order={order} />
    </div>
  );
}

export default OrderTracking;
