
function OrderTracking({ order, onUpdateStatus }) {
  const statuses = [
    "Pending",
    "Preparing",
    "Ready",
    "Completed",
  ];

  const currentStatusIndex = statuses.indexOf(order.status);

  function moveToNextStatus() {
    if (currentStatusIndex < statuses.length - 1) {
      onUpdateStatus(statuses[currentStatusIndex + 1]);
    }
  }

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
        {statuses.map((status, index) => (
          <li key={status}>
            {index <= currentStatusIndex ? "✓" : "○"} {status}
          </li>
        ))}
      </ul>

      <button
        onClick={moveToNextStatus}
        disabled={currentStatusIndex === statuses.length - 1}
      >
        {currentStatusIndex === statuses.length - 1
          ? "Order Completed"
          : "Move to Next Status"}
      </button>
    </div>
  );
}

export default OrderTracking;
