
function OrderConfirmation({ order, onNewOrder }) {
  // Calculate subtotal
  const subtotal = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Example GST rate (5%)
  const tax = subtotal * 0.05;

  // Calculate final total
  const total = subtotal + tax;

  return (
    <div>
      <h2>Order Confirmed!</h2>

      <p>Thank you, {order.customerName}!</p>

      <h3>Order Information</h3>

      <p>Phone: {order.phone}</p>
      <p>Order Type: {order.orderType}</p>

      {order.orderType === "Delivery" && (
        <p>Delivery Address: {order.address}</p>
      )}

      <h3>Order Summary</h3>

      {order.items.map((item) => (
        <div key={item.id}>
          <p>
            {item.name} x {item.quantity}
          </p>

          <p>
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      ))}

      <hr />

      <p>Subtotal: ${subtotal.toFixed(2)}</p>

      <p>GST (5%): ${tax.toFixed(2)}</p>

      <h3>Total: ${total.toFixed(2)}</h3>

      <button onClick={onNewOrder}>
        Place Another Order
      </button>
    </div>
  );
}

export default OrderConfirmation;
