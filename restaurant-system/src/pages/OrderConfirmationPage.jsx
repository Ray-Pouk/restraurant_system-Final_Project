
import OrderConfirmation from "../components/OrderConfirmation";
import OrderTracking from "../components/OrderTracking";

function OrderConfirmationPage({
  order,
  onNewOrder,
  onUpdateStatus,
}) {
  if (!order) {
    return <p>No active order found.</p>;
  }

  return (
    <div>
      <h1>Order Details</h1>

      <OrderConfirmation
        order={order}
        onNewOrder={onNewOrder}
      />

      <OrderTracking
        order={order}
        onUpdateStatus={onUpdateStatus}
      />
    </div>
  );
}

export default OrderConfirmationPage;
