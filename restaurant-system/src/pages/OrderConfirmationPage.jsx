import { useParams } from "react-router-dom";
import OrderConfirmation from "../components/OrderConfirmation";
import OrderTracking from "../components/OrderTracking";
import { useRestaurant } from "../context/RestaurantContext";
import { useAuth } from "../context/AuthContext";

function OrderConfirmationPage({ onNewOrder }) {
  const { orderNumber } = useParams();
  const { orders } = useRestaurant();
  const { user, isAdmin } = useAuth();

  const order = orders.find((o) => String(o.orderNumber) === orderNumber);

  if (!order) {
    return <p>Order not found.</p>;
  }

  // Orders placed by an account are private to that customer (and admins)
  if (order.userId && order.userId !== user?.id && !isAdmin) {
    return <p>You don't have permission to view this order.</p>;
  }

  return (
    <div>
      <h1>Order Details</h1>

      <OrderConfirmation order={order} onNewOrder={onNewOrder} />

      <OrderTracking order={order} />
    </div>
  );
}

export default OrderConfirmationPage;
